/**
 * generate-sitemap.mjs
 *
 * Fetches all posts from the WordPress REST API and combines them with the
 * static marketing-site pages to produce client/public/sitemap.xml.
 *
 * Run automatically as part of the build:
 *   node scripts/generate-sitemap.mjs
 */

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITEMAP_PATH = resolve(__dirname, "../client/public/sitemap.xml");
const WP_API = "https://blog.georankers.co/wp-json/wp/v2/posts";

// ─── Static marketing-site pages ─────────────────────────────────────────────
const STATIC_PAGES = [
  { loc: "https://georankers.ai/",                                lastmod: "2026-04-06", changefreq: "weekly",  priority: "1.0" },
  { loc: "https://georankers.ai/features",                        lastmod: "2026-04-06", changefreq: "monthly", priority: "0.9" },
  { loc: "https://georankers.ai/geo-guide",                       lastmod: "2026-05-09", changefreq: "monthly", priority: "0.9" },
  { loc: "https://georankers.ai/ai-content-guide",                lastmod: "2026-05-09", changefreq: "monthly", priority: "0.9" },
  { loc: "https://georankers.ai/free-geo-tools/brand-visibility", lastmod: "2026-04-28", changefreq: "monthly", priority: "0.8" },
  { loc: "https://georankers.ai/free-geo-tools/geo-audit",        lastmod: "2026-04-28", changefreq: "monthly", priority: "0.8" },
  { loc: "https://georankers.ai/free-geo-tools/visibility-score", lastmod: "2026-04-28", changefreq: "monthly", priority: "0.8" },
  { loc: "https://georankers.ai/help",                            lastmod: "2026-04-06", changefreq: "monthly", priority: "0.6" },
  { loc: "https://georankers.ai/team",                            lastmod: "2026-04-13", changefreq: "monthly", priority: "0.7" },
  { loc: "https://georankers.ai/privacy",                         lastmod: "2026-04-06", changefreq: "yearly",  priority: "0.4" },
  { loc: "https://georankers.ai/terms",                           lastmod: "2026-04-06", changefreq: "yearly",  priority: "0.4" },
];

// ─── Fetch all blog posts (paginated) ─────────────────────────────────────────
async function fetchAllPosts() {
  const posts = [];
  let page = 1;

  while (true) {
    const url = `${WP_API}?per_page=100&page=${page}&_fields=link,date,modified&orderby=date&order=desc`;
    console.log(`[sitemap] fetching blog posts page ${page}…`);

    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 400) break; // WP returns 400 when page exceeds total
      throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;

    posts.push(...data);

    // Check if there are more pages
    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
    if (page >= totalPages) break;
    page++;
  }

  console.log(`[sitemap] fetched ${posts.length} blog posts`);
  return posts;
}

// ─── Build XML ────────────────────────────────────────────────────────────────
function buildSitemap(staticPages, posts) {
  const toDate = (iso) => iso.split("T")[0]; // "2026-05-26T07:44:39" → "2026-05-26"

  const staticXml = staticPages.map(({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join("\n");

  const blogXml = posts.map(({ link, modified }) => `  <url>
    <loc>${link.replace(/\/$/, "")}/</loc>
    <lastmod>${toDate(modified)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${blogXml}
</urlset>`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
try {
  const posts = await fetchAllPosts();
  const xml = buildSitemap(STATIC_PAGES, posts);
  writeFileSync(SITEMAP_PATH, xml, "utf-8");
  console.log(`[sitemap] written to ${SITEMAP_PATH} (${STATIC_PAGES.length} pages + ${posts.length} blog posts)`);
} catch (err) {
  // Don't fail the whole build if the blog is temporarily unreachable.
  // The existing static sitemap will be used as-is.
  console.warn(`[sitemap] WARNING: could not fetch blog posts — ${err.message}`);
  console.warn("[sitemap] Keeping existing sitemap.xml unchanged.");
  process.exit(0); // exit 0 so the build continues
}
