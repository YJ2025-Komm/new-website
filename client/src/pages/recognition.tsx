import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { LISTINGS } from "@/data/listings";

export default function Recognition() {
  useSEO({
    title: "Recognition — GeoRankers Directory Listings & Badges",
    description:
      "Where GeoRankers, the AI search visibility platform, is listed and featured — verified profiles across product and software directories.",
    canonical: "https://georankers.ai/recognition",
    ogTitle: "Recognition — GeoRankers Directory Listings",
    ogDescription:
      "Verified profiles and badges for GeoRankers across product and software discovery directories.",
    ogUrl: "https://georankers.ai/recognition",
    schemaId: "recognition-schema",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "GeoRankers Recognition",
      "url": "https://georankers.ai/recognition",
      "description": "Directory and platform listings where GeoRankers is featured.",
      "isPartOf": { "@type": "WebSite", "url": "https://georankers.ai" },
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": LISTINGS.map((listing, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": listing.name,
          "description": listing.description,
          "url": listing.href,
        })),
      },
    },
  });

  // Standalone BreadcrumbList — check-before-create prevents duplication on prerender + hydration
  useEffect(() => {
    const ID = "recognition-breadcrumb-schema";
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
        { "@type": "ListItem", "position": 2, "name": "Recognition", "item": "https://georankers.ai/recognition" },
      ],
    });
    return () => { el?.remove(); };
  }, []);

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
            <p className="text-sm text-blue-600 font-semibold mb-4 uppercase tracking-widest">Recognition</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-[1.1]">
              Where GeoRankers Is{" "}
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                Listed
              </span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Find GeoRankers on trusted software directories and review platforms where B2B SaaS
              teams evaluate and compare AI search visibility tools.
            </p>
          </div>
        </section>

        {/* Listings grid */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {LISTINGS.map((listing) => (
              <a
                key={listing.name}
                href={listing.href}
                target="_blank"
                rel="noopener"
                className="group rounded-[1.5rem] border border-slate-200/80 bg-white overflow-hidden transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/60 flex flex-col"
                data-testid={`link-listing-${listing.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <div className="h-28 flex items-center justify-center bg-gradient-to-br from-blue-50 to-violet-50 px-6">
                  <img
                    src={listing.badgeSrc}
                    width={listing.badgeWidth}
                    height={listing.badgeHeight}
                    alt={`${listing.name} badge`}
                    loading="lazy"
                    className="h-10 w-auto max-w-full object-contain"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {listing.name}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{listing.description}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                    View our {listing.name} profile
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
