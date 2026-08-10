import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { changelogEntries, TAG_STYLES, type ChangelogTag } from "@/data/changelog";

const CHANGELOG_META_DESCRIPTION =
  "Product updates, new features, and improvements shipped to GeoRankers — see what's new in AI search visibility tracking.";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatMonthYear(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function Changelog() {
  useSEO({
    title: "Changelog | GeoRankers",
    description: CHANGELOG_META_DESCRIPTION,
    canonical: "https://georankers.ai/changelog",
    ogTitle: "GeoRankers Changelog",
    ogDescription: CHANGELOG_META_DESCRIPTION,
    ogUrl: "https://georankers.ai/changelog",
  });

  // Standalone BreadcrumbList — check-before-create prevents duplication on prerender + hydration
  useEffect(() => {
    const ID = "changelog-breadcrumb-schema";
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
        { "@type": "ListItem", "position": 2, "name": "Changelog", "item": "https://georankers.ai/changelog" },
      ],
    });
    return () => { el?.remove(); };
  }, []);

  const [activeTag, setActiveTag] = useState<ChangelogTag | null>(null);

  const sorted = [...changelogEntries].sort((a, b) => (a.date < b.date ? 1 : -1));

  // Only offer tags that actually appear on at least one entry — avoids a
  // filter row full of dead buttons as the tag set grows over time.
  const availableTags = useMemo(() => {
    const set = new Set<ChangelogTag>();
    changelogEntries.forEach((e) => e.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  const filtered = activeTag ? sorted.filter((e) => e.tags.includes(activeTag)) : sorted;

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
            <p className="text-sm text-blue-600 font-semibold mb-4 uppercase tracking-widest">Changelog</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-[1.1]">
              What's New in{" "}
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                GeoRankers
              </span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              New features, improvements, and fixes we ship to help you track and improve your brand's
              visibility in AI search.
            </p>
          </div>
        </section>

        {/* Tag filter */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-10">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              aria-pressed={activeTag === null}
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                activeTag === null
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
              data-testid="button-filter-all"
            >
              ALL
            </button>
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag((prev) => (prev === tag ? null : tag))}
                aria-pressed={activeTag === tag}
                className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-all ${TAG_STYLES[tag]} ${
                  activeTag === tag ? "ring-2 ring-offset-1 ring-blue-400" : "opacity-70 hover:opacity-100"
                }`}
                data-testid={`button-filter-${tag.toLowerCase()}`}
              >
                {tag.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400 text-sm">
              No updates tagged "<span className="font-medium text-slate-600">{activeTag}</span>" yet.
            </div>
          )}
          <div className="space-y-10">
            {filtered.map((entry) => (
              <Link
                key={entry.slug}
                href={`/changelog/${entry.slug}`}
                className="group grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-3 sm:gap-8"
                data-testid={`link-changelog-${entry.slug}`}
              >
                <div className="text-sm font-medium text-slate-400 pt-1">{formatDate(entry.date)}</div>

                <div className="rounded-[1.5rem] border border-slate-200/80 bg-white overflow-hidden transition-all duration-300 group-hover:border-blue-200 group-hover:shadow-lg group-hover:shadow-blue-100/60">
                  {/* Generated release banner — no screenshot needed, so it's guaranteed
                      consistent every month regardless of what images exist. The heading
                      is a fixed recurring label (not the entry's own title), so it doesn't
                      just repeat information the card already states below. */}
                  <div className="relative h-36 overflow-hidden bg-gradient-to-br from-blue-600 to-violet-600 px-6 py-5 flex flex-col justify-center">
                    {/* dot-pattern + blur-orb decoration */}
                    <div className="absolute top-4 right-4 grid grid-cols-6 gap-1.5 opacity-30">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <span key={i} className="w-1 h-1 rounded-full bg-white" />
                      ))}
                    </div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

                    <p className="relative text-white font-extrabold text-lg leading-snug max-w-[75%]">
                      Monthly Product <span className="text-amber-300">Release Notes</span>
                    </p>
                    <div className="relative mt-3 inline-flex w-fit bg-white text-slate-900 text-sm font-bold px-3.5 py-1 rounded-lg">
                      {formatMonthYear(entry.date)}
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {entry.cardHeadline ?? entry.title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-4">{entry.summary}</p>

                    <div className="flex flex-wrap items-center gap-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TAG_STYLES[tag]}`}
                        >
                          {tag.toUpperCase()}
                        </span>
                      ))}
                      <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read more <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
