import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import QuizModal from "@/components/QuizModal";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { useExitIntent } from "@/hooks/useExitIntent";
import { Link } from "wouter";
import { 
  Brain, 
  ShieldCheck, 
  Eye,
  EyeOff, 
  Search, 
  TrendingUp, 
  Rocket,
  Hash,
  Star,
  Tag,
  Repeat,
  Check,
  Download,
  Bell,
  ChartLine,
  Lightbulb,
  Loader2,
  CheckCircle,
  Target,
  HelpCircle,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Menu,
  X,
  ExternalLink,
  Mail,
  BarChart3,
  MessageSquare,
  Zap,
  Bot,
  Send,
  Quote,
  ChevronLeft,
  ChevronRight
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
          "url": "https://georankers.co/#features"
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
    <div className="min-h-screen text-slate-900 overflow-x-hidden">
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
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Features
              </a>
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
              <a 
                href="#features" 
                className="block text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
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
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 pt-24">
        {/* Background Elements */}
        <div className="hero-gradient absolute inset-0 z-0"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-pink-400/10 rounded-full blur-3xl animate-pulse-soft" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/5 via-purple-300/5 to-pink-300/5 rounded-full blur-3xl animate-pulse-soft" style={{animationDelay: '0.5s'}}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-7xl font-bold mb-6 lg:mb-8 leading-tight">
                AI Search Visibility <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Built for B2B SaaS</span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-8 lg:mb-12 leading-relaxed max-w-3xl mx-auto">
                See how AI platforms position your software in buyer-intent prompts, track competitor recommendations, and close visibility gaps that impact pipeline.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-2">
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
        </div>
      </section>

      {/* Dashboard Screenshot Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              See Your Brand's <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">AI Visibility</span> in Action
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60">
            <img 
              src={dashboardScreenshot} 
              alt="GeoRankers Dashboard - AI Visibility Score, Competitive Landscape, and Mention Distribution" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-violet-50/20 to-blue-50/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Is Your Brand <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">AI-Search Ready?</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 mb-8">
              Take the quick quiz and see your AI Visibility Score across key signals
            </p>
          </div>
          
          <Card className="glass-strong rounded-3xl p-6 sm:p-8 lg:p-12 border-0 max-w-xl mx-auto">
            <CardContent className="pt-0 text-center space-y-6">
              <Button 
                onClick={() => setShowQuizModal(true)}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-2xl font-semibold text-base sm:text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center"
              >
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                Start Quiz
              </Button>
              
              <p className="text-center text-xs sm:text-sm text-slate-500">
                🔒 Your responses are confidential and used only for your personalized report
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section id="problem" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100 p-8 sm:p-10">
              <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-3">50%+</div>
              <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed">B2B buyers use AI tools during vendor research</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-pink-50 border border-violet-100 p-8 sm:p-10">
              <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent mb-3">50%+</div>
              <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed">B2B buyers use AI for solution comparisons and feature evaluations</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 p-8 sm:p-10">
              <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-3">70%</div>
              <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed">of the B2B buying journey happens before sales contact</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 p-8 sm:p-10">
              <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-3">60%+</div>
              <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed">Executives use AI for summaries, comparisons, and vendor evaluation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-Page CTA Strip */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-700 via-violet-700 to-blue-700">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 whitespace-nowrap">
            See What AI Says About Your Brand Today
          </h3>
          <p className="text-base sm:text-lg text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Get a clear view of how AI models describe your company and which sources shape those answers.
          </p>
          <a 
            href="https://dashboard.georankers.co/register"
            className="inline-flex items-center px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white rounded-2xl font-semibold text-lg sm:text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl"
            data-testid="cta-try-free-midpage-1"
          >
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
            Try for Free
          </a>
          <p className="text-sm text-white/70 mt-4">No credit card required</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-violet-50/30 to-pink-50/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              The AI Visibility Stack for <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">B2B SaaS Teams</span>
            </h2>
          </div>
          
          {/* Feature 1: AI Visibility Intelligence — Image Right */}
          <Card className="glass rounded-3xl p-4 sm:p-8 lg:p-12 mb-8 sm:mb-12 border-0">
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
          <Card className="glass rounded-3xl p-4 sm:p-8 lg:p-12 mb-8 sm:mb-12 border-0">
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
          <Card className="glass rounded-3xl p-4 sm:p-8 lg:p-12 mb-8 sm:mb-12 border-0">
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
          <Card className="glass rounded-3xl p-4 sm:p-8 lg:p-12 mb-8 sm:mb-12 border-0">
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
          <Card className="glass rounded-3xl p-4 sm:p-8 lg:p-12 mb-8 sm:mb-12 border-0">
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

      {/* Features Section CTA - Full Width */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-700 via-violet-700 to-blue-700">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 whitespace-nowrap">
            Understand Why AI Describes Your Brand The Way It Does
          </h3>
          <p className="text-base sm:text-lg text-white/90 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            Explore the content and signals influencing how AI systems present your brand across different queries.
          </p>
          <a 
            href="https://dashboard.georankers.co/register"
            className="inline-flex items-center px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white rounded-2xl font-semibold text-lg sm:text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl"
            data-testid="cta-try-free-features"
          >
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
            Try for Free
          </a>
          <p className="text-sm text-white/70 mt-4">No credit card required</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
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
      <section id="faq" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600">
              Everything you need to know about AI search optimization
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
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
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-700 via-violet-700 to-blue-700">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 whitespace-nowrap">
            Learn How To Improve The Way AI Presents Your Brand
          </h3>
          <p className="text-base sm:text-lg text-white/90 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            Get practical insights you can act on to strengthen how AI systems interpret and reference your brand.
          </p>
          <a 
            href="https://dashboard.georankers.co/register"
            className="inline-flex items-center px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white rounded-2xl font-semibold text-lg sm:text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl"
            data-testid="cta-try-free-faq"
          >
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
            Try for Free
          </a>
          <p className="text-sm text-white/70 mt-4">No credit card required</p>
        </div>
      </section>
      
      {/* Blog Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/30 to-white" id="blog">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
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
          <div className="text-center mt-12 sm:mt-16">
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
      <footer className="relative py-16 sm:py-20 overflow-hidden bg-gradient-to-r from-blue-700 via-violet-700 to-blue-700">
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
