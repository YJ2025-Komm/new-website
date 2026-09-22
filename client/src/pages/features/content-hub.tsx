import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useBreadcrumbSchema, FEATURES_CRUMBS } from "@/hooks/useBreadcrumbSchema";
import { Card, CardContent } from "@/components/ui/card";
import FAQSection, { type FAQ } from "@/components/FAQSection";
import { ArrowDown, Check, FileSearch, FileText, ListChecks, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PAGE_URL = "https://georankers.ai/features/content-hub";

// The four stages in the How It Works diagram, modeled on the actual flow: a
// gap becomes an outline, the outline becomes a published or updated page,
// and that page is analyzed again once it exists, closing the loop back to
// visibility data rather than treating content work as a one-off task.
// Every stage shares one shape (label, optional tag, detail) so the boxes
// render at a consistent height regardless of which stage it is — an
// earlier version put the tag on its own row only for some stages, which
// threw off the vertical rhythm of the whole diagram.
const LOOP_STAGES = [
  {
    label: "Answers Analyzed",
    detail: "GeoRankers analyzes your last 30 days of tracked AI answers to identify content opportunities.",
  },
  {
    label: "Opportunity Found",
    tag: "Content Gap",
    tagClass: "bg-red-100 text-red-700",
    detail: "No tracked page currently covers \"affordable AI visibility tools for startups.\"",
  },
  {
    label: "Outline or Analysis",
    tag: "Your Choice",
    tagClass: "bg-blue-100 text-blue-700",
    detail: "Generate a content outline for the gap, or get a content score and optimization recommendations for an existing page.",
  },
  {
    label: "Published or Updated",
    tag: "Content Creation",
    tagClass: "bg-orange-100 text-orange-700",
    detail: "You publish the new page, or update an existing one using the outline or recommendations.",
  },
  {
    label: "Tracked in Signal Tracker",
    tag: "Tracking",
    tagClass: "bg-slate-100 text-slate-600",
    detail: "Add the published URL to Signal Tracker to see if it gets cited in future AI answers.",
  },
];

// The three statuses shown on any tracked page, matching the actual Content
// Opportunities panel: a gap with no page at all, a page that exists but is
// weak for AI citation, and a page that is already performing well.
const STATUSES = [
  {
    tag: "Content Gap",
    className: "bg-red-100 text-red-700",
    meaning: "No tracked page currently covers this topic at all",
    example: "\"Best AI visibility tools for SaaS\" has no matching page",
  },
  {
    tag: "Needs Optimization",
    className: "bg-yellow-100 text-yellow-700",
    meaning: "A page exists but is weak, incomplete, or hard for AI engines to use",
    example: "Pricing page is missing a structured FAQ for AI citation",
  },
  {
    tag: "Strong",
    className: "bg-green-100 text-green-700",
    meaning: "The page is already well cited across tracked AI models",
    example: "Integrations guide is well cited across ChatGPT and Perplexity",
  },
];

const FAQS: FAQ[] = [
  {
    question: "How does Content Hub decide what content to recommend?",
    answer:
      "It uses your tracked AI visibility data: prompts your brand is not named in, topics competitors currently win, and content types already succeeding in AI answers. Recommendations are tied to real gaps in your tracked results, not a generic content checklist.",
  },
  {
    question: "What does a content outline actually include?",
    answer:
      "A detailed outline built from the specific gap and the competitor pages currently winning it, so you know what the page needs to cover and why, before you start writing.",
  },
  {
    question: "Does Content Hub write the content for me?",
    answer:
      "No. It identifies opportunities and generates outlines, but you or your team write and publish the actual content. You can run Content Hub's analysis on that page any time to check it for AI-search suitability, and add it to Signal Tracker to see whether it gets cited.",
  },
  {
    question: "What does it check when it analyzes existing content?",
    answer:
      "Whether the page is weak, incomplete, or difficult for AI engines to use, and it returns specific optimization recommendations rather than a generic score.",
  },
  {
    question: "What content formats does it cover?",
    answer:
      "Blogs, guides, webpages, and other on-site content formats. If a tracked prompt has no matching page in any of these formats, Content Hub flags it as a content gap.",
  },
  {
    question: "How is a Content Gap different from a page that Needs Optimization?",
    answer:
      "A Content Gap means no tracked page covers the topic at all. Needs Optimization means a page exists but is weak, incomplete, or hard for AI engines to use, so it is unlikely to be cited even though it is live.",
  },
  {
    question: "Does Content Hub tell me when a page becomes Strong?",
    answer:
      "Content Hub does not re-scan your content automatically. To see whether a published or updated page gets cited, add its URL to Signal Tracker, which checks your future tracked runs and reports back once it picks up a citation.",
  },
  {
    question: "How is this different from Prioritized Recommendations?",
    answer:
      "Prioritized Recommendations scores and ranks actions across your whole account, including content and non-content actions. Content Hub is focused specifically on content: finding gaps, generating outlines, and analyzing existing pages for AI-search suitability.",
  },
];

export default function ContentHub() {
  useSEO({
    title: "Content Hub: AI-Search Content Gaps & Outlines",
    description:
      "Identify AI-search content gaps across blogs, guides, and webpages, generate outlines from competitor gaps, and analyze existing content for AI-search suitability.",
    canonical: PAGE_URL,
    ogTitle: "Content Hub: Turn AI Visibility Gaps Into Better Content",
    ogDescription:
      "Find content gaps, generate outlines, and get specific optimization recommendations to improve AI-search visibility.",
    ogUrl: PAGE_URL,
    schemaId: "content-hub-schema",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Content Hub: AI-Search Content Gaps, Outlines & Optimization",
      "url": PAGE_URL,
      "description":
        "Identify AI-search content gaps across blogs, guides, and webpages, generate outlines from competitor gaps, and analyze existing content for AI-search suitability.",
      "isPartOf": { "@type": "WebSite", "name": "GeoRankers", "url": "https://georankers.ai" },
      "about": { "@type": "SoftwareApplication", "name": "GeoRankers", "url": "https://georankers.ai" },
    },
  });

  useBreadcrumbSchema("content-hub-breadcrumb-schema", [
    ...FEATURES_CRUMBS,
    { name: "Content Hub", item: PAGE_URL },
  ]);

  return (
    <div className="min-h-screen text-slate-900" style={{ overflowX: "clip" }}>
      <Navbar />
      <main id="main-content">

        {/* Hero */}
        <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-14 overflow-hidden">
          <div className="hero-gradient absolute inset-0 z-0"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-orange-400/20 to-red-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm text-blue-600 font-semibold mb-4 uppercase tracking-widest">Features</p>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-5 leading-[1.1]">
              Turn AI Visibility Gaps Into
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Better Content
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Use your AI-search data to find what content to create next and improve what you already
              have. Content Hub connects visibility gaps to content opportunities, then helps you optimize
              existing pages for stronger AI-search relevance.
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
                <p className="text-xs font-black uppercase tracking-widest text-orange-600 mb-3">How It Works</p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-slate-900 mb-4">
                  From Visibility Gaps to Published Content
                </h2>
                <p className="text-base text-slate-500 leading-relaxed">
                  A content gap is turned into a detailed outline built from the competitor pages already
                  winning it. Once you publish or update the page, add the URL to Signal Tracker to see
                  whether it gets cited in future AI answers.
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
                              <span className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">
                                {i + 1}
                              </span>
                              <p className="text-slate-900 font-black text-[11px] sm:text-xs uppercase tracking-wide flex-1">
                                {stage.label}
                              </p>
                              {stage.tag && (
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${stage.tagClass}`}>{stage.tag}</span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 leading-snug pl-6">{stage.detail}</p>
                          </div>
                          {i < LOOP_STAGES.length - 1 && (
                            <div className="flex justify-center py-0.5">
                              <ArrowDown className="w-3.5 h-3.5 text-orange-500" strokeWidth={2.5} />
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

            {/* 1. Content opportunities: text left, visual right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">See Every Content Opportunity in One Place</h2>
                        <p className="text-base font-medium text-slate-500">Across blogs, guides, webpages, and other formats.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      Content Hub connects your tracked visibility data to the actual pages on your site, so
                      you can see which topics have no coverage at all, and which pages exist but are not
                      pulling their weight.
                    </p>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What you get:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Content opportunities across blogs, guides, webpages, and other formats</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Each gap tied to the tracked prompts and competitor pages behind it</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">A running count of new opportunities identified each month</span>
                      </li>
                    </ul>
                  </div>

                  <div className="glass-strong rounded-2xl p-6">
                    <h3 className="font-bold mb-4 text-slate-900">Content Opportunities</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-white/60 rounded-lg border border-slate-200/50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-800">"Best AI visibility tools for SaaS"</span>
                          <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full whitespace-nowrap">Content Gap</span>
                        </div>
                        <span className="text-xs text-slate-500">No page currently covers this topic</span>
                      </div>
                      <div className="p-3 bg-white/60 rounded-lg border border-slate-200/50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-800">Pricing Page</span>
                          <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full whitespace-nowrap">Needs Optimization</span>
                        </div>
                        <span className="text-xs text-slate-500">Missing structured FAQ for AI citation</span>
                      </div>
                      <div className="p-3 bg-white/60 rounded-lg border border-slate-200/50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-800">Integrations Guide</span>
                          <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full whitespace-nowrap">Strong</span>
                        </div>
                        <span className="text-xs text-slate-500">Well cited across ChatGPT and Perplexity</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200/50 flex items-center">
                      <ListChecks className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
                      <span className="text-xs text-orange-700">12 content opportunities identified this month</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Outlines: visual left, text right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="glass-strong rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <ListChecks className="w-4 h-4 text-red-600" />
                        <h3 className="font-bold text-slate-900">Generated Outline</h3>
                      </div>
                      <p className="text-xs font-medium text-slate-800 mb-3">Affordable AI Visibility Tools for Startups</p>
                      <div className="space-y-1.5">
                        {[
                          "Why AI visibility matters for early-stage budgets",
                          "What to look for in an affordable tool",
                          "How pricing compares across the category",
                          "A section addressing the gap competitor pages leave open",
                        ].map((step, i) => (
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
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Outlines Built From the Actual Gap</h2>
                        <p className="text-base font-medium text-slate-500">Not a generic content brief template.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      Each outline is generated from the specific visibility gap and the competitor pages
                      already winning that topic, so you know what the page needs to cover before you start
                      writing.
                    </p>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What you get:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Detailed content outlines based on visibility and competitive gaps</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Sections built around what competitor pages are missing</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">A starting point for your writers, not a finished draft</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Content analysis: text left, visual right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-orange-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <FileSearch className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Find Out Why a Page Is Not Getting Cited</h2>
                        <p className="text-base font-medium text-slate-500">Analysis of your existing content for AI-search suitability.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      A page can be live and still be invisible to AI engines. Content Hub analyzes existing
                      pages to see where they are weak, incomplete, or difficult for AI engines to use, and
                      returns specific recommendations instead of a generic score.
                    </p>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What you get:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Analysis of existing content for AI-search suitability</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Flags where content is weak, incomplete, or hard for AI engines to use</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Specific optimization recommendations to improve AI-search visibility</span>
                      </li>
                    </ul>
                  </div>

                  <div className="glass-strong rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <FileSearch className="w-4 h-4 text-violet-600" />
                      <h3 className="font-bold text-slate-900">Content Analysis</h3>
                    </div>
                    <div className="p-3 bg-white/70 rounded-lg border border-slate-200/50 mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-slate-800">Pricing Page</span>
                        <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full whitespace-nowrap">Needs Optimization</span>
                      </div>
                      <span className="text-xs text-slate-500">Missing structured FAQ for AI citation</span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Recommendations</p>
                    <div className="space-y-1.5">
                      {[
                        "Add a structured FAQ section AI engines can cite directly",
                        "Cover pricing questions competitor pages already answer",
                        "Add clearer headings so answers are easier to extract",
                      ].map((rec) => (
                        <div key={rec} className="flex items-start gap-2 p-2 bg-white/70 rounded-lg border border-slate-200/50">
                          <Check className="w-3.5 h-3.5 text-violet-500 mt-0.5 flex-shrink-0" />
                          <span className="text-[11px] text-slate-600 leading-snug">{rec}</span>
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
        <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50/30 to-red-50/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-slate-900 text-center mb-8">
              How Every Page Is Statused
            </h2>

            {/* Desktop / tablet table */}
            <Card className="hidden sm:block glass rounded-[2rem] border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-3 bg-slate-900/90 text-white text-sm font-black uppercase tracking-wide">
                  <div className="px-5 py-4">Status</div>
                  <div className="px-5 py-4">What it means</div>
                  <div className="px-5 py-4">Example</div>
                </div>
                {STATUSES.map((row, i) => (
                  <div
                    key={row.tag}
                    className={`grid grid-cols-3 text-sm sm:text-[15px] leading-relaxed ${i % 2 === 0 ? "bg-white/70" : "bg-white/40"}`}
                  >
                    <div className="px-5 py-4 font-bold text-slate-900">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${row.className}`}>{row.tag}</span>
                    </div>
                    <div className="px-5 py-4 text-slate-600">{row.meaning}</div>
                    <div className="px-5 py-4 text-slate-600">{row.example}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Mobile: stacked cards instead of horizontal scroll */}
            <div className="sm:hidden space-y-4">
              {STATUSES.map((row) => (
                <Card key={row.tag} className="glass rounded-2xl border-0">
                  <CardContent className="p-5">
                    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-3 ${row.className}`}>{row.tag}</span>
                    <dl className="space-y-2.5 text-sm">
                      <div>
                        <dt className="text-xs font-black uppercase tracking-widest text-slate-400">What it means</dt>
                        <dd className="text-slate-600">{row.meaning}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-black uppercase tracking-widest text-slate-400">Example</dt>
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
            <div className="rounded-[2.5rem] p-10 sm:p-14 text-center shadow-2xl" style={{ background: 'linear-gradient(135deg, #F97316, #EF4444, #7575FF)' }}>
              <p className="text-xs font-black uppercase tracking-widest text-white/70 mb-4">
                From Gap to Published Page
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white mb-5">
                Know What to Write. Know What to Fix.
              </h2>
              <p className="text-lg font-medium text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
                Find content gaps, generate outlines, and optimize existing pages for stronger AI-search
                visibility.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://dashboard.georankers.co/register"
                  className="inline-flex items-center px-7 py-3 bg-white text-orange-600 font-black text-base rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg"
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
          schemaId="content-hub-faq-schema"
          footer={
            <>
              See how gaps are prioritized into an action plan with{" "}
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
