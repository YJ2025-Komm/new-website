import { Link } from "wouter";
import { useEffect, useState } from "react";
import { Search, BookOpen, BarChart3, Target, Users, CreditCard, Settings, ArrowRight, Mail, MessageSquare, ChevronRight } from "lucide-react";

const categories = [
  {
    icon: BookOpen,
    color: "bg-blue-50 text-blue-600",
    title: "Getting Started",
    description: "Set up your account, connect your brand, and run your first AI visibility scan.",
    articles: ["Creating your GeoRankers account", "Adding your brand and competitors", "Running your first AI visibility scan", "Understanding your dashboard overview"],
  },
  {
    icon: BarChart3,
    color: "bg-violet-50 text-violet-600",
    title: "AI Visibility Score",
    description: "Learn how your visibility score is calculated and what moves the needle.",
    articles: ["How the AI Visibility Score is calculated", "What counts as a brand mention", "Score benchmarks by industry", "Tracking score changes over time"],
  },
  {
    icon: Target,
    color: "bg-pink-50 text-pink-600",
    title: "Prompt Tracking",
    description: "Add prompts, understand coverage, and decode which queries surface your brand.",
    articles: ["Adding seed prompts to your account", "How GeoRankers generates tracked prompts", "Understanding prompt-level visibility", "Best prompts for B2B SaaS brands"],
  },
  {
    icon: Users,
    color: "bg-cyan-50 text-cyan-600",
    title: "Competitor Analysis",
    description: "Benchmark your brand against competitors across all tracked AI platforms.",
    articles: ["Adding competitors to track", "Reading the competitor comparison view", "Understanding share of voice in AI", "Setting up competitor alerts"],
  },
  {
    icon: CreditCard,
    color: "bg-green-50 text-green-600",
    title: "Billing & Plans",
    description: "Manage your subscription, upgrade your plan, and understand your invoices.",
    articles: ["Upgrading or downgrading your plan", "Understanding your invoice", "Cancelling your subscription", "Switching between monthly and quarterly billing"],
  },
  {
    icon: Settings,
    color: "bg-amber-50 text-amber-600",
    title: "Account & Settings",
    description: "Manage team seats, notifications, integrations, and your account profile.",
    articles: ["Inviting team members", "Setting up email notifications", "Exporting your data", "Deleting your account"],
  },
];

const popularArticles = [
  { category: "Getting Started", title: "Creating your GeoRankers account" },
  { category: "AI Visibility Score", title: "How the AI Visibility Score is calculated" },
  { category: "Prompt Tracking", title: "Adding seed prompts to your account" },
  { category: "Competitor Analysis", title: "Adding competitors to track" },
  { category: "Billing & Plans", title: "Upgrading or downgrading your plan" },
  { category: "Getting Started", title: "Running your first AI visibility scan" },
];

export default function Help() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Help & Documentation | GeoRankers";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Top nav */}
      <header className="border-b border-slate-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            GeoRankers
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-800 transition-colors hidden sm:block">← Back to home</Link>
            <a href="mailto:hello@georankers.co" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">Contact Support</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-violet-950 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Help Center</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            How can we help?
          </h1>
          <p className="text-slate-400 text-lg mb-8">
            Everything you need to get the most out of GeoRankers.
          </p>
          {/* Search */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">

        {/* Category grid */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-slate-900 mb-8">Browse by topic</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="group border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${cat.color} mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{cat.description}</p>
                  <ul className="space-y-1.5">
                    {cat.articles.slice(0, 3).map((article) => (
                      <li key={article} className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-slate-500 leading-snug">{article}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular articles */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Popular articles</h2>
          <div className="border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden">
            {popularArticles.map((article) => (
              <div
                key={article.title}
                className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {article.category}
                  </span>
                  <span className="text-sm text-slate-700 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors flex-shrink-0 ml-4" />
              </div>
            ))}
          </div>
        </div>

        {/* Still need help */}
        <div className="bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100 rounded-2xl p-8 sm:p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Still need help?</h2>
          <p className="text-slate-500 text-sm mb-7 max-w-md mx-auto">
            Our team is happy to walk you through anything — from setup to strategy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@georankers.co"
              className="inline-flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Support
            </a>
            <a
              href="https://calendly.com/hello-georankers/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 border border-slate-300 hover:border-blue-400 text-slate-700 hover:text-blue-600 rounded-xl text-sm font-medium transition-colors"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Book a Call
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} GeoRankers. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
