// Build-time sitemap generator + OG image converter
// Runs before `vite build` on Netlify to produce sitemap.xml and og-image.png

import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, "..", "public", "sitemap.xml");

const baseUrl = "https://georankers.co";
const today = new Date().toISOString().split("T")[0];

const mainPages = [
  { url: `${baseUrl}/`, priority: "1.0", changefreq: "weekly" },
  { url: `${baseUrl}/features`, priority: "0.9", changefreq: "monthly" },
  { url: `${baseUrl}/geo-guide`, priority: "0.9", changefreq: "monthly" },
  { url: `${baseUrl}/free-geo-tools/brand-visibility`, priority: "0.8", changefreq: "monthly" },
  { url: `${baseUrl}/free-geo-tools/geo-audit`, priority: "0.8", changefreq: "monthly" },
  { url: `${baseUrl}/free-geo-tools/visibility-score`, priority: "0.8", changefreq: "monthly" },
  { url: `${baseUrl}/help`, priority: "0.6", changefreq: "monthly" },
  { url: `${baseUrl}/privacy`, priority: "0.4", changefreq: "yearly" },
  { url: `${baseUrl}/terms`, priority: "0.4", changefreq: "yearly" },
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client
      .get(url, { headers: { "User-Agent": "GeoRankers-Sitemap-Generator/1.0" } }, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

function parseRss(xml) {
  const posts = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const linkRegex = /<link>(.*?)<\/link>/;
  const dateRegex = /<pubDate>(.*?)<\/pubDate>/;

  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const linkMatch = linkRegex.exec(itemXml);
    const dateMatch = dateRegex.exec(itemXml);

    if (linkMatch) {
      let lastmod = today;
      if (dateMatch) {
        try {
          lastmod = new Date(dateMatch[1]).toISOString().split("T")[0];
        } catch (_) {}
      }
      posts.push({ url: linkMatch[1].trim(), lastmod, priority: "0.8", changefreq: "monthly" });
    }
  }
  return posts;
}

async function generate() {
  console.log("Generating sitemap.xml...");

  let blogPosts = [];

  // Fetch all RSS pages until WordPress returns no more posts
  let page = 1;
  while (true) {
    const feedUrl =
      page === 1
        ? "https://blog.georankers.co/feed/"
        : `https://blog.georankers.co/feed/?paged=${page}`;
    try {
      const xml = await fetchUrl(feedUrl);
      const posts = parseRss(xml);
      if (posts.length === 0) {
        console.log(`  No more posts at page ${page}, stopping.`);
        break;
      }
      blogPosts.push(...posts);
      console.log(`  Page ${page}: fetched ${posts.length} posts`);
      page++;
    } catch (err) {
      console.warn(`  Warning: Could not fetch page ${page} (${feedUrl}): ${err.message}`);
      break;
    }
  }

  // Deduplicate and sort newest first
  const seen = new Set();
  blogPosts = blogPosts
    .filter((p) => {
      if (seen.has(p.url)) return false;
      seen.add(p.url);
      return true;
    })
    .sort((a, b) => new Date(b.lastmod) - new Date(a.lastmod));

  console.log(`  Total blog posts: ${blogPosts.length}`);

  const urlEntries = [...mainPages, ...blogPosts]
    .map(
      (p) => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${p.lastmod || today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  fs.writeFileSync(outputPath, xml, "utf-8");
  console.log(`Sitemap written to ${outputPath} (${mainPages.length} pages + ${blogPosts.length} blog posts)`);

  // Convert og-image.svg → og-image.png for social platform compatibility
  const svgPath = path.join(__dirname, "..", "public", "og-image.svg");
  const pngPath = path.join(__dirname, "..", "public", "og-image.png");
  try {
    await sharp(svgPath).png().toFile(pngPath);
    console.log(`OG image converted: og-image.svg → og-image.png`);
  } catch (err) {
    console.warn(`Warning: Could not convert OG image: ${err.message}`);
  }
}

generate().catch((err) => {
  console.error("Sitemap generation failed:", err);
  process.exit(1);
});
