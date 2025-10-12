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
import { discoverPages, scrapeMultiplePages, analyzeRobotsTxt, analyzeSitemap, analyzeKeyPages, analyzeTechnicalFoundation } from "./web-crawler";

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

  // Website analysis endpoint - Multi-page crawler (up to 50 pages)
  app.post("/api/analyze-website", async (req, res) => {
    try {
      // Validate request body
      const validatedData = websiteAnalysisRequestSchema.parse(req.body);
      
      console.log(`Starting multi-page analysis for: ${validatedData.url}`);
      
      // Implement 2-minute timeout for entire operation
      const analysisTimeout = 120000; // 120 seconds
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Analysis timed out after 2 minutes')), analysisTimeout)
      );
      
      const analysisPromise = (async () => {
        // Step 1: High-impact extractions in parallel
        const [
          { pages, totalFound },
          robotsTxt,
          sitemap,
          technicalFoundation
        ] = await Promise.all([
          discoverPages(validatedData.url, 30),
          analyzeRobotsTxt(validatedData.url),
          analyzeSitemap(validatedData.url),
          analyzeTechnicalFoundation(validatedData.url)
        ]);
        
        console.log(`Discovered ${pages.length} pages to analyze (${totalFound} total found)`);
        
        if (pages.length === 0) {
          throw new Error("Unable to access website. Please check the URL and try again.");
        }
        
        // Step 2: Analyze key pages from discovered URLs
        const keyPages = await analyzeKeyPages([...pages, validatedData.url]);
        
        // Step 3: Scrape content from all pages concurrently (5 at a time)
        const scrapedPages = await scrapeMultiplePages(pages, 5);
        const totalSchemaCount = scrapedPages.reduce((sum, page) => sum + (page?.schemaCount || 0), 0);
        
        console.log(`Successfully scraped ${scrapedPages.length} pages with 5-way concurrency`);
        
        return { scrapedPages, totalSchemaCount, pages, robotsTxt, sitemap, keyPages, technicalFoundation };
      })();
      
      // Race between analysis and timeout
      let scrapedPages, totalSchemaCount, pages, robotsTxt, sitemap, keyPages, technicalFoundation;
      try {
        const result = await Promise.race([analysisPromise, timeoutPromise]) as any;
        scrapedPages = result.scrapedPages;
        totalSchemaCount = result.totalSchemaCount;
        pages = result.pages;
        robotsTxt = result.robotsTxt;
        sitemap = result.sitemap;
        keyPages = result.keyPages;
        technicalFoundation = result.technicalFoundation;
      } catch (error) {
        if (error instanceof Error && error.message.includes('timed out')) {
          return res.status(408).json({
            message: "Analysis timed out. Please try again or use a simpler website."
          });
        }
        throw error;
      }
      
      // Step 3: Aggregate all data for comprehensive OpenAI analysis
      const aggregatedContent = scrapedPages.map((page, index) => {
        return `
Page ${index + 1}: ${page.url}
Title: ${page.title}
Meta Description: ${page.metaDescription}
H1: ${page.h1Tags}
H2: ${page.h2Tags}
Schema: ${page.hasSchema ? 'Yes' : 'No'}
Content: ${page.bodyText.substring(0, 800)}
---`;
      }).join('\n\n');
      
      const contentSummary = `
=== WEBSITE ANALYSIS - COMPREHENSIVE GEO AUDIT ===

Base URL: ${validatedData.url}
Pages Analyzed: ${scrapedPages.length}

=== HIGH-IMPACT SIGNALS ===

1. ROBOTS.TXT ANALYSIS:
${robotsTxt.exists ? `
   ✓ robots.txt found
   ${robotsTxt.blocksAIBots ? `⚠️  BLOCKS AI BOTS: ${robotsTxt.blockedBots.join(', ')}` : '✓ No AI bots blocked'}
   ${robotsTxt.allowedBots.length > 0 ? `✓ Allowed bots: ${robotsTxt.allowedBots.join(', ')}` : ''}
` : '✗ robots.txt NOT FOUND'}

2. SITEMAP.XML:
${sitemap.exists ? `✓ Sitemap found (${sitemap.urlCount} URLs)` : '✗ Sitemap NOT FOUND'}

3. KEY PAGES COVERAGE (${keyPages.totalFound}/10):
   Found: ${keyPages.found.join(', ') || 'None'}
   Missing: ${keyPages.missing.join(', ') || 'None'}

4. TECHNICAL FOUNDATION:
   ${technicalFoundation.https ? '✓' : '✗'} HTTPS
   ${technicalFoundation.hasSecurityHeaders ? '✓' : '✗'} Security Headers

5. SCHEMA MARKUP:
   Total: ${totalSchemaCount} instances across ${scrapedPages.filter(p => p.hasSchema).length} pages

=== PAGE-BY-PAGE CONTENT ===

${aggregatedContent}
      `.trim();

      // Use Replit AI Integrations OpenAI service
      const openai = new OpenAI({
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
      });

      console.log("Starting OpenAI analysis...");

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert AI search visibility analyst conducting comprehensive GEO (Generative Engine Optimization) audits for B2B SaaS companies.

Analyze websites based on this comprehensive 9-category GEO checklist:

🔹 1. FOUNDATIONAL VISIBILITY SIGNALS
- Robots.txt and sitemap.xml present and accessible
- Canonical tags, URL structures, hreflang tags
- HTTPS enabled and valid SSL
- Clear crawlable navigation, fast load speed
- Indexable metadata (titles, meta descriptions, alt tags)

🔹 2. AUTHORITATIVE CORE (Facts AI Can Quote)
- Pricing clearly stated in structured, extractable way
- Features and capabilities in precise, extractable sentences
- Integration lists with names, links, categories
- About/Company/Team pages with consistent data
- Security, compliance, SLA statements (SOC 2, GDPR, ISO 27001)
- Changelog/release notes, support/contact info
- One canonical version of all factual statements

🔹 3. STRUCTURED DATA (Schema)
- Organization, Website, SoftwareApplication/Product schema
- FAQPage, HowTo, Article/BlogPosting schema
- Review/AggregateRating, BreadcrumbList, VideoObject
- Consistent JSON-LD format (no conflicting properties)

🔹 4. CONTENT EXTRACTABILITY
- Tables/definition lists for specs, pricing, limits
- Bullet points and short factual sentences
- Avoid text in images/SVGs/videos
- Clear section headings (H2/H3) answering buyer questions
- One paragraph summaries/key takeaways per article
- Numerical data and measurable claims

🔹 5. COVERAGE & COMPLETENESS
Check for: Homepage, Pricing, Features, Integrations, Docs, Security/Trust, FAQ, Case Studies, Blog, About, Contact, Legal pages

🔹 6. CONSISTENCY & CONTRADICTION CHECKS
- Pricing consistent across schema, pages, blog mentions
- Feature names and limits consistent
- Integration names consistent in schema, UI, docs
- Company name, tagline, URLs consistent
- No old/deprecated features still indexed

🔹 7. BLOG & THOUGHT LEADERSHIP
- Author names and publication dates
- Recent updates (within 60 days)
- Clear topic summaries and cited data sources
- Interlinking between blog and product pages
- Original insights/stats (EEAT)
- Rich snippets (FAQ/Article schema)

🔹 8. EXTERNAL & CITATION SIGNALS
- Company profiles on Wikipedia, Crunchbase, G2, Capterra
- Analyst mentions (Gartner, Forrester)
- Social profiles in Organization schema
- Backlinks from reputable domains
- Press coverage/event participation

🔹 9. EEAT (Experience, Expertise, Authoritativeness, Trust)
- Author bios for content pieces
- Verifiable company address and contact
- Transparent policies and terms
- Cited data sources and references
- Testimonials/reviews with identifiable clients
- Secure and consistent brand identity

Evaluate these 4 categories (0-100 score each):
1. Schema Markup: Presence and quality of structured data
2. Content Quality: Clear, authoritative, well-structured content
3. Brand Signals: Strong brand presence, trust indicators, citations
4. AI Readability: Content formatted for AI consumption

Provide 5-8 prioritized, actionable recommendations based on the GEO checklist above.

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
      "solution": "string (specific, actionable)",
      "priority": "high" | "medium" | "low"
    }
  ],
  "summary": "string (2-3 sentences highlighting key findings)"
}`
          },
          {
            role: "user",
            content: `Analyze this website using the comprehensive GEO checklist:\n\n${contentSummary.substring(0, 30000)}`
          }
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 2048
      });

      console.log("OpenAI analysis complete. Token usage:", completion.usage);

      const analysisContent = completion.choices[0]?.message?.content;
      
      if (!analysisContent) {
        console.error("No content in OpenAI response");
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
        summary: analysis.summary || "Analysis completed",
        pagesAnalyzed: scrapedPages.length,
        pagesList: pages
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
