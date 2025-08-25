import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { insertWaitlistEntrySchema, type InsertWaitlistEntry } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import QuizModal from "@/components/QuizModal";
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
  ClipboardCheck
} from "lucide-react";
import geminiLogo from "@assets/Gemini_1753958628531.png";
import grokLogo from "@assets/Grok_1753958628535.png";
import openaiLogo from "@assets/Open Ai_1753958628536.png";
import perplexityLogo from "@assets/Perplexity_1753958628538.png";

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
}

interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
}

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertWaitlistEntry>({
    resolver: zodResolver(insertWaitlistEntrySchema),
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      challenge: "",
    },
  });

  const waitlistMutation = useMutation({
    mutationFn: async (data: InsertWaitlistEntry) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      form.reset();
      toast({
        title: "Welcome to the waitlist!",
        description: "We'll notify you as soon as GeoRankers is ready for you.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to join waitlist. Please try again.",
      });
    },
  });

  const onSubmit = (data: InsertWaitlistEntry) => {
    waitlistMutation.mutate(data);
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
      featured_media: 0
    },
    {
      id: 2,
      title: { rendered: "Generative Engine Optimization: Building Blocks of AI‑Ready Content" },
      excerpt: { rendered: "Master the fundamental building blocks that make your content discoverable and recommendable by AI engines." },
      link: "https://blog.georankers.co/2025/08/15/generative-engine-optimization-building-blocks-of-ai%e2%80%91ready-content/",
      date: "2025-08-15T00:00:00",
      categories: [2],
      featured_media: 0
    },
    {
      id: 3,
      title: { rendered: "GEO vs SEO: What is Real, What is Hype, and What You Actually Need to Track" },
      excerpt: { rendered: "Cut through the noise and understand the practical differences between traditional SEO and generative engine optimization." },
      link: "https://blog.georankers.co/2025/08/08/hello-world/",
      date: "2025-08-08T00:00:00",
      categories: [2],
      featured_media: 0
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

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
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
            <div className="hidden md:flex space-x-8">
              <a href="#quiz" className="quiz-text-animated text-sm font-medium flex items-center transition-colors duration-300">
                <Star className="w-4 h-4 mr-1 star-animated" />
                <span className="font-semibold">AI Quiz</span>
              </a>
              <a href="#problem" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Why GeoRankers
              </a>
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Features
              </a>
              <a href="https://blog.georankers.co" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Blog
              </a>
              <a href="#faq" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                FAQ
              </a>
              <a href="#waitlist" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Join Waitlist
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button 
                onClick={scrollToWaitlist}
                className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 pt-24">
        {/* Background Elements */}
        <div className="hero-gradient absolute inset-0 z-0"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-pink-400/10 rounded-full blur-3xl animate-pulse-soft" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/5 via-purple-300/5 to-pink-300/5 rounded-full blur-3xl animate-pulse-soft" style={{animationDelay: '0.5s'}}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Mobile Layout - Stacked Content */}
          <div className="lg:hidden">
            {/* Content First on Mobile */}
            <div className="text-center mb-12">
              <div className="text-sm font-medium text-slate-500 mb-4 uppercase tracking-wide">
                AI Search Intelligence
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                Are You <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Invisible</span> in AI Search?
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed">
                GeoRankers is the definitive AI search optimization platform that helps B2B SaaS companies track, optimize, and build the brand authority needed to get visible in AI search across leading AI models like ChatGPT and Gemini.
              </p>
              
              <div className="mb-8">
                <Button 
                  onClick={scrollToWaitlist}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-2xl font-semibold text-base transform hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Join the Waitlist
                </Button>
              </div>
            </div>
            
            {/* Visual Below Content on Mobile */}
            <div className="flex justify-center">
              <div className="glass rounded-3xl p-4 sm:p-6 animate-float max-w-sm">
                <svg viewBox="0 0 400 300" className="w-full h-auto">
                  {/* Background */}
                  <defs>
                    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
                      <stop offset="100%" stopColor="rgba(168, 85, 247, 0.1)" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Central GeoRankers hub */}
                  <circle cx="200" cy="150" r="40" fill="url(#bgGradient)" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="2" filter="url(#glow)"/>
                  <text x="200" y="155" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">GeoRankers</text>
                  
                  {/* AI Platform nodes with logos */}
                  {/* ChatGPT */}
                  <circle cx="100" cy="80" r="25" fill="rgba(255, 255, 255, 0.9)" stroke="rgba(16, 163, 127, 0.8)" strokeWidth="2"/>
                  <foreignObject x="85" y="65" width="30" height="30">
                    <img src={openaiLogo} alt="OpenAI" className="w-full h-full object-contain" />
                  </foreignObject>
                  <line x1="125" y1="90" x2="175" y2="130" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
                  </line>
                  
                  {/* Gemini */}
                  <circle cx="300" cy="80" r="25" fill="rgba(255, 255, 255, 0.9)" stroke="rgba(66, 133, 244, 0.8)" strokeWidth="2"/>
                  <foreignObject x="285" y="65" width="30" height="30">
                    <img src={geminiLogo} alt="Gemini" className="w-full h-full object-contain" />
                  </foreignObject>
                  <line x1="275" y1="90" x2="225" y2="130" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                  </line>
                  
                  {/* Perplexity */}
                  <circle cx="100" cy="220" r="25" fill="rgba(255, 255, 255, 0.9)" stroke="rgba(20, 184, 166, 0.8)" strokeWidth="2"/>
                  <foreignObject x="85" y="205" width="30" height="30">
                    <img src={perplexityLogo} alt="Perplexity" className="w-full h-full object-contain" />
                  </foreignObject>
                  <line x1="125" y1="210" x2="175" y2="170" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1s"/>
                  </line>
                  
                  {/* Grok */}
                  <circle cx="300" cy="220" r="25" fill="rgba(255, 255, 255, 0.9)" stroke="rgba(0, 0, 0, 0.8)" strokeWidth="2"/>
                  <foreignObject x="285" y="205" width="30" height="30">
                    <img src={grokLogo} alt="Grok" className="w-full h-full object-contain" />
                  </foreignObject>
                  <line x1="275" y1="210" x2="225" y2="170" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1.5s"/>
                  </line>
                  
                  {/* Data flow indicators */}
                  <circle cx="50" cy="150" r="3" fill="#10a37f">
                    <animate attributeName="cx" values="50;180" dur="3s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1;0" dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="350" cy="150" r="3" fill="#4285f4">
                    <animate attributeName="cx" values="350;220" dur="3s" repeatCount="indefinite" begin="0.75s"/>
                    <animate attributeName="opacity" values="1;0" dur="3s" repeatCount="indefinite" begin="0.75s"/>
                  </circle>
                  
                  {/* Labels */}
                  <text x="200" y="30" textAnchor="middle" fill="rgba(30, 41, 59, 0.8)" fontSize="12" fontWeight="bold">AI Search Monitoring</text>
                  <text x="200" y="290" textAnchor="middle" fill="rgba(71, 85, 105, 0.6)" fontSize="10">Real-time Brand Visibility Tracking</text>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Desktop Layout - Side by Side */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="text-left">
              <div className="text-sm font-medium text-slate-500 mb-6 uppercase tracking-wide">
                AI Search Intelligence
              </div>
              
              <h1 className="text-7xl font-bold mb-8 leading-tight">
                Are You <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Invisible</span> in AI Search?
              </h1>
              
              <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                GeoRankers is the definitive AI search optimization platform that helps B2B SaaS companies track, optimize, and build the brand authority needed to get visible in AI search across leading AI models like ChatGPT and Gemini.
              </p>
              
              <div className="mb-8">
                <Button 
                  onClick={scrollToWaitlist}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-2xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  <Rocket className="w-5 h-5 mr-3" />
                  Join the Waitlist
                </Button>
              </div>
            </div>
            
            {/* Right Column - Visual */}
            <div className="lg:pl-8">
              <div className="glass rounded-3xl p-4 sm:p-8 lg:p-12 animate-float">
                <svg viewBox="0 0 400 300" className="w-full h-auto">
                  {/* Background */}
                  <defs>
                    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
                      <stop offset="100%" stopColor="rgba(168, 85, 247, 0.1)" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Central GeoRankers hub */}
                  <circle cx="200" cy="150" r="40" fill="url(#bgGradient)" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="2" filter="url(#glow)"/>
                  <text x="200" y="155" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">GeoRankers</text>
                  
                  {/* AI Platform nodes with logos */}
                  {/* ChatGPT */}
                  <circle cx="100" cy="80" r="25" fill="rgba(255, 255, 255, 0.9)" stroke="rgba(16, 163, 127, 0.8)" strokeWidth="2"/>
                  <foreignObject x="85" y="65" width="30" height="30">
                    <img src={openaiLogo} alt="OpenAI" className="w-full h-full object-contain" />
                  </foreignObject>
                  <line x1="125" y1="90" x2="175" y2="130" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
                  </line>
                  
                  {/* Gemini */}
                  <circle cx="300" cy="80" r="25" fill="rgba(255, 255, 255, 0.9)" stroke="rgba(66, 133, 244, 0.8)" strokeWidth="2"/>
                  <foreignObject x="285" y="65" width="30" height="30">
                    <img src={geminiLogo} alt="Gemini" className="w-full h-full object-contain" />
                  </foreignObject>
                  <line x1="275" y1="90" x2="225" y2="130" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                  </line>
                  
                  {/* Perplexity */}
                  <circle cx="100" cy="220" r="25" fill="rgba(255, 255, 255, 0.9)" stroke="rgba(20, 184, 166, 0.8)" strokeWidth="2"/>
                  <foreignObject x="85" y="205" width="30" height="30">
                    <img src={perplexityLogo} alt="Perplexity" className="w-full h-full object-contain" />
                  </foreignObject>
                  <line x1="125" y1="210" x2="175" y2="170" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1s"/>
                  </line>
                  
                  {/* Grok */}
                  <circle cx="300" cy="220" r="25" fill="rgba(255, 255, 255, 0.9)" stroke="rgba(0, 0, 0, 0.8)" strokeWidth="2"/>
                  <foreignObject x="285" y="205" width="30" height="30">
                    <img src={grokLogo} alt="Grok" className="w-full h-full object-contain" />
                  </foreignObject>
                  <line x1="275" y1="210" x2="225" y2="170" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1.5s"/>
                  </line>
                  
                  {/* Data flow indicators */}
                  <circle cx="50" cy="150" r="3" fill="#10a37f">
                    <animate attributeName="cx" values="50;180" dur="3s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1;0" dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="350" cy="150" r="3" fill="#4285f4">
                    <animate attributeName="cx" values="350;220" dur="3s" repeatCount="indefinite" begin="0.75s"/>
                    <animate attributeName="opacity" values="1;0" dur="3s" repeatCount="indefinite" begin="0.75s"/>
                  </circle>
                  
                  {/* Labels */}
                  <text x="200" y="30" textAnchor="middle" fill="rgba(30, 41, 59, 0.8)" fontSize="12" fontWeight="bold">AI Search Monitoring</text>
                  <text x="200" y="290" textAnchor="middle" fill="rgba(71, 85, 105, 0.6)" fontSize="10">Real-time Brand Visibility Tracking</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Search Statistics Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              The AI Search Revolution: <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">By the Numbers</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Traditional search is rapidly being displaced by AI-powered discovery
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Statistic 1: Zero-click searches */}
            <Card className="glass rounded-2xl p-6 sm:p-8 text-center border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="pt-0">
                <div className="mb-4">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent mb-2">
                    60%
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Nearly 60% of Google searches end with no website visit, as users get instant answers from AI-powered summaries
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Statistic 2: Organic traffic drop */}
            <Card className="glass rounded-2xl p-6 sm:p-8 text-center border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="pt-0">
                <div className="mb-4">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-2">
                    35%
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Drop in organic search traffic in B2B SaaS companies due to AI Overviews and AI-powered search platforms
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Statistic 3: AI tools growth */}
            <Card className="glass rounded-2xl p-6 sm:p-8 text-center border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="pt-0">
                <div className="mb-4">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">
                    45%
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    AI tools now account for a rapidly growing 45% month-over-month increase in search sessions
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Statistic 4: LLM visitor value */}
            <Card className="glass rounded-2xl p-6 sm:p-8 text-center border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="pt-0">
                <div className="mb-4">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                    5x
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    The Average LLM Visitor is Worth 5x the Average Traditional Organic Search Visitor based on conversion rate
                  </p>
                </div>
              </CardContent>
            </Card>
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

      {/* Why GeoRankers Section */}
      <section id="problem" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-slate-50/50 to-blue-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Why <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">GeoRankers:</span> The Strategic Advantage
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              The New AI Search Paradigm Demands a New Strategy
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Strategic Benefits */}
            <Card className="glass rounded-2xl p-6 sm:p-8 transform hover:scale-105 transition-all duration-300 border-0">
              <CardContent className="pt-0">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">First-Mover Advantage in AI Search</h3>
                <p className="text-slate-600">Position your brand as an authority before competitors understand the new paradigm. Get visible in AI responses while others are still figuring out traditional SEO.</p>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl p-6 sm:p-8 transform hover:scale-105 transition-all duration-300 border-0">
              <CardContent className="pt-0">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">Predictive Content Strategy</h3>
                <p className="text-slate-600">Stop reacting to trends. Our forecasting engine identifies emerging topics 30-60 days before they peak, helping you create content that captures traffic at the perfect moment.</p>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl p-6 sm:p-8 transform hover:scale-105 transition-all duration-300 border-0">
              <CardContent className="pt-0">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                  <ChartLine className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">Data-Driven Decision Making</h3>
                <p className="text-slate-600">Replace guesswork with intelligence. Track your brand mentions across AI platforms, understand context, and optimize based on real performance data from ChatGPT, Gemini, and Claude.</p>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl p-6 sm:p-8 transform hover:scale-105 transition-all duration-300 border-0">
              <CardContent className="pt-0">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">Competitive Intelligence</h3>
                <p className="text-slate-600">Monitor how often competitors appear in AI responses, identify content gaps they're missing, and discover opportunities to outrank them in AI-generated recommendations.</p>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl p-6 sm:p-8 transform hover:scale-105 transition-all duration-300 border-0">
              <CardContent className="pt-0">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">Accelerated Brand Authority</h3>
                <p className="text-slate-600">Build topical expertise that AI models recognize and cite. Our platform guides you to create content that establishes your brand as the go-to source in your industry.</p>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl p-6 sm:p-8 transform hover:scale-105 transition-all duration-300 border-0">
              <CardContent className="pt-0">
                <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">AI-Native Marketing ROI</h3>
                <p className="text-slate-600">Measure what matters in the AI era. Track brand visibility, mention quality, and competitive positioning across AI platforms to prove marketing impact and guide budget allocation.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-violet-50/30 to-pink-50/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              The GeoRankers <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Feature Suite:</span> From Insights to Authority
            </h2>
          </div>
          
          {/* Feature 1: Predictive AI Search Forecasting */}
          <Card className="glass rounded-3xl p-4 sm:p-8 lg:p-12 mb-8 sm:mb-12 border-0">
            <CardContent className="pt-0">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl flex items-center justify-center mr-4">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Predictive AI Search Forecasting</h3>
                  </div>
                  <p className="text-lg text-slate-600 mb-6">
                    Stop reacting to trends. Our proprietary engine analyzes historical AI search data to forecast emerging topics and questions in your industry, helping you build a forward-looking content strategy that wins market share before competitors even know it exists.
                  </p>
                </div>
                <div className="glass-strong rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                      <span className="text-slate-700">Rising: "AI automation tools"</span>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600">+45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
                      <span className="text-slate-700">Emerging: "B2B workflow optimization"</span>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                        <span className="text-sm text-blue-600">+28%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-lg border border-purple-500/20">
                      <span className="text-slate-700">Forecasted: "Enterprise AI adoption"</span>
                      <div className="flex items-center">
                        <Brain className="w-4 h-4 text-purple-500 mr-1" />
                        <span className="text-sm text-purple-600">Next 30d</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Feature 2: Content Gap Analysis */}
          <Card className="glass rounded-3xl p-8 sm:p-12 mb-12 border-0">
            <CardContent className="pt-0">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="glass-strong rounded-2xl p-6">
                    <h4 className="font-bold mb-4 text-slate-900">Gap Analysis Results:</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border border-red-500/20">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-sm">Missing: "Best CRM features"</span>
                          <div className="flex items-center">
                            <EyeOff className="w-4 h-4 text-red-500 mr-1" />
                            <span className="text-xs text-red-600">High Impact</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-lg border border-yellow-500/20">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-sm">Competitor citing: "Integration guides"</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="text-xs text-yellow-600">Medium</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-sm">Opportunity: "API documentation"</span>
                          <div className="flex items-center">
                            <Lightbulb className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-xs text-green-600">Quick Win</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                      <Search className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Content Gap Analysis</h3>
                  </div>
                  <p className="text-lg text-slate-600 mb-6">
                    Uncover your biggest opportunities. We analyze what your top competitors are getting cited for in AI search and identify the topics you're missing, giving you a prioritized roadmap of content recommendations to close those gaps.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Feature 3: Powerful Analytics */}
          <Card className="glass rounded-3xl p-8 sm:p-12 mb-12 border-0">
            <CardContent className="pt-0">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                      <ChartLine className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Powerful Analytics</h3>
                  </div>
                  <p className="text-lg text-slate-600 mb-6">
                    Make data-driven decisions. Our comprehensive suite provides deep insights into your brand's performance, including sentiment scoring of AI-generated mentions, competitive benchmarking against rivals, and detailed source analysis to uncover where AI models are pulling their information.
                  </p>
                </div>
                <div className="glass-strong rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                      <div className="text-2xl font-bold text-blue-600 mb-1">87%</div>
                      <div className="text-xs text-slate-600">Sentiment Score</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-xl border border-purple-500/20">
                      <div className="text-2xl font-bold text-purple-600 mb-1">#3</div>
                      <div className="text-xs text-slate-600">Market Rank</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                      <div className="text-2xl font-bold text-green-600 mb-1">24</div>
                      <div className="text-xs text-slate-600">Source Sites</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20">
                      <div className="text-2xl font-bold text-orange-600 mb-1">+15%</div>
                      <div className="text-xs text-slate-600">Visibility</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Feature 4: AI Search A/B Testing */}
          <Card className="glass rounded-3xl p-8 sm:p-12 mb-12 border-0">
            <CardContent className="pt-0">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="glass-strong rounded-2xl p-6">
                    <h4 className="font-bold mb-4 text-slate-900">A/B Test Results:</h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">Version A: "Best CRM Software"</span>
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Winner</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-20 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-2"></div>
                          <span className="text-sm text-green-600">78% visibility</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-gray-500/10 to-slate-500/10 rounded-lg border border-gray-500/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">Version B: "Top CRM Solutions"</span>
                          <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">Test</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-12 h-2 bg-gray-400 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-600">45% visibility</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                      <Repeat className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">AI Search A/B Testing</h3>
                  </div>
                  <p className="text-lg text-slate-600 mb-6">
                    Remove the guesswork from your AI content. Deploy different variations of your content and our platform will monitor which headlines, formats, or keyword combinations are most effective at earning top AI visibility.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Feature 5: Community Engagement Recommendations */}
          <Card className="glass rounded-3xl p-8 sm:p-12 mb-12 border-0">
            <CardContent className="pt-0">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Community Engagement Recommendations</h3>
                  </div>
                  <p className="text-lg text-slate-600 mb-6">
                    Build brand authority where it counts. Our platform recommends specific threads on communities like Reddit and Product Hunt that are relevant to your business, helping you build authentic authority and influence the data sources that power AI search.
                  </p>
                </div>
                <div className="glass-strong rounded-2xl p-6">
                  <h4 className="font-bold mb-4 text-slate-900">Recommended Threads:</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-slate-700">r/SaaS - "Best automation tools"</div>
                          <div className="text-xs text-slate-500">12k upvotes • 2 days ago</div>
                        </div>
                        <div className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded-full">High Priority</div>
                      </div>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-lg border border-pink-500/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-slate-700">Product Hunt - "AI tools discussion"</div>
                          <div className="text-xs text-slate-500">800 comments • 1 day ago</div>
                        </div>
                        <div className="text-sm text-pink-600 bg-pink-100 px-2 py-1 rounded-full">Medium</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          

        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/20 to-indigo-50/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Join the <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Waitlist</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600">
              Be among the first to take control of your AI search presence
            </p>
          </div>
          
          <Card className="glass-strong rounded-3xl p-4 sm:p-8 lg:p-12 border-0">
            <CardContent className="pt-0">
              {showSuccess ? (
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-4 sm:p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-green-400 mb-2">Welcome to the waitlist!</h3>
                  <p className="text-sm sm:text-base text-slate-600">We'll notify you as soon as GeoRankers is ready for you.</p>
                </div>
              ) : (
                <form id="waitlist-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="fullName" className="block text-sm font-medium text-slate-600 mb-2">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      {...form.register("fullName")}
                      placeholder="Enter your full name"
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/80 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm text-sm sm:text-base"
                    />
                    {form.formState.errors.fullName && (
                      <p className="text-red-400 text-sm mt-2">
                        <span className="mr-1">⚠</span>
                        {form.formState.errors.fullName.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-2">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      placeholder="Enter your email address"
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/80 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm text-sm sm:text-base"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-sm mt-2">
                        <span className="mr-1">⚠</span>
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="companyName" className="block text-sm font-medium text-slate-600 mb-2">
                      Company Name *
                    </Label>
                    <Input
                      id="companyName"
                      {...form.register("companyName")}
                      placeholder="Enter your company name"
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/80 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm text-sm sm:text-base"
                    />
                    {form.formState.errors.companyName && (
                      <p className="text-red-400 text-sm mt-2">
                        <span className="mr-1">⚠</span>
                        {form.formState.errors.companyName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="challenge" className="block text-sm font-medium text-slate-600 mb-2">
                      What's your biggest AI search challenge?
                    </Label>
                    <textarea
                      id="challenge"
                      {...form.register("challenge")}
                      placeholder="Tell us about your AI search challenges (optional)"
                      rows={4}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/80 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm text-sm sm:text-base resize-none"
                    />
                    {form.formState.errors.challenge && (
                      <p className="text-red-400 text-sm mt-2">
                        <span className="mr-1">⚠</span>
                        {form.formState.errors.challenge.message}
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={waitlistMutation.isPending}
                    className="w-full mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-2xl font-semibold text-base sm:text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center"
                  >
                    {waitlistMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 animate-spin" />
                        Adding you to the list...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                        Join Waitlist
                      </>
                    )}
                  </Button>
                  
                  <p className="text-center text-xs sm:text-sm text-slate-500 mt-4 sm:mt-6">
                    🔒 Your information is secure and will never be shared.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
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
          </div>

          {/* CTA at bottom of FAQ */}
          <div className="text-center mt-12 sm:mt-16">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
              Ready to dominate AI search?
            </h3>
            <p className="text-slate-600 mb-6 sm:mb-8">
              Join the waitlist and be among the first to access GeoRankers.
            </p>
            <Button 
              onClick={scrollToWaitlist}
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-2xl font-semibold text-base sm:text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
              Join the Waitlist
            </Button>
          </div>
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
                  <div className={`h-48 p-6 flex items-center justify-center ${
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

      {/* Quiz Modal */}
      <QuizModal 
        isOpen={showQuizModal} 
        onClose={() => setShowQuizModal(false)} 
      />
    </div>
  );
}
