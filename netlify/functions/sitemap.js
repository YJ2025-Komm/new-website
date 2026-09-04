const STATIC_PAGES = [
  { url: "https://georankers.ai/",                                lastmod: "2026-04-06", priority: "1.0", changefreq: "weekly"  },
  { url: "https://georankers.ai/features",                        lastmod: "2026-04-06", priority: "0.9", changefreq: "monthly" },
  { url: "https://georankers.ai/features/ai-models-tracked",      lastmod: "2026-08-05", priority: "0.8", changefreq: "monthly" },
  { url: "https://georankers.ai/pricing",                         lastmod: "2026-07-14", priority: "0.9", changefreq: "monthly" },
  { url: "https://georankers.ai/geo-guide",                       lastmod: "2026-05-09", priority: "0.9", changefreq: "monthly" },
  { url: "https://georankers.ai/ai-content-guide",                lastmod: "2026-05-09", priority: "0.9", changefreq: "monthly" },
  { url: "https://georankers.ai/geo-glossary",                    lastmod: "2026-07-29", priority: "0.9", changefreq: "monthly" },
  { url: "https://georankers.ai/free-geo-tools/brand-visibility", lastmod: "2026-04-28", priority: "0.8", changefreq: "monthly" },
  { url: "https://georankers.ai/free-geo-tools/geo-audit",        lastmod: "2026-04-28", priority: "0.8", changefreq: "monthly" },
  { url: "https://georankers.ai/free-geo-tools/visibility-score", lastmod: "2026-04-28", priority: "0.8", changefreq: "monthly" },
  { url: "https://georankers.ai/help",                            lastmod: "2026-04-06", priority: "0.6", changefreq: "monthly" },
  { url: "https://georankers.ai/changelog",                       lastmod: "2026-09-03", priority: "0.6", changefreq: "weekly"  },
  { url: "https://georankers.ai/changelog/june-2026-product-update", lastmod: "2026-06-03", priority: "0.5", changefreq: "monthly" },
  { url: "https://georankers.ai/changelog/july-2026-product-update", lastmod: "2026-07-07", priority: "0.5", changefreq: "monthly" },
  { url: "https://georankers.ai/changelog/august-2026-product-update", lastmod: "2026-08-05", priority: "0.5", changefreq: "monthly" },
  { url: "https://georankers.ai/changelog/september-2026-product-update", lastmod: "2026-09-03", priority: "0.5", changefreq: "monthly" },
  { url: "https://georankers.ai/team",                            lastmod: "2026-04-13", priority: "0.7", changefreq: "monthly" },
  { url: "https://georankers.ai/recognition",                     lastmod: "2026-08-18", priority: "0.6", changefreq: "monthly" },
  { url: "https://georankers.ai/privacy",                         lastmod: "2026-04-06", priority: "0.4", changefreq: "yearly"  },
  { url: "https://georankers.ai/terms",                           lastmod: "2026-04-06", priority: "0.4", changefreq: "yearly"  },
];

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

    let lastmod = new Date().toISOString().split("T")[0];
    if (lastmodMatch) {
      try { lastmod = new Date(lastmodMatch[1]).toISOString().split("T")[0]; } catch (_) {}
    }
    posts.push({ url: loc, lastmod, priority: "0.8", changefreq: "monthly" });
  }
  return posts;
}

async function fetchBlogPosts() {
  try {
    const res = await fetch("https://blog.georankers.ai/post-sitemap.xml", {
      headers: { "User-Agent": "GeoRankers-Sitemap/2.0" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseUrlset(xml).sort((a, b) => new Date(b.lastmod) - new Date(a.lastmod));
  } catch (_) {
    return [];
  }
}

function buildXml(staticPages, blogPosts) {
  const entries = [...staticPages, ...blogPosts]
    .map(({ url, lastmod, priority, changefreq }) =>
      `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
}

export const handler = async function () {
  try {
    let blogPosts = [];
    try {
      blogPosts = await fetchBlogPosts();
    } catch (err) {
      console.warn(`[sitemap-fn] blog fetch failed: ${err.message}`);
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
      body: buildXml(STATIC_PAGES, blogPosts),
    };
  } catch (err) {
    console.error(`[sitemap-fn] unexpected error: ${err.message}`);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/xml; charset=utf-8" },
      body: buildXml(STATIC_PAGES, []),
    };
  }
};
