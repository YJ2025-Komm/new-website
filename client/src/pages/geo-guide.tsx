import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  Brain, 
  Search, 
  ChartLine, 
  Target, 
  Eye, 
  Rocket,
  Shield,
  CheckCircle,
  Star,
  ArrowRight,
  Clock,
  Users,
  BarChart3,
  Lightbulb,
  Globe,
  FileText,
  MessageSquare,
  Zap
} from "lucide-react";

export default function GeoGuide() {
  // Update document meta for SEO
  useEffect(() => {
    document.title = "The GEO Playbook - Complete Guide to Generative Engine Optimization | GeoRankers";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Complete strategic guide to Generative Engine Optimization (GEO) for B2B SaaS marketers. Learn how to optimize for AI search across ChatGPT, Gemini, Perplexity, and Claude with proven strategies and implementation tactics.');
    }

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://georankers.co/geo-guide');
    }

    // Cleanup on unmount
    return () => {
      document.title = "GeoRankers - AI Search Intelligence Platform for B2B SaaS Companies";
      if (metaDescription) {
        metaDescription.setAttribute('content', 'GeoRankers is the definitive AI search optimization platform that helps B2B SaaS companies track, optimize, and build brand authority to get visible in AI search across ChatGPT, Gemini, Perplexity, and Claude.');
      }
      if (canonical) {
        canonical.setAttribute('href', 'https://georankers.co/');
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50/30">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <a href="/" className="text-xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  GeoRankers
                </span>
              </a>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <a href="/#problem" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Why GeoRankers
              </a>
              <a href="/#features" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Features
              </a>
              <a href="/geo-guide" className="text-blue-600 font-medium text-sm">
                GEO Guide
              </a>
              <a href="/#faq" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                FAQ
              </a>
              <a href="/#waitlist" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Join Waitlist
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-violet-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            The <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">GEO Playbook</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto">
            A Strategic Guide for B2B and SaaS Marketers
          </p>
          <p className="text-lg text-slate-500 mb-12 max-w-3xl mx-auto">
            In 2025, a brand can be at the top of Google search results but not show up when someone asks ChatGPT for suggestions. This comprehensive guide shows you how to optimize for the new era of AI-powered search.
          </p>
          
          {/* Table of Contents Navigation */}
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <button 
              onClick={() => scrollToSection('introduction')}
              className="p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-200 text-left"
            >
              <div className="flex items-center">
                <Globe className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-sm font-medium text-slate-700">Introduction</span>
              </div>
            </button>
            <button 
              onClick={() => scrollToSection('evolution')}
              className="p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-200 text-left"
            >
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-sm font-medium text-slate-700">Search Evolution</span>
              </div>
            </button>
            <button 
              onClick={() => scrollToSection('what-is-geo')}
              className="p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-200 text-left"
            >
              <div className="flex items-center">
                <Brain className="w-5 h-5 text-purple-500 mr-3" />
                <span className="text-sm font-medium text-slate-700">What is GEO?</span>
              </div>
            </button>
            <button 
              onClick={() => scrollToSection('why-geo-matters')}
              className="p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-200 text-left"
            >
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-orange-500 mr-3" />
                <span className="text-sm font-medium text-slate-700">Why GEO Matters</span>
              </div>
            </button>
            <button 
              onClick={() => scrollToSection('how-engines-work')}
              className="p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-200 text-left"
            >
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-cyan-500 mr-3" />
                <span className="text-sm font-medium text-slate-700">How Engines Work</span>
              </div>
            </button>
            <button 
              onClick={() => scrollToSection('zero-click')}
              className="p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-200 text-left"
            >
              <div className="flex items-center">
                <Target className="w-5 h-5 text-red-500 mr-3" />
                <span className="text-sm font-medium text-slate-700">Zero-Click Search</span>
              </div>
            </button>
            <button 
              onClick={() => scrollToSection('strategies')}
              className="p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-200 text-left"
            >
              <div className="flex items-center">
                <Rocket className="w-5 h-5 text-violet-500 mr-3" />
                <span className="text-sm font-medium text-slate-700">GEO Strategies</span>
              </div>
            </button>
            <button 
              onClick={() => scrollToSection('implementation')}
              className="p-4 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-200 text-left"
            >
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                <span className="text-sm font-medium text-slate-700">Implementation</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="introduction" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Introduction: The New Search Paradigm</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-600 mb-6 leading-relaxed">
              In 2025, a brand can be at the top of Google search results but not show up when someone asks ChatGPT for suggestions. This disconnect is no longer theoretical—it's playing out every day across AI search engines like ChatGPT, Gemini, and Perplexity.
            </p>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              These tools don't just crawl and list, but synthesize, summarize, and infer. They behave less like a traditional index and more like a well-informed colleague. That shift has deep implications for how visibility, relevance, and authority are defined.
            </p>

            <Card className="glass rounded-2xl p-6 mb-8 border-0">
              <CardContent className="pt-0">
                <h3 className="text-xl font-bold mb-4 text-slate-900">The Current Reality</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500 mb-2">300M</div>
                    <p className="text-sm text-slate-600">Weekly active users on ChatGPT (early 2025)</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500 mb-2">90M</div>
                    <p className="text-sm text-slate-600">Projected US generative AI search users by 2027</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-500 mb-2">25%</div>
                    <p className="text-sm text-slate-600">Predicted drop in traditional search marketing spend by 2026</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-slate-600 mb-8 leading-relaxed">
              This guide is written for founders, CMOs, product marketers, and growth leaders in B2B SaaS who want to stay ahead of this shift. If your brand is not showing up in AI search results, you're not just missing clicks—you are absent from the conversation altogether.
            </p>
          </div>
        </div>
      </section>

      {/* Search Evolution Section */}
      <section id="evolution" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-blue-50/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">The Long Road to AI: How Search Evolved</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-600 mb-6 leading-relaxed">
              Imagine the internet as a vast library. In the early 1990s there was no catalogue, only shelves filled with disorganized books. The journey from keyword matching to AI-powered synthesis represents one of the most significant technological evolutions of our time.
            </p>

            {/* Timeline Visualization */}
            <Card className="glass rounded-2xl p-6 mb-8 border-0">
              <CardContent className="pt-0">
                <h3 className="text-xl font-bold mb-6 text-slate-900">Search Evolution Timeline</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <Search className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">1994-1998: Early Search</h4>
                      <p className="text-slate-600 text-sm">Yahoo's human-curated directory and AltaVista's keyword matching</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">1998: PageRank Revolution</h4>
                      <p className="text-slate-600 text-sm">Google introduced link analysis and authority measurement</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">2019: BERT Integration</h4>
                      <p className="text-slate-600 text-sm">Context-aware understanding replaced simple keyword matching</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">2022-Present: Generative Era</h4>
                      <p className="text-slate-600 text-sm">ChatGPT and AI-powered synthesis transformed search behavior</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-slate-600 mb-8 leading-relaxed">
              This history explains why search results today sometimes look like paragraphs of text rather than lists of links. It also reveals why optimizing solely for the blue links of the past may no longer be enough.
            </p>
          </div>
        </div>
      </section>

      {/* What is GEO Section */}
      <section id="what-is-geo" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">What Exactly Is GEO?</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-600 mb-6 leading-relaxed">
              <strong>Generative Engine Optimization (GEO)</strong> is the practice of influencing how AI-powered search systems perceive, cite and summarize your brand. If SEO is about ensuring that search algorithms rank your web pages, GEO is about ensuring that large language models and generative engines integrate your brand into their answers.
            </p>

            <Card className="glass rounded-2xl p-6 mb-8 border-0">
              <CardContent className="pt-0">
                <h3 className="text-xl font-bold mb-6 text-slate-900">SEO vs GEO: Key Differences</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-blue-600 mb-3">Traditional SEO</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li>• Optimize for search engine rankings</li>
                      <li>• Focus on keywords and backlinks</li>
                      <li>• Measure clicks and traffic</li>
                      <li>• Target search result pages</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-600 mb-3">Generative Engine Optimization</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li>• Optimize for AI-generated answers</li>
                      <li>• Focus on citations and quotability</li>
                      <li>• Measure mentions and sentiment</li>
                      <li>• Target conversational interfaces</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-2xl font-bold mb-6 text-slate-900">Key Components of GEO</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="glass rounded-xl p-6 border-0">
                <CardContent className="pt-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold mb-2 text-slate-900">Verifiable Statements</h4>
                  <p className="text-slate-600 text-sm">Include clear data points, quotes, and statistics from credible sources</p>
                </CardContent>
              </Card>

              <Card className="glass rounded-xl p-6 border-0">
                <CardContent className="pt-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold mb-2 text-slate-900">Multi-channel Presence</h4>
                  <p className="text-slate-600 text-sm">Engage across forums, Q&A sites, and review platforms</p>
                </CardContent>
              </Card>

              <Card className="glass rounded-xl p-6 border-0">
                <CardContent className="pt-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold mb-2 text-slate-900">Structured Content</h4>
                  <p className="text-slate-600 text-sm">Use schema markup, clear headings, and accessible formats</p>
                </CardContent>
              </Card>

              <Card className="glass rounded-xl p-6 border-0">
                <CardContent className="pt-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold mb-2 text-slate-900">Consistent Messaging</h4>
                  <p className="text-slate-600 text-sm">Maintain unified language across all content and channels</p>
                </CardContent>
              </Card>
            </div>

            <p className="text-slate-600 mb-8 leading-relaxed">
              GEO does not replace SEO; it expands the field of play. By understanding both, you can position your brand to succeed in the dual worlds of generative and traditional search.
            </p>
          </div>
        </div>
      </section>

      {/* Strategies Section - Abbreviated for preview */}
      <section id="strategies" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-blue-50/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">10 Strategic GEO Guidelines for B2B SaaS</h2>
          
          <div className="space-y-6">
            {[
              { title: "Develop Authoritative Content With Verifiable Data", icon: BarChart3, color: "blue" },
              { title: "Create Summaries and FAQs for Easy Quoting", icon: FileText, color: "green" },
              { title: "Use Structured Data and Open Formats", icon: Globe, color: "purple" },
              { title: "Engage Authentically in Community Forums", icon: MessageSquare, color: "orange" },
              { title: "Publish Research and Thought Leadership", icon: Lightbulb, color: "cyan" }
            ].map((strategy, index) => (
              <Card key={index} className="glass rounded-xl p-6 border-0 hover:shadow-lg transition-all duration-200">
                <CardContent className="pt-0">
                  <div className="flex items-start">
                    <div className={`w-12 h-12 bg-gradient-to-r from-${strategy.color}-500 to-${strategy.color}-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                      <strategy.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-2">{index + 1}. {strategy.title}</h3>
                      <p className="text-slate-600 text-sm">Detailed implementation strategies and best practices...</p>
                      <button className="text-blue-600 text-sm font-medium mt-2 hover:text-blue-700 transition-colors">
                        Read more <ArrowRight className="w-4 h-4 inline ml-1" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-500 to-violet-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Optimize for AI Search?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our waitlist to get early access to GeoRankers and start implementing these GEO strategies with our AI search intelligence platform.
          </p>
          <a 
            href="/#waitlist" 
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200"
          >
            Join the Waitlist
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">
            © 2025 GeoRankers. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}