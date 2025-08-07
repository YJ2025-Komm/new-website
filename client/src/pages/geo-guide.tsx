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
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-violet-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
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

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button onClick={scrollToWaitlist} size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Get Early Access
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </Button>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">300M</div>
                  <div className="text-sm text-gray-600">Weekly ChatGPT users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 mb-1">40%</div>
                  <div className="text-sm text-gray-600">Visibility increase potential</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">25%</div>
                  <div className="text-sm text-gray-600">Drop in traditional search</div>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-100 to-violet-100 rounded-2xl p-8 shadow-2xl">
                {/* Hero Image Placeholder - You can replace this with actual image */}
                <div className="aspect-square bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-violet-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Search Revolution</h3>
                    <p className="text-sm text-gray-600">
                      Master the new landscape of generative search engines
                    </p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-500 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-violet-500 rounded-full opacity-20"></div>
                <div className="absolute top-8 -right-2 w-8 h-8 bg-green-500 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
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