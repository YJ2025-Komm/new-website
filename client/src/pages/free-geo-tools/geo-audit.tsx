import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, XCircle, AlertCircle, ExternalLink, Zap, Info } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface PriorityFix {
  fix: string;
  impact: "high" | "medium" | "low";
  effort: "low" | "medium" | "high";
  why?: string;
}

interface GeoAuditResult {
  brand?: string;
  category?: string;
  score: number;
  strengths: string[];
  checks: {
    categoryMentioned: boolean;
    faqsPresent: boolean;
    headingStructure: "strong" | "moderate" | "weak";
    trustSignals: "present" | "partial" | "missing";
    schemaMarkup: boolean;
    clearValueProp: boolean;
    authoritySignals: boolean;
    numericalData: boolean;
  };
  missingEntities: string[];
  priorityFixes: PriorityFix[];
  summary: string[];
  generatedAt?: string;
}

// Every check — whether it's naturally a boolean or a 3-level enum in the
// API response — collapses onto the same 3-tier scale, so colors/icons stay
// consistent. But the WORDING differs by what's actually being measured:
// most checks ask "does X exist on the page" (Present/Not Present fits),
// while heading structure asks "how good is the structure that's already
// there" — a quality judgment, not a presence check — so it keeps its own
// Strong/Moderate/Weak wording instead of being forced into "Present."
type CheckTier = "strong" | "partial" | "missing";
type CheckVocabulary = "presence" | "quality";

function toTier(value: boolean | string): CheckTier {
  if (value === true || value === "strong" || value === "present") return "strong";
  if (value === "moderate" || value === "partial") return "partial";
  return "missing"; // false, "weak", or "missing"
}

const TIER_LABELS: Record<CheckVocabulary, Record<CheckTier, string>> = {
  presence: { strong: "Present", partial: "Partial", missing: "Not Present" },
  quality: { strong: "Strong", partial: "Moderate", missing: "Weak" },
};

const TIER_STYLE: Record<CheckTier, { color: string; bg: string; Icon: typeof CheckCircle2 }> = {
  strong: { color: "text-emerald-600", bg: "bg-emerald-50", Icon: CheckCircle2 },
  partial: { color: "text-yellow-600", bg: "bg-yellow-50", Icon: AlertCircle },
  missing: { color: "text-red-600", bg: "bg-red-50", Icon: XCircle },
};

function CheckRow({ label, value, vocabulary = "presence", hint }: { label: string; value: boolean | string; vocabulary?: CheckVocabulary; hint?: string }) {
  const tier = toTier(value);
  const display = TIER_LABELS[vocabulary][tier];
  const { color, bg, Icon } = TIER_STYLE[tier];
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
      {hint ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-slate-700 text-sm underline decoration-dotted decoration-slate-400 underline-offset-4 cursor-help">{label}</span>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs text-xs">{hint}</TooltipContent>
        </Tooltip>
      ) : (
        <span className="text-slate-700 text-sm">{label}</span>
      )}
      <span className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${bg} ${color}`}>
        <Icon className="w-4 h-4" />{display}
      </span>
    </div>
  );
}

const impactColors = {
  high:   "bg-red-50 text-red-700 border-red-200",
  medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
  low:    "bg-slate-100 text-slate-600 border-slate-200",
};
const effortColors = {
  low:    "bg-emerald-50 text-emerald-700 border-emerald-200",
  medium: "bg-blue-50 text-blue-700 border-blue-200",
  high:   "bg-orange-50 text-orange-700 border-orange-200",
};

function ScoreBadge({ score }: { score: number }) {
  const ring = score >= 70 ? "border-emerald-400" : score >= 40 ? "border-yellow-400" : "border-red-400";
  const text = score >= 70 ? "text-emerald-600" : score >= 40 ? "text-yellow-600" : "text-red-600";
  const label = score >= 70 ? "Good" : score >= 40 ? "Needs Work" : "Poor";
  return (
    <div className={`w-28 h-28 rounded-full border-4 ${ring} flex flex-col items-center justify-center`}>
      <span className={`text-3xl font-black ${text}`}>{score}</span>
      <span className="text-xs text-slate-400">/100</span>
      <span className={`text-xs font-bold ${text}`}>{label}</span>
    </div>
  );
}

export default function GeoAuditPage() {
  useSEO({
    title: "GEO Content Audit — Free Tool | GeoRankers",
    description: "Paste your URL for a free GEO content audit. See missing entities, weak AI signals, and prioritized fixes to improve AI readability.",
    canonical: "https://georankers.ai/free-geo-tools/geo-audit",
    schemaId: "schema-geo-audit",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "name": "GEO Content Audit",
          "url": "https://georankers.ai/free-geo-tools/geo-audit",
          "description": "Free GEO (Generative Engine Optimization) content audit tool. Paste any URL to get an AI readiness score, missing entity analysis, and a prioritized list of fixes to improve your page's visibility in AI-generated answers.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "isAccessibleForFree": true,
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "provider": { "@type": "Organization", "name": "GeoRankers", "url": "https://georankers.ai" },
          "featureList": ["GEO readiness score", "8-point signal checklist", "Missing entity detection", "Prioritized fixes with impact/effort ratings"],
          "audience": { "@type": "Audience", "audienceType": "B2B SaaS marketers, Content strategists, SEO professionals" }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "GeoRankers", "item": "https://georankers.ai" },
            { "@type": "ListItem", "position": 2, "name": "GEO Content Audit", "item": "https://georankers.ai/free-geo-tools/geo-audit" }
          ]
        }
      ]
    },
  });

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [result, setResult] = useState<GeoAuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runFetch() {
    const res = await fetch("/api/tools/geo-audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url.trim() }),
    });
    const text = await res.text();
    let data: any;
    try { data = JSON.parse(text); } catch { throw new Error("Audit failed. Please try again."); }
    if (!res.ok) throw new Error(data.message || "Audit failed. Please try again.");
    return data;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setRetrying(false);
    setResult(null);
    setError(null);
    try {
      const data = await runFetch();
      setResult(data);
    } catch {
      setRetrying(true);
      await new Promise(r => setTimeout(r, 5000));
      try {
        const data = await runFetch();
        setResult(data);
      } catch (err: any) {
        setError(err.message ?? "Server is taking too long to respond. Please try again in a moment.");
      } finally {
        setRetrying(false);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main id="main-content">
        <section className="bg-gradient-to-b from-slate-50 to-white pt-28 pb-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block text-xs font-bold text-blue-700 uppercase tracking-widest mb-4 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Free Tool
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 text-slate-900">GEO Content Audit</h1>
            <p className="text-slate-600 text-lg">
              Paste your URL and get a prioritized list of exactly what to fix to become more visible in AI answers.
            </p>
          </div>
        </section>

        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 sm:p-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Page URL</label>
                <Input type="url" value={url} onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourwebsite.com/page" required
                  className="border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500" />
              </div>
              <Button type="submit" disabled={loading} className="w-full gradient-cta text-white font-semibold h-11">
                {loading ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />{retrying ? "Warming up, please wait…" : "Auditing page…"}</span> : "Run GEO Audit"}
              </Button>
            </form>
            {error && (
              <div className="mt-4 flex items-start gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl p-4 text-sm">
                <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />{error}
              </div>
            )}
          </div>
        </section>

        {result && (
          <section className="pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-5">
              {/* Score + brand */}
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 flex items-center gap-6">
                <ScoreBadge score={result.score ?? 0} />
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">GEO Readiness Score</p>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" aria-label="How this score is calculated" className="text-slate-400 hover:text-blue-600">
                          <Info className="w-3.5 h-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs text-xs">
The sum of the 8 checks below. Each check is worth a fixed number of points (10 or 15), so the total adds up to 100.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  {(result.brand || result.category) && (
                    <div className="text-xs text-slate-500 space-y-1">
                      {result.brand && <p>Analyzing: <span className="font-semibold text-slate-700">{result.brand}</span></p>}
                      {result.category && <p className="text-slate-400">{result.category}</p>}
                    </div>
                  )}
                  <p className="text-slate-600 text-sm">
                    {(result.score ?? 0) >= 70
                      ? "Your page has solid AI visibility foundations. Focus on the priority fixes below to push further."
                      : (result.score ?? 0) >= 40
                      ? "Your page has some good signals but meaningful gaps that limit AI visibility."
                      : "Your page is currently hard for AI to read and recommend. The fixes below will have high impact."}
                  </p>
                </div>
              </div>

              {/* Strengths + Signal checklist — side by side */}
              <div className="grid sm:grid-cols-2 gap-5">
                {result.strengths?.length > 0 && (
                  <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">What's Working</p>
                    <ul className="space-y-2">
                      {result.strengths.map((s, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">GEO Signal Checks</p>
                  <CheckRow
                    label="Category clearly mentioned"
                    value={result.checks?.categoryMentioned ?? false}
                    hint="Checks if a key category word shows up in your page's title, H1, or meta description."
                  />
                  <CheckRow
                    label="FAQ section present"
                    value={result.checks?.faqsPresent ?? false}
                    hint="Checks for FAQ structured data, or an actual FAQ / 'Frequently Asked Questions' heading or text on the page."
                  />
                  <CheckRow
                    label="Heading structure"
                    value={result.checks?.headingStructure ?? "weak"}
                    vocabulary="quality"
                    hint="Checks whether the page has exactly one H1 with two or more H2 subheadings — a clear hierarchy AI parsers can follow."
                  />
                  <CheckRow
                    label="Trust signals"
                    value={result.checks?.trustSignals ?? "missing"}
                    hint="Checks for certifications, reviews, or phrases like 'trusted by' and 'case studies' anywhere on the page."
                  />
                  <CheckRow
                    label="Schema / structured data"
                    value={result.checks?.schemaMarkup ?? false}
                    hint="Checks whether the page includes any JSON-LD structured data (schema.org markup)."
                  />
                  <CheckRow
                    label="Clear value proposition"
                    value={result.checks?.clearValueProp ?? false}
                    hint="AI's judgment on whether the page clearly explains what the product does and who it's for."
                  />
                  <CheckRow
                    label="Authority signals"
                    value={result.checks?.authoritySignals ?? false}
                    hint="AI's judgment on whether the page demonstrates credibility — expertise, data, or recognition."
                  />
                  <CheckRow
                    label="Numerical data / stats"
                    value={result.checks?.numericalData ?? false}
                    hint="Checks for percentages, prices, or stats like '500+ customers' anywhere on the page."
                  />
                </div>
              </div>

              {/* Missing entities */}
              {result.missingEntities?.length > 0 && (
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Missing Entities</p>
                  <p className="text-slate-500 text-xs mb-3">Topics AI would want to know but couldn't find on this page:</p>
                  <div className="flex flex-wrap gap-2">
                    {result.missingEntities.map((e) => (
                      <span key={e} className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-sm">{e}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Priority fixes — 2-col grid */}
              {result.priorityFixes?.length > 0 && (
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Priority Fixes</p>
                  <p className="text-slate-500 text-xs mb-4">Ordered by impact — fix these first for the biggest AI visibility gains.</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {result.priorityFixes.map((f, i) => (
                      <div key={i} className="border border-slate-100 rounded-xl p-4">
                        <div className="flex gap-1.5 mb-2">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${impactColors[f.impact ?? "low"]}`}>
                            {(f.impact ?? "low").charAt(0).toUpperCase() + (f.impact ?? "low").slice(1)} Impact
                          </span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${effortColors[f.effort ?? "medium"]}`}>
                            {(f.effort ?? "medium").charAt(0).toUpperCase() + (f.effort ?? "medium").slice(1)} Effort
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-800 mb-1">{f.fix}</p>
                        {f.why && <p className="text-xs text-slate-500">{f.why}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary */}
              {result.summary?.length > 0 && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                  <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">What This Means for Your AI Visibility</p>
                  <ul className="space-y-2.5">
                    {result.summary.map((s, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-700">
                        <Zap className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />{s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="rounded-2xl p-6 text-center text-white" style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}>
                <p className="font-semibold mb-1">This is just the surface.</p>
                <p className="text-white/80 text-sm mb-4">GeoRankers runs a full 9-category GEO audit across your entire site — with a prioritized fix roadmap and continuous monitoring.</p>
                <a href="https://dashboard.georankers.co/register" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-blue-50 transition-colors">
                  See Your Complete GEO Audit — Sign up Free <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
