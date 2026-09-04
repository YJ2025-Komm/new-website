import type { ReactNode } from "react";

// `summary` does double duty as the visible list-card teaser AND the literal
// <meta name="description"> content — those have different ideal lengths (a
// card can run long; a meta description gets hard-truncated by Google around
// ~155-160 chars). Use this when passing a description to useSEO so the
// visible card can stay descriptive while the <meta> tag doesn't get cut off
// mid-sentence with "...".
export function truncateForMeta(text: string, maxLength = 155): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}

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
// in Action Center"). Each section carries its own screenshot(s) — the detail
// page shows images per feature, not a single hero. Most sections need just
// one (the feature itself); some need two — a "where to find it" nav
// screenshot first, then the feature screenshot — when the location isn't
// obvious from the body copy alone. Order matters: images render in array order.
// width/height are the source PNG's actual pixel dimensions (not the
// rendered size) — passing them as native <img> attributes lets the browser
// reserve the correct aspect-ratio space before the image downloads, which
// prevents layout shift (CLS). Optional so authoring a new entry still works
// without them, but include them when possible: check dimensions with
// `node -e` reading the PNG's IHDR chunk (bytes 16-24), or any image tool.
export type ChangelogSectionImage = { src: string; alt: string; width?: number; height?: number };

// Consistent card (background/border/padding), but NOT a fixed height —
// screenshots range from wide full-dashboard views to tall narrow panel
// crops, and forcing them into one box height shrinks the narrow ones down
// to near-illegible. Capping only max-height (not height) lets each image
// keep its own aspect ratio at a readable size instead of being squashed.
// Exported so both the section-level image list (below) and inline images
// inside a section's body (e.g. TrendsFeature) render identically.
export function SectionImage({ src, alt, width, height }: ChangelogSectionImage) {
  return (
    <div className="flex justify-center rounded-[1.5rem] border border-blue-200 bg-gradient-to-br from-blue-100 to-violet-100 shadow-lg shadow-blue-100/60 p-4 sm:p-6">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="max-w-full max-h-[36rem] w-auto h-auto object-contain rounded-lg"
      />
    </div>
  );
}

// Sub-feature block for a section that bundles multiple related capabilities
// under one heading with one shared "How to use it" (e.g. the Trends tab's
// nine cards) — each sub-feature only gets "What it is" / "How it works", plus
// its own inline image right after the text (not bundled with the other
// sub-features' images at the end of the section — with 8+ screenshots for
// one heading, images must sit next to the text they illustrate or the
// pairing is unreadable).
function TrendsFeature({
  heading,
  what,
  how,
  image,
}: {
  heading: string;
  what: ReactNode;
  how: ReactNode;
  image?: ChangelogSectionImage;
}) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{heading}</h3>
      <p className="mb-2">
        <span className="font-semibold text-slate-900">What it is:</span> {what}
      </p>
      <p className={image ? "mb-4" : ""}>
        <span className="font-semibold text-slate-900">How it works:</span> {how}
      </p>
      {image && <SectionImage {...image} />}
    </div>
  );
}

export type ChangelogSection = {
  heading: string;
  body: ReactNode;
  images?: ChangelogSectionImage[];
  // "stack" (default): each image full-width, one below the next. "row": all
  // images sit side by side in one row (e.g. a before/after pair like the
  // On-Demand Run trigger + confirmation dialog) — only use this when the
  // images are meant to be compared together, not read as a sequence.
  imagesLayout?: "stack" | "row";
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
        Over the past month, we launched the Content Hub, turning AI visibility gaps into
        ready-to-write content, added a Raw Evidence Modal so every score on your dashboard traces
        back to the literal AI response behind it, introduced a guided Product Walkthrough for new
        accounts, added the Your Pages in AI Responses module, and rolled out GEO Agent, a chat
        assistant that answers questions about your brand's AI visibility using your own tracked
        data.
      </>
    ),
    sections: [
      {
        heading: "Content Hub launches in Action Center",
        images: [
          { src: "/changelog/june-2026/content-hub.png", alt: "Content Hub showing Content Opportunities and Content Optimizer tools", width: 1857, height: 738 },
        ],
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
        images: [
          { src: "/changelog/june-2026/raw-evidence-modal.png", alt: "Raw Evidence modal showing the captured AI response behind a visibility score", width: 786, height: 736 },
        ],
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
        images: [
          { src: "/changelog/june-2026/product-walkthrough.png", alt: "Guided product walkthrough tour for new GeoRankers accounts", width: 322, height: 316 },
        ],
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
        images: [
          { src: "/changelog/june-2026/your-pages.png", alt: "Your Pages in AI Responses module listing cited pages and triggering prompts", width: 1160, height: 620 },
        ],
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
        images: [
          { src: "/changelog/june-2026/geo-agent.png", alt: "GEO Agent chat assistant answering a question about brand AI visibility", width: 379, height: 811 },
        ],
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
  {
    slug: "july-2026-product-update",
    date: "2026-07-07",
    title: "July 2026 Product Update",
    cardHeadline: "Model-Wise Visibility, Automated Weekly Runs & Highest Priority Prompts",
    tags: ["Feature", "Improvement", "AI"],
    summary:
      "See visibility broken out per AI model instead of one blended score, get automated weekly prompt runs, surface Negative AI Framing with raw evidence, spot your Highest Priority prompts to target, audit any page with the AI Readiness Checker, track specific signals over time, and invite teammates with role-based access.",
    image: "/changelog/july-2026/model-wise-visibility.png",
    imageAlt: "Model-Wise Visibility breakdown showing mention rate and rank per AI platform",
    intro: (
      <>
        This past month brought a per-model breakdown of your visibility data, automated weekly
        prompt runs, Negative AI Framing surfaced with raw evidence, Highest Priority prompts
        flagged for you to target, a standalone AI Readiness Checker, Signal Tracker built into
        Recommendations, and the ability to invite teammates with role-based access.
      </>
    ),
    sections: [
      {
        heading: "Model-Wise Visibility Breakdown",
        images: [
          { src: "/changelog/july-2026/model-wise-visibility.png", alt: "Model-Wise Visibility breakdown showing mention rate and rank per AI platform", width: 888, height: 366 },
        ],
        body: (
          <ReleaseDetail
            what="A per-model view of how your brand performs across each AI platform individually, instead of one blended score."
            how={
              <>
                Breaks out mention rate, prompts run, and rank separately for ChatGPT, Google AI
                Mode, and Google AI Overview — plus which competitor is winning each model and
                their top-cited domains — so you can see if you're strong on one platform and
                invisible on another.
              </>
            }
            use={
              <>
                Find the Model-Wise Visibility card on the Overview page, or the full breakdown
                under Performance Insights.
              </>
            }
          />
        ),
      },
      {
        heading: "Automated Prompt Runs",
        images: [
          { src: "/changelog/july-2026/automated-prompt-runs.png", alt: "Tracking setup panel with seed prompts, AI models, and Save Tracking Setup button", width: 754, height: 848 },
        ],
        body: (
          <ReleaseDetail
            what="Scheduled analysis now runs on a weekly cadence."
            how={
              <>
                Once your tracking setup is saved, GeoRankers runs your prompts against all
                enabled AI models automatically every week — no manual trigger required to keep
                your visibility data current.
              </>
            }
            use={
              <>
                Update your competitors, seed prompts, or tracked models anytime inside Edit
                Tracking Setup. We use your last saved configuration for the next scheduled run —
                check Previous Analytics to see your run history.
              </>
            }
          />
        ),
      },
      {
        heading: "Negative AI Framing Surfaced",
        images: [
          { src: "/changelog/july-2026/negative-ai-framing.png", alt: "Negative AI Framing view showing raw evidence and severity per instance", width: 1869, height: 385 },
        ],
        body: (
          <ReleaseDetail
            what="A dedicated view of moments where AI-generated answers describe your brand negatively, weakly, or as a worse fit than competitors."
            how={
              <>
                Scans tracked AI responses for negative or unfavorable framing of your brand
                specifically and surfaces each instance with the raw evidence and severity, so you
                know exactly where the negative narrative is coming from instead of only seeing an
                aggregate sentiment score.
              </>
            }
            use={<>Find "Negative AI Framing" inside Executive Summary.</>}
          />
        ),
      },
      {
        heading: "AI Readiness Checker",
        images: [
          { src: "/changelog/july-2026/ai-readiness-checker.png", alt: "AI Readiness Checker showing pass/fail results for a checked URL", width: 1876, height: 517 },
        ],
        body: (
          <ReleaseDetail
            what="A tool that audits whether a specific page on your site is technically structured well enough to be cited by AI platforms."
            how={
              <>
                Enter any URL and run a check against core technical requirements plus content
                intelligence factors (entity definition, category anchoring, terminology) — you
                get a pass/fail on core checks and a list of any gaps holding the page back from
                citation.
              </>
            }
            use={
              <>
                Go to Action Center → AI Readiness Checker, paste in a URL, and click Run Check.
              </>
            }
          />
        ),
      },
      {
        heading: "Signal Tracker in Recommendations",
        images: [
          { src: "/changelog/july-2026/signal-tracker.png", alt: "Signal Tracker showing whether a tagged success signal appears across recent runs", width: 1863, height: 730 },
        ],
        body: (
          <ReleaseDetail
            what="A way to track whether a specific action you've taken is actually showing up in AI responses over time."
            how={
              <>
                Tag a success signal — a specific mention, ranking, or citation you're trying to
                achieve — and Signal Tracker checks for it across your last 10 runs, showing
                whether it's being consistently seen, seen occasionally, or not yet appearing.
              </>
            }
            use={
              <>
                Go to Action Center → Recommendations → Signal Tracker. Signals are attached
                directly to specific recommendations, so you can see if the action you took
                actually moved the needle.
              </>
            }
          />
        ),
      },
      {
        heading: "Invite Your Team",
        images: [
          { src: "/changelog/july-2026/invite-team.png", alt: "Team Members panel showing Admin, Editor, and Viewer role options", width: 1662, height: 672 },
        ],
        body: (
          <ReleaseDetail
            what="The ability to add teammates directly to your GeoRankers account with role-based access."
            how={
              <>
                Invited teammates can be added as Admin (full control — billing, users, and all
                analysis/reporting features), Editor (can run analysis and manage content —
                competitors, keywords, reports), or Viewer (read-only access to dashboards and
                reports).
              </>
            }
            use={
              <>
                Click your account menu and select Teams, then enter your teammate's email along
                with their role. They'll receive a link on their email using which they can join
                the team and start using GeoRankers.
              </>
            }
          />
        ),
      },
      {
        heading: "Highest Priority Tags in Prompts",
        images: [
          { src: "/changelog/july-2026/highest-priority-tags.png", alt: "Highest Priority badge on a prompt in the Prompts tab, with tooltip explaining the flag", width: 996, height: 405 },
        ],
        body: (
          <ReleaseDetail
            what={<>A "🔥 Highest Priority" badge that flags the prompts where you most urgently need to get cited.</>}
            how={
              <>
                GeoRankers evaluates each prompt based on how your competitors are performing
                against you — complete gaps, unstable visibility across platforms, high-intent
                comparison/pricing/trust/use-case queries where competitors show up and you don't,
                or negative framing tied to that query — and tags the highest-impact ones with
                specific reasons in a tooltip.
              </>
            }
            use={
              <>
                Go to the Prompts tab and look for the 🔥 Highest Priority badge next to a prompt;
                hover it to see exactly why it was flagged.
              </>
            }
          />
        ),
      },
    ],
    cta: { label: "Go to Dashboard", href: "https://dashboard.georankers.co/login" },
  },
  {
    slug: "august-2026-product-update",
    date: "2026-08-05",
    title: "August 2026 Product Update",
    cardHeadline: "Trends Section, Perplexity Tracking & On-Demand Runs",
    tags: ["Feature", "Improvement", "AI"],
    summary:
      "Trends brings a run-over-run view of your visibility, models, competitors, sentiment, and citations across a 15/30/45/60-day window. Plus Perplexity is now tracked, Google AI Mode and AI Overview are consolidated into Google AI Search, and on-demand runs let you trigger a fresh analysis without waiting for the schedule.",
    image: "/changelog/august-2026/trends-kpi.png",
    imageAlt: "Trend KPI summary showing Period Start, Latest, and Best Visibility plus Current Sentiment",
    intro: (
      <>
        Last month's biggest addition was Trends, giving you a run-over-run view of how your
        visibility, models, competitors, sentiment, and citations change over time. We also added
        Perplexity as a tracked model, consolidated Google AI Mode and AI Overview into a single
        Google AI Search platform, and added on-demand runs so you can trigger a fresh analysis
        whenever you need one.
      </>
    ),
    sections: [
      {
        heading: "Trends Section Launch",
        body: (
          <>
            <p className="mb-4">
              Trends is your run-over-run view of GeoRankers — instead of looking at a single
              analysis in isolation, it shows how your visibility score, model performance,
              competitors, sentiment, negative framing, signals, and citations have changed across
              your recent runs. You can view this over a 15/30/45/60-day window (Free and Launch
              plans see up to 30 days).
            </p>

            <TrendsFeature
              heading="Trend KPI Summary"
              what="A top-line snapshot of your visibility trajectory for the selected window."
              how={
                <>
                  Shows Period Start Visibility, Latest Visibility (with the change vs. the prior
                  run), Best Visibility, and Current Sentiment, so you get the headline movement
                  before scrolling into the detailed cards.
                </>
              }
              image={{ src: "/changelog/august-2026/trends-kpi.png", alt: "Trend KPI summary showing Period Start, Latest, and Best Visibility plus Current Sentiment", width: 1867, height: 238 }}
            />
            <TrendsFeature
              heading="Visibility Trend Chart"
              what="A line chart of your brand's visibility score and mention count over time, with optional overlay lines for up to 3 competitors."
              how={
                <>
                  Plots your score and mentions per run, and lets you toggle competitors on/off
                  from a dropdown to see how your trend compares to theirs run over run.
                </>
              }
              image={{ src: "/changelog/august-2026/trends-visibility-trend.png", alt: "Visibility Trend chart showing score and mentions over time with competitor overlay", width: 1858, height: 375 }}
            />
            <TrendsFeature
              heading="Model Performance Trend"
              what="A breakdown of how your visibility score trends separately on each AI model you track."
              how={
                <>
                  Plots a separate trend line per model (ChatGPT, Google AI Mode, Google AI
                  Overview, Perplexity, etc.) and summarizes each model's placement quality as a
                  top/mid/low tier bar, so you can see which model is improving and which is
                  falling behind.
                </>
              }
              image={{ src: "/changelog/august-2026/trends-model-performance.png", alt: "Model Performance Trend showing a trend line and tier per AI model", width: 921, height: 549 }}
            />
            <TrendsFeature
              heading="Competitor Movement"
              what="A run-over-run view of how you and your competitors are gaining or losing ground."
              how={
                <>
                  Shows each competitor's score change since the last run (up/down/no change)
                  alongside their current value, so movement — not just the current snapshot — is
                  the first thing you see.
                </>
              }
              image={{ src: "/changelog/august-2026/trends-competitor-movement.png", alt: "Competitor Movement showing AI visibility and mention change since the last run", width: 903, height: 505 }}
            />
            <TrendsFeature
              heading="Sentiment History"
              what="A heatmap of how AI sentiment toward your brand (Positive/Neutral/Negative) has shifted run over run."
              how={
                <>
                  Colors each run's cell by the dominant sentiment level, with intensity scaled to
                  that run's visibility score, so you can spot both sentiment shifts and their
                  strength at a glance.
                </>
              }
              image={{ src: "/changelog/august-2026/trends-sentiment-history.png", alt: "Sentiment History heatmap showing dominant sentiment per run", width: 922, height: 369 }}
            />
            <TrendsFeature
              heading="Negative AI Framing Over Time"
              what="A running log of every instance where AI answers described your brand negatively, across the runs in your selected window."
              how={
                <>
                  Lists each occurrence with its date, the framing phrase, severity
                  (high/moderate), and source, and collapses repeated occurrences of the same
                  phrase so you can expand to see every instance if needed.
                </>
              }
              image={{ src: "/changelog/august-2026/trends-negative-ai-framing.png", alt: "Negative AI Framing log showing date, framing phrase, and source per instance", width: 912, height: 400 }}
            />
            <TrendsFeature
              heading="Signal Activity Log"
              what="A history of your tracked recommendation signals and whether they're being seen across recent runs."
              how={
                <>
                  Lists each tracked signal with its status (Consistently Seen, Seen Recently, Seen
                  Occasionally, Not Seen Yet), tracked runs, mention count, and last-seen date,
                  filtered to your selected trend window.
                </>
              }
              image={{ src: "/changelog/august-2026/trends-signal-activity.png", alt: "Signal Activity log showing tracked signals, status, and last-seen date", width: 1836, height: 454 }}
            />
            <TrendsFeature
              heading="Your Pages Trend"
              what="A run-by-run view of how many of your own pages are being cited in AI responses."
              how={
                <>
                  Plots cited-page count per run as a clickable line chart — click any point to see
                  exactly which of your pages were cited in that run.
                </>
              }
              image={{ src: "/changelog/august-2026/trends-your-pages.png", alt: "Your Pages Trend chart showing cited page count per run", width: 904, height: 537 }}
            />
            <TrendsFeature
              heading="Source Platforms"
              what="A breakdown of which domains/platforms AI responses cite most often as sources."
              how={
                <>
                  Bar chart of total citations per platform across your selected window; click a
                  bar to see the specific pages cited from that platform.
                </>
              }
              image={{ src: "/changelog/august-2026/trends-source-platforms.png", alt: "Source Platforms bar chart showing total citations per domain across the selected window", width: 897, height: 552 }}
            />

            <p className="mt-6">
              <span className="font-semibold text-slate-900">How to use it:</span> Open the Trends
              tab from the main navigation, alongside Overview, Performance Insights, and Action
              Center. Use the 15/30/45/60-day selector at the top to change the window.
            </p>
          </>
        ),
      },
      {
        heading: "Added Perplexity Model Tracking",
        images: [
          { src: "/changelog/august-2026/perplexity-model-tracking.png", alt: "Model-Wise Visibility showing Perplexity alongside ChatGPT and Google AI Search", width: 925, height: 397 },
        ],
        body: (
          <ReleaseDetail
            what="Perplexity is now tracked as one of the AI platforms in your visibility analysis, alongside ChatGPT and Google AI."
            how={
              <>
                Your prompts are run against Perplexity on the same schedule as your other tracked
                models, and its results feed into your mention rate, rank, and Model-Wise
                Visibility breakdown just like the rest.
              </>
            }
            use={
              <>
                No setup needed — Perplexity results appear automatically anywhere model-level data
                is shown (Overview, Prompts, Model-Wise Visibility).
              </>
            }
          />
        ),
      },
      {
        heading: "Consolidation of Google AI Mode and AI Overview to Google AI Search",
        body: (
          <ReleaseDetail
            what={<>Google AI Mode and Google AI Overview are now tracked together under a single "Google AI Search" platform.</>}
            how={
              <>
                Following Google's own consolidation at Google I/O (Gemini 3.5 Flash becoming the
                default model powering AI Mode in Google Search worldwide), we're aligning our
                tracking to match — reflecting how Google itself now unifies these surfaces.
              </>
            }
            use={
              <>
                You'll see "Google AI Search" wherever you previously saw AI Mode / AI Overview as
                separate platforms — no action needed on your end.
              </>
            }
          />
        ),
      },
      {
        heading: "On-Demand Run Capability with Limits",
        // Side by side, not stacked — these two read as one before/after pair
        // (trigger it → confirm it), not a sequence of separate screenshots.
        images: [
          { src: "/changelog/august-2026/on-demand-run-1.png", alt: "Trigger Run button in Past Runs showing remaining runs this month", width: 384, height: 355 },
          { src: "/changelog/august-2026/on-demand-run-2.png", alt: "Trigger Immediate Run confirmation dialog showing runs remaining", width: 661, height: 457 },
        ],
        imagesLayout: "row",
        body: (
          <ReleaseDetail
            what="The ability to trigger a fresh analysis run whenever you need one, without waiting for the next scheduled run."
            how={
              <>
                Each plan gets a monthly on-demand run allowance (Launch: 1/month, Grow/Enterprise/Agency:
                3/month). Runs count against this cap, and the allowance resets on the 1st of each
                month.
              </>
            }
            use={
              <>
                Click "Trigger Run" in the results header — it shows your remaining runs for the
                month (e.g. "Trigger Run (2/3)"). Once your limit is reached, you'll need to wait
                for the monthly reset.
              </>
            }
          />
        ),
      },
    ],
    cta: { label: "Go to Dashboard", href: "https://dashboard.georankers.co/login" },
  },
  {
    slug: "september-2026-product-update",
    date: "2026-09-03",
    title: "September 2026 Product Update",
    cardHeadline: "New UI, Market & Country Grounding, and Reliability Fixes",
    tags: ["Feature", "AI", "Improvement", "Fix"],
    summary:
      "A new sidebar navigation refreshes the look of every page in the app, Market & Country Grounding tailors your AI visibility results to a specific country, plus fixes to billing, comparative claims accuracy, onboarding access, and Trends/Results display.",
    image: "/changelog/september-2026/new-sidebar-navigation.png",
    imageAlt: "GeoRankers Overview page showing the new left sidebar with Dashboard, Trends, Performance Insights, and Action Center links",
    intro: (
      <>
        We spent the past month redesigning the app around a new left-hand sidebar with a
        refreshed look across every page, adding Market &amp; Country Grounding so your AI
        visibility results reflect a specific country's questions and answers, and fixing issues
        across billing, comparative claims accuracy, onboarding access, and Trends/Results
        display.
      </>
    ),
    sections: [
      {
        heading: "New Sidebar Navigation & Refreshed UI",
        body: (
          <>
            <p className="mb-4">
              GeoRankers has a new look, built around a left-hand sidebar and a single, consistent
              design system across every page you use.
            </p>

            <TrendsFeature
              heading="New Left Sidebar"
              what="A left-hand sidebar for one-click access to Dashboard, Results, Trends, and Settings from anywhere in the app."
              how={
                <>
                  Every page, including Dashboard, Onboarding, Billing, and all Results tabs
                  (Overview, Trends, Prompts, Sources, Recommendations, Content Hub), shares a
                  consistent, refreshed look, and chart colors on Overview and Trends have been
                  updated to be easier to read.
                </>
              }
              image={{ src: "/changelog/september-2026/new-sidebar-navigation.png", alt: "GeoRankers Overview page showing the new left sidebar with Dashboard, Trends, Performance Insights, and Action Center links", width: 1080, height: 915 }}
            />
            <TrendsFeature
              heading="Rebuilt Product Tour"
              what="The in-app guided product tour has been rebuilt around the new sidebar layout."
              how={
                <>
                  Walks new users through Overview, Trends, Performance Insights, and Action
                  Center using the new sidebar layout, so the tour matches what is on screen.
                </>
              }
              image={{ src: "/changelog/september-2026/product-tour-rebuilt.png", alt: "Rebuilt in-app product tour tooltip guiding a user through the AI Perception panel under the new sidebar layout", width: 1894, height: 762 }}
            />

            <p className="mt-6">
              <span className="font-semibold text-slate-900">How to use it:</span> Nothing to turn
              on. It is just there when you log in. Use the sidebar to navigate the app.
            </p>
          </>
        ),
      },
      {
        heading: "Market & Country Grounding",
        body: (
          <>
            <p className="mb-4">
              Your AI visibility results can now be grounded to the market that matters to you.
              This is not just a label on your results. The actual questions asked to ChatGPT,
              Google AI, and Perplexity, and the AI responses you are scored against, are
              tailored to that country, so what you see reflects how your brand actually shows up
              to someone searching from that market.
            </p>

            <TrendsFeature
              heading="Choose Your Market During Onboarding"
              what="A target country you pick while setting up your brand."
              how={
                <>
                  Search and select any country as part of onboarding. This becomes your default
                  market for scheduled and future analysis runs.
                </>
              }
              image={{ src: "/changelog/september-2026/country-selection-onboarding.png", alt: "Onboarding Target Market step showing a country search dropdown while setting up brand details", width: 1197, height: 744 }}
            />
            <TrendsFeature
              heading="Change It Anytime from Tracking Set-up"
              what="A way to update your target market later without redoing onboarding."
              how={
                <>
                  Open Tracking Set-up and pick a new country. It applies to your next scheduled
                  run (a one-time run override will not change this default).
                </>
              }
              image={{ src: "/changelog/september-2026/country-tracking-setup.png", alt: "Target Market selector inside Tracking Set-up, defaulting scheduled and future analysis runs to United States", width: 1078, height: 483 }}
            />
            <TrendsFeature
              heading="Switch Markets on Results"
              what="A country selector in the Results header for flipping between markets you have analyzed."
              how={
                <>
                  Each market shows only its own runs, for example United States vs. Worldwide,
                  and Previous Analytics updates to match whichever you pick.
                </>
              }
              image={{ src: "/changelog/september-2026/country-selector-results.png", alt: "Analytics market selector in the Results header, switching between United States and Worldwide runs", width: 1884, height: 261 }}
            />
            <TrendsFeature
              heading="Per-Country Trends"
              what="Run-over-run performance broken down separately for each country you track."
              how={
                <>
                  Use the country selector alongside the date-range filter on Trends to compare
                  how your visibility shifts market by market.
                </>
              }
              image={{ src: "/changelog/september-2026/country-trends-breakdown.png", alt: "Trends page with a country selector alongside the date-range filter, showing per-country visibility KPIs", width: 1623, height: 388 }}
            />

            <p className="mt-6">
              <span className="font-semibold text-slate-900">How to use it:</span> Set your
              market once during onboarding, then adjust it anytime from Tracking Set-up, Results,
              or Trends. Each view remembers the market you have selected.
            </p>
          </>
        ),
      },
      {
        heading: "Bug Fixes & Reliability",
        body: (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Billing</h3>
              <p>
                Some users ran into errors while entering payment details or renewing their plan,
                sometimes leaving the payment stuck without confirming. Checkout and renewal now
                complete reliably.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Comparative Claims Accuracy</h3>
              <p>
                When your brand had no visibility or was tied with a competitor, the AI would
                sometimes still describe you as "ahead of" or "behind" them, a claim that was not
                actually true. Comparisons like this are now only shown when there is real data to
                back them up.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Onboarding Access</h3>
              <p>
                Users whose free trial expired before they finished setting up their product would
                land on a blank page with no way forward. They are now taken to a screen that
                explains what happened and how to continue.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Trends &amp; Results Display</h3>
              <p>
                On some Trends and Results tables, scrolling would cause the header row to overlap
                with the data underneath, making it hard to read. Headers now stay fixed and
                readable while you scroll.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Assistant Responses</h3>
              <p>
                The in-app chat assistant would sometimes cut answers short or leave out relevant
                detail. Responses are now more complete and useful.
              </p>
            </div>
          </div>
        ),
      },
    ],
    cta: { label: "Go to Dashboard", href: "https://dashboard.georankers.co/login" },
  },
];
