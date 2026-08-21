import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-medium">
      Skip to main content
    </a>
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
              <div className="h-9 w-9 rounded-md overflow-hidden flex-shrink-0">
                <img src="/georankers-icon.png" alt="GeoRankers icon" width={128} height={85} className="w-full h-full object-cover scale-[1.5] origin-center" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                GeoRankers
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium" data-testid="link-home">
              Home
            </Link>
            <Link href="/features" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
              Features
            </Link>
            <Link href="/pricing" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium" data-testid="link-pricing">
              Pricing
            </Link>
            <div className="relative">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                onBlur={() => setTimeout(() => setResourcesOpen(false), 150)}
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-expanded={resourcesOpen}
                aria-haspopup="true"
                data-testid="dropdown-resources"
              >
                Resources
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  <a
                    href="https://blog.georankers.ai/"
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    data-testid="link-blog"
                  >
                    Blog
                  </a>
                  <div className="mx-4 my-1.5 border-t border-slate-100" />
                  <p className="px-4 pt-1 pb-0.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Guides</p>
                  <Link
                    href="/geo-guide"
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    data-testid="link-geo-guide"
                  >
                    The GEO Playbook
                  </Link>
                  <Link
                    href="/ai-content-guide"
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    data-testid="link-ai-content-guide"
                  >
                    AI Content Guide
                  </Link>
                  <div className="mx-4 my-1.5 border-t border-slate-100" />
                  <Link
                    href="/geo-glossary"
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    data-testid="link-geo-glossary"
                  >
                    AI Search &amp; GEO Glossary
                  </Link>
                  <Link
                    href="/help"
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    data-testid="link-help"
                  >
                    Help Docs
                  </Link>
                </div>
              )}
            </div>
            <a
              href="https://dashboard.georankers.co/login"
              className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
              data-testid="link-login-nav"
            >
              Login
            </a>
            <a
              href="https://calendly.com/hello-georankers/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-blue-500 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              data-testid="cta-book-demo-nav"
            >
              Book a Demo
            </a>
            <a 
              href="https://dashboard.georankers.co/register"
              className="gradient-cta hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              data-testid="cta-try-free-nav"
            >
              Try for Free
            </a>
          </div>
          
          <div className="md:hidden flex items-center space-x-2">
            <a
              href="https://calendly.com/hello-georankers/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-blue-500 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              data-testid="cta-book-demo-mobile"
            >
              Demo
            </a>
            <a 
              href="https://dashboard.georankers.co/register"
              className="gradient-cta hover:opacity-90 text-white px-3 py-1.5 rounded-lg text-xs font-medium"
              data-testid="cta-try-free-mobile"
            >
              Try Free
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-blue-600 p-2"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4">
          <div className="space-y-3">
            <a 
              href="https://dashboard.georankers.co/login"
              className="block text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-link-login"
            >
              Login
            </a>
            <Link
              href="/"
              className="block text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-link-home"
            >
              Home
            </Link>
            <Link
              href="/features"
              className="block text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="block text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-link-pricing"
            >
              Pricing
            </Link>
            <div>
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="w-full text-left text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium py-2 flex items-center justify-between"
                aria-expanded={resourcesOpen}
                aria-haspopup="true"
              >
                Resources
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {resourcesOpen && (
                <div className="pl-4 space-y-1 mt-2">
                  <a
                    href="https://blog.georankers.ai/"
                    className="block text-slate-500 hover:text-blue-600 transition-colors duration-200 text-sm py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog
                  </a>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-2 pb-0.5">Guides</p>
                  <Link
                    href="/geo-guide"
                    className="block text-slate-500 hover:text-blue-600 transition-colors duration-200 text-sm py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    The GEO Playbook
                  </Link>
                  <Link
                    href="/ai-content-guide"
                    className="block text-slate-500 hover:text-blue-600 transition-colors duration-200 text-sm py-1"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-link-ai-content-guide"
                  >
                    AI Content Guide
                  </Link>
                  <Link
                    href="/geo-glossary"
                    className="block text-slate-500 hover:text-blue-600 transition-colors duration-200 text-sm py-1 mt-1"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-link-geo-glossary"
                  >
                    AI Search &amp; GEO Glossary
                  </Link>
                  <Link
                    href="/help"
                    className="block text-slate-500 hover:text-blue-600 transition-colors duration-200 text-sm py-1"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="mobile-link-help"
                  >
                    Help Docs
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
    </>
  );
}
