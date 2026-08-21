import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Search, Mail } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  GLOSSARY_CATEGORIES,
  GLOSSARY_META_DESCRIPTION,
  glossaryTerms,
  toDefinedTermSetSchema,
} from "@/data/geo-glossary";

export default function GeoGlossary() {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  useSEO({
    title: "AI Search & GEO Glossary: Key Terms | GeoRankers",
    description: GLOSSARY_META_DESCRIPTION,
    canonical: "https://georankers.ai/geo-glossary",
    ogTitle: "AI Search & GEO Glossary: Key Terms Explained",
    ogDescription: GLOSSARY_META_DESCRIPTION,
    ogUrl: "https://georankers.ai/geo-glossary",
    schemaId: "geo-glossary-schema",
    schema: toDefinedTermSetSchema(glossaryTerms),
  });

  // Standalone BreadcrumbList — check-before-create prevents duplication on prerender + hydration
  // TODO: cross-link to the standalone FAQ hub once it's built.
  useEffect(() => {
    const ID = "geo-glossary-breadcrumb-schema";
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
        { "@type": "ListItem", "position": 2, "name": "AI Search & GEO Glossary", "item": "https://georankers.ai/geo-glossary" },
      ],
    });
    return () => { el?.remove(); };
  }, []);

  const termsBySlug = useMemo(() => {
    const map = new Map<string, (typeof glossaryTerms)[number]>();
    glossaryTerms.forEach((t) => map.set(t.slug, t));
    return map;
  }, []);

  const letters = useMemo(() => {
    const set = new Set(glossaryTerms.map((t) => t.term[0].toUpperCase()));
    return Array.from(set).sort();
  }, []);

  const filteredByCategory = useMemo(() => {
    const q = search.trim().toLowerCase();
    let terms = q
      ? glossaryTerms.filter(
          (t) =>
            t.term.toLowerCase().includes(q) ||
            t.definition.toLowerCase().includes(q)
        )
      : glossaryTerms;

    if (activeLetter) {
      terms = terms.filter((t) => t.term[0].toUpperCase() === activeLetter);
    }

    return GLOSSARY_CATEGORIES.map((cat) => ({
      ...cat,
      terms: terms.filter((t) => t.category === cat.id),
    })).filter((cat) => cat.terms.length > 0);
  }, [search, activeLetter]);

  const totalMatches = filteredByCategory.reduce((n, c) => n + c.terms.length, 0);
  const isFiltering = Boolean(search || activeLetter);

  const selectLetter = (letter: string) => {
    setSearch("");
    setActiveLetter((prev) => (prev === letter ? null : letter));
  };

  // Clears any active search/letter filter (so the target term is actually rendered)
  // before scrolling to it — otherwise a "See also" link can point at an id that
  // doesn't exist in the DOM because the filtered view has hidden that term.
  const jumpToTerm = (slug: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const scroll = () => {
      document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${slug}`);
    };
    if (search || activeLetter) {
      setSearch("");
      setActiveLetter(null);
      requestAnimationFrame(() => requestAnimationFrame(scroll));
    } else {
      scroll();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content">

        {/* Hero */}
        <section className="relative pt-32 pb-14 sm:pt-36 sm:pb-20 overflow-hidden">
          <div className="hero-gradient absolute inset-0 z-0"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <p className="text-sm text-blue-600 font-semibold mb-4 uppercase tracking-widest">Glossary</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-[1.1]">
              AI Search &amp;{" "}
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                GEO Glossary
              </span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              AI search comes with a whole new vocabulary. This glossary cuts through the jargon and gives
              practical explanations of the terms shaping how brands are discovered, understood, and
              recommended by AI.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search terms or definitions..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (e.target.value) setActiveLetter(null);
                }}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm shadow-md"
                data-testid="input-glossary-search"
              />
            </div>
          </div>
        </section>

        {/* Alphabet filter — hidden while text-searching */}
        {!search && (
          <div className="border-y border-slate-200 bg-white sticky top-16 z-30">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-center gap-1">
              {letters.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => selectLetter(letter)}
                  aria-pressed={activeLetter === letter}
                  className={`w-7 h-7 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                    activeLetter === letter
                      ? "bg-blue-600 text-white"
                      : "text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                  data-testid={`link-letter-${letter}`}
                >
                  {letter}
                </button>
              ))}
              {activeLetter && (
                <button
                  type="button"
                  onClick={() => setActiveLetter(null)}
                  className="ml-2 text-xs font-medium text-blue-600 hover:text-blue-800 underline"
                  data-testid="button-clear-letter"
                >
                  Show all
                </button>
              )}
            </div>
          </div>
        )}

        {/* Term content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-14">
          {totalMatches === 0 && (
            <div className="text-center py-16 text-slate-400 text-sm">
              {search
                ? <>No terms found for "<span className="font-medium text-slate-600">{search}</span>". Try a different keyword.</>
                : <>No terms start with "<span className="font-medium text-slate-600">{activeLetter}</span>".</>}
            </div>
          )}

          {filteredByCategory.map((cat) => (
            <section key={cat.id} id={cat.id} className="scroll-mt-32">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-blue-100">
                {cat.title}
              </h2>
              <div className="space-y-8">
                {cat.terms.map((t) => {
                  return (
                    <div
                      key={t.slug}
                      id={t.slug}
                      className="scroll-mt-32"
                    >
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        <a href={`#${t.slug}`} onClick={jumpToTerm(t.slug)} className="hover:text-blue-600 transition-colors">
                          {t.term}
                        </a>
                      </h3>
                      <p className="text-slate-600 leading-relaxed">{t.definition}</p>
                      {t.seeAlso && t.seeAlso.length > 0 && (
                        <p className="text-sm text-slate-400 mt-2">
                          See also:{" "}
                          {t.seeAlso.map((slug, i) => {
                            const related = termsBySlug.get(slug);
                            if (!related) return null;
                            return (
                              <span key={slug}>
                                <a href={`#${slug}`} onClick={jumpToTerm(slug)} className="text-blue-600 hover:text-blue-800 underline">
                                  {related.term}
                                </a>
                                {i < t.seeAlso!.length - 1 ? ", " : ""}
                              </span>
                            );
                          })}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          {/* Have a term to suggest CTA */}
          {!isFiltering && (
            <div className="bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100 rounded-2xl p-8 text-center">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">
                Have a term you would like defined here?
              </h2>
              <p className="text-slate-500 text-sm mb-7 max-w-md mx-auto">
                Let us know and we will add it. You can also see how GeoRankers tracks these terms in
                practice on our{" "}
                <Link href="/geo-guide" className="text-blue-600 hover:text-blue-800 underline">
                  GEO Playbook
                </Link>
                .
              </p>
              <a
                href="mailto:support@georankers.co"
                className="inline-flex items-center gradient-cta hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg no-underline"
                data-testid="cta-suggest-term"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact support@georankers.co
              </a>
            </div>
          )}
        </div>

      </main>
      <Footer />
    </div>
  );
}
