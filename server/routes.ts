import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema, websiteAnalysisRequestSchema } from "@shared/schema";
import { z } from "zod";
import { googleSheetsService } from "./google-sheets";
import { mailchimpService } from "./mailchimp";
import { registerAdminRoutes } from "./admin-routes";
import { quizSubmissionSchema, calculateQuizScore } from "@shared/quiz-schema";
import { db } from "./db";
import { quizSubmissions } from "@shared/schema";
import axios from "axios";
import * as cheerio from "cheerio";
import OpenAI from "openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Google Sheets (add headers if needed)
  try {
    await googleSheetsService.initializeSheet();
    console.log("Google Sheets initialized successfully");
  } catch (error) {
    console.error("Google Sheets initialization failed:", error);
  }

  // Waitlist registration endpoint - Save directly to Mailchimp only
  app.post("/api/waitlist", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertWaitlistEntrySchema.parse(req.body);
      
      // Add directly to Mailchimp (it handles duplicate detection)
      try {
        await mailchimpService.addSubscriber(validatedData, 'GR Homepage');
        
        res.status(201).json({ 
          message: "Successfully added to waitlist",
          email: validatedData.email 
        });
      } catch (mailchimpError) {
        console.error("Mailchimp error:", mailchimpError);
        
        const errorMessage = mailchimpError instanceof Error ? mailchimpError.message : String(mailchimpError);
        
        // Handle specific Mailchimp errors - but treat Member Exists as success
        if (errorMessage.includes('Member Exists')) {
          return res.status(201).json({ 
            message: "Successfully added to waitlist",
            email: validatedData.email 
          });
        }
        
        if (errorMessage.includes('looks fake or invalid')) {
          return res.status(400).json({ 
            message: "Please enter a valid email address" 
          });
        }
        
        // Generic error
        res.status(500).json({ 
          message: "Failed to add to waitlist. Please try again." 
        });
      }
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid data provided",
          errors: error.errors 
        });
      }
      
      console.error("Error adding to waitlist:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Quiz waitlist registration endpoint - from within quiz flow
  app.post("/api/waitlist/quiz", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertWaitlistEntrySchema.parse(req.body);
      
      // Add directly to Mailchimp with quiz-specific tag
      try {
        await mailchimpService.addSubscriber(validatedData, 'GR Quiz Waitlist');
        
        res.status(201).json({ 
          message: "Successfully added to waitlist from quiz",
          email: validatedData.email 
        });
      } catch (mailchimpError) {
        console.error("Mailchimp error (quiz waitlist):", mailchimpError);
        
        const errorMessage = mailchimpError instanceof Error ? mailchimpError.message : String(mailchimpError);
        
        // Handle specific Mailchimp errors - but treat Member Exists as success
        if (errorMessage.includes('Member Exists')) {
          return res.status(201).json({ 
            message: "Successfully added to waitlist from quiz",
            email: validatedData.email 
          });
        }
        
        if (errorMessage.includes('looks fake or invalid')) {
          return res.status(400).json({ 
            message: "Please enter a valid email address" 
          });
        }
        
        // Generic error
        res.status(500).json({ 
          message: "Failed to add to waitlist. Please try again." 
        });
      }
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid data provided",
          errors: error.errors 
        });
      }
      
      console.error("Error adding to quiz waitlist:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Get waitlist count from Mailchimp
  app.get("/api/waitlist/count", async (req, res) => {
    try {
      const audienceInfo = await mailchimpService.getAudienceInfo();
      res.json({ count: audienceInfo.stats.member_count });
    } catch (error) {
      console.error("Error getting waitlist count:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Blog posts proxy endpoint - fetches from WordPress and serves to frontend
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const response = await fetch('https://blog.georankers.co/wp-json/wp/v2/posts?per_page=6&_fields=id,title,excerpt,link,date,categories,featured_media');
      
      if (!response.ok) {
        console.error('WordPress API error:', response.status, response.statusText);
        
        // Return static fallback data if WordPress API fails
        const fallbackPosts = [
          {
            id: 1,
            title: { rendered: "Strategic Imperatives for Marketing Leaders, Product Teams, and Founders in the Age of AI Search" },
            excerpt: { rendered: "Essential strategic frameworks for leadership teams navigating the fundamental shift from traditional search to AI-powered discovery." },
            link: "https://blog.georankers.co/2025/08/19/strategic-imperatives-for-marketing-leaders-product-teams-and-founders-in-the-age-of-ai-search/",
            date: "2025-08-19T00:00:00",
            categories: [1],
            featured_media: 0
          },
          {
            id: 2,
            title: { rendered: "Generative Engine Optimization: Building Blocks of AI‑Ready Content" },
            excerpt: { rendered: "Master the fundamental building blocks that make your content discoverable and recommendable by AI engines." },
            link: "https://blog.georankers.co/2025/08/15/generative-engine-optimization-building-blocks-of-ai%e2%80%91ready-content/",
            date: "2025-08-15T00:00:00",
            categories: [2],
            featured_media: 0
          },
          {
            id: 3,
            title: { rendered: "GEO vs SEO: What is Real, What is Hype, and What You Actually Need to Track" },
            excerpt: { rendered: "Cut through the noise and understand the practical differences between traditional SEO and generative engine optimization." },
            link: "https://blog.georankers.co/2025/08/08/hello-world/",
            date: "2025-08-08T00:00:00",
            categories: [2],
            featured_media: 0
          }
        ];
        
        return res.json(fallbackPosts);
      }
      
      const posts = await response.json();
      
      // If WordPress returns HTML instead of JSON, use fallback
      if (typeof posts === 'string') {
        const fallbackPosts = [
          {
            id: 1,
            title: { rendered: "Strategic Imperatives for Marketing Leaders, Product Teams, and Founders in the Age of AI Search" },
            excerpt: { rendered: "Essential strategic frameworks for leadership teams navigating the fundamental shift from traditional search to AI-powered discovery." },
            link: "https://blog.georankers.co/2025/08/19/strategic-imperatives-for-marketing-leaders-product-teams-and-founders-in-the-age-of-ai-search/",
            date: "2025-08-19T00:00:00",
            categories: [1],
            featured_media: 0
          },
          {
            id: 2,
            title: { rendered: "Generative Engine Optimization: Building Blocks of AI‑Ready Content" },
            excerpt: { rendered: "Master the fundamental building blocks that make your content discoverable and recommendable by AI engines." },
            link: "https://blog.georankers.co/2025/08/15/generative-engine-optimization-building-blocks-of-ai%e2%80%91ready-content/",
            date: "2025-08-15T00:00:00",
            categories: [2],
            featured_media: 0
          },
          {
            id: 3,
            title: { rendered: "GEO vs SEO: What is Real, What is Hype, and What You Actually Need to Track" },
            excerpt: { rendered: "Cut through the noise and understand the practical differences between traditional SEO and generative engine optimization." },
            link: "https://blog.georankers.co/2025/08/08/hello-world/",
            date: "2025-08-08T00:00:00",
            categories: [2],
            featured_media: 0
          }
        ];
        
        return res.json(fallbackPosts);
      }
      
      res.json(posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      
      // Return static fallback data if there's an error
      const fallbackPosts = [
        {
          id: 1,
          title: { rendered: "Strategic Imperatives for Marketing Leaders, Product Teams, and Founders in the Age of AI Search" },
          excerpt: { rendered: "Essential strategic frameworks for leadership teams navigating the fundamental shift from traditional search to AI-powered discovery." },
          link: "https://blog.georankers.co/2025/08/19/strategic-imperatives-for-marketing-leaders-product-teams-and-founders-in-the-age-of-ai-search/",
          date: "2025-08-19T00:00:00",
          categories: [1],
          featured_media: 0
        },
        {
          id: 2,
          title: { rendered: "Generative Engine Optimization: Building Blocks of AI‑Ready Content" },
          excerpt: { rendered: "Master the fundamental building blocks that make your content discoverable and recommendable by AI engines." },
          link: "https://blog.georankers.co/2025/08/15/generative-engine-optimization-building-blocks-of-ai%e2%80%91ready-content/",
          date: "2025-08-15T00:00:00",
          categories: [2],
          featured_media: 0
        },
        {
          id: 3,
          title: { rendered: "GEO vs SEO: What is Real, What is Hype, and What You Actually Need to Track" },
          excerpt: { rendered: "Cut through the noise and understand the practical differences between traditional SEO and generative engine optimization." },
          link: "https://blog.georankers.co/2025/08/08/hello-world/",
          date: "2025-08-08T00:00:00",
          categories: [2],
          featured_media: 0
        }
      ];
      
      res.json(fallbackPosts);
    }
  });

  // Blog categories proxy endpoint
  app.get("/api/blog/categories", async (req, res) => {
    try {
      const response = await fetch('https://blog.georankers.co/wp-json/wp/v2/categories?_fields=id,name,slug');
      
      if (!response.ok) {
        // Return static fallback categories
        const fallbackCategories = [
          { id: 1, name: "Strategic Frameworks", slug: "strategic-frameworks" },
          { id: 2, name: "AI Search & GEO", slug: "ai-search-geo" }
        ];
        return res.json(fallbackCategories);
      }
      
      const categories = await response.json();
      
      // If WordPress returns HTML instead of JSON, use fallback
      if (typeof categories === 'string') {
        const fallbackCategories = [
          { id: 1, name: "Strategic Frameworks", slug: "strategic-frameworks" },
          { id: 2, name: "AI Search & GEO", slug: "ai-search-geo" }
        ];
        return res.json(fallbackCategories);
      }
      
      res.json(categories);
    } catch (error) {
      console.error('Error fetching blog categories:', error);
      
      // Return static fallback categories
      const fallbackCategories = [
        { id: 1, name: "Strategic Frameworks", slug: "strategic-frameworks" },
        { id: 2, name: "AI Search & GEO", slug: "ai-search-geo" }
      ];
      res.json(fallbackCategories);
    }
  });

  // Quiz submission endpoint
  app.post("/api/quiz", async (req, res) => {
    try {
      // Validate request body
      const validatedData = quizSubmissionSchema.parse(req.body);
      
      // Calculate quiz score
      const results = calculateQuizScore(validatedData.responses);
      
      // Save to database
      const quizRecord = await db.insert(quizSubmissions).values({
        email: validatedData.email,
        companyName: validatedData.companyName || null,
        responses: validatedData.responses,
        score: results.score.toString(),
        level: results.level,
        breakdown: results.breakdown,
        recommendations: results.recommendations,
      }).returning();
      
      // Add email to Mailchimp with quiz score tag
      try {
        await mailchimpService.addSubscriber({
          fullName: validatedData.companyName || "Quiz Participant",
          email: validatedData.email,
          companyName: validatedData.companyName || "",
          challenge: `Quiz Score: ${results.score}/100 - ${results.level}`
        }, 'GR Quiz Submitted');
      } catch (mailchimpError) {
        console.log("Mailchimp error (quiz):", mailchimpError);
        // Continue even if Mailchimp fails
      }
      
      // Send to Google Sheets
      try {
        await googleSheetsService.appendQuizData(validatedData, results.score, results.breakdown, results.level);
      } catch (sheetsError) {
        console.log("Google Sheets error (quiz):", sheetsError);
        // Continue even if Sheets fails
      }
      
      res.status(201).json({
        message: "Quiz submitted successfully",
        ...results
      });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid data provided",
          errors: error.errors 
        });
      }
      
      console.error("Error submitting quiz:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Website analysis endpoint
  app.post("/api/analyze-website", async (req, res) => {
    try {
      // Validate request body
      const validatedData = websiteAnalysisRequestSchema.parse(req.body);
      
      // Fetch website content
      let htmlContent: string;
      try {
        const response = await axios.get(validatedData.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          },
          timeout: 10000,
          maxRedirects: 5
        });
        htmlContent = response.data;
      } catch (fetchError) {
        console.error("Error fetching website:", fetchError);
        return res.status(400).json({ 
          message: "Unable to fetch website. Please check the URL and try again." 
        });
      }

      // Extract content using cheerio
      const $ = cheerio.load(htmlContent);
      
      // Remove script and style tags
      $('script, style, noscript, iframe').remove();
      
      // Extract key content
      const title = $('title').text().trim() || '';
      const metaDescription = $('meta[name="description"]').attr('content') || '';
      const h1Tags = $('h1').map((_, el) => $(el).text().trim()).get().join(', ');
      const h2Tags = $('h2').map((_, el) => $(el).text().trim()).get().slice(0, 5).join(', ');
      const bodyText = $('body').text().trim().replace(/\s+/g, ' ').substring(0, 3000);
      
      // Check for schema markup
      const schemaScripts = $('script[type="application/ld+json"]').map((_, el) => $(el).html()).get();
      
      // Prepare content for OpenAI
      const contentSummary = `
Website URL: ${validatedData.url}
Title: ${title}
Meta Description: ${metaDescription}
H1 Headings: ${h1Tags}
H2 Headings: ${h2Tags}
Schema Markup Found: ${schemaScripts.length > 0 ? 'Yes (' + schemaScripts.length + ' schemas)' : 'No'}
Body Content Preview: ${bodyText.substring(0, 2000)}
      `.trim();

      // Use Replit AI Integrations OpenAI service
      // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      const openai = new OpenAI({
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: `You are an AI search visibility expert. Analyze websites for their visibility in AI search results (ChatGPT, Gemini, Perplexity, Claude). 
            
Evaluate these 4 categories (0-100 score each):
1. Schema Markup: Presence and quality of structured data (JSON-LD)
2. Content Quality: Clear, authoritative, well-structured content
3. Brand Signals: Strong brand presence, trust indicators, citations
4. AI Readability: Content formatted for AI consumption

Provide 3-5 prioritized recommendations with category, issue, solution, and priority (high/medium/low).

Respond ONLY with valid JSON in this exact format:
{
  "overallScore": number,
  "scores": {
    "schemaMarkup": number,
    "contentQuality": number,
    "brandSignals": number,
    "aiReadability": number
  },
  "recommendations": [
    {
      "category": "string",
      "issue": "string",
      "solution": "string",
      "priority": "high" | "medium" | "low"
    }
  ],
  "summary": "string (2-3 sentences)"
}`
          },
          {
            role: "user",
            content: `Analyze this website for AI search visibility:\n\n${contentSummary}`
          }
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 2048
      });

      const analysisContent = completion.choices[0].message.content;
      
      if (!analysisContent) {
        throw new Error("No content returned from AI analysis");
      }
      
      const analysis = JSON.parse(analysisContent);
      
      // Ensure the response has the required structure
      const response = {
        url: validatedData.url,
        overallScore: analysis.overallScore || 0,
        scores: {
          schemaMarkup: analysis.scores?.schemaMarkup || 0,
          contentQuality: analysis.scores?.contentQuality || 0,
          brandSignals: analysis.scores?.brandSignals || 0,
          aiReadability: analysis.scores?.aiReadability || 0,
        },
        recommendations: analysis.recommendations || [],
        summary: analysis.summary || "Analysis completed"
      };
      
      res.status(200).json(response);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid URL provided",
          errors: error.errors 
        });
      }
      
      console.error("Error analyzing website:", error);
      res.status(500).json({ 
        message: "Failed to analyze website. Please try again." 
      });
    }
  });

  // Register admin routes
  registerAdminRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
