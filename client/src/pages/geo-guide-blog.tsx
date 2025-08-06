import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Share, 
  Download, 
  ArrowRight,
  TrendingUp,
  Search,
  Brain,
  Target,
  BarChart3,
  Users,
  Lightbulb
} from "lucide-react";

export default function GeoGuideBlog() {
  useEffect(() => {
    document.title = 'The Complete Guide to Generative Engine Optimization (GEO) for B2B SaaS | GeoRankers';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master Generative Engine Optimization (GEO) to make your B2B SaaS brand visible in AI search engines like ChatGPT, Gemini, and Perplexity. Complete 2025 guide with data from 1,700+ marketers.');
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
                PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-blue-600">Home</a>
          <span className="mx-2">•</span>
          <a href="/resources" className="hover:text-blue-600">Resources</a>
          <span className="mx-2">•</span>
          <span>Guides</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="text-sm text-blue-600 font-medium mb-4">8 min read</div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            The Complete Guide to Generative Engine Optimization (GEO) for B2B SaaS
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Master the art of making your brand visible in AI search engines like ChatGPT, Gemini, and Perplexity. Complete strategic guide with data from Princeton University research.
          </p>

          <div className="flex items-center space-x-6 text-sm text-gray-500 mb-8">
            <span>Written by: <strong>GeoRankers Team</strong></span>
            <span>•</span>
            <span>Updated: August 06, 2025</span>
          </div>

          {/* CTA Banner */}
          <Card className="bg-gradient-to-r from-blue-50 to-violet-50 border-blue-200 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  The Complete GEO Implementation Guide
                </h3>
                <p className="text-gray-600 text-sm">
                  Get actionable strategies and frameworks to optimize your brand for AI search engines.
                </p>
              </div>
              <Button onClick={scrollToWaitlist} className="bg-blue-600 hover:bg-blue-700">
                Get Early Access
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Table of Contents */}
        <Card className="mb-12 p-6 bg-gray-50 border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <button onClick={() => scrollToSection('introduction')} className="text-left text-blue-600 hover:text-blue-800 py-1">
              1. The New Search Paradigm
            </button>
            <button onClick={() => scrollToSection('what-is-geo')} className="text-left text-blue-600 hover:text-blue-800 py-1">
              2. What Is GEO?
            </button>
            <button onClick={() => scrollToSection('why-geo-matters')} className="text-left text-blue-600 hover:text-blue-800 py-1">
              3. Why GEO Matters for B2B SaaS
            </button>
            <button onClick={() => scrollToSection('how-engines-work')} className="text-left text-blue-600 hover:text-blue-800 py-1">
              4. How Generative Engines Work
            </button>
            <button onClick={() => scrollToSection('zero-click')} className="text-left text-blue-600 hover:text-blue-800 py-1">
              5. The Rise of Zero-Click Search
            </button>
            <button onClick={() => scrollToSection('strategies')} className="text-left text-blue-600 hover:text-blue-800 py-1">
              6. Core GEO Strategies
            </button>
            <button onClick={() => scrollToSection('measurement')} className="text-left text-blue-600 hover:text-blue-800 py-1">
              7. Measurement & Analytics
            </button>
            <button onClick={() => scrollToSection('implementation')} className="text-left text-blue-600 hover:text-blue-800 py-1">
              8. Implementation Guide
            </button>
          </div>
        </Card>

        {/* Main Content */}
        <article className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <section id="introduction" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Search className="w-8 h-8 mr-3 text-blue-600" />
              The New Search Paradigm
            </h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              In 2025, a brand can be at the top of Google search results but not show up when someone asks ChatGPT for suggestions. This disconnect is no longer theoretical—it's playing out every day across AI search engines like ChatGPT, Gemini, and Perplexity.
            </p>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              These tools don't just crawl and list, but synthesize, summarize, and infer. They behave less like a traditional index and more like a well-informed colleague. That shift has deep implications for how visibility, relevance, and authority are defined.
            </p>

            {/* Key Statistics */}
            <Card className="bg-blue-50 border-blue-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Search Adoption Is Exploding</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">300M</div>
                  <div className="text-sm text-gray-600">Weekly active users on ChatGPT (early 2025)</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">90M</div>
                  <div className="text-sm text-gray-600">Projected US AI search users by 2027</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">25%</div>
                  <div className="text-sm text-gray-600">Predicted drop in traditional search spend (Gartner)</div>
                </div>
              </div>
            </Card>

            {/* AI Adoption Chart */}
            <div className="my-8 text-center">
              <img 
                src="/ai-adoption-chart.png"
                alt="Estimated Adoption of AI Search Among U.S. Adults (Millions)"
                className="w-full max-w-2xl mx-auto rounded-lg border border-gray-200 shadow-sm"
              />
              <p className="text-sm text-gray-500 mt-3 italic">
                Estimated Adoption of AI Search Among U.S. Adults (Millions) - Source: Market Research Analysis
              </p>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              As these interfaces become embedded in browsers, productivity tools, and mobile operating systems, the gatekeepers of discovery are changing—and with them, the rules of visibility.
            </p>
          </section>

          {/* What is GEO */}
          <section id="what-is-geo" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Brain className="w-8 h-8 mr-3 text-blue-600" />
              What Exactly Is GEO?
            </h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <strong>Generative Engine Optimization (GEO)</strong> is the practice of influencing how AI-powered search systems perceive, cite, and summarize your brand. If SEO is about ensuring that search algorithms rank your web pages, GEO is about ensuring that large language models and generative engines integrate your brand into their answers.
            </p>
            
            <Card className="bg-yellow-50 border-yellow-200 p-6 mb-8">
              <div className="flex items-start">
                <Lightbulb className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Insight</h4>
                  <p className="text-gray-700">
                    Put differently, SEO helps you place signposts along the highway, while GEO helps you become part of the travel guide that the AI writes for the traveller.
                  </p>
                </div>
              </div>
            </Card>

            <p className="text-gray-700 mb-6 leading-relaxed">
              The concept of GEO was formalized in a 2024 study by researchers at Princeton University and the Allen Institute for AI. They defined a generative engine as an AI system that synthesizes responses by summarizing information from multiple sources.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">How GEO Differs From Traditional SEO</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 border-blue-200">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">Traditional SEO</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Primary goal: Improve ranking in search engine results pages (SERPs)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Focus: Keywords, backlinks, site speed, mobile experience</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Metrics: Organic traffic, click-through rate, bounce rate, conversions</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 border-green-200">
                <h4 className="text-lg font-semibold text-green-900 mb-3">GEO (Generative Engine Optimization)</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Primary goal: Increase presence in AI-generated answers</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Focus: Multi-platform presence, quotable content, community engagement</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Metrics: Share of voice in AI answers, citation frequency, sentiment analysis</span>
                  </li>
                </ul>
              </Card>
            </div>

            <Card className="bg-gray-50 border-gray-200 p-6 mb-8">
              <h4 className="font-semibold text-gray-900 mb-3">Research Findings</h4>
              <p className="text-gray-700 mb-3">
                Princeton University research discovered that certain tactics—such as including verifiable statistics, quoting experts, and linking to trusted sources—could increase the frequency with which a brand is mentioned by up to <strong className="text-green-600">40%</strong>.
              </p>
            </Card>
          </section>

          {/* Why GEO Matters */}
          <section id="why-geo-matters" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-blue-600" />
              Why GEO Matters for B2B SaaS in 2025
            </h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Large language models are not a passing fad—they are becoming mainstream tools for research and decision-making. For B2B SaaS companies, the stakes are especially high because purchase cycles often involve complex questions and peer recommendations.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Traditional Search Traffic Is Declining</h3>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Zero-click searches—queries that end without a user clicking any result—are on the rise. SparkToro's analysis found that roughly <strong>60% of all Google searches</strong> now end without a click.
            </p>

            <Card className="bg-red-50 border-red-200 p-6 mb-6">
              <h4 className="font-semibold text-red-900 mb-2">The Zero-Click Impact</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold text-red-600 mb-1">34%</div>
                  <div className="text-red-700">Reduction in clicks due to AI summaries (Ahrefs)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600 mb-1">58%</div>
                  <div className="text-red-700">Of informational queries show AI overviews</div>
                </div>
              </div>
            </Card>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Budgets Are Shifting</h3>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Gartner predicts that by 2026, overall spending on search marketing will decline by about 25% as budgets shift toward AI-driven platforms. Meanwhile, the AI content marketing industry is projected to grow from $2.4 billion in 2023 to <strong>$17.6 billion by 2033</strong>.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. The B2B Buyer Journey Is Changing</h3>
            
            <Card className="bg-blue-50 border-blue-200 p-6 mb-6">
              <h4 className="font-semibold text-blue-900 mb-3">Example Scenario</h4>
              <p className="text-blue-800 italic mb-2">
                "A head of operations might ask ChatGPT: 'What are the best SaaS tools for automated contract management?'"
              </p>
              <p className="text-blue-700 text-sm">
                If the assistant names competitors but not your platform, you lose mindshare before the buyer even visits your site.
              </p>
            </Card>
          </section>

          {/* How Engines Work */}
          <section id="how-engines-work" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Brain className="w-8 h-8 mr-3 text-blue-600" />
              How Generative Engines Work
            </h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              To optimize for generative engines, you need to understand how they construct answers. While proprietary models like those from OpenAI and Google do not disclose all details, we can outline the common architecture and behaviors.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Training and Fine-Tuning</h3>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Large language models (LLMs) are trained on massive corpora of text—books, articles, websites, forums, and more. Models like GPT-3.5 and GPT-4 have parameter counts in the hundreds of billions. Their initial training provides a broad base of knowledge but is not continuously updated.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Retrieval-Augmented Generation (RAG)</h3>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Search-augmented models like ChatGPT Plus, Gemini, and Perplexity use RAG. When a user asks a question, the system performs three steps:
            </p>

            <Card className="p-6 mb-6 border-green-200">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Retrieval</h4>
                    <p className="text-gray-700 text-sm">It retrieves relevant documents from a search index or database</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Selection</h4>
                    <p className="text-gray-700 text-sm">It selects the most useful passages</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Generation</h4>
                    <p className="text-gray-700 text-sm">It feeds these passages to the language model, which uses them to generate a response</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200 p-6 mb-8">
              <div className="flex items-start">
                <Target className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Critical Point</h4>
                  <p className="text-gray-700">
                    If your content is not present in the retrieval step, the model will not mention you regardless of your SEO ranking.
                  </p>
                </div>
              </div>
            </Card>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Citation Patterns and Biases</h3>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              A 2025 study on AI search systems analyzed over 24,000 conversations and more than 65,000 responses. It found that only about 9% of citations came from news outlets and that citations were concentrated in a small number of sources.
            </p>

            <Card className="bg-gray-50 border-gray-200 p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Where AI Models Get Citations</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">35%</div>
                  <div className="text-xs text-gray-600">Forums & Communities</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 mb-1">28%</div>
                  <div className="text-xs text-gray-600">Q&A Sites</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">22%</div>
                  <div className="text-xs text-gray-600">Popular Blogs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">15%</div>
                  <div className="text-xs text-gray-600">News & Reports</div>
                </div>
              </div>
            </Card>
          </section>

          {/* Zero Click Search */}
          <section id="zero-click" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
              The Rise of Zero-Click Search
            </h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              One of the most immediate consequences of generative search is the reduction in clicks. For years, SEO specialists fought for top spots on results pages because they knew that users would click on the first few links. But what happens when the answer appears directly on the search page?
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Zero-Click Explained</h3>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              A zero-click search occurs when a user's query is answered without them clicking any links. Examples include weather summaries, definitions, currency conversions, and now AI-generated overviews.
            </p>

            <Card className="bg-red-50 border-red-200 p-6 mb-8">
              <h4 className="font-semibold text-red-900 mb-3">The Impact on B2B</h4>
              <p className="text-red-800 mb-3">
                B2B searches often involve informational queries. A product manager might ask: "What are the key features to look for in customer support software?"
              </p>
              <p className="text-red-700 text-sm">
                If an AI overview provides a list of features and tools, the searcher may never click through to vendor pages. Your brand's presence becomes invisible unless you are mentioned in the summary.
              </p>
            </Card>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">How This Changes Everything</h3>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Traditional metrics like organic traffic and bounce rate capture less of the story. You might see stable or declining traffic even if your content is being used more often. This disconnect can create false negatives—you might mistakenly cut successful content because it appears to be underperforming.
            </p>
          </section>

          {/* Core Strategies */}
          <section id="strategies" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3 text-blue-600" />
              Core GEO Strategies
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Based on Princeton University research and real-world analysis, here are the six key components of effective GEO strategy:
            </p>

            <div className="space-y-8">
              <Card className="p-6 border-blue-200">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-1">1</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Verifiable Statements and Statistics</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      AI models value information they can corroborate. Including clear data points, quotes, and statistics—especially those attributed to credible third parties—helps your content become a candidate for citation.
                    </p>
                    <Card className="bg-blue-50 border-blue-200 p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Example</h4>
                      <p className="text-blue-800 text-sm italic">
                        "According to Gartner's 2024 report, companies implementing AI-first content strategies see 40% higher engagement rates compared to traditional approaches."
                      </p>
                    </Card>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-green-200">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-1">2</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Channel Presence</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Generative engines don't rely on your site alone. They pull from discussion forums, Q&A communities, review aggregators, news sites, and research papers.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <div className="font-semibold text-green-900 text-sm">Reddit</div>
                        <div className="text-xs text-green-700">Community discussions</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <div className="font-semibold text-green-900 text-sm">Stack Overflow</div>
                        <div className="text-xs text-green-700">Technical Q&A</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <div className="font-semibold text-green-900 text-sm">G2/Capterra</div>
                        <div className="text-xs text-green-700">User reviews</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <div className="font-semibold text-green-900 text-sm">Industry Pubs</div>
                        <div className="text-xs text-green-700">Expert content</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-purple-200">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-1">3</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Structured and Accessible Content</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Use schema markup to signal key information such as product categories, pricing, and reviews. Provide clear section headings, bullet points, and FAQs.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Clear section headings and subheadings</li>
                      <li>Bullet points for key information</li>
                      <li>FAQ sections for common questions</li>
                      <li>Schema markup for structured data</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-orange-200">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-orange-100 text-orange-800 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-1">4</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Consistent Messaging</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Across all content, describe your product in consistent language. Summarize your value proposition in a sentence or two at the top of each piece of content.
                    </p>
                    <Card className="bg-orange-50 border-orange-200 p-4">
                      <h4 className="font-semibold text-orange-900 mb-2">Pro Tip</h4>
                      <p className="text-orange-800 text-sm">
                        Models often quote the first descriptive sentences they find. If your messaging varies widely, the AI may misinterpret or omit it.
                      </p>
                    </Card>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-teal-200">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-1">5</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Engagement</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Participate authentically in communities where your customers seek advice. Provide thoughtful answers without overtly promoting your product.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                        <h5 className="font-semibold text-green-800 mb-2">✓ Do This</h5>
                        <ul className="text-green-700 text-sm space-y-1">
                          <li>• Provide detailed, helpful answers</li>
                          <li>• Share relevant experience</li>
                          <li>• Disclose your affiliation transparently</li>
                        </ul>
                      </div>
                      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                        <h5 className="font-semibold text-red-800 mb-2">✗ Avoid This</h5>
                        <ul className="text-red-700 text-sm space-y-1">
                          <li>• Direct promotional posts</li>
                          <li>• Generic copy-paste responses</li>
                          <li>• Only engaging when promoting</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-indigo-200">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-800 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-1">6</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Tracking and Feedback Loops</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Regularly test AI assistants with queries relevant to your category. Note whether and how your brand is mentioned and which sources the models cite.
                    </p>
                    <Card className="bg-indigo-50 border-indigo-200 p-4">
                      <h4 className="font-semibold text-indigo-900 mb-2">Current State (2025)</h4>
                      <p className="text-indigo-800 text-sm">
                        Mainstream SEO tools like Ahrefs and Semrush are starting to experiment with AI visibility features, but these remain in beta. Custom monitoring and manual testing are still necessary.
                      </p>
                    </Card>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Measurement */}
          <section id="measurement" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
              Measurement & Analytics
            </h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              As of mid-2025, there is no comprehensive off-the-shelf tool for GEO analytics. Until the ecosystem matures, manual and semi-automated methods are required.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Manual Tracking Framework</h3>
            
            <Card className="p-6 mb-8 border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-4">Step-by-Step Process</h4>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Create a list of 20-30 queries relevant to your product category</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Test these queries weekly across different AI platforms (ChatGPT, Gemini, Perplexity, Claude)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Document when your brand is mentioned, how it's described, and what sources are cited</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Track sentiment and accuracy of mentions</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                  <span>Monitor competitor presence for comparison</span>
                </li>
              </ol>
            </Card>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Metrics to Track</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 border-green-200">
                <h4 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Visibility Metrics
                </h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span>Mention frequency across platforms</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span>Position in AI responses (1st, 2nd, 3rd mention)</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span>Share of voice vs. competitors</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span>Citation frequency and quality</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 border-purple-200">
                <h4 className="text-lg font-semibold text-purple-900 mb-3 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Quality Metrics
                </h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <span>Sentiment analysis (positive/negative/neutral)</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <span>Accuracy of information presented</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <span>Quality of source citations</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <span>Alignment with brand messaging</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          {/* Implementation */}
          <section id="implementation" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="w-8 h-8 mr-3 text-blue-600" />
              Implementation Guide
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              GEO requires cross-functional collaboration. Unlike traditional SEO, which often sits within marketing, GEO benefits from input across departments.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Building Your GEO Team</h3>
            
            <div className="space-y-6">
              <Card className="p-6 border-blue-200">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Content Marketing Manager</h4>
                    <p className="text-gray-600 mb-3 text-sm">Leads strategy and execution</p>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Develops content calendar aligned with GEO objectives</li>
                      <li>• Ensures consistent messaging across all platforms</li>
                      <li>• Coordinates with other departments for authentic content</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-green-200">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Brain className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Developer Relations/Technical Writer</h4>
                    <p className="text-gray-600 mb-3 text-sm">Engages technical communities</p>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Participates in Stack Overflow, GitHub discussions</li>
                      <li>• Creates technical documentation and tutorials</li>
                      <li>• Answers developer questions authentically</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-purple-200">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Customer Success Manager</h4>
                    <p className="text-gray-600 mb-3 text-sm">Facilitates customer advocacy</p>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Encourages satisfied customers to share experiences</li>
                      <li>• Helps customers leave detailed reviews on G2, Capterra</li>
                      <li>• Provides case study material for content team</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-orange-200">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Data Analyst</h4>
                    <p className="text-gray-600 mb-3 text-sm">Tracks and measures GEO performance</p>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Develops tracking systems for AI mentions</li>
                      <li>• Creates dashboards for GEO metrics</li>
                      <li>• Correlates GEO activity with business outcomes</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-6 mt-12">90-Day Implementation Plan</h3>
            
            <div className="space-y-6">
              <Card className="p-6 border-blue-200">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">Days 1-30: Foundation</h4>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Audit current AI visibility across platforms</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Identify key queries and competitor benchmarks</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Establish consistent brand messaging framework</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Set up manual tracking systems</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 border-green-200">
                <h4 className="text-lg font-semibold text-green-900 mb-3">Days 31-60: Content Optimization</h4>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Optimize existing content with verifiable statistics</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Begin community engagement on Reddit, Stack Overflow</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Launch customer review campaigns on G2, Capterra</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Implement schema markup and structured data</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 border-purple-200">
                <h4 className="text-lg font-semibold text-purple-900 mb-3">Days 61-90: Scale & Optimize</h4>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Launch regular content creation aligned with GEO best practices</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Analyze first-round results and optimize strategies</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Expand community engagement to additional platforms</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Develop automated reporting dashboards</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion: The Future of AI Search</h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The shift toward AI-powered search is not a distant possibility—it's happening now. Companies that begin optimizing for generative engines today will have a significant advantage as these platforms become more prevalent.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              GEO is not about gaming the system or finding shortcuts. It's about building genuine authority and presence across the digital ecosystem that AI models draw from. By creating valuable content, engaging authentically in communities, and maintaining consistent messaging, you can ensure your brand remains visible in the age of AI.
            </p>

            <Card className="bg-gradient-to-r from-blue-50 to-violet-50 border-blue-200 p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Master GEO?</h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                GeoRankers helps B2B SaaS companies track, optimize, and build brand authority across AI search engines like ChatGPT, Gemini, and Perplexity. Join leading companies already implementing GEO strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={scrollToWaitlist} size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Join the Waitlist
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF Guide
                </Button>
              </div>
            </Card>
          </section>

        </article>

        {/* Related Articles */}
        <section className="border-t border-gray-200 pt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-semibold text-gray-900 mb-2">AI Search Optimization Checklist</h4>
              <p className="text-gray-600 text-sm mb-4">20-point checklist to audit your current AI visibility</p>
              <Button variant="outline" size="sm">
                Download Free
              </Button>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-semibold text-gray-900 mb-2">GEO vs SEO Comparison</h4>
              <p className="text-gray-600 text-sm mb-4">Side-by-side analysis of traditional and AI search optimization</p>
              <Button variant="outline" size="sm">
                Read More
              </Button>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-semibold text-gray-900 mb-2">Community Engagement Guide</h4>
              <p className="text-gray-600 text-sm mb-4">Best practices for authentic participation in forums and communities</p>
              <Button variant="outline" size="sm">
                Get Guide
              </Button>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}