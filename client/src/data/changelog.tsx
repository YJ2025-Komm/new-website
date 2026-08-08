import type { ReactNode } from "react";

export type ChangelogTag = "Feature" | "Improvement" | "Fix" | "AI" | "Content";

// Same hue family already used for pills elsewhere in the app
// (bg-*-100 / text-*-700 pairs) — keep new tags within this set.
export const TAG_STYLES: Record<ChangelogTag, string> = {
  Feature: "bg-blue-100 text-blue-700",
  AI: "bg-purple-100 text-purple-700",
  Improvement: "bg-green-100 text-green-700",
  Fix: "bg-orange-100 text-orange-700",
  Content: "bg-sky-100 text-sky-700",
};

// Standard body template for a changelog section: What it is / How it works /
// How to use it. This is the house style for release-note copy (see the
// June 2026 entry below) — reuse this for every future section instead of
// improvising a new structure each month.
export function ReleaseDetail({
  what,
  how,
  use,
}: {
  what: ReactNode;
  how: ReactNode;
  use: ReactNode;
}) {
  return (
    <>
      <p className="mb-4">
        <span className="font-semibold text-slate-900">What it is:</span> {what}
      </p>
      <p className="mb-4">
        <span className="font-semibold text-slate-900">How it works:</span> {how}
      </p>
      <p>
        <span className="font-semibold text-slate-900">How to use it:</span> {use}
      </p>
    </>
  );
}

// A detail page's body is composed of one or more named sections,
// mirroring how real release notes are written (e.g. "Content Hub launches
// in Action Center"). Each section carries its own screenshot — the detail
// page shows one image per feature, not a single hero.
export type ChangelogSection = {
  heading: string;
  body: ReactNode;
  image?: string;
  imageAlt?: string;
};

export type ChangelogEntry = {
  slug: string;
  date: string; // ISO "2026-06-03" — entries are sorted desc by this
  title: string; // formal title — used on the detail page (hero, SEO, breadcrumb)
  // Short, content-descriptive headline for the list card only (e.g. "Content
  // Hub, Raw Evidence Modal & GEO Agent launch"). The list card's banner
  // already shows the month/year, so repeating "<Month> Product Update" here
  // would be the third restatement of the same date in one card — describe
  // what shipped instead. Falls back to `title` if omitted.
  cardHeadline?: string;
  tags: ChangelogTag[];
  summary: string; // meta description + list-card teaser
  // List-card thumbnail — any one image from this month's release (often
  // reused from one of the sections below). This is the only image shown
  // on /changelog; the detail page's own images live per-section.
  image?: string;
  imageAlt?: string;
  intro: ReactNode; // opening paragraph on the detail page
  sections: ChangelogSection[];
  cta?: { label: string; href: string };
};

export const changelogEntries: ChangelogEntry[] = [
  {
    slug: "june-2026-product-update",
    date: "2026-06-03",
    title: "June 2026 Product Update",
    cardHeadline: "Content Hub, Raw Evidence Modal & GEO Agent launch",
    tags: ["Feature", "AI", "Content"],
    summary:
      "Content Hub turns visibility gaps into ready-to-write content, a Raw Evidence Modal shows the exact AI response behind every score, plus a guided product walkthrough, Your Pages in AI Responses, and GEO Agent — a chat assistant with memory of your last 5 runs.",
    image: "/changelog/june-2026/content-hub.png",
    imageAlt: "Content Hub showing Content Opportunities and Content Optimizer tools",
    intro: (
      <>
        Here's what shipped in June 2026. This release introduces the Content Hub for turning AI
        visibility gaps into ready-to-write content, a Raw Evidence Modal so every score on your
        dashboard traces back to the literal AI response behind it, a guided Product Walkthrough for
        new accounts, the Your Pages in AI Responses module, and GEO Agent — a chat assistant that
        answers questions about your brand's AI visibility using your own tracked data.
      </>
    ),
    sections: [
      {
        heading: "Content Hub launches in Action Center",
        image: "/changelog/june-2026/content-hub.png",
        imageAlt: "Content Hub showing Content Opportunities and Content Optimizer tools",
        body: (
          <ReleaseDetail
            what="A dedicated space that turns AI visibility gaps into ready-to-write content, and turns existing content into a scored improvement plan."
            how={
              <>
                Content Opportunities pulls directly from your latest completed run — every
                recommendation is generated from real gaps in your AI visibility, not generic
                keyword research. Each opportunity expands into a full outline: section objectives,
                talking points, suggested word counts, and an "AI Insight" callout explaining why
                that structure tends to get cited. Content Optimizer works the other direction —
                submit existing content and get GEO-specific improvement recommendations against
                it.
              </>
            }
            use={
              <>
                Go to Action Center → Content Hub. Click any card under Content Opportunities to
                generate a full outline, or switch to Content Optimizer and paste/upload existing
                content for a review.
              </>
            }
          />
        ),
      },
      {
        heading: "Raw Evidence Modal",
        image: "/changelog/june-2026/raw-evidence-modal.png",
        imageAlt: "Raw Evidence modal showing the captured AI response behind a visibility score",
        body: (
          <ReleaseDetail
            what="A way to see the exact AI response behind any score on your dashboard."
            how={
              <>
                Every visibility metric — mentions, sentiment, ranking — is traceable back to the
                literal AI-generated answer that produced it. No aggregated black-box numbers;
                click through and read what the AI actually said.
              </>
            }
            use={
              <>
                Available in multiple places across the dashboard — click the Brand Mentions card
                on Overview, or open any prompt row under Performance Insights → Prompts, to view
                the raw AI response behind that specific data point.
              </>
            }
          />
        ),
      },
      {
        heading: "Product Walkthrough",
        image: "/changelog/june-2026/product-walkthrough.png",
        imageAlt: "Guided product walkthrough tour for new GeoRankers accounts",
        body: (
          <ReleaseDetail
            what="A guided first-run tour for new accounts."
            how={
              <>
                Walks new users through the core dashboard sections — Overview, Trends, Performance
                Insights, Action Center — in sequence, so the product makes sense before you're left
                to explore alone.
              </>
            }
            use={
              <>
                Runs automatically on first login. Can be relaunched anytime from Help &amp;
                Support.
              </>
            }
          />
        ),
      },
      {
        heading: "Your Pages in AI Responses",
        image: "/changelog/june-2026/your-pages.png",
        imageAlt: "Your Pages in AI Responses module listing cited pages and triggering prompts",
        body: (
          <ReleaseDetail
            what="A live view of exactly which of your own URLs are showing up as sources in AI-generated answers."
            how={
              <>
                Tracks every page from your domain cited in a tracked AI response, alongside the
                exact prompt that triggered the citation — so you can connect specific content
                you've published to specific AI visibility outcomes.
              </>
            }
            use={
              <>
                Scroll to the bottom of the Overview page to see "Your Pages in AI Responses," with
                cited page and triggering prompt listed side by side.
              </>
            }
          />
        ),
      },
      {
        heading: "GEO Agent launches",
        image: "/changelog/june-2026/geo-agent.png",
        imageAlt: "GEO Agent chat assistant answering a question about brand AI visibility",
        body: (
          <ReleaseDetail
            what="A chat assistant that answers questions about your brand's AI visibility using your own tracked data."
            how={
              <>
                GEO Agent has memory of your last 5 analysis runs, so it can answer questions about
                trends and changes over time — not just your latest snapshot. Ask it to check your
                visibility, audit citations, or compare competitors directly.
              </>
            }
            use={<>Click "Ask GEO Agent" in the top bar from anywhere in the dashboard.</>}
          />
        ),
      },
    ],
    cta: { label: "Go to Dashboard", href: "https://dashboard.georankers.co/login" },
  },
];
