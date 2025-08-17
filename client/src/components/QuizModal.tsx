import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, TrendingUp, AlertCircle, ArrowRight, ArrowLeft, Mail } from "lucide-react";
import { quizSubmissionSchema, type QuizSubmission, type QuizResponse, calculateQuizScore } from "@shared/quiz-schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const questions = [
  {
    id: "q1",
    title: "Wikipedia & Knowledge Graph",
    question: "Does your brand have a dedicated Wikipedia page or appear in Google Knowledge Graph (right-hand panel when you search your brand)?",
    options: [
      { value: "both", label: "Yes (full page)" },
      { value: "partial", label: "Mentioned but not a full page" },
      { value: "none", label: "No" }
    ]
  },
  {
    id: "q2", 
    title: "Business Directory Presence",
    question: "Can you find your brand's profile on Crunchbase, G2, or Capterra?",
    options: [
      { value: "multiple", label: "Yes, we are on 2+ of these with reviews" },
      { value: "one", label: "Only one, limited reviews" },
      { value: "none", label: "Not present" }
    ]
  },
  {
    id: "q3",
    title: "Reddit Discussions",
    question: "Search your brand name on Reddit. Do you find active discussions or mentions?",
    options: [
      { value: "ten_plus", label: "Yes, multiple threads with engagement" },
      { value: "less_than_ten", label: "A few mentions, low activity" },
      { value: "none", label: "No mentions" }
    ]
  },
  {
    id: "q4",
    title: "Reddit Karma", 
    question: "Approximate total karma/upvotes across Reddit mentions for your brand -",
    options: [
      { value: "multiple", label: "100+ karma" },
      { value: "few", label: "1-99 karma" },
      { value: "none", label: "0" }
    ]
  },
  {
    id: "q5",
    title: "Review Engagement",
    question: "Do you actively reply to user reviews/comments on G2, Trustpilot, App Stores, or Capterra?",
    options: [
      { value: "high", label: "Yes, consistently" },
      { value: "low", label: "Occasionally" },
      { value: "zero", label: "Never" }
    ]
  },
  {
    id: "q6",
    title: "Media Coverage",
    question: "When you search \"[Your Brand Name] news\" on Google, do you see mentions in tier-1 or tier-2 publications (Forbes, TechCrunch, niche trade media)?",
    options: [
      { value: "user_driven", label: "Yes, multiple credible publications" },
      { value: "brand_only", label: "Some smaller blogs" },
      { value: "none", label: "None" }
    ]
  },

  {
    id: "q7",
    title: "LinkedIn & Product Hunt",
    question: "Search your brand on LinkedIn and Product Hunt. Are there posts or discussions about it?",
    options: [
      { value: "many", label: "Yes, user-driven discussions exist" },
      { value: "some", label: "Only brand-led posts" },
      { value: "none", label: "Nothing visible" }
    ]
  },
  {
    id: "q8",
    title: "Structured Data",
    question: "Run your homepage through Google's Rich Results Test. Does it show structured data for your organization/product?",
    options: [
      { value: "consistently", label: "Yes, valid schema present" },
      { value: "occasionally", label: "Partial / errors" },
      { value: "never", label: "None" }
    ]
  },
  {
    id: "q9_llm",
    title: "AI Platform Visibility",
    question: "When you asked a category-level question (e.g., 'Who are the top [your category] platforms in 2025?'), did your brand appear in the answer?",
    type: "checkbox",
    platforms: [
      { id: "q9_chatgpt", label: "ChatGPT" },
      { id: "q9_gemini", label: "Gemini" },
      { id: "q9_perplexity", label: "Perplexity" }
    ]
  },
  {
    id: "q9",
    title: "Google Page Rankings",
    question: "How many of your website's pages currently rank on Page 1 of Google for your target keywords?",
    options: [
      { value: "tier1", label: "10+" },
      { value: "blogs", label: "Less than 10" },
      { value: "none", label: "None/Not Sure" }
    ]
  }
];

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [currentScreen, setCurrentScreen] = useState(0); // 0 or 1 for 2 screens
  const [quizResponses, setQuizResponses] = useState<Partial<QuizResponse>>({});
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState<any>(null);
  const { toast } = useToast();

  // Split questions into two screens (first 6, last 4)
  const screen1Questions = questions.slice(0, 6);
  const screen2Questions = questions.slice(6);

  const form = useForm<{ email: string; companyName?: string }>({
    resolver: zodResolver(z.object({
      email: z.string().email("Please enter a valid email"),
      companyName: z.string().optional()
    })),
    defaultValues: {
      email: "",
      companyName: ""
    }
  });

  const submitQuizMutation = useMutation({
    mutationFn: async (data: QuizSubmission) => {
      const response = await apiRequest("POST", "/api/quiz", data);
      return response.json();
    },
    onSuccess: (data) => {
      console.log("API response:", data);
      // Results are already set locally before submission
      setShowResults(true);
      setShowEmailCapture(false);
      toast({
        title: "Quiz submitted successfully!",
        description: "Your AI readiness report has been generated.",
      });
    },
    onError: (error: any) => {
      console.error("Quiz submission error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to submit quiz. Please try again.",
      });
    }
  });

  const handleQuestionResponse = (questionId: string, value: any) => {
    const updatedResponses = {
      ...quizResponses,
      [questionId]: value
    };
    setQuizResponses(updatedResponses);
  };

  const handleLLMResponse = (platformId: string, isVisible: boolean) => {
    const updatedResponses = {
      ...quizResponses,
      [platformId]: isVisible ? "top5" : "not_mentioned"
    };
    setQuizResponses(updatedResponses);
  };

  const handleNext = () => {
    if (currentScreen === 0) {
      setCurrentScreen(1);
    } else {
      // Quiz completed, show email capture
      setShowEmailCapture(true);
    }
  };

  const handlePrevious = () => {
    if (currentScreen === 1) {
      setCurrentScreen(0);
    }
  };

  const handleEmailSubmit = (data: { email: string; companyName?: string }) => {
    console.log("Form data:", data);
    console.log("Quiz responses:", quizResponses);
    
    // Use quiz responses from state as they're more reliable
    const completeSubmission = {
      ...data,
      responses: quizResponses as QuizResponse
    };
    
    // Calculate results locally first
    const results = calculateQuizScore(quizResponses as QuizResponse);
    console.log("Calculated results:", results);
    setQuizResults(results);
    
    console.log("Submitting to API:", completeSubmission);
    submitQuizMutation.mutate(completeSubmission);
  };

  const resetQuiz = () => {
    setCurrentScreen(0);
    setQuizResponses({});
    setShowEmailCapture(false);
    setShowResults(false);
    setQuizResults(null);
    form.reset();
  };

  const handleClose = () => {
    resetQuiz();
    onClose();
  };

  const progress = ((currentScreen + 1) / 2) * 100;
  const currentQuestions = currentScreen === 0 ? screen1Questions : screen2Questions;
  
  // Check if all questions on current screen are answered
  const isScreenComplete = currentQuestions.every(q => {
    if (q.type === "checkbox") {
      // For LLM question, check if all platforms are answered
      return q.platforms?.every(platform => quizResponses[platform.id as keyof QuizResponse] !== undefined);
    }
    return quizResponses[q.id as keyof QuizResponse] !== undefined;
  });
  
  console.log("Current screen:", currentScreen);
  console.log("Total screens:", 2);
  console.log("Screen complete:", isScreenComplete);
  console.log("Quiz responses so far:", Object.keys(quizResponses));
  console.log("Show email capture:", showEmailCapture);
  console.log("Show results:", showResults);

  if (showResults && quizResults) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Your AI Readiness Report
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              Your personalized AI search visibility analysis and recommendations
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Score Overview */}
            <Card>
              <CardHeader className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {quizResults.level === "AI-Ready" && <CheckCircle className="w-6 h-6 text-green-500" />}
                  {quizResults.level === "Getting There" && <TrendingUp className="w-6 h-6 text-yellow-500" />}
                  {quizResults.level === "Not AI-Ready" && <AlertCircle className="w-6 h-6 text-red-500" />}
                  <CardTitle className="text-3xl">{quizResults.score}/100</CardTitle>
                </div>
                <p className="text-xl font-semibold text-gray-600">{quizResults.level}</p>
              </CardHeader>
              <CardContent>
                <Progress value={quizResults.score} className="w-full h-3" />
              </CardContent>
            </Card>

            {/* Score Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Knowledge & Authority</span>
                      <span className="font-semibold">{quizResults.breakdown.knowledge}/20</span>
                    </div>
                    <Progress value={(quizResults.breakdown.knowledge / 20) * 100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Community Signals</span>
                      <span className="font-semibold">{quizResults.breakdown.community}/20</span>
                    </div>
                    <Progress value={(quizResults.breakdown.community / 20) * 100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Reviews & Reputation</span>
                      <span className="font-semibold">{quizResults.breakdown.reviews}/20</span>
                    </div>
                    <Progress value={(quizResults.breakdown.reviews / 20) * 100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Media Coverage</span>
                      <span className="font-semibold">{quizResults.breakdown.media}/20</span>
                    </div>
                    <Progress value={(quizResults.breakdown.media / 20) * 100} className="h-2" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <div className="flex justify-between">
                      <span>Direct AI Visibility</span>
                      <span className="font-semibold">{quizResults.breakdown.llm}/20</span>
                    </div>
                    <Progress value={(quizResults.breakdown.llm / 20) * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {quizResults.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-r from-blue-50 to-violet-50 border-blue-200">
              <CardContent className="text-center p-6">
                <h3 className="text-xl font-bold mb-2">Ready to Improve Your AI Visibility?</h3>
                <p className="text-gray-600 mb-4">
                  Join our waitlist to get notified when GeoRankers launches and start optimizing your brand for AI search.
                </p>
                <Button 
                  onClick={handleClose}
                  className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
                >
                  Join GeoRankers Waitlist
                </Button>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (showEmailCapture) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Get Your Results</DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              Enter your email to receive your personalized AI readiness report
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={form.handleSubmit(handleEmailSubmit, (errors) => {
            console.log("Form validation errors:", errors);
          })} className="space-y-4">
            <div className="text-center space-y-2">
              <Mail className="w-12 h-12 text-blue-500 mx-auto" />
              <p className="text-gray-600">
                Enter your email to receive your personalized AI readiness report
              </p>
            </div>
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                placeholder="your@email.com"
                className="mt-1"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="companyName">Company Name (Optional)</Label>
              <Input
                id="companyName"
                {...form.register("companyName")}
                placeholder="Your Company"
                className="mt-1"
              />
            </div>

            <div className="flex space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowEmailCapture(false)}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                type="submit" 
                disabled={submitQuizMutation.isPending}
                className="flex-1 bg-gradient-to-r from-blue-500 to-violet-500"
                onClick={() => {
                  console.log("Get Results button clicked");
                  console.log("Form errors:", form.formState.errors);
                  console.log("Form valid:", form.formState.isValid);
                }}
              >
                {submitQuizMutation.isPending ? "Generating..." : "Get Results"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Is Your Brand AI-Search Ready?
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Take the quick quiz and see your AI Visibility Score across key signals
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Screen {currentScreen + 1} of 2</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Questions List */}
          <div className="space-y-6 max-h-[60vh] overflow-y-auto">
            {currentQuestions.map((question, index) => (
              <Card key={question.id}>
                <CardHeader>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
                      {(currentScreen * 6) + index + 1}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{question.title}</CardTitle>
                      <p className="text-gray-600 mt-1">{question.question}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {question.type === "checkbox" ? (
                    // LLM Visibility Question with Checkboxes
                    <div className="space-y-4">
                      {question.platforms?.map((platform) => (
                        <div key={platform.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="font-medium">{platform.label}</span>
                          <div className="flex space-x-2">
                            <Button
                              variant={quizResponses[platform.id as keyof QuizResponse] === "top5" ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleLLMResponse(platform.id, true)}
                            >
                              Yes
                            </Button>
                            <Button
                              variant={quizResponses[platform.id as keyof QuizResponse] === "not_mentioned" ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleLLMResponse(platform.id, false)}
                            >
                              No
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Regular Questions with Radio Options
                    <RadioGroup
                      value={quizResponses[question.id as keyof QuizResponse] as string || ""}
                      onValueChange={(value) => handleQuestionResponse(question.id, value)}
                      className="space-y-3"
                    >
                      {question.options?.map((option) => (
                        <div key={option.value} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50">
                          <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                          <Label htmlFor={`${question.id}-${option.value}`} className="flex-1 cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentScreen === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!isScreenComplete}
              className="bg-gradient-to-r from-blue-500 to-violet-500"
            >
              {currentScreen === 1 ? "Complete Quiz" : "Next Screen"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}