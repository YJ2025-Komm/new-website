import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Share } from "lucide-react";

export default function GeoGuide() {
  useEffect(() => {
    document.title = 'The GEO Playbook - A Strategic Guide for B2B and SaaS Marketers | GeoRankers';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover the power of GEO with our strategic guide for B2B and SaaS marketers. Learn how generative engines like ChatGPT and Gemini are changing search.');
    }
  }, []);

  const scrollToWaitlist = () => {
    window.location.href = '/#waitlist';
  };

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
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
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
                  Get Early Access
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-100/50 to-violet-100/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
                {/* GEO Playbook Illustration */}
                <div className="aspect-square bg-white/80 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center border border-gray-200/50 p-8">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    {/* Background circles */}
                    <circle cx="200" cy="200" r="180" fill="none" stroke="#E5E7EB" strokeWidth="1" opacity="0.3"/>
                    <circle cx="200" cy="200" r="140" fill="none" stroke="#D1D5DB" strokeWidth="1" opacity="0.4"/>
                    <circle cx="200" cy="200" r="100" fill="none" stroke="#9CA3AF" strokeWidth="1" opacity="0.5"/>
                    
                    {/* Central AI Brain */}
                    <circle cx="200" cy="200" r="50" fill="url(#brainGradient)" stroke="#4F46E5" strokeWidth="2"/>
                    <text x="200" y="205" textAnchor="middle" className="fill-white font-bold text-xs">AI</text>
                    
                    {/* AI Platform Icons around the center */}
                    {/* ChatGPT */}
                    <circle cx="200" cy="120" r="25" fill="url(#chatgptGradient)" stroke="#10B981" strokeWidth="2"/>
                    <text x="200" y="127" textAnchor="middle" className="fill-white font-semibold text-xs">GPT</text>
                    
                    {/* Gemini */}
                    <circle cx="280" cy="200" r="25" fill="url(#geminiGradient)" stroke="#3B82F6" strokeWidth="2"/>
                    <text x="280" y="207" textAnchor="middle" className="fill-white font-semibold text-xs">Gem</text>
                    
                    {/* Perplexity */}
                    <circle cx="200" cy="280" r="25" fill="url(#perplexityGradient)" stroke="#8B5CF6" strokeWidth="2"/>
                    <text x="200" y="287" textAnchor="middle" className="fill-white font-semibold text-xs">Prp</text>
                    
                    {/* Claude */}
                    <circle cx="120" cy="200" r="25" fill="url(#claudeGradient)" stroke="#F59E0B" strokeWidth="2"/>
                    <text x="120" y="207" textAnchor="middle" className="fill-white font-semibold text-xs">Cld</text>
                    
                    {/* Data flow lines */}
                    <path d="M 200 150 Q 200 175 200 175" stroke="#4F46E5" strokeWidth="3" fill="none" opacity="0.7" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
                    </path>
                    <path d="M 250 200 Q 225 200 225 200" stroke="#4F46E5" strokeWidth="3" fill="none" opacity="0.7" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
                    </path>
                    <path d="M 200 250 Q 200 225 200 225" stroke="#4F46E5" strokeWidth="3" fill="none" opacity="0.7" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
                    </path>
                    <path d="M 150 200 Q 175 200 175 200" stroke="#4F46E5" strokeWidth="3" fill="none" opacity="0.7" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
                    </path>
                    
                    {/* Your Brand at the bottom */}
                    <rect x="160" y="340" width="80" height="30" rx="15" fill="url(#brandGradient)" stroke="#6366F1" strokeWidth="2"/>
                    <text x="200" y="358" textAnchor="middle" className="fill-white font-bold text-xs">Your Brand</text>
                    
                    {/* Arrow pointing up to AI */}
                    <path d="M 200 340 L 200 260" stroke="#10B981" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)"/>
                    
                    {/* Gradients */}
                    <defs>
                      <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4F46E5"/>
                        <stop offset="100%" stopColor="#7C3AED"/>
                      </linearGradient>
                      <linearGradient id="chatgptGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10B981"/>
                        <stop offset="100%" stopColor="#059669"/>
                      </linearGradient>
                      <linearGradient id="geminiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6"/>
                        <stop offset="100%" stopColor="#1D4ED8"/>
                      </linearGradient>
                      <linearGradient id="perplexityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6"/>
                        <stop offset="100%" stopColor="#7C3AED"/>
                      </linearGradient>
                      <linearGradient id="claudeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F59E0B"/>
                        <stop offset="100%" stopColor="#D97706"/>
                      </linearGradient>
                      <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366F1"/>
                        <stop offset="100%" stopColor="#4F46E5"/>
                      </linearGradient>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#10B981"/>
                      </marker>
                    </defs>
                  </svg>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-violet-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute top-8 -right-2 w-8 h-8 bg-green-500 rounded-full opacity-30 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content will be added section by section */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-8">
            We're building this comprehensive guide section by section. 
            Join our waitlist to get notified when new sections are published.
          </p>
          <Button onClick={scrollToWaitlist} className="bg-blue-600 hover:bg-blue-700">
            Join Waitlist for Updates
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
}