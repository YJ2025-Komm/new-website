import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertWaitlistEntrySchema, type InsertWaitlistEntry } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  Rocket,
  Loader2,
  CheckCircle,
  ChevronDown,
  Menu,
  X
} from "lucide-react";

export default function Waitlist() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertWaitlistEntry>({
    resolver: zodResolver(insertWaitlistEntrySchema),
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      challenge: "",
    },
  });

  const waitlistMutation = useMutation({
    mutationFn: async (data: InsertWaitlistEntry) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      form.reset();
      toast({
        title: "Welcome to the waitlist!",
        description: "We'll notify you as soon as GeoRankers is ready for you.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to join waitlist. Please try again.",
      });
    },
  });

  const onSubmit = (data: InsertWaitlistEntry) => {
    waitlistMutation.mutate(data);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    document.title = "Join the Waitlist | GeoRankers - AI Search Optimization Platform";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Join the GeoRankers waitlist and be among the first to take control of your AI search presence. Get early access to our AI search optimization platform.");
    }
  }, []);

  return (
    <div className="min-h-screen text-slate-900 overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold hover:scale-105 transition-transform duration-200 cursor-pointer">
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  GeoRankers
                </span>
              </Link>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/website-analysis" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium" data-testid="link-website-analysis">
                Website AI Audit
              </Link>
              <a href="/#features" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Features
              </a>
              {/* Resources Dropdown */}
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
              {/* Try for Free CTA */}
              <a 
                href="https://dashboard.georankers.co/register"
                className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                data-testid="cta-try-free-nav"
              >
                Try for Free
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
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
        
        {/* Mobile Menu Dropdown */}
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
              <a 
                href="/#features" 
                className="block text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              {/* Mobile Resources Collapsible */}
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

      {/* Waitlist Section */}
      <section className="pt-24 pb-12 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/20 to-indigo-50/30 min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto w-full">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Join the <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Waitlist</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600">
              Be among the first to take control of your AI search presence
            </p>
          </div>
          
          <Card className="glass-strong rounded-3xl p-4 sm:p-8 lg:p-12 border-0">
            <CardContent className="pt-0">
              {showSuccess ? (
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-4 sm:p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-green-400 mb-2">Welcome to the waitlist!</h3>
                  <p className="text-sm sm:text-base text-slate-600">We'll notify you as soon as GeoRankers is ready for you.</p>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6" data-testid="waitlist-form">
                  <div>
                    <Label htmlFor="fullName" className="block text-sm font-medium text-slate-600 mb-2">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      {...form.register("fullName")}
                      placeholder="Enter your full name"
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/80 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm text-sm sm:text-base"
                      data-testid="input-fullname"
                    />
                    {form.formState.errors.fullName && (
                      <p className="text-red-400 text-sm mt-2">
                        <span className="mr-1">⚠</span>
                        {form.formState.errors.fullName.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-2">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      placeholder="Enter your email address"
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/80 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm text-sm sm:text-base"
                      data-testid="input-email"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-sm mt-2">
                        <span className="mr-1">⚠</span>
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="companyName" className="block text-sm font-medium text-slate-600 mb-2">
                      Company Name *
                    </Label>
                    <Input
                      id="companyName"
                      {...form.register("companyName")}
                      placeholder="Enter your company name"
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/80 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm text-sm sm:text-base"
                      data-testid="input-company"
                    />
                    {form.formState.errors.companyName && (
                      <p className="text-red-400 text-sm mt-2">
                        <span className="mr-1">⚠</span>
                        {form.formState.errors.companyName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="challenge" className="block text-sm font-medium text-slate-600 mb-2">
                      What's your biggest AI search challenge?
                    </Label>
                    <textarea
                      id="challenge"
                      {...form.register("challenge")}
                      placeholder="Tell us about your AI search challenges (optional)"
                      rows={4}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/80 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm text-sm sm:text-base resize-none"
                      data-testid="input-challenge"
                    />
                    {form.formState.errors.challenge && (
                      <p className="text-red-400 text-sm mt-2">
                        <span className="mr-1">⚠</span>
                        {form.formState.errors.challenge.message}
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={waitlistMutation.isPending}
                    className="w-full mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-2xl font-semibold text-base sm:text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center"
                    data-testid="button-submit-waitlist"
                  >
                    {waitlistMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 animate-spin" />
                        Adding you to the list...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                        Join Waitlist
                      </>
                    )}
                  </Button>
                  
                  <p className="text-center text-xs sm:text-sm text-slate-500 mt-4 sm:mt-6">
                    🔒 Your information is secure and will never be shared.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="text-xl font-bold mb-4 inline-block">
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              GeoRankers
            </span>
          </Link>
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} GeoRankers. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
