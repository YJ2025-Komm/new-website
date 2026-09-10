import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "@/pages/not-found";
import { alternativesEntries, truncateForMeta } from "@/data/alternatives";
import { ORG_ID } from "@/data/organization";

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AlternativesEntry() {
  const { slug } = useParams<{ slug: string }>();
  const entry = alternativesEntries.find((e) => e.slug === slug);
  const canonical = `https://georankers.ai/alternatives/${slug ?? ""}`;

  // Hooks must run unconditionally on every render (Rules of Hooks) — the
  // "entry not found" case is handled in the JSX below, not via early return.
  const metaDescription = entry ? truncateForMeta(entry.summary) : "GeoRankers alternatives guide.";

  useSEO({
    title: entry ? `${entry.pageTitle} | GeoRankers` : "Alternatives | GeoRankers",
    description: metaDescription,
    canonical,
    ogTitle: entry?.pageTitle,
    ogDescription: metaDescription,
    ogUrl: canonical,
    schemaId: entry ? "alternatives-entry-schema" : undefined,
    schema: entry
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": entry.pageTitle,
          "description": entry.summary,
          "image": "https://georankers.ai/og-image.png",
          "datePublished": entry.publishedDate,
          "dateModified": entry.publishedDate,
          "author": { "@id": ORG_ID },
          "publisher": { "@id": ORG_ID },
          "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
        }
      : undefined,
  });

  // Standalone BreadcrumbList — check-before-create prevents duplication on prerender + hydration
  useEffect(() => {
    if (!entry) return;
    const ID = "alternatives-entry-breadcrumb-schema";
    let el = document.querySelector(`script#${ID}`) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = ID;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://georankers.ai/" },
        { "@type": "ListItem", "position": 2, "name": "Alternatives", "item": "https://georankers.ai/alternatives" },
        { "@type": "ListItem", "position": 3, "name": entry.pageTitle, "item": canonical },
      ],
    });
    return () => { el?.remove(); };
  }, [entry, canonical]);

  // Standalone FAQPage — separate script tag avoids Google "Duplicate field FAQ page" error.
  useEffect(() => {
    const ID = "alternatives-entry-faq-schema";
    if (!entry?.faq?.length) {
      document.querySelector(`script#${ID}`)?.remove();
      return;
    }
    let el = document.querySelector(`script#${ID}`) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = ID;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": entry.faq.map((f) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer },
      })),
    });
    return () => { el?.remove(); };
  }, [entry]);

  if (!entry) {
    return <NotFound />;
  }

  const hasRoundup = !!entry.options?.length;

  // Platform name -> official homepage, so the "at a glance" table can link
  // each name to its own site (one outbound link per brand, not repeated
  // per mention — see the SEO note on AlternativeEntry.website).
  const websiteByPlatform = new Map(entry.options?.map((o) => [o.name, o.website]));

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-32 pb-14 sm:pt-36 sm:pb-16 overflow-hidden">
          <div className="hero-gradient absolute inset-0 z-0"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <Link
              href="/alternatives"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All alternatives guides
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-[1.35] tracking-normal">
              {entry.pageTitle}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">{entry.summary}</p>
          </div>
        </section>

        <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 gap-4 lg:gap-8">
        {/* Sidebar TOC — same pattern as /geo-guide: a single flat list in a
            bordered white card, sticky on desktop. Mobile falls back to the
            "jump to a platform" chip row further down. */}
        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-28 h-fit max-h-[calc(100vh-7rem)] overflow-y-auto">
          <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 px-2 tracking-normal">On This Page</h3>
            <nav className="space-y-0">
              {!!entry.overview?.length && (
                <a href="#overview" className="block px-2 py-1.5 rounded text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                  Overview
                </a>
              )}
              {!!entry.atAGlance?.length && (
                <a href="#at-a-glance" className="block px-2 py-1.5 rounded text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                  At a Glance
                </a>
              )}
              {entry.considerations && (
                <a href="#what-to-look-for" className="block px-2 py-1.5 rounded text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                  What to Look For
                </a>
              )}
              {hasRoundup && entry.options!.map((option, i) => (
                <a
                  key={option.name}
                  href={`#${slugify(option.name)}`}
                  className="block px-2 py-1.5 rounded text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  {i + 1}. {option.name}
                </a>
              ))}
              {!!entry.pricingTable?.length && (
                <a href="#pricing" className="block px-2 py-1.5 rounded text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                  Pricing &amp; Features
                </a>
              )}
              {!!entry.howToRead?.length && (
                <a href="#how-to-read" className="block px-2 py-1.5 rounded text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                  How to Read This
                </a>
              )}
              {entry.whichIsRight && (
                <a href="#which-is-right" className="block px-2 py-1.5 rounded text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                  Which Is Right for You
                </a>
              )}
              {!!entry.faq?.length && (
                <a href="#faq" className="block px-2 py-1.5 rounded text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                  FAQ
                </a>
              )}
            </nav>
          </div>
        </aside>

        <div className="flex-1 max-w-4xl lg:ml-0">
          {/* Overview */}
          {!!entry.overview?.length && (
            <div id="overview" className="scroll-mt-24">
              {entry.overview.map((para, i) => (
                <p key={i} className="text-slate-600 leading-relaxed mb-5">{para}</p>
              ))}
              {entry.screenshot && (
                <img
                  src={entry.screenshot.src}
                  width={entry.screenshot.width}
                  height={entry.screenshot.height}
                  alt={entry.screenshot.alt}
                  loading="lazy"
                  className="w-full rounded-xl border border-slate-200/80 mb-5"
                />
              )}
              {entry.website && (
                <a
                  href={entry.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline underline-offset-2 mb-5"
                >
                  Visit {entry.competitorName} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          {/* Jump nav to each platform section — plain compact chips. Mobile
              only: the sticky sidebar above covers this on larger screens. */}
          {hasRoundup && (
            <nav className="mb-10 lg:hidden">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Jump to a platform</p>
              <div className="flex flex-wrap gap-2">
                {entry.options!.map((option, i) => (
                  <a
                    key={option.name}
                    href={`#${slugify(option.name)}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/80 rounded-full px-3.5 py-1.5 transition-colors"
                  >
                    <span className="text-slate-400">{i + 1}.</span> {option.name}
                  </a>
                ))}
              </div>
            </nav>
          )}

          {/* At a glance table */}
          {!!entry.atAGlance?.length && (
            <section id="at-a-glance" className="my-10 scroll-mt-24">
              <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-normal">{entry.competitorName} Alternatives at a Glance</h2>
              <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
                <table className="text-sm border-collapse" style={{ minWidth: 640 }}>
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      <th className="px-4 py-3 font-semibold text-slate-700 whitespace-nowrap w-32">Platform</th>
                      <th className="px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">Best for</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">Standout strength</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entry.atAGlance.map((row, i) => {
                      const website = websiteByPlatform.get(row.platform);
                      return (
                        <tr key={row.platform} className={i % 2 === 1 ? "bg-slate-50/50" : undefined}>
                          <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap align-top">
                            {website ? (
                              <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline underline-offset-2">
                                {row.platform}
                              </a>
                            ) : (
                              row.platform
                            )}
                          </td>
                          <td className="px-4 py-3 text-slate-600 align-top">{row.bestFor}</td>
                          <td className="px-4 py-3 text-slate-600 align-top">{row.standout}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Considerations */}
          {entry.considerations && (
            <section id="what-to-look-for" className="my-10 scroll-mt-24">
              <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-normal">
                {`What to Look for in a${/^[aeiou]/i.test(entry.competitorName) ? "n" : ""} ${entry.competitorName} Alternative`}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">{entry.considerations.intro}</p>
              <ul className="space-y-2 mb-4">
                {entry.considerations.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 leading-relaxed">
                    <Check className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {entry.considerations.closing && (
                <p className="text-slate-600 leading-relaxed">{entry.considerations.closing}</p>
              )}
            </section>
          )}

          {/* Numbered platform roundup — flat sections, not boxed cards, so the
              page reads as one article rather than six separate ad units. */}
          {hasRoundup && (
            <section className="my-10">
              {entry.options!.map((option, i) => (
                <div
                  key={option.name}
                  id={slugify(option.name)}
                  className={`scroll-mt-24 py-8 ${i > 0 ? "border-t border-slate-100" : ""}`}
                >
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-sm font-black text-slate-300">{i + 1}.</span>
                    <h3 className="text-xl font-bold text-slate-900 tracking-normal">{option.name}</h3>
                  </div>
                  <p className="font-semibold text-slate-500 mb-4">Best for: {option.bestFor}</p>

                  {option.screenshot && (
                    <img
                      src={option.screenshot.src}
                      width={option.screenshot.width}
                      height={option.screenshot.height}
                      alt={option.screenshot.alt}
                      loading="lazy"
                      className="w-full rounded-xl border border-slate-200/80 mb-5"
                    />
                  )}

                  {option.body.map((para, j) => (
                    <p key={j} className="text-slate-600 leading-relaxed mb-3 last:mb-0">{para}</p>
                  ))}

                  {!!option.keyPoints?.length && (
                    <div className="mt-5">
                      <p className="text-sm font-semibold text-slate-700 mb-2">Why choose {option.name}</p>
                      <div className="flex flex-wrap gap-2">
                        {option.keyPoints.map((point) => (
                          <span
                            key={point}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100"
                          >
                            <Check className="w-3 h-3" />
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {option.name === "GeoRankers" && (
                    <p className="mt-4">
                      <Link href="/features" className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline underline-offset-2">
                        See the full GeoRankers feature breakdown <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Pricing table — split into three grouped tables instead of one wide
              9-column table, which was squeezing itself unreadable instead of
              scrolling. Each table gets a forced min-width so it scrolls on
              small screens rather than collapsing its columns. */}
          {!!entry.pricingTable?.length && (
            <section id="pricing" className="my-10 scroll-mt-24">
              <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-normal">
                {entry.competitorName} Alternatives: Key Features and Pricing
              </h2>

              <p className="text-sm font-semibold text-slate-700 mb-2">Pricing and best fit</p>
              <div className="overflow-x-auto rounded-2xl border border-slate-200/80 mb-6">
                <table className="text-sm border-collapse" style={{ minWidth: 640 }}>
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      <th className="px-4 py-3 font-semibold text-slate-700 whitespace-nowrap w-40">Platform</th>
                      <th className="px-4 py-3 font-semibold text-slate-700 whitespace-nowrap w-48">Starting price</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">Best suited for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entry.pricingTable.map((row, i) => (
                      <tr key={row.platform} className={row.platform === "GeoRankers" ? "bg-blue-50/60" : i % 2 === 1 ? "bg-slate-50/50" : undefined}>
                        <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap align-top">{row.platform}</td>
                        <td className="px-4 py-3 text-slate-600 align-top">{row.startingPrice}</td>
                        <td className="px-4 py-3 text-slate-600 align-top">{row.bestSuited}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-sm font-semibold text-slate-700 mb-2">Visibility and content</p>
              <div className="overflow-x-auto rounded-2xl border border-slate-200/80 mb-6">
                <table className="text-sm border-collapse" style={{ minWidth: 900 }}>
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      <th className="px-4 py-3 font-semibold text-slate-700 whitespace-nowrap w-40">Platform</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">Visibility &amp; competitors</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">Citation intelligence</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">Content workflow</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entry.pricingTable.map((row, i) => (
                      <tr key={row.platform} className={row.platform === "GeoRankers" ? "bg-blue-50/60" : i % 2 === 1 ? "bg-slate-50/50" : undefined}>
                        <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap align-top">{row.platform}</td>
                        <td className="px-4 py-3 text-slate-600 align-top">{row.visibility}</td>
                        <td className="px-4 py-3 text-slate-600 align-top">{row.citation}</td>
                        <td className="px-4 py-3 text-slate-600 align-top">{row.content}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-sm font-semibold text-slate-700 mb-2">{entry.pricingSentimentLabel ?? "Sentiment"}, geography and post-action workflow</p>
              <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
                <table className="text-sm border-collapse" style={{ minWidth: 900 }}>
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      <th className="px-4 py-3 font-semibold text-slate-700 whitespace-nowrap w-40">Platform</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">{entry.pricingSentimentLabel ?? "Sentiment & perception"}</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">Geography</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">Post-action workflow</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entry.pricingTable.map((row, i) => (
                      <tr key={row.platform} className={row.platform === "GeoRankers" ? "bg-blue-50/60" : i % 2 === 1 ? "bg-slate-50/50" : undefined}>
                        <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap align-top">{row.platform}</td>
                        <td className="px-4 py-3 text-slate-600 align-top">{row.sentiment}</td>
                        <td className="px-4 py-3 text-slate-600 align-top">{row.geography}</td>
                        <td className="px-4 py-3 text-slate-600 align-top">{row.postAction}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {entry.pricingNote && (
                <p className="text-xs text-slate-400 mt-2">*{entry.pricingNote}</p>
              )}
            </section>
          )}

          {/* How to read this comparison */}
          {!!entry.howToRead?.length && (
            <section id="how-to-read" className="my-10 scroll-mt-24">
              <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-normal">How to Read This Comparison</h2>
              {entry.howToRead.map((para, i) => (
                <p key={i} className="text-slate-600 leading-relaxed mb-4 last:mb-0">{para}</p>
              ))}
            </section>
          )}

          {/* Which alternative is right for you */}
          {entry.whichIsRight && (
            <section id="which-is-right" className="my-10 scroll-mt-24">
              <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-normal">
                Which {entry.competitorName} Alternative Is Right for You?
              </h2>
              {entry.whichIsRight.intro && (
                <p className="text-slate-600 leading-relaxed mb-4">{entry.whichIsRight.intro}</p>
              )}
              <ul className="space-y-3 mb-4">
                {entry.whichIsRight.picks.map((pick) => (
                  <li key={pick.name} className="text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-900">Choose {pick.name} if </span>
                    {pick.reason}
                  </li>
                ))}
              </ul>
              {entry.whichIsRight.closing?.map((para, i) => (
                <p key={i} className="text-slate-600 leading-relaxed mb-4 last:mb-0">{para}</p>
              ))}
            </section>
          )}

          {/* Legacy simple sections, used only by an entry without the full roundup above */}
          {!hasRoundup && entry.whyTeamsSwitch && (
            <section className="my-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-normal">Why Teams Choose GeoRankers</h2>
              <p className="text-slate-600 leading-relaxed">{entry.whyTeamsSwitch}</p>
            </section>
          )}

          {/* CTA */}
          <section className="gradient-cta my-10 rounded-[1.5rem] p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3 tracking-normal">
              {entry.ctaHeading ?? "See how GeoRankers tracks your AI search visibility"}
            </h2>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              Track brand visibility, competitors, citations and sentiment across ChatGPT, Google AI Search, and Perplexity.
            </p>
            <a
              href="https://dashboard.georankers.co/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Try GeoRankers Free <ArrowRight className="w-4 h-4" />
            </a>
          </section>

          {/* FAQ — matches /geo-guide exactly: centered heading, plain
              always-open Q/A blocks, no accordion. */}
          {!!entry.faq?.length && (
            <section id="faq" className="my-10 scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center tracking-normal">Frequently Asked Questions</h2>
              {entry.faq.map((faq, index) => (
                <div key={index} className="mb-6 border border-slate-200 rounded-xl overflow-hidden">
                  <h3 className="text-lg font-semibold text-slate-900 bg-slate-50 px-6 py-4 m-0 tracking-normal">{faq.question}</h3>
                  <p className="px-6 py-4 text-slate-700 leading-relaxed m-0">{faq.answer}</p>
                </div>
              ))}
            </section>
          )}
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
