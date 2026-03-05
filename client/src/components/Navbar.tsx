import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold hover:scale-105 transition-transform duration-200">
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                GeoRankers
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/website-analysis" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium" data-testid="link-website-analysis">
              Website AI Audit
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
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium flex items-center"
                data-testid="dropdown-resources"
              >
                Resources
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  <a 
                    href="https://blog.georankers.co/" 
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    data-testid="link-blog"
                  >
                    Blog
                  </a>
                  <Link 
                    href="/geo-guide" 
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    data-testid="link-geo-guide"
                  >
                    GEO Guide
                  </Link>
                  <a 
                    href="/#faq" 
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    data-testid="link-faq"
                  >
                    FAQ
                  </a>
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
              href="https://calendly.com/georankers/demo"
              className="border border-blue-500 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              data-testid="cta-book-demo-nav"
            >
              Book a Demo
            </a>
            <a 
              href="https://dashboard.georankers.co/register"
              className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              data-testid="cta-try-free-nav"
            >
              Try for Free
            </a>
          </div>
          
          <div className="md:hidden flex items-center space-x-3">
            <a 
              href="https://dashboard.georankers.co/login"
              className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
              data-testid="link-login-mobile"
            >
              Login
            </a>
            <a 
              href="https://calendly.com/georankers/demo"
              className="border border-blue-500 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              data-testid="cta-book-demo-mobile"
            >
              Demo
            </a>
            <a 
              href="https://dashboard.georankers.co/register"
              className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
              data-testid="cta-try-free-mobile"
            >
              Try for Free
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-blue-600 p-2"
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
            <Link 
              href="/website-analysis" 
              className="block text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-link-website-analysis"
            >
              Website AI Audit
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
              >
                Resources
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {resourcesOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  <a 
                    href="https://blog.georankers.co/" 
                    className="block text-slate-500 hover:text-blue-600 transition-colors duration-200 text-sm py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog
                  </a>
                  <Link 
                    href="/geo-guide" 
                    className="block text-slate-500 hover:text-blue-600 transition-colors duration-200 text-sm py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    GEO Guide
                  </Link>
                  <a 
                    href="/#faq" 
                    className="block text-slate-500 hover:text-blue-600 transition-colors duration-200 text-sm py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    FAQ
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
