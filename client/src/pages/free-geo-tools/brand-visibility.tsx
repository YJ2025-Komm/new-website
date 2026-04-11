import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, XCircle, ExternalLink, AlertTriangle, Zap, CheckCircle2 } from "lucide-react";

interface BrandVisibilityResult {
  brand: string;
  category: string;
  presencePercent: number;
  promptsChecked: number;
  presenceLevel: "high" | "medium" | "low" | "minimal";
  topCompetitors: string[];
  snippets: string[];
  whyNotVisible: string[];
  whatToImprove: string[];
  summary: string[];
}

const presenceMeta = {
  high:    { color: "text-emerald-600", bar: "bg-emerald-500", label: "High" },
  medium:  { color: "text-yellow-600",  bar: "bg-yellow-400",  label: "Moderate" },
  low:     { color: "text-orange-600",  bar: "bg-orange-400",  label: "Low" },
  minimal: { color: "text-red-600",     bar: "bg-red-500",     label: "Minimal" },
};

export default function BrandVisibilityPage() {
  useSEO({
    title: "AI Brand Visibility Snapshot — Free GEO Tool | GeoRankers",
    description: "Enter your website URL to see how AI search engines currently describe your brand. Free AI presence snapshot.",
    canonical: "https://georankers.co/free-geo-tools/brand-visibility",
    schemaId: "schema-brand-visibility",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "name": "AI Brand Visibility Snapshot",
          "url": "https://georankers.co/free-geo-tools/brand-visibility",
          "description": "Free tool that analyzes how often your brand appears in AI-generated answers across ChatGPT, Gemini, Perplexity, and Claude. Enter your website URL to get an instant AI presence snapshot.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "isAccessibleForFree": true,
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "provider": { "@type": "Organization", "name": "GeoRankers", "url": "https://georankers.co" },
          "featureList": ["AI brand presence scoring", "Competitor benchmark", "Visibility improvement recommendations"],
          "audience": { "@type": "Audience", "audienceType": "B2B SaaS marketers, Content teams, SEO professionals" }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "GeoRankers", "item": "https://georankers.co" },
            { "@type": "ListItem", "position": 2, "name": "Free GEO Tools" },
            { "@type": "ListItem", "position": 3, "name": "AI Brand Visibility Snapshot", "item": "https://georankers.co/free-geo-tools/brand-visibility" }
          ]
        }
      ]
    },
  });

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BrandVisibilityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch("/api/tools/brand-visibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      setResult(data);
    } catch (err: any) {
      setError(err.message ?? "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const meta = presenceMeta[result?.presenceLevel ?? "low"];

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
                    <Loader2 className="w-4 h-4 animate-spin" /> Analyzing AI responses…
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
        {result && (
          <section className="pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-5">
              {/* Detected pills */}
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-slate-100 border border-slate-200 rounded-full px-3 py-1 text-slate-600">
                  Brand: <span className="text-slate-900 font-semibold">{result.brand}</span>
                </span>
                <span className="text-xs bg-slate-100 border border-slate-200 rounded-full px-3 py-1 text-slate-600">
                  Category: <span className="text-slate-900 font-semibold">{result.category}</span>
                </span>
              </div>

              {/* Presence meter + Competitors — side by side */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">AI Presence</p>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${meta.bar}`} />
                    <span className={`text-2xl font-black ${meta.color}`}>{meta.label}</span>
                  </div>
                  <p className="text-slate-500 text-xs mb-3">Based on {result.promptsChecked} AI prompt checks — how often your brand appears in AI-generated answers for your category.</p>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all duration-700 ${meta.bar}`} style={{ width: `${Math.max(result.presencePercent, 2)}%` }} />
                  </div>
                </div>

                {result.topCompetitors.length > 0 && (
                  <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Brands AI Mentions More Often</p>
                    <p className="text-slate-500 text-xs mb-3">These are the {result.category} tools AI currently recommends ahead of {result.brand}.</p>
                    <div className="flex flex-wrap gap-2">
                      {result.topCompetitors.map((c) => (
                        <span key={c} className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Snippets */}
              {result.snippets.length > 0 && (
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">How AI Describes Your Category</p>
                  <div className="space-y-3">
                    {result.snippets.map((s, i) => (
                      <blockquote key={i} className="border-l-4 border-blue-200 pl-4 text-slate-600 text-sm italic leading-relaxed">"{s}"</blockquote>
                    ))}
                  </div>
                </div>
              )}

              {/* Why not visible + What to improve — side by side */}
              {(result.whyNotVisible.length > 0 || result.whatToImprove.length > 0) && (
                <div className="grid sm:grid-cols-2 gap-5">
                  {result.whyNotVisible.length > 0 && (
                    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Why You're Not Showing Up</p>
                      <ul className="space-y-2.5">
                        {result.whyNotVisible.map((r, i) => (
                          <li key={i} className="flex gap-3 text-sm text-slate-700">
                            <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />{r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.whatToImprove.length > 0 && (
                    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Quick Wins to Improve Visibility</p>
                      <ul className="space-y-2.5">
                        {result.whatToImprove.map((a, i) => (
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
              {result.summary.length > 0 && (
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
                <p className="font-semibold mb-1">Get your complete AI Brand Report.</p>
                <p className="text-white/80 text-sm mb-4">Track presence across 20+ prompts, monitor sentiment shifts, and benchmark against real competitors.</p>
                <a href="https://dashboard.georankers.co/register" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-blue-50 transition-colors">
                  Get Your Full AI Brand Report — Sign up Free <ExternalLink className="w-3.5 h-3.5" />
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
