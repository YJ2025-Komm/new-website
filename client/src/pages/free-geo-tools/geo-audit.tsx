import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, XCircle, AlertCircle, ExternalLink, Zap } from "lucide-react";

interface PriorityFix {
  fix: string;
  impact: "high" | "medium" | "low";
  effort: "low" | "medium" | "high";
  why?: string;
}

interface GeoAuditResult {
  brand?: string;
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
}

function CheckRow({ label, value }: { label: string; value: boolean | string }) {
  const positive = value === true || value === "strong" || value === "present";
  const neutral = value === "moderate" || value === "partial";
  const icon = positive
    ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
    : neutral
    ? <AlertCircle className="w-4 h-4 text-yellow-500" />
    : <XCircle className="w-4 h-4 text-red-500" />;
  const color = positive ? "text-emerald-600" : neutral ? "text-yellow-600" : "text-red-600";
  const bg = positive ? "bg-emerald-50" : neutral ? "bg-yellow-50" : "bg-red-50";
  const display = typeof value === "boolean" ? (value ? "Yes" : "No") : value.charAt(0).toUpperCase() + value.slice(1);
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-slate-700 text-sm">{label}</span>
      <span className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${bg} ${color}`}>{icon}{display}</span>
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
    canonical: "https://georankers.co/free-geo-tools/geo-audit",
    schemaId: "schema-geo-audit",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "name": "GEO Content Audit",
          "url": "https://georankers.co/free-geo-tools/geo-audit",
          "description": "Free GEO (Generative Engine Optimization) content audit tool. Paste any URL to get an AI readiness score, missing entity analysis, and a prioritized list of fixes to improve your page's visibility in AI-generated answers.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "isAccessibleForFree": true,
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "provider": { "@type": "Organization", "name": "GeoRankers", "url": "https://georankers.co" },
          "featureList": ["GEO readiness score", "8-point signal checklist", "Missing entity detection", "Prioritized fixes with impact/effort ratings"],
          "audience": { "@type": "Audience", "audienceType": "B2B SaaS marketers, Content strategists, SEO professionals" }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "GeoRankers", "item": "https://georankers.co" },
            { "@type": "ListItem", "position": 2, "name": "Free GEO Tools" },
            { "@type": "ListItem", "position": 3, "name": "GEO Content Audit", "item": "https://georankers.co/free-geo-tools/geo-audit" }
          ]
        }
      ]
    },
  });

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeoAuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch("/api/tools/geo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      setResult(data);
    } catch (err: any) {
      setError(err.message ?? "Audit failed. Please try again.");
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
                {loading ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Auditing page…</span> : "Run GEO Audit"}
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
                <div>
                  {result.brand && <p className="text-slate-500 text-xs mb-1">Analyzing: <span className="font-semibold text-slate-700">{result.brand}</span></p>}
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">GEO Readiness Score</p>
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
                  <CheckRow label="Category clearly mentioned" value={result.checks?.categoryMentioned ?? false} />
                  <CheckRow label="FAQ section present" value={result.checks?.faqsPresent ?? false} />
                  <CheckRow label="Heading structure" value={result.checks?.headingStructure ?? "weak"} />
                  <CheckRow label="Trust signals" value={result.checks?.trustSignals ?? "missing"} />
                  <CheckRow label="Schema / structured data" value={result.checks?.schemaMarkup ?? false} />
                  <CheckRow label="Clear value proposition" value={result.checks?.clearValueProp ?? false} />
                  <CheckRow label="Authority signals" value={result.checks?.authoritySignals ?? false} />
                  <CheckRow label="Numerical data / stats" value={result.checks?.numericalData ?? false} />
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
