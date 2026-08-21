import { Link } from "wouter";
import { Mail } from "lucide-react";
import { SiLinkedin, SiFacebook, SiX } from "react-icons/si";
import { LISTINGS } from "@/data/listings";

export default function Footer() {
  return (
    <footer className="py-12 sm:py-14 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 mb-12">
          {/* Brand */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                <img src="/georankers-icon.png" alt="GeoRankers icon" className="w-full h-full object-cover scale-[1.5] origin-center" loading="lazy" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">GeoRankers</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              AI Search Visibility Platform for B2B SaaS Teams
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/georankers/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GeoRankers on LinkedIn"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <SiLinkedin aria-hidden="true" className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://x.com/georankers"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GeoRankers on X"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <SiX aria-hidden="true" className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.facebook.com/people/GeoRankers/61588912087425/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GeoRankers on Facebook"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <SiFacebook aria-hidden="true" className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {/* Company */}
            <div>
              <p className="text-xs font-black text-blue-200/70 uppercase tracking-widest mb-4">Company</p>
              <div className="space-y-3">
                <a
                  href="/team"
                  className="block text-white/80 hover:text-white text-sm transition-colors"
                >
                  About Us
                </a>
                <Link
                  href="/pricing"
                  className="block text-white/80 hover:text-white text-sm transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/recognition"
                  className="block text-white/80 hover:text-white text-sm transition-colors"
                >
                  Recognition
                </Link>
                <a
                  href="https://dashboard.georankers.co/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/80 hover:text-white text-sm transition-colors"
                >
                  Try for Free
                </a>
                <a
                  href="https://calendly.com/hello-georankers/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/80 hover:text-white text-sm transition-colors"
                >
                  Book a Demo
                </a>

              </div>
            </div>

            {/* Resources */}
            <div>
              <p className="text-xs font-black text-blue-200/70 uppercase tracking-widest mb-4">Resources</p>
              <div className="space-y-3">
                <a href="https://blog.georankers.ai/" className="block text-white/80 hover:text-white text-sm transition-colors">
                  Blog
                </a>
                <Link href="/geo-guide" className="block text-white/80 hover:text-white text-sm transition-colors">
                  The GEO Playbook
                </Link>
                <Link href="/ai-content-guide" className="block text-white/80 hover:text-white text-sm transition-colors">
                  AI Content Guide
                </Link>
                <Link href="/geo-glossary" className="block text-white/80 hover:text-white text-sm transition-colors">
                  AI Search &amp; GEO Glossary
                </Link>
                <Link href="/help" className="block text-white/80 hover:text-white text-sm transition-colors">
                  Help Docs
                </Link>
                <Link href="/changelog" className="block text-white/80 hover:text-white text-sm transition-colors">
                  Changelog
                </Link>
              </div>
            </div>

            {/* Free GEO Tools */}
            <div>
              <p className="text-xs font-black text-blue-200/70 uppercase tracking-widest mb-4">Free GEO Tools</p>
              <div className="space-y-3">
                <Link href="/free-geo-tools/brand-visibility" className="block text-white/80 hover:text-white text-sm transition-colors">
                  AI Brand Snapshot
                </Link>
                <Link href="/free-geo-tools/geo-audit" className="block text-white/80 hover:text-white text-sm transition-colors">
                  GEO Content Audit
                </Link>
                <Link href="/free-geo-tools/visibility-score" className="block text-white/80 hover:text-white text-sm transition-colors">
                  AI Query Opportunities
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs font-black text-blue-200/70 uppercase tracking-widest mb-4">Contact</p>
              <a
                href="mailto:hello@georankers.co"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm group"
              >
                <Mail className="w-4 h-4 mr-2 text-blue-200/70 group-hover:text-white transition-colors" />
                hello@georankers.co
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-blue-200/60 text-xs order-3 lg:order-1">
            © {new Date().getFullYear()} GeoRankers. All rights reserved.
          </p>

          {/* Recognized by — DPIIT + any listing that specifically asked for homepage
              placement (Footer renders on every page, so this satisfies that). Every
              badge gets the same neutral white plate regardless of its own native
              design, so the row reads as one consistent shelf rather than mismatched
              chips. */}
          <div className="flex flex-wrap items-center justify-center gap-2 order-1 lg:order-2">
            <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mr-1">Recognized by</span>
            <Link href="/recognition" className="inline-flex items-center justify-center bg-white rounded-md w-28 h-10 p-1">
              <img src="/startup-india.png" alt="DPIIT Startup India" className="max-h-full max-w-full object-contain block" loading="lazy" />
            </Link>
            {LISTINGS.filter((l) => l.featuredBadge).map((listing) => (
              <a
                key={listing.name}
                href={listing.href}
                target="_blank"
                rel="noopener"
                aria-label={`GeoRankers on ${listing.name}`}
                className="inline-flex items-center justify-center bg-white rounded-md w-28 h-10 p-1"
              >
                <img
                  src={listing.badgeSrc}
                  width={listing.badgeWidth}
                  height={listing.badgeHeight}
                  alt={`${listing.name} badge`}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain block"
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6 order-2 lg:order-3">
            <Link href="/terms" className="text-blue-200/60 hover:text-white text-xs transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="text-blue-200/60 hover:text-white text-xs transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
