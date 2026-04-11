import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, XCircle, ExternalLink, Zap, TrendingUp, AlertTriangle } from "lucide-react";

interface TopQuery {
  query: string;
  intent: "evaluation" | "comparison" | "how-to" | "definition";
  opportunity: "high" | "medium" | "low";
}
interface OpportunityGap {
  query: string;
  whyBrandMisses: string;
  whatToFix: string;
}
interface CompetitorQuery {
  query: string;
  dominatedBy: string;
  whyTheyWin: string;
}
interface QueryOpportunityResult {
  brand: string;
  category: string;
  topQueries: TopQuery[];
  opportunityGaps: OpportunityGap[];
  competitorDominatedQueries: CompetitorQuery[];
  summary: string[];
}

const intentMeta: Record<string, { label: string; color: string }> = {
  evaluation:  { label: "Evaluation",  color: "bg-blue-50 text-blue-700 border-blue-200" },
  comparison:  { label: "Comparison",  color: "bg-violet-50 text-violet-700 border-violet-200" },
  "how-to":    { label: "How-To",      color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  definition:  { label: "Definition",  color: "bg-slate-100 text-slate-600 border-slate-200" },
};
const opportunityDot: Record<string, string> = {
  high:   "bg-emerald-500",
  medium: "bg-yellow-400",
  low:    "bg-red-400",
};
const opportunityLabel: Record<string, string> = {
  high:   "High opportunity",
  medium: "Medium opportunity",
  low:    "Low opportunity",
};

export default function QueryOpportunityPage() {
  useSEO({
    title: "AI Query Opportunity Finder — Free GEO Tool | GeoRankers",
    description: "Discover the top AI queries in your category, where your brand is missing, and which competitors dominate. Free tool.",
    canonical: "https://georankers.co/free-geo-tools/visibility-score",
    schemaId: "schema-query-opportunities",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "name": "AI Query Opportunity Finder",
          "url": "https://georankers.co/free-geo-tools/visibility-score",
          "description": "Free tool that maps the top AI queries buyers ask in your category, identifies where your brand is absent, and shows which competitors dominate — with specific fixes for each gap.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "isAccessibleForFree": true,
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "provider": { "@type": "Organization", "name": "GeoRankers", "url": "https://georankers.co" },
          "featureList": ["Top AI query mapping", "Brand opportunity gap analysis", "Competitor dominance breakdown", "Content fix recommendations"],
          "audience": { "@type": "Audience", "audienceType": "B2B SaaS marketers, Demand generation teams, SEO professionals" }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "GeoRankers", "item": "https://georankers.co" },
            { "@type": "ListItem", "position": 2, "name": "Free GEO Tools" },
            { "@type": "ListItem", "position": 3, "name": "AI Query Opportunity Finder", "item": "https://georankers.co/free-geo-tools/visibility-score" }
          ]
        }
      ]
    },
  });

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QueryOpportunityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch("/api/tools/query-opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      setResult(data);
    } catch (err: any) {
      setError(err.message ?? "Could not generate opportunities. Please try again.");
    } finally {
      setLoading(false);
    }
  }

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
            <h1 className="text-4xl sm:text-5xl font-black mb-4 text-slate-900">AI Query Opportunity Finder</h1>
            <p className="text-slate-600 text-lg">
              See the top AI queries in your category, where your brand is missing, and exactly what to fix.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 sm:p-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Website URL</label>
                <Input type="url" value={url} onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourwebsite.com" required
                  className="border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500" />
                <p className="text-slate-400 text-xs mt-1.5">We'll auto-detect your brand and category, then map the AI query landscape.</p>
              </div>
              <Button type="submit" disabled={loading} className="w-full gradient-cta text-white font-semibold h-11">
                {loading ? (
                  <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Mapping AI queries…</span>
                ) : "Find My Query Opportunities"}
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
        {result && (
          <section className="pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Detected pills */}
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-slate-100 border border-slate-200 rounded-full px-3 py-1 text-slate-600">
                  Brand: <span className="text-slate-900 font-semibold">{result.brand}</span>
                </span>
                <span className="text-xs bg-slate-100 border border-slate-200 rounded-full px-3 py-1 text-slate-600">
                  Category: <span className="text-slate-900 font-semibold">{result.category}</span>
                </span>
              </div>

              {/* Top Queries grid */}
              {result.topQueries?.length > 0 && (
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Top AI Queries in Your Category</p>
                  <p className="text-slate-500 text-xs mb-4">Real questions buyers ask AI assistants when evaluating {result.category} tools.</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {result.topQueries.map((q, i) => {
                      const intent = intentMeta[q.intent] ?? intentMeta.definition;
                      const dot = opportunityDot[q.opportunity] ?? "bg-slate-300";
                      const oLabel = opportunityLabel[q.opportunity] ?? "";
                      return (
                        <div key={i} className="border border-slate-100 rounded-xl p-3.5">
                          <p className="text-sm text-slate-800 font-medium mb-2 leading-snug">"{q.query}"</p>
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${intent.color}`}>{intent.label}</span>
                            <span className="flex items-center gap-1.5 text-xs text-slate-500">
                              <span className={`w-2 h-2 rounded-full ${dot}`} />{oLabel}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Opportunity Gaps */}
              {result.opportunityGaps?.length > 0 && (
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Your Opportunity Gaps</p>
                  <p className="text-slate-500 text-xs mb-4">Queries where {result.brand} is currently absent — but could rank with the right content.</p>
                  <div className="space-y-4">
                    {result.opportunityGaps.map((g, i) => (
                      <div key={i} className="border border-slate-100 rounded-xl p-4">
                        <p className="text-sm font-semibold text-slate-800 mb-3">"{g.query}"</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                            <p className="text-xs font-bold text-amber-700 mb-1 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Why You're Missing
                            </p>
                            <p className="text-xs text-amber-800">{g.whyBrandMisses}</p>
                          </div>
                          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                            <p className="text-xs font-bold text-emerald-700 mb-1 flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" /> How to Fix It
                            </p>
                            <p className="text-xs text-emerald-800">{g.whatToFix}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Competitor Dominated Queries */}
              {result.competitorDominatedQueries?.length > 0 && (
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Where Competitors Dominate</p>
                  <p className="text-slate-500 text-xs mb-4">Queries where a specific competitor consistently wins — and why.</p>
                  <div className="space-y-3">
                    {result.competitorDominatedQueries.map((c, i) => (
                      <div key={i} className="border border-slate-100 rounded-xl p-4">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <p className="text-sm text-slate-800 font-medium">"{c.query}"</p>
                          <span className="flex-shrink-0 px-2.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold rounded-full">{c.dominatedBy}</span>
                        </div>
                        <p className="text-xs text-slate-500">{c.whyTheyWin}</p>
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
                <p className="font-semibold mb-1">Track all AI queries for {result.brand}.</p>
                <p className="text-white/80 text-sm mb-4">
                  GeoRankers monitors 100+ queries weekly, tracks your share of AI answers, and alerts you when competitors gain ground.
                </p>
                <a href="https://dashboard.georankers.co/register" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-blue-50 transition-colors">
                  Track All AI Queries for {result.brand} — Sign up Free <ExternalLink className="w-3.5 h-3.5" />
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
