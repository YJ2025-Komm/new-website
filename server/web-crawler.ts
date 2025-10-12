import axios from "axios";
import * as cheerio from "cheerio";
import { URL } from "url";

interface CrawlResult {
  pages: string[];
  totalFound: number;
}

export interface RobotsTxtAnalysis {
  exists: boolean;
  content?: string;
  blocksAIBots: boolean;
  blockedBots: string[];
  allowedBots: string[];
}

export interface SitemapAnalysis {
  exists: boolean;
  urlCount?: number;
  error?: string;
}

export interface KeyPagesAnalysis {
  totalFound: number;
  missing: string[];
  found: string[];
}

export interface TechnicalFoundation {
  https: boolean;
  hasSecurityHeaders: boolean;
}

// Priority patterns for main pages (checked first)
const PRIORITY_PATTERNS = [
  /\/(about|pricing|features|product|solutions|services|contact|team|company)/i,
  /\/(how-it-works|use-cases|customers|case-studies|testimonials)/i,
];

// Blog patterns (checked after main pages)
const BLOG_PATTERNS = [
  /\/(blog|article|post|news)/i,
];

export async function discoverPages(
  baseUrl: string, 
  maxPages: number = 30
): Promise<CrawlResult> {
  const visited = new Set<string>();
  const toVisit: string[] = [baseUrl];
  const discoveredPages: string[] = [];
  const mainPages: string[] = [];
  const blogPages: string[] = [];
  
  // Parse base URL to get domain
  const baseDomain = new URL(baseUrl).hostname;
  
  console.log(`Starting crawl for ${baseUrl}, max ${maxPages} pages (10 priority + 20 blog)`);

  while (toVisit.length > 0 && visited.size < 100) { // Limit discovery to 100 pages max
    const currentUrl = toVisit.shift()!;
    
    // Skip if already visited
    if (visited.has(currentUrl)) continue;
    visited.add(currentUrl);
    
    try {
      // Fetch the page
      const response = await axios.get(currentUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 8000,
        maxRedirects: 3,
        validateStatus: (status) => status < 400, // Only follow successful responses
      });
      
      // Parse HTML
      const $ = cheerio.load(response.data);
      
      // Extract all links
      const links: string[] = [];
      $('a[href]').each((_, element) => {
        const href = $(element).attr('href');
        if (!href) return;
        
        try {
          // Resolve relative URLs
          const absoluteUrl = new URL(href, currentUrl).href;
          const urlObj = new URL(absoluteUrl);
          
          // Only include same-domain links
          if (urlObj.hostname === baseDomain) {
            // Clean URL (remove hash and query params for deduplication)
            const cleanUrl = `${urlObj.origin}${urlObj.pathname}`.replace(/\/$/, '');
            
            // Skip common non-content pages
            if (!cleanUrl.match(/\.(pdf|jpg|jpeg|png|gif|svg|css|js|json|xml|zip)$/i)) {
              links.push(cleanUrl);
            }
          }
        } catch (e) {
          // Skip invalid URLs
        }
      });
      
      // Categorize current page
      const isMainPage = PRIORITY_PATTERNS.some(pattern => pattern.test(currentUrl));
      const isBlogPage = BLOG_PATTERNS.some(pattern => pattern.test(currentUrl));
      
      if (isMainPage) {
        mainPages.push(currentUrl);
      } else if (isBlogPage) {
        blogPages.push(currentUrl);
      } else if (currentUrl === baseUrl) {
        // Homepage always goes first
        discoveredPages.unshift(currentUrl);
      }
      
      // Add discovered links to queue
      for (const link of links) {
        if (!visited.has(link) && !toVisit.includes(link)) {
          toVisit.push(link);
        }
      }
      
      console.log(`Crawled: ${currentUrl} (found ${links.length} links)`);
      
    } catch (error) {
      console.log(`Failed to crawl ${currentUrl}:`, error instanceof Error ? error.message : 'Unknown error');
    }
  }
  
  // Prioritized selection: homepage + 10 priority pages + 20 blog pages (max 30 total)
  const finalPages = [];
  
  // Always include homepage first
  if (discoveredPages.length > 0) {
    finalPages.push(...discoveredPages);
  }
  
  // Add up to 10 main pages
  const mainPageLimit = 10;
  finalPages.push(...mainPages.slice(0, mainPageLimit));
  
  // Add up to 20 blog pages (or fill remaining slots)
  const remainingSlots = maxPages - finalPages.length;
  const blogPageLimit = Math.min(20, remainingSlots);
  finalPages.push(...blogPages.slice(0, blogPageLimit));
  
  console.log(`Crawl complete: ${finalPages.length} pages selected (${Math.min(mainPages.length, mainPageLimit)} main, ${Math.min(blogPages.length, blogPageLimit)} blog) from ${visited.size} discovered`);
  
  return {
    pages: finalPages.slice(0, maxPages),
    totalFound: visited.size
  };
}

// Concurrent page scraping with configurable concurrency
export async function scrapeMultiplePages(urls: string[], concurrency: number = 5) {
  const results: any[] = [];
  const queue = [...urls];
  const inProgress: Promise<any>[] = [];
  
  while (queue.length > 0 || inProgress.length > 0) {
    // Fill up to concurrency limit
    while (inProgress.length < concurrency && queue.length > 0) {
      const url = queue.shift()!;
      const promise = scrapePageContent(url).then(result => {
        // Remove from inProgress when done
        const index = inProgress.indexOf(promise);
        if (index > -1) inProgress.splice(index, 1);
        return result;
      });
      inProgress.push(promise);
    }
    
    // Wait for at least one to complete
    if (inProgress.length > 0) {
      const result = await Promise.race(inProgress);
      if (result) results.push(result);
    }
  }
  
  return results;
}

export async function scrapePageContent(url: string) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 8000,
      maxRedirects: 3
    });
    
    const $ = cheerio.load(response.data);
    
    // Remove noise
    $('script, style, noscript, iframe, nav, footer, header').remove();
    
    // Extract content
    const title = $('title').text().trim() || '';
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const h1Tags = $('h1').map((_, el) => $(el).text().trim()).get().join(', ');
    const h2Tags = $('h2').map((_, el) => $(el).text().trim()).get().slice(0, 3).join(', ');
    const bodyText = $('body').text().trim().replace(/\s+/g, ' ').substring(0, 1500);
    
    // Check for schema markup
    const schemaScripts = $('script[type="application/ld+json"]').map((_, el) => $(el).html()).get();
    
    return {
      url,
      title,
      metaDescription,
      h1Tags,
      h2Tags,
      bodyText,
      hasSchema: schemaScripts.length > 0,
      schemaCount: schemaScripts.length
    };
  } catch (error) {
    console.error(`Failed to scrape ${url}:`, error);
    return null;
  }
}

// Analyze robots.txt for AI bot directives
export async function analyzeRobotsTxt(baseUrl: string): Promise<RobotsTxtAnalysis> {
  try {
    const robotsUrl = new URL('/robots.txt', baseUrl).href;
    const response = await axios.get(robotsUrl, {
      timeout: 5000,
      validateStatus: (status) => status === 200
    });

    const content = response.data;
    const aiBotPatterns = [
      'GPTBot', 'ChatGPT-User', 'Google-Extended', 'GoogleOther',
      'PerplexityBot', 'ClaudeBot', 'anthropic-ai', 'Claude-Web',
      'Amazonbot', 'cohere-ai', 'Omgilibot', 'FacebookBot', 'Applebot-Extended'
    ];

    const blockedBots: string[] = [];
    const allowedBots: string[] = [];
    const lines = content.split('\n');
    let currentUserAgent = '';
    let globalDisallowAll = false;

    for (const line of lines) {
      const trimmed = line.trim();
      
      // Check for User-agent directive
      if (trimmed.toLowerCase().startsWith('user-agent:')) {
        currentUserAgent = trimmed.substring('user-agent:'.length).trim();
      }
      
      // Check for Disallow directive
      if (trimmed.toLowerCase().startsWith('disallow:') && currentUserAgent) {
        const disallowPath = trimmed.substring('disallow:'.length).trim();
        
        // Check for global disallow rule (User-agent: * with Disallow: /)
        if (currentUserAgent === '*' && disallowPath === '/') {
          globalDisallowAll = true;
        }
        
        // Check if it's an AI bot with disallow
        const isAIBot = aiBotPatterns.some(bot => 
          currentUserAgent.toLowerCase().includes(bot.toLowerCase())
        );
        
        if (isAIBot && (disallowPath === '/' || disallowPath.length > 0)) {
          blockedBots.push(currentUserAgent);
        }
      }
      
      // Check for Allow directive
      if (trimmed.toLowerCase().startsWith('allow:') && currentUserAgent) {
        const isAIBot = aiBotPatterns.some(bot => 
          currentUserAgent.toLowerCase().includes(bot.toLowerCase())
        );
        
        if (isAIBot) {
          allowedBots.push(currentUserAgent);
        }
      }
    }

    // If global disallow exists, all AI bots are blocked unless explicitly allowed
    const aiBotsBlocked = globalDisallowAll || blockedBots.length > 0;

    return {
      exists: true,
      content,
      blocksAIBots: aiBotsBlocked,
      blockedBots: globalDisallowAll ? ['* (all bots)', ...blockedBots] : blockedBots,
      allowedBots
    };
  } catch (error) {
    return {
      exists: false,
      blocksAIBots: false,
      blockedBots: [],
      allowedBots: []
    };
  }
}

// Analyze sitemap.xml
export async function analyzeSitemap(baseUrl: string): Promise<SitemapAnalysis> {
  try {
    const sitemapUrl = new URL('/sitemap.xml', baseUrl).href;
    const response = await axios.get(sitemapUrl, {
      timeout: 5000,
      validateStatus: (status) => status === 200
    });

    const $ = cheerio.load(response.data, { xmlMode: true });
    const urlCount = $('url').length || $('sitemap').length;

    return {
      exists: true,
      urlCount
    };
  } catch (error) {
    return {
      exists: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Check for key pages existence
export async function analyzeKeyPages(discoveredUrls: string[]): Promise<KeyPagesAnalysis> {
  const keyPages = [
    { name: 'Pricing', patterns: ['/pricing', '/plans', '/buy'] },
    { name: 'Features', patterns: ['/features', '/product', '/solutions'] },
    { name: 'Integrations', patterns: ['/integrations', '/marketplace', '/apps', '/extensions'] },
    { name: 'Documentation', patterns: ['/docs', '/documentation', '/api', '/developers', '/guide'] },
    { name: 'Security/Trust', patterns: ['/security', '/trust', '/compliance', '/privacy'] },
    { name: 'FAQ', patterns: ['/faq', '/help', '/support'] },
    { name: 'Case Studies', patterns: ['/case-studies', '/customers', '/success-stories', '/testimonials'] },
    { name: 'Blog', patterns: ['/blog', '/news', '/resources', '/articles'] },
    { name: 'About', patterns: ['/about', '/company', '/team', '/careers'] },
    { name: 'Contact', patterns: ['/contact', '/get-in-touch', '/talk-to-us'] }
  ];

  const found: string[] = [];
  const missing: string[] = [];

  for (const page of keyPages) {
    const pageFound = discoveredUrls.some(url => 
      page.patterns.some(pattern => url.toLowerCase().includes(pattern.toLowerCase()))
    );

    if (pageFound) {
      found.push(page.name);
    } else {
      missing.push(page.name);
    }
  }

  return {
    totalFound: found.length,
    found,
    missing
  };
}

// Check technical foundation
export async function analyzeTechnicalFoundation(baseUrl: string): Promise<TechnicalFoundation> {
  try {
    const urlObj = new URL(baseUrl);
    const isHttps = urlObj.protocol === 'https:';

    const response = await axios.get(baseUrl, {
      timeout: 5000,
      maxRedirects: 3
    });

    const hasSecurityHeaders = !!(
      response.headers['strict-transport-security'] ||
      response.headers['x-frame-options'] ||
      response.headers['x-content-type-options']
    );

    return {
      https: isHttps,
      hasSecurityHeaders
    };
  } catch (error) {
    return {
      https: false,
      hasSecurityHeaders: false
    };
  }
}
