import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUp,
  Check,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Rocket,
} from "lucide-react";
import { SiOpenai, SiPerplexity } from "react-icons/si";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Gemini "sparkle" mark — Google AI Search (AI Overview + AI Mode) is Gemini-powered.
// Painted with a CSS conic-gradient masked to the sparkle silhouette so the four points
// each read as a distinct hue (a linear/radial SVG gradient can't do that — every point
// would just blend toward whichever two stops it sits between).
const GEMINI_SPARKLE_MASK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'%3E%3Cpath d='M14 28C14 26.0633 13.6267 24.2433 12.88 22.54C12.1567 20.8367 11.165 19.355 9.905 18.095C8.645 16.835 7.16333 15.8433 5.46 15.12C3.75667 14.3733 1.93667 14 0 14C1.93667 14 3.75667 13.6383 5.46 12.915C7.16333 12.1683 8.645 11.165 9.905 9.905C11.165 8.645 12.1567 7.16333 12.88 5.46C13.6267 3.75667 14 1.93667 14 0C14 1.93667 14.3617 3.75667 15.085 5.46C15.8317 7.16333 16.835 8.645 18.095 9.905C19.355 11.165 20.8367 12.1683 22.54 12.915C24.2433 13.6383 26.0633 14 28 14C26.0633 14 24.2433 14.3733 22.54 15.12C20.8367 15.8433 19.355 16.835 18.095 18.095C16.835 19.355 15.8317 20.8367 15.085 22.54C14.3617 24.2433 14 26.0633 14 28Z'/%3E%3C/svg%3E\")";

function GeminiSparkle({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <span
      className={`${className} inline-block flex-shrink-0`}
      style={{
        // 0deg = top, and conic-gradient sweeps clockwise, so this lands red at the top
        // point, blue at the right point, green at the bottom point, yellow at the left
        // point — matching the reference mark exactly instead of smearing along one axis.
        background:
          "conic-gradient(from 0deg at 50% 50%, #EA4335 0%, #4285F4 25%, #34A853 50%, #FBBC05 75%, #EA4335 100%)",
        WebkitMaskImage: GEMINI_SPARKLE_MASK,
        maskImage: GEMINI_SPARKLE_MASK,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

// Three parallel per-model pipelines (Source Retrieval → Context Evaluation → Citation
// Decision), each captured separately by GeoRankers (visibility is never blended into
// one score) — but recommendations converge into a single prioritized action plan built
// from signals across all three models, not a separate plan per model.
const MODEL_PIPELINES = [
  { name: "ChatGPT", icon: <SiOpenai className="w-4 h-4 text-slate-700" /> },
  { name: "Google AI Search", icon: <GeminiSparkle className="w-4 h-4" /> },
  { name: "Perplexity", icon: <SiPerplexity className="w-4 h-4 text-slate-700" /> },
];

const PIPELINE_TIERS = [
  { label: "Source Retrieval", borderColor: "#cbd5e1" },
  { label: "Context Evaluation", borderColor: "#93c5fd" },
  { label: "Citation Decision", borderColor: "#8b5cf6" },
];

function ModelIntegrationDiagram() {
  return (
    <section className="py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-slate-50/60 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: intro text */}
          <div className="lg:col-span-5">
            <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-slate-900 mb-4">
              How GeoRankers Integrates Into AI Answer Processes
            </h2>
            <p className="text-base text-slate-500 leading-relaxed">
              Each model runs its own retrieval-to-citation pipeline, and GeoRankers captures every stage
              separately — visibility is never blended into one score. Recommendations then combine what's
              found across all three models into a single prioritized action plan.
            </p>
          </div>

          {/* Right: diagram */}
          <div className="lg:col-span-7">
        <Card className="glass rounded-[2rem] border-0">
          <CardContent className="p-4 sm:p-6">
            <div className="overflow-x-auto">
              <div className="min-w-[560px]">
                {/* Single combined action plan — built from all three models, not one plan per model */}
                <div className="rounded-xl border border-slate-900 bg-white px-4 py-3 text-center mb-2">
                  <p className="text-slate-900 font-black text-xs sm:text-sm uppercase tracking-wide">
                    Action Plan
                  </p>
                  <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5">
                    Built from signals across ChatGPT, Google AI Search, and Perplexity
                  </p>
                </div>

                {/* Arrows up into the combined action plan */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-2">
                  {MODEL_PIPELINES.map((model) => (
                    <div key={model.name} className="flex justify-center">
                      <ArrowUp className="w-5 h-5 text-blue-500" strokeWidth={2.5} />
                    </div>
                  ))}
                </div>

                {/* Shared GeoRankers capture layer — spans all three models */}
                <div className="rounded-xl border border-blue-500 bg-white px-4 py-3 text-center mb-2">
                  <p className="text-slate-900 font-black text-xs sm:text-sm uppercase tracking-wide">
                    GeoRankers Data Capture Layer
                  </p>
                  <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5">
                    Every model captured and tracked separately — no blended visibility score
                  </p>
                </div>

                {/* Arrows up from each model's pipeline into the shared layer */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-2">
                  {MODEL_PIPELINES.map((model) => (
                    <div key={model.name} className="flex justify-center">
                      <ArrowUp className="w-5 h-5 text-blue-500" strokeWidth={2.5} />
                    </div>
                  ))}
                </div>

                {/* Per-model column headers + pipeline tiers, bottom (Source Retrieval) to top (Citation Decision) */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {MODEL_PIPELINES.map((model) => (
                    <div key={model.name}>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {model.icon}
                        <span className="text-xs sm:text-sm font-black uppercase text-slate-900">{model.name}</span>
                      </div>
                      <div className="space-y-2">
                        {[...PIPELINE_TIERS].reverse().map((tier) => (
                          <div
                            key={tier.label}
                            className="rounded-lg border bg-white py-2.5 text-center"
                            style={{ borderColor: tier.borderColor }}
                          >
                            <span className="text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wide">
                              {tier.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center mt-6 italic">
              Pipeline stages are illustrative — GeoRankers captures signals after each model's citation
              decision, tracked separately per model, then combines them into one action plan.
            </p>
          </CardContent>
        </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

const AT_A_GLANCE = [
  {
    model: "ChatGPT",
    formed: "Search retrieval + model reasoning",
    influence: "Relevance, brand context, source consistency",
    measures: "Mentions, citations, position, framing",
  },
  {
    model: "Google AI Search",
    formed: "Google Search and Knowledge Graph signals",
    influence: "Authority, structured data, entity clarity",
    measures: "AI Overview presence, citations, entity visibility",
  },
  {
    model: "Perplexity",
    formed: "Citation-first web retrieval",
    influence: "Source authority and citation relevance",
    measures: "Mentions, cited domains, source position",
  },
];

const FAQS = [
  {
    question: "Is ChatGPT search the same as regular ChatGPT?",
    answer:
      "No. Regular ChatGPT answers from training data alone. ChatGPT search mode adds live web retrieval via OAI-SearchBot, pulling current information and citing sources — which is the surface GeoRankers tracks.",
  },
  {
    question: "Does Google AI Search use the same index as Google Search results?",
    answer:
      "Yes, it draws from the same underlying Google index, but answers are shaped more heavily by Knowledge Graph entity signals and structured data than standard search rankings are.",
  },
  {
    question: "Does Perplexity have its own crawler, or does it rely on Google/Bing?",
    answer:
      "Perplexity runs its own crawler, PerplexityBot, and maintains its own retrieval and indexing systems rather than simply reproducing Google or Bing rankings — which is why its citation patterns often differ from the other two models.",
  },
  {
    question: "Why does my brand show up on one AI model but not another?",
    answer:
      "Each model retrieves from a different index and weighs different signals — schema and entity clarity matter more to Google AI Search, while citation-worthy content matters more to Perplexity. A gap on one model doesn't mean a gap on all of them.",
  },
  {
    question: "How often does GeoRankers re-check my visibility on these models?",
    answer:
      "All plans run on a weekly schedule by default, with on-demand runs available depending on your plan — so you get fresh ChatGPT, Google AI Search, and Perplexity data without waiting for a full weekly cycle.",
  },
  {
    question: "What counts as a \"citation source domain\"?",
    answer:
      "Any domain an AI model references or draws from when generating its answer — review sites, documentation, forums, comparison pages, and your own website all count. GeoRankers tracks which domains show up most often alongside your brand on each model.",
  },
  {
    question: "What does \"position and framing\" actually measure?",
    answer:
      "It's how prominently and positively your brand is presented inside an AI answer — whether you're actively recommended, simply mentioned in a list, or absent entirely — not just whether your name appears somewhere in the response.",
  },
  {
    question: "Can I track specific competitors across these three models?",
    answer:
      "Yes. You can define competitors and GeoRankers shows how they're mentioned, positioned, and cited across ChatGPT, Google AI Search, and Perplexity side by side with your own brand.",
  },
  {
    question: "Does GeoRankers track Google Gemini separately, or is it part of Google AI Search?",
    answer:
      "Google AI Search tracking already covers both AI Overview and AI Mode — the same Gemini-powered surfaces that generate Google's AI answers. A standalone Gemini app/API integration is on the roadmap, but the underlying model is already part of what we track today through Google AI Search.",
  },
  {
    question: "Do all three models get equal weight in my overall Visibility Score?",
    answer:
      "No — GeoRankers reports each model separately and also combines them into a single weighted AI Visibility Score, so you can see both the blended number and the per-model breakdown side by side, without one strong model masking a weak one.",
  },
];

export default function AiModelsTracked() {
  useSEO({
    title: "AI Models GeoRankers Tracks: ChatGPT, Google AI Search & Perplexity",
    description:
      "See how GeoRankers tracks brand visibility across ChatGPT, Google AI Search, and Perplexity — retrieval methods, citation sources, and model-wise scoring explained.",
    canonical: "https://georankers.ai/features/ai-models-tracked",
    ogTitle: "How GeoRankers Tracks AI Models — ChatGPT, Google AI Search & Perplexity",
    ogDescription:
      "See how GeoRankers tracks brand visibility across ChatGPT, Google AI Search, and Perplexity — retrieval methods, citation sources, and model-wise scoring explained.",
    ogUrl: "https://georankers.ai/features/ai-models-tracked",
    schemaId: "ai-models-tracked-schema",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "AI Models GeoRankers Tracks: ChatGPT, Google AI Search & Perplexity",
      "url": "https://georankers.ai/features/ai-models-tracked",
      "description":
        "See how GeoRankers tracks brand visibility across ChatGPT, Google AI Search, and Perplexity — retrieval methods, citation sources, and model-wise scoring explained.",
      "isPartOf": { "@type": "WebSite", "name": "GeoRankers", "url": "https://georankers.ai" },
      "about": { "@type": "SoftwareApplication", "name": "GeoRankers", "url": "https://georankers.ai" },
    },
  });

  // Standalone BreadcrumbList — check-before-create prevents duplication on prerender + hydration
  useEffect(() => {
    const ID = "ai-models-tracked-breadcrumb-schema";
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
        { "@type": "ListItem", "position": 2, "name": "Features", "item": "https://georankers.ai/features" },
        { "@type": "ListItem", "position": 3, "name": "AI Models Tracked", "item": "https://georankers.ai/features/ai-models-tracked" },
      ],
    });
    return () => { el?.remove(); };
  }, []);

  // Standalone FAQPage — separate script tag avoids Google "Duplicate field FAQ page" error.
  useEffect(() => {
    const ID = "ai-models-tracked-faq-schema";
    let el = document.querySelector(`script#${ID}`) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = ID;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQS.map((f) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer },
      })),
    });
    return () => { el?.remove(); };
  }, []);

  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  return (
    <div className="min-h-screen text-slate-900" style={{ overflowX: "clip" }}>
      <Navbar />
      <main id="main-content">

        {/* Hero */}
        <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-14 overflow-hidden">
          <div className="hero-gradient absolute inset-0 z-0"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm text-blue-600 font-semibold mb-4 uppercase tracking-widest">Features</p>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-5 leading-[1.1]">
              Track Your Brand Across
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                ChatGPT, Google AI Search, Perplexity
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Every AI platform retrieves, ranks, and cites information differently. GeoRankers shows where
              your brand appears, how it's positioned, and which sources influence each answer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://dashboard.georankers.co/register"
                className="inline-flex items-center px-6 py-3 gradient-primary hover:opacity-90 rounded-xl font-black text-base text-white transition-all duration-200 shadow-lg"
                data-testid="cta-hero-try-free"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Try for Free
              </a>
              <a
                href="https://calendly.com/hello-georankers/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border-2 border-slate-300 hover:border-blue-400 rounded-xl font-semibold text-base text-slate-700 hover:text-blue-600 transition-all duration-200"
                data-testid="cta-hero-book-demo"
              >
                Book a Demo
              </a>
            </div>
          </div>
        </section>

        <ModelIntegrationDiagram />

        {/* Model sections */}
        <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">

            {/* ChatGPT — text left, visual right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <SiOpenai className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">ChatGPT</h2>
                        <p className="text-base font-medium text-slate-500">Where buyers ask for recommendations directly.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      ChatGPT combines live web retrieval with its broader training data and reasoning systems.
                      As a result, traditional search rankings do not directly determine which brands appear
                      in its answers.
                    </p>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-bold text-blue-700">What this means: </span>
                        Strong Google rankings alone may not guarantee that ChatGPT recommends or even mentions
                        your brand.
                      </p>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What GeoRankers tracks:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Brand mention rate across ChatGPT prompts</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Citation source domains ChatGPT pulls from</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Position and framing within the answer (recommended, mentioned, absent)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Visual: mock ChatGPT answer with framing meter + citation chips */}
                  <div className="glass-strong rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center flex-shrink-0">
                        <SiOpenai className="w-3.5 h-3.5 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-900">ChatGPT Search</h3>
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full ml-auto">Live</span>
                    </div>
                    <div className="p-3 bg-white/70 rounded-lg border border-slate-200/50 mb-4">
                      <p className="text-sm font-medium text-slate-800 mb-1">"Best AI visibility tool for B2B SaaS"</p>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        "...for tracking brand presence across AI answers, <span className="font-semibold text-blue-600">GeoRankers</span> is purpose-built for this — it monitors..."
                      </p>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Framing</p>
                    <div className="flex rounded-full overflow-hidden h-2.5 mb-2">
                      <div className="bg-green-500" style={{ width: "62%" }} />
                      <div className="bg-amber-400" style={{ width: "26%" }} />
                      <div className="bg-slate-200" style={{ width: "12%" }} />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-4">
                      <span>Recommended 62%</span>
                      <span>Mentioned 26%</span>
                      <span>Absent 12%</span>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Citation domains</p>
                    <div className="flex flex-wrap gap-2">
                      {["g2.com", "georankers.ai", "reddit.com", "capterra.com"].map((d) => (
                        <span key={d} className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google AI Search — visual left, text right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    {/* Visual: mock knowledge panel with entity confidence + citation accuracy */}
                    <div className="glass-strong rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                          <GeminiSparkle className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-slate-900">AI-Generated Answer</h3>
                        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full ml-auto">Live</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-slate-200/50 mb-4">
                        <div>
                          <p className="text-sm font-bold text-slate-900">GeoRankers</p>
                          <p className="text-xs text-slate-500">AI Search Intelligence Platform</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-black text-violet-600">94%</div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wide">Entity confidence</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="text-center p-3 bg-gradient-to-br from-violet-500/10 to-pink-500/10 rounded-lg border border-violet-500/20">
                          <div className="text-sm font-black text-violet-600">Text</div>
                          <div className="text-[11px] text-slate-500">Citation accurate</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-violet-500/10 to-pink-500/10 rounded-lg border border-violet-500/20">
                          <div className="text-sm font-black text-violet-600">Image</div>
                          <div className="text-[11px] text-slate-500">Citation accurate</div>
                        </div>
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Structured data signals</p>
                      <div className="space-y-2">
                        {["Organization schema present", "FAQPage schema present", "Sameas / entity links verified"].map((s) => (
                          <div key={s} className="flex items-center gap-2 text-xs text-slate-600">
                            <Check className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" />
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-white border border-slate-200 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <GeminiSparkle className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Google AI Search</h2>
                        <p className="text-base font-medium text-slate-500">Where search visibility becomes AI-generated discovery.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      Covers both AI Overview and AI Mode — Google's Gemini-powered AI-generated answer
                      surfaces — drawing on Google's own live index and Knowledge Graph. Structured data,
                      schema, and entity clarity influence this model more heavily than raw content volume.
                    </p>
                    <div className="bg-violet-50 border border-violet-100 rounded-xl p-4 mb-6">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-bold text-violet-700">What this means: </span>
                        Authority, structured information, and entity clarity can influence whether Google
                        confidently includes your brand.
                      </p>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What GeoRankers tracks:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Brand mention rate in AI-generated answers</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">How accurately Google cites your text and image content</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">How confidently Google identifies your brand as a distinct entity</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Perplexity — text left, visual right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <SiPerplexity className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Perplexity</h2>
                        <p className="text-base font-medium text-slate-500">Where citations determine which brands earn attention.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      Perplexity uses its own crawler and retrieval systems to find and cite sources, rather
                      than simply reproducing Google rankings — prioritizing source recency and diversity over
                      any single ranking system.
                    </p>
                    <div className="bg-pink-50 border border-pink-100 rounded-xl p-4 mb-6">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-bold text-pink-700">What this means: </span>
                        Being cited by the right external sources may matter as much as what appears on your
                        own website.
                      </p>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What GeoRankers tracks:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Brand mention rate across Perplexity answers</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Which sources get cited alongside or instead of you</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Your ranking among the sources Perplexity chooses to cite</span>
                      </li>
                    </ul>
                  </div>

                  {/* Visual: mock cited-sources ranking */}
                  <div className="glass-strong rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-md bg-[#1c1c1e] flex items-center justify-center flex-shrink-0">
                        <SiPerplexity className="w-3.5 h-3.5 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-900">Sources Cited</h3>
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full ml-auto">Live</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { rank: 1, name: "g2.com", highlight: false },
                        { rank: 2, name: "georankers.ai (You)", highlight: true },
                        { rank: 3, name: "producthunt.com", highlight: false },
                        { rank: 4, name: "reddit.com/r/saas", highlight: false },
                      ].map((s) => (
                        <div
                          key={s.rank}
                          className={`flex items-center justify-between p-3 rounded-lg border text-sm ${
                            s.highlight
                              ? "bg-gradient-to-r from-pink-500/10 to-red-500/10 border-pink-500/30"
                              : "bg-white/60 border-slate-200/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 ${
                              s.highlight ? "bg-pink-500 text-white" : "bg-slate-200 text-slate-600"
                            }`}>
                              {s.rank}
                            </span>
                            <span className={s.highlight ? "font-bold text-slate-900" : "text-slate-700"}>{s.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200/50">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>Source diversity</span>
                        <span className="font-black text-pink-600">High</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-pink-500 to-red-500 rounded-full" style={{ width: "78%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* At A Glance table */}
        <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-violet-50/30 to-pink-50/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-slate-900 text-center mb-8">
              At A Glance
            </h2>

            {/* Desktop / tablet table */}
            <Card className="hidden sm:block glass rounded-[2rem] border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-4 bg-slate-900/90 text-white text-sm font-black uppercase tracking-wide">
                  <div className="px-5 py-4">Platform</div>
                  <div className="px-5 py-4">How answers are formed</div>
                  <div className="px-5 py-4">What most influences visibility</div>
                  <div className="px-5 py-4">What GeoRankers measures</div>
                </div>
                {AT_A_GLANCE.map((row, i) => (
                  <div
                    key={row.model}
                    className={`grid grid-cols-4 text-sm sm:text-[15px] leading-relaxed ${i % 2 === 0 ? "bg-white/70" : "bg-white/40"}`}
                  >
                    <div className="px-5 py-4 font-bold text-slate-900">{row.model}</div>
                    <div className="px-5 py-4 text-slate-600">{row.formed}</div>
                    <div className="px-5 py-4 text-slate-600">{row.influence}</div>
                    <div className="px-5 py-4 text-slate-600">{row.measures}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Mobile: stacked comparison cards instead of horizontal scroll */}
            <div className="sm:hidden space-y-4">
              {AT_A_GLANCE.map((row) => (
                <Card key={row.model} className="glass rounded-2xl border-0">
                  <CardContent className="p-5">
                    <h3 className="text-base font-bold text-slate-900 mb-3">{row.model}</h3>
                    <dl className="space-y-2.5 text-sm">
                      <div>
                        <dt className="text-xs font-black uppercase tracking-widest text-slate-400">How answers are formed</dt>
                        <dd className="text-slate-600">{row.formed}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-black uppercase tracking-widest text-slate-400">What most influences visibility</dt>
                        <dd className="text-slate-600">{row.influence}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-black uppercase tracking-widest text-slate-400">What GeoRankers measures</dt>
                        <dd className="text-slate-600">{row.measures}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Model-Level Tracking Matters */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-[2.5rem] p-10 sm:p-14 text-center shadow-2xl" style={{ background: 'linear-gradient(135deg, #2994FF, #5C92FF, #7575FF)' }}>
              <p className="text-xs font-black uppercase tracking-widest text-white/70 mb-4">
                Model-Level Clarity
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white mb-5">
                Why Model-Level Tracking Matters
              </h2>
              <p className="text-lg font-medium text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
                A blended score hides the real problem. GeoRankers breaks down Visibility Score, Position,
                and Share of Voice model by model, so you fix the actual gap — not the average.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://dashboard.georankers.co/register"
                  className="inline-flex items-center px-7 py-3 bg-white text-blue-600 font-black text-base rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg"
                  data-testid="cta-band-try-free"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Try for Free
                </a>
                <a
                  href="https://calendly.com/hello-georankers/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-7 py-3 border-2 border-white/40 text-white font-semibold text-base rounded-xl hover:border-white/70 transition-all duration-200"
                  data-testid="cta-band-book-demo"
                >
                  Book a Demo
                </a>
              </div>
              <p className="text-sm font-medium text-white/50 mt-4">No credit card required</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-blue-50/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                <HelpCircle className="w-3.5 h-3.5" />
                FAQ
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {FAQS.map((faq, index) => (
                <Card key={index} className="glass rounded-2xl border-0">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                      className="w-full p-6 text-left flex items-start justify-between hover:bg-white/20 transition-colors duration-300"
                      data-testid={`button-faq-${index}`}
                    >
                      <h3 className="text-base font-bold text-slate-900 pr-4">{faq.question}</h3>
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div className="px-6 pb-6">
                        <div className="text-slate-600 leading-relaxed text-sm sm:text-[15px]">{faq.answer}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center text-sm text-slate-500 mt-10">
              Want the full platform breakdown?{" "}
              <Link href="/features" className="text-blue-600 hover:text-blue-800 underline">
                Explore all GeoRankers features
              </Link>
              .
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
