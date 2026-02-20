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
  Mail,
} from "lucide-react";

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const plans = [
    {
      name: "Launch",
      icon: <Rocket className="w-6 h-6 text-white" />,
      iconBg: "from-blue-500 to-cyan-500",
      monthlyPrice: 49,
      quarterlyPrice: 41,
      description: "Perfect for startups beginning their AI visibility journey.",
      features: [
        { label: "Seed Prompts", value: "3" },
        { label: "AI Prompts Tracked", value: "Up to 25" },
        { label: "LLMs Tracked", value: "ChatGPT" },
        { label: "Competitors Tracked", value: "3" },
        { label: "Region / ICP Filters", value: "1" },
        { label: "GEO Agent Intelligence", value: "10 conversations/day" },
        { label: "Seats", value: "1" },
        { label: "Daily Prompt Runs", value: "1" },
        { label: "Report Export", value: "—" },
        { label: "Integrations", value: "Google Analytics, GSC" },
        { label: "Support", value: "Email" },
        { label: "Dedicated Account Manager", value: "—" },
        { label: "Analytics History", value: "Last 2 Runs" },
        { label: "Dedicated GEO Specialist", value: "—" },
      ],
      cta: "Start Free Trial",
      ctaLink: "https://dashboard.georankers.co/register",
      popular: false,
    },
    {
      name: "Grow",
      icon: <Star className="w-6 h-6 text-white" />,
      iconBg: "from-violet-500 to-pink-500",
      monthlyPrice: 159,
      quarterlyPrice: 129,
      description: "For growing teams ready to dominate AI search visibility.",
      features: [
        { label: "Seed Prompts", value: "Up to 6" },
        { label: "AI Prompts Tracked", value: "Up to 50" },
        { label: "LLMs Tracked", value: "ChatGPT, Gemini, AIO, Perplexity*" },
        { label: "Competitors Tracked", value: "5" },
        { label: "Region / ICP Filters", value: "Up to 3" },
        { label: "GEO Agent Intelligence", value: "20 conversations/day" },
        { label: "Seats", value: "3" },
        { label: "Daily Prompt Runs", value: "1" },
        { label: "Report Export", value: "Yes" },
        { label: "Integrations", value: "Google Analytics, GSC" },
        { label: "Support", value: "Email, Slack" },
        { label: "Dedicated Account Manager", value: "—" },
        { label: "Analytics History", value: "Last 5 Runs" },
        { label: "Dedicated GEO Specialist", value: "—" },
      ],
      cta: "Start Free Trial",
      ctaLink: "https://dashboard.georankers.co/register",
      popular: true,
    },
    {
      name: "Enterprise",
      icon: <Building2 className="w-6 h-6 text-white" />,
      iconBg: "from-slate-700 to-slate-900",
      monthlyPrice: null,
      quarterlyPrice: null,
      description: "Tailored solutions for large organizations with custom needs.",
      features: [
        { label: "Seed Prompts", value: "Custom" },
        { label: "AI Prompts Tracked", value: "Custom" },
        { label: "LLMs Tracked", value: "ChatGPT, Gemini, AIO, Perplexity*" },
        { label: "Competitors Tracked", value: "Custom" },
        { label: "Region / ICP Filters", value: "Up to 5" },
        { label: "GEO Agent Intelligence", value: "Custom" },
        { label: "Seats", value: "Custom" },
        { label: "Daily Prompt Runs", value: "Custom" },
        { label: "Report Export", value: "Yes" },
        { label: "Integrations", value: "Google Analytics, GSC" },
        { label: "Support", value: "Email, Slack" },
        { label: "Dedicated Account Manager", value: "Yes" },
        { label: "Analytics History", value: "Custom" },
        { label: "Dedicated GEO Specialist", value: "Yes" },
      ],
      cta: "Contact Sales",
      ctaLink: "https://calendly.com/georankers/demo",
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "Is there a free trial available?",
      answer:
        "Yes! All paid plans come with a free trial so you can explore GeoRankers and see your AI visibility data before committing. No credit card required to start.",
    },
    {
      question: "What happens if I exceed my daily conversation limit with the GEO Agent?",
      answer:
        "If you go over your daily GEO Agent conversation limit, additional conversations are charged at just $0.01 per conversation (1 conversation = 1 user message + 1 bot response). You'll never lose access — you simply pay a small fee for extra usage.",
    },
    {
      question: "Can I upgrade or downgrade my plan at any time?",
      answer:
        "Absolutely. You can upgrade or downgrade your plan at any time. When upgrading, the price difference is prorated for the remainder of your billing cycle. Downgrades take effect at the start of your next billing period.",
    },
    {
      question: "What does 'Seed Prompts' mean?",
      answer:
        "Seed prompts are the core buyer-intent questions you want to track across AI models. For example, 'What is the best CRM for B2B startups?' — GeoRankers monitors how AI platforms respond to these prompts and whether your brand appears in the answers.",
    },
    {
      question: "Which AI models does GeoRankers track?",
      answer:
        "The Launch plan tracks ChatGPT. The Grow and Enterprise plans track ChatGPT, Google Gemini, AI Overviews, and Perplexity (coming soon). We're continuously adding new AI models as they gain market share.",
    },
    {
      question: "Do you offer custom pricing for agencies managing multiple clients?",
      answer:
        "Yes! We offer dedicated agency pricing with volume discounts, multi-client dashboards, and white-label reporting. Contact our sales team to discuss a custom package tailored to your agency's needs.",
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
              <Link href="/website-analysis" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Website AI Audit
              </Link>
              <a href="/#features" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Features
              </a>
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
                  </div>
                )}
              </div>
              <a href="https://dashboard.georankers.co/login" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Login
              </a>
              <a href="https://dashboard.georankers.co/register" className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                Try for Free
              </a>
            </div>

            <div className="md:hidden flex items-center space-x-3">
              <a href="https://dashboard.georankers.co/login" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Login
              </a>
              <a href="https://dashboard.georankers.co/register" className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
                Try for Free
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
              <Link href="/website-analysis" className="block text-slate-600 hover:text-blue-600 text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Website AI Audit
              </Link>
              <a href="/#features" className="block text-slate-600 hover:text-blue-600 text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Features
              </a>
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
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative rounded-3xl border-0 overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                plan.popular
                  ? "bg-gradient-to-b from-violet-50 to-white shadow-2xl shadow-violet-200/50 ring-2 ring-violet-400"
                  : "glass shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-violet-500 text-white text-center text-xs font-semibold py-1.5">
                  Most Popular
                </div>
              )}
              <CardContent className={`p-6 sm:p-8 ${plan.popular ? "pt-10" : ""}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-r ${plan.iconBg} rounded-xl flex items-center justify-center`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                </div>
                <p className="text-slate-600 text-sm mb-6">{plan.description}</p>

                <div className="mb-6">
                  {plan.monthlyPrice ? (
                    <>
                      <div className="flex items-end gap-1">
                        <span className="text-4xl font-bold text-slate-900">
                          ${annual ? plan.quarterlyPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-slate-500 text-sm mb-1">/month</span>
                      </div>
                      {annual && (
                        <p className="text-xs text-green-600 mt-1">
                          Billed quarterly · Save ${((plan.monthlyPrice - plan.quarterlyPrice!) * 3)}/quarter
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold text-slate-900">Custom</span>
                    </div>
                  )}
                </div>

                <a
                  href={plan.ctaLink}
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 mb-8 ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white shadow-lg"
                      : plan.name === "Enterprise"
                      ? "bg-slate-900 hover:bg-slate-800 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 inline-block ml-2" />
                </a>

                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start justify-between text-sm">
                      <span className="text-slate-600 flex items-start">
                        <Check className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${feature.value === "—" ? "text-slate-300" : "text-blue-500"}`} />
                        {feature.label}
                      </span>
                      <span className={`font-medium text-right ml-2 ${feature.value === "—" ? "text-slate-300" : "text-slate-800"}`}>
                        {feature.value}
                      </span>
                    </div>
                  ))}
                </div>

                {plan.name === "Grow" && (
                  <p className="text-xs text-slate-400 mt-4">*Perplexity tracking coming soon</p>
                )}
              </CardContent>
            </Card>
          ))}
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
                href="https://calendly.com/georankers/demo"
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
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass rounded-2xl border-0">
                <CardContent className="p-0">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full p-6 sm:p-8 text-left flex items-center justify-between hover:bg-white/20 transition-colors duration-300"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 pr-4">{faq.question}</h3>
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-700 via-violet-700 to-blue-700">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">
            Ready to Own Your AI Visibility?
          </h3>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join B2B SaaS teams already tracking and improving how AI recommends their brand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://dashboard.georankers.co/register"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Try for Free
            </a>
            <a
              href="https://calendly.com/georankers/demo"
              className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 sm:py-20 overflow-hidden bg-gradient-to-r from-blue-700 via-violet-700 to-blue-700">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-blue-200 to-violet-200 bg-clip-text text-transparent">GeoRankers</span>
            </div>
            <p className="text-white/60 mb-6 max-w-md mx-auto">
              AI Search Visibility Platform for B2B SaaS Teams
            </p>
            <div className="flex items-center justify-center gap-2 text-white/60 hover:text-white/80 transition-colors">
              <Mail className="w-4 h-4" />
              <a href="mailto:hello@georankers.co" className="text-sm">
                hello@georankers.co
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-white/40 text-sm">
              © {new Date().getFullYear()} GeoRankers. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
