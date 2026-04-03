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
  Rocket,
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
            className="text-xs font-black uppercase tracking-widest text-blue-500 mb-3"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            Getting Started
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.3] text-slate-900 mb-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}
          >
            How It Works
          </h2>
          <p
            className="text-base sm:text-lg font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed"
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
                className={`group relative rounded-[2.5rem] bg-gradient-to-br ${step.cardBg} p-8 sm:p-9 overflow-hidden text-center hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-500`}
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
                  <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${step.iconGradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className={`text-xs font-black ${step.stepColor} uppercase tracking-wider mb-2`}>Step {i + 1}</div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{step.title}</h3>
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
            className="inline-flex items-center px-8 py-4 gradient-primary hover:opacity-90 rounded-xl font-black text-lg text-white transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Try for Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}

function IntelligenceLoopSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % 5);
    }, 1800);

    return () => window.clearInterval(interval);
  }, []);

  const segments = [
    {
      label: "Query Modeling",
      shortLabel: "Query Modeling",
      description: "Map the real prompts buyers use when they ask AI tools for recommendations.",
      startAngle: -90,
      endAngle: -18,
    },
    {
      label: "Multi Model Capture",
      shortLabel: "Multi Model\nCapture",
      description: "Track how ChatGPT, Gemini, Perplexity, and other assistants surface your brand.",
      startAngle: -18,
      endAngle: 54,
    },
    {
      label: "Signal Interpretation",
      shortLabel: "Signal\nInterpretation",
      description: "Turn raw mentions, citations, and rankings into a clear explanation of what changed.",
      startAngle: 54,
      endAngle: 126,
    },
    {
      label: "Prescriptive Action",
      shortLabel: "Prescriptive\nAction",
      description: "Convert those signals into specific fixes, content gaps, and next best actions.",
      startAngle: 126,
      endAngle: 198,
    },
    {
      label: "Visibility Improvement",
      shortLabel: "Visibility\nImprovement",
      description: "Measure the lift and feed those gains back into the next analysis cycle.",
      startAngle: 198,
      endAngle: 270,
    },
  ];

  const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const describeWedge = (cx: number, cy: number, outerR: number, innerR: number, startAngle: number, endAngle: number) => {
    const outerStart = polarToCartesian(cx, cy, outerR, endAngle);
    const outerEnd = polarToCartesian(cx, cy, outerR, startAngle);
    const innerStart = polarToCartesian(cx, cy, innerR, startAngle);
    const innerEnd = polarToCartesian(cx, cy, innerR, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${outerR} ${outerR} 0 ${largeArcFlag} 0 ${outerEnd.x} ${outerEnd.y}`,
      `L ${innerStart.x} ${innerStart.y}`,
      `A ${innerR} ${innerR} 0 ${largeArcFlag} 1 ${innerEnd.x} ${innerEnd.y}`,
      "Z",
    ].join(" ");
  };

  const getLabelPosition = (startAngle: number, endAngle: number) => {
    const centerAngle = (startAngle + endAngle) / 2;
    return polarToCartesian(270, 270, 188, centerAngle);
  };

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-gradient-to-r from-blue-200/20 to-violet-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <p
          className="text-xs font-black uppercase tracking-widest text-blue-500 mb-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          The Intelligence Loop
        </p>
        <h2
          className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.3] text-slate-900 mb-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          How It All Connects
        </h2>
        <p
          className="text-base sm:text-lg font-medium text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          Think of AI visibility as a feedback loop, not a one-time ranking. Each cycle makes your positioning stronger.
        </p>

        <div
          className="hidden md:block relative w-[34rem] h-[34rem] mx-auto mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)",
            transition: "opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s",
          }}
        >
          <svg viewBox="0 0 540 540" className="absolute inset-0 w-full h-full drop-shadow-[0_30px_60px_rgba(148,163,184,0.18)]">
            <defs>
              <linearGradient id="loop-active-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dbeafe" />
                <stop offset="100%" stopColor="#eef2ff" />
              </linearGradient>
              <linearGradient id="loop-core-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f7df4" />
                <stop offset="100%" stopColor="#7357e8" />
              </linearGradient>
            </defs>

            <circle cx="270" cy="270" r="256" fill="rgba(255,255,255,0.92)" />

            {segments.map((segment, index) => {
              const isActiveSegment = index === activeIndex;
              return (
                <path
                  key={segment.label}
                  d={describeWedge(270, 270, 256, 108, segment.startAngle, segment.endAngle)}
                  fill={isActiveSegment ? "url(#loop-active-gradient)" : "rgba(255,255,255,0.94)"}
                  stroke="rgba(226,232,240,0.85)"
                  strokeWidth="2"
                  style={{
                    transition: "fill 500ms ease, opacity 500ms ease",
                    opacity: isActiveSegment ? 1 : 0.88,
                  }}
                />
              );
            })}

            <circle cx="270" cy="270" r="108" fill="white" />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[12.5rem] h-[12.5rem] rounded-full bg-gradient-to-br from-blue-500 to-violet-600 shadow-[0_30px_60px_rgba(99,102,241,0.28)] border-[6px] border-white flex items-center justify-center">
              <div className="text-center px-6">
                <p className="text-white font-black text-[1.05rem] tracking-wide leading-[1.15] uppercase">
                  AI Visibility
                  <br />
                  Intelligence
                </p>
                <div className="w-20 h-[3px] bg-white/75 rounded-full mx-auto mt-3" />
              </div>
            </div>
          </div>

          {segments.map((segment, index) => {
            const isActiveSegment = index === activeIndex;
            const labelPosition = getLabelPosition(segment.startAngle, segment.endAngle);
            return (
              <div
                key={segment.label}
                className="absolute pointer-events-none"
                style={{
                  left: `${(labelPosition.x / 540) * 100}%`,
                  top: `${(labelPosition.y / 540) * 100}%`,
                  transition: "transform 400ms ease, opacity 400ms ease",
                  transform: `translate(-50%, -50%) scale(${isActiveSegment ? 1.04 : 1})`,
                  opacity: isActiveSegment ? 1 : 0.9,
                }}
              >
                <p className="whitespace-pre-line text-center text-[0.95rem] font-black uppercase text-slate-900 leading-[1.05] min-w-[9rem]">
                  {segment.shortLabel}
                </p>
              </div>
            );
          })}
        </div>

        <div
          className="hidden md:block max-w-2xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s",
          }}
        >
          <div className="glass rounded-[1.75rem] px-6 py-4 border border-blue-100/80 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-blue-500 mb-2">
              Active Focus
            </p>
            <p className="text-lg font-black text-slate-900 mb-1">{segments[activeIndex].label}</p>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">{segments[activeIndex].description}</p>
          </div>
        </div>

        <div
          className="md:hidden max-w-sm mx-auto space-y-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
          }}
        >
          <div className="rounded-[2rem] bg-gradient-to-br from-blue-500 to-violet-600 shadow-[0_20px_50px_rgba(99,102,241,0.28)] border-[5px] border-white px-6 py-8 text-center">
            <p className="text-white font-black text-xl tracking-wide leading-[1.1] uppercase">
              AI Visibility
              <br />
              Intelligence
            </p>
          </div>

          {segments.map((segment, index) => {
            const isActiveSegment = index === activeIndex;
            return (
              <div
                key={segment.label}
                className={`rounded-[1.5rem] border px-4 py-4 text-left transition-all duration-500 ${
                  isActiveSegment
                    ? "bg-gradient-to-r from-blue-50 to-violet-50 border-blue-200 shadow-lg shadow-blue-100/60"
                    : "bg-white border-slate-200/80"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black transition-all duration-500 ${
                      isActiveSegment ? "text-white shadow-md" : "text-slate-500 bg-slate-100"
                    }`}
                    style={isActiveSegment ? { background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" } : {}}
                  >
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-black uppercase leading-tight ${isActiveSegment ? "text-slate-900" : "text-slate-700"}`}>
                      {segment.label}
                    </p>
                    <p className="text-xs font-medium text-slate-500 leading-relaxed mt-1">
                      {segment.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
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
              <SiGithubcopilot className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-slate-700" />
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Micro-label */}
          <div className="inline-flex items-center mb-4">
            <span
              className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest"
              style={{
                background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #3b82f6, #8b5cf6) border-box',
                border: '1.5px solid transparent',
              }}
            >
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                The Product System
              </span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.3] text-slate-900 mb-5">
            The AI Visibility Intelligence System
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl font-medium text-slate-600 max-w-2xl mx-auto mb-5 leading-relaxed">
            AI assistants are shaping product discovery. GeoRankers helps you understand how they evaluate, select, and recommend your brand.
          </p>

          {/* Callout box */}
          <div className="max-w-xl mx-auto mb-7 px-6 py-4 rounded-[1.5rem] border border-slate-200/60 bg-slate-50/80">
            <p className="text-sm sm:text-base font-medium text-slate-600 leading-relaxed">
              This is not just tracking. It is a{' '}
              <span className="font-black bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                structured intelligence layer
              </span>{' '}
              built for the AI search era.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://dashboard.georankers.co/register"
              className="inline-flex items-center px-6 py-3 gradient-primary hover:opacity-90 rounded-xl font-black text-base text-white transition-all duration-200 shadow-lg"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Try for Free
            </a>
            <a
              href="https://calendly.com/hello-georankers/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border-2 border-slate-300 hover:border-blue-400 rounded-xl font-semibold text-base text-slate-700 hover:text-blue-600 transition-all duration-200"
            >
              Book a Demo
            </a>
          </div>
          <p className="text-sm font-medium text-slate-400 mt-3">No credit card required</p>
        </div>
      </section>

      {/* Systems Problem Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.3] text-slate-900 mb-1">
                AI Visibility Is Not a Dashboard Problem.
              </h2>
              <p className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.3] mb-5 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                It Is a Systems Problem.
              </p>
              <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed mb-6">
                Most tools show mentions. But AI recommendations are influenced by a complex web of signals that require interpretation to become actionable.
              </p>
              <div className="rounded-[1.5rem] border border-slate-200/50 bg-slate-50 p-5">
                <p className="text-xs font-black text-slate-500 tracking-widest uppercase mb-3">Influencing Factors:</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Source trust", "Narrative consistency", "Citation overlap", "Competitive saturation"].map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                      <span className="text-blue-600 font-semibold text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: text + gradient card */}
            <div className="space-y-5">
              <p className="text-base font-medium text-slate-500 leading-relaxed">
                Without interpretation and execution guidance, visibility becomes another metric you cannot act on.
              </p>
            <div className="rounded-[2rem] p-8 text-white shadow-xl" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
              <h3 className="text-2xl font-black mb-3">Capture, Interpret, Prescribe.</h3>
              <p className="text-white/80 font-medium leading-relaxed mb-6">
                GeoRankers builds the full system required to turn raw AI model behavior into strategic category advantage.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://dashboard.georankers.co/register"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-blue-600 font-black rounded-xl text-sm hover:bg-white/90 transition-all duration-200"
                >
                  Try for Free
                </a>
                <a
                  href="https://calendly.com/hello-georankers/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 border-2 border-white/40 text-white font-semibold rounded-xl text-sm hover:border-white/70 transition-all duration-200"
                >
                  Book a Demo
                </a>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence Stack Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.3] text-center mb-2">
            <span className="text-slate-900">THE GEORANKERS </span>
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">INTELLIGENCE STACK</span>
          </h2>
          <p className="text-base font-medium text-slate-500 text-center mb-12">
            Three connected layers. One unified visibility engine.
          </p>

          <div className="space-y-4">
            {/* Layer 1 card */}
            <div className="rounded-[2rem] border border-slate-200/60 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 text-blue-700 text-xs font-black rounded-full px-3 py-1 uppercase tracking-wide">Layer 1</span>
                  <h3 className="text-lg font-black text-slate-900">Visibility Data Layer</h3>
                </div>
                <span className="text-sm font-medium text-slate-400">See Exactly Where AI Mentions Your Brand</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: Search, name: "AI Visibility Scanner", desc: "We execute structured, high intent prompts across major AI platforms and capture full responses, brand mentions, ranking position, and citations." },
                  { icon: Globe, name: "Citation Graph Engine", desc: "We map citation domains, authority overlap, and source concentration patterns that influence model decisions. You see which sources strengthen or weaken your visibility." },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/80 p-5">
                      <Icon className="w-5 h-5 text-blue-500 mb-3" />
                      <p className="font-black text-slate-900 text-sm mb-1">{item.name}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Black CTA strip */}
            <div className="bg-slate-900 rounded-[1.5rem] px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="font-black text-white">Data is only half the battle.</p>
                <p className="text-sm text-white/60">Discover how Layer 2 translates raw data into structured category intelligence.</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <a href="https://dashboard.georankers.co/register" className="inline-flex items-center px-4 py-2 gradient-primary text-white font-black rounded-lg text-sm">Try for Free</a>
                <a href="https://calendly.com/hello-georankers/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-white/20 text-white font-semibold rounded-lg text-sm hover:border-white/40 transition-colors">Book a Demo</a>
              </div>
            </div>

            {/* Layer 2 card */}
            <div className="rounded-[2rem] border border-slate-200/60 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <span className="bg-violet-100 text-violet-700 text-xs font-black rounded-full px-3 py-1 uppercase tracking-wide">Layer 2</span>
                  <h3 className="text-lg font-black text-slate-900">Interpretation Intelligence</h3>
                </div>
                <span className="text-sm font-medium text-slate-400">Quantify AI Trust and Presence</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { name: "GEO Score", desc: "The GEO Score normalizes cross model visibility signals into a structured visibility and trust metric. Track how your AI standing evolves over time." },
                  { name: "Narrative Gap Detection", desc: "AI models synthesize from multiple sources. If your positioning is inconsistent across web assets, your visibility weakens. We identify narrative drift." },
                  { name: "Competitive Mapping", desc: "See how often competitors appear, where they dominate, and which citations strengthen their visibility. Turn AI competition into insight." },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/80 p-5">
                    <p className="font-black text-slate-900 text-sm mb-1">{item.name}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient CTA strip */}
            <div className="rounded-[1.5rem] px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
              <div>
                <p className="font-black text-white">Turn Insight into Execution.</p>
                <p className="text-sm text-white/70">Layer 3 provides prescriptive actions to close visibility gaps and lead your category narrative.</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <a href="https://dashboard.georankers.co/register" className="inline-flex items-center px-4 py-2 bg-white text-blue-600 font-black rounded-lg text-sm hover:bg-white/90 transition-colors">Try for Free</a>
                <a href="https://calendly.com/hello-georankers/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-white/30 text-white font-semibold rounded-lg text-sm hover:border-white/60 transition-colors">Book a Demo</a>
              </div>
            </div>

            {/* Layer 3 card */}
            <div className="rounded-[2rem] border border-slate-200/60 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <span className="bg-green-100 text-green-700 text-xs font-black rounded-full px-3 py-1 uppercase tracking-wide">Layer 3</span>
                  <h3 className="text-lg font-black text-slate-900">Execution Layer</h3>
                </div>
                <span className="text-sm font-medium text-slate-400">Know Exactly What to Improve</span>
              </div>
              <div className="grid lg:grid-cols-2 gap-6 items-start">
                <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-5">
                  <Zap className="w-5 h-5 text-green-500 mb-3" />
                  <p className="font-black text-slate-900 text-sm mb-2">Prescriptive Action Engine</p>
                  <p className="text-xs text-slate-500 leading-relaxed">GeoRankers translates visibility signals into prioritized, execution-ready recommendations tied directly to model behavior. No generic SEO advice. Clear next steps.</p>
                </div>
                <div className="space-y-2">
                  {[
                    { tag: "High Impact", color: "bg-red-50 text-red-600 border-red-100", action: "Publish technical comparison page targeting fintech CRM queries" },
                    { tag: "Quick Win", color: "bg-yellow-50 text-yellow-700 border-yellow-100", action: "Update G2 profile with new AI-era positioning language" },
                    { tag: "Medium", color: "bg-green-50 text-green-700 border-green-100", action: "Earn citation from TechCrunch via product announcement" },
                  ].map((a, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                      <span className={`text-xs font-black px-2 py-0.5 rounded-full border flex-shrink-0 ${a.color}`}>{a.tag}</span>
                      <span className="text-slate-600 text-xs leading-relaxed">{a.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-violet-50/30 to-pink-50/20">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-black uppercase tracking-widest text-blue-500 text-center mb-3">
            The Full Feature Set
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.3] text-slate-900 text-center mb-10">
            Everything You Need to Win in AI Search
          </h2>

          {/* Feature 1: AI Visibility Intelligence — Image Right */}
          <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 mb-6 sm:mb-8 border-0">
            <CardContent className="pt-0">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-[1.5rem] flex items-center justify-center mr-4">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">AI Visibility Intelligence</h3>
                  </div>
                  <p className="text-lg font-medium text-slate-600 mb-2">
                    See Where Your Brand Shows Up in AI Answers
                  </p>
                  <p className="text-base text-slate-500 mb-6 leading-relaxed">
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
                      <div className="text-4xl font-black text-blue-600 mb-1">82</div>
                      <div className="text-sm text-slate-600">AI Visibility Score</div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                        <div className="text-lg font-black text-green-600">Top</div>
                        <div className="text-xs text-slate-500">ChatGPT</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-lg border border-purple-500/20">
                        <div className="text-lg font-black text-purple-600">Mid</div>
                        <div className="text-xs text-slate-500">Gemini</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-lg border border-orange-500/20">
                        <div className="text-lg font-black text-orange-600">Top</div>
                        <div className="text-xs text-slate-500">Perplexity</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
                      <span className="text-slate-700 text-sm">Brand Mentions</span>
                      <span className="text-sm font-black text-blue-600">147 this week</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                      <span className="text-slate-700 text-sm">Sentiment</span>
                      <span className="text-sm font-black text-green-600">Positive (87%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 2: Competitive AI Benchmarking — Image Left */}
          <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 mb-6 sm:mb-8 border-0">
            <CardContent className="pt-0">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="glass-strong rounded-2xl p-6">
                    <h4 className="font-black mb-4 text-slate-900">Share of Voice — AI Responses</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-700">Your Brand</span>
                          <span className="text-sm font-black text-blue-600">38%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" style={{width: '38%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-700">Competitor A</span>
                          <span className="text-sm font-black text-red-500">29%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-red-400 to-orange-400 rounded-full" style={{width: '29%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-700">Competitor B</span>
                          <span className="text-sm font-black text-yellow-600">20%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full" style={{width: '20%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-700">Others</span>
                          <span className="text-sm font-black text-slate-500">13%</span>
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
                          <div className="text-sm font-black text-blue-600">#1</div>
                        </div>
                        <div className="p-2 bg-purple-50 rounded-lg">
                          <div className="text-xs text-slate-500">Gemini</div>
                          <div className="text-sm font-black text-purple-600">#2</div>
                        </div>
                        <div className="p-2 bg-orange-50 rounded-lg">
                          <div className="text-xs text-slate-500">Perplexity</div>
                          <div className="text-sm font-black text-orange-600">#1</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-[1.5rem] flex items-center justify-center mr-4">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Competitive AI Benchmarking</h3>
                  </div>
                  <p className="text-lg font-medium text-slate-600 mb-2">
                    Discover the Exact Queries Where Competitors Get Recommended Instead of You
                  </p>
                  <p className="text-base text-slate-500 mb-6 leading-relaxed">
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
          <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 mb-6 sm:mb-8 border-0">
            <CardContent className="pt-0">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-[1.5rem] flex items-center justify-center mr-4">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Prompt Intelligence Engine</h3>
                  </div>
                  <p className="text-lg font-medium text-slate-600 mb-2">
                    Discover the Exact Queries Where Competitors Get Recommended Instead of You
                  </p>
                  <p className="text-base text-slate-500 mb-6 leading-relaxed">
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
                  <h4 className="font-black mb-4 text-slate-900">Prompt Tracking</h4>
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
          <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 mb-6 sm:mb-8 border-0">
            <CardContent className="pt-0">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="glass-strong rounded-2xl p-6">
                    <h4 className="font-black mb-4 text-slate-900">Strategic Recommendations</h4>
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
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-[1.5rem] flex items-center justify-center mr-4">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">AI Authority Optimization Engine</h3>
                  </div>
                  <p className="text-lg font-medium text-slate-600 mb-2">
                    Get Prioritized Actions to Earn a Spot in AI Recommendations
                  </p>
                  <p className="text-base text-slate-500 mb-6 leading-relaxed">
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
          <Card className="glass rounded-[2.5rem] p-4 sm:p-8 lg:p-10 mb-6 sm:mb-8 border-0">
            <CardContent className="pt-0">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[1.5rem] flex items-center justify-center mr-4">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Dashboard Intelligence Chatbot</h3>
                  </div>
                  <p className="text-lg font-medium text-slate-600 mb-2">
                    Ask Anything About Your AI Visibility
                  </p>
                  <p className="text-base text-slate-500 mb-6 leading-relaxed">
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
                    <h4 className="font-black text-slate-900">GeoRankers AI</h4>
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

      <IntelligenceLoopSection />

      {/* What You Actually Get Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-black uppercase tracking-widest text-blue-500 text-center mb-3">
            Tangible Outcomes
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.3] text-slate-900 text-center mb-4">
            What You Actually Get
          </h2>
          <p className="text-base sm:text-lg font-medium text-slate-500 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            Not dashboards for the sake of dashboards. Answers to the questions that drive decisions.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              "Clear view of how AI models describe your brand",
              "Visibility share across high-intent queries",
              "Competitive positioning inside AI answers — see who's ahead and why",
              "Exact gaps preventing AI recommendations",
              "Actionable steps to improve visibility, prioritized by impact",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 glass rounded-[2rem] p-5 hover:-translate-y-1 transition-all duration-300">
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
                >
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="font-semibold text-slate-800 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://dashboard.georankers.co/register"
              className="inline-flex items-center px-7 py-4 gradient-primary hover:opacity-90 rounded-2xl font-black text-lg text-white transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Try for Free
            </a>
            <p className="text-sm font-medium text-slate-400 mt-3">No credit card required</p>
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-[2.5rem] p-10 sm:p-14 text-center shadow-2xl" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
            <p className="text-xs font-black uppercase tracking-widest text-white/70 mb-4">
              Start Today
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.3] text-white mb-5">
              Turn AI Visibility Into Strategic Advantage
            </h2>
            <p className="text-lg font-medium text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
              See how AI models interpret your brand. Understand what influences that interpretation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://dashboard.georankers.co/register"
                className="inline-flex items-center px-7 py-3 bg-white text-blue-600 font-black text-base rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Try for Free
              </a>
              <a
                href="https://calendly.com/hello-georankers/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-7 py-3 border-2 border-white/40 text-white font-semibold text-base rounded-xl hover:border-white/70 transition-all duration-200"
              >
                Book a Demo
              </a>
            </div>
            <p className="text-sm font-medium text-white/50 mt-4">No credit card required</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 sm:py-20 overflow-hidden bg-slate-900">
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-56 h-56 bg-gradient-to-r from-violet-400/20 to-pink-400/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-10 sm:gap-8 mb-12">
            <div>
              <div className="text-2xl font-black mb-4">
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
              <p className="text-xs font-black text-blue-200/70 uppercase tracking-widest mb-4">Quick Links</p>
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
                <Link href="/help" className="block text-white/80 hover:text-white text-sm transition-colors">
                  Help Docs
                </Link>
              </div>
            </div>

            <div>
              <p className="text-xs font-black text-blue-200/70 uppercase tracking-widest mb-4">Contact</p>
              <a
                href="mailto:hello@georankers.co"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm group"
              >
                <Mail className="w-4 h-4 mr-2 text-blue-200/70 group-hover:text-white transition-colors" />
                hello@georankers.co
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-blue-200/60 text-xs">
              © {new Date().getFullYear()} GeoRankers. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="text-blue-200/60 hover:text-white text-xs transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="text-blue-200/60 hover:text-white text-xs transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
