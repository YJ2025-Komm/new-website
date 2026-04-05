import { useEffect } from 'react';

export default function GeoGuideSimple() {
  useEffect(() => {
    document.title = 'The GEO Playbook - A Strategic Guide for B2B and SaaS Marketers | GeoRankers';
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <a href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <img src="/georankers-icon.png" alt="GeoRankers icon" className="h-9 w-9 rounded-md" />
            GeoRankers
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The GEO Playbook
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A Strategic Guide for B2B and SaaS Marketers
          </p>
          <div className="text-sm text-gray-500 mb-8">
            August 06, 2025 • Complete Implementation Guide
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <button onClick={() => scrollToSection('introduction')} className="text-left text-blue-600 hover:text-blue-800 py-1">
              1. Introduction: The New Search Paradigm
            </button>
            <button onClick={() => scrollToSection('what-is-geo')} className="text-left text-blue-600 hover:text-blue-800 py-1">
              2. What Exactly Is GEO?
            </button>
            <button onClick={() => scrollToSection('why-geo-matters')} className="text-left text-blue-600 hover:text-blue-800 py-1">
              3. Why GEO Matters for B2B SaaS
            </button>
            <button onClick={() => scrollToSection('core-strategies')} className="text-left text-blue-600 hover:text-blue-800 py-1">
              4. Core GEO Strategies
            </button>
            <button onClick={() => scrollToSection('community-engagement')} className="text-left text-blue-600 hover:text-blue-800 py-1">
              5. Community Engagement
            </button>
            <button onClick={() => scrollToSection('measurement')} className="text-left text-blue-600 hover:text-blue-800 py-1">
              6. Measurement & Analytics
            </button>
            <button onClick={() => scrollToSection('building-team')} className="text-left text-blue-600 hover:text-blue-800 py-1">
              7. Building Your GEO Team
            </button>
            <button onClick={() => scrollToSection('conclusion')} className="text-left text-blue-600 hover:text-blue-800 py-1">
              8. Conclusion
            </button>
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <section id="introduction" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction: The New Search Paradigm</h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              In 2025, a brand can be at the top of Google search results but not show up when someone asks ChatGPT for suggestions. This disconnect is no longer theoretical—it's playing out every day across AI search engines like ChatGPT, Gemini, and Perplexity.
            </p>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              These tools don't just crawl and list, but synthesize, summarize, and infer. They behave less like a traditional index and more like a well-informed colleague. That shift has deep implications for how visibility, relevance, and authority are defined.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              The numbers tell the story:
            </p>
            
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>300M weekly active users on ChatGPT (early 2025)</li>
              <li>90M projected US generative AI search users by 2027</li>
              <li>25% predicted drop in traditional search marketing spend by 2026</li>
            </ul>

            {/* AI Search Adoption Chart */}
            <div className="my-8 text-center">
              <img 
                src="/ai-adoption-chart.png"
                alt="Estimated Adoption of AI Search Among U.S. Adults (Millions)"
                className="w-full max-w-2xl mx-auto rounded-lg border"
              />
              <p className="text-sm text-gray-500 mt-2 italic">Estimated Adoption of AI Search Among U.S. Adults (Millions)</p>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              As these interfaces become embedded in browsers, productivity tools, and mobile operating systems, the gatekeepers of discovery are changing—and with them, the rules of visibility.
            </p>
          </section>

          {/* What is GEO */}
          <section id="what-is-geo" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What Exactly Is GEO?</h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Generative Engine Optimization (GEO) is the practice of influencing how AI-powered search systems perceive, cite, and summarize your brand. If SEO is about ensuring that search algorithms rank your web pages, GEO is about ensuring that large language models and generative engines integrate your brand into their answers.
            </p>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Put differently, SEO helps you place signposts along the highway, while GEO helps you become part of the travel guide that the AI writes for the traveller.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">How GEO Differs From Traditional SEO</h3>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Both SEO and GEO aim to connect users with relevant information, but they operate in different contexts and reward different signals:
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Traditional SEO</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Primary goal: Improve ranking in search engine results pages (SERPs)</li>
                <li>Focus: Keywords, backlinks, site speed, mobile experience</li>
                <li>Metrics: Organic traffic, click-through rate, bounce rate, conversions</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">GEO (Generative Engine Optimization)</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Primary goal: Increase presence in AI-generated answers</li>
                <li>Focus: Multi-platform presence, quotable content, community engagement</li>
                <li>Metrics: Share of voice in AI answers, citation frequency, sentiment analysis</li>
              </ul>
            </div>
          </section>

          {/* Why GEO Matters */}
          <section id="why-geo-matters" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why GEO Matters for B2B SaaS in 2025 and Beyond</h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Large language models are not a passing fad—they are becoming mainstream tools for research and decision-making. For B2B SaaS companies, the stakes are especially high because purchase cycles often involve complex questions and peer recommendations.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI Search Adoption Is Soaring</h3>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              The adoption curve of AI-powered search looks steep:
            </p>
            
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>In 2023, around 13 million American adults used AI tools for search</li>
              <li>Market analysts predict this will rise to 90 million by 2027—a near sevenfold increase</li>
              <li>31% of Gen Z search activity already occurs on AI platforms</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Traditional Search Traffic Is Declining</h3>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Zero-click searches—queries that end without a user clicking any result—are on the rise. SparkToro's analysis found that roughly 60% of all Google searches now end without a click. This phenomenon has accelerated as Google rolls out AI Overviews, which display AI-generated summaries above the links.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Budgets Are Shifting</h3>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Gartner predicts that by 2026, overall spending on search marketing will decline by about 25% as budgets shift toward AI-driven platforms. Meanwhile, the AI content marketing industry is projected to grow from $2.4 billion in 2023 to $17.6 billion by 2033.
            </p>
          </section>

          {/* Core Strategies */}
          <section id="core-strategies" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Core GEO Strategies</h2>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Create Verifiable, Statistics-Rich Content</h3>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              AI models value information they can corroborate. Including clear data points, quotes, and statistics—especially those attributed to credible third parties—helps your content become a candidate for citation.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-800 font-medium">Example:</p>
              <p className="text-blue-700 mt-1">
                "According to Gartner's 2024 report, companies implementing AI-first content strategies see 40% higher engagement rates compared to traditional approaches."
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Build Multi-Channel Presence</h3>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Generative engines don't rely on your website alone. They pull from discussion forums, Q&A communities, review aggregators, news sites, and research papers. Key platforms include:
            </p>

            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li><strong>Reddit:</strong> Engage in relevant subreddits with helpful, non-promotional content</li>
              <li><strong>Stack Overflow:</strong> Answer technical questions in your domain</li>
              <li><strong>Quora:</strong> Provide thoughtful responses to industry questions</li>
              <li><strong>G2/Capterra:</strong> Encourage detailed customer reviews</li>
              <li><strong>Industry Publications:</strong> Guest posts and expert commentary</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Optimize Content Structure</h3>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Use schema markup to signal key information. Provide clear section headings, bullet points, and FAQs. These structures help retrieval systems identify relevant snippets.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">4. Maintain Consistent Messaging</h3>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Across all content, describe your product in consistent language. Summarize your value proposition in a sentence or two at the top of each piece of content. Models often quote the first descriptive sentences they find.
            </p>
          </section>

          {/* Community Engagement */}
          <section id="community-engagement" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Engage Authentically in Community Forums</h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Generative engines get a lot of their ideas from community platforms. You can often find Reddit, Hacker News, Stack Overflow, Quora, G2, and Capterra in citations.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Get your marketing team, engineers, product managers, and customer success leads to join in on the conversations. Be honest when you answer and let people know who you work for, but only promote your solution if you are adding value.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Thank customers publicly if they write about your product, and ask them if you can share their feedback. Over time, you will build up a collection of endorsements from other people that models can see.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Best Practices for Community Engagement</h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <h4 className="font-semibold text-green-800 mb-2">✓ Do This</h4>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>Provide detailed, helpful answers</li>
                  <li>Share relevant experience and insights</li>
                  <li>Disclose your affiliation transparently</li>
                  <li>Focus on solving the user's problem first</li>
                </ul>
              </div>
              
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-semibold text-red-800 mb-2">✗ Avoid This</h4>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li>Direct promotional posts without context</li>
                  <li>Generic copy-paste responses</li>
                  <li>Ignoring community guidelines</li>
                  <li>Only engaging when promoting your product</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Measurement */}
          <section id="measurement" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Measurement & Analytics</h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              As of mid-2025, there is no comprehensive off-the-shelf tool for GEO analytics. SEO platforms like Ahrefs and Semrush have launched beta features to track AI visibility, but they are still maturing.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Manual Tracking Methods</h3>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Until the ecosystem matures, manual and semi-automated methods are required:
            </p>

            <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2">
              <li>Create a list of 20-30 queries relevant to your product category</li>
              <li>Test these queries weekly across different AI platforms (ChatGPT, Gemini, Perplexity, Claude)</li>
              <li>Document when your brand is mentioned, how it's described, and what sources are cited</li>
              <li>Track sentiment and accuracy of mentions</li>
              <li>Monitor competitor presence for comparison</li>
            </ol>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Metrics to Track</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Visibility Metrics</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>Mention frequency across platforms</li>
                  <li>Position in AI responses (1st, 2nd, 3rd mention)</li>
                  <li>Share of voice vs. competitors</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Quality Metrics</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>Sentiment analysis (positive/negative/neutral)</li>
                  <li>Accuracy of information presented</li>
                  <li>Quality of source citations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Building Team */}
          <section id="building-team" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Building Your GEO Team</h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              GEO requires cross-functional collaboration. Unlike traditional SEO, which often sits within marketing, GEO benefits from input across departments.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Roles and Responsibilities</h3>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Content Marketing Manager</h4>
                <p className="text-gray-700 mb-2">Leads strategy and execution</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Develops content calendar aligned with GEO objectives</li>
                  <li>Ensures consistent messaging across all platforms</li>
                  <li>Coordinates with other departments for authentic content</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Developer Relations/Technical Writer</h4>
                <p className="text-gray-700 mb-2">Engages technical communities</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Participates in Stack Overflow, GitHub discussions</li>
                  <li>Creates technical documentation and tutorials</li>
                  <li>Answers developer questions authentically</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Customer Success Manager</h4>
                <p className="text-gray-700 mb-2">Facilitates customer advocacy</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Encourages satisfied customers to share experiences</li>
                  <li>Helps customers leave detailed reviews on G2, Capterra</li>
                  <li>Provides case study material for content team</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Data Analyst</h4>
                <p className="text-gray-700 mb-2">Tracks and measures GEO performance</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Develops tracking systems for AI mentions</li>
                  <li>Creates dashboards for GEO metrics</li>
                  <li>Correlates GEO activity with business outcomes</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section id="conclusion" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion</h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              The shift toward AI-powered search is not a distant possibility—it's happening now. Companies that begin optimizing for generative engines today will have a significant advantage as these platforms become more prevalent.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              GEO is not about gaming the system or finding shortcuts. It's about building genuine authority and presence across the digital ecosystem that AI models draw from. By creating valuable content, engaging authentically in communities, and maintaining consistent messaging, you can ensure your brand remains visible in the age of AI.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Start small, measure consistently, and iterate based on what you learn. The companies that embrace this new paradigm will be the ones that thrive as the gatekeepers of discovery continue to evolve.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Ready to Get Started with GEO?</h3>
              <p className="text-blue-800 mb-4">
                GeoRankers helps companies track, optimize, and build brand authority across AI search engines like ChatGPT, Gemini, and Perplexity.
              </p>
              <a 
                href="https://dashboard.georankers.co/register"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try for Free
              </a>
            </div>
          </section>

        </article>
      </div>
    </div>
  );
}