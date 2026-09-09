import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Check, BarChart3, Target, ListChecks, Radar, Globe, MessageCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { alternativesEntries, type AlternativeEntry } from "@/data/alternatives";

// "Why GeoRankers Wins" differentiators — generic to GeoRankers itself, so
// this list is the same regardless of which competitor a visitor came from.
// Facts here match what /pricing already states (starting price, models
// tracked, run cadence) so this section never drifts out of sync with it.
const WHY_WE_WIN = [
  { icon: BarChart3, title: "Model-wise visibility", description: "See where you win or lose across ChatGPT, Google AI Search, and Perplexity individually, not just one blended score." },
  { icon: Target, title: "Buyer-intent prompt mapping", description: "Prompts are mapped to the buyer journey, showing which types of questions competitors are winning." },
  { icon: ListChecks, title: "Analytics-grounded prioritization", description: "Recommendations are prioritized by expected impact and effort, not a generic checklist." },
  { icon: Radar, title: "Signal Tracker", description: "Keep monitoring the specific issue or success signal after you act, with the underlying AI responses available to verify what changed." },
  { icon: Globe, title: "Country grounding", description: "Run analysis grounded in specific countries and compare Trends across markets over time." },
  { icon: MessageCircle, title: "GEO Agent", description: "Ask visibility questions in plain language and get instant answers from your conversational GEO Agent." },
];

// Card accent per entry — cycled by index so the grid reads as varied rather
// than a wall of identical blue cards.
const CARD_ACCENTS = [
  {
    gradient: "from-blue-500 to-cyan-500",
    glow: "hover:shadow-blue-100/60 hover:border-blue-200",
    title: "group-hover:text-blue-600",
  },
  {
    gradient: "from-violet-500 to-purple-500",
    glow: "hover:shadow-violet-100/60 hover:border-violet-200",
    title: "group-hover:text-violet-600",
  },
  {
    gradient: "from-emerald-500 to-teal-500",
    glow: "hover:shadow-emerald-100/60 hover:border-emerald-200",
    title: "group-hover:text-emerald-600",
  },
  {
    gradient: "from-orange-500 to-amber-500",
    glow: "hover:shadow-orange-100/60 hover:border-orange-200",
    title: "group-hover:text-orange-600",
  },
  {
    gradient: "from-pink-500 to-rose-500",
    glow: "hover:shadow-pink-100/60 hover:border-pink-200",
    title: "group-hover:text-pink-600",
  },
];

function AlternativeCard({ entry, accent }: { entry: AlternativeEntry; accent: typeof CARD_ACCENTS[number] }) {
  return (
    <Link
      href={`/alternatives/${entry.slug}`}
      className={`group relative overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${accent.glow}`}
      data-testid={`link-alternative-${entry.slug}`}
    >
      {/* Corner glow, tinted to the card's accent */}
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${accent.gradient} opacity-[0.08] blur-2xl transition-opacity duration-300 group-hover:opacity-[0.16]`}
      />

      <h2 className={`relative text-lg font-bold text-slate-900 leading-snug mb-3 tracking-normal transition-colors ${accent.title}`}>
        {entry.pageTitle}
      </h2>

      <p className="relative text-slate-600 leading-relaxed mb-4">{entry.summary}</p>

      {!!entry.highlights?.length && (
        <div className="relative mb-5">
          <p className="text-[11px] font-semibold text-emerald-700/80 uppercase tracking-wide mb-2">
            Where GeoRankers wins
          </p>
          <div className="flex flex-wrap gap-2">
            {entry.highlights.slice(0, 3).map((highlight) => (
              <span
                key={highlight}
                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70"
              >
                <Check className="w-3 h-3" />
                {highlight}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="relative flex items-center justify-center gap-1.5 rounded-xl bg-slate-50 group-hover:bg-blue-50 py-2.5 text-sm font-medium text-blue-600 transition-colors">
        View alternatives <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}

const ALTERNATIVES_META_DESCRIPTION =
  "The best alternatives to popular AI search visibility and GEO tools, so you can pick the right platform for your brand in ChatGPT, Google AI Search, and Perplexity.";

export default function Alternatives() {
  useSEO({
    title: "Best AI Search Visibility Tool Alternatives | GeoRankers",
    description: ALTERNATIVES_META_DESCRIPTION,
    canonical: "https://georankers.ai/alternatives",
    ogTitle: "Best AI Search Visibility Tool Alternatives",
    ogDescription: ALTERNATIVES_META_DESCRIPTION,
    ogUrl: "https://georankers.ai/alternatives",
  });

  // Standalone BreadcrumbList — check-before-create prevents duplication on prerender + hydration
  useEffect(() => {
    const ID = "alternatives-breadcrumb-schema";
    let el = document.querySelector(`script#${ID}`) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = ID;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://georankers.ai/" },
        { "@type": "ListItem", "position": 2, "name": "Alternatives", "item": "https://georankers.ai/alternatives" },
      ],
    });
    return () => { el?.remove(); };
  }, []);

  // ItemList schema — check-before-create, same as the BreadcrumbList above.
  // Only injected once there is at least one entry to list.
  useEffect(() => {
    const ID = "alternatives-itemlist-schema";
    if (alternativesEntries.length === 0) {
      document.querySelector(`script#${ID}`)?.remove();
      return;
    }
    let el = document.querySelector(`script#${ID}`) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = ID;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": alternativesEntries.map((entry, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": entry.pageTitle,
        "item": `https://georankers.ai/alternatives/${entry.slug}`,
      })),
    });
    return () => { el?.remove(); };
  }, []);

  const sorted = [...alternativesEntries].sort((a, b) =>
    a.publishedDate < b.publishedDate ? 1 : -1
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-32 pb-14 sm:pt-36 sm:pb-16 overflow-hidden">
          <div className="hero-gradient absolute inset-0 z-0"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <p className="text-sm text-blue-600 font-semibold mb-4 uppercase tracking-widest">Alternatives</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-[1.35] tracking-normal">
              Find the Right{" "}
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                AI Search Visibility Tool
              </span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              A factual look at the best alternatives to other AI search visibility and GEO tools,
              so you can choose the right platform for tracking your brand across ChatGPT, Google AI Search,
              and Perplexity.
            </p>
          </div>
        </section>

        {/* Grid */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          {sorted.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-sm">
              Alternatives guides are coming soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {sorted.map((entry, i) => (
                <AlternativeCard key={entry.slug} entry={entry} accent={CARD_ACCENTS[i % CARD_ACCENTS.length]} />
              ))}
            </div>
          )}
        </div>

        {/* Why GeoRankers Wins */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-blue-50/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm text-blue-600 font-semibold mb-3 uppercase tracking-widest">Why GeoRankers Wins</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-normal">
                What Makes GeoRankers the{" "}
                <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Right Choice
                </span>{" "}
                in Every Comparison
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHY_WE_WIN.map(({ icon: Icon, title, description }) => (
                <div key={title} className="rounded-2xl border border-slate-200/80 bg-white p-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5 tracking-normal">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-8">
              <Link href="/pricing" className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline underline-offset-2">
                See GeoRankers pricing and plans <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
        </section>

        {/* CTA — same rounded-box layout as the detail pages, using the
            site's shared gradient-cta color so it matches every other
            banner instead of a one-off blue/violet pair. */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="gradient-cta max-w-5xl mx-auto rounded-[1.5rem] p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-normal">
              See how GeoRankers tracks your AI search visibility
            </h2>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              Track brand visibility, competitors, citations and sentiment across ChatGPT, Google AI Search, and Perplexity.
            </p>
            <a
              href="https://dashboard.georankers.co/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Try GeoRankers Free <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
