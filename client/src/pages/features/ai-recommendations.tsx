import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useBreadcrumbSchema, FEATURES_CRUMBS } from "@/hooks/useBreadcrumbSchema";
import { Card, CardContent } from "@/components/ui/card";
import FAQSection, { type FAQ } from "@/components/FAQSection";
import { ArrowDown, Check, Gauge, MessageCircle, Rocket, ShieldCheck, Target, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PAGE_URL = "https://georankers.ai/features/ai-recommendations";

// The four stages in the How It Works diagram. Deliberately no per-model columns
// here: the whole point of this feature is that findings from all three models
// feed one combined plan, so showing three parallel tracks would contradict the
// page's own copy.
const LOOP_STAGES = [
  {
    label: "Gap Found",
    kind: "evidence" as const,
    detail: "Your Brand was not mentioned in verified answers to prompts about affordable visibility tools for startups.",
  },
  {
    label: "Scored",
    kind: "scores" as const,
    impact: 96,
    confidence: 100,
    effort: "Medium",
  },
  {
    label: "Action Assigned",
    kind: "action" as const,
    tag: "High Impact",
    tagClass: "bg-red-100 text-red-700",
    category: "Content Creation",
    detail: "Publish a landing page for the prompts where Competitor A is currently cited.",
  },
  {
    label: "Tracked in Signal Tracker",
    kind: "result" as const,
    status: "Cited",
    statusClass: "bg-green-100 text-green-700",
    detail: "The published URL was cited in a later run. Timing depends on when the model recrawls the page.",
  },
];

// Tag meanings map directly onto the scoring model: High Impact and Medium
// Impact are both driven by the impact score, Quick Win is driven by effort.
// Confidence is shown separately and is not folded into what a tag means, since
// the two dimensions can move independently.
const TAGS = [
  {
    tag: "High Impact",
    meaning: "A high impact score: a wide gap with real competitive pressure behind it",
    effort: "Medium to high",
    example: "Publish a comparison page for the topic competitors are winning",
    className: "bg-red-100 text-red-700",
  },
  {
    tag: "Quick Win",
    meaning: "Low effort, with an impact score high enough to be worth doing now",
    effort: "Low",
    example: "A focused post answering a specific buyer question you never come up for",
    className: "bg-amber-100 text-amber-700",
  },
  {
    tag: "Medium Impact",
    meaning: "A real gap that scores lower on impact than High Impact, or costs more effort than a Quick Win",
    effort: "Varies",
    example: "A supporting guide that deepens a topic you already partly cover",
    className: "bg-green-100 text-green-700",
  },
];

// Sample recommendation list shown in sub-section 2's visual, modeled on the
// dashboard's actual Strategic Recommendations list: a numbered row, a tag,
// a category and status pill, a one-line evidence summary, and the three
// scores shown inline. Includes both action types the engine can produce:
// publishing new content, and joining an existing discussion on a platform
// AI is already citing. The second type carries its own disclosure line,
// never presented as a silent placement.
const RECOMMENDATIONS = [
  {
    title: "Publish a landing page on affordable visibility tools for startups",
    tag: "High Impact",
    className: "bg-red-100 text-red-700",
    category: "Content Creation",
    evidence: "Your Brand was not listed in answers to prompts about affordable visibility tools for startups.",
    impact: 96,
    confidence: 100,
    effort: "Medium",
  },
  {
    title: "Answer a discussion thread AI already cites for this topic",
    tag: "Quick Win",
    className: "bg-amber-100 text-amber-700",
    category: "Community Response",
    evidence: "Guardrail: only where you can add real value, and you disclose the brand relationship.",
    impact: 61,
    confidence: 90,
    effort: "Low",
  },
  {
    title: "Publish a guide on trusted visibility tools with user reviews",
    tag: "Medium Impact",
    className: "bg-green-100 text-green-700",
    category: "Content Creation",
    evidence: "Your Brand was not cited in answers to prompts about trusted tools with credible reviews.",
    impact: 79,
    confidence: 100,
    effort: "High",
  },
];

// The execution checklist shown inside the sub-section 2 detail card. Every
// recommendation ships with one, not just a title and a score.
const CHECKLIST = [
  "Research which tools currently rank for this topic.",
  "Highlight what makes your brand different for this use case.",
  "Optimize the page for the exact prompts you are targeting.",
];

// Sub-section 3's visual, modeled on the dashboard's actual Success Definition
// and Signal Tracker panels. A recommendation's success test is not a vague
// "did it work" flag, it is a named metric with a threshold, tied to specific
// anchor prompts. No fixed measurement window is shown: whether and when a
// tracked URL gets cited depends on the model's own crawl timing, not a run
// count GeoRankers controls.
const SUCCESS_DEFINITION = [
  { label: "Metric", value: "Brand Mentions on Anchor Prompts" },
  { label: "Threshold", value: "Increase by at Least 1" },
  { label: "Anchor Prompts", value: "2 anchor prompts" },
  { label: "Tracked Via", value: "Signal Tracker" },
];

const FAQS: FAQ[] = [
  {
    question: "Are the recommendations specific to my account, or general advice?",
    answer:
      "Specific to your account. Every recommendation is generated from your own tracked prompts, your own gaps, and the competitors currently winning those prompts, not a generic checklist that applies to any brand in your category.",
  },
  {
    question: "What do impact and confidence actually measure?",
    answer:
      "Impact weighs how wide the gap is and how much competitive pressure sits behind it. Confidence reflects how solid the underlying evidence is, meaning how consistently the gap shows up across your tracked prompts and runs. The two are scored separately and shown together.",
  },
  {
    question: "What makes something a Quick Win instead of High Impact?",
    answer:
      "A Quick Win is a low-effort action that still scores well on impact, such as answering a specific question you are missing on a single prompt. High Impact actions usually take more work, such as publishing a new page, but close a wider gap across several prompts at once.",
  },
  {
    question: "Why is there one combined action plan instead of a plan per model?",
    answer:
      "Because a single fix, such as a comparison page, usually helps you across more than one model at once. Findings from ChatGPT, Google AI Search, and Perplexity all feed the same plan, so you are not juggling three separate to-do lists for what is often the same underlying gap.",
  },
  {
    question: "How is success actually checked?",
    answer:
      "Once you have acted on a recommendation, you can add the published URL for GeoRankers to track. Signal Tracker then monitors your future runs to see whether that URL gets cited in AI answers, so you can see the outcome instead of guessing.",
  },
  {
    question: "How many recommendations do I get at once?",
    answer:
      "There is no fixed limit. GeoRankers generates a recommendation whenever it identifies a real opportunity in your tracked results, so the number you see reflects how many opportunities currently exist, not a plan cap.",
  },
  {
    question: "Can I archive a recommendation I do not want to act on?",
    answer:
      "Yes. Archiving removes it from your active list, and GeoRankers fills that slot with a fresh recommendation once it identifies a new opportunity, so your list stays current rather than static.",
  },
  {
    question: "How long does it take for a change to show up in AI answers?",
    answer:
      "It depends entirely on when the underlying AI model recrawls and updates its own answers, which GeoRankers does not control and cannot predict. Some models refresh faster than others, so a change on your site may take anywhere from days to weeks to be reflected, if it is reflected at all.",
  },
  {
    question: "What happens when I mark an action complete?",
    answer:
      "You can add the published URL for GeoRankers to track. That URL appears in Signal Tracker, where GeoRankers checks whether it gets cited in your future runs, so you can see if the action gets picked up over time.",
  },
  {
    question: "What data are my recommendations based on?",
    answer:
      "Your tracked results from the last 30 days: which competitors are cited, which sources are cited, what type of content is winning, and which sources keep showing up again and again. GeoRankers builds each recommendation on these patterns.",
  },
];

export default function AiRecommendations() {
  useSEO({
    title: "AI Recommendations: Prioritized Visibility Actions",
    description:
      "AI visibility recommendations scored from your last 30 days of tracked runs. Prioritize by impact, confidence, and effort, then track what changes.",
    canonical: PAGE_URL,
    ogTitle: "AI Recommendations: A Scored, Prioritized Action Plan",
    ogDescription:
      "Every recommendation is scored for impact and confidence, tagged by effort, and tracked in Signal Tracker to see what changed.",
    ogUrl: PAGE_URL,
    schemaId: "ai-recommendations-schema",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "AI Recommendations: Prioritized, Scored Visibility Actions",
      "url": PAGE_URL,
      "description":
        "AI visibility recommendations scored from your last 30 days of tracked runs. Prioritize by impact, confidence, and effort, then track what changes.",
      "isPartOf": { "@type": "WebSite", "name": "GeoRankers", "url": "https://georankers.ai" },
      "about": { "@type": "SoftwareApplication", "name": "GeoRankers", "url": "https://georankers.ai" },
    },
  });

  useBreadcrumbSchema("ai-recommendations-breadcrumb-schema", [
    ...FEATURES_CRUMBS,
    { name: "AI Recommendations", item: PAGE_URL },
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
              Turn AI Visibility Gaps Into a
              <br />
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                Prioritized Action Plan
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              AI visibility recommendations built from your tracked runs over the last 30 days. Prioritize
              actions by impact, confidence, and effort, then track what changes after you act.
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
                <p className="text-xs font-black uppercase tracking-widest text-green-600 mb-3">How It Works</p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-slate-900 mb-4">
                  From Visibility Gaps to Actions You Can Track
                </h2>
                <p className="text-base text-slate-500 leading-relaxed">
                  A gap found in your results is scored for impact and confidence, turned into a specific
                  action with its own success definition, then tracked in Signal Tracker once you mark it
                  complete and add the published URL.
                </p>
              </div>

              <div className="lg:col-span-7">
                <Card className="glass rounded-[2rem] border-0">
                  <CardContent className="p-4 sm:p-5">
                    <p className="text-[10px] text-slate-400 italic mb-2">Illustrative example, not your account data.</p>
                    <div className="space-y-1.5">
                      {LOOP_STAGES.map((stage, i) => (
                        <div key={stage.label}>
                          <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">
                                {i + 1}
                              </span>
                              <p className="text-slate-900 font-black text-[11px] sm:text-xs uppercase tracking-wide">
                                {stage.label}
                              </p>
                            </div>

                            {stage.kind === "evidence" && (
                              <p className="text-[11px] text-slate-500 leading-snug pl-6">{stage.detail}</p>
                            )}

                            {stage.kind === "scores" && (
                              <div className="flex items-center gap-3 pl-6 text-[11px]">
                                <span className="text-slate-500">Impact <span className="font-bold text-slate-900">{stage.impact}</span></span>
                                <span className="text-slate-500">Confidence <span className="font-bold text-slate-900">{stage.confidence}</span></span>
                                <span className="text-slate-500">Effort <span className="font-bold text-slate-900">{stage.effort}</span></span>
                              </div>
                            )}

                            {stage.kind === "action" && (
                              <div className="pl-6">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${stage.tagClass}`}>{stage.tag}</span>
                                  <span className="text-[10px] text-slate-400">{stage.category}</span>
                                </div>
                                <p className="text-[11px] text-slate-600 leading-snug">{stage.detail}</p>
                              </div>
                            )}

                            {stage.kind === "result" && (
                              <div className="pl-6">
                                <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full mb-0.5 ${stage.statusClass}`}>{stage.status}</span>
                                <p className="text-[11px] text-slate-500 leading-snug">{stage.detail}</p>
                              </div>
                            )}
                          </div>
                          {i < LOOP_STAGES.length - 1 && (
                            <div className="flex justify-center py-0.5">
                              <ArrowDown className="w-3.5 h-3.5 text-green-500" strokeWidth={2.5} />
                            </div>
                          )}
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

            {/* 1. Built from your results: text left, visual right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Built From Your Results, Not a Checklist</h2>
                        <p className="text-base font-medium text-slate-500">Drawn from your tracked runs over the last 30 days.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      See the prompts, competitor mentions, and cited sources behind each suggested action,
                      not a generic best-practice list with no evidence attached.
                    </p>
                    <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-bold text-green-700">One plan, not three: </span>
                        Results from all three models feed one plan, because the same fix usually moves more
                        than one of them.
                      </p>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What you get:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Tied to the exact tracked prompts that triggered it</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Names the competitor pages already winning those prompts</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Create or improve content, or contribute to relevant discussions cited in your tracked AI answers</span>
                      </li>
                    </ul>
                  </div>

                  {/* Visual: modeled on the dashboard's actual Strategic Recommendations list */}
                  <div className="glass-strong rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-4 h-4 text-green-600" />
                      <h3 className="font-bold text-slate-900">Strategic Recommendations</h3>
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full ml-auto">{RECOMMENDATIONS.length}</span>
                    </div>
                    <div className="space-y-3">
                      {RECOMMENDATIONS.map((rec, i) => (
                        <div key={rec.title} className="p-3 bg-white/70 rounded-lg border border-slate-200/50">
                          <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                            <span className="text-[10px] text-slate-400 font-bold">{String(i + 1).padStart(2, "0")}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${rec.className}`}>
                              {rec.tag}
                            </span>
                            <span className="text-[10px] text-slate-400">{rec.category}</span>
                          </div>
                          <p className="text-xs font-medium text-slate-800 leading-snug mb-1">{rec.title}</p>
                          <p className="text-[10px] text-slate-500 leading-snug flex items-start gap-1">
                            {rec.tag === "Quick Win" && <MessageCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />}
                            {rec.evidence}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Scored: visual left, text right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    {/* Visual: modeled on the dashboard's actual recommendation detail view */}
                    <div className="glass-strong rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Gauge className="w-4 h-4 text-blue-600" />
                        <h3 className="font-bold text-slate-900">Recommendation Detail</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Impact score</span>
                            <span className="text-sm font-black text-slate-900">{RECOMMENDATIONS[0].impact}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-200/70 overflow-hidden">
                            <div className="h-full rounded-full bg-blue-500" style={{ width: `${RECOMMENDATIONS[0].impact}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confidence</span>
                            <span className="text-sm font-black text-slate-900">{RECOMMENDATIONS[0].confidence}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-200/70 overflow-hidden">
                            <div className="h-full rounded-full bg-violet-500" style={{ width: `${RECOMMENDATIONS[0].confidence}%` }} />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pb-3 mb-3 border-b border-slate-200/70">
                        <span>Effort <span className="font-bold text-slate-900">{RECOMMENDATIONS[0].effort}</span></span>
                        <span>Category <span className="font-bold text-slate-900">{RECOMMENDATIONS[0].category}</span></span>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Execution checklist</p>
                      <div className="space-y-1.5">
                        {CHECKLIST.map((step, i) => (
                          <div key={step} className="flex items-start gap-2 p-2 bg-white/70 rounded-lg border border-slate-200/50">
                            <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 text-[9px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span className="text-[11px] text-slate-600 leading-snug">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <Gauge className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Scored So You Know What To Do First</h2>
                        <p className="text-base font-medium text-slate-500">Prioritized by impact, confidence, and effort.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      Each recommendation carries an impact score, a confidence score, and an effort level,
                      which together sort it into High Impact, Quick Win, or Medium Impact.
                    </p>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-bold text-blue-700">Quick Win, defined: </span>
                        A low-effort action that still scores well on impact, not simply the easiest thing on
                        the list.
                      </p>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What you get:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Impact weighs gap width and competitive pressure</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Confidence reflects how solid the underlying evidence is</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Every recommendation ships with its own execution checklist</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Track success: text left, visual right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-green-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Track What Changes After You Take Action</h2>
                        <p className="text-base font-medium text-slate-500">Use Signal Tracker to monitor visibility against a defined success metric.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      Every recommendation ships with its own success definition: a metric, a threshold to
                      hit, and the anchor prompts it is tied to. Signal Tracker also lets you track a
                      published URL against it once the work is live.
                    </p>
                    <div className="bg-violet-50 border border-violet-100 rounded-xl p-4 mb-6">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-bold text-violet-700">Timing is not guaranteed: </span>
                        Whether and when a tracked URL gets cited depends on when the AI model recrawls it,
                        not on a fixed check-in schedule GeoRankers controls.
                      </p>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What you get:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Mark an action complete once the work is live</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Add a published URL to any completed recommendation for tracking</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">See when a signal was last picked up, and by which model</span>
                      </li>
                    </ul>
                  </div>

                  {/* Visual: modeled on the dashboard's actual Success Definition and Signal Tracker panels */}
                  <div className="glass-strong rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-violet-600" />
                      <h3 className="font-bold text-slate-900">Success Definition</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {SUCCESS_DEFINITION.map((row) => (
                        <div key={row.label} className="p-2.5 bg-white/70 rounded-lg border border-slate-200/50">
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{row.label}</p>
                          <p className="text-[11px] font-bold text-slate-900 leading-snug">{row.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-slate-200/70">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Signal tracker</p>
                      <div className="flex items-center gap-3 text-[10px] text-slate-500 mb-2">
                        <span>Signals tracked <span className="font-bold text-slate-900">1</span></span>
                        <span>Active <span className="font-bold text-slate-900">1</span></span>
                        <span>Seen in last 7 days <span className="font-bold text-slate-900">0</span></span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 bg-white/70 rounded-lg border border-slate-200/50">
                        <span className="text-[11px] text-slate-700 leading-snug">Landing page: affordable tools for startups</span>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 flex-shrink-0 ml-2">Tracking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* At A Glance table */}
        <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50/30 to-blue-50/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-slate-900 text-center mb-8">
              How Your Recommendations Are Prioritized
            </h2>

            {/* Desktop / tablet table */}
            <Card className="hidden sm:block glass rounded-[2rem] border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-4 bg-slate-900/90 text-white text-sm font-black uppercase tracking-wide">
                  <div className="px-5 py-4">Tag</div>
                  <div className="px-5 py-4">What it means</div>
                  <div className="px-5 py-4">Typical effort</div>
                  <div className="px-5 py-4">Example action</div>
                </div>
                {TAGS.map((row, i) => (
                  <div
                    key={row.tag}
                    className={`grid grid-cols-4 text-sm sm:text-[15px] leading-relaxed ${i % 2 === 0 ? "bg-white/70" : "bg-white/40"}`}
                  >
                    <div className="px-5 py-4 font-bold text-slate-900">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${row.className}`}>{row.tag}</span>
                    </div>
                    <div className="px-5 py-4 text-slate-600">{row.meaning}</div>
                    <div className="px-5 py-4 text-slate-600">{row.effort}</div>
                    <div className="px-5 py-4 text-slate-600">{row.example}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Mobile: stacked cards instead of horizontal scroll */}
            <div className="sm:hidden space-y-4">
              {TAGS.map((row) => (
                <Card key={row.tag} className="glass rounded-2xl border-0">
                  <CardContent className="p-5">
                    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-3 ${row.className}`}>{row.tag}</span>
                    <dl className="space-y-2.5 text-sm">
                      <div>
                        <dt className="text-xs font-black uppercase tracking-widest text-slate-400">What it means</dt>
                        <dd className="text-slate-600">{row.meaning}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-black uppercase tracking-widest text-slate-400">Typical effort</dt>
                        <dd className="text-slate-600">{row.effort}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-black uppercase tracking-widest text-slate-400">Example action</dt>
                        <dd className="text-slate-600">{row.example}</dd>
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
                A Ranked Starting Point
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white mb-5">
                Know What to Prioritize. Track What Changes.
              </h2>
              <p className="text-lg font-medium text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
                Turn your AI visibility gaps into a prioritized action plan, then monitor progress across
                your next runs.
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
          schemaId="ai-recommendations-faq-schema"
          footer={
            <>
              See how gaps are found in the first place with{" "}
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
