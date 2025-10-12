import axios from "axios";
import * as cheerio from "cheerio";
import { URL } from "url";

interface CrawlResult {
  pages: string[];
  totalFound: number;
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
