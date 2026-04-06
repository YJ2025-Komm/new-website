import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { websiteAnalysisRequestSchema, type WebsiteAnalysisRequest, type WebsiteAnalysisResponse } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, AlertCircle, CheckCircle, TrendingUp, Shield, Eye, FileText, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";

export default function WebsiteAnalysis() {
  useSEO({
    title: "Free AI Search Readiness Analyzer | GeoRankers",
    description:
      "Instantly audit your website's AI search visibility. Get a free GEO score, identify crawl issues, and see how you compare to competitors in ChatGPT, Gemini, and Perplexity.",
    canonical: "https://georankers.co/website-analysis",
    ogTitle: "Free AI Search Readiness Analyzer — GeoRankers",
    ogDescription:
      "Paste your URL and get an instant GEO audit: schema check, robots.txt analysis, AI mention score, and actionable recommendations.",
    ogUrl: "https://georankers.co/website-analysis",
    schemaId: "website-analysis-schema",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "GeoRankers AI Search Readiness Analyzer",
      "url": "https://georankers.co/website-analysis",
      "description":
        "Free tool to audit your website's AI search visibility and GEO readiness.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    },
  });

  const [analysisResult, setAnalysisResult] = useState<WebsiteAnalysisResponse | null>(null);
  const { toast } = useToast();

  const form = useForm<WebsiteAnalysisRequest>({
    resolver: zodResolver(websiteAnalysisRequestSchema),
    defaultValues: {
      url: "",
    },
  });

  const analysisMutation = useMutation({
    mutationFn: async (data: WebsiteAnalysisRequest) => {
      const response = await apiRequest("POST", "/api/analyze-website", data);
      
      // Check if response is an error
      if (!response.ok) {
        const errorData = await response.json();
        const errorType = errorData.errorType || 'unknown';
        const errorMessage = errorData.message || 'Unable to analyze website';
        
        // Create a custom error with type information
        const error = new Error(errorMessage) as Error & { errorType: string };
        error.errorType = errorType;
        throw error;
      }
      
      return response.json();
    },
    onSuccess: (data: WebsiteAnalysisResponse) => {
      console.log("Analysis response:", data);
      if (!data || !data.scores) {
        throw new Error("Invalid response from server");
      }
      setAnalysisResult(data);
      toast({
        title: "Analysis Complete!",
        description: "Your website has been analyzed for AI search visibility.",
      });
    },
    onError: (error: Error & { errorType?: string }) => {
      console.error("Analysis error:", error);
      
      // Get error-specific title and description
      let title = "Analysis Failed";
      let description = error.message || "Unable to analyze website. Please try again.";
      
      if (error.errorType === 'blocked') {
        title = "Website Blocked Analysis";
      } else if (error.errorType === 'temporary') {
        title = "Temporary Server Issue";
      } else if (error.errorType === 'timeout') {
        title = "Request Timed Out";
      }
      
      toast({
        title,
        description,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: WebsiteAnalysisRequest) => {
    setAnalysisResult(null);
    analysisMutation.mutate(data);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Navigation Bar */}
      <Navbar />

      <div className="container mx-auto px-4 py-12 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Brand Visibility Tool
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover how visible your website is to AI search engines like ChatGPT, Gemini, Perplexity, and Claude
          </p>
        </div>

        {/* Analysis Form */}
        <div className="max-w-3xl mx-auto mb-12 rounded-2xl bg-gradient-to-br from-blue-50 via-violet-50/60 to-indigo-50 border border-blue-200/60 shadow-lg shadow-blue-100/40 p-8 sm:p-10">
          <div className="mb-5">
            <h2 className="flex items-center gap-2.5 text-xl font-bold text-slate-900">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500">
                <Search className="h-4 w-4 text-white" />
              </div>
              Analyze Your Website
            </h2>
            <p className="text-sm text-slate-500 mt-1.5 ml-[46px]">
              Enter your website URL for comprehensive AI visibility insights
            </p>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="https://example.com"
                {...form.register("url")}
                disabled={analysisMutation.isPending}
                className="h-12 bg-white border-slate-200 shadow-sm"
                data-testid="input-website-url"
              />
              {form.formState.errors.url && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1" data-testid="text-url-error">
                  {form.formState.errors.url.message}
                </p>
              )}
            </div>
            <Button 
              type="submit" 
              disabled={analysisMutation.isPending}
              className="h-12 px-8 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white shadow-md"
              data-testid="button-analyze"
            >
              {analysisMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Crawling...
                </>
              ) : (
                <>
                  Analyze
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          {analysisMutation.isPending && (
            <div className="mt-4 p-4 bg-white/80 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Analyzing your website...
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    This may take a moment. We're analyzing your content for AI visibility insights.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Visibility Content Section */}
        <div className="max-w-4xl mx-auto mb-16 space-y-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">What Is AI Visibility & Why It Matters</h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              AI visibility isn't just about ranking — it's about being mentioned, recommended, and cited when people ask generative AI assistants. Modern discovery increasingly happens inside platforms like ChatGPT, Gemini, Perplexity, and AI Overviews — not just traditional search. If your brand isn't part of those AI responses, it may be missing out on a fast-growing source of high-intent awareness and conversions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Why AI Visibility Is Critical</h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-4">
              When buyers turn to AI assistants for answers, they reveal intent — and often far more detailed intent than traditional search patterns. Being included in the answer means you're in the shortlist before any click even happens. Without visibility in these responses, you risk being invisible during crucial decision-making moments.
            </p>
            <div className="rounded-xl bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-200/50 p-5">
              <p className="text-slate-700 font-semibold text-base md:text-lg">
                Insight → Pipeline → Conversions
              </p>
              <p className="text-slate-600 text-sm md:text-base mt-1">
                AI visibility impacts discoverability, which influences qualified traffic and ultimately pipeline growth.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">How to Boost Your AI Visibility?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Search className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-base md:text-lg">Identify prompt gaps vs competitors</p>
                  <p className="text-slate-600 text-sm md:text-base">Target content to address queries where you're missing.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-base md:text-lg">Strengthen citation sources</p>
                  <p className="text-slate-600 text-sm md:text-base">Build authority and enable AI platforms to pull from trusted signals.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-base md:text-lg">Optimize for context and nuance</p>
                  <p className="text-slate-600 text-sm md:text-base">Shape content so AI describes your brand positively, accurately, and authoritatively.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-base md:text-lg">Track platform performance</p>
                  <p className="text-slate-600 text-sm md:text-base">Some AI engines favor different sources; adapt your strategy per platform.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {analysisResult && (
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Overall Score */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Overall AI Visibility Score</CardTitle>
                <CardDescription>
                  Your website's performance across AI search platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className={`text-6xl font-bold ${getScoreColor(analysisResult.overallScore)}`} data-testid="text-overall-score">
                      {analysisResult.overallScore}
                      <span className="text-2xl text-slate-500 dark:text-slate-400">/100</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2" data-testid="text-summary">
                      {analysisResult.summary}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Scores */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Schema Markup
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-3xl font-bold ${getScoreColor(analysisResult.scores.schemaMarkup)}`} data-testid="text-score-schema">
                        {analysisResult.scores.schemaMarkup}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">/ 100</span>
                    </div>
                    <Progress value={analysisResult.scores.schemaMarkup} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-600" />
                    Content Quality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-3xl font-bold ${getScoreColor(analysisResult.scores.contentQuality)}`} data-testid="text-score-content">
                        {analysisResult.scores.contentQuality}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">/ 100</span>
                    </div>
                    <Progress value={analysisResult.scores.contentQuality} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Brand Signals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-3xl font-bold ${getScoreColor(analysisResult.scores.brandSignals)}`} data-testid="text-score-brand">
                        {analysisResult.scores.brandSignals}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">/ 100</span>
                    </div>
                    <Progress value={analysisResult.scores.brandSignals} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Eye className="h-5 w-5 text-orange-600" />
                    AI Readability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-3xl font-bold ${getScoreColor(analysisResult.scores.aiReadability)}`} data-testid="text-score-readability">
                        {analysisResult.scores.aiReadability}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">/ 100</span>
                    </div>
                    <Progress value={analysisResult.scores.aiReadability} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Recommendations</CardTitle>
                <CardDescription>Prioritized actions to improve your AI search visibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisResult.recommendations.map((rec, index) => (
                    <div 
                      key={index} 
                      className="border rounded-lg p-4 space-y-2"
                      data-testid={`recommendation-${index}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={getPriorityColor(rec.priority)} data-testid={`badge-priority-${index}`}>
                              {rec.priority.toUpperCase()}
                            </Badge>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400" data-testid={`text-category-${index}`}>
                              {rec.category}
                            </span>
                          </div>
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1" data-testid={`text-issue-${index}`}>
                            {rec.issue}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400" data-testid={`text-solution-${index}`}>
                            <CheckCircle className="inline h-4 w-4 mr-1 text-green-600" />
                            {rec.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
              <CardContent className="py-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Want to Track Your Progress?</h3>
                  <p className="text-blue-100 mb-6">
                    Sign up for free to start tracking your brand's AI visibility across ChatGPT, Gemini, Perplexity, and more
                  </p>
                  <a href="https://dashboard.georankers.co/register">
                    <Button variant="secondary" size="lg" data-testid="button-try-free">
                      Try for Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
