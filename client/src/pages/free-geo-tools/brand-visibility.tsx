import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, XCircle, ExternalLink, AlertTriangle, Zap, CheckCircle2, Info, Check, X } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { withMinDelay } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const TOOL = "brand_visibility";

interface Competitor {
  name: string;
  count: number;
}

interface Snippet {
  query: string;
  excerpt: string;
}

interface QueryResult {
  query: string;
  mentioned: boolean;
  competitors: string[];
}

interface BrandVisibilityResult {
  brand: string;
  category: string;
  confidence: "full" | "limited";
  successful: number;
  attempted: number;
  mentionCount: number;
  presencePercent: number;
  presenceLevel: "high" | "medium" | "low" | "not_visible";
  sampleStatus: "full" | "limited";
  topCompetitors: Competitor[];
  snippets: Snippet[];
  queryResults: QueryResult[];
  awareness: "recognized" | "unclear" | "mismatched" | "not_assessed";
  observations: string[];
  thingsToExplore: string[];
  summary: string[];
  generatedAt: string;
}

const presenceMeta = {
  high:        { color: "text-emerald-600", bar: "bg-emerald-500", label: "High presence" },
  medium:      { color: "text-yellow-600",  bar: "bg-yellow-400",  label: "Moderate presence" },
  low:         { color: "text-orange-600",  bar: "bg-orange-400",  label: "Low presence" },
  not_visible: { color: "text-red-600",     bar: "bg-red-500",     label: "Not yet visible" },
};

const awarenessMeta: Record<string, { label: string; description: string; color: string }> = {
  recognized: { label: "Recognized", description: "The AI correctly identifies this brand without any hints.", color: "text-emerald-600" },
  unclear:    { label: "Unclear", description: "The AI couldn't reliably identify this brand on its own.", color: "text-yellow-600" },
  mismatched: { label: "Mismatched", description: "The AI described a different company or product entirely.", color: "text-red-600" },
  not_assessed: { label: "Not assessed", description: "We couldn't read the page, so this check was skipped.", color: "text-slate-500" },
};

export default function BrandVisibilityPage() {
  useSEO({
    title: "AI Brand Visibility Snapshot — Free GEO Tool | GeoRankers",
    description: "See how ChatGPT and Google AI Search describe your brand. Free instant AI presence snapshot — no sign-up required.",
    canonical: "https://georankers.ai/free-geo-tools/brand-visibility",
    schemaId: "schema-brand-visibility",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "name": "AI Brand Visibility Snapshot",
          "url": "https://georankers.ai/free-geo-tools/brand-visibility",
          "description": "Free tool that analyzes how often your brand appears in AI-generated answers across ChatGPT, Google AI Search, and Perplexity. Enter your website URL to get an instant AI presence snapshot.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "isAccessibleForFree": true,
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "provider": { "@type": "Organization", "name": "GeoRankers", "url": "https://georankers.ai" },
          "featureList": ["AI brand presence scoring", "Competitor benchmark", "Visibility improvement recommendations"],
          "audience": { "@type": "Audience", "audienceType": "B2B SaaS marketers, Content teams, SEO professionals" }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "GeoRankers", "item": "https://georankers.ai" },
            { "@type": "ListItem", "position": 2, "name": "AI Brand Visibility Snapshot", "item": "https://georankers.ai/free-geo-tools/brand-visibility" }
          ]
        }
      ]
    },
  });

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [result, setResult] = useState<BrandVisibilityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runFetch() {
    const res = await fetch("/api/tools/brand-visibility", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url.trim() }),
    });
    const text = await res.text();
    let data: any;
    try { data = JSON.parse(text); } catch { throw new Error("Analysis failed. Please try again."); }
    if (!res.ok) throw new Error(data.message || "Analysis failed. Please try again.");
    return data;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackEvent("tool_run", { tool: TOOL });
    setLoading(true);
    setRetrying(false);
    setResult(null);
    setError(null);
    try {
      const data = await withMinDelay(runFetch(), 2500);
      setResult(data);
      trackEvent("tool_result", { tool: TOOL, status: "success", retried: 0 });
    } catch {
      setRetrying(true);
      await new Promise(r => setTimeout(r, 5000));
      try {
        const data = await runFetch();
        setResult(data);
        trackEvent("tool_result", { tool: TOOL, status: "success", retried: 1 });
      } catch (err: any) {
        trackEvent("tool_result", { tool: TOOL, status: "error", retried: 1 });
        setError(err.message ?? "Server is taking too long to respond. Please try again in a moment.");
      } finally {
        setRetrying(false);
      }
    } finally {
      setLoading(false);
    }
  }

  const meta = presenceMeta[result?.presenceLevel ?? "low"];
  const awareness = awarenessMeta[result?.awareness ?? "not_assessed"];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="bg-gradient-to-b from-slate-50 to-white pt-28 pb-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block text-xs font-bold text-blue-700 uppercase tracking-widest mb-4 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Free Tool
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 text-slate-900">
              AI Brand Visibility Snapshot
            </h1>
            <p className="text-slate-600 text-lg">
              See how AI answers currently describe your brand — and why competitors get mentioned instead.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 sm:p-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Website URL</label>
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  required
                  className="border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500"
                />
                <p className="text-slate-400 text-xs mt-1.5">We'll auto-detect your brand name and category from the page.</p>
              </div>
              <Button type="submit" disabled={loading} className="w-full gradient-cta text-white font-semibold h-11">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {retrying ? "Warming up, please wait…" : "Analyzing AI responses…"}
                  </span>
                ) : "Run AI Brand Snapshot"}
              </Button>
            </form>

            {error && (
              <div className="mt-4 flex items-start gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl p-4 text-sm">
                <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />{error}
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        {result && (() => {
          // Defensive fallbacks: a result served from a cache entry generated
          // before a field was added to the response shape (e.g. an in-memory
          // cache hit surviving a code deploy) should degrade gracefully
          // instead of crashing the page.
          const topCompetitors = result.topCompetitors ?? [];
          const snippets = result.snippets ?? [];
          const queryResults = result.queryResults ?? [];
          const observations = result.observations ?? [];
          const thingsToExplore = result.thingsToExplore ?? [];
          const summary = result.summary ?? [];
          return (
          <section className="pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-5">
              {/* Detected pills */}
              <div className="flex gap-2 flex-wrap items-center">
                <span className="text-xs bg-slate-100 border border-slate-200 rounded-full px-3 py-1 text-slate-600">
                  Brand: <span className="text-slate-900 font-semibold">{result.brand}</span>
                </span>
                <span className="text-xs bg-slate-100 border border-slate-200 rounded-full px-3 py-1 text-slate-600">
                  Category: <span className="text-slate-900 font-semibold">{result.category}</span>
                </span>
              </div>

              {/* Limited-data notice */}
              {(result.confidence === "limited" || result.sampleStatus === "limited") && (
                <div className="flex items-start gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {result.confidence === "limited"
                    ? "Limited data: we couldn't fully read this page, so results may be less accurate."
                    : "Limited data: one of the sampled AI answers didn't come through, so this snapshot is based on a slightly smaller sample."}
                </div>
              )}

              {/* Presence meter + Competitors — side by side */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">AI Answer Presence Snapshot</p>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${meta.bar}`} />
                    <span className={`text-2xl font-black ${meta.color}`}>{meta.label}</span>
                  </div>
                  <p className="text-slate-500 text-xs mb-3">
                    Appeared in {result.mentionCount} of {result.successful} AI-generated answers to unbranded buyer questions.
                  </p>
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-3">
                    <div className={`h-2 rounded-full transition-all duration-700 ${meta.bar}`} style={{ width: `${Math.max(result.presencePercent, 2)}%` }} />
                  </div>
                  <p className="text-slate-400 text-xs italic">
                    Directional snapshot based on {result.successful} sampled AI-generated answers.
                  </p>
                </div>

                {topCompetitors.length > 0 && (
                  <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Other Brands Appearing in These Answers</p>
                    <p className="text-slate-500 text-xs mb-3">Named and verified within the {result.successful} sampled answers — not necessarily direct competitors.</p>
                    <div className="flex flex-wrap gap-2">
                      {topCompetitors.map((c) => (
                        <span key={c.name} className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium">
                          {c.name} ({c.count}/{result.successful})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Awareness */}
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                <div className="flex items-center gap-1.5 mb-2">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Does the AI Know Your Brand?</p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" aria-label="What this check means" className="text-slate-400 hover:text-blue-600">
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs text-xs">
                      We ask the AI "What is {result.brand}?" with no hints, then check if its answer actually matches what your site says you do.
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-lg font-bold ${awareness.color}`}>{awareness.label}</span>
                </div>
                <p className="text-slate-500 text-xs">{awareness.description}</p>
              </div>

              {/* Per-query breakdown — what was asked, who it named, and whether your brand showed up */}
              {queryResults.length > 0 && (
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 overflow-x-auto">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Question-by-Question Breakdown</p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-left text-xs text-slate-500 uppercase tracking-wide">
                        <th className="pb-2 pr-4 font-semibold">Prompt</th>
                        <th className="pb-2 pr-4 font-semibold">Brands Listed</th>
                        <th className="pb-2 font-semibold">Your Brand Mentioned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {queryResults.map((q, i) => {
                        const competitors = q.competitors ?? [];
                        return (
                        <tr key={i} className="border-b border-slate-100 last:border-0 align-top">
                          <td className="py-3 pr-4 text-slate-700">{q.query}</td>
                          <td className="py-3 pr-4 text-slate-600">
                            {competitors.length > 0 ? competitors.join(", ") : <span className="text-slate-400">—</span>}
                          </td>
                          <td className="py-3">
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${q.mentioned ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-500 border border-slate-200"}`}>
                              {q.mentioned ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                              {q.mentioned ? "Yes" : "No"}
                            </span>
                          </td>
                        </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Snippets */}
              {snippets.length > 0 && (
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Sample AI Answers</p>
                  <div className="space-y-4">
                    {snippets.map((s, i) => (
                      <div key={i}>
                        <p className="text-slate-500 text-xs mb-1 font-medium">"{s.query}"</p>
                        <blockquote className="border-l-4 border-blue-200 pl-4 text-slate-600 text-sm italic leading-relaxed">{s.excerpt}</blockquote>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Observed + Explore — side by side */}
              {(observations.length > 0 || thingsToExplore.length > 0) && (
                <div className="grid sm:grid-cols-2 gap-5">
                  {observations.length > 0 && (
                    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">What We Observed</p>
                      <ul className="space-y-2.5">
                        {observations.map((r, i) => (
                          <li key={i} className="flex gap-3 text-sm text-slate-700">
                            <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />{r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {thingsToExplore.length > 0 && (
                    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">What to Explore Next</p>
                      <ul className="space-y-2.5">
                        {thingsToExplore.map((a, i) => (
                          <li key={i} className="flex gap-3 text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />{a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Summary */}
              {summary.length > 0 && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                  <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">What This Means for Your AI Visibility</p>
                  <ul className="space-y-2.5">
                    {summary.map((s, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-700">
                        <Zap className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />{s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="rounded-2xl p-6 text-center text-white" style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}>
                <p className="font-semibold mb-1">Get your complete AI Brand Report.</p>
                <p className="text-white/80 text-sm mb-4">Track presence across 20+ prompts, monitor sentiment shifts, and benchmark against real competitors.</p>
                <a href="https://dashboard.georankers.co/register" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-blue-50 transition-colors">
                  Get Your Full AI Brand Report — Sign up Free <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </section>
          );
        })()}
      </main>
      <Footer />
    </div>
  );
}
