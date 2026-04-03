import { Link } from "wouter";
import { useEffect, useState } from "react";
import { Search, BookOpen, Settings, BarChart3, Target, Bot, RefreshCw, CreditCard, AlertCircle, ChevronDown, ChevronUp, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type QA = { q: string; a: string | React.ReactNode };

const sections: { id: string; icon: typeof BookOpen; color: string; title: string; items: QA[] }[] = [
  {
    id: "getting-started",
    icon: BookOpen,
    color: "bg-blue-50 text-blue-600",
    title: "Getting Started",
    items: [
      {
        q: "What is GeoRankers?",
        a: "GeoRankers measures how visible your brand is in AI-generated search results — across platforms like ChatGPT, Gemini, and Google AI Overviews. It shows you where you appear, where you don't, and what to do about it.",
      },
      {
        q: "Who is GeoRankers for?",
        a: "Marketing and growth teams at B2B companies who want to understand and improve how their brand shows up when buyers ask AI tools for product recommendations.",
      },
      {
        q: "Can I use a personal or educational email to sign up?",
        a: "No. GeoRankers is built for businesses. Educational email domains (.edu, .ac., etc.) are blocked at registration.",
      },
      {
        q: "What happens after I register?",
        a: "You'll receive a verification email. Click the link to verify your account, then log in. New users are taken directly to the analysis setup page.",
      },
      {
        q: "The verification link isn't working. What do I do?",
        a: "Verification links expire after a set time. If yours has expired, go back to the login page and try logging in — if your account exists, you'll be redirected to the verification screen where you can request a new link. If that doesn't work, contact support.",
      },
      {
        q: "I forgot my password. What do I do?",
        a: "Click \"Forgot Password\" on the login screen, enter your email, and you'll receive a reset link. Once you set a new password, you'll be redirected to login automatically.",
      },
    ],
  },
  {
    id: "first-analysis",
    icon: Settings,
    color: "bg-violet-50 text-violet-600",
    title: "Setting Up Your First Analysis",
    items: [
      {
        q: "What do I need to get started?",
        a: "Your brand's website URL, at least one competitor, and at least one keyword or search term you want to be found for.",
      },
      {
        q: "What happens when I enter my website?",
        a: "The system validates your domain in real time, then automatically infers your brand name, a short description, suggested competitors, and suggested keywords. You can edit any of these before proceeding.",
      },
      {
        q: "How many competitors and keywords can I add?",
        a: (
          <span>
            It depends on your plan:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Launch (Free):</strong> 5 competitors, 3 keywords</li>
              <li><strong>Grow:</strong> 10 competitors, 6 keywords</li>
              <li><strong>Enterprise / Agency:</strong> 10 competitors, 10 keywords</li>
            </ul>
          </span>
        ),
      },
      {
        q: "Can I add competitors that weren't suggested?",
        a: "Yes. Enter the competitor's name and website manually. Duplicate domains are blocked.",
      },
      {
        q: "How long does the analysis take?",
        a: "A few minutes. You'll see a progress screen as the system works through each stage — querying AI platforms, scoring responses, generating the narrative summary, and checking platform presence.",
      },
      {
        q: "What is the system actually doing during analysis?",
        a: "It sends multiple questions to each AI platform for each keyword, covering different buyer scenarios — how someone would discover you, compare you, evaluate pricing, and more. Every response is scored based on where your brand appears.",
      },
    ],
  },
  {
    id: "results",
    icon: BarChart3,
    color: "bg-pink-50 text-pink-600",
    title: "Understanding Your Results",
    items: [
      {
        q: "What is the AI Visibility Score?",
        a: "A combined score that measures how often and how prominently your brand appears across all AI responses tested. Each mention earns points based on position — appearing first scores higher than appearing third. Scores are added up across all prompts and keywords. There is no fixed ceiling; the maximum scales with how many keywords and prompts were tested.",
      },
      {
        q: "What is the Mention Score?",
        a: "The percentage of all AI responses that mentioned your brand at all. A 100% mention score means your brand appeared in every single response tested.",
      },
      {
        q: "What is the Visibility Tier (High / Medium / Low)?",
        a: "A classification based on how your brand compares to all other brands in your specific analysis. It is not an absolute benchmark — a High tier means you are outperforming the other brands in your dataset.",
      },
      {
        q: "Why does my score differ across AI platforms?",
        a: "Each AI platform has its own training data, sources, and ranking logic. You may appear consistently on Gemini but be absent from ChatGPT entirely. The LLM Visibility table in the Overview tab breaks this down per platform.",
      },
      {
        q: "What are T1, T2, and T3 mentions?",
        a: (
          <span>
            These describe where in the AI response your brand appeared:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>T1</strong> — position 1 (top of the response)</li>
              <li><strong>T2</strong> — positions 2 or 3</li>
              <li><strong>T3</strong> — position 4 or lower</li>
            </ul>
          </span>
        ),
      },
      {
        q: "What does the Executive Summary tab show?",
        a: "A narrative overview designed for sharing with stakeholders. It includes your AI Visibility Score, overall assessment, competitive positioning, strengths, weaknesses, and prioritized actions. No interactive elements — it is a read-and-share document.",
      },
      {
        q: "What is the Prompts tab for?",
        a: "It shows every query the system tested — the exact questions sent to each AI platform and which brands appeared in each response. You can see precisely which prompts your brand is present in and which ones it is missing from. Use the copy button to test any prompt directly in an AI tool.",
      },
      {
        q: "What does the Sources tab tell me?",
        a: "Which websites AI tools are drawing from when answering questions in your category. Sources are ranked by how frequently they were cited. This tells you exactly where to focus PR outreach, content partnerships, and link-building efforts.",
      },
      {
        q: "What is the AI Readiness Checker?",
        a: "An 11-point technical audit of your website that checks whether AI crawlers can access, read, and understand your content. It covers things like whether AI bots are blocked in your robots.txt (a file that tells crawlers what they can and can't access), whether your page content loads without JavaScript, whether structured schema markup is present, and more. Each check is pass or fail with an explanation of what to fix.",
      },
    ],
  },
  {
    id: "recommendations",
    icon: Target,
    color: "bg-cyan-50 text-cyan-600",
    title: "Recommendations & Signal Tracker",
    items: [
      {
        q: "What are Recommendations?",
        a: "A prioritized action list generated after reviewing all your scored data. Each recommendation includes a specific action, the insight behind it, expected impact, and effort level. You can filter by High Impact, Medium Impact, or Quick Wins.",
      },
      {
        q: "What is the Signal Tracker?",
        a: "A way to monitor specific goals across every future analysis you run. You define a condition you want to achieve — for example, \"my brand appears in Pricing-intent prompts\" or \"my brand ranks in the top 3 for Comparison queries\" — and the system automatically checks whether that condition is met each time a new analysis runs.",
      },
      {
        q: "What signal types can I track?",
        a: (
          <span>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Mention</strong> — brand appears in any position for a keyword category</li>
              <li><strong>Ranking</strong> — brand ranked in the top 3 for a given category</li>
              <li><strong>AI Visibility Score</strong> — overall score is greater than 0</li>
              <li><strong>LLM Presence</strong> — brand mentioned by a specific AI platform</li>
              <li><strong>Source Presence</strong> — brand cited from a specific source (Wikipedia, Reddit, LinkedIn, Medium, ProductHunt, GitHub)</li>
              <li><strong>Keyword Mention</strong> — brand mentioned for a specific keyword</li>
            </ul>
          </span>
        ),
      },
      {
        q: "How many signals can I track?",
        a: "5 active signals per account.",
      },
      {
        q: "What does muting a signal do?",
        a: "It temporarily pauses tracking without deleting the signal. Useful when you are actively working on an issue. Only analyses run after you unmute count toward the signal status.",
      },
    ],
  },
  {
    id: "geo-ai",
    icon: Bot,
    color: "bg-amber-50 text-amber-600",
    title: "Geo AI",
    items: [
      {
        q: "What can the Geo AI chatbot help me with?",
        a: "It can answer questions about your analysis in plain language — why you are missing from a specific platform, which recommendation to prioritize, how your score has changed over time, or how a competitor compares to you.",
      },
      {
        q: "How many conversations can I have per day?",
        a: (
          <span>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Launch (Free):</strong> 10 per day</li>
              <li><strong>Grow:</strong> 20 per day</li>
              <li><strong>Enterprise / Agency:</strong> 50 per day</li>
            </ul>
            <p className="mt-2">Limits reset on a rolling 24-hour basis, not at midnight.</p>
          </span>
        ),
      },
      {
        q: "Is the chatbot available on all plans?",
        a: "Yes, the AI chatbot is available on all plans including the free trial. The number of daily conversations varies by plan — Launch gets 10, Grow gets 20, and Enterprise/Agency gets 50 conversations per user per day. If your free trial has expired and you haven't upgraded yet, the chatbot will be temporarily disabled until you select a plan.",
      },
      {
        q: "When do my daily chatbot conversations reset?",
        a: "Conversations reset on a rolling 24-hour basis from the time of your first message — not at midnight. So if you use your last conversation at 3pm, your limit refreshes at 3pm the following day.",
      },
    ],
  },
  {
    id: "subsequent-analyses",
    icon: RefreshCw,
    color: "bg-green-50 text-green-600",
    title: "Running Subsequent Analyses",
    items: [
      {
        q: "How often can I run a new analysis?",
        a: (
          <span>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Launch (Free):</strong> Once every 48 hours</li>
              <li><strong>Grow:</strong> Once every 24 hours</li>
              <li><strong>Enterprise:</strong> Once every hour</li>
            </ul>
          </span>
        ),
      },
      {
        q: "Can I change my competitors or keywords between runs?",
        a: "Yes. When you return to the input page, your previous website is pre-filled. You can keep or modify competitors and keywords before running again.",
      },
      {
        q: "How many past analyses are stored?",
        a: (
          <span>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Launch (Free):</strong> 2 most recent runs</li>
              <li><strong>Grow:</strong> 5 most recent runs</li>
              <li><strong>Enterprise / Agency:</strong> 50 most recent runs</li>
            </ul>
            <p className="mt-2">Runs beyond your plan limit are not accessible. Trend and comparison features work across however many runs your plan stores.</p>
          </span>
        ),
      },
    ],
  },
  {
    id: "account-billing",
    icon: CreditCard,
    color: "bg-rose-50 text-rose-600",
    title: "Account, Billing & Team",
    items: [
      {
        q: "What plans are available?",
        a: (
          <div className="overflow-x-auto -mx-1 mt-1">
            <table className="min-w-full text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-50 text-slate-600">
                  <th className="text-left px-3 py-2 font-medium border-b border-slate-200">Feature</th>
                  <th className="text-left px-3 py-2 font-medium border-b border-slate-200">Launch</th>
                  <th className="text-left px-3 py-2 font-medium border-b border-slate-200">Grow</th>
                  <th className="text-left px-3 py-2 font-medium border-b border-slate-200">Enterprise</th>
                  <th className="text-left px-3 py-2 font-medium border-b border-slate-200">Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Keywords", "3", "6", "10", "10"],
                  ["Competitors", "5", "10", "10", "10"],
                  ["Team members", "1", "3", "50", "50"],
                  ["Analysis cooldown", "48 hours", "24 hours", "1 hour", "None"],
                  ["Chatbot conv./user/day", "10", "20", "50", "50"],
                  ["Analyses stored", "2", "5", "50", "50"],
                  ["Report export (PDF)", "No", "Yes", "Yes", "Yes"],
                  ["AI platforms", "ChatGPT only", "ChatGPT, Google AI Mode, Google AI Overview, Perplexity*", "ChatGPT, Google AI Mode, Google AI Overview, Perplexity*", "ChatGPT, Google AI Mode, Google AI Overview, Perplexity*"],
                ].map(([feature, ...vals]) => (
                  <tr key={feature} className="text-slate-600">
                    <td className="px-3 py-2 font-medium text-slate-700">{feature}</td>
                    {vals.map((v, i) => <td key={i} className="px-3 py-2">{v}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-slate-400 mt-1.5">* Perplexity coming soon</p>
          </div>
        ),
      },
      {
        q: "What happens when my free trial ends?",
        a: "Your 7-day free trial includes full access to all results and the AI chatbot. Once it expires, you'll be prompted to choose a plan to continue. Your data and all analysis runs are saved — nothing is lost. Upgrading restores access immediately.",
      },
      {
        q: "How do I invite team members?",
        a: (
          <span>
            Go to Team Members in your account settings. Enter their email and assign a role:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Admin</strong> — full access including billing and team management</li>
              <li><strong>Editor</strong> — can run analyses and edit settings, cannot manage billing or team</li>
              <li><strong>Viewer</strong> — read-only access to results and chatbot</li>
            </ul>
            <p className="mt-2">Invited members receive an email to set their name and password. They can log in immediately after accepting.</p>
          </span>
        ),
      },
      {
        q: "Can I export my results as a PDF?",
        a: "Yes, on Grow, Enterprise, and Agency plans. The export option is in the Analysis History tab in Settings. Not available on Launch/Free.",
      },
      {
        q: "Which AI platforms are included in my analysis?",
        a: (
          <span>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Launch Plan:</strong> ChatGPT only</li>
              <li><strong>Grow Plan:</strong> ChatGPT + Google AI Overviews + Google AI Mode</li>
              <li><strong>Enterprise / Agency:</strong> All four platforms (ChatGPT, Google AI Overviews, Google AI Mode, Perplexity*)</li>
            </ul>
            <p className="mt-2 text-slate-400 text-xs">* Perplexity coming soon</p>
            <p className="mt-1">You can toggle individual platforms on or off for future runs in the Company settings tab.</p>
          </span>
        ),
      },
    ],
  },
  {
    id: "troubleshooting",
    icon: AlertCircle,
    color: "bg-slate-100 text-slate-600",
    title: "Troubleshooting",
    items: [
      {
        q: "Verification email not received",
        a: "Check spam. If the link is expired, re-register or contact support.",
      },
      {
        q: "Can't add more competitors or keywords",
        a: "You have reached your plan limit. Upgrade to add more.",
      },
      {
        q: "Analysis won't start",
        a: "Check the error message on screen — it will tell you exactly when your next analysis can be started. Cooldown periods vary by plan; upgrading reduces or removes the wait.",
      },
      {
        q: "Chatbot not responding",
        a: "You may have hit your daily limit. It resets on a rolling 24-hour basis.",
      },
      {
        q: "Trend charts not showing",
        a: "You need at least 2 completed runs for trend data to appear.",
      },
      {
        q: "PDF export not available",
        a: "This feature requires a Grow plan or above.",
      },
      {
        q: "Invitation link not working",
        a: "The token may be invalid or expired. Ask your admin to resend the invitation.",
      },
    ],
  },
];

function AccordionItem({ q, a }: QA) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-4 text-left group"
      >
        <span className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">
          {q}
        </span>
        {open
          ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
          : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />}
      </button>
      {open && (
        <div className="pb-4 text-sm text-slate-600 leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

export default function Help() {
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.title = "Help & Documentation | GeoRankers";
    window.scrollTo({ top: 0, behavior: "smooth" });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const filtered = search.trim()
    ? sections.map((s) => ({
        ...s,
        items: s.items.filter(
          (item) =>
            item.q.toLowerCase().includes(search.toLowerCase()) ||
            (typeof item.a === "string" &&
              item.a.toLowerCase().includes(search.toLowerCase()))
        ),
      })).filter((s) => s.items.length > 0)
    : sections;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-violet-950 pt-28 sm:pt-32 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Help Center</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] text-white mb-4">
            How can we help?
          </h1>
          <p className="text-slate-400 text-lg mb-8">
            Everything you need to get the most out of GeoRankers.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm backdrop-blur-sm"
            />
          </div>
        </div>
      </div>


      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">

          {/* Sticky sidebar — desktop only */}
          {!search && (
            <aside className="hidden lg:block">
              <nav className="sticky top-24 space-y-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Sections</p>
                {sections.map(({ id, icon: Icon, title }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === id
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {title}
                  </a>
                ))}
              </nav>
            </aside>
          )}

          {/* Content */}
          <div className="space-y-12">
            {filtered.length === 0 && (
              <div className="text-center py-16 text-slate-400 text-sm">
                No results found for "<span className="font-medium text-slate-600">{search}</span>". Try a different keyword.
              </div>
            )}

            {filtered.map(({ id, icon: Icon, color, title, items }) => (
              <section key={id} id={id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${color} flex-shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                </div>
                <div className="border border-slate-200 rounded-2xl px-6 divide-y divide-slate-100 overflow-hidden">
                  {items.map((item, i) => (
                    <AccordionItem key={i} {...item} />
                  ))}
                </div>
              </section>
            ))}

            {/* Still need help */}
            {!search && (
              <div className="bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100 rounded-2xl p-8 text-center">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">Have a question not covered here?</h2>
                <p className="text-slate-500 text-sm mb-7 max-w-md mx-auto">
                  Our team is happy to help — from setup questions to strategy.
                </p>
                <a
                  href="mailto:support@georankers.co"
                  className="inline-flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact support@georankers.co
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
