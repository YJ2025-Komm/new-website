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
    name: "Turbo0",
    description: "A directory of indie and early-stage software tools, built to help builders get early users and feedback.",
    badgeSrc: "https://img.turbo0.com/badge-listed-light.svg",
    badgeWidth: 482,
    badgeHeight: 161,
    href: "https://turbo0.com/item/georankers",
    profileUrl: "https://turbo0.com/item/georankers",
  },
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
    href: "https://dang.ai",
    profileUrl: null,
  },
  {
    name: "Fazier",
    description: "A launch platform where new products are submitted and discovered by early adopters and fellow founders.",
    badgeSrc: "https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=light",
    badgeWidth: 182,
    badgeHeight: 43,
    href: "https://fazier.com",
    profileUrl: null,
  },
  {
    name: "Submit AI Tools",
    description: "A submission directory listing AI tools by category for people searching for AI software.",
    badgeSrc: "https://submitaitools.org/static_submitaitools/images/submitaitools.png",
    badgeWidth: 600,
    badgeHeight: 200,
    href: "https://submitaitools.org",
    profileUrl: null,
  },
  {
    name: "Tool Pilot",
    description: "A directory that helps people find and compare software tools by use case.",
    badgeSrc: "https://www.toolpilot.ai/cdn/shop/files/f-w_690x151_crop_center.png",
    badgeWidth: 300,
    badgeHeight: 66,
    href: "https://www.toolpilot.ai",
    profileUrl: null,
  },
  {
    name: "Findly.tools",
    description: "A discovery directory for AI and software tools, organized so people can browse by category.",
    badgeSrc: "/listings/findly.svg",
    badgeWidth: 139,
    badgeHeight: 44,
    href: "https://findly.tools",
    profileUrl: "https://findly.tools/georankers",
  },
  {
    name: "Startups.fm",
    description: "A discovery directory that features new startups for people looking for emerging products.",
    badgeSrc: "https://startups.fm/badge/georankers",
    badgeWidth: 760,
    badgeHeight: 200,
    href: "https://startups.fm",
    profileUrl: "https://startups.fm/startups/georankers",
  },
  {
    name: "Acid Tools",
    description: "A directory of AI tools organized by category for people evaluating software options.",
    badgeSrc: "https://acidtools.com/assets/images/badge.png",
    badgeWidth: 175,
    badgeHeight: 54,
    href: "https://acidtools.com",
    profileUrl: "https://acidtools.com/ai/georankers",
    featuredBadge: true,
  },
];
