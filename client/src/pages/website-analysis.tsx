import { useState } from "react";
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

export default function WebsiteAnalysis() {
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
    onError: (error: Error) => {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Unable to analyze website. Please try again.",
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
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" data-testid="link-home">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GeoRankers
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors" data-testid="link-home-nav">
              Home
            </Link>
            <Link href="/geo-guide" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors" data-testid="link-geo-guide">
              GEO Guide
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Search Visibility Analysis
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover how visible your website is to AI search engines like ChatGPT, Gemini, Perplexity, and Claude
          </p>
        </div>

        {/* Analysis Form */}
        <Card className="max-w-3xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Analyze Your Website
            </CardTitle>
            <CardDescription>
              Enter your website URL for comprehensive AI visibility insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
              <div className="flex-1">
                <Input
                  placeholder="https://example.com"
                  {...form.register("url")}
                  disabled={analysisMutation.isPending}
                  className="h-12"
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
                className="h-12 px-8"
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
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Analyzing your website...
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      This may take a moment. We're analyzing your content for AI visibility insights.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

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
                    Join our waitlist to get notified when we launch our full AI visibility tracking platform
                  </p>
                  <Link href="/#waitlist">
                    <Button variant="secondary" size="lg" data-testid="button-join-waitlist">
                      Join Waitlist
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
