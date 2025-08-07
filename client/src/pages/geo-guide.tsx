import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Share } from "lucide-react";

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
      <main className="max-w-4xl mx-auto px-6 py-16">
        <article className="prose prose-lg max-w-none">
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

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">The user behaviour is already here:</h3>
              <ul className="space-y-2">
                <li>• 300 million weekly active users on ChatGPT as of early 2025</li>
                <li>• Perplexity and Gemini gaining traction as research and discovery tools</li>
                <li>• In the US, generative AI search adoption is projected to grow from 13 million in 2023 to 90 million by 2027</li>
              </ul>
            </div>

            <p className="mb-6">
              As these interfaces become embedded in browsers, productivity tools, and mobile operating systems, the gatekeepers of discovery are changing and with them, the rules of visibility.
            </p>

            <p className="mb-6">
              This guide is written for founders, CMOs, product marketers, and growth leaders in B2B SaaS who want to stay ahead of that shift. It's not about chasing another acronym. It's about building real authority in a landscape increasingly mediated by AI.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">In this guide you will find:</h3>
              <ul className="space-y-2">
                <li>• Practical strategies grounded in how LLMs actually generate answers</li>
                <li>• Insights from real-world examples, user queries, and platform behaviour</li>
                <li>• Data-backed context to distinguish trend from transformation</li>
              </ul>
            </div>

            <p className="text-lg font-medium text-gray-900 mb-8">
              If your brand is not showing up in AI search results, you're not just missing clicks – you are absent from the conversation altogether.
            </p>

            <p className="mb-6">
              Before we dive into what to do about it, let's understand how we got here.
            </p>
          </section>

          {/* Section 1: The Long Road to AI */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Long Road to AI: How Search Evolved</h2>
            
            <p className="mb-6">
              Imagine the internet as a vast library.
            </p>

            <p className="mb-6">
              In the early 1990s there was no catalogue, only shelves filled with disorganised books. Early search engines like Archie and Veronica worked like primitive card indexes. In 1994 Yahoo launched a human curated directory; librarians manually categorised websites. AltaVista arrived a year later with the first large scale full text index of the web. It matched keywords but made no judgement about quality. These early tools were useful but limited - finding relevant information often felt like wandering through stacks with no guidance.
            </p>

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

          {/* Section 2: What Exactly Is GEO? */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What Exactly Is GEO?</h2>
            
            <p className="mb-6">
              Generative Engine Optimisation (GEO) is the practice of influencing how AI powered search systems perceive, cite and summarise your brand. If SEO is about ensuring that search algorithms rank your web pages, GEO is about ensuring that large language models and generative engines integrate your brand into their answers. Put differently, SEO helps you place signposts along the highway, while GEO helps you become part of the travel guide that the AI writes for the traveller.
            </p>

            <p className="mb-6">
              The concept of GEO was formalised in a 2024 study by researchers at Princeton University and the Allen Institute for AI. They defined a generative engine as an AI system that synthesises responses by summarising information from multiple sources. Unlike traditional search engines that return lists of links, generative engines produce complete answers. This provides convenience for users but reduces the visibility of the original publishers.
            </p>

            <p className="mb-6">
              The researchers proposed treating generative engines as black boxes and designed experiments to see how different content strategies affected visibility in AI answers. They created a benchmark called GEO-bench and discovered that certain tactics - such as including verifiable statistics, quoting experts and linking to trusted sources could increase the frequency with which a brand is mentioned by up to 40%.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">How GEO Differs From Traditional SEO</h3>
            
            <p className="mb-6">
              Both SEO and GEO aim to connect users with relevant information, but they operate in different contexts and reward different signals.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">Traditional SEO</h4>
                <p className="text-sm text-blue-800 mb-4">
                  The primary goal is to improve your ranking in search engine results pages (SERPs). You optimise on-page content for keywords, build backlinks to signal authority, improve site speed, create a mobile friendly experience and ensure that crawlers can index your pages.
                </p>
                <p className="text-sm text-blue-800">
                  Success is measured by metrics like organic traffic, click through rate, bounce rate and conversions.
                </p>
              </div>
              
              <div className="bg-violet-50 border border-violet-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-violet-900 mb-3">GEO</h4>
                <p className="text-sm text-violet-800 mb-4">
                  The goal is to increase your presence in AI generated answers. You influence how large language models learn and retrieve information by seeding your brand across various sources and by crafting content that models find easy to quote.
                </p>
                <p className="text-sm text-violet-800">
                  Metrics include share of voice in AI answers, frequency of citations, sentiment of mentions and alignment with your messaging.
                </p>
              </div>
            </div>

            <p className="mb-6">
              SEO still remains essential as Generative engines often rely on high ranking pages as part of their training and retrieval pipelines. Yet SEO alone does not guarantee success in a generative context.
            </p>

            <p className="mb-6">
              You could rank first on Google and still be ignored by ChatGPT if your brand is not present in the data sources that the model uses or if your content lacks the structure that makes it quotable. Conversely, you might lack strong traditional SEO but still surface in AI answers because customers rave about you on Reddit or because your research report is widely cited.
            </p>
          </section>

          {/* Section 3: Key Components of GEO */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Components of GEO</h2>
            
            <div className="space-y-8">
              <div className="border-l-4 border-blue-400 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Verifiable Statements and Statistics</h3>
                <p className="mb-4">
                  AI models value information they can corroborate. Including clear data points, quotes and statistics, especially those attributed to credible third parties helps your content become a candidate for citation. For example, referencing Gartner's projection that traditional search marketing spend will fall by twenty five per cent by 2026 not only educates your reader but also signals to AI that your article connects to authoritative research.
                </p>
              </div>

              <div className="border-l-4 border-green-400 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Multi-channel Presence</h3>
                <p className="mb-4">
                  Generative engines do not rely on your site alone. They pull from discussion forums, Q and A communities, review aggregators, news sites and research papers. Engaging with audiences on Reddit threads, contributing answers on Stack Overflow or Quora and ensuring that satisfied customers leave detailed reviews on G2 or Capterra increases the likelihood that models will encounter your brand. Each mention becomes a breadcrumb that a model can follow.
                </p>
              </div>

              <div className="border-l-4 border-violet-400 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Structured and Accessible Content</h3>
                <p className="mb-4">
                  Use schema markup to signal key information such as product categories, pricing and reviews. Provide clear section headings, bullet points and FAQs. These structures help retrieval systems identify relevant snippets. Avoid putting core content behind paywalls without an accessible summary; models cannot cite what they cannot reach.
                </p>
              </div>

              <div className="border-l-4 border-orange-400 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Consistent Messaging and Summarisation</h3>
                <p className="mb-4">
                  Across blog posts, case studies, press releases and documentation, describe your product in consistent language. Summarise your value proposition in a sentence or two at the top of each piece of content. Models often quote the first descriptive sentences they find. If your messaging varies widely, the AI may misinterpret or omit it.
                </p>
              </div>

              <div className="border-l-4 border-red-400 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Community Engagement and Signal Amplification</h3>
                <p className="mb-4">
                  Participate authentically in communities where your customers seek advice. Provide thoughtful answers without overtly promoting your product. Encourage users to share their experiences. When multiple independent voices describe your solution similarly, models recognise a pattern and become more likely to include you.
                </p>
              </div>

              <div className="border-l-4 border-indigo-400 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Tracking and Feedback Loops</h3>
                <p className="mb-4">
                  Regularly test AI assistants with queries relevant to your category. Note whether and how your brand is mentioned and which sources the models cite. Adjust your content strategy based on what you observe. As of 2025, mainstream SEO tools like Ahrefs and Semrush are starting to experiment with AI visibility features, but these remain in beta and do not reliably indicate how ChatGPT or Gemini recommend your brand. Custom monitoring and manual testing are still necessary.
                </p>
              </div>
            </div>

            <p className="mt-8 text-lg font-medium text-gray-900">
              GEO does not replace SEO; it expands the field of play. By understanding both, you can position your brand to succeed in the dual worlds of generative and traditional search.
            </p>
          </section>

          {/* Section 4: Why GEO Matters for B2B SaaS */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why GEO Matters for B2B SaaS in 2025 and Beyond</h2>
            
            <p className="mb-6">
              Large language models are not a passing fad - they are becoming mainstream tools for research and decision making. For B2B SaaS companies the stakes are especially high because purchase cycles often involve complex questions and peer recommendations. Let us examine why GEO should be on your strategic agenda.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Search Adoption Is Soaring</h3>
            <p className="mb-6">
              The data on AI search adoption tells a compelling story. As mentioned earlier, ChatGPT reached 300 million weekly active users by early 2025, making it one of the fastest-growing consumer applications in history.
            </p>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Master GEO?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              This is just the beginning of your GEO journey. Join our waitlist to get the complete guide and stay updated with the latest strategies as AI search continues to evolve.
            </p>
            <Button onClick={scrollToWaitlist} size="lg" className="bg-blue-600 hover:bg-blue-700">
              Join the Waitlist
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </section>
        </article>
      </main>
    </div>
  );
}