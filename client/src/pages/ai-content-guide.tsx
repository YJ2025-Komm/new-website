import { useEffect, useState } from 'react';
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { ArrowRight, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function AiContentGuide() {
  const [activeSection, setActiveSection] = useState('');

  useSEO({
    title: "How to Write Content AI Actually Cites — 2026 B2B Guide | GeoRankers",
    description:
      "Learn how to write B2B content that earns AI citations in 2026. Extractable assertions, specificity signals, and a 4-stage framework for ChatGPT, Google AI Mode, and Gemini.",
    canonical: "https://georankers.ai/ai-content-guide",
    ogTitle: "How to Write Content That AI Actually Cites: The B2B Brand Guide",
    ogDescription:
      "The complete guide to writing B2B content that earns citations in AI-generated answers. Learn the mechanics behind ChatGPT, Perplexity, and Gemini — and how to optimize every section for extraction.",
    ogUrl: "https://georankers.ai/ai-content-guide",
    schemaId: "ai-content-guide-schema",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Write Content That AI Actually Cites: The Comprehensive Guide for B2B Brands",
      "description": "A comprehensive guide covering the mechanics of AI content retrieval, extractable assertions, specificity signals, platform-specific citation patterns, and a 4-stage content framework for B2B brands.",
      "image": { "@type": "ImageObject", "url": "https://georankers.ai/og-image.png", "width": 1200, "height": 630 },
      "inLanguage": "en-US",
      "author": { "@type": "Organization", "name": "GeoRankers", "url": "https://georankers.ai" },
      "publisher": {
        "@type": "Organization",
        "name": "GeoRankers",
        "url": "https://georankers.ai",
        "logo": { "@type": "ImageObject", "url": "https://georankers.ai/og-image.png" },
      },
      "datePublished": "2026-04-30",
      "dateModified": "2026-07-26",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://georankers.ai/ai-content-guide" },
      "articleSection": "AI Search Marketing",
      "keywords": [
        "AI content optimization", "write for AI search", "GEO content strategy",
        "B2B AI citation", "ChatGPT content", "Perplexity SEO",
        "generative engine optimization", "AI-citable content",
        "content freshness AI", "extractable assertions",
      ],
      "about": [
        { "@type": "Thing", "name": "Generative Engine Optimization", "description": "Optimizing content to be cited by AI-powered search systems such as ChatGPT, Perplexity, and Gemini" },
        { "@type": "Thing", "name": "AI Search Citation", "description": "The process by which AI models select and reference source content when generating synthesized answers" },
      ],
      "mentions": [
        { "@type": "Organization", "name": "Gartner" },
        { "@type": "Organization", "name": "OpenAI" },
        { "@type": "Organization", "name": "Google" },
        { "@type": "Organization", "name": "Perplexity" },
        { "@type": "Organization", "name": "BrightEdge" },
        { "@type": "Organization", "name": "Digitaloft" },
        { "@type": "Organization", "name": "Seer Interactive" },
        { "@type": "Organization", "name": "Onely" },
        { "@type": "Organization", "name": "SE Ranking" },
        { "@type": "Organization", "name": "Growth Memo" },
        { "@type": "Organization", "name": "Stacker" },
      ],
      "citation": [
        { "@type": "CreativeWork", "name": "GEO: Generative Engine Optimization", "author": "Aggarwal et al.", "datePublished": "2024" },
        { "@type": "CreativeWork", "name": "AI Citation Freshness Analysis", "author": "Digitaloft", "datePublished": "2025" },
        { "@type": "CreativeWork", "name": "AI Overview Citation Research", "author": "Seer Interactive", "datePublished": "2025" },
        { "@type": "CreativeWork", "name": "Structured Content and Citation Rates", "author": "Onely", "datePublished": "2025" },
        { "@type": "CreativeWork", "name": "Page Speed and AI Citations", "author": "SE Ranking", "datePublished": "2025" },
      ],
    },
  });

  // Standalone BreadcrumbList — check-before-create prevents duplication on prerender + hydration
  useEffect(() => {
    const ID = 'ai-content-guide-breadcrumb-schema';
    let el = document.querySelector(`script#${ID}`) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = ID;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://georankers.ai/" },
        { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://georankers.ai/geo-guide" },
        { "@type": "ListItem", "position": 3, "name": "How to Write Content That AI Actually Cites", "item": "https://georankers.ai/ai-content-guide" },
      ],
    });
    return () => { el?.remove(); };
  }, []);

  // Standalone FAQPage — separate script tag avoids Google "Duplicate field FAQ page" error.
  // Uses check-before-create so hydration after prerender does not add a second copy.
  useEffect(() => {
    const ID = 'ai-content-guide-faq-schema';
    let el = document.querySelector(`script#${ID}`) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = ID;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What is the difference between writing for SEO and writing for AI search?", "acceptedAnswer": { "@type": "Answer", "text": "Traditional SEO optimizes pages to rank for specific keywords in a list of results. Writing for AI search requires creating content that can be extracted, synthesized, and cited as part of a single coherent answer. The core difference is that AI systems retrieve at the passage level rather than the page level, which means every section of a piece of content needs to be able to stand alone as a useful, specific answer to a real question." } },
        { "@type": "Question", "name": "Does content length matter for AI citation?", "acceptedAnswer": { "@type": "Answer", "text": "Content depth matters more than raw word count. Long-form content of 2,000 words or more is cited more frequently than short content, but only when it maintains specificity and depth throughout rather than padding to hit a length target. The more useful measure is whether each major section contains at least one specific, extractable assertion supported by evidence. A 2,500-word piece with 10 citable sections will consistently outperform a 5,000-word piece with two." } },
        { "@type": "Question", "name": "How often should content be updated for AI visibility?", "acceptedAnswer": { "@type": "Answer", "text": "Research shows that 76.4% of ChatGPT's most-cited pages were updated within the last 30 days, and the majority of AI Overview citations come from content published within the last two years. For content in fast-moving categories, meaningful updates every three to six months are worth considering for high-priority pieces. The update should reflect genuinely new data, examples, or framing rather than cosmetic changes to a publication date." } },
        { "@type": "Question", "name": "Does schema markup help with AI citation?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, though the relationship is stronger for some platforms than others. Gemini shows a pronounced preference for structured, schema-marked content on brand-owned domains. Research suggests that products with comprehensive schema markup appear in AI recommendations three to five times more frequently than those without it. For ChatGPT and Perplexity, the effect is less direct but still meaningful in that schema markup contributes to the overall authority and crawlability signals those platforms factor into source selection." } },
        { "@type": "Question", "name": "What role do community platforms play in AI visibility?", "acceptedAnswer": { "@type": "Answer", "text": "Community platforms play a larger role than most content strategies currently account for. Domains with substantial brand mentions on Quora and Reddit have approximately four times higher citation rates than those with minimal community presence. Perplexity draws roughly 46.7% of its top citations from Reddit alone for certain query types. The mechanism is that AI systems learned from human conversations, and the platforms where those conversations happen in the most candid and detailed form become disproportionately influential in shaping how AI answers describe brands and categories." } },
        { "@type": "Question", "name": "What types of content does AI cite most?", "acceptedAnswer": { "@type": "Answer", "text": "AI systems disproportionately cite content that is specific, structured, and sourced. Research-backed content with named statistics is cited 22% more frequently than generic claims (Aggarwal et al., 2024). Content containing direct quotes from named experts sees a 37% higher citation rate. Structured formats — tables, numbered lists, FAQ sections — are cited 2.5x more often than unstructured prose (Onely, 2025). Content that defines terms clearly, answers questions directly, and front-loads its key claims in the first 30% of the page consistently outperforms longer, less structured alternatives." } },
        { "@type": "Question", "name": "How do I write content that gets cited in ChatGPT?", "acceptedAnswer": { "@type": "Answer", "text": "To get cited in ChatGPT in 2026, focus on four things: (1) Write extractable assertions — every section should contain a specific, self-contained claim supported by evidence. (2) Use structure AI can parse — headers, bullet points, numbered lists, and FAQ sections signal retrievable content. (3) Build domain authority — ChatGPT shows a 3.5x citation lift for domains with 32,000+ referring domains. (4) Keep content fresh — 76.4% of ChatGPT's most-cited pages were updated within the last 30 days (Digitaloft, 2025). Combine these with FAQPage and Article schema markup to maximize extractability." } },
        { "@type": "Question", "name": "What is an extractable assertion?", "acceptedAnswer": { "@type": "Answer", "text": "An extractable assertion is a self-contained sentence or passage that AI systems can lift directly from your content and use as part of a synthesized answer — without needing surrounding context to make sense. It combines a specific claim, supporting evidence or a named source, and enough context to stand alone. Every section of AI-optimized content should contain at least one extractable assertion." } },
        { "@type": "Question", "name": "How do I structure B2B content for AI search?", "acceptedAnswer": { "@type": "Answer", "text": "Structure B2B content for AI search by treating each section as an independent answer unit. Start with a clear H2 or H3 that names the topic explicitly. Open the section with your strongest, most specific claim. Support that claim with a named statistic or sourced evidence. Use bullet points or numbered lists for multi-part answers. Add a FAQ section at the bottom of long-form content to capture question-based queries. Implement Article and FAQPage schema markup so AI systems can identify the content type and extract it more reliably." } },
      ],
    });
    return () => { el?.remove(); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        let bestEntry: IntersectionObserverEntry | null = null;
        let bestRatio = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestEntry = entry;
            bestRatio = entry.intersectionRatio;
          }
        });
        const best = bestEntry as IntersectionObserverEntry | null;
        if (best && best.target instanceof HTMLElement) {
          setActiveSection(best.target.id);
        }
      },
      { rootMargin: '-10% 0px -60% 0px', threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5] }
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const tocLink = (id: string, label: string) => (
    <a
      href={`#${id}`}
      className={`group block px-2 py-1.5 rounded transition-all duration-200 transform hover:translate-x-1 ${
        activeSection === id
          ? 'text-blue-600 bg-blue-50 translate-x-1'
          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
      }`}
    >
      <span className="text-xs font-medium">{label}</span>
    </a>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative py-20 pt-28 min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/90 to-violet-50/80"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="text-sm text-blue-600 font-medium mb-4 uppercase tracking-wide">
                Strategic Guide
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-6 leading-[1.1]">
                How to Write Content That AI Actually Cites
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">
                The Comprehensive Guide for B2B Brands
              </h2>
              <p className="text-xs text-gray-400 mb-8 font-medium">Last updated: May 2026 | GeoRankers — AI search visibility platform for B2B SaaS teams</p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                AI chatbots now synthesize answers from thousands of sources — and most B2B content is
                structurally invisible to them. This guide explains the mechanics, the signals, and the
                four-stage framework for writing content that earns citations across ChatGPT, Gemini,
                and Perplexity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://dashboard.georankers.co/register"
                  className="inline-flex items-center gradient-cta hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg no-underline"
                >
                  Track Your AI Citations
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>

            {/* Right — decorative card stack */}
            <div className="relative">
              <div className="relative p-8">
                {/* Main card */}
                <div className="relative bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl shadow-2xl p-8 transform rotate-6 hover:rotate-3 transition-transform duration-300">
                  <div className="text-white">
                    <div className="text-xs uppercase tracking-wider opacity-90 mb-2">Comprehensive Guide 2026</div>
                    <h3 className="text-xl font-bold mb-4 leading-tight">Write Content AI Cites</h3>
                    <div className="space-y-2 text-sm opacity-90">
                      <p>• Extractable assertion framework</p>
                      <p>• Platform-specific citation patterns</p>
                      <p>• Specificity &amp; authority signals</p>
                      <p>• 4-stage content framework</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/20">
                      <div className="text-xs">GeoRankers Research Team</div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 w-16 h-12 bg-white/20 rounded backdrop-blur-sm">
                    <div className="p-2 h-full flex items-end justify-between">
                      <div className="w-2 bg-white/60 rounded-t" style={{ height: '40%' }}></div>
                      <div className="w-2 bg-white/80 rounded-t" style={{ height: '70%' }}></div>
                      <div className="w-2 bg-white/90 rounded-t" style={{ height: '90%' }}></div>
                      <div className="w-2 bg-white rounded-t" style={{ height: '55%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Citation stats card */}
                <div className="absolute top-4 right-0 bg-white rounded-lg shadow-xl p-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300 w-52 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-2">AI Citation Rates</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Structured content</span>
                      <span className="font-semibold text-green-600">+40%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Named statistics</span>
                      <span className="font-semibold text-blue-600">+22%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Direct quotes</span>
                      <span className="font-semibold text-purple-600">+37%</span>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>

                {/* Key signals card */}
                <div className="absolute bottom-0 left-4 bg-white rounded-lg shadow-lg p-3 transform rotate-12 hover:rotate-6 transition-transform duration-300 w-44 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-2">What AI Looks For</div>
                  <div className="space-y-1 text-xs text-gray-700">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                      <span>Extractable assertions</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span>Named data sources</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                      <span>Fresh, specific content</span>
                    </div>
                  </div>
                </div>

                {/* Floating dot */}
                <div className="absolute top-16 right-12 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Guide Content ───────────────────────────────────────────────────── */}
      <main id="main-content" className="flex max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 gap-4 lg:gap-8">

        {/* TOC */}
        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-16 h-fit max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-3">Table of Contents</h3>
            <nav className="space-y-0">
              {tocLink('ai-search-shift', 'Why the Shift Is Happening Now')}
              {tocLink('machine-logic', 'The Machine Has Different Logic')}
              {tocLink('extractable-assertions', 'The Fundamental Unit: Extractable Assertions')}
              {tocLink('specificity-citation', 'How Specificity Becomes Citation Gravity')}
              {tocLink('authority-signals', 'The Authority Signals AI Reads Differently')}
              {tocLink('platform-differences', 'How Different AI Platforms Actually Cite')}
              {tocLink('structure-retrieval', 'Structure as a Retrieval Signal')}
              {tocLink('freshness-problem', 'The Freshness Problem Most Brands Are Ignoring')}
              {tocLink('citable-sentences', 'Writing the Sentence That Gets Cited')}
              {tocLink('multi-surface', 'Multi-Surface Content Strategy')}
              {tocLink('content-framework', 'The Content Framework: Putting It Together')}
              {tocLink('what-this-means', 'What This Shift Actually Means')}
              {tocLink('faq', 'Frequently Asked Questions')}
            </nav>
          </div>
        </aside>

        {/* Article body */}
        <div className="flex-1 max-w-4xl lg:ml-0">
          <article className="prose prose-lg max-w-none px-2 sm:px-0">

            {/* ── Introduction ─────────────────────────────────────────────── */}
            <section className="mb-12">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                There is a quiet change happening inside the B2B buying journey that most content teams have not
                fully accounted for yet. A founder searching for the right project management tool no longer types
                a query into Google, clicks through four tabs, skims a comparison post, and eventually forms a
                shortlist. Instead, she opens ChatGPT or Perplexity, asks a specific question, and receives a
                single synthesized answer that has already weighed her options. If your brand is in that answer,
                she knows you exist. If it is not, you do not exist — regardless of how many pages you have
                indexed and how well they rank.
              </p>
              <p className="mb-6">
                This is not a small shift at the edges of search behavior. The numbers make the direction clear:
              </p>
              <ul className="mb-8 space-y-2">
                <li>Gartner predicted traditional search engine volume will drop 25% by 2026 as AI chatbots function as substitute answer engines</li>
                <li>ChatGPT now processes roughly 2.5 billion prompts each day</li>
                <li>Google's AI Overviews appear in more than half of all search results</li>
                <li>AI-referred sessions grew 527% year over year between early 2024 and early 2025</li>
              </ul>

              {/* ── Chart 1: AI Session Growth ─────────────────────────────── */}
              <div className="my-8 not-prose">
                <svg
                  viewBox="0 0 800 430"
                  className="w-full h-auto rounded-xl border border-gray-100 shadow-sm"
                  role="img"
                  aria-labelledby="ch1Title ch1Desc"
                >
                  <title id="ch1Title">AI-Referred vs. Traditional Search Sessions (2023–2025)</title>
                  <desc id="ch1Desc">Area chart indexed to Q1 2024 = 100, showing AI-referred sessions growing from index 12 in Q1 2023 to index 627 by Q1 2025 — a 527% year-over-year increase — while traditional search remained nearly flat between index 108 and 88 over the same period. Stat callouts: 527% YoY growth, 2.5 billion daily ChatGPT prompts, 50%+ of searches show AI Overviews, and a predicted 25% drop in traditional search by 2026 (Gartner). Sources: Digitaloft 2025, Gartner, multiple industry studies.</desc>
                  <defs>
                    <linearGradient id="ch1Area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.20" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
                    </linearGradient>
                    <linearGradient id="ch1Line" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>

                  {/* Card background */}
                  <rect width="800" height="430" rx="12" fill="white" />

                  {/* ── Header ─── */}
                  <text x="40" y="32" fontSize="15" fontWeight="700" fill="#111827">
                    AI-Referred vs. Traditional Search Sessions (Indexed)
                  </text>
                  <text x="40" y="52" fontSize="11" fill="#6b7280">
                    Q1 2024 = 100 baseline · Sources: Digitaloft 2025, Gartner, multiple industry studies
                  </text>

                  {/* Legend */}
                  <line x1="490" y1="32" x2="516" y2="32" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="503" cy="32" r="4" fill="white" stroke="#3b82f6" strokeWidth="2.5" />
                  <text x="522" y="36" fontSize="11" fill="#374151">AI-Referred Sessions</text>
                  <line x1="650" y1="32" x2="676" y2="32" stroke="#d1d5db" strokeWidth="2" strokeDasharray="5,3" />
                  <text x="682" y="36" fontSize="11" fill="#374151">Traditional Search</text>

                  {/* Y-axis rotated label */}
                  <text x="12" y="195" fontSize="9.5" fill="#9ca3af" textAnchor="middle" transform="rotate(-90 12 195)">
                    Session index (Q1 2024 = 100)
                  </text>

                  {/* ── Grid lines + Y labels ──
                       Scale: chart y=308 at value=0, y=78 at value=650
                       formula: y = 308 - value * (230/650) = 308 - value * 0.3538           */}

                  {/* 0   → y=308 */}
                  <line x1="120" y1="308" x2="740" y2="308" stroke="#d1d5db" strokeWidth="1.5" />
                  <text x="112" y="312" fontSize="9.5" fill="#9ca3af" textAnchor="end">0</text>

                  {/* 100 → y=273 */}
                  <line x1="120" y1="273" x2="740" y2="273" stroke="#f3f4f6" strokeWidth="1" />
                  <text x="112" y="277" fontSize="9.5" fill="#9ca3af" textAnchor="end">100</text>

                  {/* 200 → y=237 */}
                  <line x1="120" y1="237" x2="740" y2="237" stroke="#f3f4f6" strokeWidth="1" />
                  <text x="112" y="241" fontSize="9.5" fill="#9ca3af" textAnchor="end">200</text>

                  {/* 300 → y=202 */}
                  <line x1="120" y1="202" x2="740" y2="202" stroke="#f3f4f6" strokeWidth="1" />
                  <text x="112" y="206" fontSize="9.5" fill="#9ca3af" textAnchor="end">300</text>

                  {/* 400 → y=166 */}
                  <line x1="120" y1="166" x2="740" y2="166" stroke="#f3f4f6" strokeWidth="1" />
                  <text x="112" y="170" fontSize="9.5" fill="#9ca3af" textAnchor="end">400</text>

                  {/* 500 → y=131 */}
                  <line x1="120" y1="131" x2="740" y2="131" stroke="#f3f4f6" strokeWidth="1" />
                  <text x="112" y="135" fontSize="9.5" fill="#9ca3af" textAnchor="end">500</text>

                  {/* 600 → y=96 */}
                  <line x1="120" y1="96" x2="740" y2="96" stroke="#f3f4f6" strokeWidth="1" />
                  <text x="112" y="100" fontSize="9.5" fill="#9ca3af" textAnchor="end">600</text>

                  {/* ── Vertical reference line at Q1 2024 baseline ── */}
                  <line x1="430" y1="76" x2="430" y2="308" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.5" />
                  <rect x="383" y="62" width="94" height="18" rx="4" fill="#ecfdf5" />
                  <text x="430" y="74" fontSize="9.5" fill="#059669" textAnchor="middle" fontWeight="600">2024 Baseline</text>

                  {/* ── Area fill (AI sessions) ──
                       Data: Q1'23(120,304) Q3'23(275,295) Q1'24(430,273) Q3'24(585,205) Q1'25(740,86) */}
                  <path
                    d="M 120,308 L 120,304
                       C 175,301 220,295 275,295
                       C 340,290 390,273 430,273
                       C 500,255 548,205 585,205
                       C 650,140 700,86 740,86
                       L 740,308 Z"
                    fill="url(#ch1Area)"
                  />

                  {/* ── Traditional search line (dashed gray, nearly flat: y≈270–277) ── */}
                  <path
                    d="M 120,270 C 220,271 340,273 430,273 C 510,273 620,274 740,277"
                    fill="none"
                    stroke="#d1d5db"
                    strokeWidth="2"
                    strokeDasharray="6,4"
                  />

                  {/* ── AI sessions line ── */}
                  <path
                    d="M 120,304
                       C 175,301 220,295 275,295
                       C 340,290 390,273 430,273
                       C 500,255 548,205 585,205
                       C 650,140 700,86 740,86"
                    fill="none"
                    stroke="url(#ch1Line)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* ── Data point dots on AI line ── */}
                  <circle cx="120" cy="304" r="5" fill="white" stroke="#3b82f6" strokeWidth="2.5" />
                  <circle cx="275" cy="295" r="5" fill="white" stroke="#3b82f6" strokeWidth="2.5" />
                  <circle cx="430" cy="273" r="5" fill="white" stroke="#3b82f6" strokeWidth="2.5" />
                  <circle cx="585" cy="205" r="5" fill="white" stroke="#7c3aed" strokeWidth="2.5" />
                  <circle cx="740" cy="86"  r="5" fill="white" stroke="#7c3aed" strokeWidth="2.5" />

                  {/* ── +527% YoY callout ── */}
                  <rect x="625" y="58" width="116" height="52" rx="8" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                  <text x="683" y="82" fontSize="21" fontWeight="800" fill="#1d4ed8" textAnchor="middle">+527%</text>
                  <text x="683" y="99" fontSize="9.5" fill="#3b82f6" textAnchor="middle">YoY AI session growth</text>

                  {/* ── X-axis labels ── */}
                  <text x="120" y="323" fontSize="10.5" fill="#6b7280" textAnchor="middle">Q1 2023</text>
                  <text x="275" y="323" fontSize="10.5" fill="#6b7280" textAnchor="middle">Q3 2023</text>
                  <text x="430" y="323" fontSize="10.5" fill="#059669" textAnchor="middle" fontWeight="600">Q1 2024</text>
                  <text x="585" y="323" fontSize="10.5" fill="#6b7280" textAnchor="middle">Q3 2024</text>
                  <text x="740" y="323" fontSize="10.5" fill="#7c3aed" textAnchor="middle" fontWeight="600">Q1 2025</text>

                  {/* ── Divergence annotation ── */}
                  <line x1="585" y1="192" x2="585" y2="170" stroke="#6b7280" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="585" y1="262" x2="585" y2="170" stroke="#6b7280" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="578" y1="170" x2="592" y2="170" stroke="#6b7280" strokeWidth="1" />
                  <text x="596" y="174" fontSize="9" fill="#6b7280">68-unit gap</text>

                  {/* ── Divider ── */}
                  <line x1="30" y1="340" x2="770" y2="340" stroke="#f3f4f6" strokeWidth="1" />

                  {/* ── Vertical stat dividers ── */}
                  <line x1="238" y1="348" x2="238" y2="420" stroke="#f3f4f6" strokeWidth="1" />
                  <line x1="444" y1="348" x2="444" y2="420" stroke="#f3f4f6" strokeWidth="1" />
                  <line x1="622" y1="348" x2="622" y2="420" stroke="#f3f4f6" strokeWidth="1" />

                  {/* ── Stat 1: 527% ── */}
                  <text x="119" y="374" fontSize="20" fontWeight="700" fill="#1d4ed8" textAnchor="middle">527%</text>
                  <text x="119" y="392" fontSize="9.5" fill="#6b7280" textAnchor="middle">YoY growth in</text>
                  <text x="119" y="406" fontSize="9.5" fill="#6b7280" textAnchor="middle">AI-referred sessions</text>

                  {/* ── Stat 2: 2.5B ── */}
                  <text x="341" y="374" fontSize="20" fontWeight="700" fill="#1d4ed8" textAnchor="middle">2.5B</text>
                  <text x="341" y="392" fontSize="9.5" fill="#6b7280" textAnchor="middle">daily prompts</text>
                  <text x="341" y="406" fontSize="9.5" fill="#6b7280" textAnchor="middle">processed by ChatGPT</text>

                  {/* ── Stat 3: 50%+ ── */}
                  <text x="533" y="374" fontSize="20" fontWeight="700" fill="#1d4ed8" textAnchor="middle">50%+</text>
                  <text x="533" y="392" fontSize="9.5" fill="#6b7280" textAnchor="middle">of searches now</text>
                  <text x="533" y="406" fontSize="9.5" fill="#6b7280" textAnchor="middle">include AI Overviews</text>

                  {/* ── Stat 4: –25% ── */}
                  <text x="706" y="374" fontSize="20" fontWeight="700" fill="#dc2626" textAnchor="middle">–25%</text>
                  <text x="706" y="392" fontSize="9.5" fill="#6b7280" textAnchor="middle">predicted drop in</text>
                  <text x="706" y="406" fontSize="9.5" fill="#6b7280" textAnchor="middle">traditional search by 2026</text>
                </svg>
                <p className="text-xs text-center text-gray-400 mt-2">
                  Session index based on Q1 2024 = 100 baseline. AI session data from Digitaloft 2025 and multiple industry studies. Traditional search decline projection: Gartner.
                </p>
              </div>

              <p className="mb-6">
                The scale at which buyers now receive synthesized answers rather than ranked links means that
                showing up in AI-generated responses is no longer a forward-looking optimization exercise — it is
                a present-tense visibility problem.
              </p>
              <p className="mb-6">
                The challenge is that most content built for traditional SEO was designed for a fundamentally
                different machine. Google ranks pages. AI synthesizes them into a single answer and leaves most
                of the source material invisible. Writing for one does not automatically translate to being cited
                by the other, and yet nearly every piece of content guidance written for B2B brands continues to
                treat the two as compatible endpoints for the same investment. They are not. For a broader
                strategic framework on how to optimize across all AI platforms, see{' '}
                <Link href="/geo-guide" className="text-blue-600 hover:text-blue-800 underline">The Complete GEO Playbook</Link>.
              </p>
            </section>

            {/* ── CTA 1 ────────────────────────────────────────────────────── */}
            <div className="my-12 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Is Your Brand Showing Up in AI Answers?</h3>
              <p className="text-gray-600 mb-6">Check your AI Brand Snapshot in seconds — see exactly how ChatGPT, Gemini, and Perplexity describe your brand right now. Free, no sign-up required.</p>
              <Link href="/free-geo-tools/brand-visibility" className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg no-underline">
                <ArrowRight className="w-4 h-4 mr-2" />
                Try AI Brand Snapshot — Free
              </Link>
            </div>

            {/* ── Section 1: Machine Logic ──────────────────────────────────── */}
            <section id="machine-logic" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Machine Has Different Logic</h2>
              <p className="mb-6">
                Before attempting to optimize for AI search, it helps to understand what is actually happening
                when a model generates an answer, because the mechanics are considerably different from how most
                marketers imagine them.
              </p>
              <p className="mb-6">
                When someone asks ChatGPT or Perplexity a question, the system does not simply retrieve the
                top-ranked page and summarize it. It runs what Google's Head of Search, Elizabeth Reid, described
                at Google I/O 2025 as "query fan-out" — breaking the original question into multiple sub-queries
                and running them simultaneously across a wide range of sources. The model then synthesizes the
                results, compressing them into a single narrative designed to feel coherent and complete.
                Critically, the content that most closely aligns semantically with the query influences the tone,
                framing, and specific language of the answer, often without being cited directly.
              </p>
              <p className="mb-6">
                This distinction matters enormously because <strong>citation and influence are decoupled</strong> in ways
                that traditional SEO never had to contend with. In conventional search, if a page ranked, you
                could measure its contribution through clicks and traffic. In AI search, a page can meaningfully
                shape how a model describes your brand, your category, and your competitors without ever appearing
                as a reference link.
              </p>
              <p className="mb-4 font-medium text-gray-800">The table below summarizes how this changes the operating logic across the two systems:</p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-3 border border-gray-200 font-semibold">Dimension</th>
                      <th className="text-left p-3 border border-gray-200 font-semibold">Traditional SEO</th>
                      <th className="text-left p-3 border border-gray-200 font-semibold text-blue-700">AI Search</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Unit of evaluation', 'Page', 'Extractable passage'],
                      ['Ranking signal', 'Backlinks, keywords, authority', 'Semantic relevance, citation density, brand presence'],
                      ['Visibility measure', 'Ranking position', 'Mention in synthesized answer'],
                      ['Attribution', 'Click and traffic data', 'Often invisible'],
                      ['Freshness impact', 'Moderate', 'High (76.4% of cited pages updated in last 30 days)'],
                      ['Platform behavior', 'One engine, similar rules', 'Each AI platform cites differently'],
                      ['Content goal', 'Rank for a keyword', 'Answer a specific question completely'],
                    ].map(([dim, seo, ai], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 border border-gray-200 font-medium text-gray-700">{dim}</td>
                        <td className="p-3 border border-gray-200 text-gray-600">{seo}</td>
                        <td className="p-3 border border-gray-200 text-blue-700">{ai}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── Chart 2: Query Fan-Out ─────────────────────────────────── */}
              <div className="my-8 not-prose">
                <svg
                  viewBox="0 0 800 370"
                  className="w-full h-auto rounded-xl border border-gray-100 shadow-sm"
                  role="img"
                  aria-labelledby="ch2Title ch2Desc"
                >
                  <title id="ch2Title">How AI Query Fan-Out Works</title>
                  <desc id="ch2Desc">Flow diagram showing a single user query split into four parallel sub-queries — targeting definition context, research data, community sentiment, and product comparisons — each retrieving passages from different source types, then all converging into one synthesized answer.</desc>
                  <rect width="800" height="370" rx="12" fill="white" />
                  {/* Header */}
                  <text x="40" y="32" fontSize="15" fontWeight="700" fill="#111827">How AI Query Fan-Out Works</text>
                  <text x="40" y="52" fontSize="11" fill="#6b7280">A single question is broken into parallel sub-queries, each retrieving passages from different source types · Elizabeth Reid, Google I/O 2025</text>
                  {/* Step labels */}
                  <text x="95" y="79" fontSize="9.5" fontWeight="700" fill="#3b82f6" textAnchor="middle" letterSpacing="0.5">① USER QUERY</text>
                  <text x="318" y="79" fontSize="9.5" fontWeight="700" fill="#7c3aed" textAnchor="middle" letterSpacing="0.5">② QUERY FAN-OUT</text>
                  <text x="672" y="79" fontSize="9.5" fontWeight="700" fill="#059669" textAnchor="middle" letterSpacing="0.5">③ SYNTHESIZED ANSWER</text>

                  {/* User Query box */}
                  <rect x="22" y="145" width="146" height="72" rx="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
                  <text x="95" y="170" fontSize="11" fontWeight="700" fill="#1d4ed8" textAnchor="middle">User Query</text>
                  <text x="95" y="188" fontSize="9.5" fill="#3b82f6" textAnchor="middle">"How do I write content</text>
                  <text x="95" y="203" fontSize="9.5" fill="#3b82f6" textAnchor="middle">AI will cite?"</text>

                  {/* Fan-out curved paths */}
                  <path d="M 168,181 C 188,181 188,112 202,112" fill="none" stroke="#c4b5fd" strokeWidth="2" />
                  <path d="M 168,181 C 186,181 186,158 202,158" fill="none" stroke="#c4b5fd" strokeWidth="2" />
                  <path d="M 168,181 C 186,181 186,205 202,205" fill="none" stroke="#c4b5fd" strokeWidth="2" />
                  <path d="M 168,181 C 188,181 188,252 202,252" fill="none" stroke="#c4b5fd" strokeWidth="2" />

                  {/* Sub-query box 1 — Definition intent */}
                  <rect x="202" y="92" width="250" height="40" rx="7" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
                  <text x="216" y="108" fontSize="10" fontWeight="600" fill="#5b21b6">Definition &amp; context</text>
                  <text x="216" y="122" fontSize="9" fill="#7c3aed">"What is AI content optimization?"</text>
                  <rect x="386" y="99" width="60" height="18" rx="4" fill="#dbeafe" />
                  <text x="416" y="111" fontSize="8.5" fill="#1d4ed8" textAnchor="middle">Website</text>

                  {/* Sub-query box 2 — Research intent */}
                  <rect x="202" y="139" width="250" height="40" rx="7" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
                  <text x="216" y="155" fontSize="10" fontWeight="600" fill="#5b21b6">Research &amp; data</text>
                  <text x="216" y="169" fontSize="9" fill="#7c3aed">"AI citation statistics 2025"</text>
                  <rect x="368" y="146" width="78" height="18" rx="4" fill="#d1fae5" />
                  <text x="407" y="158" fontSize="8.5" fill="#065f46" textAnchor="middle">Publications</text>

                  {/* Sub-query box 3 — Community intent */}
                  <rect x="202" y="186" width="250" height="40" rx="7" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
                  <text x="216" y="202" fontSize="10" fontWeight="600" fill="#5b21b6">Community sentiment</text>
                  <text x="216" y="216" fontSize="9" fill="#7c3aed">"best B2B content for AI visibility"</text>
                  <rect x="378" y="193" width="68" height="18" rx="4" fill="#fee2e2" />
                  <text x="412" y="205" fontSize="8.5" fill="#991b1b" textAnchor="middle">Reddit / HN</text>

                  {/* Sub-query box 4 — Comparison intent */}
                  <rect x="202" y="233" width="250" height="40" rx="7" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
                  <text x="216" y="249" fontSize="10" fontWeight="600" fill="#5b21b6">Product comparisons</text>
                  <text x="216" y="263" fontSize="9" fill="#7c3aed">"content tools for GEO optimization"</text>
                  <rect x="376" y="240" width="70" height="18" rx="4" fill="#fef3c7" />
                  <text x="411" y="252" fontSize="8.5" fill="#92400e" textAnchor="middle">G2 / Reviews</text>

                  {/* Convergence arrows */}
                  <path d="M 452,112 C 500,112 510,181 562,181" fill="none" stroke="#c4b5fd" strokeWidth="2" />
                  <path d="M 452,159 C 505,159 510,181 562,181" fill="none" stroke="#c4b5fd" strokeWidth="2" />
                  <path d="M 452,206 C 505,206 510,181 562,181" fill="none" stroke="#c4b5fd" strokeWidth="2" />
                  <path d="M 452,253 C 500,253 510,181 562,181" fill="none" stroke="#c4b5fd" strokeWidth="2" />
                  {/* Arrowhead */}
                  <polygon points="562,177 555,173 555,185" fill="#7c3aed" />

                  {/* Synthesis box */}
                  <rect x="562" y="147" width="210" height="68" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
                  <text x="667" y="172" fontSize="11" fontWeight="700" fill="#065f46" textAnchor="middle">Synthesized Answer</text>
                  <text x="667" y="189" fontSize="9.5" fill="#059669" textAnchor="middle">One coherent response</text>
                  <text x="667" y="205" fontSize="9" fill="#6b7280" textAnchor="middle">drawing from all sources</text>

                  {/* Key insight callout at bottom */}
                  <rect x="30" y="308" width="740" height="44" rx="8" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1" />
                  <text x="400" y="326" fontSize="10.5" fill="#92400e" textAnchor="middle" fontWeight="600">
                    Citation and influence are decoupled — content shapes AI answers even without appearing as a cited source.
                  </text>
                  <text x="400" y="343" fontSize="9.5" fill="#b45309" textAnchor="middle">
                    Pages with strong semantic alignment influence tone, framing, and language of the final response invisibly.
                  </text>
                </svg>
                <p className="text-xs text-center text-gray-400 mt-2">
                  Query fan-out mechanism described by Elizabeth Reid, Head of Search at Google, Google I/O 2025.
                </p>
              </div>

              <p className="mb-6">
                Tracking which of your pages are actually being retrieved — and from which sections — requires
                visibility into AI-generated answers that traditional analytics cannot provide.{' '}
                <Link href="/features" className="text-blue-600 hover:text-blue-800 underline">GeoRankers monitors this automatically</Link>{' '}
                across ChatGPT, Gemini, and Perplexity.
              </p>
              <p className="mb-6">
                The retrieval layer also behaves differently depending on whether the model is drawing from
                training data or performing a real-time web search. Models like Perplexity and ChatGPT's Browse
                mode actively search the web to construct answers, which means freshness matters in ways it never
                quite did for pure SEO. Research from Digitaloft found that URLs cited in AI results are on
                average 25.7% fresher than those appearing in traditional search results. If your content is not
                being regularly refreshed, it is competing against a structural disadvantage regardless of its
                original quality.
              </p>
              <p className="mb-6">
                The model's selection process also operates semantically rather than purely through keywords.
                What an AI retrieves and cites depends on how closely the content's meaning aligns with the
                user's query in embedding space. Two pieces of content with similar words can be treated very
                differently depending on how precisely they address the underlying intent. A well-optimized page
                that contains the right keywords but answers a slightly different question than the one being
                asked will consistently underperform against a less-trafficked page that actually solves the
                problem directly.
              </p>
            </section>

            {/* ── Section 2: Extractable Assertions ────────────────────────── */}
            <section id="extractable-assertions" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Fundamental Unit of AI-Optimized Content: The Extractable Assertion</h2>
              <p className="mb-6">
                This is where most guidance on writing for AI search gets the framing wrong. The conversation
                tends to default to page-level strategies: optimize your H1, add schema markup, publish
                long-form content. All of that matters, but none of it addresses the core change in how AI
                systems actually extract value from content.
              </p>
              <p className="mb-6 font-semibold text-gray-900 text-lg">
                The fundamental unit of content in AI search is not the page. It is the extractable assertion.
              </p>
              <p className="mb-6">
                Every answer that an AI produces is assembled from passages it can lift, attribute with
                confidence, and synthesize with other passages. A section that only makes sense in the context
                of the full article is nearly useless to a model that never reads the full article as a human
                would. A paragraph that answers a specific question completely, with enough context to stand
                alone, is exactly what a retrieval system can use.
              </p>
              <p className="mb-4">
                Research data reinforces this point with unusual precision. An analysis by Growth Memo found a
                clear distribution in where AI citations actually come from within a piece of content:
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="text-left p-3 border border-gray-200 font-semibold">Content Position</th>
                      <th className="text-left p-3 border border-gray-200 font-semibold text-blue-700">Share of AI Citations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="p-3 border border-gray-200 font-medium">First 30% of the article</td>
                      <td className="p-3 border border-gray-200 text-blue-700 font-semibold">44.2%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 border border-gray-200 font-medium">Middle 30–70%</td>
                      <td className="p-3 border border-gray-200 text-blue-700 font-semibold">31.1%</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 border border-gray-200 font-medium">Final 30%</td>
                      <td className="p-3 border border-gray-200 text-blue-700 font-semibold">24.7%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 -mt-6 mb-8">Source: Growth Memo citation position analysis</p>

              {/* ── Chart 3: Citation Position Bar Chart ──────────────────── */}
              <div className="my-8 not-prose">
                <svg
                  viewBox="0 0 800 268"
                  className="w-full h-auto rounded-xl border border-gray-100 shadow-sm"
                  role="img"
                  aria-labelledby="ch3Title ch3Desc"
                >
                  <title id="ch3Title">Share of AI Citations by Content Position</title>
                  <desc id="ch3Desc">Horizontal bar chart showing that the first 30% of an article receives 44.2% of AI citations, the middle 30–70% receives 31.1%, and the final 30% receives only 24.7%, demonstrating the importance of front-loading key claims.</desc>
                  <defs>
                    <linearGradient id="ch3bar1" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                    <linearGradient id="ch3bar2" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                    <linearGradient id="ch3bar3" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#93c5fd" />
                      <stop offset="100%" stopColor="#c4b5fd" />
                    </linearGradient>
                  </defs>
                  <rect width="800" height="268" rx="12" fill="white" />

                  {/* Header */}
                  <text x="40" y="30" fontSize="15" fontWeight="700" fill="#111827">Where AI Citations Come From Within an Article</text>
                  <text x="40" y="49" fontSize="11" fill="#6b7280">Share of total AI citations by position in the content · Source: Growth Memo analysis</text>

                  {/* Y-axis label annotations */}
                  <text x="195" y="101" fontSize="10.5" fontWeight="600" fill="#374151" textAnchor="end">First 30% of article</text>
                  <text x="195" y="158" fontSize="10.5" fontWeight="600" fill="#374151" textAnchor="end">Middle 30–70%</text>
                  <text x="195" y="215" fontSize="10.5" fontWeight="600" fill="#374151" textAnchor="end">Final 30%</text>

                  {/* Subtitle under bar labels */}
                  <text x="195" y="114" fontSize="9" fill="#9ca3af" textAnchor="end">Introduction, hooks</text>
                  <text x="195" y="171" fontSize="9" fill="#9ca3af" textAnchor="end">Body sections</text>
                  <text x="195" y="228" fontSize="9" fill="#9ca3af" textAnchor="end">Conclusions</text>

                  {/* Bar chart area: x=205 to x=690 = 485px (100%) */}
                  {/* Bar 1: 44.2% → 485*0.442 = 214.4px */}
                  <rect x="205" y="82" width="214" height="38" rx="5" fill="url(#ch3bar1)" />
                  <text x="426" y="106" fontSize="18" fontWeight="800" fill="#1d4ed8">44.2%</text>

                  {/* Bar 2: 31.1% → 485*0.311 = 150.8px */}
                  <rect x="205" y="139" width="151" height="38" rx="5" fill="url(#ch3bar2)" />
                  <text x="363" y="163" fontSize="18" fontWeight="800" fill="#4f46e5">31.1%</text>

                  {/* Bar 3: 24.7% → 485*0.247 = 119.8px */}
                  <rect x="205" y="196" width="120" height="38" rx="5" fill="url(#ch3bar3)" />
                  <text x="332" y="220" fontSize="18" fontWeight="800" fill="#7c3aed">24.7%</text>

                  {/* Scale ticks at 0%, 25%, 50% */}
                  <line x1="205" y1="68" x2="205" y2="245" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="326" y1="68" x2="326" y2="245" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="448" y1="68" x2="448" y2="245" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="205" y="64" fontSize="9" fill="#9ca3af" textAnchor="middle">0%</text>
                  <text x="326" y="64" fontSize="9" fill="#9ca3af" textAnchor="middle">25%</text>
                  <text x="448" y="64" fontSize="9" fill="#9ca3af" textAnchor="middle">50%</text>

                  {/* Key insight callout on right */}
                  <rect x="575" y="90" width="196" height="116" rx="8" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                  <text x="673" y="110" fontSize="10" fontWeight="700" fill="#1d4ed8" textAnchor="middle">Front-load your best claims</text>
                  <text x="673" y="128" fontSize="9.5" fill="#374151" textAnchor="middle">44.2% of all AI citations</text>
                  <text x="673" y="143" fontSize="9.5" fill="#374151" textAnchor="middle">come from the opening third.</text>
                  <text x="673" y="162" fontSize="9" fill="#6b7280" textAnchor="middle">Introductions should contain</text>
                  <text x="673" y="176" fontSize="9" fill="#6b7280" textAnchor="middle">at least one specific, verifiable</text>
                  <text x="673" y="190" fontSize="9" fill="#6b7280" textAnchor="middle">assertion — not scene-setting.</text>
                </svg>
                <p className="text-xs text-center text-gray-400 mt-2">
                  Citation position distribution based on Growth Memo analysis of AI-generated responses across ChatGPT, Perplexity, and Gemini.
                </p>
              </div>

              <p className="mb-6">
                This distribution is not accidental. It reflects the fact that well-written content front-loads
                its most direct, citable claims and that AI systems are not patient readers waiting for the
                conclusion to arrive. If your most specific, quotable point is buried in paragraph eight, the
                model may never reach it — or may reach it with less retrieval weight than the vaguer claims
                that appeared earlier.
              </p>
              <p className="mb-6">
                This has real structural implications. Introductions should not be scene-setting exercises that
                eventually get to the point. They should contain at least one specific, verifiable assertion
                that a model can extract without needing the surrounding context to understand it. Each
                subheading should function as a self-contained answer to a question that someone might actually
                ask, because AI systems often retrieve at the section level rather than the page level. And
                every factual claim should be specific enough that it could survive outside the sentence it
                inhabits.
              </p>
            </section>

            {/* ── Section 3: Specificity ────────────────────────────────────── */}
            <section id="specificity-citation" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How Specificity Becomes Citation Gravity</h2>
              <p className="mb-6">
                The most consistent finding across AI citation research is that specific, data-backed content is
                cited significantly more often than general or opinion-based content — and the magnitude of the
                difference is large enough to treat as a genuine strategic signal.
              </p>
              <p className="mb-6">
                Research on GEO strategies, including foundational work by Aggarwal et al. that benchmarked
                multiple optimization approaches, found that GEO-specific techniques could boost content
                visibility within AI-generated responses by up to 40%. Content that reads as though it has been
                carefully evidenced performs better across AI platforms than content that makes the same claims
                without substantiation — not because AI systems run fact-checks on every sentence, but because
                the linguistic patterns associated with evidenced writing correlate with the training data those
                models consider reliable.
              </p>
              <p className="mb-4 font-medium text-gray-800">The specificity signals that move the needle most are:</p>
              <ul className="mb-8 space-y-3">
                <li><strong>Named statistics with sourced attribution</strong> — adding statistics to content increases AI visibility by 22% (Aggarwal et al.)</li>
                <li><strong>Direct quotations from named sources</strong> — increases AI citation rates by 37% compared to unattributed claims</li>
                <li><strong>Named tools, vendors, and use cases</strong> — generic category descriptions have lower retrieval weight than content that names specific products and outcomes</li>
                <li><strong>Institutional framing</strong> — "A 2025 analysis by BrightEdge" reads differently to a retrieval system than "studies show"</li>
              </ul>

              {/* ── Chart 4: Specificity Impact ───────────────────────────── */}
              <div className="my-8 not-prose">
                <svg
                  viewBox="0 0 800 310"
                  className="w-full h-auto rounded-xl border border-gray-100 shadow-sm"
                  role="img"
                  aria-labelledby="ch4Title ch4Desc"
                >
                  <title id="ch4Title">The Specificity Gap: What AI Retrieves vs. What It Ignores</title>
                  <desc id="ch4Desc">Side-by-side comparison showing three generic, vague claims on the left that AI models ignore, versus three specific, data-backed claims on the right that earn citations. Specific claims with named sources and exact numbers increase AI citation rates by 22–37%.</desc>
                  <rect width="800" height="310" rx="12" fill="white" />

                  {/* Header */}
                  <text x="400" y="30" fontSize="15" fontWeight="700" fill="#111827" textAnchor="middle">The Specificity Gap: What AI Retrieves vs. What It Ignores</text>
                  <text x="400" y="49" fontSize="11" fill="#6b7280" textAnchor="middle">Adding named statistics increases AI visibility 22%; direct quotes from named sources increase citation rates 37% · Aggarwal et al., 2024</text>

                  {/* ── Left panel: NOT citable ── */}
                  <rect x="20" y="62" width="368" height="222" rx="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
                  {/* Panel header */}
                  <rect x="20" y="62" width="368" height="38" rx="10" fill="#fee2e2" />
                  <rect x="20" y="82" width="368" height="18" fill="#fee2e2" />
                  <text x="34" y="86" fontSize="11" fontWeight="700" fill="#991b1b">✗  Weak Claims — Low Retrieval Probability</text>

                  {/* Claim rows left */}
                  <rect x="34" y="114" width="340" height="44" rx="6" fill="white" stroke="#fca5a5" strokeWidth="1" />
                  <text x="46" y="131" fontSize="9.5" fill="#6b7280">Research shows that buyers increasingly</text>
                  <text x="46" y="146" fontSize="9.5" fill="#6b7280">use AI tools for research.</text>

                  <rect x="34" y="168" width="340" height="44" rx="6" fill="white" stroke="#fca5a5" strokeWidth="1" />
                  <text x="46" y="185" fontSize="9.5" fill="#6b7280">Content with data tends to perform better</text>
                  <text x="46" y="200" fontSize="9.5" fill="#6b7280">in AI search results.</text>

                  <rect x="34" y="222" width="340" height="44" rx="6" fill="white" stroke="#fca5a5" strokeWidth="1" />
                  <text x="46" y="239" fontSize="9.5" fill="#6b7280">Page speed can sometimes affect how AI</text>
                  <text x="46" y="254" fontSize="9.5" fill="#6b7280">models retrieve and cite content.</text>

                  {/* ── Right panel: Citable ── */}
                  <rect x="412" y="62" width="368" height="222" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
                  {/* Panel header */}
                  <rect x="412" y="62" width="368" height="38" rx="10" fill="#dcfce7" />
                  <rect x="412" y="82" width="368" height="18" fill="#dcfce7" />
                  <text x="426" y="86" fontSize="11" fontWeight="700" fill="#166534">✓  Specific Claims — High Citation Probability</text>

                  {/* Claim rows right */}
                  <rect x="426" y="114" width="340" height="44" rx="6" fill="white" stroke="#86efac" strokeWidth="1" />
                  <text x="438" y="131" fontSize="9.5" fill="#374151">"68% of B2B buyers begin research on AI</text>
                  <text x="438" y="146" fontSize="9.5" fill="#374151">platforms before visiting a vendor site (BrightEdge, 2025)."</text>

                  <rect x="426" y="168" width="340" height="44" rx="6" fill="white" stroke="#86efac" strokeWidth="1" />
                  <text x="438" y="185" fontSize="9.5" fill="#374151">"Adding statistics to content increases AI</text>
                  <text x="438" y="200" fontSize="9.5" fill="#374151">visibility by 22% (Aggarwal et al., 2024)."</text>

                  <rect x="426" y="222" width="340" height="44" rx="6" fill="white" stroke="#86efac" strokeWidth="1" />
                  <text x="438" y="239" fontSize="9.5" fill="#374151">"Sites with FCP under 0.4s average 6.7 AI</text>
                  <text x="438" y="254" fontSize="9.5" fill="#374151">citations; slower sites average only 2.1 (SE Ranking, 2025)."</text>

                  {/* Impact stats between panels */}
                  <rect x="372" y="125" width="56" height="22" rx="5" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
                  <text x="400" y="140" fontSize="9" fill="#1d4ed8" textAnchor="middle" fontWeight="600">+22% ↑</text>
                  <rect x="372" y="179" width="56" height="22" rx="5" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
                  <text x="400" y="194" fontSize="9" fill="#1d4ed8" textAnchor="middle" fontWeight="600">+37% ↑</text>
                  <rect x="372" y="233" width="56" height="22" rx="5" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
                  <text x="400" y="248" fontSize="9" fill="#1d4ed8" textAnchor="middle" fontWeight="600">3x gap</text>
                </svg>
                <p className="text-xs text-center text-gray-400 mt-2">
                  Citation uplift data from Aggarwal et al. (2024) GEO study and SE Ranking 2025 page-speed citation analysis.
                </p>
              </div>

              <p className="mb-6">
                There is also a less obvious specificity requirement that many content teams miss, which concerns
                how narrowly a piece of content defines its own scope. Generic content that describes how a
                category works without addressing a specific buyer situation has lower retrievability because it
                offers less semantic distinctiveness. When a model is assembling an answer about project
                management tools for remote engineering teams, it is looking for content that speaks to that
                exact context — not content about project management in general. The more specifically a piece
                of content addresses the precise situation of the buyer, the higher its extraction weight
                becomes.
              </p>
              <p className="mb-6">
                This is one reason why narrow, specific content often outperforms broad definitional guides in
                AI search, even though the definitional guide would typically rank better in traditional SEO. A
                1,200-word piece that answers one precise question with verifiable data and named examples is
                structurally better suited to AI citation than a 4,000-word guide that attempts to cover an
                entire topic at moderate depth throughout.
              </p>
            </section>

            {/* ── CTA 2 ────────────────────────────────────────────────────── */}
            <div className="my-12 bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20 rounded-2xl p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">See Which of Your Pages Are Being Cited by AI</h3>
              <p className="text-gray-600 mb-6">GeoRankers shows you which content earns citations — and which sections AI models are actually pulling from.</p>
              <a href="https://dashboard.georankers.co/register" className="inline-flex items-center gradient-cta hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg no-underline">
                <Rocket className="w-4 h-4 mr-2" />
                Get Started Free
              </a>
            </div>

            {/* ── Section 4: Authority Signals ─────────────────────────────── */}
            <section id="authority-signals" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Authority Signals That AI Reads Differently</h2>
              <p className="mb-6">
                One of the more counterintuitive findings in recent AI visibility research concerns the role of
                backlinks, which have been the defining authority signal in traditional SEO for decades. In AI
                search, backlink profiles still matter as a general proxy for domain credibility, but they are
                no longer the strongest predictor of whether a brand appears in AI-generated answers.
              </p>
              <p className="mb-6">
                Research analyzing how AI systems select sources found that <strong>brand search volume has a higher
                correlation with LLM citations (0.334 correlation) than traditional backlink strength</strong>. This
                makes sense when you consider how large language models learn: during training, they absorb
                patterns from a massive range of content, and brands that are frequently named, searched, and
                discussed across many independent sources naturally accumulate a stronger associative identity
                within the model's understanding of a category.
              </p>
              <p className="mb-6">
                Multi-platform presence functions as an extension of this logic. <strong>Brands appearing on four or
                more platforms are 2.8x more likely to appear in ChatGPT responses</strong> than brands concentrated
                on a single platform, according to citation research. A company discussed on G2, mentioned in a
                Reddit thread, cited in a Hacker News comment, and covered in Search Engine Journal is building
                a much denser associative network in the model's understanding than a company whose presence is
                limited to its own website.
              </p>
              <p className="mb-4">The platform-specific data surfaces some non-obvious priorities:</p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-3 border border-gray-200 font-semibold">Platform</th>
                      <th className="text-left p-3 border border-gray-200 font-semibold">Citation Share</th>
                      <th className="text-left p-3 border border-gray-200 font-semibold">Why It Matters</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Wikipedia', '7.8% of ChatGPT citations', 'Most cited single source; signals encyclopedic authority'],
                      ['Reddit', '6.6% of Perplexity citations', 'Community trust signal; hard to manufacture'],
                      ['G2 / Capterra / Trustpilot', '3x higher ChatGPT citation rate for brands present', 'Review presence treated as credibility confirmation'],
                      ['Community platforms (Quora, Reddit)', '4x higher citation rates for active brands', 'AI systems weight repeated candid mentions'],
                      ['Referring domains (32K+)', '3.5x more likely to be cited by ChatGPT', 'Domain authority still matters, just differently'],
                    ].map(([platform, share, why], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 border border-gray-200 font-medium text-gray-700">{platform}</td>
                        <td className="p-3 border border-gray-200 text-blue-700 font-semibold">{share}</td>
                        <td className="p-3 border border-gray-200 text-gray-600">{why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── Chart 5: Brand Signal Map ─────────────────────────────── */}
              <div className="my-8 not-prose">
                <svg
                  viewBox="0 0 800 380"
                  className="w-full h-auto rounded-xl border border-gray-100 shadow-sm"
                  role="img"
                  aria-labelledby="ch5Title ch5Desc"
                >
                  <title id="ch5Title">Multi-Platform Brand Signal Map</title>
                  <desc id="ch5Desc">Hub-and-spoke diagram showing a brand at the center connected to six platform nodes: Brand Website (52% Gemini citations), G2/Capterra (3x ChatGPT citation rate), Reddit/Hacker News (6.6% Perplexity), Publications (325% more AI citations when distributed), YouTube (prominent across all platforms), and Wikipedia (7.8% of ChatGPT citations). Brands on 4+ platforms are 2.8x more likely to appear in ChatGPT responses.</desc>
                  <defs>
                    <radialGradient id="ch5center" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </radialGradient>
                  </defs>
                  <rect width="800" height="380" rx="12" fill="white" />

                  {/* Header */}
                  <text x="400" y="30" fontSize="15" fontWeight="700" fill="#111827" textAnchor="middle">Multi-Platform Brand Signal Map</text>
                  <text x="400" y="49" fontSize="11" fill="#6b7280" textAnchor="middle">Brands on 4+ platforms are 2.8x more likely to appear in ChatGPT responses than single-platform brands</text>

                  {/* Spoke lines from center (400, 210) to each node */}
                  {/* Website top: (400, 95) */}
                  <line x1="400" y1="178" x2="400" y2="115" stroke="#e5e7eb" strokeWidth="2" />
                  {/* G2 top-right: (504, 155) */}
                  <line x1="424" y1="193" x2="488" y2="162" stroke="#e5e7eb" strokeWidth="2" />
                  {/* Reddit bottom-right: (504, 265) */}
                  <line x1="424" y1="227" x2="488" y2="258" stroke="#e5e7eb" strokeWidth="2" />
                  {/* Publications bottom: (400, 325) */}
                  <line x1="400" y1="242" x2="400" y2="305" stroke="#e5e7eb" strokeWidth="2" />
                  {/* YouTube bottom-left: (296, 265) */}
                  <line x1="376" y1="227" x2="312" y2="258" stroke="#e5e7eb" strokeWidth="2" />
                  {/* Wikipedia top-left: (296, 155) */}
                  <line x1="376" y1="193" x2="312" y2="162" stroke="#e5e7eb" strokeWidth="2" />

                  {/* ── Center circle ── */}
                  <circle cx="400" cy="210" r="58" fill="url(#ch5center)" />
                  <text x="400" y="204" fontSize="13" fontWeight="700" fill="white" textAnchor="middle">Your Brand</text>
                  <text x="400" y="220" fontSize="9.5" fill="rgba(255,255,255,0.85)" textAnchor="middle">in LLM training data</text>
                  <text x="400" y="234" fontSize="9" fill="rgba(255,255,255,0.7)" textAnchor="middle">&amp; live retrieval</text>

                  {/* ── Node: Brand Website (top) ── */}
                  <rect x="336" y="72" width="128" height="43" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
                  <text x="400" y="89" fontSize="10" fontWeight="700" fill="#1d4ed8" textAnchor="middle">Brand Website</text>
                  <text x="400" y="105" fontSize="9" fill="#3b82f6" textAnchor="middle">52% of Gemini citations</text>

                  {/* ── Node: G2/Capterra (top-right) ── */}
                  <rect x="490" y="138" width="128" height="43" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
                  <text x="554" y="155" fontSize="10" fontWeight="700" fill="#065f46" textAnchor="middle">G2 / Capterra</text>
                  <text x="554" y="171" fontSize="9" fill="#059669" textAnchor="middle">3x ChatGPT citation rate</text>

                  {/* ── Node: Reddit/HN (bottom-right) ── */}
                  <rect x="490" y="240" width="128" height="43" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="554" y="257" fontSize="10" fontWeight="700" fill="#991b1b" textAnchor="middle">Reddit / HN</text>
                  <text x="554" y="273" fontSize="9" fill="#dc2626" textAnchor="middle">6.6% of Perplexity cites</text>

                  {/* ── Node: Publications (bottom) ── */}
                  <rect x="336" y="308" width="128" height="43" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
                  <text x="400" y="325" fontSize="10" fontWeight="700" fill="#5b21b6" textAnchor="middle">Publications</text>
                  <text x="400" y="341" fontSize="9" fill="#7c3aed" textAnchor="middle">+325% more AI citations</text>

                  {/* ── Node: YouTube (bottom-left) ── */}
                  <rect x="182" y="240" width="128" height="43" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="246" y="257" fontSize="10" fontWeight="700" fill="#92400e" textAnchor="middle">YouTube</text>
                  <text x="246" y="273" fontSize="9" fill="#b45309" textAnchor="middle">All major AI platforms</text>

                  {/* ── Node: Wikipedia (top-left) ── */}
                  <rect x="182" y="138" width="128" height="43" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
                  <text x="246" y="155" fontSize="10" fontWeight="700" fill="#166534" textAnchor="middle">Wikipedia</text>
                  <text x="246" y="171" fontSize="9" fill="#16a34a" textAnchor="middle">7.8% of ChatGPT cites</text>

                  {/* 2.8x callout */}
                  <rect x="620" y="175" width="158" height="60" rx="8" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                  <text x="699" y="197" fontSize="20" fontWeight="800" fill="#1d4ed8" textAnchor="middle">2.8×</text>
                  <text x="699" y="213" fontSize="9.5" fill="#3b82f6" textAnchor="middle">more likely in ChatGPT</text>
                  <text x="699" y="227" fontSize="9.5" fill="#3b82f6" textAnchor="middle">on 4+ platforms</text>
                </svg>
                <p className="text-xs text-center text-gray-400 mt-2">
                  Platform citation share data sourced from Digitaloft 2025, BrightEdge, and multi-platform citation research. Wikipedia and Reddit figures from ChatGPT and Perplexity citation analysis respectively.
                </p>
              </div>

              <p className="mb-6">
                The signal that matters is consistent, honest representation across the surfaces where your
                buyers actually talk about problems and solutions. For most B2B SaaS companies, that means
                ensuring a presence on the platforms where practitioners compare tools, share experiences, and
                make recommendations to peers — because those are precisely the conversations that AI systems
                have absorbed and continue to absorb in shaping their answers.
              </p>
            </section>

            {/* ── Section 5: Platform Differences ──────────────────────────── */}
            <section id="platform-differences" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How Different AI Platforms Actually Cite</h2>
              <p className="mb-6">
                Not all AI platforms retrieve and cite content in the same way. The divergence is more
                pronounced than most teams expect, and the cross-platform overlap is low enough that a presence
                in one does not reliably translate to the other. <strong>Only 11% of domains are cited by both
                ChatGPT and Perplexity</strong>, according to citation research.
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 border border-gray-200 font-semibold text-left w-36"></th>
                      <th className="p-3 border border-gray-200 font-semibold text-blue-700">Gemini</th>
                      <th className="p-3 border border-gray-200 font-semibold text-green-700">ChatGPT</th>
                      <th className="p-3 border border-gray-200 font-semibold text-purple-700">Perplexity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Primary citation source', 'Brand-owned websites (52.15% of citations)', 'Wikipedia, major publications, training data', 'Reddit, YouTube, review platforms'],
                      ['Sources per response', 'Fewer, higher authority', 'Selective, authority-biased', '3 to 8 per response, broader spread'],
                      ['Strongest signal', 'Structured website content, schema markup, complete GBP', 'Domain authority, referring domains (3.5x lift at 32K+ domains)', 'Community mentions, review presence, experiential content'],
                      ['Freshness sensitivity', 'Moderate', 'High (browse mode)', 'High'],
                      ['What works', 'Clean website architecture, FAQ pages, structured data', 'Long-established authority, Wikipedia presence, high-DA coverage', 'Honest community participation, G2 reviews, candid forum presence'],
                    ].map(([row, gemini, chatgpt, perplexity], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 border border-gray-200 font-semibold text-gray-700">{row}</td>
                        <td className="p-3 border border-gray-200 text-gray-600">{gemini}</td>
                        <td className="p-3 border border-gray-200 text-gray-600">{chatgpt}</td>
                        <td className="p-3 border border-gray-200 text-gray-600">{perplexity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── Chart 6: Platform Citation Comparison ─────────────────── */}
              <div className="my-8 not-prose">
                <svg
                  viewBox="0 0 800 368"
                  className="w-full h-auto rounded-xl border border-gray-100 shadow-sm"
                  role="img"
                  aria-labelledby="ch6Title ch6Desc"
                >
                  <title id="ch6Title">How Gemini, ChatGPT, and Perplexity Cite Differently</title>
                  <desc id="ch6Desc">Three-column comparison card showing that Gemini primarily cites brand-owned websites (52.15% of citations) and favors structured schema markup; ChatGPT favors Wikipedia, major publications, and high domain authority (3.5x lift at 32K+ referring domains); and Perplexity cites 3–8 sources per response with strong preference for Reddit, YouTube, and review platforms. Only 11% of domains are cited by both ChatGPT and Perplexity.</desc>
                  <rect width="800" height="368" rx="12" fill="white" />

                  {/* Header */}
                  <text x="400" y="30" fontSize="15" fontWeight="700" fill="#111827" textAnchor="middle">How Gemini, ChatGPT, and Perplexity Cite Differently</text>
                  <text x="400" y="49" fontSize="11" fill="#6b7280" textAnchor="middle">Only 11% of domains are cited by both ChatGPT and Perplexity — a presence in one does not transfer to the other</text>

                  {/* ── Column: Gemini ── x=22–274 */}
                  <rect x="22" y="62" width="252" height="284" rx="10" fill="#f0f9ff" stroke="#38bdf8" strokeWidth="1.5" />
                  {/* Gemini header bar */}
                  <rect x="22" y="62" width="252" height="44" rx="10" fill="#0ea5e9" />
                  <rect x="22" y="88" width="252" height="18" fill="#0ea5e9" />
                  <text x="148" y="90" fontSize="13" fontWeight="700" fill="white" textAnchor="middle">Gemini</text>
                  {/* Rows */}
                  <text x="34" y="126" fontSize="9.5" fontWeight="700" fill="#0369a1">Primary Sources</text>
                  <text x="34" y="141" fontSize="9.5" fill="#374151">Brand-owned websites</text>
                  <text x="34" y="155" fontSize="9.5" fill="#1d4ed8" fontWeight="600">52.15% of citations</text>
                  <line x1="34" y1="166" x2="262" y2="166" stroke="#e0f2fe" strokeWidth="1" />
                  <text x="34" y="182" fontSize="9.5" fontWeight="700" fill="#0369a1">Strongest Signal</text>
                  <text x="34" y="197" fontSize="9.5" fill="#374151">Schema markup + structured</text>
                  <text x="34" y="211" fontSize="9.5" fill="#374151">content + Google Business Profile</text>
                  <line x1="34" y1="222" x2="262" y2="222" stroke="#e0f2fe" strokeWidth="1" />
                  <text x="34" y="238" fontSize="9.5" fontWeight="700" fill="#0369a1">Freshness Sensitivity</text>
                  <rect x="34" y="245" width="52" height="18" rx="4" fill="#fef3c7" />
                  <text x="60" y="257" fontSize="9" fill="#92400e" textAnchor="middle" fontWeight="600">Moderate</text>
                  <line x1="34" y1="272" x2="262" y2="272" stroke="#e0f2fe" strokeWidth="1" />
                  <text x="34" y="288" fontSize="9.5" fontWeight="700" fill="#0369a1">What Works</text>
                  <text x="34" y="303" fontSize="9" fill="#374151">FAQ pages, answer-first structure,</text>
                  <text x="34" y="317" fontSize="9" fill="#374151">clean site architecture</text>

                  {/* ── Column: ChatGPT ── x=274–526 */}
                  <rect x="274" y="62" width="252" height="284" rx="10" fill="#f0fdf4" stroke="#4ade80" strokeWidth="1.5" />
                  <rect x="274" y="62" width="252" height="44" rx="10" fill="#16a34a" />
                  <rect x="274" y="88" width="252" height="18" fill="#16a34a" />
                  <text x="400" y="90" fontSize="13" fontWeight="700" fill="white" textAnchor="middle">ChatGPT</text>
                  <text x="286" y="126" fontSize="9.5" fontWeight="700" fill="#166534">Primary Sources</text>
                  <text x="286" y="141" fontSize="9.5" fill="#374151">Wikipedia, major publications,</text>
                  <text x="286" y="155" fontSize="9.5" fill="#374151">training data (no-browse mode)</text>
                  <line x1="286" y1="166" x2="514" y2="166" stroke="#dcfce7" strokeWidth="1" />
                  <text x="286" y="182" fontSize="9.5" fontWeight="700" fill="#166534">Strongest Signal</text>
                  <text x="286" y="197" fontSize="9.5" fill="#374151">Domain authority · referring domains</text>
                  <text x="286" y="211" fontSize="9.5" fill="#15803d" fontWeight="600">3.5x lift at 32K+ ref. domains</text>
                  <line x1="286" y1="222" x2="514" y2="222" stroke="#dcfce7" strokeWidth="1" />
                  <text x="286" y="238" fontSize="9.5" fontWeight="700" fill="#166534">Freshness Sensitivity</text>
                  <rect x="286" y="245" width="88" height="18" rx="4" fill="#fee2e2" />
                  <text x="330" y="257" fontSize="9" fill="#991b1b" textAnchor="middle" fontWeight="600">High (browse mode)</text>
                  <line x1="286" y1="272" x2="514" y2="272" stroke="#dcfce7" strokeWidth="1" />
                  <text x="286" y="288" fontSize="9.5" fontWeight="700" fill="#166534">What Works</text>
                  <text x="286" y="303" fontSize="9" fill="#374151">Long-established authority,</text>
                  <text x="286" y="317" fontSize="9" fill="#374151">Wikipedia presence, high-DA coverage</text>

                  {/* ── Column: Perplexity ── x=526–778 */}
                  <rect x="526" y="62" width="252" height="284" rx="10" fill="#faf5ff" stroke="#a78bfa" strokeWidth="1.5" />
                  <rect x="526" y="62" width="252" height="44" rx="10" fill="#7c3aed" />
                  <rect x="526" y="88" width="252" height="18" fill="#7c3aed" />
                  <text x="652" y="90" fontSize="13" fontWeight="700" fill="white" textAnchor="middle">Perplexity</text>
                  <text x="538" y="126" fontSize="9.5" fontWeight="700" fill="#5b21b6">Primary Sources</text>
                  <text x="538" y="141" fontSize="9.5" fill="#374151">Reddit, YouTube, review platforms</text>
                  <text x="538" y="155" fontSize="9.5" fill="#7c3aed" fontWeight="600">46.7% from Reddit (certain queries)</text>
                  <line x1="538" y1="166" x2="766" y2="166" stroke="#ede9fe" strokeWidth="1" />
                  <text x="538" y="182" fontSize="9.5" fontWeight="700" fill="#5b21b6">Strongest Signal</text>
                  <text x="538" y="197" fontSize="9.5" fill="#374151">Community mentions, review presence,</text>
                  <text x="538" y="211" fontSize="9.5" fill="#374151">experiential &amp; candid content</text>
                  <line x1="538" y1="222" x2="766" y2="222" stroke="#ede9fe" strokeWidth="1" />
                  <text x="538" y="238" fontSize="9.5" fontWeight="700" fill="#5b21b6">Freshness Sensitivity</text>
                  <rect x="538" y="245" width="38" height="18" rx="4" fill="#fee2e2" />
                  <text x="557" y="257" fontSize="9" fill="#991b1b" textAnchor="middle" fontWeight="600">High</text>
                  <text x="580" y="257" fontSize="9" fill="#374151">· 3–8 sources per response</text>
                  <line x1="538" y1="272" x2="766" y2="272" stroke="#ede9fe" strokeWidth="1" />
                  <text x="538" y="288" fontSize="9.5" fontWeight="700" fill="#5b21b6">What Works</text>
                  <text x="538" y="303" fontSize="9" fill="#374151">Honest forum participation, G2 reviews,</text>
                  <text x="538" y="317" fontSize="9" fill="#374151">candid community presence</text>

                  {/* 11% overlap callout at bottom */}
                  <rect x="240" y="356" width="320" height="0" rx="6" fill="#fffbeb" />
                </svg>
                <p className="text-xs text-center text-gray-400 mt-2">
                  Platform citation behavior sourced from Digitaloft 2025, BrightEdge, and cross-platform citation overlap research. Only 11% of domains appear in both ChatGPT and Perplexity results.
                </p>
              </div>

              <p className="mb-6">
                Gemini behaves most similarly to a traditional search engine, drawing the majority of its
                citations from brand-owned websites. If your website clearly answers the questions your buyers
                ask, with properly structured HTML and semantic markup, Gemini is most likely to surface that
                content. For a tactical breakdown of optimizing specifically for Google's AI systems, see{' '}
                <a href="https://blog.georankers.ai/how-to-optimize-content-for-ai-overviews-aio-in-2026/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">How to Optimize Content for Google AI Overviews</a>.
              </p>
              <p className="mb-6">
                ChatGPT's approach is considerably different. When operating without its browse function, it
                draws on training data and tends to favor sources with long-established authority. When
                browsing, it cites sources that match the specific query intent but still maintains a
                significant bias toward domains with substantial referring domain counts.
              </p>
              <p className="mb-6">
                Perplexity functions as the most source-diverse of the major platforms, typically citing between
                three and eight sources per response and showing a pronounced preference for
                community-driven and experiential content. For B2B brands, this means Perplexity responses
                about your category are heavily shaped by what practitioners are actually saying about you in
                public forums — a much harder surface to influence through traditional content production.
              </p>
              <p className="mb-6">
                The practical implication is that content and authority-building strategies need to be designed
                with awareness of which platforms your buyers are actually using. A strategy that only optimizes
                for Gemini will systematically underperform on Perplexity and vice versa.
              </p>
            </section>

            {/* ── Section 6: Structure ─────────────────────────────────────── */}
            <section id="structure-retrieval" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Structure as a Retrieval Signal</h2>
              <p className="mb-6">
                The way content is structured functions as a retrieval signal in ways that go beyond standard
                readability advice. AI systems do not read pages from top to bottom the way a thoughtful human
                would and then form an overall judgment. They retrieve passages that match specific semantic
                requirements, which means the architecture of a piece of content determines which parts of it
                become citable.
              </p>
              <p className="mb-4 font-medium text-gray-800">The structural principles that most directly affect AI citation rates, in order of impact:</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Heading architecture</h3>
              <ul className="mb-6 space-y-2">
                <li>Every major heading should function as a standalone question or a clear statement of what the section answers</li>
                <li>Vague or clever headings that require reading the content beneath them are harder for retrieval systems to classify</li>
                <li>"The Role of Community Signals in AI Citation" is more useful as a retrieval anchor than "Going Beyond the Algorithm"</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Opening sentence priority</h3>
              <ul className="mb-6 space-y-2">
                <li>The first sentence of each section is the highest-value sentence for AI citation purposes</li>
                <li>Models often use the opening sentence to determine section relevance, with subsequent sentences providing context</li>
                <li>The direct claim comes first; nuance and qualification follow it, not the reverse</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tables and structured comparisons</h3>
              <ul className="mb-6 space-y-2">
                <li><strong>Tables increase citation rates 2.5x compared to unstructured text</strong> covering the same information (Onely, 2025)</li>
                <li>Listicle formats account for 50% of top AI citations, though pure list content often sacrifices the analytical depth that earns credibility</li>
                <li>Key findings and comparisons should be given structural expression rather than remaining embedded only in prose</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">FAQ sections</h3>
              <ul className="mb-6 space-y-2">
                <li>A clearly structured FAQ that directly addresses a specific question without requiring surrounding context is one of the fastest paths from content to citation</li>
                <li>The question-and-answer format maps directly onto the query intent structure that retrieval systems are built around</li>
                <li>FAQ schema markup amplifies this further, making the structure machine-readable at the markup level</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical accessibility</h3>
              <ul className="mb-6 space-y-2">
                <li>ChatGPT's user-agent bot does not render JavaScript, meaning pages relying on client-side rendering are effectively invisible to it</li>
                <li>Pre-rendered HTML is a basic crawlability requirement, not an optional enhancement</li>
                <li><strong>Pages with first contentful paint under 0.4 seconds average 6.7 citations; pages above 1.13 seconds average only 2.1</strong> — a threefold gap (SE Ranking, 2025)</li>
                <li>Products with comprehensive schema markup appear in AI recommendations 3 to 5x more frequently than those without it</li>
              </ul>
            </section>

            {/* ── Section 7: Freshness ─────────────────────────────────────── */}
            <section id="freshness-problem" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Freshness Problem Most Brands Are Ignoring</h2>
              <p className="mb-6">
                Content freshness matters differently in AI search than it did in traditional SEO, and the
                magnitude of the effect suggests that most brands are underinvesting in content maintenance
                relative to content creation.
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-3 border border-gray-200 font-semibold">Freshness Signal</th>
                      <th className="text-left p-3 border border-gray-200 font-semibold">Data Point</th>
                      <th className="text-left p-3 border border-gray-200 font-semibold">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['ChatGPT most-cited pages updated', 'Within last 30 days (76.4%)', 'Digitaloft, 2025'],
                      ['AI Overview citations from last 2 years', '85% of citations', 'Seer Interactive, 2025'],
                      ['AI Overview citations from current year', '44% of citations', 'Seer Interactive, 2025'],
                      ['AI bot traffic targeting', 'Content from last 12 months (65%)', 'Multiple studies'],
                      ['Average AI result freshness vs. traditional', '25.7% fresher', 'Digitaloft, 2025'],
                    ].map(([signal, data, source], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 border border-gray-200 font-medium text-gray-700">{signal}</td>
                        <td className="p-3 border border-gray-200 text-blue-700 font-semibold">{data}</td>
                        <td className="p-3 border border-gray-200 text-gray-500 text-xs">{source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mb-6">
                In a traditional SEO model, a strong piece of content published three years ago and left
                unchanged could continue compounding authority indefinitely through its backlink profile. In AI
                search, that same piece of content is competing with a structural freshness disadvantage that
                accumulates over time, regardless of how many links it has earned.
              </p>
              <p className="mb-6">
                This does not mean old content should be abandoned. It means that a publishing strategy focused
                only on creating new pieces while leaving existing ones static is likely misallocating its
                investment. Updating the most strategically important pieces to reflect current data, current
                examples, and current positioning is now at least as valuable as producing new content — and in
                many cases more so, because the updated piece preserves whatever authority the original had
                accumulated while resetting its freshness signal.
              </p>
              <p className="mb-6">
                The nature of what constitutes a meaningful update matters. Changing a publication date without
                meaningfully revising the content is detectable and counterproductive. What resets the freshness
                signal is updating the data, replacing outdated examples with current ones, adding new sections
                that address questions which have become relevant since the original publication, and revising
                claims that are no longer accurate.
              </p>
            </section>

            {/* ── CTA 3 ────────────────────────────────────────────────────── */}
            <div className="my-12 bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20 rounded-2xl p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Audit Your Content for AI Citation Readiness</h3>
              <p className="text-gray-600 mb-6">Run a free GEO Content Audit on any page — see how well it's structured for AI extraction, what's missing, and exactly what to fix first.</p>
              <Link href="/free-geo-tools/geo-audit" className="inline-flex items-center gradient-cta hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg no-underline">
                <Rocket className="w-4 h-4 mr-2" />
                Run a Free GEO Content Audit
              </Link>
            </div>

            {/* ── Section 8: Citable Sentences ─────────────────────────────── */}
            <section id="citable-sentences" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Writing the Sentence That Gets Cited</h2>
              <p className="mb-6">
                Everything discussed so far about structure, authority, and freshness ultimately converges at
                the level of the individual sentence, because that is the unit at which AI systems most often
                extract information. A page optimized at the domain level, with perfect schema markup and an
                excellent backlink profile, can still produce no AI citations if the sentences within it are
                too vague, too hedged, or too dependent on context to be extracted independently.
              </p>
              <p className="mb-6">
                There is a useful mental discipline for writing AI-citable sentences: after writing any factual
                claim, ask whether someone reading only that sentence would understand what it means, why it
                matters, and what it is based on. If the sentence requires the surrounding paragraph to make
                sense, it is not extractable.
              </p>
              <p className="mb-4 font-medium text-gray-800">The characteristics of sentences that consistently earn AI citations versus those that do not:</p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-3 border border-gray-200 font-semibold text-green-700">Citable</th>
                      <th className="text-left p-3 border border-gray-200 font-semibold text-red-600">Not Citable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        '"A 2025 BrightEdge study found that 68% of B2B buyers begin research on AI platforms before visiting a vendor site."',
                        '"Research shows that buyers increasingly use AI tools."',
                      ],
                      [
                        '"Adding statistics to content increases AI visibility by 22% (Aggarwal et al., 2024)."',
                        '"Content with data tends to perform better in AI search."',
                      ],
                      [
                        '"Perplexity cites between 3 and 8 sources per response, with 46.7% of top citations coming from Reddit."',
                        '"Perplexity uses community sources more than other platforms."',
                      ],
                      [
                        '"Sites with FCP under 0.4 seconds average 6.7 AI citations; slower sites average only 2.1."',
                        '"Page speed can affect AI citation rates."',
                      ],
                    ].map(([citable, notCitable], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 border border-gray-200 text-gray-700 text-xs leading-relaxed">{citable}</td>
                        <td className="p-3 border border-gray-200 text-gray-500 text-xs leading-relaxed italic">{notCitable}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mb-6">
                The pattern is consistent: direct claim, named source, specific number, no hedging. Phrases like
                "it can sometimes be the case" or "there may be reasons to consider" add no information and
                signal to a retrieval system that this is not a reliable anchor for an answer.
              </p>
              <p className="mb-6">
                The attribution pattern deserves specific attention because it works as a trust signal in both
                directions. When content attributes its data to named sources, it signals to AI systems that the
                claims are grounded rather than speculative, which increases extraction confidence. The Google
                E-E-A-T framework (Experience, Expertise, Authority, Trustworthiness) maps surprisingly well
                onto what AI systems appear to be looking for when selecting sources, which argues for making
                authorship explicit and biographical — surfacing the author's specific experience with the topic
                in a way that is visible to both human readers and machine retrieval systems.
              </p>
            </section>

            {/* ── Section 9: Multi-Surface ─────────────────────────────────── */}
            <section id="multi-surface" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Multi-Surface Content Strategy: Beyond the Blog</h2>
              <p className="mb-6">
                The single most underappreciated shift in AI content strategy is that the blog post or website
                page is no longer the only surface that matters for building AI visibility — and in some
                categories it is not even the primary one.
              </p>
              <p className="mb-6">
                Research on where AI models actually cite content reveals a distribution that should challenge
                any team treating their website as the sole source of brand representation in AI answers.
                Wikipedia is the most cited individual source in ChatGPT responses. Reddit drives a substantial
                portion of Perplexity's citations. YouTube appears prominently in AI answers across multiple
                platforms. And for certain query types, platforms like G2, Capterra, and Trustpilot function as
                the primary trust layer that AI systems draw on when forming recommendations.
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-3 border border-gray-200 font-semibold">Surface</th>
                      <th className="text-left p-3 border border-gray-200 font-semibold">Why AI Systems Draw From It</th>
                      <th className="text-left p-3 border border-gray-200 font-semibold">What to Build There</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Brand website', 'Gemini sources 52% of citations from owned domains; structured content signals authority', 'Clear product pages, FAQ sections, schema markup, answer-first formatting'],
                      ['G2 / Capterra / Trustpilot', 'Brands with active profiles have 3x higher ChatGPT citation rates', 'Encourage honest, detailed reviews post-onboarding; respond to feedback'],
                      ['Reddit / Hacker News', 'Community discussions shape the experiential narrative AI systems absorb', 'Participate in threads genuinely; answer questions without promotional framing'],
                      ['Third-party publications', 'Builds referring domain profile and places ideas in high-authority sources simultaneously', 'Earn bylines; distribute original research; aim for publications your buyers read'],
                      ['YouTube', 'Appears prominently in AI answers across all major platforms', 'Produce explainer content with transcripts; chapter markers; specific, named claims'],
                      ['Wikipedia', '7.8% of ChatGPT citations; encyclopedic framing is absorbed as fact', 'Contribute to relevant category definitions where accurate; earn mentions through research'],
                      ['Original research distribution', 'Distributed content earns 325% more AI citations than single-site publishing (Stacker, 2025)', 'Publish proprietary data; pitch it to trade publications; let others reference it'],
                    ].map(([surface, why, what], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 border border-gray-200 font-semibold text-gray-700 text-xs">{surface}</td>
                        <td className="p-3 border border-gray-200 text-gray-600 text-xs">{why}</td>
                        <td className="p-3 border border-gray-200 text-blue-700 text-xs">{what}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── Chart 7: Multi-Surface Tile Grid ─────────────────────── */}
              <div className="my-8 not-prose">
                <svg
                  viewBox="0 0 800 392"
                  className="w-full h-auto rounded-xl border border-gray-100 shadow-sm"
                  role="img"
                  aria-labelledby="ch7Title ch7Desc"
                >
                  <title id="ch7Title">Multi-Surface Presence Map for B2B SaaS Brands</title>
                  <desc id="ch7Desc">Seven-tile grid showing the key surfaces where B2B brands should build presence for AI citation: Brand Website (52% Gemini citations), G2/Capterra (3x ChatGPT rate), Reddit/Hacker News (4x citation rate for active brands), Third-Party Publications (builds domain authority), YouTube (all major AI platforms), Wikipedia (7.8% ChatGPT citations), and Original Research Distribution (325% more AI citations than single-site publishing, per Stacker 2025).</desc>
                  <rect width="800" height="392" rx="12" fill="white" />

                  {/* Header */}
                  <text x="400" y="30" fontSize="15" fontWeight="700" fill="#111827" textAnchor="middle">Where to Build Presence for AI Citation</text>
                  <text x="400" y="49" fontSize="11" fill="#6b7280" textAnchor="middle">Distributed content earns 325% more AI citations than single-site publishing · Stacker, 2025</text>

                  {/*
                    Tile layout: height=130, Row 1 y=62–192, Row 2 y=200–330
                    Within each tile (relative to tile_y):
                      +22 = title | +34 = divider | +52 = metric (fontSize=17)
                      +70 = desc line 1 | +83 = desc line 2 | +96 = desc line 3
                      +108 = action 1  | +122 = action 2
                  */}

                  {/* ── Row 1: 4 tiles ── */}

                  {/* Tile 1: Brand Website (x=18, cx=109) */}
                  <rect x="18" y="62" width="182" height="130" rx="9" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                  <text x="109" y="84" fontSize="10" fontWeight="700" fill="#1d4ed8" textAnchor="middle">Brand Website</text>
                  <line x1="30" y1="96" x2="188" y2="96" stroke="#bfdbfe" strokeWidth="1" />
                  <text x="109" y="114" fontSize="17" fontWeight="800" fill="#1d4ed8" textAnchor="middle">52%</text>
                  <text x="109" y="132" fontSize="9" fill="#6b7280" textAnchor="middle">of Gemini citations from</text>
                  <text x="109" y="145" fontSize="9" fill="#6b7280" textAnchor="middle">brand-owned domains</text>
                  <text x="109" y="170" fontSize="8.5" fill="#3b82f6" textAnchor="middle" fontWeight="600">→ FAQ pages · schema markup</text>
                  <text x="109" y="184" fontSize="8.5" fill="#3b82f6" textAnchor="middle" fontWeight="600">→ answer-first formatting</text>

                  {/* Tile 2: G2/Capterra (x=210, cx=301) */}
                  <rect x="210" y="62" width="182" height="130" rx="9" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
                  <text x="301" y="84" fontSize="10" fontWeight="700" fill="#166534" textAnchor="middle">G2 / Capterra</text>
                  <line x1="222" y1="96" x2="380" y2="96" stroke="#86efac" strokeWidth="1" />
                  <text x="301" y="114" fontSize="17" fontWeight="800" fill="#16a34a" textAnchor="middle">3×</text>
                  <text x="301" y="132" fontSize="9" fill="#6b7280" textAnchor="middle">higher ChatGPT citation rate</text>
                  <text x="301" y="145" fontSize="9" fill="#6b7280" textAnchor="middle">for brands with active profiles</text>
                  <text x="301" y="170" fontSize="8.5" fill="#16a34a" textAnchor="middle" fontWeight="600">→ post-onboarding review asks</text>
                  <text x="301" y="184" fontSize="8.5" fill="#16a34a" textAnchor="middle" fontWeight="600">→ respond to all feedback</text>

                  {/* Tile 3: Reddit/HN (x=402, cx=493) */}
                  <rect x="402" y="62" width="182" height="130" rx="9" fill="#fff1f2" stroke="#fca5a5" strokeWidth="1.5" />
                  <text x="493" y="84" fontSize="10" fontWeight="700" fill="#991b1b" textAnchor="middle">Reddit / Hacker News</text>
                  <line x1="414" y1="96" x2="572" y2="96" stroke="#fca5a5" strokeWidth="1" />
                  <text x="493" y="114" fontSize="17" fontWeight="800" fill="#dc2626" textAnchor="middle">4×</text>
                  <text x="493" y="132" fontSize="9" fill="#6b7280" textAnchor="middle">higher citation rates for</text>
                  <text x="493" y="145" fontSize="9" fill="#6b7280" textAnchor="middle">brands with community presence</text>
                  <text x="493" y="170" fontSize="8.5" fill="#dc2626" textAnchor="middle" fontWeight="600">→ answer questions genuinely</text>
                  <text x="493" y="184" fontSize="8.5" fill="#dc2626" textAnchor="middle" fontWeight="600">→ no promotional framing</text>

                  {/* Tile 4: Publications (x=594, cx=688, w=188) */}
                  <rect x="594" y="62" width="188" height="130" rx="9" fill="#faf5ff" stroke="#c4b5fd" strokeWidth="1.5" />
                  <text x="688" y="84" fontSize="10" fontWeight="700" fill="#5b21b6" textAnchor="middle">Third-Party Publications</text>
                  <line x1="606" y1="96" x2="770" y2="96" stroke="#c4b5fd" strokeWidth="1" />
                  <text x="688" y="114" fontSize="13" fontWeight="800" fill="#7c3aed" textAnchor="middle">Authority + Reach</text>
                  <text x="688" y="132" fontSize="9" fill="#6b7280" textAnchor="middle">Builds domain profile &amp; places</text>
                  <text x="688" y="145" fontSize="9" fill="#6b7280" textAnchor="middle">ideas in high-authority sources</text>
                  <text x="688" y="170" fontSize="8.5" fill="#7c3aed" textAnchor="middle" fontWeight="600">→ earn bylines in trade press</text>
                  <text x="688" y="184" fontSize="8.5" fill="#7c3aed" textAnchor="middle" fontWeight="600">→ distribute original research</text>

                  {/* ── Row 2: 3 tiles centered ── */}

                  {/* Tile 5: YouTube (x=105, cx=196) */}
                  <rect x="105" y="200" width="182" height="130" rx="9" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
                  <text x="196" y="222" fontSize="10" fontWeight="700" fill="#92400e" textAnchor="middle">YouTube</text>
                  <line x1="117" y1="234" x2="275" y2="234" stroke="#fcd34d" strokeWidth="1" />
                  <text x="196" y="252" fontSize="13" fontWeight="800" fill="#b45309" textAnchor="middle">All Major Platforms</text>
                  <text x="196" y="270" fontSize="9" fill="#6b7280" textAnchor="middle">Appears prominently in AI answers</text>
                  <text x="196" y="283" fontSize="9" fill="#6b7280" textAnchor="middle">across ChatGPT, Gemini</text>
                  <text x="196" y="296" fontSize="9" fill="#6b7280" textAnchor="middle">&amp; Perplexity</text>
                  <text x="196" y="314" fontSize="8.5" fill="#b45309" textAnchor="middle" fontWeight="600">→ explainers + transcripts</text>
                  <text x="196" y="325" fontSize="8.5" fill="#b45309" textAnchor="middle" fontWeight="600">→ chapter markers + named claims</text>

                  {/* Tile 6: Wikipedia (x=309, cx=400) */}
                  <rect x="309" y="200" width="182" height="130" rx="9" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
                  <text x="400" y="222" fontSize="10" fontWeight="700" fill="#166534" textAnchor="middle">Wikipedia</text>
                  <line x1="321" y1="234" x2="479" y2="234" stroke="#86efac" strokeWidth="1" />
                  <text x="400" y="252" fontSize="17" fontWeight="800" fill="#16a34a" textAnchor="middle">7.8%</text>
                  <text x="400" y="270" fontSize="9" fill="#6b7280" textAnchor="middle">of all ChatGPT citations —</text>
                  <text x="400" y="283" fontSize="9" fill="#6b7280" textAnchor="middle">the most-cited single source</text>
                  <text x="400" y="308" fontSize="8.5" fill="#16a34a" textAnchor="middle" fontWeight="600">→ contribute to category pages</text>
                  <text x="400" y="321" fontSize="8.5" fill="#16a34a" textAnchor="middle" fontWeight="600">→ earn mentions via research</text>

                  {/* Tile 7: Original Research (x=513, cx=604) */}
                  <rect x="513" y="200" width="182" height="130" rx="9" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                  <text x="604" y="222" fontSize="10" fontWeight="700" fill="#1d4ed8" textAnchor="middle">Original Research</text>
                  <line x1="525" y1="234" x2="683" y2="234" stroke="#bfdbfe" strokeWidth="1" />
                  <text x="604" y="252" fontSize="17" fontWeight="800" fill="#1d4ed8" textAnchor="middle">325%</text>
                  <text x="604" y="270" fontSize="9" fill="#6b7280" textAnchor="middle">more AI citations when</text>
                  <text x="604" y="283" fontSize="9" fill="#6b7280" textAnchor="middle">distributed vs. single-site</text>
                  <text x="604" y="308" fontSize="8.5" fill="#1d4ed8" textAnchor="middle" fontWeight="600">→ publish proprietary data</text>
                  <text x="604" y="321" fontSize="8.5" fill="#1d4ed8" textAnchor="middle" fontWeight="600">→ pitch to trade publications</text>

                  {/* Bottom note */}
                  <text x="400" y="354" fontSize="9.5" fill="#6b7280" textAnchor="middle">The content question is no longer "what should we publish?" — it's "where do our buyers' conversations actually happen?"</text>
                  <text x="400" y="372" fontSize="9" fill="#9ca3af" textAnchor="middle">Sources: Stacker 2025 · BrightEdge · Digitaloft · Multiple citation studies</text>
                </svg>
                <p className="text-xs text-center text-gray-400 mt-2">
                  Citation share and uplift data aggregated from Stacker 2025, BrightEdge, Digitaloft, and multi-platform citation research.
                </p>
              </div>

              <p className="mb-6">
                For most B2B companies, this implies a more deliberate approach to community engagement that is
                focused on being genuinely useful rather than promotional. The practitioners who participate in
                relevant forums, answer questions thoughtfully, and contribute original perspective to ongoing
                conversations are building a kind of associative capital that AI systems accumulate and
                eventually reflect. Promotional framing is easy to detect and dismiss, and communities are
                quick to sense when someone is there to distribute links rather than contribute. For a deeper
                look at how community conversations directly shape AI search outcomes, read{' '}
                <a href="https://blog.georankers.ai/how-communities-shape-ai-search/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">How Communities Shape AI Search: The New Battleground for Brand Discovery</a>.
              </p>
              <p className="mb-6">
                Earned media on third-party publications with genuine domain authority serves a compound purpose
                in AI search: it reaches readers directly, builds the referring domain profile that increases
                citation probability for a brand's own domain, and places the brand's ideas and framing in
                sources that AI models treat as authoritative. A piece published in a credible trade publication
                achieves all three simultaneously in a way that a blog post on the brand's own domain cannot.
              </p>
            </section>

            {/* ── Section 10: Content Framework ────────────────────────────── */}
            <section id="content-framework" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Content Framework: Putting It Together</h2>
              <p className="mb-6">
                The practical framework that emerges from this is not a checklist as much as a consistent set
                of principles that should shape every content decision from topic selection through final
                editing. The framework below is organized by stage.
              </p>

              {/* ── Chart 8: 4-Stage Framework ────────────────────────────── */}
              <div className="my-8 not-prose">
                <svg
                  viewBox="0 0 800 248"
                  className="w-full h-auto rounded-xl border border-gray-100 shadow-sm"
                  role="img"
                  aria-labelledby="ch8Title ch8Desc"
                >
                  <title id="ch8Title">4-Stage AI Content Framework</title>
                  <desc id="ch8Desc">Linear four-stage content framework for AI citation: Stage 1 Topic Selection — search AI platforms for citation gaps, prioritize narrow specific questions; Stage 2 Writing and Structuring — front-load answers, make sections self-contained, name all sources, write extractable sentences; Stage 3 Authority and Distribution — pre-rendered HTML, schema markup, review presence, community participation; Stage 4 Freshness Maintenance — audit every 3–6 months, update statistics not just dates, add new sections for new questions.</desc>
                  <rect width="800" height="248" rx="12" fill="white" />

                  {/* Header */}
                  <text x="400" y="28" fontSize="14" fontWeight="700" fill="#111827" textAnchor="middle">4-Stage AI Content Framework</text>
                  <text x="400" y="45" fontSize="10.5" fill="#6b7280" textAnchor="middle">From topic selection to freshness maintenance — the repeatable process for content that earns AI citations</text>

                  {/* Connector arrows between boxes */}
                  {/* Arrow 1→2: from x=202 to x=212 */}
                  <polygon points="210,143 203,138 203,148" fill="#9ca3af" />
                  <line x1="202" y1="143" x2="210" y2="143" stroke="#9ca3af" strokeWidth="1.5" />
                  {/* Arrow 2→3 */}
                  <polygon points="402,143 395,138 395,148" fill="#9ca3af" />
                  <line x1="394" y1="143" x2="402" y2="143" stroke="#9ca3af" strokeWidth="1.5" />
                  {/* Arrow 3→4 */}
                  <polygon points="594,143 587,138 587,148" fill="#9ca3af" />
                  <line x1="586" y1="143" x2="594" y2="143" stroke="#9ca3af" strokeWidth="1.5" />

                  {/* ── Stage 1: Topic Selection (blue) ── x=14–200 */}
                  <rect x="14" y="60" width="188" height="170" rx="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
                  {/* Number badge */}
                  <circle cx="42" cy="82" r="14" fill="#3b82f6" />
                  <text x="42" y="87" fontSize="13" fontWeight="800" fill="white" textAnchor="middle">1</text>
                  <text x="66" y="87" fontSize="11" fontWeight="700" fill="#1d4ed8">Topic Selection</text>
                  <line x1="26" y1="99" x2="190" y2="99" stroke="#bfdbfe" strokeWidth="1" />
                  <text x="26" y="115" fontSize="9" fill="#374151">• Search ChatGPT, Gemini, Perplexity</text>
                  <text x="26" y="130" fontSize="9" fill="#374151">  for citation gaps in your category</text>
                  <text x="26" y="149" fontSize="9" fill="#374151">• Prioritize narrow, specific questions</text>
                  <text x="26" y="164" fontSize="9" fill="#374151">  over broad definitional topics</text>
                  <text x="26" y="183" fontSize="9" fill="#374151">• Avoid topics where your answer</text>
                  <text x="26" y="198" fontSize="9" fill="#374151">  matches every competitor's</text>
                  <text x="26" y="217" fontSize="9" fill="#6b7280">Goal: Identify citation gaps</text>

                  {/* ── Stage 2: Writing (purple) ── x=212–398 */}
                  <rect x="212" y="60" width="188" height="170" rx="10" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
                  <circle cx="240" cy="82" r="14" fill="#7c3aed" />
                  <text x="240" y="87" fontSize="13" fontWeight="800" fill="white" textAnchor="middle">2</text>
                  <text x="264" y="87" fontSize="11" fontWeight="700" fill="#5b21b6">Write &amp; Structure</text>
                  <line x1="224" y1="99" x2="388" y2="99" stroke="#c4b5fd" strokeWidth="1" />
                  <text x="224" y="115" fontSize="9" fill="#374151">• Front-load the clearest claim</text>
                  <text x="224" y="130" fontSize="9" fill="#374151">  in the first paragraph</text>
                  <text x="224" y="149" fontSize="9" fill="#374151">• Every section self-contained</text>
                  <text x="224" y="164" fontSize="9" fill="#374151">  — name all sources explicitly</text>
                  <text x="224" y="183" fontSize="9" fill="#374151">• Write extractable sentences:</text>
                  <text x="224" y="198" fontSize="9" fill="#374151">  claim + source + number</text>
                  <text x="224" y="217" fontSize="9" fill="#6b7280">Goal: Maximize extraction</text>

                  {/* ── Stage 3: Distribution (green) ── x=404–590 */}
                  <rect x="404" y="60" width="188" height="170" rx="10" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5" />
                  <circle cx="432" cy="82" r="14" fill="#10b981" />
                  <text x="432" y="87" fontSize="13" fontWeight="800" fill="white" textAnchor="middle">3</text>
                  <text x="456" y="87" fontSize="11" fontWeight="700" fill="#065f46">Authority &amp; Distribution</text>
                  <line x1="416" y1="99" x2="580" y2="99" stroke="#a7f3d0" strokeWidth="1" />
                  <text x="416" y="115" fontSize="9" fill="#374151">• Pre-rendered HTML + fast FCP</text>
                  <text x="416" y="130" fontSize="9" fill="#374151">  (under 0.4s = 6.7 avg. citations)</text>
                  <text x="416" y="149" fontSize="9" fill="#374151">• Add Article + FAQPage schema</text>
                  <text x="416" y="164" fontSize="9" fill="#374151">  to all high-priority pages</text>
                  <text x="416" y="183" fontSize="9" fill="#374151">• Distribute research to 3rd-party</text>
                  <text x="416" y="198" fontSize="9" fill="#374151">  publications + review platforms</text>
                  <text x="416" y="217" fontSize="9" fill="#6b7280">Goal: Multi-surface presence</text>

                  {/* ── Stage 4: Freshness (amber) ── x=596–782 */}
                  <rect x="596" y="60" width="188" height="170" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
                  <circle cx="624" cy="82" r="14" fill="#f59e0b" />
                  <text x="624" y="87" fontSize="13" fontWeight="800" fill="white" textAnchor="middle">4</text>
                  <text x="648" y="87" fontSize="11" fontWeight="700" fill="#92400e">Freshness Maintenance</text>
                  <line x1="608" y1="99" x2="772" y2="99" stroke="#fde68a" strokeWidth="1" />
                  <text x="608" y="115" fontSize="9" fill="#374151">• Audit high-priority content</text>
                  <text x="608" y="130" fontSize="9" fill="#374151">  every 3–6 months</text>
                  <text x="608" y="149" fontSize="9" fill="#374151">• Update statistics — not just</text>
                  <text x="608" y="164" fontSize="9" fill="#374151">  publication dates (detectable)</text>
                  <text x="608" y="183" fontSize="9" fill="#374151">• Add new sections as buyer</text>
                  <text x="608" y="198" fontSize="9" fill="#374151">  questions evolve</text>
                  <text x="608" y="217" fontSize="9" fill="#6b7280">Goal: Reset freshness signal</text>
                </svg>
                <p className="text-xs text-center text-gray-400 mt-2">
                  76.4% of ChatGPT's most-cited pages were updated within the last 30 days (Digitaloft, 2025) — Stage 4 is as important as Stage 1.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-blue-700 mb-4">Stage 1: Topic Selection</h3>
              <p className="mb-4">
                Start with the actual questions buyers are asking AI platforms about your category, not with
                keyword research that may not reflect conversational queries.
              </p>
              <ul className="mb-8 space-y-2">
                <li>Search your category in ChatGPT, Gemini, and Perplexity and note which sources are cited and what framing is used</li>
                <li>Identify questions the current answers address poorly or incompletely — those are the citation gaps</li>
                <li>Prioritize narrow, specific questions over broad definitional topics</li>
                <li>Avoid topics where your answer would be identical to every other piece in the category</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-4">Stage 2: Writing and Structuring</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="text-left p-3 border border-gray-200 font-semibold">Principle</th>
                      <th className="text-left p-3 border border-gray-200 font-semibold">What It Means in Practice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Front-load the answer', 'The clearest, most specific claim belongs in the first paragraph, not the conclusion'],
                      ['Make each section self-contained', 'Any section should be understandable without reading the rest of the article'],
                      ['Name everything', 'Sources, tools, institutions, data providers — never "studies show"'],
                      ['Use tables and structured formats', 'For comparisons, rankings, or grouped data — not to replace analysis but to complement it'],
                      ['Write extractable sentences', 'Each factual sentence should stand alone: claim + source + number'],
                      ['Avoid hedging', 'Remove "may," "can sometimes," "it is possible that" from any factual assertion'],
                    ].map(([principle, practice], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 border border-gray-200 font-semibold text-gray-700">{principle}</td>
                        <td className="p-3 border border-gray-200 text-gray-600">{practice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-blue-700 mb-4">Stage 3: Authority and Distribution</h3>
              <ul className="mb-8 space-y-2">
                <li>Publish on a domain with pre-rendered HTML and competitive page load speed</li>
                <li>Add Article, FAQPage, and relevant schema to high-priority pages</li>
                <li>Distribute original research to third-party publications rather than keeping it on your domain alone</li>
                <li>Build review presence on G2, Capterra, or relevant platforms for your category</li>
                <li>Maintain community participation in the forums where your buyers actually talk</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-4">Stage 4: Freshness Maintenance</h3>
              <ul className="mb-8 space-y-2">
                <li>Audit high-priority content every three to six months for outdated data and examples</li>
                <li>Update statistics, not just publication dates — cosmetic changes do not reset freshness signals</li>
                <li>Add new sections when questions arise that the original piece did not address</li>
                <li>Monitor what AI platforms are citing in your category and identify where fresh content would improve representation</li>
              </ul>
            </section>

            {/* ── Section 11: What This Means ──────────────────────────────── */}
            <section id="what-this-means" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What This Shift Actually Means</h2>
              <p className="mb-6">
                The underlying logic of all of this points toward a conclusion that is less about tactics and
                more about what content is supposed to do in the first place. AI search is, at its core, a
                reflection of collective human judgment compressed and synthesized at scale. When AI systems
                decide what to cite, they are drawing on the accumulated weight of what humans have found
                credible, useful, and worth repeating. The brands and content pieces that are cited most
                consistently are the ones that deserve to be — not because they have gamed a system, but
                because they have genuinely contributed something specific, evidenced, and useful to the
                conversations that matter in their category.
              </p>
              <p className="mb-6">
                This framing matters because it suggests that the right response to the AI visibility challenge
                is not a set of tricks to be applied to otherwise mediocre content. It is a fundamental shift
                toward producing content that is more direct, more specific, more rigorously evidenced, and
                more deliberately structured than what most content teams have historically built. The AI is
                not easier to fool than Google. In many respects it is harder, because it is synthesizing
                across a much wider range of signals than a search ranking algorithm and because the community
                conversations it has absorbed are specifically the ones where buyers talk candidly about what
                is actually true.
              </p>
              <p className="mb-6">
                The brands that will earn consistent AI visibility over the next several years are the ones
                that build content and community presence deserving of it. That is both a more demanding
                standard than most teams currently apply and a more honest one, because the goal of building
                content that an AI confidently cites is the same as building content that a well-informed peer
                would actually recommend.
              </p>
              <p className="mb-6 italic text-gray-700">
                The question worth sitting with as you evaluate your current content: if a thoughtful analyst
                absorbed everything published about your category and your brand, would what you have built give
                her enough specificity, evidence, and distinctive perspective to recommend you with confidence?
                The answer to that question is where AI visibility work actually begins.
              </p>

              <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-gray-700 leading-relaxed">
                  <strong>GeoRankers</strong> tracks how your brand appears in AI-generated answers across ChatGPT,
                  Gemini, and Perplexity, giving you the visibility to understand where you stand and what content
                  is shaping the way AI systems describe you. If that kind of clarity matters to your team,{' '}
                  <Link href="/features" className="text-blue-600 hover:text-blue-800 underline">see what GeoRankers tracks</Link>{' '}
                  or read how{' '}
                  <a href="https://blog.georankers.ai/b2b-saas-ai-visiblity-optimisation/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">AI visibility is becoming the new growth channel for B2B SaaS in 2026</a>.
                </p>
              </div>
            </section>

            {/* ── Final CTA ────────────────────────────────────────────────── */}
            <div className="my-12 bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20 rounded-2xl p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Start Measuring Your AI Citation Share</h3>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                GeoRankers gives B2B brands the clarity they need to understand where they appear in AI-generated
                answers — and what content is driving or blocking those citations.
              </p>
              <a
                href="https://dashboard.georankers.co/register"
                className="inline-flex items-center gradient-cta hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg no-underline"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Try GeoRankers Free
              </a>
            </div>

            {/* ── FAQ ──────────────────────────────────────────────────────── */}
            <section id="faq" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>

              {[
                {
                  q: 'What is the difference between writing for SEO and writing for AI search?',
                  a: 'Traditional SEO optimizes pages to rank for specific keywords in a list of results. Writing for AI search requires creating content that can be extracted, synthesized, and cited as part of a single coherent answer. The core difference is that AI systems retrieve at the passage level rather than the page level, which means every section of a piece of content needs to be able to stand alone as a useful, specific answer to a real question.',
                },
                {
                  q: 'Does content length matter for AI citation?',
                  a: 'Content depth matters more than raw word count. Long-form content of 2,000 words or more is cited more frequently than short content, but only when it maintains specificity and depth throughout rather than padding to hit a length target. The more useful measure is whether each major section contains at least one specific, extractable assertion supported by evidence. A 2,500-word piece with 10 citable sections will consistently outperform a 5,000-word piece with two.',
                },
                {
                  q: 'How often should content be updated for AI visibility?',
                  a: 'Research shows that 76.4% of ChatGPT\'s most-cited pages were updated within the last 30 days, and the majority of AI Overview citations come from content published within the last two years. For content in fast-moving categories, meaningful updates every three to six months are worth considering for high-priority pieces. The update should reflect genuinely new data, examples, or framing rather than cosmetic changes to a publication date.',
                },
                {
                  q: 'Does schema markup help with AI citation?',
                  a: 'Yes, though the relationship is stronger for some platforms than others. Gemini shows a pronounced preference for structured, schema-marked content on brand-owned domains. Research suggests that products with comprehensive schema markup appear in AI recommendations three to five times more frequently than those without it. For ChatGPT and Perplexity, the effect is less direct but still meaningful in that schema markup contributes to the overall authority and crawlability signals those platforms factor into source selection.',
                },
                {
                  q: 'What role do community platforms play in AI visibility?',
                  a: 'Community platforms play a larger role than most content strategies currently account for. Domains with substantial brand mentions on Quora and Reddit have approximately four times higher citation rates than those with minimal community presence. Perplexity draws roughly 46.7% of its top citations from Reddit alone for certain query types. The mechanism is that AI systems learned from human conversations, and the platforms where those conversations happen in the most candid and detailed form become disproportionately influential in shaping how AI answers describe brands and categories.',
                },
                {
                  q: 'What types of content does AI cite most?',
                  a: 'AI systems disproportionately cite content that is specific, structured, and sourced. Research-backed content with named statistics is cited 22% more frequently than generic claims (Aggarwal et al., 2024). Content containing direct quotes from named experts sees a 37% higher citation rate. Structured formats — tables, numbered lists, FAQ sections — are cited 2.5x more often than unstructured prose (Onely, 2025). Content that defines terms clearly, answers questions directly, and front-loads its key claims in the first 30% of the page consistently outperforms longer, less structured alternatives.',
                },
                {
                  q: 'How do I write content that gets cited in ChatGPT?',
                  a: 'To get cited in ChatGPT in 2026, focus on four things: (1) Write extractable assertions — every section should contain a specific, self-contained claim supported by evidence that can be lifted verbatim. (2) Use structure AI can parse — headers, bullet points, numbered lists, and FAQ sections signal retrievable content. (3) Build domain authority — ChatGPT shows a 3.5x citation lift for domains with 32,000+ referring domains, so third-party mentions matter. (4) Keep content fresh — 76.4% of ChatGPT\'s most-cited pages were updated within the last 30 days (Digitaloft, 2025). Combine these with FAQPage and Article schema markup to maximize extractability.',
                },
                {
                  q: 'What is an extractable assertion?',
                  a: 'An extractable assertion is a self-contained sentence or passage that AI systems can lift directly from your content and use as part of a synthesized answer — without needing surrounding context to make sense. It combines a specific claim, supporting evidence or a named source, and enough context to stand alone. For example: "Companies that publish original research with named statistics see 22% higher AI citation rates than those that do not (Aggarwal et al., 2024)" is an extractable assertion. "Content quality matters for AI" is not — it is too generic to be cited. Every section of AI-optimized content should contain at least one extractable assertion.',
                },
                {
                  q: 'How do I structure B2B content for AI search?',
                  a: 'Structure B2B content for AI search by treating each section as an independent answer unit. Start with a clear H2 or H3 that names the topic explicitly. Open the section with your strongest, most specific claim rather than building to it. Support that claim with a named statistic or sourced evidence. Use bullet points or numbered lists for multi-part answers — AI systems retrieve lists cleanly. Add a summary sentence at the end of complex sections. Include a FAQ section at the bottom of long-form content to capture question-based queries directly. Finally, implement Article and FAQPage schema markup so AI systems can identify the content type and extract it more reliably.',
                },
              ].map(({ q, a }, i) => (
                <div key={i} className="mb-6 border border-gray-200 rounded-xl overflow-hidden">
                  <h3 className="text-lg font-semibold text-gray-900 bg-gray-50 px-6 py-4 m-0">{q}</h3>
                  <p className="px-6 py-4 text-gray-700 leading-relaxed m-0">{a}</p>
                </div>
              ))}
            </section>

            {/* ── Related Reading ──────────────────────────────────────── */}
            <section className="mb-12 not-prose">
              <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Reading</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                    <div>
                      <Link href="/geo-guide" className="text-blue-600 hover:text-blue-800 font-medium underline">
                        The Complete GEO Playbook — Master AI Search Optimization for B2B &amp; SaaS
                      </Link>
                      <p className="text-sm text-gray-500 mt-0.5">Full strategic guide covering how generative engines work and how to build authority across all AI platforms.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 w-2 h-2 rounded-full bg-violet-500 flex-shrink-0"></span>
                    <div>
                      <a href="https://blog.georankers.ai/how-communities-shape-ai-search/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium underline">
                        How Communities Shape AI Search: The New Battleground for Brand Discovery
                      </a>
                      <p className="text-sm text-gray-500 mt-0.5">How Reddit, Hacker News, and Quora threads are shaping what AI models say about brands — and what to do about it.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></span>
                    <div>
                      <a href="https://blog.georankers.ai/how-to-optimize-content-for-ai-overviews-aio-in-2026/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium underline">
                        How to Optimize Content for Google AI Overviews (AIO) in 2026
                      </a>
                      <p className="text-sm text-gray-500 mt-0.5">Tactical guide to structuring content for Gemini's AI Overviews — the fastest-growing citation surface for brand-owned domains.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 w-2 h-2 rounded-full bg-amber-500 flex-shrink-0"></span>
                    <div>
                      <a href="https://blog.georankers.ai/ai-discovery-metrics-llm-analytics/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium underline">
                        The Hidden Metrics Behind AI Discovery That SEO Tools Cannot Show You
                      </a>
                      <p className="text-sm text-gray-500 mt-0.5">Why standard analytics miss how AI systems perceive your brand — and the metrics that actually predict citation probability.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                    <div>
                      <a href="https://blog.georankers.ai/b2b-saas-ai-visiblity-optimisation/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium underline">
                        AI Visibility: The New Growth Channel for B2B SaaS in 2026
                      </a>
                      <p className="text-sm text-gray-500 mt-0.5">How leading B2B SaaS brands are shifting strategy toward AI search visibility — and what separates those earning consistent citations from those being ignored.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
