import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useBreadcrumbSchema, FEATURES_CRUMBS } from "@/hooks/useBreadcrumbSchema";
import { Card, CardContent } from "@/components/ui/card";
import FAQSection, { type FAQ } from "@/components/FAQSection";
import { Bot, Check, MessageCircle, Rocket, Send, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PAGE_URL = "https://georankers.ai/features/geo-agent";

// The scripted back-and-forth the animated chat demo plays through, on a
// loop: a question in plain language, an answer grounded in the account's
// own tracked data, and a follow-up question that narrows further, since the
// agent is meant for back-and-forth rather than a single lookup.
const CHAT_SCRIPT = [
  { role: "user" as const, text: "Why is our visibility dropping on Google AI Search this week?" },
  { role: "agent" as const, text: "Your Google AI Search visibility dropped 12% because Competitor A published 3 new comparison pages. I recommend creating a detailed feature comparison and updating your integrations page." },
  { role: "user" as const, text: "What quick wins can I act on today?" },
  { role: "agent" as const, text: "3 quick wins found: add FAQ schema to your pricing page, update your G2 profile, and respond to 2 Reddit threads mentioning your category." },
];

// Animated stand-in for a real product recording: plays CHAT_SCRIPT one
// message at a time with a typing pause before each agent reply, then
// resets and loops. Built from markup rather than a captured GIF so it
// stays crisp at any size and never goes stale if the script changes.
function LiveChatDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const after = (ms: number, fn: () => void) => {
      const t = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timers.push(t);
    };

    function step(index: number) {
      // Plays through once on mount and stops with the full conversation
      // left on screen, rather than resetting and looping.
      if (index >= CHAT_SCRIPT.length) {
        return;
      }
      const isAgent = CHAT_SCRIPT[index].role === "agent";
      if (isAgent) {
        setTyping(true);
        after(1100, () => {
          setTyping(false);
          setVisibleCount(index + 1);
          after(1500, () => step(index + 1));
        });
      } else {
        after(700, () => {
          setVisibleCount(index + 1);
          after(900, () => step(index + 1));
        });
      }
    }

    step(0);
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="glass-strong rounded-2xl p-5 sm:p-6 max-w-sm mx-auto lg:mx-0">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-slate-900 text-sm leading-tight">GEO Agent</p>
          <p className="text-[10px] text-slate-400 leading-tight">Illustrative demo, not your account data</p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Online
        </span>
      </div>

      <div className="space-y-2.5 min-h-[210px] sm:min-h-[190px]">
        {CHAT_SCRIPT.slice(0, visibleCount).map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={
                m.role === "user"
                  ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xs sm:text-sm px-3.5 py-2 rounded-2xl rounded-br-sm max-w-[85%] leading-snug"
                  : "bg-white border border-slate-200/70 text-slate-700 text-xs sm:text-sm px-3.5 py-2 rounded-2xl rounded-bl-sm max-w-[85%] leading-snug"
              }
            >
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200/70 px-3.5 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// The three broad question types the agent handles, matching the actual
// examples shown in the chat preview: a diagnostic question about a change,
// an opportunity question about what to do next, and a strategy question
// about prioritization.
const QUESTION_TYPES = [
  {
    type: "Diagnostic",
    className: "bg-cyan-100 text-cyan-700",
    example: "Why is our visibility dropping on Google AI Search this week?",
    answers: "What changed, and which competitor or page is behind it",
  },
  {
    type: "Opportunity",
    className: "bg-blue-100 text-blue-700",
    example: "What quick wins can I act on today?",
    answers: "Specific, low-effort actions pulled from your current gaps",
  },
  {
    type: "Strategy",
    className: "bg-violet-100 text-violet-700",
    example: "Which content topic should we prioritize this month?",
    answers: "A prioritized direction based on your tracked competitive gaps",
  },
];

const FAQS: FAQ[] = [
  {
    question: "What data does GEO Agent actually use to answer?",
    answer:
      "Your own tracked account data: your visibility scores, competitor mentions, cited sources, and current recommendations. Answers are grounded in what GeoRankers has tracked for your brand, not generic advice.",
  },
  {
    question: "Can GEO Agent take actions for me, like publishing content?",
    answer:
      "No. It answers questions, surfaces gaps, and suggests ideas, but it does not publish content or make changes to your site or dashboard on its own.",
  },
  {
    question: "Is there a limit on how many questions I can ask?",
    answer:
      "Each plan includes a daily allowance of GEO Agent conversations per user: 10 per day on Launch, 20 per day on Grow, and a custom allowance on Enterprise. Extra conversations beyond your plan's allowance are billed at $0.01 per conversation.",
  },
  {
    question: "Does GEO Agent work the same on every plan?",
    answer:
      "The agent itself works the same way across plans. What differs is the daily conversation allowance and the amount of underlying tracked data available to draw on, since that scales with your plan's tracked prompts and competitors.",
  },
  {
    question: "Can I ask about a competitor instead of my own brand?",
    answer:
      "Yes. You can ask about any competitor you are tracking, including how they are performing on specific prompts or which sources are citing them.",
  },
  {
    question: "How is this different from Content Hub or Prioritized Recommendations?",
    answer:
      "Content Hub and Prioritized Recommendations generate structured outputs, like outlines or a scored action list, that live in the dashboard. GEO Agent is a conversational layer on top of the same underlying data, for when you want to ask a specific question instead of browsing a list.",
  },
];

export default function GeoAgent() {
  useSEO({
    title: "GEO Agent: AI Assistant for AI Visibility Data",
    description:
      "Ask GEO Agent questions about your AI visibility data in plain language. Get answers grounded in your tracked runs, competitor gaps, and current recommendations.",
    canonical: PAGE_URL,
    ogTitle: "GEO Agent: Ask Anything About Your AI Visibility",
    ogDescription:
      "An always-on AI assistant inside the GeoRankers dashboard, grounded in your own tracked visibility data.",
    ogUrl: PAGE_URL,
    schemaId: "geo-agent-schema",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "GEO Agent: AI Assistant for AI Visibility Data",
      "url": PAGE_URL,
      "description":
        "Ask GEO Agent questions about your AI visibility data in plain language. Get answers grounded in your tracked runs, competitor gaps, and current recommendations.",
      "isPartOf": { "@type": "WebSite", "name": "GeoRankers", "url": "https://georankers.ai" },
      "about": { "@type": "SoftwareApplication", "name": "GeoRankers", "url": "https://georankers.ai" },
    },
  });

  useBreadcrumbSchema("geo-agent-breadcrumb-schema", [
    ...FEATURES_CRUMBS,
    { name: "GEO Agent", item: PAGE_URL },
  ]);

  return (
    <div className="min-h-screen text-slate-900" style={{ overflowX: "clip" }}>
      <Navbar />
      <main id="main-content">

        {/* Hero */}
        <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-14 overflow-hidden">
          <div className="hero-gradient absolute inset-0 z-0"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm text-blue-600 font-semibold mb-4 uppercase tracking-widest">Features</p>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-5 leading-[1.1]">
              Ask Anything About Your
              <br />
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                AI Visibility
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Your always-on AI strategist inside the dashboard. Ask questions about your data, get instant
              optimization ideas, and uncover hidden insights, all through a simple chat interface.
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
              <div className="lg:col-span-7">
                <p className="text-xs font-black uppercase tracking-widest text-cyan-600 mb-3">How It Works</p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-slate-900 mb-4">
                  A Conversation, Not a Single Lookup
                </h2>
                <p className="text-base text-slate-500 leading-relaxed">
                  Ask a question in plain language and get an answer grounded in your tracked data. Follow
                  up to narrow the answer further, the same way you would with a colleague who has already
                  seen your results.
                </p>
              </div>

              <div className="lg:col-span-5">
                <LiveChatDemo />
              </div>
            </div>
          </div>
        </section>

        {/* Feature sections */}
        <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">

            {/* 1. Chat interface: text left, visual right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Ask in Plain Language</h2>
                        <p className="text-base font-medium text-slate-500">No filters or dashboards to learn first.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      Type a question the way you would ask a colleague, and GEO Agent pulls the answer
                      directly from your tracked visibility data instead of sending you to a report.
                    </p>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What you get:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Natural language queries on your visibility data</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Instant answers from your dashboard data</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Follow-up questions to narrow down an answer</span>
                      </li>
                    </ul>
                  </div>

                  <div className="glass-strong rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Bot className="w-5 h-5 text-cyan-500" />
                      <h4 className="font-bold text-slate-900">GeoRankers AI</h4>
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Online</span>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[85%]">
                          Why is our visibility dropping on Google AI Search this week?
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white/80 border border-slate-200/50 text-slate-700 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[85%]">
                          Your Google AI Search visibility dropped 12% due to Competitor A publishing 3 new comparison pages. I recommend creating a detailed feature comparison and updating your integrations page.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white/60 rounded-xl border border-slate-200/50">
                      <input type="text" placeholder="Ask about your AI visibility..." className="flex-1 bg-transparent text-sm text-slate-600 outline-none px-2" disabled />
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Send className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Opportunities on demand: visual left, text right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="glass-strong rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Target className="w-4 h-4 text-blue-600" />
                        <h4 className="font-bold text-slate-900">GeoRankers AI</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-end">
                          <div className="bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[85%]">
                            What quick wins can I act on today?
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-white/80 border border-slate-200/50 text-slate-700 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[85%]">
                            3 quick wins found: add FAQ schema to your pricing page, update your G2 profile, and respond to 2 Reddit threads mentioning your category.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Surface Gaps Without Browsing a List</h2>
                        <p className="text-base font-medium text-slate-500">Ask for what to do next, get a direct answer.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      Instead of opening the recommendations list yourself, ask GEO Agent what is worth doing
                      today and it pulls the relevant items from your current gaps and competitor activity.
                    </p>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What you get:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">AI-powered optimization recommendations</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Competitive gap analysis on demand</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Content strategy ideation and prioritization</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* At A Glance table */}
        <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cyan-50/30 to-blue-50/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-slate-900 text-center mb-8">
              The Kinds of Questions GEO Agent Answers
            </h2>

            {/* Desktop / tablet table */}
            <Card className="hidden sm:block glass rounded-[2rem] border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-3 bg-slate-900/90 text-white text-sm font-black uppercase tracking-wide">
                  <div className="px-5 py-4">Type</div>
                  <div className="px-5 py-4">Example question</div>
                  <div className="px-5 py-4">What it answers</div>
                </div>
                {QUESTION_TYPES.map((row, i) => (
                  <div
                    key={row.type}
                    className={`grid grid-cols-3 text-sm sm:text-[15px] leading-relaxed ${i % 2 === 0 ? "bg-white/70" : "bg-white/40"}`}
                  >
                    <div className="px-5 py-4 font-bold text-slate-900">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${row.className}`}>{row.type}</span>
                    </div>
                    <div className="px-5 py-4 text-slate-600">{row.example}</div>
                    <div className="px-5 py-4 text-slate-600">{row.answers}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Mobile: stacked cards instead of horizontal scroll */}
            <div className="sm:hidden space-y-4">
              {QUESTION_TYPES.map((row) => (
                <Card key={row.type} className="glass rounded-2xl border-0">
                  <CardContent className="p-5">
                    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-3 ${row.className}`}>{row.type}</span>
                    <dl className="space-y-2.5 text-sm">
                      <div>
                        <dt className="text-xs font-black uppercase tracking-widest text-slate-400">Example question</dt>
                        <dd className="text-slate-600">{row.example}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-black uppercase tracking-widest text-slate-400">What it answers</dt>
                        <dd className="text-slate-600">{row.answers}</dd>
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
            <div className="rounded-[2.5rem] p-10 sm:p-14 text-center shadow-2xl" style={{ background: 'linear-gradient(135deg, #06B6D4, #2994FF, #7575FF)' }}>
              <p className="text-xs font-black uppercase tracking-widest text-white/70 mb-4">
                Your Data, In Plain Language
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white mb-5">
                Stop Digging Through Reports. Just Ask.
              </h2>
              <p className="text-lg font-medium text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
                GEO Agent answers questions about your AI visibility data directly, grounded in your own
                tracked results.
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
          schemaId="geo-agent-faq-schema"
          footer={
            <>
              See the recommendations GEO Agent draws on in{" "}
              <Link href="/features/ai-recommendations" className="text-blue-600 hover:text-blue-800 underline">
                Prioritized Recommendations & Signal Tracking
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
