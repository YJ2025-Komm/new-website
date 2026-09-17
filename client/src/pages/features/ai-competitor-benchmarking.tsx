import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useBreadcrumbSchema, FEATURES_CRUMBS } from "@/hooks/useBreadcrumbSchema";
import { Card, CardContent } from "@/components/ui/card";
import FAQSection, { type FAQ } from "@/components/FAQSection";
import GeminiSparkle from "@/components/GeminiSparkle";
import { ArrowDown, BarChart3, Check, Layers, Rocket, Target } from "lucide-react";
import { SiOpenai, SiPerplexity } from "react-icons/si";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PAGE_URL = "https://georankers.ai/features/ai-competitor-benchmarking";

const MODELS = [
  { name: "ChatGPT", icon: <SiOpenai className="w-4 h-4 text-slate-700" /> },
  { name: "Google AI Search", icon: <GeminiSparkle className="w-4 h-4" /> },
  { name: "Perplexity", icon: <SiPerplexity className="w-4 h-4 text-slate-700" /> },
];

// Brands pulled out of the single captured answer shown in the How It Works diagram.
// The order here is the order they appear in that answer, which is the whole point:
// position is read from the answer text, not assigned afterwards. `recorded` spells
// out that being named and where you are named are two separate signals.
const EXTRACTED = [
  { brand: "Competitor A", position: "Named 1st", recorded: "Mention + position", dot: "bg-amber-400", isYou: false },
  { brand: "GeoRankers", position: "Named 2nd", recorded: "Mention + position", dot: "bg-violet-500", isYou: true },
  { brand: "Competitor B", position: "Named 3rd", recorded: "Mention + position", dot: "bg-slate-400", isYou: false },
];

// Modeled on the actual Competitive Landscape widget in the dashboard: a bar per
// brand, a score, and a one-line descriptor that reads the number instead of
// leaving it to the reader. Descriptors follow the same "recorded" convention as
// the diagram above: tied brands say so explicitly, and a zero says zero.
const SCOREBOARD = [
  { brand: "Competitor A", score: 74, width: "74%", bar: "bg-amber-400", isYou: false, note: "Leading the field, with dominant visibility across topics." },
  { brand: "Your Brand", score: 61, width: "61%", bar: "bg-gradient-to-r from-violet-500 to-pink-500", isYou: true, note: "Recorded the same AI visibility score as 1 other tracked brand in this run." },
  { brand: "Competitor B", score: 61, width: "61%", bar: "bg-slate-400", isYou: false, note: "Recorded the same AI visibility score as 1 other tracked brand in this run." },
  { brand: "Competitor C", score: 0, width: "2%", bar: "bg-red-300", isYou: false, note: "Not named in any of the 47 tracked AI responses across 3 models in this run." },
];

const PER_MODEL = [
  { model: "ChatGPT", icon: <SiOpenai className="w-3.5 h-3.5 text-slate-700" />, you: 24, rival: 18, leader: "You" },
  { model: "Google AI Search", icon: <GeminiSparkle className="w-3.5 h-3.5" />, you: 11, rival: 27, leader: "Competitor A" },
  { model: "Perplexity", icon: <SiPerplexity className="w-3.5 h-3.5 text-slate-700" />, you: 19, rival: 9, leader: "You" },
];

const TOPICS = [
  { topic: "Best AI visibility tools", you: 12, best: 12, status: "Leading" },
  { topic: "ChatGPT brand tracking", you: 7, best: 15, status: "Losing" },
  { topic: "AI search for B2B SaaS", you: 3, best: 21, status: "Losing" },
];

const AT_A_GLANCE = [
  {
    metric: "AI Visibility Score",
    answers: "How visible you are overall",
    measured: "Built from how often and how prominently you are named across every tracked answer",
    matters: "The single number to watch over time",
  },
  {
    metric: "Mentions",
    answers: "How often you come up at all",
    measured: "Counted per brand, per buyer topic, and per model",
    matters: "Shows whether a low score is a coverage problem or a position problem",
  },
  {
    metric: "Position in AI Answers",
    answers: "Where you land when you do appear",
    measured: "Whether you are named first, mid-list, or last inside the answer",
    matters: "Being named last in a list of eight is closer to invisible than to visible",
  },
];

const FAQS: FAQ[] = [
  {
    question: "How do I decide which competitors to benchmark against?",
    answer:
      "Pick the brands that AI models already name alongside you, not the ones on your internal battlecard. The two lists are often different. Your first run will surface which brands actually appear in answers for your keywords, and that is the more useful starting point.",
  },
  {
    question: "How many competitors can I benchmark on each plan?",
    answer:
      "Free and Launch track up to 5 competitors. Grow and Enterprise track up to 10. Every tracked competitor is scored across all three models, so the number is a limit on breadth, not on depth of measurement.",
  },
  {
    question: "Can I change my competitor list after I have started tracking?",
    answer:
      "Yes. You can swap competitors in and out as your market shifts. Historical runs keep the competitor set they were measured with, so past results stay accurate rather than being retroactively rewritten.",
  },
  {
    question: "Why does a rival beat me on one model and not another?",
    answer:
      "Each model retrieves from a different index and weighs different signals. A competitor with strong structured data and entity clarity tends to do well on Google AI Search, while one with widely cited third-party coverage tends to do well on Perplexity. This is why a blended score hides more than it shows.",
  },
  {
    question: "What goes into the AI Visibility Score for each brand?",
    answer:
      "It combines how often a brand is named across your tracked answers with how prominently it is named. Appearing first in a short answer carries more weight than appearing last in a long list. Every brand in the comparison is scored the same way from the same answers.",
  },
  {
    question: "How often does the competitor comparison refresh?",
    answer:
      "Results refresh with each run, and you can run once every 24 hours. Free and Launch keep your last 5 runs, Grow keeps the last 10, and Enterprise keeps the last 50, so you can see how the gap between you and each rival moves over time.",
  },
  {
    question: "Can I see which sources are citing my competitors?",
    answer:
      "Yes. For every tracked brand you can see the domains that AI models drew from when naming them. That list is usually the most actionable output on the page, because it shows exactly where a rival earned the authority that put them in the answer.",
  },
  {
    question: "Does GeoRankers capture how AI describes each brand?",
    answer:
      "Where the model provides it, yes. You see the language AI uses about each brand in its own words, which often explains a score gap better than the numbers do. A rival described as the category standard is winning something that a mention count alone will not show.",
  },
  {
    question: "How is AI competitor tracking different from traditional SEO competitor analysis?",
    answer:
      "Traditional SEO competitor analysis compares rankings for a keyword. AI competitor tracking compares whether a model names you when a buyer asks a question. There is no ranked list of ten blue links to place in, so the measurement is presence and prominence inside a single generated answer.",
  },
  {
    question: "My score is falling while my traffic is steady. What does that mean?",
    answer:
      "It usually means competitors are gaining ground in AI answers before that shift reaches your analytics. AI visibility tends to move ahead of traffic, which is what makes a falling score worth acting on early rather than waiting for the downstream number to confirm it.",
  },
];

export default function AiCompetitorBenchmarking() {
  useSEO({
    title: "AI Competitor Tracking: Compare Brands in AI Answers",
    description:
      "AI competitor tracking that scores your brand and rivals from the same answers. Compare visibility and position across ChatGPT, Google AI Search, and Perplexity.",
    canonical: PAGE_URL,
    ogTitle: "AI Competitor Tracking: Compare Your Brand to Rivals in AI Answers",
    ogDescription:
      "Compare visibility scores, mention counts, and position against your competitors across ChatGPT, Google AI Search, and Perplexity.",
    ogUrl: PAGE_URL,
    schemaId: "ai-competitor-benchmarking-schema",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "AI Competitor Tracking and Benchmarking Across AI Answers",
      "url": PAGE_URL,
      "description":
        "AI competitor tracking that scores your brand and rivals from the same answers. Compare visibility and position across ChatGPT, Google AI Search, and Perplexity.",
      "isPartOf": { "@type": "WebSite", "name": "GeoRankers", "url": "https://georankers.ai" },
      "about": { "@type": "SoftwareApplication", "name": "GeoRankers", "url": "https://georankers.ai" },
    },
  });

  useBreadcrumbSchema("ai-competitor-benchmarking-breadcrumb-schema", [
    ...FEATURES_CRUMBS,
    { name: "AI Competitor Benchmarking", item: PAGE_URL },
  ]);

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
              See How Your Brand Compares to
              <br />
              <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
                Competitors in AI Answers
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              AI competitor tracking across ChatGPT, Google AI Search, and Perplexity. See which brands get
              named, which get named first, and on which topics it happens.
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

        {/* How It Works */}
        <section className="py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-slate-50/60 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-5">
                <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-3">How It Works</p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-slate-900 mb-4">
                  Compare Your Brand and Competitors in the Same AI Answers
                </h2>
                <p className="text-base text-slate-500 leading-relaxed">
                  Your prompt set runs across all three models. Every brand named in an answer is extracted
                  from that same answer, then scored on how often and how prominently it appears. Your
                  results and your competitors' results come from identical inputs, so the comparison is
                  genuinely like-for-like.
                </p>
              </div>

              <div className="lg:col-span-7">
                <Card className="glass rounded-[2rem] border-0">
                  <CardContent className="p-4 sm:p-6">
                    {/* Captured on every model. Shown as chips rather than parallel columns,
                        because the story on this page is what happens inside one answer. */}
                    <div className="flex items-center gap-1.5 flex-wrap mb-4">
                      {MODELS.map((model, i) => (
                        <span
                          key={model.name}
                          className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                            i === 0
                              ? "bg-white border-violet-300 text-slate-900"
                              : "bg-white/50 border-slate-200 text-slate-500"
                          }`}
                        >
                          {model.icon}
                          {model.name}
                        </span>
                      ))}
                      <span className="text-[11px] text-slate-400 ml-auto">Showing 1 of 3</span>
                    </div>

                    {/* The tracked prompt */}
                    <div className="rounded-xl border border-slate-200 bg-white/70 px-4 py-2.5 mb-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Tracked prompt</p>
                      <p className="text-sm font-medium text-slate-800">"Best AI visibility tool for B2B SaaS"</p>
                    </div>

                    {/* One captured answer, with every brand named inside it marked */}
                    <div className="rounded-xl border border-violet-300 bg-white px-4 py-3.5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-violet-500 mb-2">One captured answer</p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        "For B2B SaaS teams, the strongest option is{" "}
                        <span className="font-bold text-slate-900 bg-amber-100 border-b-2 border-amber-400 px-1 rounded-sm">Competitor A</span>
                        , though{" "}
                        <span className="font-bold text-slate-900 bg-violet-100 border-b-2 border-violet-500 px-1 rounded-sm">GeoRankers</span>{" "}
                        is purpose-built for tracking brand presence across AI answers.{" "}
                        <span className="font-bold text-slate-900 bg-slate-100 border-b-2 border-slate-400 px-1 rounded-sm">Competitor B</span>{" "}
                        also covers part of this..."
                      </p>
                    </div>

                    <div className="flex justify-center py-2">
                      <ArrowDown className="w-5 h-5 text-violet-500" strokeWidth={2.5} />
                    </div>

                    {/* Each brand pulled from that same answer, with what gets recorded */}
                    <div className="space-y-2">
                      {EXTRACTED.map((row) => (
                        <div
                          key={row.brand}
                          className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
                            row.isYou ? "border-violet-300 bg-violet-50/60" : "border-slate-200 bg-white/70"
                          }`}
                        >
                          <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${row.dot}`} />
                          <span className={`text-sm flex-shrink-0 ${row.isYou ? "font-bold text-slate-900" : "font-medium text-slate-600"}`}>
                            {row.brand}
                          </span>
                          <span className="text-[11px] text-slate-500 ml-auto whitespace-nowrap">{row.position}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 whitespace-nowrap">
                            {row.recorded}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-slate-400 text-center mt-5 italic leading-relaxed">
                      Illustrative. Because every brand is read from the same answer, your result and a
                      competitor's result are directly comparable.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Feature sections */}
        <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">

            {/* 1. Scoreboard: text left, visual right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Your Score Next to Theirs</h2>
                        <p className="text-base font-medium text-slate-500">Compare AI visibility scores across the same prompts and answers.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      Every brand that appears gets an AI Visibility Score built from the same set of answers,
                      so the comparison is genuinely like-for-like. Being named at all, being named first, and
                      how a brand is described are separate signals, and each one is measured separately.
                    </p>
                    <div className="bg-violet-50 border border-violet-100 rounded-xl p-4 mb-6">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-bold text-violet-700">You choose the field: </span>
                        Free and Launch track up to 5 competitors. Grow and Enterprise track up to 10.
                      </p>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What you get:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Side-by-side visibility scores for every tracked brand</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Mention counts per brand across your full prompt set</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">A High, Medium, or Low visibility tier for quick reading</span>
                      </li>
                    </ul>
                  </div>

                  {/* Visual: modeled on the dashboard's Competitive Landscape widget */}
                  <div className="glass-strong rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-violet-600" />
                        <h3 className="font-bold text-slate-900">Competitive Landscape</h3>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-100 rounded-full p-0.5 flex-shrink-0">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-violet-600 text-white">
                          AI Visibility Score
                        </span>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-slate-500">
                          Mentions
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mb-5">How you stack up against competitors in AI search results</p>

                    <div className="space-y-4">
                      {SCOREBOARD.map((row) => (
                        <div key={row.brand}>
                          <div className="flex items-center gap-3">
                            <span className={`text-sm w-28 flex-shrink-0 ${row.isYou ? "font-bold text-violet-700" : "font-semibold text-slate-700"}`}>
                              {row.brand}
                            </span>
                            <div className="flex-1 h-2.5 rounded-full bg-slate-200/70 overflow-hidden">
                              <div className={`h-full rounded-full ${row.bar}`} style={{ width: row.width }} />
                            </div>
                            <span className="text-sm font-bold text-slate-700 w-5 text-right flex-shrink-0">{row.score}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 ml-[7.75rem] leading-snug">{row.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Per-model: visual left, text right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    {/* Visual: per-model breakdown */}
                    <div className="glass-strong rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Layers className="w-4 h-4 text-blue-600" />
                        <h3 className="font-bold text-slate-900">Mentions by Model</h3>
                      </div>
                      <div className="space-y-3 mb-4">
                        {PER_MODEL.map((row) => (
                          <div key={row.model} className="p-3 bg-white/70 rounded-lg border border-slate-200/50">
                            <div className="flex items-center gap-2 mb-2">
                              {row.icon}
                              <span className="text-xs font-bold text-slate-900">{row.model}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full ml-auto ${row.leader === "You" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                                {row.leader === "You" ? "You lead" : "Rival leads"}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-slate-600">
                              <span>You <span className="font-black text-slate-900">{row.you}</span></span>
                              <span className="text-slate-300">|</span>
                              <span>Competitor A <span className="font-black text-slate-900">{row.rival}</span></span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Where you land when named</p>
                      <div className="flex rounded-full overflow-hidden h-2.5 mb-2">
                        <div className="bg-green-500" style={{ width: "41%" }} />
                        <div className="bg-amber-400" style={{ width: "37%" }} />
                        <div className="bg-slate-300" style={{ width: "22%" }} />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>First 41%</span>
                        <span>Mid-list 37%</span>
                        <span>Last 22%</span>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <Layers className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">See Which Competitors Lead on Each AI Platform</h2>
                        <p className="text-base font-medium text-slate-500">One average would hide all of this.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      The same competitor set is scored separately for ChatGPT, Google AI Search, and Perplexity,
                      because a rival that is named often on one platform may not appear on another at all.
                    </p>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-bold text-blue-700">Why it matters: </span>
                        A single blended number can look healthy while you are absent from the one model your
                        buyers actually use.
                      </p>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What you get:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Mention counts for every brand on every model</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Average position inside the answer, per model</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">The split between being named first, mid-list, or last</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Topics: text left, visual right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Find Topics Where Competitors Outperform You</h2>
                        <p className="text-base font-medium text-slate-500">A target list, not a scoreboard.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      Results break down by buyer topic and tracked prompt, so the output is a list of places to
                      go after rather than a single number to feel bad about.
                    </p>
                    <div className="bg-pink-50 border border-pink-100 rounded-xl p-4 mb-6">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-bold text-pink-700">Worth knowing: </span>
                        A brand can hold a strong overall score and still be invisible on the handful of topics
                        where buyers actually decide.
                      </p>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What you get:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Mention counts per buyer topic for every tracked brand</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">The sources each rival is cited from</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">How AI describes each brand in its own words</span>
                      </li>
                    </ul>
                  </div>

                  {/* Visual: per-topic gap list */}
                  <div className="glass-strong rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-4 h-4 text-pink-600" />
                      <h3 className="font-bold text-slate-900">Topic Breakdown</h3>
                    </div>
                    <div className="space-y-3 mb-4">
                      {TOPICS.map((row) => (
                        <div key={row.topic} className="p-3 bg-white/70 rounded-lg border border-slate-200/50">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <p className="text-sm font-medium text-slate-800">{row.topic}</p>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 ${row.status === "Leading" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                              {row.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-[11px] text-slate-600">
                            <span>You <span className="font-black text-slate-900">{row.you}</span></span>
                            <span className="text-slate-300">|</span>
                            <span>Best rival <span className="font-black text-slate-900">{row.best}</span></span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Sources citing your rivals</p>
                    <div className="flex flex-wrap gap-2">
                      {["g2.com", "reddit.com", "capterra.com", "techcrunch.com"].map((d) => (
                        <span key={d} className="text-xs px-2.5 py-1 bg-pink-50 text-pink-700 rounded-full border border-pink-100">{d}</span>
                      ))}
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
              Your AI Competitor Metrics at a Glance
            </h2>

            {/* Desktop / tablet table */}
            <Card className="hidden sm:block glass rounded-[2rem] border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-4 bg-slate-900/90 text-white text-sm font-black uppercase tracking-wide">
                  <div className="px-5 py-4">Metric</div>
                  <div className="px-5 py-4">What it answers</div>
                  <div className="px-5 py-4">How we measure it</div>
                  <div className="px-5 py-4">Why it matters</div>
                </div>
                {AT_A_GLANCE.map((row, i) => (
                  <div
                    key={row.metric}
                    className={`grid grid-cols-4 text-sm sm:text-[15px] leading-relaxed ${i % 2 === 0 ? "bg-white/70" : "bg-white/40"}`}
                  >
                    <div className="px-5 py-4 font-bold text-slate-900">{row.metric}</div>
                    <div className="px-5 py-4 text-slate-600">{row.answers}</div>
                    <div className="px-5 py-4 text-slate-600">{row.measured}</div>
                    <div className="px-5 py-4 text-slate-600">{row.matters}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Mobile: stacked cards instead of horizontal scroll */}
            <div className="sm:hidden space-y-4">
              {AT_A_GLANCE.map((row) => (
                <Card key={row.metric} className="glass rounded-2xl border-0">
                  <CardContent className="p-5">
                    <h3 className="text-base font-bold text-slate-900 mb-3">{row.metric}</h3>
                    <dl className="space-y-2.5 text-sm">
                      <div>
                        <dt className="text-xs font-black uppercase tracking-widest text-slate-400">What it answers</dt>
                        <dd className="text-slate-600">{row.answers}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-black uppercase tracking-widest text-slate-400">How we measure it</dt>
                        <dd className="text-slate-600">{row.measured}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-black uppercase tracking-widest text-slate-400">Why it matters</dt>
                        <dd className="text-slate-600">{row.matters}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-[2.5rem] p-10 sm:p-14 text-center shadow-2xl" style={{ background: 'linear-gradient(135deg, #2994FF, #5C92FF, #7575FF)' }}>
              <p className="text-xs font-black uppercase tracking-widest text-white/70 mb-4">
                Competitive Clarity
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white mb-5">
                See Where Competitors Lead and Where You Can Grow
              </h2>
              <p className="text-lg font-medium text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
                See how your brand compares with competitors across the AI platforms your buyers use, topic by
                topic, then start with the gaps that matter most.
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

        <FAQSection
          faqs={FAQS}
          schemaId="ai-competitor-benchmarking-faq-schema"
          footer={
            <>
              See the exact prompts your rivals are winning with{" "}
              <Link href="/features/prompt-intelligence" className="text-blue-600 hover:text-blue-800 underline">
                Prompt Intelligence
              </Link>
              , or{" "}
              <Link href="/features" className="text-blue-600 hover:text-blue-800 underline">
                explore all GeoRankers features
              </Link>
              .
            </>
          }
        />

      </main>
      <Footer />
    </div>
  );
}
