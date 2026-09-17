// Directory / listing platform badges displayed on /recognition.
// Badges are hotlinked exactly as each platform issued them — some verifiers scan
// for their own image URL, so do not swap to a self-hosted copy until a listing
// is confirmed live.
//
// `badgeWidth` / `badgeHeight` are the MEASURED intrinsic dimensions of each badge
// asset, not the (sometimes wrong) numbers in the platform's own embed snippet.
//
// `href` points at our profile only where it currently resolves; otherwise it
// points at the platform homepage so the page never ships a broken outbound link.
// `profileUrl` records the intended deep link (including for platforms where the
// listing isn't live yet) so a future sameAs pass is a data read, not a re-investigation.

export interface Listing {
  name: string;
  description: string;
  badgeSrc: string;
  badgeWidth: number;
  badgeHeight: number;
  href: string;
  profileUrl: string | null;
  // Platforms that specifically asked for their badge on the homepage. Since
  // Footer.tsx renders on every page, putting the badge there (next to DPIIT,
  // in the bottom bar) satisfies that on the homepage without a dedicated
  // homepage-only section. Full card still appears on /recognition regardless.
  featuredBadge?: boolean;
}

export const LISTINGS: Listing[] = [
  {
    name: "Startup Fame",
    description: "A directory where new startups and SaaS products are featured with reviews, pricing, and alternatives for people comparing tools.",
    badgeSrc: "https://startupfa.me/badges/featured-badge.webp",
    badgeWidth: 171,
    badgeHeight: 54,
    href: "https://startupfa.me/s/georankers",
    profileUrl: "https://startupfa.me/s/georankers",
    featuredBadge: true,
  },
  {
    name: "Dang AI",
    description: "A curated directory of AI-powered products and tools for people discovering new AI software.",
    badgeSrc: "https://assets.dang.ai/badges/dang-verified-light.png",
    badgeWidth: 550,
    badgeHeight: 198,
    href: "https://dang.ai/tool/georankers-ai-search-visibility-tracking",
    profileUrl: "https://dang.ai/tool/georankers-ai-search-visibility-tracking",
  },
  {
    name: "Fazier",
    description: "A launch platform where new products are submitted and discovered by early adopters and fellow founders.",
    badgeSrc: "https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=light",
    badgeWidth: 182,
    badgeHeight: 43,
    href: "https://fazier.com/launches/georankers",
    profileUrl: "https://fazier.com/launches/georankers",
  },
  {
    name: "Tool Pilot",
    description: "A directory that helps people find and compare software tools by use case.",
    badgeSrc: "https://www.toolpilot.ai/cdn/shop/files/f-w_690x151_crop_center.png",
    badgeWidth: 300,
    badgeHeight: 66,
    href: "https://www.toolpilot.ai/products/georankers-1",
    profileUrl: "https://www.toolpilot.ai/products/georankers-1",
  },
  {
    name: "Findly.tools",
    description: "A discovery directory for AI and software tools, organized so people can browse by category.",
    badgeSrc: "/listings/findly.svg",
    badgeWidth: 139,
    badgeHeight: 44,
    href: "https://findly.tools/georankers",
    profileUrl: "https://findly.tools/georankers",
  },
  {
    name: "LaunchNest",
    description: "A launch directory where early-stage products are featured for founders and early adopters tracking new releases.",
    badgeSrc: "https://launchnest.io/badge/georankers.svg?variant=featured&theme=light",
    badgeWidth: 590,
    badgeHeight: 150,
    href: "https://launchnest.io",
    profileUrl: "https://launchnest.io/p/georankers",
  },
  {
    name: "Tools Cafe",
    description: "A curated directory of software and AI tools for people browsing options by category.",
    badgeSrc: "https://tools.cafe/b/light.svg",
    badgeWidth: 256,
    badgeHeight: 80,
    href: "https://tools.cafe",
    profileUrl: null,
  },
  {
    name: "Lifto",
    description: "A product discovery platform where new SaaS tools are featured for teams looking for software to try.",
    badgeSrc: "https://liftoapp.com/badges/featured-light.svg",
    badgeWidth: 200,
    badgeHeight: 54,
    href: "https://liftoapp.com/product/georankers",
    profileUrl: "https://liftoapp.com/product/georankers",
  },
  {
    name: "Launchstag",
    description: "A launch platform where new products are submitted and discovered by early adopters.",
    badgeSrc: "https://launchstag.com/badge-light.svg",
    badgeWidth: 396,
    badgeHeight: 124,
    href: "https://launchstag.com/p/georankers",
    profileUrl: "https://launchstag.com/p/georankers",
  },
  {
    name: "ToolTrim",
    description: "A directory that helps people shortlist and compare software tools before they commit.",
    badgeSrc: "https://tooltrim.com/tooltrim-badge.svg",
    badgeWidth: 216,
    badgeHeight: 54,
    href: "https://tooltrim.com/?utm_source=georankers&utm_medium=badge&utm_campaign=tool_submission",
    profileUrl: null,
  },
  {
    name: "Product Hunt",
    description: "A launch platform where new products are discovered, discussed, and followed by early adopters and the tech community.",
    badgeSrc: "https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=1285731&theme=light",
    badgeWidth: 250,
    badgeHeight: 54,
    href: "https://www.producthunt.com/products/georankers?utm_source=badge-follow&utm_medium=badge&utm_source=badge-georankers",
    profileUrl: "https://www.producthunt.com/products/georankers",
  },
];
