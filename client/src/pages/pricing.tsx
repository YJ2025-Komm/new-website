import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Rocket,
  Star,
  Building2,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import Footer from "@/components/Footer";

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

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
            "3 Seed Prompts",
            "Up to 25 AI Prompts Tracked",
            "ChatGPT Tracking",
            "3 Competitors Tracked",
            "1 Seat",
            "Tracking updated every 48 hours",
          ],
        },
        {
          title: "GEO Agent",
          items: ["10 conversations per day", "$0.01 per conversation beyond 10/day"],
        },
        {
          title: "History",
          items: ["Last 2 Runs"],
        },
        {
          title: "Support",
          items: ["Email Support"],
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
      ctaStyle: "bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white shadow-lg",
      highlighted: true,
      sections: [
        {
          title: "Core Features",
          items: [
            "Up to 6 Seed Prompts",
            "Up to 50 AI Prompts Tracked",
            "ChatGPT and Gemini (AIO coming soon)",
            "5 Competitors Tracked",
            "3 Seats",
            "Tracking updated every 24 hours",
          ],
        },
        {
          title: "GEO Agent",
          items: ["20 conversations per day", "$0.01 per conversation beyond 20/day"],
        },
        {
          title: "History",
          items: ["Last 5 Runs"],
        },
        {
          title: "Support",
          items: ["Email & Slack"],
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
            "Custom number of Seed Prompts",
            "Customised Tracking Prompts",
            "Customised LLMs Tracking",
            "Tailored Competitor Tracking",
            "Customised Seating",
          ],
        },
        {
          title: "GEO Agent",
          items: ["Custom Volume"],
        },
        {
          title: "History",
          items: ["Full History"],
        },
        {
          title: "Support",
          items: [
            "Email and Slack",
            "Priority + Dedicated Account Manager",
            "Dedicated GEO Specialist",
            "Custom Integrations",
          ],
        },
      ],
    },
  ];

  const comparisonRows = [
    { label: "Seed Prompts", launch: "3", grow: "Up to 6", enterprise: "Custom" },
    { label: "AI Prompts Tracked", launch: "Up to 25", grow: "Up to 50", enterprise: "Custom" },
    { label: "LLMs Tracked", launch: "ChatGPT", grow: "ChatGPT, Gemini (AIO soon)", enterprise: "Custom" },
    { label: "Competitors Tracked", launch: "3", grow: "5", enterprise: "Custom" },
    { label: "Tracking Frequency", launch: "Every 48 hours", grow: "Every 24 hours", enterprise: "Custom" },
    { label: "Seats", launch: "1", grow: "3", enterprise: "Custom" },
    { label: "GEO Agent Conversations", launch: "10/day", grow: "20/day", enterprise: "Custom" },
    { label: "History", launch: "Last 2 Runs", grow: "Last 5 Runs", enterprise: "Full History" },
    { label: "Report Export", launch: "no", grow: "yes", enterprise: "yes" },
    { label: "Support", launch: "Email", grow: "Email & Slack", enterprise: "Priority + Dedicated AM" },
    { label: "Dedicated GEO Specialist", launch: "no", grow: "no", enterprise: "yes" },
    { label: "Custom Integrations", launch: "no", grow: "no", enterprise: "yes" },
  ];

  const faqs = [
    {
      question: "What is a Seed Prompt?",
      answer: "A Seed Prompt is a core buying query that reflects how customers explore your category. GeoRankers runs structured variations of these prompts across AI models to measure your visibility where it matters most.",
    },
    {
      question: "What does \"AI Prompts Tracked\" mean?",
      answer: "This refers to the total number of structured prompt variations we execute and monitor across AI platforms. It includes comparison queries, best tool queries, use case queries, and category queries.",
    },
    {
      question: "How often are visibility runs executed?",
      answer: "Tracking frequency depends on your plan. Launch plans update every 48 hours, Grow plans update every 24 hours, and Enterprise plans can customize frequency. Each run captures fresh AI responses and updates your visibility signals.",
    },
    {
      question: "What AI models are supported?",
      answer: "The Launch plan tracks ChatGPT. Grow plans include ChatGPT and Gemini, with AIO coming soon. Enterprise plans offer customised LLM tracking. We continuously expand model coverage as AI search evolves.",
    },
    {
      question: "What is GEO Agent Intelligence?",
      answer: "GEO Agent is your conversational visibility assistant. It allows you to ask visibility questions, compare competitors, understand citation sources, and explore narrative gaps. Each conversation includes one user message and one system response. Additional usage is billed at $0.01 per conversation.",
    },
    {
      question: "How is this different from traditional SEO tools?",
      answer: "Traditional tools measure rankings and traffic. GeoRankers measures how AI models interpret, select, and cite your brand inside generated answers. We focus on visibility signals, citation patterns, and prescriptive actions tied to AI behavior.",
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
    <div className="min-h-screen text-slate-900 overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold hover:scale-105 transition-transform duration-200 cursor-pointer">
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  GeoRankers
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Home
              </Link>
              <Link href="/features" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Features
              </Link>
              <Link href="/pricing" className="text-blue-600 font-semibold text-sm">
                Pricing
              </Link>
              <div className="relative">
                <button
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  onBlur={() => setTimeout(() => setResourcesOpen(false), 150)}
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium flex items-center"
                >
                  Resources
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`} />
                </button>
                {resourcesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                    <a href="https://blog.georankers.co/" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      Blog
                    </a>
                    <Link href="/geo-guide" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      GEO Guide
                    </Link>
                    <a href="/#faq" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      FAQ
                    </a>
                    <Link href="/help" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      Help Docs
                    </Link>
                  </div>
                )}
              </div>
              <a href="https://dashboard.georankers.co/login" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Login
              </a>
              <a href="https://calendly.com/hello-georankers/30min" target="_blank" rel="noopener noreferrer" className="border border-blue-500 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                Book a Demo
              </a>
              <a href="https://dashboard.georankers.co/register" className="gradient-primary hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-black transition-all duration-200">
                Try for Free
              </a>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <a href="https://calendly.com/hello-georankers/30min" target="_blank" rel="noopener noreferrer" className="border border-blue-500 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200">
                Demo
              </a>
              <a href="https://dashboard.georankers.co/register" className="gradient-primary hover:opacity-90 text-white px-3 py-1.5 rounded-lg text-xs font-black">
                Try Free
              </a>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 hover:text-blue-600 p-2">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4">
            <div className="space-y-3">
              <Link href="/" className="block text-slate-600 hover:text-blue-600 text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/features" className="block text-slate-600 hover:text-blue-600 text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Features
              </Link>
              <Link href="/pricing" className="block text-blue-600 font-semibold text-sm py-2" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </Link>
              <div>
                <button
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  className="w-full text-left text-slate-600 hover:text-blue-600 text-sm font-medium py-2 flex items-center justify-between"
                >
                  Resources
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`} />
                </button>
                {resourcesOpen && (
                  <div className="pl-4 space-y-2 mt-2">
                    <a href="https://blog.georankers.co/" className="block text-slate-500 hover:text-blue-600 text-sm py-1" onClick={() => setMobileMenuOpen(false)}>
                      Blog
                    </a>
                    <Link href="/geo-guide" className="block text-slate-500 hover:text-blue-600 text-sm py-1" onClick={() => setMobileMenuOpen(false)}>
                      GEO Guide
                    </Link>
                    <a href="/#faq" className="block text-slate-500 hover:text-blue-600 text-sm py-1" onClick={() => setMobileMenuOpen(false)}>
                      FAQ
                    </a>
                    <Link href="/help" className="block text-slate-500 hover:text-blue-600 text-sm py-1" onClick={() => setMobileMenuOpen(false)}>
                      Help Docs
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="hero-gradient absolute inset-0 z-0"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Simple, Transparent{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Pricing</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Choose the plan that fits your team. Start tracking your AI visibility today — no credit card required.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-medium ${!annual ? "text-slate-900" : "text-slate-500"}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${annual ? "bg-gradient-to-r from-blue-500 to-violet-500" : "bg-slate-300"}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${annual ? "translate-x-7" : ""}`}></div>
            </button>
            <span className={`text-sm font-medium ${annual ? "text-slate-900" : "text-slate-500"}`}>
              Quarterly
              <span className="ml-2 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Save up to 19%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 -mt-4 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto">
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
                      Most Popular
                    </div>
                  )}
                  <CardContent className={`p-6 sm:p-8 ${plan.highlighted ? "pt-10" : ""}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 bg-gradient-to-r ${plan.iconGradient} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
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
            <Card className="glass rounded-3xl border-0 shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-4 border-b border-slate-200/50 bg-slate-50/80">
                  <div className="p-6 flex items-center">
                    <span className="text-sm font-semibold text-slate-700">Feature</span>
                  </div>
                  <div className="p-6 text-center border-l border-slate-200/50">
                    <span className="text-sm font-bold text-slate-900">Launch</span>
                  </div>
                  <div className="p-6 text-center border-l border-slate-200/50 bg-violet-50/50">
                    <span className="text-sm font-bold text-slate-900">Grow</span>
                  </div>
                  <div className="p-6 text-center border-l border-slate-200/50">
                    <span className="text-sm font-bold text-slate-900">Enterprise</span>
                  </div>
                </div>

                {comparisonRows.map((row, i) => {
                  const renderCell = (value: string) => {
                    if (value === "yes") return <Check className="w-5 h-5 text-green-500 mx-auto" />;
                    if (value === "no") return <span className="text-slate-300">—</span>;
                    return <span className="text-slate-700 text-sm">{value}</span>;
                  };
                  return (
                    <div key={i} className={`grid grid-cols-4 ${i % 2 === 0 ? "bg-slate-50/50" : ""} ${i < comparisonRows.length - 1 ? "border-b border-slate-100" : ""}`}>
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

                <div className="grid grid-cols-4 border-t border-slate-200/50 bg-slate-50/30">
                  <div className="p-6"></div>
                  <div className="p-6 text-center border-l border-slate-200/50">
                    <a href="https://dashboard.georankers.co/register" className="block w-full py-2.5 rounded-xl text-sm font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-300 transition-colors">
                      Get Started <ArrowRight className="w-3.5 h-3.5 inline-block ml-1" />
                    </a>
                  </div>
                  <div className="p-6 text-center border-l border-slate-200/50 bg-violet-50/30">
                    <a href="https://dashboard.georankers.co/register" className="block w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white shadow-lg transition-all">
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
              <Card className="glass rounded-2xl border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-4 border-b border-slate-200/50 bg-slate-50/80">
                    <div className="p-4">
                      <span className="text-xs font-semibold text-slate-700">Feature</span>
                    </div>
                    <div className="p-4 text-center border-l border-slate-200/50">
                      <span className="text-xs font-bold text-slate-900">Launch</span>
                    </div>
                    <div className="p-4 text-center border-l border-slate-200/50 bg-violet-50/50">
                      <span className="text-xs font-bold text-slate-900">Grow</span>
                    </div>
                    <div className="p-4 text-center border-l border-slate-200/50">
                      <span className="text-xs font-bold text-slate-900">Enterprise</span>
                    </div>
                  </div>
                  {comparisonRows.map((row, i) => {
                    const renderCell = (value: string) => {
                      if (value === "yes") return <Check className="w-4 h-4 text-green-500 mx-auto" />;
                      if (value === "no") return <span className="text-slate-300">—</span>;
                      return <span className="text-slate-700 text-xs">{value}</span>;
                    };
                    return (
                      <div key={i} className={`grid grid-cols-4 ${i % 2 === 0 ? "bg-slate-50/50" : ""} ${i < comparisonRows.length - 1 ? "border-b border-slate-100" : ""}`}>
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

                  <div className="grid grid-cols-4 border-t border-slate-200/50 bg-slate-50/30">
                    <div className="p-4"></div>
                    <div className="p-4 text-center border-l border-slate-200/50">
                      <a href="https://dashboard.georankers.co/register" className="block w-full py-2 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-300 transition-colors">
                        Get Started
                      </a>
                    </div>
                    <div className="p-4 text-center border-l border-slate-200/50 bg-violet-50/30">
                      <a href="https://dashboard.georankers.co/register" className="block w-full py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg transition-all">
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
          <div className="bg-gradient-to-r from-blue-700 via-violet-700 to-blue-700 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
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
                      <p className="text-slate-600 leading-relaxed text-sm">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
