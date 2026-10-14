import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { scrapePageContent } from "./web-crawler";
import { TtlCache, SEVEN_DAYS_MS } from "./cache";
import { deriveCategoryKeywords, normalizeDomain } from "./brand-visibility";

export const GEO_AUDIT_MODEL = "gpt-6-luna";

// ─── Deterministic, code-verified checks ───────────────────────────────────
// Everything here is computed from what was actually scraped — none of it
// is trusted from the model, the same "verify, don't trust" rule applied in
// brand-visibility.ts.

export type HeadingStructure = "strong" | "moderate" | "weak";

/** A single H1 with 2+ H2s is the only shape that counts as "strong" —
 *  missing/duplicate H1s or no subheadings at all are structural problems
 *  regardless of what the page text otherwise reads like. */
export function detectHeadingStructure(h1Count: number, h2Count: number): HeadingStructure {
  if (h1Count === 1 && h2Count >= 2) return "strong";
  if (h1Count === 1 && h2Count >= 1) return "moderate";
  return "weak";
}

// Short on purpose: a bare "faq"/"faqs" is only trustworthy as a heading —
// in body copy it also matches marketing text that merely *mentions* FAQs
// as a topic (e.g. a product demo screenshot reading "Add FAQ schema to
// your pricing page"), which isn't the same as the page having one. The
// full phrase is specific enough to trust in body text too.
const HEADING_FAQ_PATTERN = /\bfaqs?\b|frequently asked questions/i;
const BODY_FAQ_PATTERN = /frequently asked questions/i;

/** FAQPage structured data is the strongest signal; an actual "FAQ" /
 *  "Frequently Asked Questions" heading is the fallback for sites that
 *  have the content but never mark it up. */
export function detectFaqPresence(headingsText: string, bodyText: string, schemaTypes: string[]): boolean {
  if (schemaTypes.includes("FAQPage")) return true;
  return HEADING_FAQ_PATTERN.test(headingsText) || BODY_FAQ_PATTERN.test(bodyText);
}

const NUMERICAL_DATA_PATTERN =
  /\d+(\.\d+)?%|\$\s?\d|\b\d{1,3}(,\d{3})+\b|\b\d+\+?\s*(customers|users|companies|countries|integrations|teams|brands)\b/i;

export function detectNumericalData(bodyText: string): boolean {
  return NUMERICAL_DATA_PATTERN.test(bodyText);
}

export type TrustSignalLevel = "present" | "partial" | "missing";

const TRUST_SIGNAL_KEYWORDS = [
  "soc 2", "soc2", "gdpr", "iso 27001", "hipaa", "pci dss",
  "g2.com", "g2 crowd", "capterra", "trustpilot", "trustradius",
  "money-back guarantee", "trusted by", "case stud", "testimonial",
  "customer review", "fortune 500", "enterprise-grade security",
];

/** Counts distinct trust-signal keyword hits across the page text —
 *  0 => missing, 1 => partial, 2+ => present. A crude heuristic, but a
 *  deterministic one, instead of trusting the model's read of a word blob. */
export function detectTrustSignalLevel(combinedText: string): TrustSignalLevel {
  const lower = combinedText.toLowerCase();
  const hits = TRUST_SIGNAL_KEYWORDS.filter((kw) => lower.includes(kw)).length;
  if (hits >= 2) return "present";
  if (hits === 1) return "partial";
  return "missing";
}

/** Whether the detected category's own significant words actually show up
 *  in the page's title/H1/meta — not just "did the model say so." */
export function detectCategoryMentioned(category: string, title: string, h1Tags: string, metaDescription: string): boolean {
  const keywords = deriveCategoryKeywords(category);
  if (keywords.length === 0) return false;
  const haystack = `${title} ${h1Tags} ${metaDescription}`.toLowerCase();
  return keywords.some((kw) => haystack.includes(kw));
}

export interface GeoAuditChecks {
  categoryMentioned: boolean;
  faqsPresent: boolean;
  headingStructure: HeadingStructure;
  trustSignals: TrustSignalLevel;
  schemaMarkup: boolean;
  clearValueProp: boolean;
  authoritySignals: boolean;
  numericalData: boolean;
}

const SCORE_WEIGHTS = {
  categoryMentioned: 10,
  faqsPresent: 10,
  headingStructure: { strong: 15, moderate: 8, weak: 0 },
  trustSignals: { present: 15, partial: 8, missing: 0 },
  schemaMarkup: 15,
  clearValueProp: 15,
  authoritySignals: 10,
  numericalData: 10,
} as const;

/** The score is computed FROM these exact checks — it can never disagree
 *  with what's displayed, unlike a model-invented 0-100 with no stated
 *  relationship to the checklist underneath it. */
export function computeScore(checks: GeoAuditChecks): number {
  return (
    (checks.categoryMentioned ? SCORE_WEIGHTS.categoryMentioned : 0) +
    (checks.faqsPresent ? SCORE_WEIGHTS.faqsPresent : 0) +
    SCORE_WEIGHTS.headingStructure[checks.headingStructure] +
    SCORE_WEIGHTS.trustSignals[checks.trustSignals] +
    (checks.schemaMarkup ? SCORE_WEIGHTS.schemaMarkup : 0) +
    (checks.clearValueProp ? SCORE_WEIGHTS.clearValueProp : 0) +
    (checks.authoritySignals ? SCORE_WEIGHTS.authoritySignals : 0) +
    (checks.numericalData ? SCORE_WEIGHTS.numericalData : 0)
  );
}

const IMPACT_ORDER = { high: 0, medium: 1, low: 2 } as const;

export function sortByImpact<T extends { impact: "high" | "medium" | "low" }>(fixes: T[]): T[] {
  return [...fixes].sort((a, b) => IMPACT_ORDER[a.impact] - IMPACT_ORDER[b.impact]);
}

// ─── Cache (per-page, not per-domain — different pages on the same site
// have different content and must not share a cache entry) ───────────────

const GEO_AUDIT_CACHE_VERSION = "v1";

export function normalizeAuditUrl(url: string): string {
  const u = new URL(url);
  const host = normalizeDomain(url);
  const path = u.pathname.replace(/\/+$/, "");
  return `${host}${path}`;
}

export function cacheKeyForAudit(url: string): string {
  return `${GEO_AUDIT_CACHE_VERSION}:${normalizeAuditUrl(url)}`;
}

export const geoAuditCache = new TtlCache<GeoAuditResult>(SEVEN_DAYS_MS);

// ─── Model call: only the genuinely judgment-based fields ─────────────────

const PriorityFixSchema = z.object({
  fix: z.string(),
  impact: z.enum(["high", "medium", "low"]),
  effort: z.enum(["low", "medium", "high"]),
  why: z.string(),
});

const GeoAuditModelSchema = z.object({
  brand: z.string(),
  category: z.string(),
  clearValueProp: z.boolean(),
  authoritySignals: z.boolean(),
  strengths: z.array(z.string()),
  missingEntities: z.array(z.string()),
  priorityFixes: z.array(PriorityFixSchema),
  summary: z.array(z.string()),
});

export interface GeoAuditResult {
  brand: string;
  category: string;
  score: number;
  strengths: string[];
  checks: GeoAuditChecks;
  missingEntities: string[];
  priorityFixes: z.infer<typeof PriorityFixSchema>[];
  summary: string[];
}

export async function runGeoAuditPipeline(
  openai: OpenAI,
  url: string
): Promise<GeoAuditResult> {
  const page = await scrapePageContent(url);
  if (!page) {
    throw new Error(
      "HTTP_ERROR: We couldn't read that page — it may block automated access. Try your homepage or a specific product/feature page."
    );
  }

  const headingsText = `${page.h1Tags} ${page.h2Tags} ${page.h3Tags}`;
  const headingStructure = detectHeadingStructure(page.h1Count, page.h2Count);
  const faqsPresent = detectFaqPresence(headingsText, page.bodyText, page.schemaTypes);
  const numericalData = detectNumericalData(page.bodyText);
  const trustSignals = detectTrustSignalLevel(`${page.bodyText} ${page.title} ${page.metaDescription}`);
  const schemaMarkup = page.hasSchema;

  const contentPreview = `Title: ${page.title}\nMeta: ${page.metaDescription}\nH1: ${page.h1Tags}\nH2: ${page.h2Tags}\nH3: ${page.h3Tags}\n\n${page.bodyText}`;

  const completion = await openai.chat.completions.parse({
    model: GEO_AUDIT_MODEL,
    reasoning_effort: "low",
    messages: [
      {
        role: "system",
        content: `You are a GEO (Generative Engine Optimization) expert auditing a single B2B SaaS webpage for AI-search readiness. Be specific and actionable, and ground every claim in the page content given below — never invent something the text doesn't support.

Also identify a narrow product category for this specific page (e.g. "open banking API for fintech developers", not "fintech infrastructure").

Facts already verified about this page — use them as context, do not re-derive or contradict them:
- Heading structure: ${headingStructure}
- FAQ content detected: ${faqsPresent ? "yes" : "no"}
- Numerical data/stats detected: ${numericalData ? "yes" : "no"}
- Trust-signal keywords detected: ${trustSignals}
- Structured data present: ${schemaMarkup ? `yes (types: ${page.schemaTypes.join(", ") || "unspecified"})` : "no"}

Return ONLY the fields requested:
- clearValueProp / authoritySignals: your own judgment, grounded in the text.
- strengths: 2-3 items, grounded in the facts above and the page text.
- missingEntities: 3-5 specific topics/entities a reader or AI assistant would expect for this category but that are absent from the page.
- priorityFixes: 5-6 items, each addressing a gap above or a missing entity, with concrete impact/effort/why.
- summary: 3 items synthesizing where the page stands.`,
      },
      { role: "user", content: `Audit this page for GEO readiness:\n\n${contentPreview}` },
    ],
    response_format: zodResponseFormat(GeoAuditModelSchema, "geo_audit"),
  });

  const model = completion.choices[0]?.message?.parsed;
  if (!model) throw new Error("ANALYSIS_FAILED: Could not generate the audit. Please try again.");

  const categoryMentioned = detectCategoryMentioned(model.category, page.title, page.h1Tags, page.metaDescription);

  const checks: GeoAuditChecks = {
    categoryMentioned,
    faqsPresent,
    headingStructure,
    trustSignals,
    schemaMarkup,
    clearValueProp: model.clearValueProp,
    authoritySignals: model.authoritySignals,
    numericalData,
  };

  return {
    brand: model.brand,
    category: model.category,
    score: computeScore(checks),
    strengths: model.strengths.slice(0, 3),
    checks,
    missingEntities: model.missingEntities.slice(0, 5),
    priorityFixes: sortByImpact(model.priorityFixes).slice(0, 6),
    summary: model.summary.slice(0, 3),
  };
}
