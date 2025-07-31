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
  CheckCircle
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
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                GeoRankers
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full"></div>
          </div>
          
          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Left side - Text content */}
            <div className="glass rounded-3xl p-8 sm:p-12 animate-float">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Own Your Presence in{' '}
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  AI Search
                </span>
              </h2>
              
              <p className="text-xl sm:text-2xl text-slate-600 mb-8 leading-relaxed">
                The visibility intelligence tool that helps brands track and improve their presence in AI-generated search results across ChatGPT, Gemini, Perplexity, and Claude.
              </p>
              
              <div className="glass-strong rounded-2xl p-6 mb-8">
                <p className="text-lg text-slate-700 leading-relaxed">
                  Just as SEO tools helped brands rank on Google, GeoRankers helps brands track and improve their presence in AI search—the next major discovery channel.
                </p>
              </div>
            </div>

            {/* Right side - Hero diagram */}
            <div className="glass rounded-3xl p-8 animate-float" style={{animationDelay: '0.5s'}}>
              <div className="relative">
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
          
          {/* CTA Button */}
          <Button 
            onClick={scrollToWaitlist}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-2xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            <Rocket className="w-5 h-5 mr-3" />
            Join the Waitlist
          </Button>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-slate-50/50 to-blue-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Why <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">AI Search</span> Matters
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The search landscape is rapidly evolving, and traditional SEO strategies aren't enough anymore.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="glass rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 border-0">
              <CardContent className="pt-0">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">AI-Powered Answers</h3>
                <p className="text-slate-600">AI is replacing traditional keyword search with contextual, generative answers</p>
              </CardContent>
            </Card>
            
            <Card className="glass rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 border-0">
              <CardContent className="pt-0">
                <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">User Trust</h3>
                <p className="text-slate-600">Users trust those AI answers—often without clicking to verify</p>
              </CardContent>
            </Card>
            
            <Card className="glass rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 border-0">
              <CardContent className="pt-0">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <EyeOff className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">Invisible Brands</h3>
                <p className="text-slate-600">If your brand is missing in AI responses, you're invisible in the new search paradigm</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="glass-strong rounded-3xl p-8 sm:p-12 text-center border-0">
            <CardContent className="pt-0">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-900">GeoRankers gives brands back their control and visibility</h3>
              <div className="grid sm:grid-cols-3 gap-6 text-lg">
                <div className="flex items-center justify-center">
                  <Search className="w-5 h-5 text-blue-400 mr-3" />
                  <span>Know where they're being surfaced</span>
                </div>
                <div className="flex items-center justify-center">
                  <ChartLine className="w-5 h-5 text-violet-400 mr-3" />
                  <span>See how competitors are doing</span>
                </div>
                <div className="flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-pink-400 mr-3" />
                  <span>Take action to improve presence</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-violet-50/30 to-pink-50/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Core <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to monitor and improve your AI search visibility
            </p>
          </div>
          
          {/* Feature 1: AI Search Presence Checker */}
          <Card className="glass rounded-3xl p-8 sm:p-12 mb-12 border-0">
            <CardContent className="pt-0">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">AI Search Presence Checker</h3>
                  </div>
                  <p className="text-lg text-slate-600 mb-6">
                    Enter your brand name or website to check if it appears in answers from ChatGPT, Gemini, Perplexity, and Grok. Results display whether you are mentioned, and where.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="glass rounded-xl p-4 text-center border-0 hover:bg-green-500/10 transition-colors">
                      <CardContent className="pt-0">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm">
                          <img src={openaiLogo} alt="OpenAI" className="w-8 h-8 object-contain" />
                        </div>
                        <div className="text-sm text-slate-700 font-medium">ChatGPT</div>
                      </CardContent>
                    </Card>
                    <Card className="glass rounded-xl p-4 text-center border-0 hover:bg-blue-500/10 transition-colors">
                      <CardContent className="pt-0">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm">
                          <img src={geminiLogo} alt="Gemini" className="w-8 h-8 object-contain" />
                        </div>
                        <div className="text-sm text-slate-700 font-medium">Gemini</div>
                      </CardContent>
                    </Card>
                    <Card className="glass rounded-xl p-4 text-center border-0 hover:bg-teal-500/10 transition-colors">
                      <CardContent className="pt-0">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm">
                          <img src={perplexityLogo} alt="Perplexity" className="w-8 h-8 object-contain" />
                        </div>
                        <div className="text-sm text-slate-700 font-medium">Perplexity</div>
                      </CardContent>
                    </Card>
                    <Card className="glass rounded-xl p-4 text-center border-0 hover:bg-gray-500/10 transition-colors">
                      <CardContent className="pt-0">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm">
                          <img src={grokLogo} alt="Grok" className="w-8 h-8 object-contain" />
                        </div>
                        <div className="text-sm text-slate-700 font-medium">Grok</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <Card className="glass-strong rounded-2xl p-6 border-0">
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-slate-700">Your brand mentioned in 3/4 platforms</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                        <span className="text-slate-700">Appearing in top 3 recommendations</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                        <span className="text-slate-700">Missing from Grok responses</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          {/* Feature 2: Prompt Engine */}
          <Card className="glass rounded-3xl p-8 sm:p-12 mb-12 border-0">
            <CardContent className="pt-0">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <Card className="glass-strong rounded-2xl p-6 order-2 lg:order-1 border-0">
                  <CardContent className="pt-0">
                    <h4 className="font-bold mb-4 text-slate-900">Sample Prompts:</h4>
                    <div className="space-y-3 text-sm">
                      <Card className="glass rounded-lg p-3 border-0">
                        <CardContent className="pt-0 p-0">
                          <span className="text-slate-700">"What are the best customer engagement tools in 2025?"</span>
                        </CardContent>
                      </Card>
                      <Card className="glass rounded-lg p-3 border-0">
                        <CardContent className="pt-0 p-0">
                          <span className="text-slate-700">"Which AI platforms are best for small businesses?"</span>
                        </CardContent>
                      </Card>
                      <Card className="glass rounded-lg p-3 border-0">
                        <CardContent className="pt-0 p-0">
                          <span className="text-slate-700">"Top CRM solutions for startups"</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
                <div className="order-1 lg:order-2">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Prompt Engine (LLM Search Simulation)</h3>
                  </div>
                  <p className="text-lg text-slate-600 mb-6">
                    Simulates how real users ask AI by generating diverse prompts. The engine feeds these prompts to LLMs and extracts brand mentions from responses.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Feature 3: AI Visibility Score */}
          <Card className="glass rounded-3xl p-8 sm:p-12 mb-12 border-0">
            <CardContent className="pt-0">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">AI Visibility Score (Signal Tracker)</h3>
                </div>
                <p className="text-lg text-slate-600 mb-8">
                  A simple score built on multiple factors to give you a clear picture of your AI search presence.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="glass-strong rounded-xl p-6 text-center border-0">
                  <CardContent className="pt-0">
                    <Hash className="w-8 h-8 text-blue-400 mb-4 mx-auto" />
                    <h4 className="font-bold mb-2 text-slate-900">Mention Count</h4>
                    <p className="text-sm text-slate-600">Number of AI tools that mention your brand</p>
                  </CardContent>
                </Card>
                <Card className="glass-strong rounded-xl p-6 text-center border-0">
                  <CardContent className="pt-0">
                    <Star className="w-8 h-8 text-violet-400 mb-4 mx-auto" />
                    <h4 className="font-bold mb-2 text-slate-900">Mention Type</h4>
                    <p className="text-sm text-slate-600">Top pick, listed, or side reference</p>
                  </CardContent>
                </Card>
                <Card className="glass-strong rounded-xl p-6 text-center border-0">
                  <CardContent className="pt-0">
                    <Tag className="w-8 h-8 text-pink-400 mb-4 mx-auto" />
                    <h4 className="font-bold mb-2 text-slate-900">Source Quality</h4>
                    <p className="text-sm text-slate-600">G2, Reddit, YouTube, etc.</p>
                  </CardContent>
                </Card>
                <Card className="glass-strong rounded-xl p-6 text-center border-0">
                  <CardContent className="pt-0">
                    <Repeat className="w-8 h-8 text-green-400 mb-4 mx-auto" />
                    <h4 className="font-bold mb-2 text-slate-900">Frequency</h4>
                    <p className="text-sm text-slate-600">Appearance across prompt variants</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          {/* Additional Features Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Competitor Comparison */}
            <Card className="glass rounded-3xl p-8 border-0">
              <CardContent className="pt-0">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Competitor Comparison</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Add your top competitors and instantly benchmark your AI visibility against theirs.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 glass rounded-lg">
                    <span className="text-slate-600">Your Brand</span>
                    <div className="flex items-center">
                      <div className="w-20 h-2 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full mr-2"></div>
                      <span className="text-sm text-slate-600">85%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 glass rounded-lg">
                    <span className="text-slate-600">Competitor A</span>
                    <div className="flex items-center">
                      <div className="w-16 h-2 bg-gray-500 rounded-full mr-2"></div>
                      <span className="text-sm text-slate-600">72%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Source Breakdown */}
            <Card className="glass rounded-3xl p-8 border-0">
              <CardContent className="pt-0">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Source Breakdown</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Uncover the sources AI tools are referencing when they mention your brand.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <Card className="glass text-center p-3 rounded-lg border-0">
                    <CardContent className="pt-0 p-0">
                      <Star className="w-4 h-4 text-yellow-400 mb-1 mx-auto" />
                      <div className="text-xs text-slate-600">G2</div>
                    </CardContent>
                  </Card>
                  <Card className="glass text-center p-3 rounded-lg border-0">
                    <CardContent className="pt-0 p-0">
                      <div className="text-sm text-orange-400 mb-1">R</div>
                      <div className="text-xs text-slate-600">Reddit</div>
                    </CardContent>
                  </Card>
                  <Card className="glass text-center p-3 rounded-lg border-0">
                    <CardContent className="pt-0 p-0">
                      <div className="text-sm text-red-400 mb-1">▶</div>
                      <div className="text-xs text-slate-600">YouTube</div>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-sm text-slate-400 mt-4">
                  Know where to double down with reviews, backlinks, or content.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Final Features Row */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Actionable Recommendations */}
            <Card className="glass rounded-3xl p-8 border-0">
              <CardContent className="pt-0">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white font-bold">6</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Actionable Recommendations</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Based on your visibility profile, GeoRankers recommends:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-slate-600">Platforms to optimize (e.g., G2, Capterra)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-slate-600">Types of content to create</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-slate-600">Improve AI-generated answer influence</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Report Export + Alerts */}
            <Card className="glass rounded-3xl p-8 border-0">
              <CardContent className="pt-0">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white font-bold">7</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Report Export + Alerts</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Download className="w-5 h-5 text-blue-400 mr-3" />
                    <span className="text-slate-600">Downloadable visibility reports</span>
                  </div>
                  <div className="flex items-center">
                    <Bell className="w-5 h-5 text-violet-400 mr-3" />
                    <span className="text-slate-600">Set alerts for visibility changes</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-pink-400 mr-3" />
                    <span className="text-slate-600">Monitor competitor spikes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Positioning Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50/20 to-cyan-50/30">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-strong rounded-3xl p-8 sm:p-12 text-center border-0">
            <CardContent className="pt-0">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-900">
                Your <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">AI Search Visibility Platform</span>
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                GeoRankers combines LLM prompt analysis, brand intelligence, and source tracking to help modern brands win attention in the new era of search.
              </p>
              <Card className="glass rounded-2xl p-6 mb-8 border-0">
                <CardContent className="pt-0">
                  <p className="text-lg font-medium text-slate-700">
                    <Lightbulb className="w-5 h-5 text-yellow-400 mr-2 inline" />
                    Think: Ahrefs + G2 + ChatGPT visibility monitor — all in one.
                  </p>
                </CardContent>
              </Card>
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
