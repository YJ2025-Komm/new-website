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
              <div className="relative p-8">
                {/* Main Report/Playbook */}
                <div className="relative bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl shadow-2xl p-8 transform rotate-6 hover:rotate-3 transition-transform duration-300">
                  <div className="text-white">
                    <div className="text-xs uppercase tracking-wider opacity-90 mb-2">Strategic Guide 2025</div>
                    <h3 className="text-2xl font-bold mb-4 leading-tight">The GEO Playbook</h3>
                    <div className="space-y-2 text-sm opacity-90">
                      <p>Discover how generative engines like</p>
                      <p>ChatGPT and Gemini are changing</p>
                      <p>search and what your brand needs</p>
                      <p>to do to stay visible.</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/20">
                      <div className="text-xs">by GeoRankers Team</div>
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