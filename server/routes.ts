import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { websiteAnalysisRequestSchema } from "@shared/schema";
import { z } from "zod";
import { registerAdminRoutes } from "./admin-routes";
import axios from "axios";
import * as cheerio from "cheerio";
import OpenAI from "openai";
import { discoverPages, scrapeMultiplePages, analyzeRobotsTxt, analyzeSitemap, analyzeKeyPages, analyzeTechnicalFoundation, scrapePageContent } from "./web-crawler";
import rateLimit from "express-rate-limit";
import fs from "fs";
import path from "path";

// Lead logging helper
const LEADS_FILE = path.join(process.cwd(), "tool-leads.jsonl");
function logLead(tool: string, input: string) {
  const line = JSON.stringify({ tool, input, ts: new Date().toISOString() });
  fs.appendFile(LEADS_FILE, line + "\n", () => {});
}

// Rate limiter for free tools: 10 requests per IP per hour
const freeToolsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests. Please try again in an hour." },
});

export async function registerRoutes(app: Express): Promise<Server> {
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
      const aggregatedContent = scrapedPages.map((page: any, index: number) => {
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
   Total: ${totalSchemaCount} instances across ${scrapedPages.filter((p: any) => p.hasSchema).length} pages

=== PAGE-BY-PAGE CONTENT ===

${aggregatedContent}
      `.trim();

      // Use Replit AI Integrations OpenAI service
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
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
      
      // Parse specific error types from crawler
      if (error instanceof Error && error.message.includes(':')) {
        const [errorType, ...messageParts] = error.message.split(':');
        const errorMessage = messageParts.join(':').trim();
        
        if (errorType === 'BLOCKED') {
          return res.status(403).json({
            errorType: 'blocked',
            message: errorMessage
          });
        } else if (errorType === 'TEMPORARY') {
          return res.status(503).json({
            errorType: 'temporary',
            message: errorMessage
          });
        } else if (errorType === 'TIMEOUT') {
          return res.status(408).json({
            errorType: 'timeout',
            message: errorMessage
          });
        } else if (errorType === 'HTTP_ERROR') {
          return res.status(500).json({
            errorType: 'http_error',
            message: errorMessage
          });
        } else if (errorType === 'CONNECTION') {
          return res.status(500).json({
            errorType: 'connection',
            message: errorMessage
          });
        }
      }
      
      console.error("Error analyzing website:", error);
      res.status(500).json({ 
        message: "Failed to analyze website. Please try again." 
      });
    }
  });

  // Dynamic sitemap.xml endpoint - fetches blog posts from WordPress RSS feed
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const baseUrl = "https://georankers.co";
      
      // Main pages with current date
      const today = new Date().toISOString().split('T')[0];
      const mainPages = [
        { url: `${baseUrl}/`, priority: "1.0", changefreq: "weekly" },
        { url: `${baseUrl}/features`, priority: "0.9", changefreq: "monthly" },
        { url: `${baseUrl}/geo-guide`, priority: "0.9", changefreq: "monthly" },
        { url: `${baseUrl}/help`, priority: "0.6", changefreq: "monthly" },
        // /team hidden until page is complete
        { url: `${baseUrl}/free-geo-tools/brand-visibility`, priority: "0.8", changefreq: "monthly" },
        { url: `${baseUrl}/free-geo-tools/geo-audit`, priority: "0.8", changefreq: "monthly" },
        { url: `${baseUrl}/free-geo-tools/visibility-score`, priority: "0.8", changefreq: "monthly" },
        { url: `${baseUrl}/privacy`, priority: "0.4", changefreq: "yearly" },
        { url: `${baseUrl}/terms`, priority: "0.4", changefreq: "yearly" },
      ];
      
      // Fetch blog posts from WordPress RSS feed (multiple pages to get all posts)
      let blogPosts: { url: string; lastmod: string; priority: string; changefreq: string }[] = [];
      
      const parseRssFeed = async (feedUrl: string) => {
        try {
          const rssResponse = await axios.get(feedUrl, {
            timeout: 10000,
            headers: {
              'User-Agent': 'GeoRankers-Sitemap-Generator/1.0'
            }
          });
          
          const $ = cheerio.load(rssResponse.data, { xmlMode: true });
          
          $('item').each((_, item) => {
            const link = $(item).find('link').text().trim();
            const pubDate = $(item).find('pubDate').text().trim();
            
            if (link) {
              // Parse the publication date
              let lastmod = today;
              if (pubDate) {
                try {
                  lastmod = new Date(pubDate).toISOString().split('T')[0];
                } catch (e) {
                  // Use today's date if parsing fails
                }
              }
              
              blogPosts.push({
                url: link,
                lastmod,
                priority: "0.8",
                changefreq: "monthly"
              });
            }
          });
        } catch (rssError) {
          console.error(`Failed to fetch RSS feed from ${feedUrl}:`, rssError);
        }
      };
      
      // Fetch multiple pages of the RSS feed to get all posts
      await Promise.all([
        parseRssFeed("https://blog.georankers.co/feed/"),
        parseRssFeed("https://blog.georankers.co/feed/?paged=2"),
        parseRssFeed("https://blog.georankers.co/feed/?paged=3"),
      ]);
      
      // Remove duplicates (in case of overlap between pages)
      const uniqueUrls = new Set<string>();
      blogPosts = blogPosts.filter(post => {
        if (uniqueUrls.has(post.url)) return false;
        uniqueUrls.add(post.url);
        return true;
      });
      
      // Sort by date (newest first)
      blogPosts.sort((a, b) => new Date(b.lastmod).getTime() - new Date(a.lastmod).getTime());
      
      console.log(`Sitemap: Found ${blogPosts.length} blog posts from RSS feed`);
      
      // Generate sitemap XML
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${mainPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
${blogPosts.map(post => `  <url>
    <loc>${post.url}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>${post.changefreq}</changefreq>
    <priority>${post.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
      
      res.set('Content-Type', 'application/xml');
      res.send(sitemap);
      
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  // ─── FREE GEO TOOLS ────────────────────────────────────────────────────────

  // Shared helper: extract brand + category — uses page content if available, falls back to domain
  async function extractBrandAndCategory(openai: OpenAI, urlOrContent: string, isUrl = false): Promise<{ brand: string; category: string }> {
    const prompt = isUrl
      ? `The website URL is: ${urlOrContent}\nBased on the domain name alone, infer the company/brand name and likely product category.`
      : urlOrContent.substring(0, 1500);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Extract or infer the brand/company name and product category. Return ONLY valid JSON: {"brand": "CompanyName", "category": "product category (e.g. CRM software, email marketing platform)"}`,
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      max_tokens: 100,
    });
    const parsed = JSON.parse(completion.choices[0]?.message?.content ?? "{}");
    return {
      brand: parsed.brand ?? "Unknown Brand",
      category: parsed.category ?? "software",
    };
  }

  // Tool 1: AI Brand Visibility Snapshot
  app.post("/api/tools/brand-visibility", freeToolsLimiter, async (req: Request, res: Response) => {
    const schema = z.object({ url: z.string().url() });
    try {
      const { url } = schema.parse(req.body);
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const page = await scrapePageContent(url);
      let brand: string, category: string;
      if (page) {
        const pageContent = `Title: ${page.title}\nMeta: ${page.metaDescription}\nH1: ${page.h1Tags}\n${page.bodyText}`;
        ({ brand, category } = await extractBrandAndCategory(openai, pageContent));
      } else {
        ({ brand, category } = await extractBrandAndCategory(openai, url, true));
      }

      // 3 parallel presence-check prompts — each asks specifically about the brand
      const presencePrompts = [
        `What tools do experts recommend for ${category}? List the top 5-6 options. Would "${brand}" be among them?`,
        `Which ${category} platform is best for a B2B SaaS company? Is "${brand}" typically recommended alongside other options?`,
        `Compare the leading ${category} solutions available today. Does "${brand}" feature in AI-generated comparisons?`,
      ];

      const [presenceResults, analysisResult] = await Promise.all([
        // Parallel presence checks
        Promise.all(
          presencePrompts.map((p) =>
            openai.chat.completions.create({
              model: "gpt-4o-mini",
              messages: [
                {
                  role: "system",
                  content: `You are a knowledgeable software analyst. Answer honestly and specifically about the brand mentioned. Return ONLY valid JSON: {"brandMentioned": true, "competitors": ["name1","name2","name3","name4"], "snippet": "1-2 sentence excerpt describing the category landscape"}`,
                },
                { role: "user", content: p },
              ],
              response_format: { type: "json_object" },
              max_tokens: 300,
            })
          )
        ),
        // Deep analysis: why visible or not, what to do
        openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an AI search visibility analyst with deep knowledge of B2B SaaS markets. Be specific and honest — if a brand is niche or little-known to AI, say so clearly.

You MUST explain in concrete terms why "${brand}" does or does not commonly appear in AI-generated answers for ${category}, focusing on: positioning clarity, content signals, brand awareness, and citation presence.

Return ONLY valid JSON:
{
  "presenceLevel": "high|medium|low|minimal",
  "topCompetitors": ["name1","name2","name3","name4"],
  "whyNotVisible": ["specific reason 1","specific reason 2","specific reason 3"],
  "whatToImprove": ["concrete action 1","concrete action 2","concrete action 3"],
  "summary": ["insight about where the brand currently stands","insight about what is holding them back","insight about what to fix first"]
}`,
            },
            { role: "user", content: `Brand: "${brand}"\nCategory: "${category}"\n\nProvide a detailed AI visibility analysis for this brand.` },
          ],
          response_format: { type: "json_object" },
          max_tokens: 600,
        }),
      ]);

      let mentionedCount = 0;
      const allCompetitors = new Set<string>();
      const snippets: string[] = [];

      for (const r of presenceResults) {
        const parsed = JSON.parse(r.choices[0]?.message?.content ?? "{}");
        if (parsed.brandMentioned === true) mentionedCount++;
        (parsed.competitors as string[] ?? []).forEach((c: string) => {
          if (c.toLowerCase() !== brand.toLowerCase()) allCompetitors.add(c);
        });
        if (parsed.snippet) snippets.push(parsed.snippet);
      }

      const analysis = JSON.parse(analysisResult.choices[0]?.message?.content ?? "{}");
      // Merge competitor lists — prefer analysis competitors as more reliable
      const finalCompetitors = [
        ...(analysis.topCompetitors ?? []),
        ...Array.from(allCompetitors),
      ].filter((c, i, arr) => arr.findIndex(x => x.toLowerCase() === c.toLowerCase()) === i).slice(0, 6);

      logLead("brand-visibility", url);

      const presencePercent = Math.round((mentionedCount / presencePrompts.length) * 100);
      // Derive presenceLevel from the actual measured percent — never trust GPT's self-reported level
      const presenceLevel =
        presencePercent >= 67 ? "high" :
        presencePercent >= 34 ? "medium" :
        presencePercent > 0   ? "low" : "minimal";

      res.json({
        brand,
        category,
        presencePercent,
        promptsChecked: presencePrompts.length,
        presenceLevel,
        topCompetitors: finalCompetitors,
        snippets: snippets.slice(0, 2),
        whyNotVisible: (analysis.whyNotVisible as string[] ?? []).slice(0, 3),
        whatToImprove: (analysis.whatToImprove as string[] ?? []).slice(0, 3),
        summary: (analysis.summary as string[] ?? []).slice(0, 3),
      });
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ message: "Invalid URL", errors: error.errors });
      console.error("brand-visibility error:", error instanceof Error ? error.message : error);
      res.status(500).json({ message: "Analysis failed. Please try again." });
    }
  });

  // Tool 2: GEO Content Audit
  app.post("/api/tools/geo-audit", freeToolsLimiter, async (req: Request, res: Response) => {
    const schema = z.object({ url: z.string().url() });
    try {
      const { url } = schema.parse(req.body);

      const page = await scrapePageContent(url);
      if (!page) return res.status(422).json({ message: "We couldn't read that page — it may block automated access. Try your homepage or a specific product/feature page." });

      const contentPreview = `Title: ${page.title}\nMeta: ${page.metaDescription}\nH1: ${page.h1Tags}\nH2: ${page.h2Tags}\n\n${page.bodyText.substring(0, 3000)}`;
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a GEO (Generative Engine Optimization) expert auditing a B2B SaaS webpage for AI search readiness. Be specific and actionable.

Return ONLY valid JSON:
{
  "brand": "detected company name",
  "score": 0-100,
  "strengths": ["specific thing the page does well for AI visibility"],
  "checks": {
    "categoryMentioned": true,
    "faqsPresent": false,
    "headingStructure": "strong|moderate|weak",
    "trustSignals": "present|partial|missing",
    "schemaMarkup": true,
    "clearValueProp": true,
    "authoritySignals": true,
    "numericalData": false
  },
  "missingEntities": ["important topic or entity absent from the page"],
  "priorityFixes": [
    { "fix": "specific actionable improvement", "impact": "high|medium|low", "effort": "low|medium|high", "why": "why this matters for AI visibility" }
  ],
  "summary": ["insight about where the page currently stands","insight about what is holding it back","insight about what to fix first"]
}
strengths: 2-3 items. missingEntities: 3-5 items. priorityFixes: 5-6 items ordered by impact descending.`,
          },
          { role: "user", content: `Audit this page for GEO readiness:\n\n${contentPreview}` },
        ],
        response_format: { type: "json_object" },
        max_tokens: 1200,
      });

      const result = JSON.parse(completion.choices[0]?.message?.content ?? "{}");
      // Override schemaMarkup with the factual scraped value — don't trust GPT's inference
      if (result.checks) result.checks.schemaMarkup = page.hasSchema;
      logLead("geo-audit", url);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ message: "Invalid URL", errors: error.errors });
      console.error("geo-audit error:", error instanceof Error ? error.message : error);
      res.status(500).json({ message: "Audit failed. Please try again." });
    }
  });

  // Tool 3: AI Query Opportunity Finder (replaces Visibility Score)
  app.post("/api/tools/query-opportunities", freeToolsLimiter, async (req: Request, res: Response) => {
    const schema = z.object({ url: z.string().url() });
    try {
      const { url } = schema.parse(req.body);
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const page = await scrapePageContent(url);
      let brand: string, category: string;
      if (page) {
        const pageContent = `Title: ${page.title}\nMeta: ${page.metaDescription}\nH1: ${page.h1Tags}\n${page.bodyText}`;
        ({ brand, category } = await extractBrandAndCategory(openai, pageContent));
      } else {
        ({ brand, category } = await extractBrandAndCategory(openai, url, true));
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an AI search behavior analyst specializing in B2B SaaS. Generate realistic queries that buyers ask AI assistants when evaluating ${category} tools, then analyze the competitive landscape specifically for "${brand}".

Be brand-specific: explain exactly why "${brand}" would or would not appear for each gap, and what specific content changes would help.

IMPORTANT: The current year is 2026. All queries must be timeless or relevant to 2026. Do NOT include year-specific queries like "best tool in 2023", "top platforms 2024", etc. Generate evergreen queries that buyers ask today.

Return ONLY valid JSON:
{
  "category": "...",
  "brand": "...",
  "topQueries": [
    { "query": "exact question a buyer would ask an AI assistant", "intent": "evaluation|comparison|how-to|definition", "opportunity": "high|medium|low" }
  ],
  "opportunityGaps": [
    { "query": "query where brand is absent but could rank", "whyBrandMisses": "specific reason brand doesn't appear for this query", "whatToFix": "concrete content or positioning change that would help" }
  ],
  "competitorDominatedQueries": [
    { "query": "query text", "dominatedBy": "CompetitorName", "whyTheyWin": "specific reason this competitor dominates this query" }
  ],
  "summary": ["insight about where the brand stands in AI queries","insight about what is holding it back","insight about the highest-impact query to target first"]
}
topQueries: exactly 8. opportunityGaps: exactly 3. competitorDominatedQueries: 2-3.`,
          },
          { role: "user", content: `Brand: "${brand}"\nCategory: "${category}"\n\nGenerate AI query opportunities and competitive gaps for this brand.` },
        ],
        response_format: { type: "json_object" },
        max_tokens: 1200,
      });

      const result = JSON.parse(completion.choices[0]?.message?.content ?? "{}");
      logLead("query-opportunities", url);
      res.json({ brand, category, ...result });
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ message: "Invalid URL", errors: error.errors });
      console.error("query-opportunities error:", error instanceof Error ? error.message : error);
      res.status(500).json({ message: "Could not generate opportunities. Please try again." });
    }
  });

  // Legacy endpoint — redirect to new tool
  app.post("/api/tools/visibility-score", (_req: Request, res: Response) => {
    res.status(410).json({ message: "This tool has been replaced. Use /api/tools/query-opportunities instead." });
  });

  // Protected leads viewer
  app.get("/api/tools/leads", (req: Request, res: Response) => {
    const token = req.headers["x-admin-token"];
    if (!process.env.TOOLS_ADMIN_TOKEN || token !== process.env.TOOLS_ADMIN_TOKEN) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      if (!fs.existsSync(LEADS_FILE)) return res.json([]);
      const lines = fs.readFileSync(LEADS_FILE, "utf-8").trim().split("\n").filter(Boolean);
      const leads = lines.map((l) => JSON.parse(l)).reverse();
      res.json(leads);
    } catch {
      res.status(500).json({ message: "Failed to read leads" });
    }
  });

  // ───────────────────────────────────────────────────────────────────────────

  // Register admin routes
  registerAdminRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
