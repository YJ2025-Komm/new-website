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

const baseUrl = "https://georankers.ai";
const today = new Date().toISOString().split("T")[0];

const mainPages = [
  { url: `${baseUrl}/`, priority: "1.0", changefreq: "weekly" },
  { url: `${baseUrl}/features`, priority: "0.9", changefreq: "monthly" },
  { url: `${baseUrl}/features/ai-models-tracked`, priority: "0.8", changefreq: "monthly" },
  { url: `${baseUrl}/pricing`, priority: "0.9", changefreq: "monthly" },
  { url: `${baseUrl}/geo-guide`, priority: "0.9", changefreq: "monthly" },
  { url: `${baseUrl}/ai-content-guide`, priority: "0.9", changefreq: "monthly" },
  { url: `${baseUrl}/geo-glossary`, priority: "0.9", changefreq: "monthly" },
  { url: `${baseUrl}/free-geo-tools/brand-visibility`, priority: "0.8", changefreq: "monthly" },
  { url: `${baseUrl}/free-geo-tools/geo-audit`, priority: "0.8", changefreq: "monthly" },
  { url: `${baseUrl}/free-geo-tools/visibility-score`, priority: "0.8", changefreq: "monthly" },
  { url: `${baseUrl}/help`, priority: "0.6", changefreq: "monthly" },
  { url: `${baseUrl}/changelog`, priority: "0.6", changefreq: "weekly" },
  { url: `${baseUrl}/changelog/june-2026-product-update`, priority: "0.5", changefreq: "monthly" },
  { url: `${baseUrl}/changelog/july-2026-product-update`, priority: "0.5", changefreq: "monthly" },
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

function parseUrlset(xml) {
  const posts = [];
  const urlRegex = /<url>([\s\S]*?)<\/url>/g;
  const locRegex = /<loc>(.*?)<\/loc>/;
  const lastmodRegex = /<lastmod>(.*?)<\/lastmod>/;

  let match;
  while ((match = urlRegex.exec(xml)) !== null) {
    const urlXml = match[1];
    const locMatch = locRegex.exec(urlXml);
    const lastmodMatch = lastmodRegex.exec(urlXml);
    if (!locMatch) continue;

    const loc = locMatch[1].trim();
    if (loc.replace(/\/$/, "") === "https://blog.georankers.ai") continue;

    let lastmod = today;
    if (lastmodMatch) {
      try {
        lastmod = new Date(lastmodMatch[1]).toISOString().split("T")[0];
      } catch (_) {}
    }
    posts.push({ url: loc, lastmod, priority: "0.8", changefreq: "monthly" });
  }
  return posts;
}

async function generate() {
  console.log("Generating sitemap.xml...");

  let blogPosts = [];

  try {
    const xml = await fetchUrl("https://blog.georankers.ai/post-sitemap.xml");
    blogPosts = parseUrlset(xml).sort((a, b) => new Date(b.lastmod) - new Date(a.lastmod));
  } catch (err) {
    console.warn(`  Warning: Could not fetch post-sitemap.xml: ${err.message}`);
  }

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
