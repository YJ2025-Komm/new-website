import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import QuizModal from "@/components/QuizModal";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { useExitIntent } from "@/hooks/useExitIntent";
import { Link } from "wouter";
import { 
  Brain, 
  Eye,
  Search, 
  TrendingUp, 
  Rocket,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Menu,
  X,
  Mail,
  Quote,
  ChevronLeft,
  ChevronRight,
  Compass,
  Crosshair
} from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import geminiLogo from "@assets/Gemini_1753958628531.png";
import grokLogo from "@assets/Grok_1753958628535.png";
import openaiLogo from "@assets/Open Ai_1753958628536.png";
import perplexityLogo from "@assets/Perplexity_1753958628538.png";

// Featured blog images
import strategicImage from '@assets/generated_images/Strategic_AI_search_leadership_2959319a.png';
import buildingBlocksImage from '@assets/generated_images/AI_content_building_blocks_237b4917.png';
import geoVsSeoImage from '@assets/generated_images/GEO_vs_SEO_comparison_96025f03.png';
import dashboardScreenshot from '@assets/georankers_sc_1771332426583.jpg';
import showcaseImg1 from '@assets/generated_images/showcase_ai_visibility.png';
import showcaseImg2 from '@assets/generated_images/showcase_prompt_discovery.png';
import showcaseImg3 from '@assets/generated_images/showcase_recommendations.png';

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


function SearchIntelligenceSection() {
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

  const cards = [
    {
      icon: Compass,
      iconGradient: "from-blue-500 to-cyan-500",
      title: "Designed for AI-First Discovery",
      description: "We track recommendations across ChatGPT, Google AI, and emerging LLMs — where buying decisions are increasingly influenced.",
    },
    {
      icon: Brain,
      iconGradient: "from-violet-500 to-purple-600",
      title: "Intelligence, Not Just Analytics",
      description: "We measure AI citations, prompt coverage, competitive share, and authority gaps — turning AI exposure into strategy.",
    },
    {
      icon: Crosshair,
      iconGradient: "from-pink-500 to-rose-500",
      title: "Actionable by Design",
      description: "Our recommendation engine prioritizes what to build and optimize so AI models favor you as a primary source.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/80 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <p
            className="text-sm font-semibold tracking-widest uppercase text-blue-500 mb-3 sm:mb-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            A new layer of search intelligence
          </p>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.15] tracking-tight text-slate-900 mb-4 sm:mb-5"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}
          >
            Purpose-built for brands{' '}
            <br className="hidden sm:block" />
            navigating{' '}
            <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">
              AI-driven discovery
            </span>
          </h2>

          <p
            className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
            GeoRankers sets the standard for measuring and optimizing
            visibility across ChatGPT, Gemini, Perplexity, and every AI model
            shaping buyer decisions.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="group rounded-2xl border border-slate-200/80 bg-white p-7 sm:p-8 hover:shadow-lg hover:shadow-blue-100/50 hover:-translate-y-1 transition-all duration-500"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.5s ease ${0.3 + i * 0.12}s, transform 0.5s ease ${0.3 + i * 0.12}s, box-shadow 0.5s ease, translate 0.5s ease`,
                }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${card.iconGradient} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">{card.title}</h3>
                <p className="text-base sm:text-lg text-slate-500 leading-relaxed">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const showcaseSlides = [
  {
    number: "01",
    title: "Know exactly where your brand stands in AI search",
    description: "Track how AI platforms like Gemini, Google AI Mode, and ChatGPT respond to prompts in your industry. See which brands get mentioned, how often, and where you're missing out.",
    image: showcaseImg1,
    alt: "GeoRankers AI search visibility tracking across Google AI Mode and ChatGPT",
  },
  {
    number: "02",
    title: "Discover the prompts that matter for your business",
    description: "Map every high-intent prompt across Discovery, Use Case, Trust and others. Instantly see your coverage gaps across all the LLMs — so you can close them fast.",
    image: showcaseImg2,
    alt: "GeoRankers prompt discovery showing high-intent prompts categorized by type",
  },
  {
    number: "03",
    title: "Get actionable steps to boost your AI presence",
    description: "Receive data-driven action items prioritized by effort and impact. Each recommendation comes with a clear starting point and execution plan to grow your AI visibility.",
    image: showcaseImg3,
    alt: "GeoRankers strategic recommendations with impact and effort ratings",
  },
];

function StickyScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const scrollableDistance = containerHeight - viewportHeight;
      if (scrollableDistance <= 0) return;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      const slideCount = showcaseSlides.length;
      const newSlide = Math.min(slideCount - 1, Math.floor(progress * slideCount));
      setActiveSlide(newSlide);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: `${showcaseSlides.length * 85}vh` }}>
      <div className="sticky top-16 flex items-center overflow-hidden" style={{ height: 'calc(100vh - 4rem)' }}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-center">
            <div className="relative min-h-[300px] sm:min-h-[360px]">
              {showcaseSlides.map((slide, i) => (
                <div
                  key={i}
                  className="absolute inset-0 flex flex-col justify-center"
                  style={{
                    opacity: activeSlide === i ? 1 : 0,
                    transform: activeSlide === i ? 'translateY(0)' : activeSlide > i ? 'translateY(-30px)' : 'translateY(30px)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                    pointerEvents: activeSlide === i ? 'auto' : 'none',
                  }}
                >
                  <span className="text-sm sm:text-base font-semibold tracking-widest uppercase text-blue-500 mb-3 sm:mb-4">
                    {slide.number}
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15] font-bold text-slate-900 leading-tight mb-4 sm:mb-5">
                    {slide.title}
                  </h3>
                  <p className="text-base sm:text-lg lg:text-xl text-slate-500 leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              ))}

              <div className="absolute bottom-0 left-0 flex items-center gap-2.5">
                {showcaseSlides.map((_, i) => (
                  <div
                    key={i}
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: activeSlide === i ? '36px' : '10px',
                      backgroundColor: activeSlide === i ? 'rgb(59, 130, 246)' : 'rgb(203, 213, 225)',
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="relative">
              {showcaseSlides.map((slide, i) => (
                <div
                  key={i}
                  className={i === 0 ? 'relative' : 'absolute inset-0'}
                  style={{
                    opacity: activeSlide === i ? 1 : 0,
                    transform: activeSlide === i ? 'scale(1)' : 'scale(0.95)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                  }}
                >
                  <div className={`rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60 bg-white ${activeSlide === i ? 'animate-showcase-float' : ''}`}>
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showExitIntentPopup, setShowExitIntentPopup] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "GeoRankers completely changed how we think about content strategy. We discovered our competitors were showing up in ChatGPT for our core keywords while we were invisible. Within 8 weeks of acting on their recommendations, our brand started appearing in AI responses.",
      name: "Sarah Mitchell",
      company: "VP of Marketing, CloudStack Solutions",
    },
    {
      quote: "The prompt intelligence feature is a game-changer. We can now see exactly which buyer-intent questions are being asked and whether our brand gets mentioned. It's like having an SEO tool built specifically for the AI era.",
      name: "James Rodriguez",
      company: "Head of Growth, DataSync Pro",
    },
    {
      quote: "We were spending thousands on traditional SEO without realizing AI search was eating into our organic traffic. GeoRankers gave us the visibility we needed to pivot our strategy and start winning in AI-generated recommendations.",
      name: "Emily Chen",
      company: "CMO, RevOps Platform",
    },
  ];
  const [resourcesOpen, setResourcesOpen] = useState(false);

  // Exit intent detection
  const { isTriggered: exitIntentTriggered, reset: resetExitIntent, disable: disableExitIntent } = useExitIntent({
    enabled: true,
    threshold: 10,
    delay: 60000, // 1 minute between triggers
    sessionDelay: 10000 // 10 seconds after page load
  });

  // Handle exit intent trigger
  useEffect(() => {
    if (exitIntentTriggered && !showQuizModal && !showExitIntentPopup) {
      setShowExitIntentPopup(true);
    }
  }, [exitIntentTriggered, showQuizModal, showExitIntentPopup]);

  // Handle exit intent popup actions
  const handleExitIntentTakeQuiz = () => {
    setShowExitIntentPopup(false);
    setShowQuizModal(true);
    disableExitIntent(); // Disable for this session after user engages
  };

  const handleExitIntentClose = () => {
    setShowExitIntentPopup(false);
    resetExitIntent();
  };

  // Handle quiz modal close
  const handleQuizModalClose = () => {
    setShowQuizModal(false);
    disableExitIntent(); // Disable after quiz is completed/closed
  };

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
          "name": "Website AI Audit",
          "url": "https://georankers.co/website-analysis"
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
            },
            {
              "@type": "SiteNavigationElement",
              "name": "FAQ",
              "url": "https://georankers.co/#faq"
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
              <button onClick={scrollToTop} className="text-xl font-bold hover:scale-105 transition-transform duration-200 cursor-pointer">
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  GeoRankers
                </span>
              </button>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/website-analysis" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium" data-testid="link-website-analysis">
                Website AI Audit
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
                    <a 
                      href="#faq" 
                      className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                      data-testid="link-faq"
                    >
                      FAQ
                    </a>
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
              {/* Try for Free CTA */}
              <a 
                href="https://dashboard.georankers.co/register"
                className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                data-testid="cta-try-free-nav"
              >
                Try for Free
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <a 
                href="https://dashboard.georankers.co/login"
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
                data-testid="link-login-mobile"
              >
                Login
              </a>
              <a 
                href="https://dashboard.georankers.co/register"
                className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                data-testid="cta-try-free-mobile"
              >
                Try for Free
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
              <Link 
                href="/website-analysis" 
                className="block text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-link-website-analysis"
              >
                Website AI Audit
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
                    <a 
                      href="#faq" 
                      className="block text-slate-500 hover:text-blue-600 transition-colors duration-200 text-sm py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      FAQ
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-0">
        <div className="hero-gradient absolute inset-0 z-0"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-pink-400/10 rounded-full blur-3xl animate-pulse-soft" style={{animationDelay: '1s'}}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-3 lg:mb-4 leading-tight">
              AI Search Visibility <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Built for B2B SaaS</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-4 lg:mb-6 leading-relaxed max-w-3xl mx-auto">
              See how AI platforms position your software in buyer-intent prompts, track competitor recommendations, and close visibility gaps that impact pipeline.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-1">
              <a 
                href="https://dashboard.georankers.co/register"
                className="inline-flex items-center px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-2xl font-semibold text-base lg:text-lg text-white transform hover:scale-105 transition-all duration-300 shadow-2xl"
                data-testid="cta-try-free-hero"
              >
                <Rocket className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3" />
                Try for Free
              </a>
              <a 
                href="https://calendly.com/georankers/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 lg:px-8 lg:py-4 border-2 border-slate-300 hover:border-blue-400 rounded-2xl font-semibold text-base lg:text-lg text-slate-700 hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
                data-testid="cta-book-demo-hero"
              >
                Book a Demo
              </a>
            </div>
            <p className="text-sm text-slate-500">No credit card required</p>
          </div>

          <div className="max-w-6xl mx-auto mt-4 sm:mt-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60">
              <img 
                src={dashboardScreenshot} 
                alt="GeoRankers Dashboard - AI Visibility Score, Competitive Landscape, and Mention Distribution" 
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="mt-10 sm:mt-14">
            <p className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-widest text-center mb-6">
              Trusted by forward-thinking teams
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 opacity-50">
              <div className="h-8 sm:h-9 w-24 sm:w-28 bg-slate-300 rounded-lg"></div>
              <div className="h-8 sm:h-9 w-20 sm:w-24 bg-slate-300 rounded-lg"></div>
              <div className="h-8 sm:h-9 w-28 sm:w-32 bg-slate-300 rounded-lg"></div>
              <div className="h-8 sm:h-9 w-22 sm:w-26 bg-slate-300 rounded-lg"></div>
              <div className="h-8 sm:h-9 w-24 sm:w-28 bg-slate-300 rounded-lg"></div>
              <div className="h-8 sm:h-9 w-20 sm:w-24 bg-slate-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Intelligence Section */}
      <SearchIntelligenceSection />

      {/* Sticky Scroll Feature Showcase */}
      <StickyScrollShowcase />


      {/* Mid-Page CTA Strip */}
      <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-700 via-violet-700 to-blue-700">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
            See What AI Says About Your Brand Today
          </h3>
          <p className="text-base sm:text-lg text-white/90 mb-5 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
            Get a clear view of how AI models describe your company and which sources shape those answers.
          </p>
          <a 
            href="https://dashboard.georankers.co/register"
            className="inline-flex items-center px-7 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white rounded-2xl font-semibold text-base sm:text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl"
            data-testid="cta-try-free-midpage-1"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Try for Free
          </a>
          <p className="text-sm text-white/70 mt-3">No credit card required</p>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              What Our <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Customers</span> Say
            </h2>
          </div>

          <div className="relative">
            <div className="glass rounded-3xl p-8 sm:p-12 border-0 text-center">
              <Quote className="w-10 h-10 text-blue-400/30 mx-auto mb-6" />
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-8 italic">
                "{testimonials[currentTestimonial].quote}"
              </p>
              <div>
                <p className="font-bold text-slate-900 text-lg">{testimonials[currentTestimonial].name}</p>
                <p className="text-slate-500 text-sm">{testimonials[currentTestimonial].company}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentTestimonial ? "bg-gradient-to-r from-blue-500 to-violet-500 w-8" : "bg-slate-300"}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600">
              Everything you need to know about AI search optimization
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {/* FAQ Item 1 */}
            <Card className="glass rounded-2xl border-0">
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between hover:bg-white/20 transition-colors duration-300"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    What is AI search optimization and why do I need it?
                  </h3>
                  {openFAQ === 1 ? (
                    <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  )}
                </button>
                {openFAQ === 1 && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <p className="text-slate-600 leading-relaxed">
                      AI search optimization ensures your brand appears when users ask AI models like ChatGPT, Gemini, or Claude for recommendations in your industry. Unlike traditional SEO that targets Google, AI search optimization focuses on how large language models surface and recommend content. As more people use AI for discovery and decision-making, being invisible in AI results means losing potential customers to competitors.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* FAQ Item 2 */}
            <Card className="glass rounded-2xl border-0">
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 2 ? null : 2)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between hover:bg-white/20 transition-colors duration-300"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    How is AI search different from Google SEO?
                  </h3>
                  {openFAQ === 2 ? (
                    <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  )}
                </button>
                {openFAQ === 2 && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <p className="text-slate-600 leading-relaxed">
                      Traditional SEO optimizes for search engine algorithms and keyword rankings. AI search optimization focuses on how language models understand context, authority, and relevance when generating responses. AI models consider factors like content quality, brand mentions across the web, and topical expertise rather than just keywords and backlinks. The strategies and metrics are fundamentally different.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* FAQ Item 3 */}
            <Card className="glass rounded-2xl border-0">
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 3 ? null : 3)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between hover:bg-white/20 transition-colors duration-300"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Which AI platforms does GeoRankers monitor?
                  </h3>
                  {openFAQ === 3 ? (
                    <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  )}
                </button>
                {openFAQ === 3 && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <p className="text-slate-600 leading-relaxed">
                      GeoRankers tracks brand visibility across major AI platforms including ChatGPT, Google Gemini, Perplexity, Claude, and other leading AI models. We monitor how often your brand appears in AI-generated responses, the context of mentions, and your competitive positioning across these platforms.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* FAQ Item 4 */}
            <Card className="glass rounded-2xl border-0">
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 4 ? null : 4)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between hover:bg-white/20 transition-colors duration-300"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    How long does it take to see results from AI search optimization?
                  </h3>
                  {openFAQ === 4 ? (
                    <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  )}
                </button>
                {openFAQ === 4 && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <p className="text-slate-600 leading-relaxed">
                      AI search visibility typically improves over 3-6 months with consistent optimization efforts. Unlike traditional SEO, AI models update their training data less frequently, so changes take time to propagate. However, our predictive forecasting helps you target emerging topics before competitors, giving you a head start on visibility for new trends.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* FAQ Item 5 */}
            <Card className="glass rounded-2xl border-0">
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 5 ? null : 5)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between hover:bg-white/20 transition-colors duration-300"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    What makes GeoRankers different from other marketing tools?
                  </h3>
                  {openFAQ === 5 ? (
                    <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  )}
                </button>
                {openFAQ === 5 && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <p className="text-slate-600 leading-relaxed">
                      GeoRankers is specifically built for the new AI search paradigm. While traditional marketing tools focus on Google rankings and social media metrics, we provide intelligence on AI model behavior, predictive trend analysis, and optimization strategies that work with language models. We're the first platform designed specifically for AI search visibility.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* FAQ Item 6 */}
            <Card className="glass rounded-2xl border-0">
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 6 ? null : 6)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between hover:bg-white/20 transition-colors duration-300"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Can small companies compete with enterprise brands in AI search?
                  </h3>
                  {openFAQ === 6 ? (
                    <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  )}
                </button>
                {openFAQ === 6 && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <p className="text-slate-600 leading-relaxed">
                      Yes! AI search creates new opportunities for smaller companies to compete based on expertise and relevance rather than just budget and domain authority. By focusing on specific niches, creating high-quality content, and building topical authority, smaller companies can often outrank larger competitors in AI-generated responses for their specialty areas.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* FAQ Item 7 */}
            <Card className="glass rounded-2xl border-0">
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 7 ? null : 7)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between hover:bg-white/20 transition-colors duration-300"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    When will GeoRankers be available?
                  </h3>
                  {openFAQ === 7 ? (
                    <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  )}
                </button>
                {openFAQ === 7 && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <p className="text-slate-600 leading-relaxed">
                      We're currently in beta development and accepting waitlist signups. Early access members will get priority onboarding, special pricing, and direct input on feature development. Join our waitlist to be notified as soon as we launch and to secure your spot in the beta program.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* FAQ Item 8 */}
            <Card className="glass rounded-2xl border-0">
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 8 ? null : 8)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between hover:bg-white/20 transition-colors duration-300"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Do I need technical expertise to use GeoRankers?
                  </h3>
                  {openFAQ === 8 ? (
                    <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  )}
                </button>
                {openFAQ === 8 && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <p className="text-slate-600 leading-relaxed">
                      No technical expertise required. GeoRankers is designed for marketing teams, content managers, and business leaders. Our platform provides clear, actionable insights and recommendations that your team can implement using existing content and marketing workflows. We translate complex AI behavior into practical marketing strategies.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* FAQ Item 9 */}
            <Card className="glass rounded-2xl border-0">
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 9 ? null : 9)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between hover:bg-white/20 transition-colors duration-300"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    How does GeoRankers track AI visibility?
                  </h3>
                  {openFAQ === 9 ? (
                    <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  )}
                </button>
                {openFAQ === 9 && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <p className="text-slate-600 leading-relaxed">
                      GeoRankers simulates buyer-intent prompts across multiple AI models, analyzes brand mentions and citations, and benchmarks competitor presence.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* FAQ Item 10 */}
            <Card className="glass rounded-2xl border-0">
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 10 ? null : 10)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between hover:bg-white/20 transition-colors duration-300"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Why is my competitor showing up in ChatGPT but not my brand?
                  </h3>
                  {openFAQ === 10 ? (
                    <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" />
                  )}
                </button>
                {openFAQ === 10 && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <p className="text-slate-600 leading-relaxed">
                      AI models often recommend brands that are more frequently cited, well-structured, and contextually relevant across trusted web sources.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </section>
      
      {/* FAQ CTA - Full Width */}
      <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-700 via-violet-700 to-blue-700">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
            Learn How To Improve The Way AI Presents Your Brand
          </h3>
          <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            Get practical insights you can act on to strengthen how AI systems interpret and reference your brand.
          </p>
          <a 
            href="https://dashboard.georankers.co/register"
            className="inline-flex items-center px-7 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white rounded-2xl font-semibold text-base sm:text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl"
            data-testid="cta-try-free-faq"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Try for Free
          </a>
          <p className="text-sm text-white/70 mt-3">No credit card required</p>
        </div>
      </section>
      
      {/* Blog Section */}
      <section className="py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/30 to-white" id="blog">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Latest <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">AI Search Insights</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Discover proven strategies and frameworks to dominate AI search across ChatGPT, Gemini, and Perplexity
            </p>
          </div>
          
          {/* Loading State */}
          {postsLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="glass rounded-2xl border-0 overflow-hidden">
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
                <Card key={post.id} className="glass rounded-2xl border-0 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
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
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
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
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white rounded-2xl font-semibold text-base sm:text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
              View All Blog Posts
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 sm:py-14 overflow-hidden bg-gradient-to-r from-blue-700 via-violet-700 to-blue-700">
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-56 h-56 bg-gradient-to-r from-violet-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-10 sm:gap-8 mb-12">
            {/* Brand */}
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

            {/* Links */}
            <div>
              <p className="text-xs font-medium text-blue-200/70 uppercase tracking-widest mb-4">Quick Links</p>
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
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs font-medium text-blue-200/70 uppercase tracking-widest mb-4">Contact</p>
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

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-blue-200/60 text-xs">
              © {new Date().getFullYear()} GeoRankers. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Exit Intent Popup */}
      <ExitIntentPopup
        isOpen={showExitIntentPopup}
        onClose={handleExitIntentClose}
        onTakeQuiz={handleExitIntentTakeQuiz}
      />

      {/* Quiz Modal */}
      <QuizModal 
        isOpen={showQuizModal} 
        onClose={handleQuizModalClose} 
      />
    </div>
  );
}
