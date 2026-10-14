import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { scrapePageContent } from "./web-crawler";
import { TtlCache, SEVEN_DAYS_MS } from "./cache";
import {
  filterAndDedupeQueries,
  deriveCategoryKeywords,
  detectBrandMention,
  extractVerifiedCompetitors,
  classifySample,
  normalizeDomain,
  runOneQuery,
  type VerifiedCompetitor,
} from "./brand-visibility";

export const QUERY_OPPORTUNITIES_MODEL = "gpt-6-luna";

// ─── Opportunity rating — derived from real evidence, not invented ────────
// A query the brand already appears for has little incremental upside, so
// it's rated low regardless of how many competitors also showed up. For a
// query the brand is absent from, the more *other* brands the model named
// unprompted, the stronger the evidence that this is a "list" query AI
// readily answers with specific names — i.e. a real opportunity to be in
// that list — so opportunity scales with verified competitor count.
export type Opportunity = "high" | "medium" | "low";

export function deriveOpportunity(mentioned: boolean, verifiedCompetitorCount: number): Opportunity {
  if (mentioned) return "low";
  if (verifiedCompetitorCount >= 2) return "high";
  if (verifiedCompetitorCount === 1) return "medium";
  return "low";
}

// ─── Cache (per-domain — brand/category/query-landscape is a site-wide
// concept, same reasoning as brand-visibility's cache) ────────────────────

const QUERY_OPPORTUNITIES_CACHE_VERSION = "v1";

export function cacheKeyForQueryOpportunities(url: string): string {
  return `${QUERY_OPPORTUNITIES_CACHE_VERSION}:${normalizeDomain(url)}`;
}

export const queryOpportunitiesCache = new TtlCache<QueryOpportunitiesResult>(SEVEN_DAYS_MS);

// ─── Model calls ────────────────────────────────────────────────────────

const Intent = z.enum(["evaluation", "comparison", "how-to", "definition"]);

const ExtractionSchema = z.object({
  brand: z.string(),
  aliases: z.array(z.string()),
  category: z.string(),
  queries: z.array(z.object({ query: z.string(), intent: Intent })),
});

const GapExplanationSchema = z.object({
  whyBrandMisses: z.string(),
  whatToFix: z.string(),
});

const DominatedExplanationSchema = z.object({
  whyTheyWin: z.string(),
});

const AnalysisSchema = z.object({
  gapExplanations: z.array(GapExplanationSchema),
  dominatedExplanations: z.array(DominatedExplanationSchema),
  summary: z.array(z.string()),
});

async function extractQueryProfile(
  openai: OpenAI,
  page: { title: string; metaDescription: string; h1Tags: string; bodyText: string } | null,
  url: string
): Promise<{ profile: z.infer<typeof ExtractionSchema>; confidence: "full" | "limited" }> {
  const prompt = page
    ? `Title: ${page.title}\nMeta: ${page.metaDescription}\nH1: ${page.h1Tags}\n${page.bodyText}`
    : `The website URL is: ${url}\nBased on the domain name alone, infer the company/brand name and likely product category.`;

  const completion = await openai.chat.completions.parse({
    model: QUERY_OPPORTUNITIES_MODEL,
    reasoning_effort: "low",
    messages: [
      {
        role: "system",
        content: `Extract brand information for an AI-search query-opportunity analysis. Be specific and narrow for the category (e.g. "open banking API for fintech developers", not "fintech infrastructure").

Also generate 7 candidate buyer queries that real buyers ask AI assistants when discovering or evaluating tools in this category, each tagged with its intent (evaluation, comparison, how-to, or definition). This only works if each query is phrased so a reasonable answer MUST name specific products — a query a chatbot could fully and correctly answer with pure advice or definitions and zero brand names is useless here and must not be used, regardless of its intent label.

Rules for the queries:
- Do NOT include the brand name, domain, product names, or any competitor name in any query.
- Every query must be a recommendation/listing request — phrasings like "What are the best/top tools for...", "Which platforms do companies use for...", "What tool should a team use for...". Even a "how-to" or "definition"-tagged query must still be phrased this way (e.g. "What tools do teams use to do X" rather than "How do I do X").
  - Bad (no forced brand mention): "How do I choose a customer engagement platform for a consumer mobile app?"
  - Good (forces a named list): "What are the best customer engagement platforms for consumer mobile apps?"
- Vary the specific use case/angle across the 7 queries (not 7 rephrasings of the same question).`,
      },
      { role: "user", content: prompt },
    ],
    response_format: zodResponseFormat(ExtractionSchema, "query_opportunities_extraction"),
  });

  const profile = completion.choices[0]?.message?.parsed;
  if (!profile) throw new Error("EXTRACTION_FAILED: Could not analyze this page.");
  return { profile, confidence: page ? "full" : "limited" };
}

async function runAnalysis(
  openai: OpenAI,
  facts: {
    brand: string;
    gaps: { query: string; excerpt: string }[];
    dominated: { query: string; excerpt: string; competitor: string }[];
    mentionCount: number;
    successful: number;
  }
): Promise<z.infer<typeof AnalysisSchema>> {
  const completion = await openai.chat.completions.parse({
    model: QUERY_OPPORTUNITIES_MODEL,
    reasoning_effort: "low",
    messages: [
      {
        role: "system",
        content: `You are an AI-search query-opportunity analyst. You must only reference the facts given below — never invent unsupported causes like "low domain authority" or "missing backlinks" unless directly evidenced by these facts. Frame suggestions as things to investigate or try, not verified fixes.

For each item in "gaps", explain why the brand likely didn't appear in that specific answer (whyBrandMisses) and a concrete content/positioning change that could help (whatToFix) — grounded in that answer's excerpt.
For each item in "dominated", explain why that named competitor likely won that specific answer (whyTheyWin) — grounded in that answer's excerpt.
Return gapExplanations and dominatedExplanations as arrays in the exact same order as the "gaps" and "dominated" arrays given.
Also return a 3-item summary synthesizing where the brand stands in AI-generated answers overall.`,
      },
      { role: "user", content: JSON.stringify(facts) },
    ],
    response_format: zodResponseFormat(AnalysisSchema, "query_opportunities_analysis"),
  });

  const parsed = completion.choices[0]?.message?.parsed;
  if (!parsed) throw new Error("ANALYSIS_FAILED: Could not generate the analysis. Please try again.");
  return parsed;
}

// ─── Result shape ───────────────────────────────────────────────────────

export interface TopQuery {
  query: string;
  intent: z.infer<typeof Intent>;
  opportunity: Opportunity;
}

export interface OpportunityGap {
  query: string;
  whyBrandMisses: string;
  whatToFix: string;
}

export interface CompetitorDominatedQuery {
  query: string;
  dominatedBy: string;
  whyTheyWin: string;
}

export interface QueryOpportunitiesResult {
  brand: string;
  category: string;
  confidence: "full" | "limited";
  successful: number;
  attempted: number;
  topQueries: TopQuery[];
  opportunityGaps: OpportunityGap[];
  competitorDominatedQueries: CompetitorDominatedQuery[];
  summary: string[];
}

export async function runQueryOpportunitiesPipeline(
  openai: OpenAI,
  url: string
): Promise<QueryOpportunitiesResult> {
  const domain = normalizeDomain(url);
  const page = await scrapePageContent(url);
  const { profile, confidence } = await extractQueryProfile(openai, page, url);
  const { brand, aliases, category } = profile;
  const categoryKeywords = deriveCategoryKeywords(category);

  const intentByQuery = new Map(profile.queries.map((q) => [q.query, q.intent]));
  const candidates = profile.queries.map((q) => q.query);
  const attemptedQueries = filterAndDedupeQueries(candidates, brand, aliases, domain, 5);

  const rawResults = await Promise.allSettled(attemptedQueries.map((q) => runOneQuery(openai, q)));

  const queryResults: {
    query: string;
    intent: z.infer<typeof Intent>;
    answer: string;
    mentioned: boolean;
    verifiedCompetitors: VerifiedCompetitor[];
  }[] = [];

  for (let i = 0; i < rawResults.length; i++) {
    const r = rawResults[i];
    if (r.status === "fulfilled" && r.value) {
      const query = attemptedQueries[i];
      const mentioned = detectBrandMention(r.value.answer, brand, aliases, domain, categoryKeywords);
      const verifiedCompetitors = extractVerifiedCompetitors(
        [{ answer: r.value.answer, competitorsNamed: r.value.competitorsNamed }],
        brand,
        aliases,
        categoryKeywords,
        10
      );
      queryResults.push({
        query,
        intent: intentByQuery.get(query) ?? "evaluation",
        answer: r.value.answer,
        mentioned,
        verifiedCompetitors,
      });
    }
  }

  const successful = queryResults.length;
  if (classifySample(successful) === "insufficient") {
    throw new Error(
      "INSUFFICIENT_DATA: We couldn't gather enough AI responses to generate reliable query opportunities. Please try again."
    );
  }

  const mentionCount = queryResults.filter((r) => r.mentioned).length;

  const topQueries: TopQuery[] = queryResults.map((r) => ({
    query: r.query,
    intent: r.intent,
    opportunity: deriveOpportunity(r.mentioned, r.verifiedCompetitors.length),
  }));

  const gapCandidates = queryResults.filter((r) => !r.mentioned).slice(0, 3);
  const dominatedCandidates = queryResults
    .filter((r) => !r.mentioned && r.verifiedCompetitors.length > 0)
    .slice(0, 3);

  const analysis = await runAnalysis(openai, {
    brand,
    gaps: gapCandidates.map((r) => ({ query: r.query, excerpt: r.answer.slice(0, 280) })),
    dominated: dominatedCandidates.map((r) => ({
      query: r.query,
      excerpt: r.answer.slice(0, 280),
      competitor: r.verifiedCompetitors[0]?.name ?? "",
    })),
    mentionCount,
    successful,
  });

  const opportunityGaps: OpportunityGap[] = gapCandidates.map((r, i) => ({
    query: r.query,
    whyBrandMisses: analysis.gapExplanations[i]?.whyBrandMisses ?? "Not enough evidence to explain this gap.",
    whatToFix: analysis.gapExplanations[i]?.whatToFix ?? "Investigate this query further.",
  }));

  const competitorDominatedQueries: CompetitorDominatedQuery[] = dominatedCandidates.map((r, i) => ({
    query: r.query,
    dominatedBy: r.verifiedCompetitors[0]?.name ?? "Unknown",
    whyTheyWin: analysis.dominatedExplanations[i]?.whyTheyWin ?? "Not enough evidence to explain this.",
  }));

  return {
    brand,
    category,
    confidence,
    successful,
    attempted: attemptedQueries.length,
    topQueries,
    opportunityGaps,
    competitorDominatedQueries,
    summary: analysis.summary.slice(0, 3),
  };
}
