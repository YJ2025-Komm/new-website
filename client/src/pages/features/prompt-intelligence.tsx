import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useBreadcrumbSchema, FEATURES_CRUMBS } from "@/hooks/useBreadcrumbSchema";
import { Card, CardContent } from "@/components/ui/card";
import FAQSection, { type FAQ } from "@/components/FAQSection";
import GeminiSparkle from "@/components/GeminiSparkle";
import { Check, Compass, DollarSign, Flame, MessageSquare, Rocket, Scale, Search, ShieldCheck, X } from "lucide-react";
import { SiOpenai, SiPerplexity } from "react-icons/si";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PAGE_URL = "https://georankers.ai/features/prompt-intelligence";

const MODELS = [
  { name: "ChatGPT", icon: <SiOpenai className="w-4 h-4 text-slate-700" /> },
  { name: "Google AI Search", icon: <GeminiSparkle className="w-4 h-4" /> },
  { name: "Perplexity", icon: <SiPerplexity className="w-4 h-4 text-slate-700" /> },
];

// A prompt set is rejected unless every one of these five is covered, so the
// diagram and the copy both treat five as the fixed number, never a subset.
const INTENTS = [
  { name: "Discovery", icon: <Search className="w-4 h-4" />, example: "What tools help track brand visibility in AI search results?" },
  { name: "Trust", icon: <ShieldCheck className="w-4 h-4" />, example: "Are AI visibility tracking tools reliable for SaaS companies?" },
  { name: "Pricing", icon: <DollarSign className="w-4 h-4" />, example: "How much does AI brand visibility tracking cost?" },
  { name: "Use Case", icon: <Compass className="w-4 h-4" />, example: "How do B2B SaaS teams monitor brand mentions across ChatGPT and Perplexity?" },
  { name: "Comparison", icon: <Scale className="w-4 h-4" />, example: "What is the best AI visibility tracking tool for competitor analysis?" },
];

// Stage 1 of the How It Works diagram, styled after the dashboard's actual AI
// Prompts Used table: one row per prompt, a named/not-named mark per model, and a
// priority tag on the prompts that matter most.
const DIAGRAM_PROMPTS = [
  { prompt: "What tools help track brand visibility in AI search results?", priority: true, results: [false, false, false] },
  { prompt: "Is it worth switching from my current tool to something cheaper?", priority: false, results: [false, true, true] },
];

// Stage 2: the same tracked prompts rolled up by intent, styled after the
// dashboard's actual Brand Presence by Buyer Intent panel: a visibility percentage,
// a presence-strength read, and the brand currently leading that intent.
const DIAGRAM_INTENT_PRESENCE = [
  { intent: "Discovery", pct: 0, strength: "Very low", strengthClass: "bg-red-100 text-red-700", topBrand: "Competitor A" },
  { intent: "Use Case", pct: 83, strength: "Strong", strengthClass: "bg-green-100 text-green-700", topBrand: "Your Brand" },
  { intent: "Comparison", pct: 33, strength: "Low", strengthClass: "bg-amber-100 text-amber-700", topBrand: "Competitor A" },
];

// Per-intent coverage shown in sub-section 1. Counts are illustrative but the
// pattern is real: coverage and results are tracked separately per intent, so a
// brand can win Discovery and still be absent at Comparison.
const COVERAGE = [
  { intent: "Discovery", tracked: 6, named: 5 },
  { intent: "Trust", tracked: 6, named: 4 },
  { intent: "Pricing", tracked: 6, named: 2 },
  { intent: "Use Case", tracked: 6, named: 5 },
  { intent: "Comparison", tracked: 6, named: 1 },
];

// The evidence grid in sub-section 3. Three sample prompts, three models, and the
// three-way result GeoRankers actually records: named first, named later in the
// answer, or not named at all. This is deliberately not a single "appeared" flag.
const EVIDENCE = [
  {
    prompt: "What tools help track brand visibility in AI search results?",
    intent: "Discovery",
    results: ["first", "first", "later"] as const,
  },
  {
    prompt: "What is the best AI visibility tracking tool for competitor analysis?",
    intent: "Comparison",
    results: ["later", "none", "none"] as const,
  },
  {
    prompt: "How do B2B SaaS teams monitor brand mentions across ChatGPT and Perplexity?",
    intent: "Use Case",
    results: ["first", "later", "first"] as const,
  },
];

const RESULT_STYLE = {
  first: { label: "Named 1st", className: "bg-green-100 text-green-700" },
  later: { label: "Named later", className: "bg-amber-100 text-amber-700" },
  none: { label: "Not named", className: "bg-slate-100 text-slate-500" },
};

const AT_A_GLANCE = [
  {
    intent: "Discovery",
    asking: "What options exist for solving this problem?",
    signals: "Whether you show up when the category is first being explored",
    measures: "Mention rate on broad, early-stage prompts",
  },
  {
    intent: "Trust",
    asking: "Can I rely on this type of tool or vendor?",
    signals: "Whether AI vouches for your category, and for you specifically",
    measures: "Mention rate on credibility and reliability prompts",
  },
  {
    intent: "Pricing",
    asking: "What does this cost, and is it worth it?",
    signals: "Whether you are part of the pricing conversation at all",
    measures: "Mention rate on cost and value prompts",
  },
  {
    intent: "Use Case",
    asking: "What should I use for my specific situation?",
    signals: "Whether you are named for the buyer's actual scenario, not just the category",
    measures: "Mention rate on scenario-specific prompts",
  },
  {
    intent: "Comparison",
    asking: "Which option is better than the others?",
    signals: "Whether you survive a head-to-head comparison",
    measures: "Mention rate on versus and best-of prompts",
  },
];

const FAQS: FAQ[] = [
  {
    question: "Where do the tracked prompts come from?",
    answer:
      "Each seed keyword you provide is expanded into buying-intent prompts spread across five intents, generated from your keyword and product context. Your own brand name is deliberately left out of them, so results are not self-fulfilling, and you can add, edit, or remove any prompt yourself to cover a specific question.",
  },
  {
    question: "Can I write my own prompts instead of using the generated ones?",
    answer:
      "Yes. You can add or edit prompts yourself, and the intent is classified automatically when you do. This is useful when you already know the specific question a buyer asks that a generated prompt set would not think to include.",
  },
  {
    question: "How many prompts does each plan track?",
    answer:
      "Free and Launch track 30 prompts, Grow tracks 60, and Enterprise tracks 100. Every prompt runs across all three models, so the number is a limit on how many distinct buyer questions you cover, not on how many models answer each one.",
  },
  {
    question: "How is a prompt different from a keyword?",
    answer:
      "A keyword is a short search term. A prompt is the longer, conversational question a buyer actually types into an AI assistant. The same keyword can expand into very different prompts depending on intent, which is why prompt tracking and keyword tracking measure different things.",
  },
  {
    question: "Why can the same prompt return a different answer on a different day?",
    answer:
      "AI answers draw on live retrieval, and a run can happen at most once every 24 hours, so the underlying web content, your competitors' content, and the model itself can all change between runs. A shifting answer is expected behavior, not a tracking error.",
  },
  {
    question: "Are prompts tracked separately for each market I track?",
    answer:
      "Yes. Prompts can be run under a specific country so the answer reflects that market's perspective. A prompt tracked worldwide and the same prompt tracked for one country are recorded as separate results.",
  },
  {
    question: "Does every prompt run on every model?",
    answer:
      "Yes. Every tracked prompt is answered by ChatGPT, Google AI Search, and Perplexity, and each model's answer is recorded on its own. Nothing is averaged across models before you see it.",
  },
  {
    question: "What is the difference between being named first and being named at all?",
    answer:
      "Being named at all means your brand appears somewhere in the answer. Being named first means you are the first brand the model mentions. Both are recorded separately, because a brand mentioned last in a list of six is a very different outcome from being the first one named.",
  },
  {
    question: "How do I tell a coverage problem from a ranking problem?",
    answer:
      "A coverage problem is a prompt where you are not named at all. A ranking problem is a prompt where you are named, but later than a competitor. The per-prompt, per-model record shows you which one you are looking at, rather than folding both into a single score.",
  },
  {
    question: "How do I decide which prompts matter most?",
    answer:
      "Start with the intents closest to a purchase decision. Pricing and Comparison prompts tend to sit later in the buying process, so a gap there is usually more costly than a gap at Discovery, even if the Discovery gap is larger in raw prompt count.",
  },
];

export default function PromptIntelligence() {
  useSEO({
    title: "Prompt Intelligence: Track the AI Prompts About You",
    description:
      "Track AI prompts built around five buying intents and see whether your brand appears. Coverage across ChatGPT, Google AI Search, and Perplexity.",
    canonical: PAGE_URL,
    ogTitle: "Prompt Intelligence: Track AI Prompts by Buying Intent",
    ogDescription:
      "See whether your brand appears across five buying intents on ChatGPT, Google AI Search, and Perplexity, with evidence traced back to the actual answer.",
    ogUrl: PAGE_URL,
    schemaId: "prompt-intelligence-schema",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Prompt Intelligence: Track the AI Prompts About Your Brand",
      "url": PAGE_URL,
      "description":
        "Track AI prompts built around five buying intents and see whether your brand appears. Coverage across ChatGPT, Google AI Search, and Perplexity.",
      "isPartOf": { "@type": "WebSite", "name": "GeoRankers", "url": "https://georankers.ai" },
      "about": { "@type": "SoftwareApplication", "name": "GeoRankers", "url": "https://georankers.ai" },
    },
  });

  useBreadcrumbSchema("prompt-intelligence-breadcrumb-schema", [
    ...FEATURES_CRUMBS,
    { name: "Prompt Intelligence", item: PAGE_URL },
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
              Track Your Brand Across
              <br />
              <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                Buyer-Intent AI Prompts
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              AI prompt tracking across five buying intents on ChatGPT, Google AI Search, and Perplexity. See
              where your brand appears, where it is missing, and how prominently it is named.
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
                <p className="text-xs font-black uppercase tracking-widest text-pink-500 mb-3">How It Works</p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-slate-900 mb-4">
                  One Keyword, Five Buying Intents, Every Model
                </h2>
                <p className="text-base text-slate-500 leading-relaxed">
                  A seed keyword expands into a set of buyer prompts spread across five intents. Each prompt
                  runs on every tracked model, and each answer is recorded as named first, named later, or not
                  named at all.
                </p>
              </div>

              <div className="lg:col-span-7">
                <Card className="glass rounded-[2rem] border-0">
                  <CardContent className="p-4 sm:p-5">
                    {/* The labeled model row: kept prominent since it is the clearest signal
                        that every prompt below runs on all three, not just one. */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 pb-3 border-b border-slate-200/70">
                      {MODELS.map((model) => (
                        <span key={model.name} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                          {model.icon}
                          {model.name}
                        </span>
                      ))}
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-widest text-pink-500 mb-1.5">
                      Stage 1 &middot; Prompt-level tracking
                    </p>
                    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden mb-3">
                      {DIAGRAM_PROMPTS.map((row, i) => (
                        <div
                          key={row.prompt}
                          className={`grid grid-cols-[1fr,repeat(3,24px)] gap-1.5 items-center px-3 py-2 ${i > 0 ? "border-t border-slate-100" : ""}`}
                        >
                          <div className="min-w-0">
                            <p className="text-[11px] text-slate-700 leading-snug">{row.prompt}</p>
                            {row.priority && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded mt-1">
                                <Flame className="w-2.5 h-2.5" />
                                Highest Priority
                              </span>
                            )}
                          </div>
                          {row.results.map((named, i2) => (
                            <span key={i2} className="flex justify-center">
                              {named ? (
                                <Check className="w-3.5 h-3.5 text-green-500" />
                              ) : (
                                <X className="w-3.5 h-3.5 text-red-400" />
                              )}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-widest text-pink-500 mb-1.5">
                      Stage 2 &middot; Rolled up by buyer intent
                    </p>
                    <div className="space-y-2">
                      {DIAGRAM_INTENT_PRESENCE.map((row) => (
                        <div key={row.intent}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-800">{row.intent}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-semibold text-slate-500">{row.pct}%</span>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${row.strengthClass}`}>
                                {row.strength}
                              </span>
                            </div>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-200/70 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-pink-500 to-red-500"
                              style={{ width: `${row.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Feature sections */}
        <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">

            {/* 1. Five intents: text left, visual right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">See Where Your Brand Appears Across Five Buying Intents</h2>
                        <p className="text-base font-medium text-slate-500">Spot visibility gaps across discovery, trust, pricing, use case, and comparison prompts.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      Prompts are spread across Discovery, Trust, Pricing, Use Case, and Comparison, so you can
                      see exactly which of these categories your brand is weakest in.
                    </p>
                    <div className="bg-pink-50 border border-pink-100 rounded-xl p-4 mb-6">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-bold text-pink-700">Why all five: </span>
                        A prompt set is not accepted unless every intent is covered, because winning Discovery
                        does not guarantee visibility in Trust, Pricing, Use Case, or Comparison as well.
                      </p>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What you get:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Coverage tracked separately for each of the five intents</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Results broken down by intent, not blended into one number</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Your visibility across all five intents at a glance</span>
                      </li>
                    </ul>
                  </div>

                  {/* Visual: per-intent coverage strip */}
                  <div className="glass-strong rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MessageSquare className="w-4 h-4 text-pink-600" />
                      <h3 className="font-bold text-slate-900">Intent Coverage</h3>
                    </div>
                    <div className="space-y-3.5">
                      {COVERAGE.map((row) => (
                        <div key={row.intent}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-slate-700">{row.intent}</span>
                            <span className="text-[11px] text-slate-500">Named in {row.named} of {row.tracked}</span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-200/70 overflow-hidden flex">
                            <div
                              className="h-full bg-gradient-to-r from-pink-500 to-red-500"
                              style={{ width: `${(row.named / row.tracked) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Keyword to buyer questions: visual left, text right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    {/* Visual: keyword expanding into editable prompt cards */}
                    <div className="glass-strong rounded-2xl p-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Seed keyword</p>
                      <div className="rounded-lg border border-slate-200 bg-white/70 px-3 py-2 text-sm font-bold text-slate-900 mb-4">
                        "AI brand visibility"
                      </div>
                      <div className="space-y-2 mb-3">
                        {INTENTS.slice(0, 3).map((intent) => (
                          <div key={intent.name} className="p-3 bg-white/70 rounded-lg border border-slate-200/50">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-600">{intent.name}</span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">"{intent.example}"</p>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-lg border border-dashed border-slate-300 px-3 py-2.5 text-center">
                        <span className="text-xs font-semibold text-slate-400">+ Add your own prompt</span>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <Search className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Turn Your Keywords Into Buyer-Intent Prompts</h2>
                        <p className="text-base font-medium text-slate-500">Longer and more conversational than a search query.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      A seed keyword becomes a set of longer, conversational prompts in the style someone would
                      type into an assistant, generated from your keyword and product context.
                    </p>
                    <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-bold text-red-700">Kept neutral: </span>
                        Your own brand name is left out of generated prompts, so results reflect what an
                        unprompted buyer would see.
                      </p>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What you get:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Prompts generated from your keyword and product context</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Your brand kept out of the prompt so results are not self-fulfilling</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Add or edit prompts yourself, with intent classified automatically</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Evidence grid: text left, visual right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <ShieldCheck className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Evidence, Not Just a Number</h2>
                        <p className="text-base font-medium text-slate-500">See the AI response behind every prompt result.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      Every prompt keeps a per-model record of whether you appeared and where, and you can open
                      the answer it came from.
                    </p>
                    <div className="bg-violet-50 border border-violet-100 rounded-xl p-4 mb-6">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-bold text-violet-700">Nothing rolled up: </span>
                        Every result traces to a specific answer from a specific model, so nothing rests on a
                        single blended score.
                      </p>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What you get:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">A prompt-by-model grid of every tracked result</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">The brands named ahead of you on each prompt</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">The underlying answer, open for review on request</span>
                      </li>
                    </ul>
                  </div>

                  {/* Visual: prompt-by-model evidence grid */}
                  <div className="glass-strong rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <ShieldCheck className="w-4 h-4 text-violet-600" />
                      <h3 className="font-bold text-slate-900">Prompt-by-Model Results</h3>
                    </div>
                    <div className="space-y-3">
                      {EVIDENCE.map((row) => (
                        <div key={row.prompt} className="p-3 bg-white/70 rounded-lg border border-slate-200/50">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <p className="text-xs font-medium text-slate-800 leading-snug">"{row.prompt}"</p>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 flex-shrink-0">
                              {row.intent}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {MODELS.map((model, i) => {
                              const style = RESULT_STYLE[row.results[i]];
                              return (
                                <span key={model.name} className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${style.className}`}>
                                  {model.icon}
                                  {style.label}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* At A Glance table */}
        <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50/30 to-red-50/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-slate-900 text-center mb-8">
              The Five Intents at a Glance
            </h2>

            {/* Desktop / tablet table */}
            <Card className="hidden sm:block glass rounded-[2rem] border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-4 bg-slate-900/90 text-white text-sm font-black uppercase tracking-wide">
                  <div className="px-5 py-4">Intent</div>
                  <div className="px-5 py-4">What a buyer is asking</div>
                  <div className="px-5 py-4">What it signals</div>
                  <div className="px-5 py-4">What we measure</div>
                </div>
                {AT_A_GLANCE.map((row, i) => (
                  <div
                    key={row.intent}
                    className={`grid grid-cols-4 text-sm sm:text-[15px] leading-relaxed ${i % 2 === 0 ? "bg-white/70" : "bg-white/40"}`}
                  >
                    <div className="px-5 py-4 font-bold text-slate-900">{row.intent}</div>
                    <div className="px-5 py-4 text-slate-600">{row.asking}</div>
                    <div className="px-5 py-4 text-slate-600">{row.signals}</div>
                    <div className="px-5 py-4 text-slate-600">{row.measures}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Mobile: stacked cards instead of horizontal scroll */}
            <div className="sm:hidden space-y-4">
              {AT_A_GLANCE.map((row) => (
                <Card key={row.intent} className="glass rounded-2xl border-0">
                  <CardContent className="p-5">
                    <h3 className="text-base font-bold text-slate-900 mb-3">{row.intent}</h3>
                    <dl className="space-y-2.5 text-sm">
                      <div>
                        <dt className="text-xs font-black uppercase tracking-widest text-slate-400">What a buyer is asking</dt>
                        <dd className="text-slate-600">{row.asking}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-black uppercase tracking-widest text-slate-400">What it signals</dt>
                        <dd className="text-slate-600">{row.signals}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-black uppercase tracking-widest text-slate-400">What we measure</dt>
                        <dd className="text-slate-600">{row.measures}</dd>
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
                Buyer-Intent Prompts
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white mb-5">
                Find the Buying-Intent Prompts Where Your Brand Is Missing
              </h2>
              <p className="text-lg font-medium text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
                Explore your visibility across five buying intents on ChatGPT, Google AI Search, and Perplexity,
                and see which questions need a closer look.
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
          schemaId="prompt-intelligence-faq-schema"
          footer={
            <>
              See how your brand stacks up against rivals on these same prompts with{" "}
              <Link href="/features/ai-competitor-benchmarking" className="text-blue-600 hover:text-blue-800 underline">
                AI Competitor Benchmarking
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
