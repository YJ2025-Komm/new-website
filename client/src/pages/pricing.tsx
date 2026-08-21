import { useState, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Rocket,
  Star,
  Building2,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DesignPartnersRow } from "@/components/DesignPartners";
import { SiOpenai, SiGooglegemini, SiPerplexity, SiClaude } from "react-icons/si";

export default function Pricing() {
  useSEO({
    title: "Pricing — AI Search Visibility Plans | GeoRankers",
    description:
      "Transparent pricing for every growth stage. GeoRankers plans include AI mention monitoring, competitor benchmarking, and content recommendations — start free.",
    canonical: "https://georankers.ai/pricing",
    ogTitle: "GeoRankers Pricing — AI Search Visibility Plans",
    ogDescription:
      "Start free and scale as you grow. Flexible plans for startups, growth teams, and agencies.",
    ogUrl: "https://georankers.ai/pricing",
    schemaId: "pricing-schema",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "GeoRankers Pricing",
      "url": "https://georankers.ai/pricing",
      "description": "Pricing plans for GeoRankers AI search visibility platform.",
      "isPartOf": { "@type": "WebSite", "url": "https://georankers.ai" },
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "GeoRankers",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "image": "https://georankers.ai/og-image.png",
        "description": "AI search visibility platform that tracks brand mentions, citation share, and competitive positioning across ChatGPT, Google AI Search, and Perplexity.",
        "brand": { "@type": "Organization", "name": "GeoRankers", "url": "https://georankers.ai" },
        "offers": [
          {
            "@type": "Offer",
            "name": "Launch",
            "price": "41",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://georankers.ai/pricing",
            "description": "Billed quarterly ($49/mo billed monthly). For early teams starting to measure AI visibility.",
          },
          {
            "@type": "Offer",
            "name": "Grow",
            "price": "129",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://georankers.ai/pricing",
            "description": "Billed quarterly ($159/mo billed monthly). For growth teams optimizing AI category position.",
          },
          {
            "@type": "Offer",
            "name": "Enterprise",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://georankers.ai/pricing",
            "description": "Custom pricing for teams making AI visibility a strategic KPI.",
          },
        ],
      },
    },
  });

  // Standalone BreadcrumbList — check-before-create prevents duplication on prerender + hydration
  useEffect(() => {
    const ID = 'pricing-breadcrumb-schema';
    let el = document.querySelector(`script#${ID}`) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = ID;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://georankers.ai/" },
        { "@type": "ListItem", "position": 2, "name": "Pricing", "item": "https://georankers.ai/pricing" },
      ],
    });
    return () => { el?.remove(); };
  }, []);

  // Standalone FAQPage — separate script tag avoids Google "Duplicate field FAQ page" error.
  // Uses check-before-create so hydration after prerender does not add a second copy.
  useEffect(() => {
    const ID = 'pricing-faq-schema';
    let el = document.querySelector(`script#${ID}`) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = ID;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What are Keyword Recommendations?", "acceptedAnswer": { "@type": "Answer", "text": "Keyword Recommendations are the core buying queries and category keywords GeoRankers identifies for your business, each paired with search volume so you can prioritize by demand. GeoRankers runs structured variations of these keywords across AI models to measure your visibility where it matters most." } },
        { "@type": "Question", "name": "What does \"AI Answers Analyzed\" mean?", "acceptedAnswer": { "@type": "Answer", "text": "This refers to the total number of individual AI-generated answers we capture and analyze across models and prompt variations for your seed topics — including comparison, best-tool, use-case, and category queries." } },
        { "@type": "Question", "name": "How often are visibility runs executed?", "acceptedAnswer": { "@type": "Answer", "text": "All plans run on a weekly schedule by default. You can also trigger on-demand runs whenever you want fresh data outside the weekly cycle — 1 per month on Launch, 3 per month on Grow, and a custom allowance on Enterprise. Each run captures fresh AI responses and updates your visibility signals." } },
        { "@type": "Question", "name": "What AI models are supported?", "acceptedAnswer": { "@type": "Answer", "text": "All plans track ChatGPT, Google AI Search, and Perplexity. We continuously expand model coverage as AI search evolves." } },
        { "@type": "Question", "name": "What is GEO Agent (AI Assistant)?", "acceptedAnswer": { "@type": "Answer", "text": "GEO Agent is your conversational visibility assistant. It allows you to ask visibility questions, compare competitors, understand citation sources, and explore narrative gaps. Each conversation includes one user message and one system response. Additional usage is billed at $0.01 per conversation." } },
        { "@type": "Question", "name": "How is this different from traditional SEO tools?", "acceptedAnswer": { "@type": "Answer", "text": "Traditional tools measure rankings and traffic. GeoRankers measures how AI models interpret, select, and cite your brand inside generated answers. We focus on visibility signals, citation patterns, and prescriptive actions tied to AI behavior — see the full feature breakdown for details." } },
        { "@type": "Question", "name": "What does \"Competitors Tracked\" include?", "acceptedAnswer": { "@type": "Answer", "text": "You can define key competitors per plan. GeoRankers monitors how often they are mentioned, how they are positioned, and which sources strengthen their visibility across AI models." } },
        { "@type": "Question", "name": "Can I export reports?", "acceptedAnswer": { "@type": "Answer", "text": "Report export is available in Grow and Enterprise plans. Enterprise plans can customize reporting formats." } },
        { "@type": "Question", "name": "What happens if I exceed my GEO Agent conversation limit?", "acceptedAnswer": { "@type": "Answer", "text": "Additional conversations are billed at $0.01 per conversation. You can upgrade anytime if usage consistently exceeds your plan limit." } },
        { "@type": "Question", "name": "Is Enterprise required for larger teams?", "acceptedAnswer": { "@type": "Answer", "text": "Enterprise is recommended if you need custom prompt volume, higher run frequency, dedicated support, extended analytics history, or custom integrations." } },
        { "@type": "Question", "name": "Can I upgrade or downgrade my plan?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can change plans at any time. Billing adjustments are prorated based on your subscription cycle." } },
        { "@type": "Question", "name": "Do you offer pilots or custom onboarding?", "acceptedAnswer": { "@type": "Answer", "text": "Enterprise customers receive dedicated onboarding and a GEO specialist. If you are evaluating at scale, contact us for a structured visibility pilot." } },
      ],
    });
    return () => { el?.remove(); };
  }, []);

  const [annual, setAnnual] = useState(true);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const plans = [
    {
      name: "Launch",
      icon: Rocket,
      iconGradient: "from-blue-500 to-cyan-500",
      monthlyPrice: 49,
      quarterlyPrice: 41,
      subtitle: "For early teams starting to measure AI visibility.",
      cta: "Get Started",
      ctaHref: "https://dashboard.georankers.co/register",
      ctaStyle: "bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-300",
      highlighted: false,
      sections: [
        {
          title: "Core Features",
          items: [
            "450+ AI Answers Analyzed",
            "ChatGPT, Google AI Search, Perplexity",
            "5 Competitors Tracked",
            "Keyword Recommendations",
            "1 Seat",
            "Weekly Scheduled Runs + 1 On-Demand Run/month",
          ],
        },
        {
          title: "GEO Agent (AI Assistant)",
          items: ["10 conversations/user/day"],
        },
        {
          title: "Historical Run Access",
          items: ["Last 5 Runs", "30-Day Visibility Trend"],
        },
        {
          title: "Alerts & Notifications",
          items: ["Email"],
        },
        {
          title: "Support",
          items: ["24 Hour Response Time"],
        },
      ],
    },
    {
      name: "Grow",
      icon: Star,
      iconGradient: "from-violet-500 to-pink-500",
      monthlyPrice: 159,
      quarterlyPrice: 129,
      subtitle: "For growth teams optimizing AI category position.",
      cta: "Get Started",
      ctaHref: "https://dashboard.georankers.co/register",
      ctaStyle: "gradient-cta hover:opacity-90 text-white shadow-lg",
      highlighted: true,
      sections: [
        {
          title: "Core Features",
          items: [
            "1,100+ AI Answers Analyzed",
            "ChatGPT, Google AI Search, Perplexity",
            "10 Competitors Tracked",
            "Keyword Recommendations",
            "3 Seats",
            "Weekly Scheduled Runs + 3 On-Demand Runs/month",
          ],
        },
        {
          title: "GEO Agent (AI Assistant)",
          items: ["20 conversations/user/day"],
        },
        {
          title: "Historical Run Access",
          items: ["Last 10 Runs", "60-Day Visibility Trend"],
        },
        {
          title: "Alerts & Notifications",
          items: ["Email, Slack (Roadmap)"],
        },
        {
          title: "Integrations",
          items: ["Report Export", "Google Analytics (Roadmap)", "Google Search Console (Roadmap)"],
        },
        {
          title: "Support",
          items: ["12 Hour Response Time"],
        },
      ],
    },
    {
      name: "Enterprise",
      icon: Building2,
      iconGradient: "from-slate-700 to-slate-900",
      monthlyPrice: null,
      quarterlyPrice: null,
      subtitle: "For teams making AI visibility a strategic KPI.",
      cta: "Talk to Us",
      ctaHref: "https://calendly.com/hello-georankers/30min",
      ctaStyle: "bg-slate-900 hover:bg-slate-800 text-white",
      highlighted: false,
      sections: [
        {
          title: "Core Features",
          items: [
            "Custom AI Answers Analyzed",
            "ChatGPT, Google AI Search, Perplexity",
            "Custom Competitor Tracking",
            "Keyword Recommendations",
            "Custom Seats",
            "Custom Scheduled + On-Demand Runs",
          ],
        },
        {
          title: "GEO Agent (AI Assistant)",
          items: ["Custom Volume"],
        },
        {
          title: "Historical Run Access",
          items: ["Custom History", "Custom Visibility Trend"],
        },
        {
          title: "Alerts & Notifications",
          items: ["Email, Slack (Roadmap)"],
        },
        {
          title: "Integrations",
          items: [
            "Report Export",
            "Google Analytics (Roadmap)",
            "Google Search Console (Roadmap)",
            "Agent-Ready API (MCP-compatible)",
          ],
        },
        {
          title: "Support",
          items: [
            "4 Hour Response Time",
            "Dedicated Account Manager",
          ],
        },
      ],
    },
  ];

  const comparisonGroups = [
    {
      title: null,
      rows: [
        { label: "LLMs Tracked", launch: "ChatGPT, Google AI Search, Perplexity", grow: "ChatGPT, Google AI Search, Perplexity", enterprise: "ChatGPT, Google AI Search, Perplexity" },
        { label: "AI Answers Analyzed", launch: "450+", grow: "1,100+", enterprise: "Custom" },
        { label: "Competitors Tracked", launch: "5", grow: "10", enterprise: "Custom" },
        { label: "Scheduled Runs", launch: "Weekly", grow: "Weekly", enterprise: "Custom" },
        { label: "On-Demand Runs", launch: "1/month", grow: "3/month", enterprise: "Custom" },
        { label: "GEO Agent (AI Assistant)", launch: "10 conversations/user/day", grow: "20 conversations/user/day", enterprise: "Custom" },
        { label: "Historical Run Access", launch: "Last 5 Runs", grow: "Last 10 Runs", enterprise: "Custom" },
        { label: "Visibility Trend Chart", launch: "30 Days", grow: "60 Days", enterprise: "Custom" },
        { label: "Alerts & Notifications", launch: "Email", grow: "Email, Slack (Roadmap)", enterprise: "Email, Slack (Roadmap)" },
        { label: "Report Export", launch: "no", grow: "yes", enterprise: "yes" },
        { label: "Google Analytics (Roadmap)", launch: "no", grow: "yes", enterprise: "yes" },
        { label: "Google Search Console (Roadmap)", launch: "no", grow: "yes", enterprise: "yes" },
        { label: "API Access (Roadmap)", launch: "no", grow: "no", enterprise: "Agent-Ready API (MCP-compatible)" },
        { label: "Seats", launch: "1", grow: "3", enterprise: "Custom" },
        { label: "Support SLA", launch: "24 Hours", grow: "12 Hours", enterprise: "4 Hours" },
        { label: "Dedicated Account Manager", launch: "no", grow: "no", enterprise: "yes" },
      ],
    },
    {
      title: "Included in Every Plan",
      rows: [
        { label: "Brand Mention Monitoring", launch: "yes", grow: "yes", enterprise: "yes" },
        { label: "Keyword Search Volume", launch: "yes", grow: "yes", enterprise: "yes" },
        { label: "AI Recommendations", launch: "yes", grow: "yes", enterprise: "yes" },
        { label: "Visibility Dashboard", launch: "yes", grow: "yes", enterprise: "yes" },
        { label: "Competitor Tracking", launch: "yes", grow: "yes", enterprise: "yes" },
        { label: "Sources Tracking", launch: "yes", grow: "yes", enterprise: "yes" },
        { label: "AI Reading Checker", launch: "yes", grow: "yes", enterprise: "yes" },
        { label: "AI Sentiment Tracking", launch: "yes", grow: "yes", enterprise: "yes" },
        { label: "Content Hub", launch: "yes", grow: "yes", enterprise: "yes" },
      ],
    },
  ];

  const faqs = [
    {
      question: "What are Keyword Recommendations?",
      answer: (
        <span>
          Keyword Recommendations are the core buying queries and category keywords GeoRankers identifies for your business, each paired with search volume so you can prioritize by demand. GeoRankers runs structured variations of these keywords across AI models to measure your visibility where it matters most. Learn more about{" "}
          <Link href="/geo-guide" className="text-blue-600 hover:underline font-medium">how buyer queries shape AI visibility in the GEO Playbook</Link>.
        </span>
      ),
    },
    {
      question: "What does \"AI Answers Analyzed\" mean?",
      answer: "This refers to the total number of individual AI-generated answers we capture and analyze across models and prompt variations for your seed topics — including comparison, best-tool, use-case, and category queries.",
    },
    {
      question: "How often are visibility runs executed?",
      answer: "All plans run on a weekly schedule by default. You can also trigger on-demand runs whenever you want fresh data outside the weekly cycle — 1 per month on Launch, 3 per month on Grow, and a custom allowance on Enterprise. Each run captures fresh AI responses and updates your visibility signals.",
    },
    {
      question: "What AI models are supported?",
      answer: "All plans track ChatGPT, Google AI Search, and Perplexity. We continuously expand model coverage as AI search evolves.",
    },
    {
      question: "What is GEO Agent (AI Assistant)?",
      answer: "GEO Agent is your conversational visibility assistant. It allows you to ask visibility questions, compare competitors, understand citation sources, and explore narrative gaps. Each conversation includes one user message and one system response. Additional usage is billed at $0.01 per conversation.",
    },
    {
      question: "How is this different from traditional SEO tools?",
      answer: (
        <span>
          Traditional tools measure rankings and traffic. GeoRankers measures how AI models interpret, select, and cite your brand inside generated answers. We focus on visibility signals, citation patterns, and prescriptive actions tied to AI behavior — see the{" "}
          <Link href="/features" className="text-blue-600 hover:underline font-medium">full feature breakdown</Link> for details.
        </span>
      ),
    },
    {
      question: "What does \"Competitors Tracked\" include?",
      answer: "You can define key competitors per plan. GeoRankers monitors how often they are mentioned, how they are positioned, and which sources strengthen their visibility across AI models.",
    },
    {
      question: "Can I export reports?",
      answer: "Report export is available in Grow and Enterprise plans. Enterprise plans can customize reporting formats.",
    },
    {
      question: "What happens if I exceed my GEO Agent conversation limit?",
      answer: "Additional conversations are billed at $0.01 per conversation. You can upgrade anytime if usage consistently exceeds your plan limit.",
    },
    {
      question: "Is Enterprise required for larger teams?",
      answer: "Enterprise is recommended if you need custom prompt volume, higher run frequency, dedicated support, extended analytics history, or custom integrations.",
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes. You can change plans at any time. Billing adjustments are prorated based on your subscription cycle.",
    },
    {
      question: "Do you offer pilots or custom onboarding?",
      answer: "Enterprise customers receive dedicated onboarding and a GEO specialist. If you are evaluating at scale, contact us for a structured visibility pilot.",
    },
  ];

  return (
    <div className="min-h-screen text-slate-900 overflow-x-clip">
      <Navbar />
      <main id="main-content">

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="hero-gradient absolute inset-0 z-0"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

        <div className="hidden sm:block absolute inset-0 z-[5] overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-28 sm:top-32 left-[3%] sm:left-[6%] animate-logo-drift" style={{ animationDelay: '0s' }}>
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center">
              <SiOpenai className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-slate-700" />
            </div>
          </div>
          <div className="absolute top-32 sm:top-36 right-[4%] sm:right-[7%] animate-logo-drift" style={{ animationDelay: '1s' }}>
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center">
              <SiGooglegemini className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-500" />
            </div>
          </div>
          <div className="absolute top-[55%] left-[2%] sm:left-[5%] animate-logo-drift" style={{ animationDelay: '2s' }}>
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center">
              <SiPerplexity className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-slate-700" />
            </div>
          </div>
          <div className="absolute top-[50%] right-[3%] sm:right-[6%] animate-logo-drift" style={{ animationDelay: '3s' }}>
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center">
              <SiClaude className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-orange-500" />
            </div>
          </div>
          <div className="absolute bottom-10 sm:bottom-14 left-[10%] sm:left-[14%] animate-logo-drift" style={{ animationDelay: '4s' }}>
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center">
              <img src="/grok-logo.png" alt="Grok" width={500} height={465} className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" style={{ filter: 'invert(1)' }} loading="lazy" />
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-slate-900 mb-5">
            Start Tracking Your{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">AI Visibility Today</span>
          </h1>
          <p className="text-lg sm:text-xl font-medium text-slate-600 max-w-2xl mx-auto mb-5 leading-relaxed">
            Know where your brand stands across AI answers and what needs to change to improve it.
          </p>
          <p className="text-sm text-slate-400 mb-6">
            7-Day Free Trial. No credit card required. Cancel anytime
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className={`text-sm font-medium ${!annual ? "text-slate-900" : "text-slate-500"}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${annual ? "bg-gradient-to-r from-blue-500 to-violet-500" : "bg-slate-300"}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${annual ? "translate-x-7" : ""}`}></div>
            </button>
            <span className={`text-sm font-medium ${annual ? "text-slate-900" : "text-slate-500"}`}>
              Quarterly
              <span className="ml-2 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Save 16%+</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 -mt-4 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="sr-only">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, planIndex) => {
              const Icon = plan.icon;
              return (
                <Card
                  key={planIndex}
                  className={`rounded-3xl border-0 overflow-hidden relative ${
                    plan.highlighted
                      ? "shadow-2xl shadow-violet-200/50 ring-2 ring-violet-400 bg-gradient-to-b from-violet-50 to-white"
                      : "glass shadow-lg"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-violet-500 text-white text-center text-xs font-semibold py-1.5">
                      Recommended
                    </div>
                  )}
                  <CardContent className={`p-6 sm:p-8 ${plan.highlighted ? "pt-10" : ""}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 bg-gradient-to-r ${plan.iconGradient} rounded-xl flex items-center justify-center`}>
                        <Icon aria-hidden="true" className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                    </div>

                    <p className="text-sm text-slate-500 mb-4">{plan.subtitle}</p>

                    {plan.monthlyPrice !== null ? (
                      <div className="mb-1">
                        <span className="text-4xl font-bold text-slate-900">
                          ${annual ? plan.quarterlyPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-slate-500 text-sm">/mo</span>
                      </div>
                    ) : (
                      <div className="mb-1">
                        <span className="text-4xl font-bold text-slate-900">Custom</span>
                      </div>
                    )}

                    {plan.monthlyPrice !== null && annual && (
                      <p className="text-xs text-green-600 mb-5">
                        Billed quarterly · Save ${(plan.monthlyPrice - plan.quarterlyPrice!) * 3}/quarter
                      </p>
                    )}
                    {plan.monthlyPrice !== null && !annual && (
                      <p className="text-xs text-slate-400 mb-5">Billed monthly</p>
                    )}
                    {plan.monthlyPrice === null && (
                      <p className="text-xs text-slate-400 mb-5">Tailored to your needs</p>
                    )}

                    <a
                      href={plan.ctaHref}
                      className={`block w-full py-3 rounded-xl text-sm font-semibold text-center transition-all mb-6 ${plan.ctaStyle}`}
                    >
                      {plan.cta} <ArrowRight className="w-4 h-4 inline-block ml-1" />
                    </a>

                    <div className="space-y-5">
                      {plan.sections.map((section, sIdx) => (
                        <div key={sIdx}>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                            {section.title}
                          </p>
                          <div className="space-y-2">
                            {section.items.map((item, iIdx) => (
                              <div key={iIdx} className="flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-slate-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compare Plans Table */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Compare Plans</h2>
            <p className="text-slate-500 mt-2">See what's included in each plan at a glance.</p>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block">
            <Card className="glass rounded-3xl border-0 shadow-xl">
              <CardContent className="p-0">
                <div className="sticky top-16 z-10 grid grid-cols-4 border-b border-slate-200/50 bg-slate-50 rounded-t-3xl shadow-sm">
                  <div className="p-6 flex items-center">
                    <span className="text-sm font-semibold text-slate-700">Feature</span>
                  </div>
                  <div className="p-6 text-center border-l border-slate-200/50">
                    <span className="text-sm font-bold text-slate-900">Launch</span>
                  </div>
                  <div className="p-6 text-center border-l border-slate-200/50 bg-violet-50">
                    <span className="text-sm font-bold text-slate-900">Grow</span>
                  </div>
                  <div className="p-6 text-center border-l border-slate-200/50">
                    <span className="text-sm font-bold text-slate-900">Enterprise</span>
                  </div>
                </div>

                {comparisonGroups.map((group, gIdx) => (
                  <div key={gIdx}>
                    {group.title && (
                      <div className="grid grid-cols-4 border-b border-slate-200/50 bg-blue-50/60">
                        <div className="px-6 py-3 col-span-4">
                          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{group.title}</span>
                        </div>
                      </div>
                    )}
                    {group.rows.map((row, i) => {
                      const renderCell = (value: string) => {
                        if (value === "yes") return <Check className="w-5 h-5 text-green-500 mx-auto" />;
                        if (value === "no") return <span className="text-slate-300">—</span>;
                        return <span className="text-slate-700 text-sm">{value}</span>;
                      };
                      const isLastRow = gIdx === comparisonGroups.length - 1 && i === group.rows.length - 1;
                      return (
                        <div key={i} className={`grid grid-cols-4 ${i % 2 === 0 ? "bg-slate-50/50" : ""} ${!isLastRow ? "border-b border-slate-100" : ""}`}>
                          <div className="px-6 py-4 flex items-center">
                            <span className="text-sm font-medium text-slate-700">{row.label}</span>
                          </div>
                          <div className="px-6 py-4 text-center border-l border-slate-100 flex items-center justify-center">
                            {renderCell(row.launch)}
                          </div>
                          <div className="px-6 py-4 text-center border-l border-slate-100 flex items-center justify-center bg-violet-50/30">
                            {renderCell(row.grow)}
                          </div>
                          <div className="px-6 py-4 text-center border-l border-slate-100 flex items-center justify-center">
                            {renderCell(row.enterprise)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}

                <div className="grid grid-cols-4 border-t border-slate-200/50 bg-slate-50/30 rounded-b-3xl overflow-hidden">
                  <div className="p-6"></div>
                  <div className="p-6 text-center border-l border-slate-200/50">
                    <a href="https://dashboard.georankers.co/register" className="block w-full py-2.5 rounded-xl text-sm font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-300 transition-colors">
                      Get Started <ArrowRight className="w-3.5 h-3.5 inline-block ml-1" />
                    </a>
                  </div>
                  <div className="p-6 text-center border-l border-slate-200/50 bg-violet-50/30">
                    <a href="https://dashboard.georankers.co/register" className="block w-full py-2.5 rounded-xl text-sm font-semibold gradient-cta hover:opacity-90 text-white shadow-lg transition-all">
                      Get Started <ArrowRight className="w-3.5 h-3.5 inline-block ml-1" />
                    </a>
                  </div>
                  <div className="p-6 text-center border-l border-slate-200/50">
                    <a href="https://calendly.com/hello-georankers/30min" target="_blank" rel="noopener noreferrer" className="block w-full py-2.5 rounded-xl text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors">
                      Talk to Us <ArrowRight className="w-3.5 h-3.5 inline-block ml-1" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile: Scrollable comparison */}
          <div className="lg:hidden overflow-x-auto -mx-4 px-4">
            <div className="min-w-[600px]">
              <Card className="glass rounded-2xl border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="sticky top-16 z-10 grid grid-cols-4 border-b border-slate-200/50 bg-slate-50 rounded-t-2xl shadow-sm">
                    <div className="p-4">
                      <span className="text-xs font-semibold text-slate-700">Feature</span>
                    </div>
                    <div className="p-4 text-center border-l border-slate-200/50">
                      <span className="text-xs font-bold text-slate-900">Launch</span>
                    </div>
                    <div className="p-4 text-center border-l border-slate-200/50 bg-violet-50">
                      <span className="text-xs font-bold text-slate-900">Grow</span>
                    </div>
                    <div className="p-4 text-center border-l border-slate-200/50">
                      <span className="text-xs font-bold text-slate-900">Enterprise</span>
                    </div>
                  </div>
                  {comparisonGroups.map((group, gIdx) => (
                    <div key={gIdx}>
                      {group.title && (
                        <div className="grid grid-cols-4 border-b border-slate-200/50 bg-blue-50/60">
                          <div className="p-4 col-span-4">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">{group.title}</span>
                          </div>
                        </div>
                      )}
                      {group.rows.map((row, i) => {
                        const renderCell = (value: string) => {
                          if (value === "yes") return <Check className="w-4 h-4 text-green-500 mx-auto" />;
                          if (value === "no") return <span className="text-slate-300">—</span>;
                          return <span className="text-slate-700 text-xs">{value}</span>;
                        };
                        const isLastRow = gIdx === comparisonGroups.length - 1 && i === group.rows.length - 1;
                        return (
                          <div key={i} className={`grid grid-cols-4 ${i % 2 === 0 ? "bg-slate-50/50" : ""} ${!isLastRow ? "border-b border-slate-100" : ""}`}>
                            <div className="px-4 py-3 flex items-center">
                              <span className="text-xs font-medium text-slate-700">{row.label}</span>
                            </div>
                            <div className="px-4 py-3 text-center border-l border-slate-100 flex items-center justify-center">
                              {renderCell(row.launch)}
                            </div>
                            <div className="px-4 py-3 text-center border-l border-slate-100 flex items-center justify-center bg-violet-50/30">
                              {renderCell(row.grow)}
                            </div>
                            <div className="px-4 py-3 text-center border-l border-slate-100 flex items-center justify-center">
                              {renderCell(row.enterprise)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}

                  <div className="grid grid-cols-4 border-t border-slate-200/50 bg-slate-50/30 rounded-b-2xl overflow-hidden">
                    <div className="p-4"></div>
                    <div className="p-4 text-center border-l border-slate-200/50">
                      <a href="https://dashboard.georankers.co/register" className="block w-full py-2 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-300 transition-colors">
                        Get Started
                      </a>
                    </div>
                    <div className="p-4 text-center border-l border-slate-200/50 bg-violet-50/30">
                      <a href="https://dashboard.georankers.co/register" className="block w-full py-2 rounded-lg text-xs font-semibold gradient-cta hover:opacity-90 text-white shadow-lg transition-all">
                        Get Started
                      </a>
                    </div>
                    <div className="p-4 text-center border-l border-slate-200/50">
                      <a href="https://calendly.com/hello-georankers/30min" target="_blank" rel="noopener noreferrer" className="block w-full py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white transition-colors">
                        Talk to Us
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Banner */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="gradient-cta rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                <Building2 className="w-3.5 h-3.5" />
                For Agencies
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Managing Multiple Clients?
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
                Get dedicated agency pricing with volume discounts, multi-client dashboards, white-label reporting, and a dedicated account manager.
              </p>
              <a
                href="https://calendly.com/hello-georankers/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg"
              >
                Talk to Sales
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Design Partners strip */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <DesignPartnersRow className="max-w-5xl mx-auto" />
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-blue-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass rounded-2xl border-0">
                <CardContent className="p-0">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex items-start justify-between hover:bg-white/20 transition-colors duration-300"
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
                      <div className="text-slate-600 leading-relaxed text-sm">{faq.answer}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
