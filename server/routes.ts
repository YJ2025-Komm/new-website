import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { z } from "zod";
import { googleSheetsService } from "./google-sheets";
import { mailchimpService } from "./mailchimp";
import { registerAdminRoutes } from "./admin-routes";
import { quizSubmissionSchema, calculateQuizScore } from "@shared/quiz-schema";
import { db } from "./db";
import { quizSubmissions } from "@shared/schema";

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

  // Register admin routes
  registerAdminRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
