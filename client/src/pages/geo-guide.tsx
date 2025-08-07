import { useEffect, useState } from 'react';
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
import { ArrowRight, Rocket, Loader2, CheckCircle } from "lucide-react";
import aiAdoptionChart from "@assets/Image 1_1754564817867.png";
import aiImpactChart from "@assets/Image 2_1754565019296.png";

export default function GeoGuide() {
  const [activeSection, setActiveSection] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
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

  const scrollToWaitlist = () => {
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    document.title = 'The GEO Playbook - A Strategic Guide for B2B and SaaS Marketers | GeoRankers';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover the power of GEO with our strategic guide for B2B and SaaS marketers. Learn how generative engines like ChatGPT and Gemini are changing search.');
    }

    // Set up intersection observer for active section highlighting
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        // Find the entry with the largest intersection ratio
        let bestEntry: IntersectionObserverEntry | null = null;
        let bestRatio = 0;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestEntry = entry;
            bestRatio = entry.intersectionRatio;
          }
        });
        
        if (bestEntry) {
          setActiveSection((bestEntry.target as HTMLElement).id);
        }
      },
      { 
        rootMargin: '-10% 0px -60% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5]
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);



  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                GeoRankers
              </span>
            </a>
            <div className="hidden md:block">
              <Button onClick={scrollToWaitlist} className="bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:from-blue-600 hover:to-violet-600">
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 min-h-[70vh] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\",%3E%3Cdefs%3E%3ClinearGradient id=\"grad1\" x1=\"0%25\" y1=\"0%25\" x2=\"100%25\" y2=\"100%25\"%3E%3Cstop offset=\"0%25\" style=\"stop-color:%234F46E5;stop-opacity:0.1\" /%3E%3Cstop offset=\"100%25\" style=\"stop-color:%237C3AED;stop-opacity:0.1\" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=\"100\" height=\"100\" fill=\"url(%23grad1)\" /%3E%3Cpath d=\"M20,20 Q50,5 80,20 Q95,50 80,80 Q50,95 20,80 Q5,50 20,20\" fill=\"none\" stroke=\"%234F46E5\" stroke-width=\"0.5\" opacity=\"0.3\" /%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\" fill=\"%234F46E5\" opacity=\"0.4\" /%3E%3Ccircle cx=\"70\" cy=\"70\" r=\"1.5\" fill=\"%237C3AED\" opacity=\"0.4\" /%3E%3Ccircle cx=\"60\" cy=\"20\" r=\"1\" fill=\"%2306B6D4\" opacity=\"0.4\" /%3E%3C/svg%3E')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/90 to-violet-50/80"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <div className="text-sm text-blue-600 font-medium mb-4 uppercase tracking-wide">
                Strategic Guide
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                The GEO Playbook
              </h1>
              
              <h2 className="text-xl md:text-2xl text-gray-700 mb-8 font-medium">
                A Strategic Guide for B2B and SaaS Marketers
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Discover the power of GEO with our strategic guide for B2B and SaaS marketers. 
                Learn how generative engines like ChatGPT and Gemini are changing search — 
                and what your brand needs to do to stay visible.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={scrollToWaitlist} size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Join the Waitlist
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative">
              <div className="relative p-8">
                {/* Main Report/Playbook */}
                <div className="relative bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl shadow-2xl p-8 transform rotate-6 hover:rotate-3 transition-transform duration-300">
                  <div className="text-white">
                    <div className="text-xs uppercase tracking-wider opacity-90 mb-2">Strategic Guide 2025</div>
                    <h3 className="text-2xl font-bold mb-4 leading-tight">The GEO Playbook</h3>
                    <div className="space-y-2 text-sm opacity-90">
                      <p>• AI Search Optimization</p>
                      <p>• Platform Strategy</p>
                      <p>• Implementation Framework</p>
                      <p>• Performance Tracking</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/20">
                      <div className="text-xs">GeoRankers Team</div>
                    </div>
                  </div>
                  
                  {/* Small decorative chart */}
                  <div className="absolute bottom-4 right-4 w-16 h-12 bg-white/20 rounded backdrop-blur-sm">
                    <div className="p-2 h-full flex items-end justify-between">
                      <div className="w-2 bg-white/60 rounded-t" style={{height: '40%'}}></div>
                      <div className="w-2 bg-white/80 rounded-t" style={{height: '70%'}}></div>
                      <div className="w-2 bg-white/90 rounded-t" style={{height: '90%'}}></div>
                      <div className="w-2 bg-white rounded-t" style={{height: '60%'}}></div>
                    </div>
                  </div>
                </div>

                {/* Secondary Document - Analytics Report */}
                <div className="absolute top-4 right-0 bg-white rounded-lg shadow-xl p-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300 w-48 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-2">AI Search Analytics</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">ChatGPT</span>
                      <span className="font-semibold text-green-600">+40%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Gemini</span>
                      <span className="font-semibold text-blue-600">+35%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Perplexity</span>
                      <span className="font-semibold text-purple-600">+28%</span>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>

                {/* Third Document - Strategy Overview */}
                <div className="absolute bottom-0 left-4 bg-white rounded-lg shadow-lg p-3 transform rotate-12 hover:rotate-6 transition-transform duration-300 w-40 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-2">Key Strategies</div>
                  <div className="space-y-1 text-xs text-gray-700">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                      <span>Multi-platform presence</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span>Content optimization</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                      <span>Community engagement</span>
                    </div>
                  </div>
                </div>

                {/* Floating Icons */}
                <div className="absolute top-8 left-8 w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                  </svg>
                </div>

                <div className="absolute top-16 right-12 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>

                <div className="absolute bottom-12 right-8 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Content */}
      <main className="flex max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 gap-4 lg:gap-8">
        {/* Table of Contents - Hidden on mobile */}
        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-16 h-fit max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-3">Table of Contents</h3>
            <nav className="space-y-0">
              <a href="#search-evolution" className={`group block px-2 py-1.5 rounded transition-all duration-200 transform hover:translate-x-1 ${
                activeSection === 'search-evolution' 
                ? 'text-blue-600 bg-blue-50 translate-x-1' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}>
                <span className="text-xs font-medium">The Long Road to AI</span>
              </a>
              <a href="#what-is-geo" className={`group block px-2 py-1.5 rounded transition-all duration-200 transform hover:translate-x-1 ${
                activeSection === 'what-is-geo' 
                ? 'text-blue-600 bg-blue-50 translate-x-1' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}>
                <span className="text-xs font-medium">What Exactly Is GEO?</span>
              </a>
              <a href="#key-components" className={`group block px-2 py-1.5 rounded transition-all duration-200 transform hover:translate-x-1 ${
                activeSection === 'key-components' 
                ? 'text-blue-600 bg-blue-50 translate-x-1' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}>
                <span className="text-xs font-medium">Key Components of GEO</span>
              </a>
              <a href="#why-geo-matters" className={`group block px-2 py-1.5 rounded transition-all duration-200 transform hover:translate-x-1 ${
                activeSection === 'why-geo-matters' 
                ? 'text-blue-600 bg-blue-50 translate-x-1' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}>
                <span className="text-xs font-medium">Why Does GEO Matter for B2B SaaS?</span>
              </a>
              <a href="#how-engines-work" className={`group block px-2 py-1.5 rounded transition-all duration-200 transform hover:translate-x-1 ${
                activeSection === 'how-engines-work' 
                ? 'text-blue-600 bg-blue-50 translate-x-1' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}>
                <span className="text-xs font-medium">How Do Generative Engines Work?</span>
              </a>
              <a href="#zero-click-search" className={`group block px-2 py-1.5 rounded transition-all duration-200 transform hover:translate-x-1 ${
                activeSection === 'zero-click-search' 
                ? 'text-blue-600 bg-blue-50 translate-x-1' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}>
                <span className="text-xs font-medium">The Rise of Zero Click Search</span>
              </a>
              <a href="#geo-vs-seo" className={`group block px-2 py-1.5 rounded transition-all duration-200 transform hover:translate-x-1 ${
                activeSection === 'geo-vs-seo' 
                ? 'text-blue-600 bg-blue-50 translate-x-1' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}>
                <span className="text-xs font-medium">GEO vs SEO</span>
              </a>
              <a href="#best-practices" className={`group block px-2 py-1.5 rounded transition-all duration-200 transform hover:translate-x-1 ${
                activeSection === 'best-practices' 
                ? 'text-blue-600 bg-blue-50 translate-x-1' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}>
                <span className="text-xs font-medium">Best Practices for GEO</span>
              </a>
              <a href="#measuring-success" className={`group block px-2 py-1.5 rounded transition-all duration-200 transform hover:translate-x-1 ${
                activeSection === 'measuring-success' 
                ? 'text-blue-600 bg-blue-50 translate-x-1' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}>
                <span className="text-xs font-medium">Measuring Success</span>
              </a>
              <a href="#challenges" className={`group block px-2 py-1.5 rounded transition-all duration-200 transform hover:translate-x-1 ${
                activeSection === 'challenges' 
                ? 'text-blue-600 bg-blue-50 translate-x-1' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}>
                <span className="text-xs font-medium">Challenges and Ethical Considerations</span>
              </a>
              <a href="#future-search" className={`group block px-2 py-1.5 rounded transition-all duration-200 transform hover:translate-x-1 ${
                activeSection === 'future-search' 
                ? 'text-blue-600 bg-blue-50 translate-x-1' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}>
                <span className="text-xs font-medium">The Future of Search and Marketing</span>
              </a>
              <a href="#audit-strategy" className={`group block px-2 py-1.5 rounded transition-all duration-200 transform hover:translate-x-1 ${
                activeSection === 'audit-strategy' 
                ? 'text-blue-600 bg-blue-50 translate-x-1' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}>
                <span className="text-xs font-medium">Step by Step GEO Audit and Strategy</span>
              </a>
              <a href="#organizational-impact" className={`group block px-2 py-1.5 rounded transition-all duration-200 transform hover:translate-x-1 ${
                activeSection === 'organizational-impact' 
                ? 'text-blue-600 bg-blue-50 translate-x-1' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}>
                <span className="text-xs font-medium">Organisational Impact: Building a GEO Ready Team</span>
              </a>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 max-w-4xl lg:ml-0">
        <article className="prose prose-lg max-w-none px-2 sm:px-0">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              In 2025, a brand can be at the top of Google search results but not show up when someone asks ChatGPT for suggestions.
            </p>
            
            <p className="mb-6">
              This disconnect is no longer theoretical. It's playing out every day across AI search engines like ChatGPT, Gemini, and Perplexity - tools that don't just crawl and list, but synthesize, summarize, and infer. They behave less like a traditional index and more like a well-informed colleague. That shift has deep implications for how visibility, relevance, and authority are defined.
            </p>

            <p className="mb-6">
              While traditional SEO still matters, it no longer guarantees discoverability at the moments when buyers are interacting directly with generative AI.
            </p>

            <p className="mb-6">
              A joint study from Princeton University and the Allen Institute for AI highlights this challenge. As LLMs increasingly pull and rephrase information across sources, visibility becomes probabilistic and far harder to control. Gartner, meanwhile, predicts a 25% drop in traditional search marketing spend by 2026, as budgets move toward AI-native channels.
            </p>

            <p className="mb-6 font-medium">
              The user behaviour is already here:
            </p>
            <ul className="mb-8 space-y-2">
              <li>300 million weekly active users on ChatGPT as of early 2025</li>
              <li>Perplexity and Gemini gaining traction as research and discovery tools</li>
              <li>In the US, generative AI search adoption is projected to grow from 13 million in 2023 to 90 million by 2027</li>
            </ul>

            <p className="mb-6">
              As these interfaces become embedded in browsers, productivity tools, and mobile operating systems, the gatekeepers of discovery are changing and with them, the rules of visibility.
            </p>

            <p className="mb-6">
              This guide is written for founders, CMOs, product marketers, and growth leaders in B2B SaaS who want to stay ahead of that shift. It's not about chasing another acronym. It's about building real authority in a landscape increasingly mediated by AI.
            </p>

            <p className="mb-6 font-medium">
              In this guide you will find:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Practical strategies grounded in how LLMs actually generate answers</li>
              <li>Insights from real-world examples, user queries, and platform behaviour</li>
              <li>Data-backed context to distinguish trend from transformation</li>
            </ul>

            <p className="text-lg font-medium text-gray-900 mb-8">
              If your brand is not showing up in AI search results, you're not just missing clicks – you are absent from the conversation altogether.
            </p>

            <p className="mb-6">
              Before we dive into what to do about it, let's understand how we got here.
            </p>
          </section>

          {/* Section 1: The Long Road to AI */}
          <section id="search-evolution" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Long Road to AI: How Search Evolved</h2>
            
            <p className="mb-6">
              Imagine the internet as a vast library.
            </p>

            <p className="mb-6">
              In the early 1990s there was no catalogue, only shelves filled with disorganised books. Early search engines like Archie and Veronica worked like primitive card indexes. In 1994 Yahoo launched a human curated directory; librarians manually categorised websites. AltaVista arrived a year later with the first large scale full text index of the web. It matched keywords but made no judgement about quality. These early tools were useful but limited - finding relevant information often felt like wandering through stacks with no guidance.
            </p>

            <div className="mb-8 flex justify-center">
              <svg viewBox="0 0 800 400" className="w-full max-w-4xl h-auto">
                {/* Timeline line */}
                <line x1="50" y1="350" x2="750" y2="350" stroke="#e5e7eb" strokeWidth="3"/>
                
                {/* 1990s - Directory Era */}
                <circle cx="100" cy="350" r="8" fill="#3b82f6"/>
                <line x1="100" y1="350" x2="100" y2="280" stroke="#3b82f6" strokeWidth="2"/>
                <rect x="60" y="200" width="80" height="80" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
                <text x="100" y="230" textAnchor="middle" fill="#374151" fontSize="14" fontWeight="600">Yahoo!</text>
                <text x="100" y="245" textAnchor="middle" fill="#374151" fontSize="12">Directory</text>
                <text x="100" y="260" textAnchor="middle" fill="#374151" fontSize="12">Human</text>
                <text x="100" y="275" textAnchor="middle" fill="#374151" fontSize="12">Curated</text>
                <text x="100" y="180" textAnchor="middle" fill="#111827" fontSize="14" fontWeight="700">1990s</text>
                <text x="100" y="370" textAnchor="middle" fill="#6b7280" fontSize="12">Directory Era</text>

                {/* 2000s - PageRank Era */}
                <circle cx="250" cy="350" r="8" fill="#10b981"/>
                <line x1="250" y1="350" x2="250" y2="280" stroke="#10b981" strokeWidth="2"/>
                <rect x="210" y="200" width="80" height="80" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2"/>
                <text x="250" y="230" textAnchor="middle" fill="#374151" fontSize="14" fontWeight="600">Google</text>
                <text x="250" y="245" textAnchor="middle" fill="#374151" fontSize="12">PageRank</text>
                <text x="250" y="260" textAnchor="middle" fill="#374151" fontSize="12">Link</text>
                <text x="250" y="275" textAnchor="middle" fill="#374151" fontSize="12">Authority</text>
                <text x="250" y="180" textAnchor="middle" fill="#111827" fontSize="14" fontWeight="700">2000s</text>
                <text x="250" y="370" textAnchor="middle" fill="#6b7280" fontSize="12">Algorithm Era</text>

                {/* 2010s - Knowledge Graph */}
                <circle cx="400" cy="350" r="8" fill="#f59e0b"/>
                <line x1="400" y1="350" x2="400" y2="280" stroke="#f59e0b" strokeWidth="2"/>
                <rect x="360" y="200" width="80" height="80" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
                <text x="400" y="225" textAnchor="middle" fill="#374151" fontSize="14" fontWeight="600">Knowledge</text>
                <text x="400" y="240" textAnchor="middle" fill="#374151" fontSize="14" fontWeight="600">Graph</text>
                <text x="400" y="255" textAnchor="middle" fill="#374151" fontSize="12">Structured</text>
                <text x="400" y="270" textAnchor="middle" fill="#374151" fontSize="12">Data</text>
                <text x="400" y="180" textAnchor="middle" fill="#111827" fontSize="14" fontWeight="700">2010s</text>
                <text x="400" y="370" textAnchor="middle" fill="#6b7280" fontSize="12">Semantic Era</text>

                {/* 2020s - AI Era */}
                <circle cx="550" cy="350" r="8" fill="#8b5cf6"/>
                <line x1="550" y1="350" x2="550" y2="280" stroke="#8b5cf6" strokeWidth="2"/>
                <rect x="510" y="200" width="80" height="80" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2"/>
                <text x="550" y="225" textAnchor="middle" fill="#374151" fontSize="14" fontWeight="600">ChatGPT</text>
                <text x="550" y="240" textAnchor="middle" fill="#374151" fontSize="14" fontWeight="600">Gemini</text>
                <text x="550" y="255" textAnchor="middle" fill="#374151" fontSize="12">Generative</text>
                <text x="550" y="270" textAnchor="middle" fill="#374151" fontSize="12">AI</text>
                <text x="550" y="180" textAnchor="middle" fill="#111827" fontSize="14" fontWeight="700">2020s</text>
                <text x="550" y="370" textAnchor="middle" fill="#6b7280" fontSize="12">AI Era</text>

                {/* Future */}
                <circle cx="700" cy="350" r="8" fill="#ef4444"/>
                <line x1="700" y1="350" x2="700" y2="280" stroke="#ef4444" strokeWidth="2"/>
                <rect x="660" y="200" width="80" height="80" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
                <text x="700" y="225" textAnchor="middle" fill="#374151" fontSize="14" fontWeight="600">AI-First</text>
                <text x="700" y="240" textAnchor="middle" fill="#374151" fontSize="14" fontWeight="600">Search</text>
                <text x="700" y="255" textAnchor="middle" fill="#374151" fontSize="12">Conversational</text>
                <text x="700" y="270" textAnchor="middle" fill="#374151" fontSize="12">Interface</text>
                <text x="700" y="180" textAnchor="middle" fill="#111827" fontSize="14" fontWeight="700">Future</text>
                <text x="700" y="370" textAnchor="middle" fill="#6b7280" fontSize="12">Conversational Era</text>

                {/* Arrows between eras */}
                <polygon points="170,350 190,345 190,355" fill="#6b7280"/>
                <polygon points="320,350 340,345 340,355" fill="#6b7280"/>
                <polygon points="470,350 490,345 490,355" fill="#6b7280"/>
                <polygon points="620,350 640,345 640,355" fill="#6b7280"/>

                {/* Title */}
                <text x="400" y="30" textAnchor="middle" fill="#111827" fontSize="20" fontWeight="700">Evolution of Search Technology</text>
                <text x="400" y="50" textAnchor="middle" fill="#6b7280" fontSize="14">From Human Curation to AI-Generated Answers</text>
              </svg>
            </div>

            <p className="mb-6">
              Two innovations changed that. The first was link analysis.
            </p>

            <p className="mb-6">
              In 1998 Google introduced PageRank, an algorithm that measured the authority of a page by counting the number and quality of links pointing to it. Links became votes of confidence. This approach produced more relevant results and gave rise to SEO as marketers learned how to earn and leverage backlinks. For more than a decade PageRank and its descendants dominated how people found information.
            </p>

            <p className="mb-6">
              The second major change was structured data.
            </p>

            <p className="mb-6">
              In 2001, the World Wide Web (www) Consortium promoted the Semantic Web and Resource Description Framework, encouraging developers to annotate pages with machine readable metadata. Adoption was slow, but the idea of structured information took hold. In 2008 Common Crawl began providing open access to web scale data.
            </p>

            <p className="mb-6">
              A year later, search engines formed Schema.org to standardise markup. This allowed Google and others to understand that "John Smith" is a person, not just a collection of words, and to display rich snippets.
            </p>

            <p className="mb-6">
              From there the pace accelerated.
            </p>

            <p className="mb-6">
              In 2012 Google introduced the Knowledge Graph, connecting entities like companies, people and concepts. When you searched for a brand, you saw a panel with key facts.
            </p>

            <p className="mb-6">
              In 2015 Google launched Rank Brain, an early application of machine learning to search. But the real watershed moment came in 2019 when Google integrated BERT (Bidirectional Encoder Representations from Transformers). BERT allowed the engine to understand context by analysing the relationships between words, not just the words themselves. For instance, it could differentiate between "best tools for small teams" and "team of small tools," capturing nuance.
            </p>

            <p className="mb-6">
              In 2021 Google announced the Multitask Unified Model (MUM), a multimodal model that can understand and generate text, images and video. MUM signalled that search would evolve beyond text and that answering complex queries might involve synthesising content across formats. Meanwhile researchers and start-ups were experimenting with large language models trained on public data.
            </p>

            <p className="mb-6">
              When OpenAI released ChatGPT at the end of 2022, the public saw a glimpse of what would happen if a model could answer questions conversationally by drawing on a vast corpus of data. People started using ChatGPT as a search tool. In 2023 OpenAI launched GPT-4, raising the bar for reasoning and summarisation. Perplexity emerged as a dedicated generative search engine, and Google responded with its Search Generative Experience and later AI Overviews. By 2024, AI generated summaries appeared in around eighteen per cent of U.S. search queries.
            </p>

            <p className="mb-6">
              This history is not just interesting trivia. It explains why search results today sometimes look like paragraphs of text rather than lists of links. It also reveals why optimising solely for the blue links of the past may no longer be enough. If you treat generative engines as a mystery, you will miss opportunities to influence them. Instead you need to understand their inputs and behaviours, which is where GEO comes in.
            </p>
          </section>

          {/* First CTA Banner */}
          <div className="my-12 bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20 rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Ready to Master AI Search Optimization?</h3>
            <p className="text-gray-600 mb-6">Join thousands of marketers getting ahead of the AI search revolution</p>
            <Button onClick={scrollToWaitlist} className="bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:from-blue-600 hover:to-violet-600 px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300">
              <Rocket className="w-4 h-4 mr-2" />
              Join the Waitlist
            </Button>
          </div>

          {/* Section 2: What Exactly Is GEO? */}
          <section id="what-is-geo" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What Exactly Is GEO?</h2>
            
            <p className="mb-6">
              Generative Engine Optimisation (GEO) is the practice of influencing how AI powered search systems perceive, cite and summarise your brand. If SEO is about ensuring that search algorithms rank your web pages, GEO is about ensuring that large language models and generative engines integrate your brand into their answers. Put differently, SEO helps you place signposts along the highway, while GEO helps you become part of the travel guide that the AI writes for the traveller.
            </p>

            <p className="mb-6">
              The concept of GEO was formalised in a 2024 study by researchers at Princeton University and the Allen Institute for AI (<a href="https://arxiv.org/pdf/2311.09735" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Source</a>). They defined a generative engine as an AI system that synthesises responses by summarising information from multiple sources. Unlike traditional search engines that return lists of links, generative engines produce complete answers. This provides convenience for users but reduces the visibility of the original publishers.
            </p>

            <p className="mb-6">
              The researchers proposed treating generative engines as black boxes and designed experiments to see how different content strategies affected visibility in AI answers. They created a benchmark called GEO-bench and discovered that certain tactics - such as including verifiable statistics, quoting experts and linking to trusted sources could increase the frequency with which a brand is mentioned by up to 40%.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">How GEO Differs From Traditional SEO</h3>
            
            <p className="mb-6">
              Both SEO and GEO aim to connect users with relevant information, but they operate in different contexts and reward different signals.
            </p>

            <p className="mb-6">
              In SEO, the primary goal is to improve your ranking in search engine results pages (SERPs). You optimise on-page content for keywords, build backlinks to signal authority, improve site speed, create a mobile friendly experience and ensure that crawlers can index your pages. Success is measured by metrics like organic traffic, click through rate, bounce rate and conversions.
            </p>

            <p className="mb-6">
              In GEO, the goal is to increase your presence in AI generated answers. You influence how large language models learn and retrieve information by seeding your brand across various sources and by crafting content that models find easy to quote. You care about whether your brand appears when someone asks an AI assistant a question, how it is described and what sources are cited. Metrics include share of voice in AI answers, frequency of citations, sentiment of mentions and alignment with your messaging.
            </p>

            <p className="mb-6">
              SEO still remains essential as Generative engines often rely on high ranking pages as part of their training and retrieval pipelines. Yet SEO alone does not guarantee success in a generative context.
            </p>

            <p className="mb-6">
              You could rank first on Google and still be ignored by ChatGPT if your brand is not present in the data sources that the model uses or if your content lacks the structure that makes it quotable. Conversely, you might lack strong traditional SEO but still surface in AI answers because customers rave about you on Reddit or because your research report is widely cited.
            </p>
          </section>

          {/* Section 3: Key Components of GEO */}
          <section id="key-components" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Components of GEO</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Verifiable Statements and Statistics</h3>
            <p className="mb-6">
              AI models value information they can corroborate. Including clear data points, quotes and statistics, especially those attributed to credible third parties helps your content become a candidate for citation. For example, referencing Gartner's projection that traditional search marketing spend will fall by twenty five per cent by 2026 not only educates your reader but also signals to AI that your article connects to authoritative research.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-channel Presence</h3>
            <p className="mb-6">
              Generative engines do not rely on your site alone. They pull from discussion forums, Q and A communities, review aggregators, news sites and research papers. Engaging with audiences on Reddit threads, contributing answers on Stack Overflow or Quora and ensuring that satisfied customers leave detailed reviews on G2 or Capterra increases the likelihood that models will encounter your brand. Each mention becomes a breadcrumb that a model can follow.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Structured and Accessible Content</h3>
            <p className="mb-6">
              Use schema markup to signal key information such as product categories, pricing and reviews. Provide clear section headings, bullet points and FAQs. These structures help retrieval systems identify relevant snippets. Avoid putting core content behind paywalls without an accessible summary; models cannot cite what they cannot reach.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Consistent Messaging and Summarisation</h3>
            <p className="mb-6">
              Across blog posts, case studies, press releases and documentation, describe your product in consistent language. Summarise your value proposition in a sentence or two at the top of each piece of content. Models often quote the first descriptive sentences they find. If your messaging varies widely, the AI may misinterpret or omit it.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Engagement and Signal Amplification</h3>
            <p className="mb-6">
              Participate authentically in communities where your customers seek advice. Provide thoughtful answers without overtly promoting your product. Encourage users to share their experiences. When multiple independent voices describe your solution similarly, models recognise a pattern and become more likely to include you.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Tracking and Feedback Loops</h3>
            <p className="mb-6">
              Regularly test AI assistants with queries relevant to your category. Note whether and how your brand is mentioned and which sources the models cite. Adjust your content strategy based on what you observe. As of 2025, mainstream SEO tools like Ahrefs and Semrush are starting to experiment with AI visibility features, but these remain in beta and do not reliably indicate how ChatGPT or Gemini recommend your brand. Custom monitoring and manual testing are still necessary.
            </p>

            <p className="mb-6 font-medium text-gray-900">
              GEO does not replace SEO; it expands the field of play. By understanding both, you can position your brand to succeed in the dual worlds of generative and traditional search.
            </p>
          </section>

          {/* Section 4: Why GEO Matters for B2B SaaS */}
          <section id="why-geo-matters" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Does GEO Matter for B2B SaaS in 2025 and Beyond?</h2>
            
            <p className="mb-6">
              Large language models are not a passing fad - they are becoming mainstream tools for research and decision making. For B2B SaaS companies the stakes are especially high because purchase cycles often involve complex questions and peer recommendations. Let us examine why GEO should be on your strategic agenda.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Search Adoption Is Soaring</h3>
            
            <p className="mb-6">
              The adoption curve of AI powered search looks steep. Based on research reports:
            </p>
            
            <ul className="mb-6 space-y-2">
              <li>In 2023 around thirteen million American adults used AI tools for search</li>
              <li>Market analysts predict that this number will rise to ninety million by 2027. That is a near sevenfold increase in four years.</li>
            </ul>

            <p className="mb-6">
              Generational differences are also notable. Survey data shows that about 31% of Gen Z search activity already occurs on AI platforms. Younger users see AI assistants as a natural way to ask for help. As these users move into decision making roles, AI search will become a default.
            </p>

            <p className="mb-6">
              The graph below illustrates this projected growth in AI search adoption. While the precise figures may vary, the trend is clear: a large and growing portion of the population is turning to generative assistants for answers.
            </p>

            <div className="mb-8 flex justify-center">
              <img 
                src={aiAdoptionChart}
                alt="Estimated Adoption of AI Search Among U.S. Adults (Millions) - A line graph showing growth from 13 million users in 2023 to projected 90 million users by 2027"
                className="max-w-full h-auto rounded-lg shadow-md border border-gray-200"
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Traditional Search Traffic Is Declining</h3>
            
            <p className="mb-6">
              The rise of AI search is not merely additive - it erodes some of the traffic that would otherwise go to websites.
            </p>

            <p className="mb-6">
              Zero click searches - queries that end without a user clicking any result are on the rise. SparkToro's analysis found that roughly 60% of all Google searches now end without a click.(<a href="https://sparktoro.com/blog/2024-zero-click-search-study-for-every-1000-us-google-searches-only-374-clicks-go-to-the-open-web-in-the-eu-its-360/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Source</a>) 
            </p>

            <p className="mb-6">
              This phenomenon is not new, but it has accelerated as Google rolls out AI Overviews, which display AI generated summaries above the links. Research by Ahrefs indicates that AI summaries alone cut clicks by about 34%. In some categories, AI overviews appear in nearly half of search results and can reduce organic traffic by 15 to 25%. For content marketers used to measuring success in clicks, this is a major wake up call.
            </p>

            <p className="mb-6">
              The chart below visualises the magnitude of this effect by showing three metrics on one scale - the % of searches that result in zero clicks, the share of search results that contain AI overviews and the average estimated reduction in traffic due to summaries.
            </p>

            <div className="mb-8 flex justify-center">
              <img 
                src={aiImpactChart}
                alt="Impact of AI Overviews and Summaries on Search Traffic - A bar chart showing Zero-Click Searches at 60%, AI Overviews Share at 47%, and Traffic Reduction at 20%"
                className="max-w-full h-auto rounded-lg shadow-md border border-gray-200"
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Trust Is Still Being Earned</h3>
            
            <p className="mb-6">
              Although adoption is growing, trust in AI search is not universal.
            </p>

            <p className="mb-6">
              A 2024 survey by Pew found that 28% of U.S. adults do not trust AI generated search results (Source). At the same time 63% of the people feel underwhelmed or unaware of AI search features (Source).
            </p>

            <p className="mb-6">
              This scepticism is understandable as generative models sometimes hallucinate or present outdated information. For brands, this environment presents both risk and opportunity. There is risk in being misrepresented by an AI but also opportunity to build trust by ensuring that accurate information about your product is easily discoverable and verifiable.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Budgets Are Shifting</h3>
            
            <p className="mb-6">
              Gartner predicts that by 2026 overall spending on search marketing will decline by about a quarter as budgets shift toward AI driven platforms (Source). Meanwhile the AI content marketing industry is projected to grow from 2.4 billion dollars in 2023 to 17.6 billion dollars by 2033 (Source). In other words, money is moving in the direction of generative technologies.
            </p>

            <p className="mb-6">
              Companies that ignore this shift risk being left behind and those who adapt their strategies, stand to gain visibility and authority.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">The B2B Buyer Journey Is Changing</h3>
            
            <p className="mb-6">
              B2B buying cycles are long and involve multiple stakeholders. Prospects research solutions, read reviews, consult peers and often rely on influencers.
            </p>

            <p className="mb-6">
              AI assistants are increasingly integrated into this process. For example, a head of operations might ask ChatGPT - "What are the best SaaS tools for automated contract management?"
            </p>

            <p className="mb-6">
              If the assistant names competitors but not your platform, you lose mindshare before the buyer even visits your site. As more tools embed generative search directly into enterprise software, - like Microsoft integrating ChatGPT into its productivity suite and Google baking Gemini into Android, the top of the funnel will be shaped by AI.
            </p>

            <p className="mb-6">
              Taken together these trends make a compelling case for GEO. It is not just about capturing incremental traffic - it is about ensuring that your brand is part of the conversation where decisions begin.
            </p>
          </section>

          {/* Second CTA Banner */}
          <div className="my-12 bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Don't Get Left Behind in AI Search</h3>
            <p className="text-gray-600 mb-6">Start building your AI search presence today with proven GEO strategies</p>
            <Button onClick={scrollToWaitlist} className="bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600 px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300">
              <ArrowRight className="w-4 h-4 mr-2" />
              Join the Waitlist
            </Button>
          </div>

          {/* Section 5: How Generative Engines Work */}
          <section id="how-engines-work" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How Do Generative Engines Work?</h2>
            
            <p className="mb-6">
              To optimise for generative engines you need to understand how they construct answers. While proprietary models like those from OpenAI and Google do not disclose all details, we can outline the common architecture and behaviours. This knowledge will inform your GEO strategy.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Training and Fine Tuning</h3>
            
            <p className="mb-6">
              Large language models (LLMs) are trained on massive corpora of text - books, articles, websites, forums and more. Models like GPT-3.5 and GPT-4 have parameter counts in the hundreds of billions. Their initial training provides a broad base of knowledge but is not continuously updated.
            </p>

            <p className="mb-6">
              For example, ChatGPT free in early 2024 had a knowledge cutoff in late 2023 and did not access live data. To stay current, providers rely on fine tuning (where a model is further trained on a specific domain) or on retrieval augmentation (where a model fetches recent documents during inference).
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Retrieval-Augmented Generation (RAG)</h3>
            
            <p className="mb-6">
              Search augmented models like ChatGPT Plus, Gemini and Perplexity use RAG.
            </p>

            <p className="mb-6">
              When a user asks a question, the system performs three steps:
            </p>
            <ol className="mb-6 space-y-2 ml-6">
              <li>It retrieves relevant documents from a search index or database;</li>
              <li>It selects the most useful passages; and</li>
              <li>It feeds these passages to the language model, which uses them to generate a response.</li>
            </ol>

            <p className="mb-6">
              This process combines the general knowledge of the base model with up to date information. It is crucial because it determines which sources get cited in the final answer. If your content is not present in the retrieval step, the model will not mention you regardless of your SEO ranking.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Citation Patterns and Biases</h3>
            
            <p className="mb-6">
              A July 2025 study on AI search systems analysed over 24,000 conversations and more than 65,000 responses. It found that only about 9% of citations came from news outlets and that citations were concentrated in a small number of sources.
            </p>

            <p className="mb-6">
              In other words, generative engines tend to draw from a narrow set of domains - often forums, Q&A sites and popular blogs rather than the broad diversity of the web. The study also observed a slight liberal bias in the citation distribution, although this did not significantly affect user satisfaction. For brands though, the implication is clear: you need to show up on the platforms that models prefer.
            </p>

            <p className="mb-6">
              Another issue is citation accuracy.
            </p>

            <p className="mb-6">
              A 2025 paper examined retrieval augmented generation (RAG) systems and found that only about 74% of generated citations were accurate. Inaccurate citations can misattribute your content or fail to represent your position. The paper proposed a post processing technique called CiteFix that improved citation accuracy by around 15%.
            </p>

            <p className="mb-6">
              While this research focuses on improving models, it underscores why brands must monitor how they are referenced. Misrepresentation can occur, and you may need to correct it.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Hallucinations and Context Windows</h3>
            
            <p className="mb-6">
              Generative models sometimes hallucinate, meaning they produce information that is plausible sounding but false.
            </p>

            <p className="mb-6">
              Hallucinations happen when a model lacks sufficient context or when the training data contains errors. Models also have limited context windows, which restrict the amount of text they can process at once. When summarising long documents, they may miss important nuances.
            </p>

            <p className="mb-6">
              These factors make it crucial to provide clear and concise information up front. If you bury key facts deep in a page or across multiple posts, the model may not see them.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Static Versus Search Augmented Models</h3>
            
            <p className="mb-6">
              It is important to understand that not all AI assistants behave the same.
            </p>

            <p className="mb-6">
              Static models, such as the free version of ChatGPT and some enterprise assistants, rely solely on their training data. They have fixed knowledge cutoffs and cannot access new information.
            </p>

            <p className="mb-6">
              Search augmented models, like ChatGPT Plus, Gemini and Perplexity, combine a pre trained model with a live search component. They can pull in current data, and they typically provide citations and links in their answers. When you optimise for GEO you need to be aware of which model your audience uses.
            </p>

            <p className="mb-6">
              Strategies that work for static models (e.g., making sure your content is included in training sets through open licenses) may differ from those needed for search augmented models (e.g., focusing on live citations from forums and review sites).
            </p>

            <p className="mb-6">
              Understanding these mechanics helps you see why GEO requires a broader perspective than SEO. You are not just optimising for a crawler - you are influencing both the training data that shapes a model's knowledge and the retrieval mechanisms that supply fresh information at inference time.
            </p>
          </section>

          {/* Section 6: The Rise of Zero Click Search */}
          <section id="zero-click-search" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Rise of Zero Click Search</h2>
            
            <p className="mb-6">
              One of the most immediate consequences of generative search is the reduction in clicks. For years SEO specialists fought for top spots on results pages because they knew that users would click on the first few links.
            </p>

            <p className="mb-6">
              But what happens when the answer appears directly on the search page?
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Zero Click Explained</h3>
            
            <p className="mb-6">
              A zero click search occurs when a user's query is answered without them clicking any links. Examples include weather summaries, definitions, currency conversions and now AI generated overviews.
            </p>

            <p className="mb-6">
              In the aftermath of Google's March 2024 core update, AI overviews appeared in roughly 18% of U.S. searches. Ahrefs researchers found that AI summaries reduced click through rate by around 34%. For informational queries, AI overviews appear in about 58% of results.
            </p>

            <p className="mb-6">
              What this all means is more than half of the time, the answer is displayed without users clicking any link.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">How Zero Click Affects B2B</h3>
            
            <p className="mb-6">
              B2B searches often involve informational queries.
            </p>

            <p className="mb-6">
              A product manager might ask - "What are the key features to look for in customer support software?"
            </p>

            <p className="mb-6">
              If an AI overview provides a list of features and tools, the searcher may never click through to vendor pages. This does not mean that vendor content is irrelevant. On the contrary, the AI may have pulled the answer from vendor sites. But the traffic never reaches the source. Your brand's presence becomes invisible unless you are mentioned in the summary.
            </p>

            <p className="mb-6">
              As a result, traditional metrics like organic traffic and bounce rate capture less of the story. You might see stable or declining traffic even if your content is being used more often. This disconnect can create false negatives. Without GEO awareness you might mistakenly cut successful content because it appears to be underperforming. Conversely, you might continue investing in pages that attract clicks but never influence AI answers.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">A New Relationship With Google</h3>
            
            <p className="mb-6">
              Zero click dynamics also complicate the relationship between publishers and search engines.
            </p>

            <p className="mb-6">
              Publishers invest time and resources to create content. In the past they accepted that search engines would display snippets and links, driving at least some traffic back.
            </p>

            <p className="mb-6">
              With AI overviews, the engine summarises and sometimes paraphrases content with limited attribution. This has led to debates about fair use, compensation and copyright.
            </p>

            <p className="mb-6">
              Some media companies have sued AI providers for training on their content. Others have reached licensing agreements.
            </p>

            <p className="mb-6">
              While this guide does not aim to resolve these legal issues, they form part of the broader context. Your GEO strategy should consider how open or closed you want your content to be.
            </p>
          </section>

          {/* Section 7: GEO vs SEO */}
          <section id="geo-vs-seo" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">GEO vs SEO: Differences, Overlaps and Synergies</h2>
            
            <p className="mb-6">
              Having explored the history of search, the mechanics of generative engines and the rise of zero click results, we are ready to directly compare GEO and SEO. Understanding where they differ and overlap will help you allocate resources effectively.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Differences in Goals and Platforms</h3>
            
            <p className="mb-6">
              SEO focuses on improving your ranking in search engine results. The objective is to attract visitors to your site by appearing prominently when someone enters a relevant keyword.
            </p>

            <p className="mb-6">
              GEO, on the other hand, focuses on ensuring that your brand is included in AI generated answers. The objective is to be cited and summarised by large language models when they respond to queries.
            </p>

            <p className="mb-6">
              In SEO the platform is the search engine results page (Google, Bing). In GEO the platform includes AI chat interfaces (ChatGPT, Gemini), voice assistants, enterprise bots and any tool that uses a generative model.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Differences in Signals and Tactics</h3>
            
            <p className="mb-6">
              SEO prioritises signals like keyword relevance, backlinks, domain authority, site speed, mobile friendliness and user behaviour. You create optimised title tags, meta descriptions, alt text and structured URLs. You pursue backlinks from reputable sites to increase your domain authority.
            </p>

            <p className="mb-6">
              GEO prioritises signals like citation frequency, presence in training data, contextual relevance and verifiable information. You create content with clearly cited statistics, plant your brand in community discussions, and ensure consistent language across channels. You worry less about keyword density and more about being quotable.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Measurement Differences</h3>
            
            <p className="mb-6">
              SEO success is measured with metrics such as impressions, clicks, click through rate, bounce rate, time on page and conversions.
            </p>

            <p className="mb-6">
              While GEO success is measured by presence in AI answers, share of voice, quality and sentiment of mentions and alignment with your messaging. A high performing GEO piece might not generate many visits to your site but could strongly influence buyer perceptions through AI answers. Conversely, a high ranking SEO piece might drive traffic but never make it into a generative summary.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Complementary Roles</h3>
            
            <p className="mb-6">
              Importantly, SEO and GEO are not mutually exclusive. They are complementary.
            </p>

            <p className="mb-6">
              High ranking pages feed training data and retrieval systems making it more likely that generative engines will encounter your content.
            </p>

            <p className="mb-6">
              Structured data and accessible site architecture benefit both search crawlers and AI models. The research by Princeton and others shows that including statistics and quotes not only helps with GEO but also improves user trust in general (Source).
            </p>

            <p className="mb-6">
              For B2B marketers, the key is to identify where the two strategies overlap and to build content that serves both human readers and AI summarisation.
            </p>

            <p className="mb-6">
              Understanding these distinctions helps you allocate resources and shape expectations. If you only track SEO metrics you may conclude that certain content is underperforming. Adding GEO metrics will give you a fuller picture of how your brand is perceived in the AI powered search world.
            </p>
          </section>

          {/* Section 8: Best Practices for GEO */}
          <section id="best-practices" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Practices for GEO in B2B and SaaS Markets</h2>
            
            <p className="mb-6">
              There is no one size fits all formula for GEO because different AI systems and audiences behave differently. However, research and practitioner experience point to a set of practices that can significantly improve your visibility in generative search.
            </p>

            <p className="mb-6">
              Below are detailed guidelines tailored for B2B SaaS organisations:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Develop Authoritative Content With Verifiable Data</h3>
            
            <p className="mb-6">
              Generative models favour content that contains facts they can corroborate. When you publish a blog post, white paper or case study, include data points and statistics from reputable sources. For example, if you claim that AI content marketing will grow to 17.6 billion dollars by 2033, link to the research behind that estimate - like this - (Source) as each citation acts as a signal to the model that your content is trustworthy.
            </p>

            <p className="mb-6">
              Use footnotes, hyperlinks or parenthetical citations to attribute your sources. Even though generative engines may not always carry hyperlinks forward, the presence of the citation in the text influences training data and retrieval.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Summaries and FAQs for Easy Quoting</h3>
            
            <p className="mb-6">
              AI models often take the first short definition or description they find.
            </p>

            <p className="mb-6">
              So, at the top of a resource page or blog post, always write a short summary of your product, the problem it solves, and the solution it offers. Say something simple like, "Acme Analytics is a cloud-based platform that automates contract management for mid-sized SaaS companies." This way, if a model looks at the page, it will find a clear quote.
            </p>

            <p className="mb-6">
              Also, add a FAQ section to the end of your articles that answers common questions in a friendly way. Models can see patterns in question and answer pairs and may use your FAQs directly when users ask similar questions.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Use Structured Data and Open Formats</h3>
            
            <p className="mb-6">
              Use schema markup to give structured information about your business and product:
            </p>
            <ul className="mb-6 space-y-2 ml-6">
              <li>Use the Product schema to talk about prices, features, and reviews.</li>
              <li>Use the FAQ schema to group questions and answers.</li>
              <li>Give a sitemap that shows all the important pages.</li>
              <li>Use formats that are easy to read, like HTML, and don't embed important text inside images.</li>
            </ul>

            <p className="mb-6">
              And most importantly, don't put important product information behind sign-up walls. If you need to use gating, make sure to include a summary that covers the basics.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Engage Authentically in Community Forums</h3>
            
            <p className="mb-6">
              Generative engines get a lot of their ideas from community platforms. You can often find Reddit, Hacker News, Stack Overflow, Quora, G2, and Capterra in citations.
            </p>

            <p className="mb-6">
              Get your marketing team, engineers, product managers, and customer success leads to join in on the conversations. Be honest when you answers and let people know who you work for, but only promote your solution if you are adding value.
            </p>

            <p className="mb-6">
              Thank customers publicly if they write about your product, and ask them if you can share their feedback. Over time, you will build up a collection of endorsements from other people that models can see.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Publish Research and Thought Leadership</h3>
            
            <p className="mb-6">
              B2B buyers respect companies that produce original research.
            </p>

            <p className="mb-6">
              Publish benchmark reports, industry surveys or data studies. Make your methodology clear and cite your sources as when other sites reference your research, you gain backlinks and citations and models trained on public data will pick up on these references.
            </p>

            <p className="mb-6">
              For example, a white paper summarising the adoption of AI search in enterprise software might be cited by industry blogs, further increasing its reach.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Align Messaging Across Channels</h3>
            
            <p className="mb-6">
              People and machines both get confused by things that aren't consistent. An AI might not be able to put the pieces together if your homepage calls your solution "sales automation software," a press release calls it "customer engagement software," and your documentation calls it a "CRM plug-in."
            </p>

            <p className="mb-6">
              Make sure that the way you talk about your product is the same on your website, in social media posts, in press releases, and in documentation. Make a list of words that you and your team like and share it with them. Consistent messaging makes it easier for models to associate different references to your brand.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Keep an eye on AI Answers and Document Citations</h3>
            
            <p className="mb-6">
              Make a list of questions that potential customers might ask at different points in the funnel, and then ask ChatGPT, Gemini, and Perplexity these questions.
            </p>

            <p className="mb-6">
              Keep track of when and where your brand is mentioned, as well as the sources used, and see how things change over time. Be happy if you start showing up in places you didn't before, but also pay attention to how people talk about you.
            </p>

            <p className="mb-6">
              Check if the description about your product is correct? Is it consistent with your positioning?
            </p>

            <p className="mb-6">
              These observations will help you improve your content strategy.
            </p>

            <p className="mb-6">
              A manual approach or custom scripts may be needed because mainstream SEO tools are still working on reliable AI visibility features.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Ask for Reviews and Testimonials</h3>
            
            <p className="mb-6">
              Models frequently reference review aggregators.
            </p>

            <p className="mb-6">
              Ask your customers to leave detailed reviews on G2, Capterra or other relevant platforms and encourage them to describe specific use cases and benefits.
            </p>

            <p className="mb-6">
              Be constructive when you respond to bad reviews - that shows you care about what your customers have to say and are willing to make changes. A lot of good, detailed reviews not only help potential buyers, but they also make it more likely that generative engines will recommend you as a tool.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Use Stories and Analogies</h3>
            
            <p className="mb-6">
              AI models learn from a wide range of texts, including stories and comparisons.
            </p>

            <p className="mb-6">
              It's like this - AI search is more like a conversation with a group of people than a list of keywords. You are not in the room if no one talks about you. But when people talk about your work, your name comes up naturally, and AI pays attention.
            </p>

            <p className="mb-6">
              That's why it is a good idea to use simple, easy-to-remember comparisons in your own writing. Models that have been trained on a lot of data from the web are more likely to bring up and repeat phrases that are easy to understand and share.
            </p>

            <p className="mb-6">
              Don't use jargons. Say it in a way that both people and machines can understand.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Iterate and Adapt</h3>
            
            <p className="mb-6">
              Generative engines change quickly as models are updated, retrieval algorithms change, and users act differently.
            </p>

            <p className="mb-6">
              So, GEO is not something you can just set and forget. You have to build feedback loops into your content process and continuously monitor how AI assistants respond to queries related to you.
            </p>

            <p className="mb-6">
              If you are not appearing, tweak your summaries, add citations or engage in more community discussions. If you are appearing but the description is inaccurate, adjust your messaging on your website and in your documentation. In other words, treat GEO as an ongoing conversation with AI systems.
            </p>
          </section>

          {/* Section 9: Measuring Success */}
          <section id="measuring-success" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Measuring Success: Metrics and Tools</h2>
            
            <p className="mb-6">
              You cannot manage what you do not measure. But GEO adds new metrics into the mix that traditional SEO dashboards don't show. Here are some ways to check how you are doing:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Presence in AI Answers</h3>
            
            <p className="mb-6">
              Keep an eye on whether your brand shows up in AI responses to important questions. You can make a spreadsheet of high-intent queries and keep track of whether or not your product is mentioned in ChatGPT, Gemini, Perplexity, and other assistants. Aim to improve both the frequency of mention and the quality of your description.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Citation Frequency and Quality</h3>
            
            <p className="mb-6">
              Keep track of how many times AI responses mention your domain and which pages they link to. Some generative engines have links to sources.
            </p>

            <p className="mb-6">
              For each mention, think about whether the page you want prospects to see is the one that was linked to. If not, make the page you linked to better or make a new resource. Also keep track of citations on community sites and blogs because they help the model find things.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Sentiment and Context of Mentions</h3>
            
            <p className="mb-6">
              Analyse the tone of AI generated descriptions. Are you positioned positively? Are your strengths highlighted? If an AI mentions your product but emphasises a weakness or outdated information, take steps to update your content. Correct misconceptions in public posts and forums. You can also reach out to the communities where negative sentiments originate and provide clarifications.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Comparative Share of Voice</h3>
            
            <p className="mb-6">
              Measure how often competitors are mentioned relative to you. If a rival appears in seventy per cent of AI answers while you appear in twenty per cent, you have work to do. Analyse what sources mention the competitor. Are they generating more buzz on Reddit? Are they publishing more research? Use these insights to adapt your strategy.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Tools and Dashboards</h3>
            
            <p className="mb-6">
              As of mid-2025, there is no comprehensive off the shelf tool for GEO analytics. SEO platforms like Ahrefs and Semrush have launched beta features to track AI visibility, but they are still maturing.
            </p>

            <p className="mb-6">
              Some startups offer monitoring services that query AI assistants on your behalf and produce reports. Until the ecosystem matures, manual and semi-automated methods may be required. You can build simple scripts using the public APIs of ChatGPT or Gemini to run regular queries and combine this with logging spreadsheets or dashboards to visualise trends. Use your existing analytics stack to correlate AI presence with other metrics like brand searches, direct traffic and conversions.
            </p>
          </section>

          {/* Section 10: Challenges and Ethical Considerations */}
          <section id="challenges" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Challenges and Ethical Considerations</h2>
            
            <p className="mb-6">
              While GEO opens new avenues for visibility, it also raises complex issues. Understanding these challenges will help you develop a responsible strategy.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Citation Accuracy and Intellectual Property</h3>
            
            <p className="mb-6">
              Research shows that RAG systems produce correct citations about 74% of the time (Source). In other words, roughly one quarter of the time the citation is wrong or incomplete.
            </p>

            <p className="mb-6">
              Models may attribute a statement to your domain when it originates elsewhere or may quote you out of context. This can be frustrating and even damaging if it misrepresents your product. There are also legal debates about whether AI companies can train models on copyrighted material without permission. Some publishers have sued AI providers, while others have struck licensing deals. As a brand, you should define your content licensing strategy. Decide whether to allow open reuse, to require attribution or to restrict certain sections.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Bias and Representation</h3>
            
            <p className="mb-6">
              The 2025 study of AI search citations found that only about 9% of citations came from news sources (Source). This means that models may amplify viewpoints from niche communities while underrepresenting mainstream journalism. The same study observed a mild liberal bias in citation distribution, though this did not significantly affect user satisfaction.
            </p>

            <p className="mb-6">
              As a marketer you need to be aware that your industry might be underrepresented in the model's training data. Contribute to open knowledge bases, engage with diverse communities and publish accessible resources to help broaden the dataset.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Hallucination and Misinformation</h3>
            
            <p className="mb-6">
              Generative models sometimes hallucinate and at times they might assert that your product integrates with a platform when it does not or claim that your service costs a figure it never did.
            </p>

            <p className="mb-6">
              Such errors can mislead potential customers and damage trust. Hence, monitoring AI answers and correcting false information becomes part of your responsibility. Work with your communications team to issue clarifications publicly. Provide accurate information on your website and in your documentation and also encourage your customers and partners to reference correct details when discussing your product.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Privacy and Personalisation</h3>
            
            <p className="mb-6">
              Many AI assistants personalise their responses based on user history or preferences. A user who frequently reads posts on enterprise security might receive different recommendations than a user focused on marketing automation.
            </p>

            <p className="mb-6">
              This means that your presence in AI answers may vary by audience. While personalisation can improve relevance, it also introduces opacity as you may not know why a model recommends you to one user but not another. Transparency and user control are important ethical considerations while choosing a right tool for yourself.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Regulatory Environment</h3>
            
            <p className="mb-6">
              Governments all over the world are starting to regulate AI. The European Union's AI Act, for instance, proposes obligations on providers of general purpose AI models.
            </p>

            <p className="mb-6">
              In the United States, lawmakers are debating rules on copyright, content licensing and transparency. At the same time, search providers are experimenting with compensation models for content creators.
            </p>

            <p className="mb-6">
              Stay informed about these developments and consider participating in industry associations or discussions about fair compensation for the use of your content in AI training and output.
            </p>
          </section>

          {/* Section 11: The Future of Search and Marketing */}
          <section id="future-search" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Future of Search and Marketing</h2>
            
            <p className="mb-6">
              Generative engines will not remain static and hence, understanding where they might go next will help you future proof your strategy.
            </p>

            <p className="mb-6">
              Here are some trends and predictions that we see in this space:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Deeper Integration into Everyday Tools</h3>
            
            <p className="mb-6">
              AI assistants are becoming embedded in the software we use daily.
            </p>

            <p className="mb-6">
              Microsoft has integrated ChatGPT into its Copilot features across Office applications, Google is incorporating Gemini into Gmail, Docs and Android and many SaaS platforms are building custom assistants for internal data.
            </p>

            <p className="mb-6">
              As these integrations become standard, more B2B buyers will ask AI to summarise reports, identify vendors, draft RFPs and even conduct first rounds of vendor evaluation. And therefore, your visibility in these contexts will give you a better chance to influence these purchase decisions.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Multimodal and Interactive Search</h3>
            
            <p className="mb-6">
              Models are evolving from text only to multimodal capabilities. They can already interpret images and are learning to process audio and video. In the future a user might upload a screenshot of their analytics dashboard and ask, "What tools can improve this workflow?" Models will need to understand the image, match it to relevant concepts and recommend solutions.
            </p>

            <p className="mb-6">
              Content that includes diagrams, screenshots, video tutorials and well labelled images will become more valuable. In addition, AI search will likely become interactive. Instead of a single answer, the assistant may ask follow up questions to clarify needs and brands that provide comprehensive documentation will surely stand to benefit.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Domain Specific Models and Vertical Search</h3>
            
            <p className="mb-6">
              Large general purpose models will coexist with smaller domain specific models trained on specialised datasets. For example, a legal industry assistant might be trained on statutes and case law, while a developer assistant might be fine-tuned on code repositories. Generative search engines may spawn vertical variants for healthcare, finance or SaaS.
            </p>

            <p className="mb-6">
              GEO strategies will need to adapt to these vertical contexts by publishing content that fits the domain's preferred style and appears in the domain's sources.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Ethical and Transparent AI</h3>
            
            <p className="mb-6">
              There is growing pressure on AI providers to improve transparency about data sources and decision logic. Users may demand to know why a particular vendor was recommended or to verify the accuracy of statements and regulators may require AI engines to document provenance.
            </p>

            <p className="mb-6">
              As a brand, you can support this push for transparency by citing your sources, providing open access to your data and advocating for responsible AI practices. Doing so not only positions you as an ethical leader but may also influence how models evaluate your content.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Greater Control for Content Owners</h3>
            
            <p className="mb-6">
              In the future, content owners might be able to opt into or out of model training, specify how their content may be used, or receive compensation for citations. Protocols for content licensing may become standard. Keep an eye on developments in this space. If compensation models materialise, your high quality, frequently cited content could become a revenue source in addition to a marketing asset.
            </p>
          </section>

          {/* Section 12: Step by Step GEO Audit and Strategy */}
          <section id="audit-strategy" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Step by Step GEO Audit and Strategy</h2>
            
            <p className="mb-6">
              To implement your own GEO strategy, follow these steps:
            </p>

            <ol className="mb-6 space-y-4 ml-6">
              <li>
                <strong>Define Your Audience and Questions.</strong> Identify the personas you target (e.g., CTOs, product managers, growth marketers) and the questions they might ask an AI assistant. Include both problem oriented and solution oriented queries.
              </li>
              <li>
                <strong>Perform Baseline Testing.</strong> Use generative assistants to ask your list of questions. Record where your brand appears, which competitors are mentioned and which sources are cited. Create a spreadsheet to track results over time.
              </li>
              <li>
                <strong>Analyse Sources and Gaps.</strong> For each query, identify the domains that are cited. Note patterns: Are forums dominating? Are there specific blogs or review sites that appear frequently? Determine which of these sources you can influence directly (e.g., by contributing content) or indirectly (e.g., by encouraging customer reviews).
              </li>
              <li>
                <strong>Enhance Your Content.</strong> Review your existing pages. Add clear summaries at the top. Implement schema markup. Include citations to reputable research. Develop an FAQ section. Ensure that product names and descriptors are consistent.
              </li>
              <li>
                <strong>Engage in Communities.</strong> Identify the forums and review sites that AI engines cite. Participate in conversations with helpful answers. Encourage advocates to share their experiences. If appropriate, sponsor community projects or host AMAs (ask me anything sessions) to raise your profile.
              </li>
              <li>
                <strong>Publish Original Research.</strong> Commission surveys or analyse anonymised customer data to produce reports that others will cite. Share these insights freely under a license that allows models to use them. Promote your research in industry newsletters and on LinkedIn.
              </li>
              <li>
                <strong>Monitor and Measure.</strong> Re run your tests periodically (e.g., monthly). Track improvements in mentions, position and sentiment. Update your strategy based on what the data shows. Share the insights with your internal stakeholders. Document wins and areas for improvement.
              </li>
              <li>
                <strong>Iterate and Innovate.</strong> GEO is a moving target. As models change and new platforms emerge, adapt your tactics. Experiment with video, audio and interactive content as models expand into multimodal capabilities. Stay informed about new citation studies and retrieval research. Collaborate with your product and engineering teams to integrate AI capabilities into your own platform if relevant.
              </li>
            </ol>
          </section>

          {/* Section 13: Organisational Impact */}
          <section id="organizational-impact" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Organisational Impact: Building a GEO Ready Team</h2>
            
            <p className="mb-6">
              GEO is not just a marketing tactic; it requires cross functional collaboration. To execute a comprehensive GEO strategy, consider the following roles and responsibilities:
            </p>

            <ul className="mb-6 space-y-4">
              <li>
                <strong>Content Strategist.</strong> Leads the planning of narratives, identifies key topics and ensures that all content pieces align with messaging guidelines and include verifiable data.
              </li>
              <li>
                <strong>SEO Specialist.</strong> Ensures that traditional optimisation best practices are in place. Works closely with the content strategist to make sure pages are crawlable and properly structured.
              </li>
              <li>
                <strong>Community Manager.</strong> Monitors relevant forums, social media platforms and review sites. Engages with users, encourages reviews and reports back on sentiment trends.
              </li>
              <li>
                <strong>Data Analyst.</strong> Designs and maintains the GEO tracking dashboard. Runs AI queries, collects data on mentions and citations, and analyses patterns. Provides insights and recommendations.
              </li>
              <li>
                <strong>Product Marketer.</strong> Translates product features and benefits into clear, consistent language. Ensures that new launches are accompanied by content that meets GEO criteria. Liaises with sales to understand customer questions.
              </li>
              <li>
                <strong>Legal and Compliance Advisor.</strong> Reviews content licensing and monitors compliance with emerging AI regulations. Helps the team navigate intellectual property considerations.
              </li>
            </ul>

            <p className="mb-6">
              Building this capability takes time, but the investment will pay off as AI search becomes more prevalent. Start with one or two roles and expand as your GEO programme matures.
            </p>
          </section>

          {/* Conclusion */}
          <section id="conclusion" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion</h2>
            
            <p className="mb-6">
              Search is undergoing a fundamental transformation. The old model of ten blue links is giving way to conversational answers crafted by AI. SEO remains vital, but it is no longer the whole story.
            </p>

            <p className="mb-6">
              Generative Engine Optimization or GEO offers a framework for ensuring that your brand is visible and accurately represented in AI driven discovery. However, it demands a blend of verifiable content, community engagement, structured data, consistent messaging and continuous measurement. Along with this, it also requires strong collaboration across marketing, product, data and legal teams.
            </p>

            <p className="mb-6">
              Above all, it demands a willingness to adapt to a rapidly changing landscape.
            </p>

            <p className="mb-6">
              You cannot control how large language models learn or what they decide to summarise, but you can definitely influence them by being present, clear and consistent wherever they gather their information.
            </p>

            <p className="mb-6">
              So here is a final question for you - If a prospective customer asks an AI assistant for the best solution in your category, will your brand be part of the answer?
            </p>

            <p className="mb-6 font-medium">
              If you are not sure, now is the time to start your GEO journey.
            </p>
          </section>

          {/* Waitlist Form */}
          <section id="waitlist-form" className="py-12 bg-gradient-to-b from-blue-50/20 to-indigo-50/30 rounded-3xl">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                  Start Your <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">GEO Journey</span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600">
                  Be among the first to master AI search optimization with GeoRankers
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
                      <h3 className="text-lg sm:text-xl font-bold text-green-600 mb-2">Welcome to the waitlist!</h3>
                      <p className="text-sm sm:text-base text-gray-600">We'll notify you as soon as GeoRankers is ready for you.</p>
                    </div>
                  ) : (
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                      <div>
                        <Label htmlFor="fullName" className="block text-sm font-medium text-gray-600 mb-2">
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          {...form.register("fullName")}
                          placeholder="Enter your full name"
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm text-sm sm:text-base"
                        />
                        {form.formState.errors.fullName && (
                          <p className="text-red-400 text-sm mt-2">
                            <span className="mr-1">⚠</span>
                            {form.formState.errors.fullName.message}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...form.register("email")}
                          placeholder="Enter your email address"
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm text-sm sm:text-base"
                        />
                        {form.formState.errors.email && (
                          <p className="text-red-400 text-sm mt-2">
                            <span className="mr-1">⚠</span>
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="companyName" className="block text-sm font-medium text-gray-600 mb-2">
                          Company Name *
                        </Label>
                        <Input
                          id="companyName"
                          {...form.register("companyName")}
                          placeholder="Enter your company name"
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm text-sm sm:text-base"
                        />
                        {form.formState.errors.companyName && (
                          <p className="text-red-400 text-sm mt-2">
                            <span className="mr-1">⚠</span>
                            {form.formState.errors.companyName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="challenge" className="block text-sm font-medium text-gray-600 mb-2">
                          What's your biggest AI search challenge?
                        </Label>
                        <textarea
                          id="challenge"
                          {...form.register("challenge")}
                          placeholder="Tell us about your AI search challenges (optional)"
                          rows={4}
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm text-sm sm:text-base resize-none"
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
                      
                      <p className="text-center text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
                        🔒 Your information is secure and will never be shared.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>
        </article>
        </div>
      </main>
    </div>
  );
}