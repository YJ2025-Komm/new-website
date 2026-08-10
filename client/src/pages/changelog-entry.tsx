import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "@/pages/not-found";
import { changelogEntries, TAG_STYLES } from "@/data/changelog";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ChangelogEntry() {
  const { slug } = useParams<{ slug: string }>();
  const entry = changelogEntries.find((e) => e.slug === slug);
  const canonical = `https://georankers.ai/changelog/${slug ?? ""}`;

  // Hooks must run unconditionally on every render (Rules of Hooks) — the
  // "entry not found" case is handled in the JSX below, not via early return.
  useSEO({
    title: entry ? `${entry.title} | GeoRankers Changelog` : "Changelog | GeoRankers",
    description: entry?.summary ?? "GeoRankers changelog entry.",
    canonical,
    ogTitle: entry?.title,
    ogDescription: entry?.summary,
    ogUrl: canonical,
    schemaId: entry ? "changelog-entry-schema" : undefined,
    schema: entry
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": entry.title,
          "description": entry.summary,
          "image": entry.image ? `https://georankers.ai${entry.image}` : "https://georankers.ai/og-image.png",
          "datePublished": entry.date,
          "dateModified": entry.date,
          "author": { "@type": "Organization", "name": "GeoRankers", "url": "https://georankers.ai" },
          "publisher": {
            "@type": "Organization",
            "name": "GeoRankers",
            "url": "https://georankers.ai",
            "logo": { "@type": "ImageObject", "url": "https://georankers.ai/og-image.png" },
          },
          "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
        }
      : undefined,
  });

  // Standalone BreadcrumbList — check-before-create prevents duplication on prerender + hydration
  useEffect(() => {
    if (!entry) return;
    const ID = "changelog-entry-breadcrumb-schema";
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
        { "@type": "ListItem", "position": 3, "name": entry.title, "item": canonical },
      ],
    });
    return () => { el?.remove(); };
  }, [entry, canonical]);

  if (!entry) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-14 overflow-hidden">
          <div className="hero-gradient absolute inset-0 z-0"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

          {/* Mirrors the body's exact max-w-5xl > max-w-4xl nesting and padding below
              (not just the same max-width value) — nesting two nested centered boxes
              with different padding can still land the inner content a few pixels off
              from an independently-built container at the "same" width. Matching the
              structure exactly guarantees the back link/tags/title/byline share a left
              edge with the intro paragraph directly underneath them. */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/changelog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-6"
                data-testid="link-back-to-changelog"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to All Updates
              </Link>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TAG_STYLES[tag]}`}
                  >
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-[1.1]">
                <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                  {entry.title}
                </span>
              </h1>
              <p className="text-sm text-slate-500">
                By GeoRankers Team · Updated on {formatDate(entry.date)}
              </p>
            </div>
          </div>
        </section>

        {/* Body — the outer column is wider than the text itself so screenshots can
            render bigger than prose width allows. Guardrail: a screenshot's text
            must stay legible at default size, not just "fit in a box". Keeping
            paragraphs/headings in an inner max-w-4xl wrapper preserves comfortable
            reading width while images use the full max-w-5xl column — close enough
            that the two columns don't jump jarringly in width against each other. */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-slate-600 leading-relaxed mb-12">{entry.intro}</p>
          </div>

          <div className="space-y-14">
            {entry.sections.map((section) => (
              <section key={section.heading}>
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-100">
                    {section.heading}
                  </h2>
                  <div className="text-slate-600 leading-relaxed">{section.body}</div>
                </div>
                {section.images?.map((img, i) => (
                  // Consistent card (background/border/padding), but NOT a fixed
                  // height — screenshots range from wide full-dashboard views to
                  // tall narrow panel crops, and forcing them into one box height
                  // shrinks the narrow ones down to near-illegible. Capping only
                  // max-height (not height) lets each image keep its own aspect
                  // ratio at a readable size instead of being squashed to fit.
                  // Sections with two images (a "where to find it" nav shot
                  // followed by the feature itself) render in array order.
                  <div
                    key={img.src}
                    className={`flex justify-center rounded-[1.5rem] border border-blue-200 bg-gradient-to-br from-blue-100 to-violet-100 shadow-lg shadow-blue-100/60 p-4 sm:p-6 ${
                      i === 0 ? "mt-6" : "mt-4"
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="max-w-full max-h-[36rem] w-auto h-auto object-contain rounded-lg"
                    />
                  </div>
                ))}
              </section>
            ))}
          </div>

          {entry.cta && (
            // No card/background — just the closing text and the button itself
            // as the only "box" on the page.
            <div className="mt-16 text-center">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">
                Ready to explore these updates?
              </h2>
              <p className="text-slate-500 text-base mb-6 max-w-md mx-auto">
                Dive into your dashboard to start using the latest features and improvements we
                added to GeoRankers.
              </p>
              <a
                href={entry.cta.href}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-semibold px-6 py-3 rounded-full hover:shadow-lg hover:shadow-blue-200/60 transition-shadow"
                data-testid="link-changelog-cta"
              >
                {entry.cta.label} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
