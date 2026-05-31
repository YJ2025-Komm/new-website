const STATIC_PAGES = [
  { url: "https://georankers.co/",                                lastmod: "2026-04-06", priority: "1.0", changefreq: "weekly"  },
  { url: "https://georankers.co/features",                        lastmod: "2026-04-06", priority: "0.9", changefreq: "monthly" },
  { url: "https://georankers.co/geo-guide",                       lastmod: "2026-05-09", priority: "0.9", changefreq: "monthly" },
  { url: "https://georankers.co/ai-content-guide",                lastmod: "2026-05-09", priority: "0.9", changefreq: "monthly" },
  { url: "https://georankers.co/free-geo-tools/brand-visibility", lastmod: "2026-04-28", priority: "0.8", changefreq: "monthly" },
  { url: "https://georankers.co/free-geo-tools/geo-audit",        lastmod: "2026-04-28", priority: "0.8", changefreq: "monthly" },
  { url: "https://georankers.co/free-geo-tools/visibility-score", lastmod: "2026-04-28", priority: "0.8", changefreq: "monthly" },
  { url: "https://georankers.co/help",                            lastmod: "2026-04-06", priority: "0.6", changefreq: "monthly" },
  { url: "https://georankers.co/team",                            lastmod: "2026-04-13", priority: "0.7", changefreq: "monthly" },
  { url: "https://georankers.co/privacy",                         lastmod: "2026-04-06", priority: "0.4", changefreq: "yearly"  },
  { url: "https://georankers.co/terms",                           lastmod: "2026-04-06", priority: "0.4", changefreq: "yearly"  },
];

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
    if (!linkMatch) continue;

    let lastmod = new Date().toISOString().split("T")[0];
    if (dateMatch) {
      try { lastmod = new Date(dateMatch[1]).toISOString().split("T")[0]; } catch (_) {}
    }
    posts.push({ url: linkMatch[1].trim(), lastmod, priority: "0.8", changefreq: "monthly" });
  }
  return posts;
}

async function fetchBlogPosts() {
  const posts = [];
  const seen = new Set();

  for (let page = 1; page <= 20; page++) {
    const feedUrl = page === 1
      ? "https://blog.georankers.co/feed/"
      : `https://blog.georankers.co/feed/?paged=${page}`;

    let xml;
    try {
      const res = await fetch(feedUrl, {
        headers: { "User-Agent": "GeoRankers-Sitemap/2.0" },
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) break;
      xml = await res.text();
    } catch (_) {
      break;
    }

    const pagePosts = parseRss(xml);
    if (pagePosts.length === 0) break;

    for (const p of pagePosts) {
      if (!seen.has(p.url)) { seen.add(p.url); posts.push(p); }
    }
  }

  return posts.sort((a, b) => new Date(b.lastmod) - new Date(a.lastmod));
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
