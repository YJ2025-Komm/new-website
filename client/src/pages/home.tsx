import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertWaitlistEntrySchema, type InsertWaitlistEntry } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
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
  TrendingDown
} from "lucide-react";
import geminiLogo from "@assets/Gemini_1753958628531.png";
import grokLogo from "@assets/Grok_1753958628535.png";
import openaiLogo from "@assets/Open Ai_1753958628536.png";
import perplexityLogo from "@assets/Perplexity_1753958628538.png";

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertWaitlistEntry>({
    resolver: zodResolver(insertWaitlistEntrySchema),
    defaultValues: {
      fullName: "",
      email: "",
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

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-slate-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Background Elements */}
        <div className="hero-gradient absolute inset-0 z-0"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-pink-400/10 rounded-full blur-3xl animate-pulse-soft" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/5 via-purple-300/5 to-pink-300/5 rounded-full blur-3xl animate-pulse-soft" style={{animationDelay: '0.5s'}}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="text-left">
              <div className="text-sm font-medium text-slate-500 mb-6 uppercase tracking-wide">
                AI Search Visibility Intelligence
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                Are You <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Invisible</span> in AI Search?
              </h1>
              
              <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                B2B SaaS companies are missing millions in pipeline because they're invisible when prospects ask AI tools like ChatGPT, Gemini, and Perplexity for recommendations. GeoRankers shows you exactly where you stand and how to dominate AI search results in your industry.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={scrollToWaitlist}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-2xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  <Rocket className="w-5 h-5 mr-3" />
                  Join the Waitlist
                </Button>
                
                <Button 
                  variant="outline"
                  className="inline-flex items-center px-8 py-4 border-2 border-slate-300 hover:border-slate-400 rounded-2xl font-semibold text-lg bg-white/80 hover:bg-white transition-all duration-300"
                >
                  <Eye className="w-5 h-5 mr-3" />
                  See How It Works
                </Button>
              </div>
            </div>
            
            {/* Right Column - Visual */}
            <div className="lg:pl-8">
              <div className="glass rounded-3xl p-8 sm:p-12 animate-float">
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

      {/* Why GeoRankers Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-slate-50/50 to-blue-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Why <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">GeoRankers:</span> The Strategic Advantage
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The New AI Search Paradigm Demands a New Strategy
            </p>
          </div>
          
          <div className="grid md:grid-cols-1 gap-8 mb-16">
            {/* Problem/Solution Cards */}
            <Card className="glass rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 border-0">
              <CardContent className="pt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                      <EyeOff className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-slate-900">Problem:</h3>
                    <p className="text-slate-600">Your brand is invisible in AI discovery.</p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl flex items-center justify-center mb-6">
                      <Search className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-slate-900">Solution:</h3>
                    <p className="text-slate-600">We uncover the hidden rules of AI search visibility and give you the tools to get visible in AI-generated answers.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 border-0">
              <CardContent className="pt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-slate-900">Problem:</h3>
                    <p className="text-slate-600">Your content strategy is based on guesswork.</p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl flex items-center justify-center mb-6">
                      <ChartLine className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-slate-900">Solution:</h3>
                    <p className="text-slate-600">We provide data-driven recommendations to help you get ahead of the curve and build a predictable content strategy.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 border-0">
              <CardContent className="pt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-slate-900">Problem:</h3>
                    <p className="text-slate-600">You're losing to competitors in a new search paradigm.</p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl flex items-center justify-center mb-6">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-slate-900">Solution:</h3>
                    <p className="text-slate-600">Our platform gives you the competitive intelligence to outsmart rivals and build a powerful, proactive AI search strategy.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-violet-50/30 to-pink-50/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              The GeoRankers <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Feature Suite:</span> From Insights to Authority
            </h2>
          </div>
          
          {/* Feature 1: Predictive AI Search Forecasting */}
          <Card className="glass rounded-3xl p-8 sm:p-12 mb-12 border-0">
            <CardContent className="pt-0">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
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
      <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/20 to-indigo-50/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Join the <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Waitlist</span>
            </h2>
            <p className="text-xl text-slate-600">
              Be among the first to take control of your AI search presence
            </p>
          </div>
          
          <Card className="glass-strong rounded-3xl p-8 sm:p-12 border-0">
            <CardContent className="pt-0">
              {showSuccess ? (
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-green-400 mb-2">Welcome to the waitlist!</h3>
                  <p className="text-slate-600">We'll notify you as soon as GeoRankers is ready for you.</p>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="fullName" className="block text-sm font-medium text-slate-600 mb-2">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      {...form.register("fullName")}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-4 bg-white/80 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
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
                      className="w-full px-4 py-4 bg-white/80 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-sm mt-2">
                        <span className="mr-1">⚠</span>
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={waitlistMutation.isPending}
                    className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-2xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center"
                  >
                    {waitlistMutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                        Adding you to the list...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5 mr-3" />
                        Join Waitlist
                      </>
                    )}
                  </Button>
                  
                  <p className="text-center text-sm text-slate-500 mt-6">
                    🔒 Your information is secure and will never be shared.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
