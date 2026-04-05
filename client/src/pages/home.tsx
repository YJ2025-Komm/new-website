import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Brain,
  Eye,
  Search,
  BarChart3,
  Globe,
  Zap,
  TrendingUp,
  Rocket,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  HelpCircle,
  Menu,
  X,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SiLinkedin, SiOpenai, SiGooglegemini, SiPerplexity, SiClaude, SiGithubcopilot } from "react-icons/si";
import geminiLogo from "@assets/Gemini_1753958628531.png";
import grokLogo from "@assets/Grok_1753958628535.png";
import openaiLogo from "@assets/Open Ai_1753958628536.png";
import perplexityLogo from "@assets/Perplexity_1753958628538.png";

// Featured blog images
import strategicImage from '@assets/generated_images/Strategic_AI_search_leadership_2959319a.png';
import buildingBlocksImage from '@assets/generated_images/AI_content_building_blocks_237b4917.png';
import geoVsSeoImage from '@assets/generated_images/GEO_vs_SEO_comparison_96025f03.png';
import dashImg1 from '@assets/gr1_1772251203326.png';
import dashImg2 from '@assets/gr2_1772251203323.png';
import dashImg3 from '@assets/gr3_1772251203321.png';
import dashImg4 from '@assets/gr4_1772251203317.png';

// WordPress API types
interface WordPressBlogPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  link: string;
  date: string;
  categories: number[];
  featured_media: number;
  featured_image_url?: string;
}

interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
}


function VisibilityGapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const problems = [
    {
      label: "PROBLEM 01 — HIGH INTENT PROMPTS",
      title: "Missing from high intent prompts",
      description: "You do not appear when buyers ask for the best tools in your category. These high-intent moments are where purchase decisions are made — before a prospect ever visits your website.",
      visual: (
        <div className="bg-slate-900 rounded-xl p-5 font-mono">
          <div className="flex gap-1.5 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <p className="text-slate-400 text-xs mb-4">PROMPT: "Best B2B CRM for fintech startups"</p>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 text-xs font-bold">✓</span>
              <span className="text-emerald-400 text-xs">Competitor A — mentioned 4 times</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 text-xs font-bold">✓</span>
              <span className="text-emerald-400 text-xs">Competitor B — mentioned 2 times</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-red-400 text-xs font-bold">✗</span>
              <span className="text-red-400 text-xs">Your Brand — not found in response</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "PROBLEM 02 — COMPETITIVE SIGNALS",
      title: "Competitors dominate recommendations",
      description: "AI models rely on repeated signals across content and citations, often reinforcing the same vendors. Brands that appear consistently across authoritative sources get recommended first.",
      visual: (
        <div className="space-y-4">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">AI mention rate across 50 buyer-intent prompts</p>
          {[
            { name: "Competitor A", pct: 88, isYou: false },
            { name: "Competitor B", pct: 64, isYou: false },
            { name: "Your Brand", pct: 12, isYou: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className={`text-xs w-28 font-semibold flex-shrink-0 ${item.isYou ? 'text-red-500' : 'text-slate-600'}`}>{item.name}</span>
              <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${item.pct}%`,
                    background: item.isYou ? '#ef4444' : 'linear-gradient(135deg, #2994FF, #7575FF)',
                  }}
                ></div>
              </div>
              <span className={`text-xs font-black w-8 flex-shrink-0 ${item.isYou ? 'text-red-500' : 'text-blue-500'}`}>{item.pct}%</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "PROBLEM 03 — BRAND PERCEPTION",
      title: "Positioning is inconsistent",
      description: "Your product may be described incorrectly, placed in the wrong category, or ranked below where it should be. AI positioning distorts buyer perception before they ever reach you.",
      visual: (
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">AI Response Excerpt</p>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            "[Your Brand] is primarily a reporting tool, best suited for analytics teams. For CRM use cases, consider Competitor A which offers deeper pipeline management..."
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-red-100 text-red-600 px-2.5 py-1 rounded-full font-semibold">Wrong Category</span>
            <span className="text-xs bg-orange-100 text-orange-600 px-2.5 py-1 rounded-full font-semibold">Competitor Preferred</span>
            <span className="text-xs bg-yellow-100 text-yellow-600 px-2.5 py-1 rounded-full font-semibold">Misrepresented</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/80 via-white to-violet-50/80">
      <div className="max-w-6xl mx-auto">
        {/* Centered header */}
        <div
          className="text-center mb-12"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
        >
          <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-4">THE PROBLEM</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-slate-900 mb-1">
            What You Cannot See in AI Search
          </h2>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] mb-5 bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
            Is Already Costing You
          </p>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Your SEO may look strong, yet AI systems can still exclude your brand, favor competitors, or misrepresent your positioning. That gap is invisible in traditional analytics, but it directly impacts pipeline.
          </p>
        </div>

        {/* Interactive tabs */}
        <div
          className="grid lg:grid-cols-[5fr_7fr] gap-6 items-start"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s' }}
        >
          {/* Left: clickable problem list */}
          <div className="space-y-3">
            {problems.map((p, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left rounded-[1.5rem] p-5 transition-all duration-300 ${
                  activeIndex === i
                    ? 'gradient-cta shadow-lg'
                    : 'glass border border-slate-100/80 hover:bg-white/90'
                }`}
              >
                <p className={`text-[10px] font-black uppercase tracking-widest mb-1.5 ${activeIndex === i ? 'text-white/70' : 'text-blue-500'}`}>
                  {p.label}
                </p>
                <h3 className={`text-base font-black leading-snug ${activeIndex === i ? 'text-white' : 'text-slate-900'}`}>
                  {p.title}
                </h3>
              </button>
            ))}

            {/* CTAs below tabs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="https://dashboard.georankers.co/register"
                className="inline-flex items-center justify-center px-6 py-3 gradient-cta text-white font-black rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg"
                data-testid="cta-try-free-gap"
              >
                Try for Free
              </a>
              <a
                href="https://calendly.com/hello-georankers/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-300 text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200"
                data-testid="cta-book-demo-gap"
              >
                Book a Demo
              </a>
            </div>
          </div>

          {/* Right: dynamic content panel */}
          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-7 min-h-[320px]">
            {problems.map((p, i) => (
              <div
                key={i}
                style={{
                  display: activeIndex === i ? 'block' : 'none',
                }}
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-3">{p.label}</p>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 leading-[1.3]">{p.title}</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">{p.description}</p>
                {p.visual}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const dashboardSlides = [
  {
    image: dashImg1,
    alt: "GeoRankers Competitive Landscape — bar chart and radar chart showing brand positioning vs competitors",
    caption: "See how you stack up against competitors in AI search results",
  },
  {
    image: dashImg2,
    alt: "GeoRankers AI Prompts & Query Analysis — keyword groups with brand mention scores",
    caption: "Discover the exact prompts AI is answering about your industry",
  },
  {
    image: dashImg3,
    alt: "GeoRankers Strategic Recommendations — actionable insights with impact levels",
    caption: "Get data-driven actions prioritized by impact to boost your AI presence",
  },
  {
    image: dashImg4,
    alt: "GeoRankers Overall Insights — AI Visibility Score and brand mention breakdown",
    caption: "Track your AI Visibility Score and brand mention share across LLMs",
  },
];

function DashboardCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % dashboardSlides.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const goTo = (index: number) => {
    setCurrent(index);
    startTimer();
  };

  const prev = () => goTo((current - 1 + dashboardSlides.length) % dashboardSlides.length);
  const next = () => goTo((current + 1) % dashboardSlides.length);

  return (
    <div className="max-w-6xl mx-auto mt-4 sm:mt-6">
      <div className="relative group">
        <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200/60 relative bg-white">
          {dashboardSlides.map((slide, i) => (
            <div
              key={i}
              className={i === 0 ? 'relative' : 'absolute inset-0'}
              style={{
                opacity: current === i ? 1 : 0,
                transition: 'opacity 0.6s ease-in-out',
                pointerEvents: current === i ? 'auto' : 'none',
              }}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg border border-slate-200 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 hover:bg-white z-10"
          aria-label="Previous screenshot"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg border border-slate-200 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 hover:bg-white z-10"
          aria-label="Next screenshot"
        >
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="inline-block text-sm sm:text-lg lg:text-xl font-medium text-slate-800 mb-3 px-4 sm:px-5 py-1.5 sm:py-2 bg-slate-100/80 rounded-xl sm:rounded-full transition-all duration-300 max-w-[90vw]">
          {dashboardSlides[current].caption}
        </p>
        <div className="flex items-center justify-center gap-2">
          {dashboardSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-8'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              style={i === current ? { background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' } : {}}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  // Static blog posts data to ensure immediate display
  const staticBlogPosts: WordPressBlogPost[] = [
    {
      id: 1,
      title: { rendered: "Strategic Imperatives for Marketing Leaders, Product Teams, and Founders in the Age of AI Search" },
      excerpt: { rendered: "Essential strategic frameworks for leadership teams navigating the fundamental shift from traditional search to AI-powered discovery." },
      link: "https://blog.georankers.co/2025/08/19/strategic-imperatives-for-marketing-leaders-product-teams-and-founders-in-the-age-of-ai-search/",
      date: "2025-08-19T00:00:00",
      categories: [1],
      featured_media: 1,
      featured_image_url: strategicImage
    },
    {
      id: 2,
      title: { rendered: "Generative Engine Optimization: Building Blocks of AI‑Ready Content" },
      excerpt: { rendered: "Master the fundamental building blocks that make your content discoverable and recommendable by AI engines." },
      link: "https://blog.georankers.co/2025/08/15/generative-engine-optimization-building-blocks-of-ai%e2%80%91ready-content/",
      date: "2025-08-15T00:00:00",
      categories: [2],
      featured_media: 2,
      featured_image_url: buildingBlocksImage
    },
    {
      id: 3,
      title: { rendered: "GEO vs SEO: What is Real, What is Hype, and What You Actually Need to Track" },
      excerpt: { rendered: "Cut through the noise and understand the practical differences between traditional SEO and generative engine optimization." },
      link: "https://blog.georankers.co/2025/08/08/hello-world/",
      date: "2025-08-08T00:00:00",
      categories: [2],
      featured_media: 3,
      featured_image_url: geoVsSeoImage
    }
  ];

  const staticCategories: WordPressCategory[] = [
    { id: 1, name: "Strategic Frameworks", slug: "strategic-frameworks" },
    { id: 2, name: "AI Search & GEO", slug: "ai-search-geo" }
  ];

  // Use static data to ensure reliable display
  const blogPosts = staticBlogPosts;
  const categories = staticCategories;
  const postsLoading = false;
  const postsError = null;

  const homeFaqs = [
    {
      question: "What is AI search optimization and why do I need it?",
      answer:
        "AI search optimization ensures your brand appears when users ask AI models like ChatGPT, Gemini, or Claude for recommendations in your industry. Unlike traditional SEO that targets Google, AI search optimization focuses on how large language models surface and recommend content. As more people use AI for discovery and decision-making, being invisible in AI results means losing potential customers to competitors.",
    },
    {
      question: "How is AI search different from Google SEO?",
      answer:
        "Traditional SEO optimizes for search engine algorithms and keyword rankings. AI search optimization focuses on how language models understand context, authority, and relevance when generating responses. AI models consider factors like content quality, brand mentions across the web, and topical expertise rather than just keywords and backlinks. The strategies and metrics are fundamentally different.",
    },
    {
      question: "Which AI platforms does GeoRankers monitor?",
      answer:
        "GeoRankers tracks brand visibility across major AI platforms including ChatGPT, Google Gemini, Perplexity, Claude, and other leading AI models. We monitor how often your brand appears in AI-generated responses, the context of mentions, and your competitive positioning across these platforms.",
    },
    {
      question: "How long does it take to see results from AI search optimization?",
      answer:
        "AI search visibility typically improves over 3-6 months with consistent optimization efforts. Unlike traditional SEO, AI models update their training data less frequently, so changes take time to propagate. However, our predictive forecasting helps you target emerging topics before competitors, giving you a head start on visibility for new trends.",
    },
    {
      question: "What makes GeoRankers different from other marketing tools?",
      answer:
        "GeoRankers is specifically built for the new AI search paradigm. While traditional marketing tools focus on Google rankings and social media metrics, we provide intelligence on AI model behavior, predictive trend analysis, and optimization strategies that work with language models. We're the first platform designed specifically for AI search visibility.",
    },
    {
      question: "Can small companies compete with enterprise brands in AI search?",
      answer:
        "Yes! AI search creates new opportunities for smaller companies to compete based on expertise and relevance rather than just budget and domain authority. By focusing on specific niches, creating high-quality content, and building topical authority, smaller companies can often outrank larger competitors in AI-generated responses for their specialty areas.",
    },
    {
      question: "How often does GeoRankers refresh my visibility data?",
      answer:
        "You can manually trigger a fresh analysis once every 24 hours. Each run can use your existing set of seed prompts or a new set - useful if you want to test different buyer queries or expand your category coverage. This lets you track whether your content or positioning changes are having an impact over time.",
    },
    {
      question: "Do I need technical expertise to use GeoRankers?",
      answer:
        "No technical expertise required. GeoRankers is designed for marketing teams, content managers, and business leaders. Our platform provides clear, actionable insights and recommendations that your team can implement using existing content and marketing workflows. We translate complex AI behavior into practical marketing strategies.",
    },
    {
      question: "How does GeoRankers track AI visibility?",
      answer:
        "GeoRankers simulates buyer-intent prompts across multiple AI models, analyzes brand mentions and citations, and benchmarks competitor presence.",
    },
    {
      question: "Why is my competitor showing up in ChatGPT but not my brand?",
      answer:
        "AI models often recommend brands that are more frequently cited, well-structured, and contextually relevant across trusted web sources.",
    },
  ];

  // Helper function to get category name
  const getCategoryName = (categoryIds: number[]): string => {
    if (!categories || !categoryIds.length) return 'Blog';
    const category = categories.find(cat => categoryIds.includes(cat.id));
    return category?.name || 'Blog';
  };

  // Helper function to clean HTML from excerpt
  const cleanExcerpt = (excerpt: string): string => {
    return excerpt.replace(/<[^>]*>/g, '').replace(/\[&hellip;\]/, '...').trim();
  };

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper function to get icon for category
  const getCategoryIcon = (categoryIds: number[]) => {
    if (!categories || !categoryIds.length) return <Lightbulb className="w-12 h-12 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />;

    const category = categories.find(cat => categoryIds.includes(cat.id));
    const categorySlug = category?.slug || '';

    if (categorySlug.includes('strategic') || categorySlug.includes('framework')) {
      return <ClipboardCheck className="w-12 h-12 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />;
    } else if (categorySlug.includes('geo') || categorySlug.includes('ai-search')) {
      return <TrendingUp className="w-12 h-12 text-emerald-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />;
    } else {
      return <Lightbulb className="w-12 h-12 text-violet-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />;
    }
  };

  const scrollToFAQ = () => {
    document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle hash navigation on page load
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    // Handle initial page load with hash
    handleHashNavigation();

    // Handle hash changes (when user clicks hash links)
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  // Add structured data schema for SEO
  useEffect(() => {
    // Organization Schema
    let orgSchema = document.querySelector('script[type="application/ld+json"]#org-schema');
    if (!orgSchema) {
      orgSchema = document.createElement('script');
      orgSchema.setAttribute('type', 'application/ld+json');
      orgSchema.setAttribute('id', 'org-schema');
      document.head.appendChild(orgSchema);
    }
    orgSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "GeoRankers",
      "url": "https://georankers.co",
      "logo": "https://georankers.co/logo.png",
      "description": "GeoRankers is the definitive AI search optimization platform that helps B2B SaaS companies track, optimize, and build brand authority in AI search across ChatGPT, Gemini, Perplexity, and Claude.",
      "sameAs": [
        "https://blog.georankers.co"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "url": "https://georankers.co"
      }
    });

    // WebSite Schema
    let websiteSchema = document.querySelector('script[type="application/ld+json"]#website-schema');
    if (!websiteSchema) {
      websiteSchema = document.createElement('script');
      websiteSchema.setAttribute('type', 'application/ld+json');
      websiteSchema.setAttribute('id', 'website-schema');
      document.head.appendChild(websiteSchema);
    }
    websiteSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "GeoRankers",
      "url": "https://georankers.co",
      "description": "AI Search Optimization Platform for B2B SaaS - Track and optimize your brand visibility across ChatGPT, Gemini, Perplexity, and Claude",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://georankers.co/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    });

    // FAQPage Schema
    let faqSchema = document.querySelector('script[type="application/ld+json"]#faq-schema');
    if (!faqSchema) {
      faqSchema = document.createElement('script');
      faqSchema.setAttribute('type', 'application/ld+json');
      faqSchema.setAttribute('id', 'faq-schema');
      document.head.appendChild(faqSchema);
    }
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is GeoRankers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "GeoRankers is an AI search optimization platform specifically designed for B2B and SaaS companies. We help brands track, analyze, and improve their visibility in AI-generated search results across platforms like ChatGPT, Google Gemini, Perplexity, and Claude. Unlike traditional SEO tools, we focus on how AI models understand and recommend your brand."
          }
        },
        {
          "@type": "Question",
          "name": "How is AI search optimization different from traditional SEO?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Traditional SEO optimizes for search engine algorithms and keyword rankings. AI search optimization focuses on how language models understand context, authority, and relevance when generating responses. AI models consider factors like content quality, brand mentions across the web, and topical expertise rather than just keywords and backlinks. The strategies and metrics are fundamentally different."
          }
        },
        {
          "@type": "Question",
          "name": "Which AI platforms does GeoRankers monitor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "GeoRankers tracks brand visibility across major AI platforms including ChatGPT, Google Gemini, Perplexity, Claude, and other leading AI models. We monitor how often your brand appears in AI-generated responses, the context of mentions, and your competitive positioning across these platforms."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need technical expertise to use GeoRankers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No technical expertise required. GeoRankers is designed for marketing teams, content managers, and business leaders. Our platform provides clear, actionable insights and recommendations that your team can implement using existing content and marketing workflows. We translate complex AI behavior into practical marketing strategies."
          }
        },
        {
          "@type": "Question",
          "name": "How does GeoRankers track AI visibility?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "GeoRankers simulates buyer-intent prompts across multiple AI models, analyzes brand mentions and citations, and benchmarks competitor presence."
          }
        },
        {
          "@type": "Question",
          "name": "Why is my competitor showing up in ChatGPT but not my brand?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI models often recommend brands that are more frequently cited, well-structured, and contextually relevant across trusted web sources."
          }
        }
      ]
    });

    // SiteNavigationElement Schema - reflects current navigation structure
    let navSchema = document.querySelector('script[type="application/ld+json"]#nav-schema');
    if (!navSchema) {
      navSchema = document.createElement('script');
      navSchema.setAttribute('type', 'application/ld+json');
      navSchema.setAttribute('id', 'nav-schema');
      document.head.appendChild(navSchema);
    }
    navSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Main Navigation",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "Home",
          "url": "https://georankers.co/"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "Features",
          "url": "https://georankers.co/features"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Resources",
          "url": "https://georankers.co/#resources",
          "hasPart": [
            {
              "@type": "SiteNavigationElement",
              "name": "Blog",
              "url": "https://blog.georankers.co/"
            },
            {
              "@type": "SiteNavigationElement",
              "name": "GEO Guide",
              "url": "https://georankers.co/geo-guide"
            }
          ]
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Login",
          "url": "https://dashboard.georankers.co/login"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Try for Free",
          "url": "https://dashboard.georankers.co/register"
        }
      ]
    });

    return () => {
      // Cleanup schemas on unmount
      orgSchema?.remove();
      websiteSchema?.remove();
      faqSchema?.remove();
      navSchema?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen text-slate-900" style={{ overflowX: 'clip' }}>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <button onClick={scrollToTop} className="text-xl font-black hover:scale-105 transition-transform duration-200 cursor-pointer">
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  GeoRankers
                </span>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium" data-testid="link-home">
                Home
              </Link>
              <Link href="/features" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Features
              </Link>
              <Link href="/pricing" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium" data-testid="link-pricing">
                Pricing
              </Link>
              {/* Resources Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  onBlur={() => setTimeout(() => setResourcesOpen(false), 150)}
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium flex items-center"
                  data-testid="dropdown-resources"
                >
                  Resources
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
                </button>
                {resourcesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                    <a
                      href="https://blog.georankers.co/"
                      className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                      data-testid="link-blog"
                    >
                      Blog
                    </a>
                    <Link
                      href="/geo-guide"
                      className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                      data-testid="link-geo-guide"
                    >
                      GEO Guide
                    </Link>
                    <Link
                      href="/help"
                      className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                      data-testid="link-help"
                    >
                      Help Docs
                    </Link>
                  </div>
                )}
              </div>
              {/* Login Link */}
              <a
                href="https://dashboard.georankers.co/login"
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
                data-testid="link-login-nav"
              >
                Login
              </a>
              <a
                href="https://calendly.com/hello-georankers/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-blue-500 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                data-testid="cta-book-demo-nav"
              >
                Book a Demo
              </a>
              <a
                href="https://dashboard.georankers.co/register"
                className="gradient-primary hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-black transition-all duration-200"
                data-testid="cta-try-free-nav"
              >
                Try for Free
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <a
                href="https://calendly.com/hello-georankers/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-blue-500 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                data-testid="cta-book-demo-mobile"
              >
                Demo
              </a>
              <a
                href="https://dashboard.georankers.co/register"
                className="gradient-primary hover:opacity-90 text-white px-3 py-1.5 rounded-lg text-xs font-black"
                data-testid="cta-try-free-mobile"
              >
                Try Free
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-blue-600 p-2"
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4">
            <div className="space-y-3">
              <a
                href="https://dashboard.georankers.co/login"
                className="block text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-link-login"
              >
                Login
              </a>
              <Link
                href="/"
                className="block text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-link-home"
              >
                Home
              </Link>
              <Link
                href="/features"
                className="block text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="block text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              {/* Mobile Resources Collapsible */}
              <div>
                <button
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  className="w-full text-left text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium py-2 flex items-center justify-between"
                >
                  Resources
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
                </button>
                {resourcesOpen && (
                  <div className="pl-4 space-y-2 mt-2">
                    <a
                      href="https://blog.georankers.co/"
                      className="block text-slate-500 hover:text-blue-600 transition-colors duration-200 text-sm py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Blog
                    </a>
                    <Link
                      href="/geo-guide"
                      className="block text-slate-500 hover:text-blue-600 transition-colors duration-200 text-sm py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      GEO Guide
                    </Link>
                    <Link
                      href="/help"
                      className="block text-slate-500 hover:text-blue-600 transition-colors duration-200 text-sm py-1"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="mobile-link-help"
                    >
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
      <section className="relative px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-12">
        <div className="hero-gradient absolute inset-0 z-0"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-pink-400/10 rounded-full blur-3xl animate-pulse-soft" style={{animationDelay: '1s'}}></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-10 sm:mb-14">
            {/* Left col: text */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center mb-6">
                <span
                  className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-widest"
                  style={{
                    background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #3b82f6, #8b5cf6) border-box',
                    border: '1.5px solid transparent',
                  }}
                >
                  <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                    AI Search Visibility for B2B SaaS
                  </span>
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-slate-900 mb-6">
                Your Buyers Choose Vendors Inside{' '}
                <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                  AI Answers
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg font-medium text-slate-600 mb-7 leading-relaxed">
                ChatGPT, Gemini, Perplexity, and Google AI Overviews now shape how buyers discover and compare software. GeoRankers helps you track how your brand appears in AI generated answers and shows you exactly what to improve.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start gap-3 mb-2">
                <a
                  href="https://dashboard.georankers.co/register"
                  className="inline-flex items-center px-6 py-3 gradient-primary hover:opacity-90 rounded-xl font-black text-base text-white transition-all duration-200 shadow-lg"
                  data-testid="cta-try-free-hero"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Try for Free
                </a>
                <a
                  href="https://calendly.com/hello-georankers/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border-2 border-slate-300 hover:border-blue-400 rounded-xl font-semibold text-base text-slate-700 hover:text-blue-600 transition-all duration-200"
                  data-testid="cta-book-demo-hero"
                >
                  Book a Demo
                </a>
              </div>
              <p className="text-sm font-medium text-slate-400">No credit card required</p>
            </div>

            {/* Right col: Dashboard Carousel */}
            <div className="w-full">
              <DashboardCarousel />
            </div>
          </div>

          <div className="mt-4 sm:mt-6">
            <p className="text-xs sm:text-sm font-black uppercase tracking-widest text-slate-400 text-center mb-6">
              Trusted by 150+ high-growth B2B SaaS teams
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
              {[
                { name: "Notion", weight: "font-black" },
                { name: "Intercom", weight: "font-bold" },
                { name: "Amplitude", weight: "font-black" },
                { name: "Segment", weight: "font-bold" },
                { name: "Mixpanel", weight: "font-black" },
                { name: "Linear", weight: "font-bold" },
              ].map((logo) => (
                <span
                  key={logo.name}
                  className={`text-lg sm:text-xl ${logo.weight} text-slate-300 select-none tracking-tight`}
                >
                  {logo.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Dark Banner CTA 1 (after Hero, before Why This Matters) ── */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900 rounded-[2rem] px-8 sm:px-10 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="text-white font-black text-lg sm:text-xl leading-snug">
                Your buyers are asking AI — <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">is your brand in the answer?</span>
              </p>
              <p className="text-slate-400 text-sm mt-1">Track AI visibility across ChatGPT, Gemini, and Perplexity in one dashboard.</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a href="https://dashboard.georankers.co/register" className="gradient-cta text-white px-5 py-2.5 rounded-xl font-black text-sm hover:opacity-90 transition-all whitespace-nowrap">Try for Free</a>
              <a href="https://calendly.com/hello-georankers/30min" target="_blank" rel="noopener noreferrer" className="border border-white/30 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/10 transition-all whitespace-nowrap">Book a Demo</a>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: copy */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-4">Why This Matters</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.15] text-slate-900 mb-6">
                AI Search Is Replacing the First Click
              </h2>
              <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed mb-4">
                Buyers no longer browse multiple links to evaluate software. They ask AI tools for recommendations, comparisons, and shortlists.
              </p>
              <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed mb-4">
                These answers decide which vendors get considered and how they are positioned before a buyer ever visits your website.
              </p>
              <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                If your brand is not part of these answers, you are not part of the decision.
              </p>
            </div>

            {/* Right: 3 icon cards with vertical connector */}
            <div className="relative">
              {/* Vertical connector line */}
              <div className="absolute left-6 top-14 bottom-14 w-0.5 bg-gradient-to-b from-blue-200 via-violet-200 to-violet-100 hidden sm:block"></div>

              <div className="space-y-5">
                {[
                  { icon: Eye, label: "AI answers summarize entire categories", desc: "AI tools generate single answers covering entire software categories — one mention defines the shortlist." },
                  { icon: BarChart3, label: "Multiple vendors are compared instantly", desc: "Buyers get ranked comparisons in seconds. If you're not in that list, you're not in the conversation." },
                  { icon: Brain, label: "Visibility depends on how AI interprets your brand", desc: "The signals AI uses to understand your brand — citations, content, authority — are invisible in standard analytics." },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md relative z-10"
                        style={{ background: 'linear-gradient(135deg, #2994FF, #7575FF)' }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="glass rounded-[1.5rem] p-5 flex-1">
                        <p className="font-black text-slate-900 text-base mb-1">{item.label}</p>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visibility Gap Section */}
      <VisibilityGapSection />

      {/* What You Get Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-4">What You Get</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.15] text-slate-900 mb-5">
              See Exactly How AI Platforms Present Your Brand
            </h2>
            <p className="text-base sm:text-lg font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed">
              GeoRankers turns AI generated answers into structured insights so you can understand your visibility, benchmark against competitors, and take action.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: Search, title: "Prompt level visibility tracking", desc: "See which queries include your brand and where you are missing." },
              { icon: BarChart3, title: "Competitive answer share", desc: "Compare how often your brand appears versus competitors." },
              { icon: Brain, title: "Brand perception analysis", desc: "Understand how AI systems describe your product and category fit." },
              { icon: Globe, title: "Source and citation insights", desc: "Identify which sources influence AI answers and where you need stronger presence." },
              { icon: Zap, title: "Actionable recommendations", desc: "Get clear next steps to improve AI search visibility." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div
                    className="w-11 h-11 rounded-[1rem] flex items-center justify-center mb-4 shadow-sm"
                    style={{ background: 'linear-gradient(135deg, #2994FF, #7575FF)' }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-black text-slate-900 mb-2 text-sm leading-snug">{item.title}</p>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Dark Banner CTA 2 (after What You Get) ── */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900 rounded-[2rem] px-8 sm:px-10 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="text-white font-black text-lg sm:text-xl leading-snug">
                Data is only half the battle. <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Insights drive action.</span>
              </p>
              <p className="text-slate-400 text-sm mt-1">Discover how GeoRankers turns AI responses into structured, actionable intelligence.</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a href="https://dashboard.georankers.co/register" className="gradient-cta text-white px-5 py-2.5 rounded-xl font-black text-sm hover:opacity-90 transition-all whitespace-nowrap">Try for Free</a>
              <a href="https://calendly.com/hello-georankers/30min" target="_blank" rel="noopener noreferrer" className="border border-white/30 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/10 transition-all whitespace-nowrap">Book a Demo</a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-4">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.15] text-slate-900 mb-5">
              From AI Answers to Actionable Insights
            </h2>
            <p className="text-base sm:text-lg font-medium text-slate-500 max-w-xl mx-auto leading-relaxed">
              GeoRankers analyzes how AI systems respond to real buyer prompts and translates those responses into clear visibility intelligence.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-0">
            {[
              { num: "01", title: "Simulate buyer queries", desc: "We model discovery, comparison, pricing, and trust prompts across your category." },
              { num: "02", title: "Capture AI responses", desc: "Track how platforms like ChatGPT, Gemini, and Perplexity present your category." },
              { num: "03", title: "Identify gaps and actions", desc: "Highlight where your brand is missing and what needs to improve." },
            ].map((step, i) => (
              <div key={i} className="flex sm:flex-col items-stretch flex-1">
                {/* Card */}
                <div className="rounded-[2rem] bg-white shadow-sm border border-slate-100 p-7 relative overflow-hidden flex-1">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm mb-5"
                    style={{ background: 'linear-gradient(135deg, #2994FF, #7575FF)' }}
                  >
                    {step.num}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">{step.desc}</p>
                  <div className="absolute top-4 right-5 text-7xl font-black text-slate-900/[0.03] select-none leading-none">{step.num}</div>
                </div>

                {/* Animated connector (between cards, not after last) */}
                {i < 2 && (
                  <div className="flex items-center justify-center sm:justify-start sm:rotate-0 rotate-90 px-0 sm:px-1 my-2 sm:my-0 mx-auto sm:mx-0 w-10 sm:w-auto h-auto sm:h-10 flex-shrink-0">
                    <div className="relative w-10 sm:w-10 h-1 sm:h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className="animate-flow"></div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-blue-400 flex-shrink-0 -ml-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Everything You Need to Know About{' '}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">AI Search Optimization</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {homeFaqs.map((faq, index) => (
              <Card key={faq.question} className="glass rounded-[2rem] border-0">
                <CardContent className="p-0">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex items-start justify-between hover:bg-white/20 transition-colors duration-300"
                  >
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 pr-4">{faq.question}</h3>
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Final CTA — full-width gradient */}
      <section className="gradient-cta py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-widest text-white/60 mb-4">GET STARTED</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white mb-5">
            Improve Your Visibility in AI Search
          </h2>
          <p className="text-base sm:text-xl font-medium text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Understand how AI platforms see your brand and take action to increase your presence in high intent buying prompts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://dashboard.georankers.co/register"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-black text-base sm:text-lg transform hover:scale-105 transition-all duration-300 shadow-xl hover:bg-white/95"
              data-testid="cta-try-free-final"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Try for Free
            </a>
            <a
              href="https://calendly.com/hello-georankers/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border-2 border-white/40 text-white rounded-xl font-semibold text-base sm:text-lg hover:border-white/70 hover:bg-white/10 transition-all duration-300"
            >
              Book a Demo
            </a>
          </div>
          <p className="text-sm text-white/50 mt-5">No credit card required</p>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/30 to-white" id="blog">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-slate-900 mb-5 sm:mb-7">
              Latest{' '}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">AI Search Insights</span>
            </h2>
            <p className="text-lg sm:text-xl font-medium text-slate-600 max-w-3xl mx-auto">
              Discover proven strategies and frameworks to dominate AI search across ChatGPT, Gemini, and Perplexity
            </p>
          </div>

          {/* Loading State */}
          {postsLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="glass rounded-[2.5rem] border-0 overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse"></div>
                  <CardContent className="p-6 sm:p-8">
                    <div className="h-4 bg-slate-200 rounded animate-pulse mb-3"></div>
                    <div className="h-6 bg-slate-200 rounded animate-pulse mb-3"></div>
                    <div className="h-4 bg-slate-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded animate-pulse mb-6 w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded animate-pulse w-20"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Error State */}
          {postsError && (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">Unable to load blog posts at the moment.</p>
              <a
                href="https://blog.georankers.co"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-violet-600 transition-colors duration-300"
              >
                Visit our blog directly
                <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg]" />
              </a>
            </div>
          )}

          {/* Dynamic Blog Posts */}
          {blogPosts && blogPosts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {blogPosts.map((post, index) => (
                <Card key={post.id} className="glass rounded-[2.5rem] border-0 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
                  <div className="h-48 relative overflow-hidden">
                    {(post as any).featured_image_url ? (
                      <img
                        src={(post as any).featured_image_url}
                        alt={post.title.rendered}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`h-full p-6 flex items-center justify-center ${
                        index % 3 === 0 ? 'bg-gradient-to-br from-blue-50 via-white to-violet-50' :
                        index % 3 === 1 ? 'bg-gradient-to-br from-emerald-50 via-white to-blue-50' :
                        'bg-gradient-to-br from-violet-50 via-white to-pink-50'
                      }`}>
                        <div className="text-center">
                          {getCategoryIcon(post.categories)}
                          <div className="text-xs text-slate-500 font-medium">
                            {getCategoryName(post.categories)}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-xs text-slate-600 font-medium">
                        {getCategoryName(post.categories)}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-center text-xs text-slate-500 mb-3">
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                      {post.title.rendered}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">
                      {cleanExcerpt(post.excerpt.rendered)}
                    </p>
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`link-blog-post-${post.id}`}
                      className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-violet-600 transition-colors duration-300"
                    >
                      Read More
                      <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg] group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* No Posts State */}
          {blogPosts && blogPosts.length === 0 && !postsLoading && (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">No blog posts available at the moment.</p>
              <a
                href="https://blog.georankers.co"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-violet-600 transition-colors duration-300"
              >
                Visit our blog
                <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg]" />
              </a>
            </div>
          )}

          {/* View All Blogs CTA */}
          <div className="text-center mt-8 sm:mt-10">
            <a
              href="https://blog.georankers.co"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-view-all-blogs"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 gradient-primary hover:opacity-90 text-white rounded-2xl font-black text-base sm:text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
              View All Blog Posts
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-14 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-10 sm:gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="text-2xl font-black mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">GeoRankers</span>
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

            {/* Links */}
            <div>
              <p className="text-xs font-black text-blue-200/70 uppercase tracking-widest mb-4">Quick Links</p>
              <div className="space-y-3">
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

            {/* Contact */}
            <div>
              <p className="text-xs font-black text-blue-200/70 uppercase tracking-widest mb-4">Contact</p>
              <a
                href="mailto:hello@georankers.co"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm group"
                data-testid="link-footer-email"
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
