import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  Eye,
  BarChart3,
  MessageSquare,
  Zap,
  Bot,
  Send,
  CheckCircle,
  X,
  ArrowRight,
  Mail,
  Globe,
  Search,
  Map,
} from "lucide-react";
import { SiLinkedin, SiOpenai, SiGooglegemini, SiPerplexity, SiClaude, SiGithubcopilot } from "react-icons/si";
import Navbar from "@/components/Navbar";

function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      icon: Globe,
      iconGradient: "from-blue-500 to-cyan-500",
      cardBg: "from-blue-50/80 to-cyan-50/40",
      accentColor: "from-blue-500 to-cyan-500",
      glowColor: "bg-blue-400/20",
      stepColor: "text-blue-500",
      stepNum: "01",
      title: "Connect Your Domain",
      description: "Link your website and we'll start tracking your brand across AI search platforms.",
    },
    {
      icon: Search,
      iconGradient: "from-violet-500 to-purple-600",
      cardBg: "from-violet-50/80 to-purple-50/40",
      accentColor: "from-violet-500 to-purple-600",
      glowColor: "bg-violet-400/20",
      stepColor: "text-violet-500",
      stepNum: "02",
      title: "We Analyze AI Responses",
      description: "Our engine runs structured prompts across ChatGPT, Gemini, and more to measure your visibility.",
    },
    {
      icon: Map,
      iconGradient: "from-pink-500 to-rose-500",
      cardBg: "from-pink-50/80 to-rose-50/40",
      accentColor: "from-pink-500 to-rose-500",
      glowColor: "bg-pink-400/20",
      stepColor: "text-pink-500",
      stepNum: "03",
      title: "Get Insights & Roadmap",
      description: "Receive optimization insights and an authority roadmap to systematically improve your AI presence.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/80 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-14">
          <p
            className="text-sm font-semibold tracking-widest uppercase text-blue-500 mb-3"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            Getting Started
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}
          >
            How It Works
          </h2>
          <p
            className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
            Three simple steps to start tracking and improving your brand's AI search visibility
          </p>
        </div>

        <div className="relative grid sm:grid-cols-3 gap-6 sm:gap-8 mb-12">
          <div className="hidden sm:block absolute top-24 left-[20%] right-[20%] h-px">
            <div className="w-full h-full bg-gradient-to-r from-blue-300 via-violet-300 to-pink-300 opacity-60" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-400" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-violet-400" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-pink-400" />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className={`group relative rounded-2xl bg-gradient-to-br ${step.cardBg} p-8 sm:p-9 overflow-hidden text-center hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-500`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.5s ease ${0.3 + i * 0.15}s, transform 0.5s ease ${0.3 + i * 0.15}s, box-shadow 0.5s ease, translate 0.5s ease`,
                }}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.accentColor} group-hover:h-1.5 transition-all duration-300`} />
                <div className="absolute top-4 right-5 text-6xl sm:text-7xl font-black text-slate-900/[0.04] select-none leading-none">
                  {step.stepNum}
                </div>
                <div className="relative mb-5 inline-block">
                  <div className={`absolute -top-3 -left-3 w-24 h-24 ${step.glowColor} rounded-full blur-xl group-hover:scale-125 transition-transform duration-500`} />
                  <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.iconGradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className={`text-sm font-semibold ${step.stepColor} uppercase tracking-wider mb-2`}>Step {i + 1}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div
          className="text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease 0.8s, transform 0.5s ease 0.8s',
          }}
        >
          <a
            href="https://dashboard.georankers.co/register"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-xl font-semibold text-lg text-white transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Try for Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Features() {
  return (
    <div className="min-h-screen text-slate-900" style={{ overflowX: 'clip' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="hero-gradient absolute inset-0 z-0"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Own Your Brand's Presence in{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">AI Search</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-5">
            Track visibility across LLMs, benchmark competitors, decode prompts that matter, and systematically increase your AI authority — all from one intelligence layer.
          </p>
          <div className="flex items-center justify-center gap-5 sm:gap-7">
            <SiOpenai className="w-7 h-7 sm:w-8 sm:h-8 text-slate-500 opacity-60 hover:opacity-100 hover:text-slate-800 transition-all duration-300" title="ChatGPT" />
            <SiGooglegemini className="w-7 h-7 sm:w-8 sm:h-8 text-slate-500 opacity-60 hover:opacity-100 hover:text-blue-600 transition-all duration-300" title="Gemini" />
            <SiPerplexity className="w-7 h-7 sm:w-8 sm:h-8 text-slate-500 opacity-60 hover:opacity-100 hover:text-slate-800 transition-all duration-300" title="Perplexity" />
            <SiClaude className="w-7 h-7 sm:w-8 sm:h-8 text-slate-500 opacity-60 hover:opacity-100 hover:text-orange-500 transition-all duration-300" title="Claude" />
            <SiGithubcopilot className="w-7 h-7 sm:w-8 sm:h-8 text-slate-500 opacity-60 hover:opacity-100 hover:text-slate-800 transition-all duration-300" title="Copilot" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-violet-50/30 to-pink-50/20">
        <div className="max-w-6xl mx-auto">
          {/* Feature 1: AI Visibility Intelligence — Image Right */}
          <Card className="glass rounded-3xl p-4 sm:p-8 lg:p-10 mb-6 sm:mb-8 border-0">
            <CardContent className="pt-0">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl flex items-center justify-center mr-4">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">AI Visibility Intelligence</h3>
                  </div>
                  <p className="text-lg text-slate-600 mb-6">
                    Unified visibility scoring across ChatGPT, Google AI Mode, and AI Overviews. Instantly see whether your brand appears, where it ranks, and how often AI models recommend you.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">AI Visibility Score (weighted across LLMs)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Position tracking (Top, Mid, Low placement)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Brand mention frequency analysis</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Model-wise performance breakdown</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Sentiment detection (when available)</span>
                    </li>
                  </ul>
                </div>
                <div className="glass-strong rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-xl border border-blue-500/20">
                      <div className="text-4xl font-bold text-blue-600 mb-1">82</div>
                      <div className="text-sm text-slate-600">AI Visibility Score</div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                        <div className="text-lg font-bold text-green-600">Top</div>
                        <div className="text-xs text-slate-500">ChatGPT</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-lg border border-purple-500/20">
                        <div className="text-lg font-bold text-purple-600">Mid</div>
                        <div className="text-xs text-slate-500">Gemini</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-lg border border-orange-500/20">
                        <div className="text-lg font-bold text-orange-600">Top</div>
                        <div className="text-xs text-slate-500">Perplexity</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
                      <span className="text-slate-700 text-sm">Brand Mentions</span>
                      <span className="text-sm font-bold text-blue-600">147 this week</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                      <span className="text-slate-700 text-sm">Sentiment</span>
                      <span className="text-sm font-bold text-green-600">Positive (87%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 2: Competitive AI Benchmarking — Image Left */}
          <Card className="glass rounded-3xl p-4 sm:p-8 lg:p-10 mb-6 sm:mb-8 border-0">
            <CardContent className="pt-0">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="glass-strong rounded-2xl p-6">
                    <h4 className="font-bold mb-4 text-slate-900">Share of Voice — AI Responses</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-700">Your Brand</span>
                          <span className="text-sm font-bold text-blue-600">38%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" style={{width: '38%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-700">Competitor A</span>
                          <span className="text-sm font-bold text-red-500">29%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-red-400 to-orange-400 rounded-full" style={{width: '29%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-700">Competitor B</span>
                          <span className="text-sm font-bold text-yellow-600">20%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full" style={{width: '20%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-700">Others</span>
                          <span className="text-sm font-bold text-slate-500">13%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-300 rounded-full" style={{width: '13%'}}></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200/50">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <div className="text-xs text-slate-500">ChatGPT</div>
                          <div className="text-sm font-bold text-blue-600">#1</div>
                        </div>
                        <div className="p-2 bg-purple-50 rounded-lg">
                          <div className="text-xs text-slate-500">Gemini</div>
                          <div className="text-sm font-bold text-purple-600">#2</div>
                        </div>
                        <div className="p-2 bg-orange-50 rounded-lg">
                          <div className="text-xs text-slate-500">Perplexity</div>
                          <div className="text-sm font-bold text-orange-600">#1</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Competitive AI Benchmarking</h3>
                  </div>
                  <p className="text-lg text-slate-600 mb-6">
                    Understand which competitors AI models prefer and where you're losing authority.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Competitive visibility comparison charts</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Share of voice across AI responses</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Mention distribution by keyword cluster</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Intent-based competitive analysis</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Cross-model comparison</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 3: Prompt Intelligence Engine — Image Right */}
          <Card className="glass rounded-3xl p-4 sm:p-8 lg:p-10 mb-6 sm:mb-8 border-0">
            <CardContent className="pt-0">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Prompt Intelligence Engine</h3>
                  </div>
                  <p className="text-lg text-slate-600 mb-6">
                    Track real prompts AI is answering and monitor whether your brand is included in those responses.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Discovery, Use Case & Trust intent tracking</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Keyword-to-prompt mapping</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">ChatGPT, Google AI Mode & AI Overview tracking</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Brand mention detection</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Model-wise appearance logs</span>
                    </li>
                  </ul>
                </div>
                <div className="glass-strong rounded-2xl p-6">
                  <h4 className="font-bold mb-4 text-slate-900">Prompt Tracking</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-white/60 rounded-lg border border-slate-200/50">
                      <div className="text-sm font-medium text-slate-800 mb-2">"Best CRM for B2B startups"</div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center"><Check className="w-3 h-3 mr-1" />ChatGPT</span>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center"><Check className="w-3 h-3 mr-1" />Gemini</span>
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full flex items-center"><X className="w-3 h-3 mr-1" />Perplexity</span>
                      </div>
                    </div>
                    <div className="p-3 bg-white/60 rounded-lg border border-slate-200/50">
                      <div className="text-sm font-medium text-slate-800 mb-2">"Top marketing automation tools 2025"</div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center"><Check className="w-3 h-3 mr-1" />ChatGPT</span>
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full flex items-center"><X className="w-3 h-3 mr-1" />Gemini</span>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center"><Check className="w-3 h-3 mr-1" />Perplexity</span>
                      </div>
                    </div>
                    <div className="p-3 bg-white/60 rounded-lg border border-slate-200/50">
                      <div className="text-sm font-medium text-slate-800 mb-2">"Which SaaS has best integrations"</div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full flex items-center"><X className="w-3 h-3 mr-1" />ChatGPT</span>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center"><Check className="w-3 h-3 mr-1" />Gemini</span>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center"><Check className="w-3 h-3 mr-1" />Perplexity</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 4: AI Authority Optimization Engine — Image Left */}
          <Card className="glass rounded-3xl p-4 sm:p-8 lg:p-10 mb-6 sm:mb-8 border-0">
            <CardContent className="pt-0">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="glass-strong rounded-2xl p-6">
                    <h4 className="font-bold mb-4 text-slate-900">Strategic Recommendations</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border border-red-500/20">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-700">Publish comparison page vs Competitor A</span>
                          <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">High Impact</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-slate-500">Effort: Medium</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-500">Impact: High</span>
                        </div>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-lg border border-yellow-500/20">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-700">Add structured FAQ to pricing page</span>
                          <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">Quick Win</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-slate-500">Effort: Low</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-500">Impact: Medium</span>
                        </div>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-700">Create "use case" content cluster</span>
                          <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">Medium</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-slate-500">Effort: High</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-500">Impact: High</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200/50 flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      <span className="text-xs text-blue-700">3 recommendations completed this month</span>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">AI Authority Optimization Engine</h3>
                  </div>
                  <p className="text-lg text-slate-600 mb-6">
                    Turn AI visibility gaps into prioritized, high-impact execution plans.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Strategic AI recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Effort vs impact scoring</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">High / Medium / Quick Win tagging</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Content authority suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Success signal tracking</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 5: Dashboard Intelligence Chatbot — Image Right */}
          <Card className="glass rounded-3xl p-4 sm:p-8 lg:p-10 mb-6 sm:mb-8 border-0">
            <CardContent className="pt-0">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Dashboard Intelligence Chatbot</h3>
                  </div>
                  <p className="text-lg text-slate-600 mb-6">
                    Your always-on AI strategist inside the dashboard. Ask questions about your data, get instant optimization ideas, and uncover hidden insights — all through a simple chat interface.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Natural language queries on your visibility data</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">AI-powered optimization recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Competitive gap analysis on demand</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Content strategy ideation and prioritization</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Instant answers from your dashboard data</span>
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
                        Why is our visibility dropping on Gemini this week?
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white/80 border border-slate-200/50 text-slate-700 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[85%]">
                        Your Gemini visibility dropped 12% due to Competitor A publishing 3 new comparison pages. I recommend creating a detailed feature comparison and updating your integrations page.
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[85%]">
                        What quick wins can I act on today?
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white/80 border border-slate-200/50 text-slate-700 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[85%]">
                        3 quick wins found: Add FAQ schema to your pricing page, update your G2 profile, and respond to 2 Reddit threads mentioning your category.
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
        </div>
      </section>

      <HowItWorks />

      {/* Footer */}
      <footer className="relative py-16 sm:py-20 overflow-hidden bg-gradient-to-r from-blue-700 via-violet-700 to-blue-700">
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-56 h-56 bg-gradient-to-r from-violet-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-10 sm:gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-200 to-violet-200 bg-clip-text text-transparent">GeoRankers</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                AI Search Visibility Platform for B2B SaaS Teams
              </p>
              <a
                href="https://www.linkedin.com/company/georankers/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <SiLinkedin className="w-5 h-5 text-white" />
              </a>
            </div>

            <div>
              <p className="text-xs font-medium text-blue-200/70 uppercase tracking-widest mb-4">Quick Links</p>
              <div className="space-y-3">
                <Link href="/features" className="block text-white/80 hover:text-white text-sm transition-colors">
                  Features
                </Link>
                <Link href="/pricing" className="block text-white/80 hover:text-white text-sm transition-colors">
                  Pricing
                </Link>
                <a href="https://blog.georankers.co/" className="block text-white/80 hover:text-white text-sm transition-colors">
                  Blog
                </a>
                <Link href="/geo-guide" className="block text-white/80 hover:text-white text-sm transition-colors">
                  GEO Guide
                </Link>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-blue-200/70 uppercase tracking-widest mb-4">Contact</p>
              <a 
                href="mailto:hello@georankers.co"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm group"
              >
                <Mail className="w-4 h-4 mr-2 text-blue-200/70 group-hover:text-white transition-colors" />
                hello@georankers.co
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-blue-200/60 text-xs">
              © {new Date().getFullYear()} GeoRankers. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
