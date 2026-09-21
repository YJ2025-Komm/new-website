import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { useBreadcrumbSchema, FEATURES_CRUMBS } from "@/hooks/useBreadcrumbSchema";
import { Card, CardContent } from "@/components/ui/card";
import FAQSection, { type FAQ } from "@/components/FAQSection";
import { ArrowDown, Check, Globe, MapPin, Rocket, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PAGE_URL = "https://georankers.ai/features/country-specific-ai-tracking";

// The three stages in the How It Works diagram: pick a country, run prompts
// grounded to it, then compare the resulting scores against another market.
// Deliberately shows the comparison step last, since the point of tracking
// per country is seeing how markets differ, not just scoring one in isolation.
const LOOP_STAGES = [
  {
    label: "Pick a Country",
    detail: "Choose the market you want AI responses grounded to, such as the United States or the United Kingdom.",
  },
  {
    label: "Prompts Run Grounded to It",
    detail: "Your tracked prompts run against each AI model with responses grounded to that country.",
  },
  {
    label: "Results Scored Per Market",
    detail: "Brand visibility, competitor mentions, and cited sources are scored separately for that country.",
  },
  {
    label: "Compare Across Markets",
    detail: "See how your visibility, competitors, and citations shift when you switch to a different country.",
  },
];

// The example country scores shown in the dashboard preview, reused here to
// keep the visual consistent with the Features overview page.
const COUNTRY_SCORES = [
  { name: "United States", flag: "us", score: 74, barClass: "from-blue-500 to-indigo-500", scoreClass: "text-blue-600" },
  { name: "United Kingdom", flag: "gb", score: 61, barClass: "from-indigo-500 to-violet-500", scoreClass: "text-indigo-600" },
  { name: "India", flag: "in", score: 52, barClass: "from-violet-500 to-purple-500", scoreClass: "text-violet-600" },
  { name: "Germany", flag: "de", score: 45, barClass: "bg-slate-300", scoreClass: "text-slate-500" },
];

// What changes per country when you switch the grounding, matching the
// dashboard's actual "AI Visibility by Country" panel plus the checklist on
// the Features overview page.
const WHAT_CHANGES = [
  {
    label: "Brand Visibility",
    meaning: "Your AI Visibility Score is calculated separately for each country you track",
  },
  {
    label: "Competitors",
    meaning: "Which competitors are named, and how often, can differ by market",
  },
  {
    label: "Cited Sources",
    meaning: "The sources AI models cite for the same topic often change by country",
  },
  {
    label: "Recommendations",
    meaning: "Suggested actions reflect the gaps found in that specific market",
  },
];

const FAQS: FAQ[] = [
  {
    question: "What does \"grounded to a country\" actually mean?",
    answer:
      "It means the AI model is asked to respond as if the user is located in that country, which is a setting the model itself supports. GeoRankers runs your tracked prompts with that grounding applied, then scores the results for that market.",
  },
  {
    question: "Do the prompts themselves change per country?",
    answer:
      "No, the same tracked prompts run in each country you track. What changes is the grounding applied to the AI model, which can shift which brands, competitors, and sources show up in the response.",
  },
  {
    question: "Why do competitors or cited sources change between countries?",
    answer:
      "AI models weigh regional relevance, local sources, and market-specific content differently depending on where the response is grounded, so the same question can surface different brands and citations by country.",
  },
  {
    question: "How many countries can I track?",
    answer:
      "Country-Specific AI Tracking is included on every plan. The number of countries you can track scales with your plan, with Enterprise offering a custom setup.",
  },
  {
    question: "Can I compare visibility trends across countries over time?",
    answer:
      "Yes. You can compare how your visibility, competitor mentions, and citations trend over time in one country against another, not just a single snapshot.",
  },
  {
    question: "Does this replace the need to track my default market?",
    answer:
      "No. Your default tracked results still apply, and country-specific tracking is an additional layer that lets you see how those same results shift when responses are grounded to a different market.",
  },
];

export default function CountrySpecificAiTracking() {
  useSEO({
    title: "Country-Specific AI Tracking: Visibility By Market",
    description:
      "Track AI visibility with responses grounded to the country you care about. Compare brand, competitor, citation, and recommendation results across markets.",
    canonical: PAGE_URL,
    ogTitle: "Country-Specific AI Tracking: See How Your Brand Appears Across Markets",
    ogDescription:
      "AI visibility results grounded to the country you care about, compared side by side across markets.",
    ogUrl: PAGE_URL,
    schemaId: "country-specific-ai-tracking-schema",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Country-Specific AI Tracking: Visibility By Market",
      "url": PAGE_URL,
      "description":
        "Track AI visibility with responses grounded to the country you care about. Compare brand, competitor, citation, and recommendation results across markets.",
      "isPartOf": { "@type": "WebSite", "name": "GeoRankers", "url": "https://georankers.ai" },
      "about": { "@type": "SoftwareApplication", "name": "GeoRankers", "url": "https://georankers.ai" },
    },
  });

  useBreadcrumbSchema("country-specific-ai-tracking-breadcrumb-schema", [
    ...FEATURES_CRUMBS,
    { name: "Country-Specific AI Tracking", item: PAGE_URL },
  ]);

  return (
    <div className="min-h-screen text-slate-900" style={{ overflowX: "clip" }}>
      <Navbar />
      <main id="main-content">

        {/* Hero */}
        <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-14 overflow-hidden">
          <div className="hero-gradient absolute inset-0 z-0"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm text-blue-600 font-semibold mb-4 uppercase tracking-widest">Features</p>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-5 leading-[1.1]">
              See How Your Brand Appears
              <br />
              <span className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
                Across Markets
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Track AI visibility with responses grounded to the country you care about. Compare how your
              brand, competitors, citations, and recommendations change across different markets.
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
                <p className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-3">How It Works</p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-slate-900 mb-4">
                  Ground Results to a Market, Then Compare
                </h2>
                <p className="text-base text-slate-500 leading-relaxed">
                  The same tracked prompts run with responses grounded to the country you choose, so you can
                  see how your visibility, competitors, and citations shift by market.
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
                              <span className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">
                                {i + 1}
                              </span>
                              <p className="text-slate-900 font-black text-[11px] sm:text-xs uppercase tracking-wide">
                                {stage.label}
                              </p>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-snug pl-6">{stage.detail}</p>
                          </div>
                          {i < LOOP_STAGES.length - 1 && (
                            <div className="flex justify-center py-0.5">
                              <ArrowDown className="w-3.5 h-3.5 text-indigo-500" strokeWidth={2.5} />
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

            {/* 1. Visibility by country: text left, visual right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">A Visibility Score Per Market</h2>
                        <p className="text-base font-medium text-slate-500">Not one global number applied everywhere.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      Your AI Visibility Score is calculated separately for each country you track, so you
                      can see exactly where you are strong and where you are not.
                    </p>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What you get:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Country-grounded AI responses</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Market-specific brand visibility tracking</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">A separate score for every country you track</span>
                      </li>
                    </ul>
                  </div>

                  <div className="glass-strong rounded-2xl p-6">
                    <h4 className="font-bold mb-4 text-slate-900">AI Visibility by Country</h4>
                    <div className="space-y-3">
                      {COUNTRY_SCORES.map((country) => (
                        <div key={country.name}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-slate-700 flex items-center gap-1.5">
                              <img src={`/flags/${country.flag}.png`} srcSet={`/flags/${country.flag}@2x.png 2x`} width={20} height={15} alt="" className="rounded-sm" loading="lazy" />
                              {country.name}
                            </span>
                            <span className={`text-sm font-black ${country.scoreClass}`}>{country.score}</span>
                          </div>
                          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${country.barClass.startsWith("from-") ? `bg-gradient-to-r ${country.barClass}` : country.barClass}`} style={{ width: `${country.score}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200/50">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <div className="text-xs text-slate-500">ChatGPT</div>
                          <div className="text-sm font-black text-blue-600 flex items-center justify-center gap-1"><img src="/flags/us.png" srcSet="/flags/us@2x.png 2x" width={20} height={15} alt="" className="rounded-sm" loading="lazy" /> US</div>
                        </div>
                        <div className="p-2 bg-purple-50 rounded-lg">
                          <div className="text-xs text-slate-500">Google AI Search</div>
                          <div className="text-sm font-black text-purple-600 flex items-center justify-center gap-1"><img src="/flags/gb.png" srcSet="/flags/gb@2x.png 2x" width={20} height={15} alt="" className="rounded-sm" loading="lazy" /> UK</div>
                        </div>
                        <div className="p-2 bg-orange-50 rounded-lg">
                          <div className="text-xs text-slate-500">Perplexity</div>
                          <div className="text-sm font-black text-orange-600 flex items-center justify-center gap-1"><img src="/flags/in.png" srcSet="/flags/in@2x.png 2x" width={20} height={15} alt="" className="rounded-sm" loading="lazy" /> IN</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Competitors and citations by market: visual left, text right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="glass-strong rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <h3 className="font-bold text-slate-900">What Changes By Market</h3>
                      </div>
                      <div className="space-y-2">
                        {WHAT_CHANGES.map((row) => (
                          <div key={row.label} className="p-3 bg-white/70 rounded-lg border border-slate-200/50">
                            <p className="text-xs font-bold text-slate-900 mb-0.5">{row.label}</p>
                            <p className="text-[11px] text-slate-500 leading-snug">{row.meaning}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Different Competitors, Different Markets</h2>
                        <p className="text-base font-medium text-slate-500">Who wins a category can change by country.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      The competitor winning a topic in one market is not always the same competitor winning
                      it elsewhere, and the sources AI models cite can shift with it.
                    </p>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What you get:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Competitor performance by country</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Country-level citation and source analysis</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Recommendations reflecting gaps specific to that market</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Compare trends: text left, visual right */}
            <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border-0">
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-[1.5rem] flex items-center justify-center mr-4 flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Compare Trends, Not Just Snapshots</h2>
                        <p className="text-base font-medium text-slate-500">See which markets are moving in which direction.</p>
                      </div>
                    </div>
                    <p className="text-base text-slate-500 mb-4 leading-relaxed">
                      A single country score only tells you where you stand today. Comparing visibility
                      trends across markets over time shows whether a gap is closing, widening, or holding
                      steady.
                    </p>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                      What you get:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Compare visibility trends across markets</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">See which market a gap is widening or closing in</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Prioritize markets based on where movement is happening</span>
                      </li>
                    </ul>
                  </div>

                  <div className="glass-strong rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-violet-600" />
                      <h3 className="font-bold text-slate-900">Trend Comparison</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2.5 bg-white/70 rounded-lg border border-slate-200/50">
                        <span className="text-[11px] text-slate-700 flex items-center gap-1.5">
                          <img src="/flags/us.png" srcSet="/flags/us@2x.png 2x" width={18} height={13} alt="" className="rounded-sm" loading="lazy" />
                          United States
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Improving</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 bg-white/70 rounded-lg border border-slate-200/50">
                        <span className="text-[11px] text-slate-700 flex items-center gap-1.5">
                          <img src="/flags/gb.png" srcSet="/flags/gb@2x.png 2x" width={18} height={13} alt="" className="rounded-sm" loading="lazy" />
                          United Kingdom
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Steady</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 bg-white/70 rounded-lg border border-slate-200/50">
                        <span className="text-[11px] text-slate-700 flex items-center gap-1.5">
                          <img src="/flags/de.png" srcSet="/flags/de@2x.png 2x" width={18} height={13} alt="" className="rounded-sm" loading="lazy" />
                          Germany
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">Declining</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* At A Glance table */}
        <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50/30 to-blue-50/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-slate-900 text-center mb-8">
              What Changes When You Switch Countries
            </h2>

            {/* Desktop / tablet table */}
            <Card className="hidden sm:block glass rounded-[2rem] border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-2 bg-slate-900/90 text-white text-sm font-black uppercase tracking-wide">
                  <div className="px-5 py-4">What's tracked</div>
                  <div className="px-5 py-4">Why it changes by market</div>
                </div>
                {WHAT_CHANGES.map((row, i) => (
                  <div
                    key={row.label}
                    className={`grid grid-cols-2 text-sm sm:text-[15px] leading-relaxed ${i % 2 === 0 ? "bg-white/70" : "bg-white/40"}`}
                  >
                    <div className="px-5 py-4 font-bold text-slate-900">{row.label}</div>
                    <div className="px-5 py-4 text-slate-600">{row.meaning}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Mobile: stacked cards instead of horizontal scroll */}
            <div className="sm:hidden space-y-4">
              {WHAT_CHANGES.map((row) => (
                <Card key={row.label} className="glass rounded-2xl border-0">
                  <CardContent className="p-5">
                    <p className="font-bold text-slate-900 mb-2">{row.label}</p>
                    <p className="text-sm text-slate-600">{row.meaning}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-[2.5rem] p-10 sm:p-14 text-center shadow-2xl" style={{ background: 'linear-gradient(135deg, #6366F1, #2994FF, #7575FF)' }}>
              <p className="text-xs font-black uppercase tracking-widest text-white/70 mb-4">
                One Brand, Many Markets
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white mb-5">
                See What Changes When AI Answers a Different Market
              </h2>
              <p className="text-lg font-medium text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
                Ground your tracked prompts to the countries you care about and compare visibility side by
                side.
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
          schemaId="country-specific-ai-tracking-faq-schema"
          footer={
            <>
              See how competitors are scored within a market in{" "}
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
