import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { scrapePageContent } from "./web-crawler";
import { TtlCache, SEVEN_DAYS_MS } from "./cache";

export { TtlCache };

export const BRAND_VISIBILITY_MODEL = "gpt-6-luna";

// ─── Pure helpers: query filtering & dedup (Step 1) ────────────────────────

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "what", "which", "who", "how", "do", "does",
  "for", "to", "of", "in", "on", "at", "with", "and", "or", "best", "good",
  "i", "my", "you", "your", "it", "that", "this", "can", "should", "would",
]);

export function normalizeForDedup(query: string): string {
  return query
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((w) => w && !STOPWORDS.has(w))
    .sort()
    .join(" ");
}

function wordSetSimilarity(a: string, b: string): number {
  const setA = new Set(a.split(" ").filter(Boolean));
  const setB = new Set(b.split(" ").filter(Boolean));
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  setA.forEach((w) => { if (setB.has(w)) intersection++; });
  const union = new Set(Array.from(setA).concat(Array.from(setB))).size;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Drops candidate queries that leak the brand/alias/domain (self-fulfilling),
 * then collapses near-duplicate questions, returning at most `maxCount`.
 */
export function filterAndDedupeQueries(
  candidates: string[],
  brand: string,
  aliases: string[],
  domain: string,
  maxCount = 5,
  similarityThreshold = 0.6
): string[] {
  const forbidden = [brand, ...aliases, domain]
    .filter(Boolean)
    .map((s) => s.toLowerCase());

  const valid = candidates.filter((q) => {
    const lower = q.toLowerCase();
    return !forbidden.some((f) => f && lower.includes(f));
  });

  const result: string[] = [];
  const normalizedSoFar: string[] = [];
  for (const q of valid) {
    const norm = normalizeForDedup(q);
    const isDuplicate = normalizedSoFar.some(
      (n) => wordSetSimilarity(n, norm) >= similarityThreshold
    );
    if (!isDuplicate) {
      result.push(q);
      normalizedSoFar.push(norm);
    }
    if (result.length >= maxCount) break;
  }
  return result;
}

// ─── Pure helpers: mention / competitor matching (Steps 3 & 4) ────────────

// SaaS/B2B brand names that collide with common English words or short
// generic tokens. Not exhaustive by design — anything not on this list is
// treated as unambiguous and matched on word-boundary alone.
const AMBIGUOUS_COMMON_WORDS = new Set([
  "linear", "ramp", "notion", "clay", "drift", "close", "loom", "range",
  "scale", "flow", "base", "arc", "wave", "grid", "pulse", "spark", "leap",
  "shift", "forge", "deck", "stack", "hive", "orbit", "vault", "beam",
  "echo", "maze", "cube", "plot", "mint", "note", "mark", "zoom", "gap",
  "glow", "key", "lens", "link", "mode", "page", "path", "plan", "pool",
  "port", "rank", "reach", "ring", "root", "run", "sense", "shape", "sign",
  "site", "slice", "space", "spot", "square", "stage", "state", "step",
  "tool", "trend", "unit", "well", "zone",
]);

const COMPANY_SIGNAL_WORDS = [
  "platform", "software", "tool", "app", "company", "product", "service",
  "solution", "startup", "vendor", "provider",
];

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isAmbiguous(name: string): boolean {
  const lower = name.trim().toLowerCase();
  return lower.length <= 5 || AMBIGUOUS_COMMON_WORDS.has(lower);
}

function splitSentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/);
}

export function deriveCategoryKeywords(category: string): string[] {
  return category
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.replace(/[^\w]/g, ""))
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

/**
 * Case-insensitive, token-boundary match. For ambiguous names (short or a
 * common English word), also requires a category/company-signal word in the
 * same sentence as the match before counting it as a real mention.
 */
export function textMentionsName(
  text: string,
  name: string,
  categoryKeywords: string[]
): boolean {
  const trimmed = name?.trim();
  if (!trimmed) return false;
  const pattern = new RegExp(`\\b${escapeRegExp(trimmed)}\\b`, "i");
  if (!pattern.test(text)) return false;
  if (!isAmbiguous(trimmed)) return true;

  const contextWords = [
    ...categoryKeywords.map((w) => w.toLowerCase()),
    ...COMPANY_SIGNAL_WORDS,
  ];
  return splitSentences(text).some((sentence) => {
    if (!pattern.test(sentence)) return false;
    const lowerSentence = sentence.toLowerCase();
    return contextWords.some((w) => w && lowerSentence.includes(w));
  });
}

export function detectBrandMention(
  text: string,
  brand: string,
  aliases: string[],
  domain: string,
  categoryKeywords: string[]
): boolean {
  const names = [brand, ...aliases];
  if (names.some((n) => textMentionsName(text, n, categoryKeywords))) return true;
  if (!domain) return false;
  const domainPattern = new RegExp(`\\b${escapeRegExp(domain)}\\b`, "i");
  return domainPattern.test(text);
}

export interface VerifiedCompetitor {
  name: string;
  count: number;
}

/**
 * Only counts a competitor named by the model if it's actually verifiable
 * (word-boundary / ambiguity-checked) in that same answer's text. Counts at
 * most once per answer, excludes the target brand, ranked by frequency.
 */
export function extractVerifiedCompetitors(
  answers: { answer: string; competitorsNamed: string[] }[],
  brand: string,
  aliases: string[],
  categoryKeywords: string[],
  topN = 6
): VerifiedCompetitor[] {
  const brandLower = [brand, ...aliases].map((a) => a.toLowerCase());
  const freq = new Map<string, number>();

  for (const { answer, competitorsNamed } of answers) {
    const seenInThisAnswer = new Set<string>();
    for (const name of competitorsNamed) {
      const key = name.trim().toLowerCase();
      if (!key || brandLower.includes(key) || seenInThisAnswer.has(key)) continue;
      if (textMentionsName(answer, name, categoryKeywords)) {
        seenInThisAnswer.add(key);
        freq.set(name, (freq.get(name) ?? 0) + 1);
      }
    }
  }

  return Array.from(freq.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);
}

// ─── Pure helpers: scoring & sample-size accounting (Steps 6 & 8) ─────────

export type PresenceLevel = "not_visible" | "low" | "medium" | "high";

/** Continuous ranges, not fixed points — correctly classifies both a 5- and
 *  a 4-successful-query denominator (0/25/50/75/100%) under one rule. */
export function classifyPresence(percent: number): PresenceLevel {
  if (percent <= 0) return "not_visible";
  if (percent < 40) return "low";
  if (percent < 80) return "medium";
  return "high";
}

export type SampleStatus = "full" | "limited" | "insufficient";

/** 5 successful -> full snapshot, 4 -> shown with a limited-data notice,
 *  <=3 -> no score at all, regardless of how many were attempted. */
export function classifySample(successful: number): SampleStatus {
  if (successful >= 5) return "full";
  if (successful === 4) return "limited";
  return "insufficient";
}

// ─── Pure helper: domain normalization ─────────────────────────────────────

export function normalizeDomain(url: string): string {
  const u = new URL(url);
  return u.hostname.replace(/^www\./, "").toLowerCase();
}

// Bump whenever BrandVisibilityResult's shape changes, so a cache entry from
// before the change can never be served with a field missing — it's simply
// a cache miss under the new key instead of a stale, differently-shaped hit.
const CACHE_SCHEMA_VERSION = "v4";

export function cacheKeyFor(url: string): string {
  return `${CACHE_SCHEMA_VERSION}:${normalizeDomain(url)}`;
}

// ─── In-memory cache with TTL + concurrent-request dedup (Step 9) ─────────
// TtlCache itself lives in ./cache so every free tool shares the same
// implementation — see that file for the dedup/TTL mechanics.

export const brandVisibilityCache = new TtlCache<BrandVisibilityResult>(SEVEN_DAYS_MS);

// ─── OpenAI call schemas & orchestration (Steps 1, 2, 5, 7) ───────────────

const ExtractionSchema = z.object({
  brand: z.string(),
  aliases: z.array(z.string()),
  category: z.string(),
  description: z.string(),
  queries: z.array(z.string()),
});

const QueryAnswerSchema = z.object({
  answer: z.string().min(1),
  competitorsNamed: z.array(z.string()),
});

const BlindAwarenessSchema = z.object({
  answer: z.string(),
});

const AnalysisSchema = z.object({
  awareness: z.enum(["recognized", "unclear", "mismatched", "not_assessed"]),
  observations: z.array(z.string()),
  thingsToExplore: z.array(z.string()),
  summary: z.array(z.string()),
});

export interface BrandVisibilityResult {
  brand: string;
  category: string;
  confidence: "full" | "limited";
  successful: number;
  attempted: number;
  mentionCount: number;
  presencePercent: number;
  presenceLevel: PresenceLevel;
  sampleStatus: SampleStatus;
  topCompetitors: VerifiedCompetitor[];
  snippets: { query: string; excerpt: string }[];
  queryResults: { query: string; mentioned: boolean; competitors: string[] }[];
  awareness: "recognized" | "unclear" | "mismatched" | "not_assessed";
  observations: string[];
  thingsToExplore: string[];
  summary: string[];
}

async function extractBrandProfile(
  openai: OpenAI,
  page: { title: string; metaDescription: string; h1Tags: string; bodyText: string } | null,
  url: string
): Promise<{ profile: z.infer<typeof ExtractionSchema>; confidence: "full" | "limited" }> {
  const prompt = page
    ? `Title: ${page.title}\nMeta: ${page.metaDescription}\nH1: ${page.h1Tags}\n${page.bodyText}`
    : `The website URL is: ${url}\nBased on the domain name alone, infer the company/brand name and likely product category.`;

  const completion = await openai.chat.completions.parse({
    model: BRAND_VISIBILITY_MODEL,
    reasoning_effort: "low",
    messages: [
      {
        role: "system",
        content: `Extract brand information for an AI-search-visibility analysis. Be specific and narrow for the category (e.g. "open banking API for fintech developers", not "fintech infrastructure").

Also generate 7 candidate buyer queries to test whether an AI assistant names specific tools/platforms for this category. This only works if each query is phrased so a reasonable answer MUST name specific products — a question a chatbot could fully and correctly answer with pure advice, strategy, or criteria and zero brand names is useless here and must not be used.

Rules for the queries:
- Do NOT include the brand name, domain, product names, or any competitor name in any query.
- Every query must be a recommendation/listing request — phrasings like "What are the best/top tools for...", "Which platforms do companies use for...", "What software would you recommend for...", "What tool should a team use for..." — the kind of question that gets answered with a named list.
- Do NOT write open-ended advice or how-to questions like "How do I choose..." or "How can a team improve/achieve..." — these can be fully answered with generic strategy and no product names, which defeats the purpose.
  - Bad (advice, no forced brand mention): "How do I choose a customer engagement platform for a consumer mobile app?", "How can a marketing team improve mobile app retention with targeted messaging?"
  - Good (forces a named list): "What are the best customer engagement platforms for consumer mobile apps?", "Which tools do mobile marketing teams use for targeted push notifications and retention messaging?"
- Vary the specific use case/angle across the 7 queries (not 7 rephrasings of the same question), but every single one must still be a recommendation/listing request per the rule above.`,
      },
      { role: "user", content: prompt },
    ],
    response_format: zodResponseFormat(ExtractionSchema, "brand_extraction"),
  });

  const profile = completion.choices[0]?.message?.parsed;
  if (!profile) throw new Error("EXTRACTION_FAILED: Could not analyze this page.");
  return { profile, confidence: page ? "full" : "limited" };
}

async function runOneQuery(
  openai: OpenAI,
  query: string
): Promise<z.infer<typeof QueryAnswerSchema> | null> {
  const attempt = async () => {
    const completion = await openai.chat.completions.parse({
      model: BRAND_VISIBILITY_MODEL,
      reasoning_effort: "low",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant answering a buyer's question naturally, as ChatGPT would. Also list any specific brand/company/product names you mentioned in your answer (empty array if none). Return ONLY the structured fields requested.`,
        },
        { role: "user", content: query },
      ],
      response_format: zodResponseFormat(QueryAnswerSchema, "query_answer"),
    });
    return completion.choices[0]?.message?.parsed ?? null;
  };

  try {
    const result = await attempt();
    if (result) return result;
  } catch {
    // fall through to the single retry
  }
  try {
    return await attempt();
  } catch {
    return null;
  }
}

async function runBlindAwareness(
  openai: OpenAI,
  brand: string,
  domain: string
): Promise<string | null> {
  try {
    const completion = await openai.chat.completions.parse({
      model: BRAND_VISIBILITY_MODEL,
      reasoning_effort: "low",
      messages: [
        {
          role: "system",
          content: `Answer only from what you already know. Do not search or guess beyond your training knowledge.`,
        },
        { role: "user", content: `What is ${brand} (${domain})? Describe what it does.` },
      ],
      response_format: zodResponseFormat(BlindAwarenessSchema, "blind_awareness"),
    });
    return completion.choices[0]?.message?.parsed?.answer ?? null;
  } catch {
    return null;
  }
}

async function runAnalysis(
  openai: OpenAI,
  facts: {
    brand: string;
    successful: number;
    queryResults: { query: string; answer: string; mentioned: boolean }[];
    topCompetitors: VerifiedCompetitor[];
    blindAwarenessAnswer: string | null;
    scrapedDescription: string | null;
  }
): Promise<z.infer<typeof AnalysisSchema>> {
  const completion = await openai.chat.completions.parse({
    model: BRAND_VISIBILITY_MODEL,
    reasoning_effort: "low",
    messages: [
      {
        role: "system",
        content: `You are an AI-search-visibility analyst. You must only reference the facts given below — never invent unsupported causes like "low domain authority" or "missing backlinks" unless directly evidenced by these facts. Frame suggestions as things to investigate, not verified fixes.

Also classify awareness by comparing the model's blind answer (given with no help) against the reference description:
- "recognized": the blind answer correctly describes this company
- "unclear": the blind answer doesn't demonstrate reliable identification
- "mismatched": the blind answer describes a different company/product
- "not_assessed": no reference description was available to compare against`,
      },
      {
        role: "user",
        content: JSON.stringify(facts),
      },
    ],
    response_format: zodResponseFormat(AnalysisSchema, "brand_analysis"),
  });

  const parsed = completion.choices[0]?.message?.parsed;
  if (!parsed) throw new Error("ANALYSIS_FAILED: Could not generate analysis.");
  return parsed;
}

export async function runBrandVisibilityPipeline(
  openai: OpenAI,
  url: string
): Promise<BrandVisibilityResult> {
  const domain = normalizeDomain(url);
  const page = await scrapePageContent(url);
  const { profile, confidence } = await extractBrandProfile(openai, page, url);
  const { brand, aliases, category, description, queries: candidates } = profile;
  const categoryKeywords = deriveCategoryKeywords(category);

  const attemptedQueries = filterAndDedupeQueries(candidates, brand, aliases, domain, 5);

  const rawResults = await Promise.allSettled(
    attemptedQueries.map((q) => runOneQuery(openai, q))
  );

  const queryResults: { query: string; answer: string; mentioned: boolean; competitorsNamed: string[] }[] = [];
  for (let i = 0; i < rawResults.length; i++) {
    const r = rawResults[i];
    if (r.status === "fulfilled" && r.value) {
      const mentioned = detectBrandMention(r.value.answer, brand, aliases, domain, categoryKeywords);
      queryResults.push({
        query: attemptedQueries[i],
        answer: r.value.answer,
        mentioned,
        competitorsNamed: r.value.competitorsNamed,
      });
    }
  }

  const successful = queryResults.length;
  const sampleStatus = classifySample(successful);

  if (sampleStatus === "insufficient") {
    throw new Error(
      "INSUFFICIENT_DATA: We couldn't gather enough AI responses to generate a reliable snapshot. Please try again."
    );
  }

  const mentionCount = queryResults.filter((r) => r.mentioned).length;
  const presencePercent = Math.round((mentionCount / successful) * 100);
  const presenceLevel = classifyPresence(presencePercent);

  const topCompetitors = extractVerifiedCompetitors(
    queryResults.map((r) => ({ answer: r.answer, competitorsNamed: r.competitorsNamed })),
    brand,
    aliases,
    categoryKeywords
  );

  // Same verification used for topCompetitors, but scoped to one answer at a
  // time, so each row of the per-query table can list only the brand names
  // that were actually verifiable in that specific answer.
  const competitorsPerQuery = queryResults.map((r) =>
    extractVerifiedCompetitors(
      [{ answer: r.answer, competitorsNamed: r.competitorsNamed }],
      brand,
      aliases,
      categoryKeywords,
      10
    ).map((c) => c.name)
  );

  const snippets = queryResults
    .filter((r) => !r.mentioned)
    .slice(0, 2)
    .map((r) => ({ query: r.query, excerpt: r.answer.slice(0, 280) }));
  if (snippets.length === 0) {
    snippets.push(
      ...queryResults.slice(0, 2).map((r) => ({ query: r.query, excerpt: r.answer.slice(0, 280) }))
    );
  }

  const blindAwarenessAnswer = confidence === "limited" ? null : await runBlindAwareness(openai, brand, domain);

  const analysis = await runAnalysis(openai, {
    brand,
    successful,
    queryResults: queryResults.map((r) => ({ query: r.query, answer: r.answer, mentioned: r.mentioned })),
    topCompetitors,
    blindAwarenessAnswer,
    scrapedDescription: confidence === "limited" ? null : description,
  });

  return {
    brand,
    category,
    confidence,
    successful,
    attempted: attemptedQueries.length,
    mentionCount,
    presencePercent,
    presenceLevel,
    sampleStatus,
    topCompetitors,
    snippets,
    queryResults: queryResults.map((r, i) => ({ query: r.query, mentioned: r.mentioned, competitors: competitorsPerQuery[i] })),
    awareness: confidence === "limited" ? "not_assessed" : analysis.awareness,
    observations: analysis.observations.slice(0, 3),
    thingsToExplore: analysis.thingsToExplore.slice(0, 3),
    summary: analysis.summary.slice(0, 3),
  };
}
