import { Link } from "wouter";
import { Mail } from "lucide-react";
import { SiLinkedin } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="py-12 sm:py-14 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                <img src="/georankers-icon.png" alt="GeoRankers icon" className="w-full h-full object-cover scale-[1.5] origin-center" loading="lazy" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">GeoRankers</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              AI Search Visibility Platform for B2B SaaS Teams
            </p>
            <a
              href="https://www.linkedin.com/company/georankers/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <SiLinkedin className="w-5 h-5 text-white" />
            </a>

            <div className="mt-6">
              <p className="text-xs font-semibold text-white/60 mb-2">Recognized by</p>
              <div className="inline-block bg-white rounded-md px-3 py-1.5">
                <img
                  src="/startup-india.png"
                  alt="DPIIT Startup India"
                  className="h-12 w-auto block"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-black text-blue-200/70 uppercase tracking-widest mb-4">Company</p>
            <div className="space-y-3">
              <Link href="/team" className="block text-white/80 hover:text-white text-sm transition-colors">
                About Us
              </Link>
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
              <a href="https://blog.georankers.co/" className="block text-white/80 hover:text-white text-sm transition-colors">
                Blog
              </a>
              <Link href="/geo-guide" className="block text-white/80 hover:text-white text-sm transition-colors">
                GEO Guide
              </Link>
              <Link href="/help" className="block text-white/80 hover:text-white text-sm transition-colors">
                Help Docs
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

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-blue-200/60 text-xs">
            © {new Date().getFullYear()} GeoRankers. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-blue-200/60 hover:text-white text-xs transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="text-blue-200/60 hover:text-white text-xs transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
