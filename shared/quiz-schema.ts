import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

// Quiz response schema
export const quizResponseSchema = z.object({
  q1: z.enum(["both", "partial", "none"]), // Wikipedia/Knowledge Graph
  q2: z.enum(["multiple", "one", "none"]), // Crunchbase/G2/Capterra
  q3: z.enum(["multiple", "few", "none"]), // Reddit mentions
  q4: z.enum(["high", "low", "zero"]), // Reddit karma
  q5: z.enum(["consistently", "occasionally", "never"]), // Review engagement
  q6: z.enum(["tier1", "blogs", "none"]), // Media coverage
  q7: z.enum(["user_driven", "brand_only", "none"]), // LinkedIn/ProductHunt
  q8: z.enum(["valid", "partial", "none"]), // Structured data
  q9_chatgpt: z.enum(["top5", "mentioned", "not_mentioned"]), // ChatGPT visibility
  q9_gemini: z.enum(["top5", "mentioned", "not_mentioned"]), // Gemini visibility
  q9_perplexity: z.enum(["top5", "mentioned", "not_mentioned"]), // Perplexity visibility
  q10: z.enum(["ten_plus", "less_than_ten", "none"]), // Google Page 1 rankings
});

export const quizSubmissionSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  responses: quizResponseSchema,
  companyName: z.string().optional(),
});

export type QuizResponse = z.infer<typeof quizResponseSchema>;
export type QuizSubmission = z.infer<typeof quizSubmissionSchema>;

// Quiz scoring logic
export function calculateQuizScore(responses: QuizResponse): {
  score: number;
  breakdown: {
    knowledge: number;
    community: number;
    reviews: number;
    media: number;
    llm: number;
  };
  level: string;
  recommendations: string[];
} {
  let knowledge = 0;
  let community = 0;
  let reviews = 0;
  let media = 0;
  let llm = 0;

  // Q1: Wikipedia/Knowledge Graph (0-10 pts)
  if (responses.q1 === "both") knowledge += 10;
  else if (responses.q1 === "partial") knowledge += 5;

  // Q2: Crunchbase/G2/Capterra (0-5 pts)
  if (responses.q2 === "multiple") knowledge += 5;
  else if (responses.q2 === "one") knowledge += 2;

  // Q10: Google Page 1 rankings (0-5 pts)
  if (responses.q10 === "ten_plus") knowledge += 5;
  else if (responses.q10 === "less_than_ten") knowledge += 3;

  // Q3: Reddit mentions (0-7 pts)
  if (responses.q3 === "multiple") community += 7;
  else if (responses.q3 === "few") community += 3;

  // Q4: Reddit karma (0-7 pts)
  if (responses.q4 === "high") community += 7;
  else if (responses.q4 === "low") community += 3;

  // Q7: LinkedIn/ProductHunt (0-6 pts)
  if (responses.q7 === "user_driven") community += 6;
  else if (responses.q7 === "brand_only") community += 3;

  // Reviews & Reputation Category (0-20 pts total)
  // Need to add a proper reviews question (Q7 in document: Reviews on G2/Trustpilot)
  // For now, using Q8 structured data as reviews presence indicator
  if (responses.q8 === "valid") reviews += 10;
  else if (responses.q8 === "partial") reviews += 5;
  
  // Q5: Review engagement (0-10 pts) 
  if (responses.q5 === "consistently") reviews += 10;
  else if (responses.q5 === "occasionally") reviews += 5;

  // Q6: Media coverage (0-20 pts)
  if (responses.q6 === "tier1") media += 20;
  else if (responses.q6 === "blogs") media += 10;

  // Q9: LLM visibility (0-20 pts total)
  // ChatGPT (0-7 pts)
  if (responses.q9_chatgpt === "top5") llm += 7;
  else if (responses.q9_chatgpt === "mentioned") llm += 3;

  // Gemini (0-7 pts)
  if (responses.q9_gemini === "top5") llm += 7;
  else if (responses.q9_gemini === "mentioned") llm += 3;

  // Perplexity (0-6 pts)
  if (responses.q9_perplexity === "top5") llm += 6;
  else if (responses.q9_perplexity === "mentioned") llm += 2;

  const totalScore = knowledge + community + reviews + media + llm;

  let level = "";
  let recommendations: string[] = [];

  if (totalScore <= 40) {
    level = "Not AI-Ready";
    recommendations = [
      "Create a Wikipedia page or get listed in Google Knowledge Graph",
      "Build profiles on Crunchbase, G2, and Capterra with customer reviews",
      "Engage more actively on Reddit and LinkedIn in your industry discussions",
      "Start a PR campaign to get coverage in tier-1 publications",
      "Implement structured data on your website"
    ];
  } else if (totalScore <= 70) {
    level = "Getting There";
    recommendations = [
      "Improve your review engagement strategy across all platforms",
      "Increase community participation and thought leadership content",
      "Focus on getting more tier-1 media coverage",
      "Test and optimize your brand's visibility in AI search results",
      "Strengthen your structured data implementation"
    ];
  } else {
    level = "AI-Ready";
    recommendations = [
      "Monitor your AI search rankings regularly",
      "Continue building community engagement",
      "Maintain consistent review responses",
      "Keep creating newsworthy content for media coverage",
      "Consider advanced GEO optimization strategies"
    ];
  }

  return {
    score: totalScore,
    breakdown: { knowledge, community, reviews, media, llm },
    level,
    recommendations
  };
}