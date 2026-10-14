import axios from "axios";
import * as cheerio from "cheerio";
import { URL } from "url";
import { assertPublicHttpUrl, beforeRedirect, asUrlSafetyError } from "./url-safety";

// A current browser UA — an outdated one (e.g. Chrome/91, from 2021) gets
// fingerprinted and challenge-blocked by Cloudflare/bot-management on many
// sites even though a real browser or AI crawler loads the same page fine.
const SCRAPER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

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
      await assertPublicHttpUrl(currentUrl);
      const response = await axios.get(currentUrl, {
        headers: {
          'User-Agent': SCRAPER_USER_AGENT
        },
        timeout: 8000,
        maxRedirects: 3,
        beforeRedirect,
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
      // URL-safety rejections should always surface, not just for the base URL.
      const safetyError = asUrlSafetyError(error);
      if (safetyError) {
        throw safetyError;
      }

      // If this is the base URL (first page) and it fails, throw a specific error
      if (currentUrl === baseUrl && axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        if (statusCode === 403) {
          throw new Error('BLOCKED:This website blocks automated analysis tools. Your website has security measures preventing our crawler from accessing its content.');
        } else if (statusCode === 502 || statusCode === 503 || statusCode === 504) {
          throw new Error('TEMPORARY:The website is experiencing temporary server issues. Please try again in a few moments.');
        } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          throw new Error('TIMEOUT:The website took too long to respond. The site may be slow or blocking our requests.');
        } else if (statusCode) {
          throw new Error(`HTTP_ERROR:Unable to access website (Error ${statusCode}). Please check the URL and try again.`);
        } else {
          throw new Error('CONNECTION:Unable to connect to the website. Please check the URL and try again.');
        }
      }
      
      // For other pages, just log and continue
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

// Extracts every "@type" declared across one or more JSON-LD scripts,
// including types nested under "@graph" arrays (a common pattern for sites
// that bundle Organization + WebPage + FAQPage etc. into one script tag).
function parseSchemaTypes(schemaScripts: (string | null)[]): string[] {
  const types = new Set<string>();

  const collectFrom = (node: any) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(collectFrom);
      return;
    }
    const t = node["@type"];
    if (typeof t === "string") types.add(t);
    else if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && types.add(x));
    if (Array.isArray(node["@graph"])) node["@graph"].forEach(collectFrom);
  };

  for (const script of schemaScripts) {
    if (!script) continue;
    try {
      collectFrom(JSON.parse(script));
    } catch {
      // Malformed JSON-LD is common enough on real sites; skip it rather
      // than letting one bad script tag fail the whole scrape.
    }
  }

  return Array.from(types);
}

export async function scrapePageContent(url: string) {
  try {
    await assertPublicHttpUrl(url);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': SCRAPER_USER_AGENT
      },
      timeout: 8000,
      maxRedirects: 3,
      beforeRedirect,
    });
    
    const $ = cheerio.load(response.data);

    // Extract schema BEFORE removing <script> tags below — otherwise every
    // <script type="application/ld+json"> has already been deleted from the
    // tree by the time this selector runs, and schema detection silently
    // and permanently returns nothing for every page.
    const schemaScripts = $('script[type="application/ld+json"]').map((_, el) => $(el).html()).get();
    const schemaTypes = parseSchemaTypes(schemaScripts);

    // Remove noise
    $('script, style, noscript, iframe, nav, footer, header').remove();

    // Extract content
    const title = $('title').text().trim() || '';
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const h1List = $('h1').map((_, el) => $(el).text().trim()).get();
    const h2List = $('h2').map((_, el) => $(el).text().trim()).get();
    const h3List = $('h3').map((_, el) => $(el).text().trim()).get();
    const h1Tags = h1List.join(', ');
    const h2Tags = h2List.slice(0, 15).join(', ');
    const h3Tags = h3List.slice(0, 15).join(', ');
    // 6000 chars (~1000 words) instead of 1500 — a content audit that judges
    // FAQ presence, stats, and missing topics needs more than the first
    // couple hundred words, where most of that content lives below the fold.
    const bodyText = $('body').text().trim().replace(/\s+/g, ' ').substring(0, 6000);

    return {
      url,
      title,
      metaDescription,
      h1Tags,
      h1Count: h1List.length,
      h2Tags,
      h2Count: h2List.length,
      h3Tags,
      h3Count: h3List.length,
      bodyText,
      hasSchema: schemaScripts.length > 0,
      schemaCount: schemaScripts.length,
      schemaTypes,
    };
  } catch (error) {
    // A blocked-for-safety rejection is not an ordinary scrape failure —
    // let it surface as a real error instead of silently degrading to a
    // URL-text guess (which would otherwise mask that the target was an
    // SSRF attempt behind a plausible-looking result).
    const safetyError = asUrlSafetyError(error);
    if (safetyError) {
      throw safetyError;
    }
    console.error(`Failed to scrape ${url}:`, error);
    return null;
  }
}

// Analyze robots.txt for AI bot directives
export async function analyzeRobotsTxt(baseUrl: string): Promise<RobotsTxtAnalysis> {
  try {
    const robotsUrl = new URL('/robots.txt', baseUrl).href;
    await assertPublicHttpUrl(robotsUrl);
    const response = await axios.get(robotsUrl, {
      timeout: 5000,
      maxRedirects: 3,
      beforeRedirect,
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
    await assertPublicHttpUrl(sitemapUrl);
    const response = await axios.get(sitemapUrl, {
      timeout: 5000,
      maxRedirects: 3,
      beforeRedirect,
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

    await assertPublicHttpUrl(baseUrl);
    const response = await axios.get(baseUrl, {
      timeout: 5000,
      maxRedirects: 3,
      beforeRedirect,
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
