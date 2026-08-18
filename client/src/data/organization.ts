// Single source of truth for the GeoRankers Organization entity in JSON-LD.
//
// Previously this Organization was declared independently in three places
// (client/index.html, home.tsx, team.tsx) with divergent `sameAs` arrays —
// index.html's copy (blog only) bled into every prerendered page since all
// prerenders start from index.html as their base, while home/team carried a
// richer 4-link version. That inconsistency undermines entity disambiguation
// (the whole point of `sameAs`).
//
// Fix: one canonical node with a stable `@id`. Pages that need to represent
// this same entity but don't want to redeclare it reference it by `{ "@id": ORG_ID }`
// instead of re-declaring a (potentially divergent) copy.

export const ORG_ID = "https://georankers.ai/#organization";

export const ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  "@id": ORG_ID,
  "name": "GeoRankers",
  "url": "https://georankers.ai",
  "logo": {
    "@type": "ImageObject",
    "url": "https://georankers.ai/georankers-logo.svg",
    "contentUrl": "https://georankers.ai/georankers-logo.svg",
  },
  "description":
    "GeoRankers is the AI search intelligence platform that helps B2B SaaS companies track, optimize, and build brand authority to get visible in ChatGPT, Google AI Search, and Perplexity.",
  "foundingDate": "2026",
  "founder": {
    "@type": "Person",
    "name": "Yogesh Joshi",
    "jobTitle": "CEO & Founder",
    "url": "https://georankers.ai/team",
    "sameAs": "https://www.linkedin.com/in/yogesh-joshi-5ba94b18/",
  },
  "award": "DPIIT Startup India Recognition",
  "sameAs": [
    "https://blog.georankers.ai",
    "https://www.linkedin.com/company/georankers/",
    "https://x.com/georankers",
    "https://www.facebook.com/people/GeoRankers/61588912087425/",
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "url": "https://georankers.ai",
  },
};
