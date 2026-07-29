export type GlossaryTerm = {
  slug: string;
  term: string;
  definition: string;
  inPractice?: string;
  category: string;
  seeAlso?: string[];
};

export const GLOSSARY_CATEGORIES = [
  { id: "foundational-concepts", title: "Foundational Concepts" },
  { id: "visibility-measurement", title: "Visibility & Measurement Metrics" },
  { id: "citation-mechanics", title: "Citation Mechanics" },
  { id: "how-ai-engines-work", title: "How AI Engines Actually Work" },
  { id: "crawling-technical", title: "Crawling & Technical Infrastructure" },
  { id: "platform-specific", title: "Platform-Specific Terms" },
  { id: "strategy-tactics", title: "Strategy & Tactics" },
  { id: "georankers-product", title: "GeoRankers Product Terms" },
] as const;

export const glossaryTerms: GlossaryTerm[] = [
  // Foundational Concepts
  {
    slug: "gaio",
    term: "GAIO (Generative AI Optimization)",
    definition:
      "The broadest umbrella term for making sure AI systems in general describe your brand accurately and favorably. Think of it as the parent category that everything else in this glossary sits underneath.",
    category: "foundational-concepts",
    seeAlso: ["geo", "llmo"],
  },
  {
    slug: "geo",
    term: "GEO (Generative Engine Optimization)",
    definition:
      "The practice of improving how your brand shows up when someone asks ChatGPT, Google AI Search, or Perplexity a question. If SEO was about ranking high in a list of links, GEO is about being part of the one answer the AI actually gives.",
    category: "foundational-concepts",
    seeAlso: ["aeo", "action-layer"],
  },
  {
    slug: "aeo",
    term: "AEO (Answer Engine Optimization)",
    definition:
      "Very close to GEO, but broader. It covers any system that gives a direct answer instead of a list of links, including voice assistants like Siri or Alexa, not just AI chat tools.",
    category: "foundational-concepts",
    seeAlso: ["geo"],
  },
  {
    slug: "llmo",
    term: "LLMO (Large Language Model Optimization)",
    definition:
      "A longer-term, harder-to-influence cousin of GEO. Where GEO focuses on what shows up in an answer today, LLMO is about shaping what an AI model learns during its training, which affects how it talks about your brand by default, before it even looks anything up.",
    category: "foundational-concepts",
    seeAlso: ["training-data-vs-live-retrieval"],
  },
  {
    slug: "zero-click-search",
    term: "Zero-Click Search",
    definition:
      "When someone gets a full answer directly from an AI tool and never clicks through to any website. This is why your traffic numbers can stay flat or even drop while your brand is actually being talked about more than ever — the visits just are not happening the way they used to.",
    category: "foundational-concepts",
    seeAlso: ["ai-referral-traffic"],
  },

  // Visibility & Measurement Metrics
  {
    slug: "ai-visibility-score",
    term: "AI Visibility Score",
    definition:
      "A single number that sums up how often, and how positively, your brand shows up across the AI tools you are tracking. Think of it as a report card grade for your overall AI presence.",
    category: "visibility-measurement",
  },
  {
    slug: "share-of-ai-voice",
    term: "Share of AI Voice",
    definition:
      "Out of all the times an AI could have mentioned a brand in your category, what percentage of those mentions were you. If you and four competitors are all fighting for attention on the same question, this tells you what slice of that attention you are actually getting.",
    category: "visibility-measurement",
  },
  {
    slug: "answer-inclusion",
    term: "Answer Inclusion",
    definition:
      "A simple yes-or-no. Did the AI mention your brand at all when answering a relevant question, or did it leave you out entirely. This does not yet say how you were described, only whether you were there.",
    category: "visibility-measurement",
    seeAlso: ["citation-vs-mention"],
  },
  {
    slug: "position",
    term: "Position",
    definition:
      "Where your brand appeared within the answer, when there is a ranked or ordered list involved. Similar in spirit to a Google ranking, but inside a single AI-written response instead of a page of blue links.",
    category: "visibility-measurement",
  },
  {
    slug: "sentiment",
    term: "Sentiment",
    definition:
      "Whether the AI talked about your brand in a positive, neutral, or negative way. An AI can mention you and still make you sound like the weaker choice, which is why sentiment matters as much as simply being mentioned.",
    category: "visibility-measurement",
  },
  {
    slug: "prompt-volume",
    term: "Prompt Volume",
    definition:
      "The number of real questions people ask that are relevant to your brand or category, and that you are actually keeping an eye on. Higher prompt volume means you are watching a wider slice of the actual conversation, not just one or two guesses at what buyers might type.",
    category: "visibility-measurement",
    seeAlso: ["query-fan-out", "seed-topics-tracked-prompts"],
  },
  {
    slug: "cross-engine-divergence",
    term: "Cross-Engine Divergence",
    definition:
      "The finding that your brand can look completely different depending on which AI tool someone asks. You might be recommended constantly on ChatGPT and almost never mentioned on Perplexity, because each tool pulls its information from different places and applies different judgment. This gap is often the single most useful insight a brand can act on.",
    category: "visibility-measurement",
    seeAlso: ["competitive-benchmarking"],
  },
  {
    slug: "ai-referral-traffic",
    term: "AI Referral Traffic",
    definition:
      "The visits to your website that come specifically from someone clicking a link inside an AI tool's answer. This traffic is usually much smaller in volume than a click from Google, but often converts better, because the person has already had their question partly answered and arrives with clearer intent.",
    category: "visibility-measurement",
    seeAlso: ["zero-click-search"],
  },
  {
    slug: "ai-keyword-research",
    term: "AI Keyword Research",
    definition:
      "The process of figuring out the actual questions and phrases people ask AI tools about your category, rather than the shorter keyword phrases people type into a traditional search box. These tend to be longer and more conversational, for example \"what's the best CRM for a 10-person startup\" instead of just \"best CRM.\"",
    category: "visibility-measurement",
    seeAlso: ["query-fan-out", "seed-topics-tracked-prompts"],
  },

  // Citation Mechanics
  {
    slug: "citation-vs-mention",
    term: "Citation vs. Mention",
    definition:
      "A mention is simply your brand's name appearing in an AI's answer. A citation is a direct link or explicit credit to one of your specific web pages as the source of information. You can be mentioned without being cited, and your content can be used without your brand name ever appearing.",
    category: "citation-mechanics",
    seeAlso: ["used-vs-cited"],
  },
  {
    slug: "used-vs-cited",
    term: "Used vs. Cited",
    definition:
      "A finer version of the point above. \"Used\" means your content actually helped shape the AI's answer, even if it never says so. \"Cited\" means the AI explicitly names or links your page. Content can be quietly used without ever getting the visible credit of a citation.",
    category: "citation-mechanics",
    seeAlso: ["citation-vs-mention"],
  },
  {
    slug: "grounding",
    term: "Grounding",
    definition:
      "The step where an AI tool goes and checks real, current information before answering, instead of relying only on what it memorized during training. Which sources an AI chooses to ground its answer in directly decides which brands even have a chance of being mentioned.",
    category: "citation-mechanics",
    seeAlso: ["rag"],
  },
  {
    slug: "source-authority",
    term: "Source Authority",
    definition:
      "How trustworthy or credible a given website or piece of content appears to an AI system. Higher authority sources are more likely to be pulled into answers and cited by name.",
    category: "citation-mechanics",
    seeAlso: ["e-e-a-t"],
  },
  {
    slug: "e-e-a-t",
    term: "E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)",
    definition:
      "A set of quality signals, originally from Google's search guidelines, that AI systems now also use to judge whether a piece of content is reliable enough to cite. In plain terms, it is the AI's way of asking, does whoever wrote this actually know what they are talking about, and can it be trusted.",
    category: "citation-mechanics",
    seeAlso: ["ymyl"],
  },
  {
    slug: "ymyl",
    term: "YMYL (Your Money or Your Life)",
    definition:
      "A label for content that could affect someone's health, finances, safety, or major life decisions. AI tools hold this kind of content to a much higher standard before they will cite it, so if your product touches these areas, your content needs stronger proof of credibility to get picked up.",
    category: "citation-mechanics",
    seeAlso: ["e-e-a-t"],
  },

  // How AI Engines Actually Work
  {
    slug: "query-fan-out",
    term: "Query Fan-Out",
    definition:
      "When you ask an AI one question, it often quietly turns that into six or more smaller, related questions behind the scenes before it writes an answer. This means tracking a single exact phrase is not enough, because the AI is really searching around a whole cloud of related questions, most of which you never see.",
    category: "how-ai-engines-work",
    seeAlso: ["prompt-volume", "ai-keyword-research"],
  },
  {
    slug: "rag",
    term: "Retrieval-Augmented Generation (RAG)",
    definition:
      "The technical process an AI uses to look things up in real time and blend that fresh information with what it already knows, rather than answering purely from memory. It is the main mechanism behind why an AI's answer can include very recent or very specific information.",
    category: "how-ai-engines-work",
    seeAlso: ["grounding"],
  },
  {
    slug: "training-data-vs-live-retrieval",
    term: "Training Data vs. Live Retrieval",
    definition:
      "Training data is everything an AI model learned before it was released and effectively memorized. Live retrieval is information it looks up fresh, at the moment you ask a question. An AI's answer is often a mix of both, and knowing which one is driving a specific answer explains why some brand mentions are outdated while others are current.",
    category: "how-ai-engines-work",
    seeAlso: ["llmo"],
  },
  {
    slug: "knowledge-graph-entity-recognition",
    term: "Knowledge Graph / Entity Recognition",
    definition:
      "The way an AI system identifies your brand as a specific, distinct \"thing\" (an entity) with known facts attached to it, rather than just matching text. Strong entity recognition means the AI reliably knows who you are, what category you belong to, and what you actually do.",
    category: "how-ai-engines-work",
  },
  {
    slug: "hallucination",
    term: "Hallucination",
    definition:
      "When an AI states something confidently that is simply not true. In a brand context, this might mean an AI describes your product incorrectly, invents a feature you do not have, or confuses you with a competitor. It is a real risk worth monitoring, not just a theoretical one.",
    category: "how-ai-engines-work",
  },

  // Crawling & Technical Infrastructure
  {
    slug: "llm-crawlability",
    term: "LLM Crawlability",
    definition:
      "Whether the automated systems that AI tools use to read the web can actually access and understand your website's content. A website that is technically difficult to read by these systems will not be recommended, no matter how good the content actually is.",
    category: "crawling-technical",
    seeAlso: ["ssr-pre-rendering"],
  },
  {
    slug: "llms-txt",
    term: "llms.txt",
    definition:
      "A plain text file some companies place on their website specifically for AI systems to read, giving a clear, structured summary of who the company is, what it offers, and what it wants an AI to know and repeat about it.",
    category: "crawling-technical",
  },
  {
    slug: "ai-training-crawler-vs-ai-search-crawler",
    term: "AI Training Crawler vs. AI Search Crawler",
    definition:
      "Two different kinds of automated visitors to your website. A training crawler (like GPTBot) collects data to help teach a future version of an AI model. A search crawler (like an OpenAI search bot, Google-Extended, or PerplexityBot) fetches information in real time to help answer a specific question right now. Blocking one does not necessarily block the other.",
    category: "crawling-technical",
  },
  {
    slug: "ssr-pre-rendering",
    term: "Server-Side Rendering (SSR) / Pre-Rendering",
    definition:
      "A technical setup where your website's content is fully built into readable text before a visitor (or an AI crawler) ever loads the page, rather than being built live in the visitor's browser using code that many crawlers cannot run. Sites without this can be functionally invisible to AI systems, even if a human visitor sees everything perfectly.",
    category: "crawling-technical",
    seeAlso: ["llm-crawlability"],
  },
  {
    slug: "structured-data-schema-markup",
    term: "Structured Data / Schema Markup",
    definition:
      "Extra, hidden labels added to your website's code that explicitly tell search engines and AI systems what each piece of content actually is, for example marking a paragraph as a \"definition\" or a list as \"frequently asked questions.\" It removes the guesswork for the systems reading your site.",
    category: "crawling-technical",
  },

  // Platform-Specific Terms
  {
    slug: "chatgpt-browsing-search-mode",
    term: "ChatGPT Browsing/Search Mode",
    definition:
      "The setting in which ChatGPT actively looks up current information from the web, rather than answering only from what it learned during training. This is the mode most relevant to whether your brand shows up in a real-time recommendation.",
    category: "platform-specific",
  },
  {
    slug: "google-ai-overviews",
    term: "Google AI Overviews",
    definition:
      "The AI-generated summary Google shows at the top of certain search results, answering the question directly before any of the usual website links appear below it.",
    category: "platform-specific",
    seeAlso: ["google-ai-mode"],
  },
  {
    slug: "google-ai-mode",
    term: "Google AI Mode",
    definition:
      "A more conversational, chat-based version of Google Search, where the AI can have a back-and-forth exchange with the user rather than just returning a single page of results.",
    category: "platform-specific",
    seeAlso: ["google-ai-overviews"],
  },
  {
    slug: "perplexity-citations",
    term: "Perplexity Citations",
    definition:
      "Perplexity is built around visibly showing its sources as it answers, with citations displayed prominently alongside the response rather than tucked away. This makes it a particularly citation-transparent platform to track.",
    category: "platform-specific",
  },
  {
    slug: "mcp",
    term: "Model Context Protocol (MCP)",
    definition:
      "A technical standard that lets AI tools connect directly to outside data sources and services in a structured way. In practical terms, it is what allows an AI visibility platform's data to be plugged straight into an AI assistant or workflow tool, rather than requiring someone to manually copy information across.",
    category: "platform-specific",
  },

  // Strategy & Tactics
  {
    slug: "digital-pr",
    term: "Digital PR",
    definition:
      "Earning coverage, mentions, or backlinks from other credible websites, such as news outlets or industry publications. AI systems weigh what respected outside sources say about you heavily, often more than what you say about yourself.",
    category: "strategy-tactics",
    seeAlso: ["earned-vs-owned-media"],
  },
  {
    slug: "ugc",
    term: "UGC (User-Generated Content)",
    definition:
      "Reviews, forum discussions, and other content created by real customers rather than by your own marketing team. AI systems increasingly treat this kind of independent, third-party content as a trustworthy signal of what a brand is actually like.",
    category: "strategy-tactics",
  },
  {
    slug: "earned-vs-owned-media",
    term: "Earned Media vs. Owned Media",
    definition:
      "Owned media is content you control directly, like your own website. Earned media is coverage or mentions you did not write yourself, like a review site or news article. AI systems frequently favor earned media as more credible evidence when deciding what to say about a brand.",
    category: "strategy-tactics",
    seeAlso: ["digital-pr"],
  },
  {
    slug: "content-gap-analysis",
    term: "Content Gap Analysis",
    definition:
      "The process of identifying specific questions or topics where your brand should logically be mentioned by AI tools, but currently is not, so you know exactly what to create or fix.",
    category: "strategy-tactics",
  },
  {
    slug: "competitive-benchmarking",
    term: "Competitive Benchmarking",
    definition:
      "Comparing your own AI visibility, ranking, and sentiment directly against named competitors, so you know not just how you are doing, but how you are doing relative to who buyers are actually choosing between.",
    category: "strategy-tactics",
    seeAlso: ["cross-engine-divergence"],
  },
  {
    slug: "monitoring-ceiling",
    term: "Monitoring Ceiling",
    definition:
      "The point where a tool has told you that you are missing from an AI answer, but gives you no further help figuring out what to actually do about it. Many tools stop here; this is the exact gap that a genuine action layer is built to close.",
    category: "strategy-tactics",
    seeAlso: ["action-layer"],
  },
  {
    slug: "action-layer",
    term: "Action Layer",
    definition:
      "The part of a platform that turns a visibility problem into a specific, assignable next step, rather than just reporting that the problem exists. This is the difference between being told you have a gap and being told exactly how to close it.",
    category: "strategy-tactics",
    seeAlso: ["monitoring-ceiling", "geo-agent"],
  },

  // GeoRankers Product Terms
  {
    slug: "seed-topics-tracked-prompts",
    term: "Seed Topics / Tracked Prompts",
    definition:
      "The specific real-world questions and phrases you choose to monitor, representing the actual language your buyers use when asking an AI for a recommendation in your category.",
    category: "georankers-product",
    seeAlso: ["prompt-volume"],
  },
  {
    slug: "scheduled-vs-on-demand-runs",
    term: "Scheduled Runs vs. On-Demand Runs",
    definition:
      "A scheduled run checks your tracked prompts automatically on a set cadence, such as weekly or daily. An on-demand run is one you trigger manually whenever you want a fresh check outside of that regular schedule.",
    category: "georankers-product",
  },
  {
    slug: "geo-agent",
    term: "GEO Agent",
    definition:
      "An in-dashboard assistant you can ask questions of directly, that reads your own visibility data and turns it into plain-language explanations and specific next actions, rather than leaving you to interpret the numbers yourself.",
    category: "georankers-product",
    seeAlso: ["action-layer"],
  },
];

export const GLOSSARY_META_DESCRIPTION =
  "Plain-language definitions of key AI search and GEO terms: GEO, AEO, AI visibility score, citation vs mention, RAG, and more — explained by GeoRankers.";

export function toDefinedTermSetSchema(terms: GlossaryTerm[]) {
  const baseUrl = "https://georankers.ai/geo-glossary";
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${baseUrl}#glossary`,
    name: "AI Search & GEO Glossary",
    description: GLOSSARY_META_DESCRIPTION,
    url: baseUrl,
    inLanguage: "en-US",
    keywords: [
      "GEO", "generative engine optimization", "AEO", "AI search glossary",
      "AI visibility score", "citation vs mention", "RAG", "query fan-out",
      "AI search terminology", "LLM optimization",
    ],
    mainEntityOfPage: { "@type": "WebPage", "@id": baseUrl },
    author: { "@type": "Organization", "name": "GeoRankers", "url": "https://georankers.ai" },
    publisher: {
      "@type": "Organization",
      "name": "GeoRankers",
      "url": "https://georankers.ai",
      "logo": { "@type": "ImageObject", "url": "https://georankers.ai/og-image.png" },
    },
    datePublished: "2026-07-29",
    dateModified: "2026-07-29",
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `${baseUrl}#${t.slug}`,
      name: t.term,
      description: t.definition,
      url: `${baseUrl}#${t.slug}`,
      inDefinedTermSet: `${baseUrl}#glossary`,
    })),
  };
}
