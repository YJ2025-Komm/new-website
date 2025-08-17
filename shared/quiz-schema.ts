import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

// Quiz response schema
export const quizResponseSchema = z.object({
  q1: z.enum(["both", "partial", "none"]), // Q1: Wikipedia/Knowledge Graph (10/5/0)
  q2: z.enum(["multiple", "one", "none"]), // Q2: Crunchbase/G2/Capterra (10/5/0)
  q3: z.enum(["multiple", "few", "none"]), // Q3: Reddit Discussions (7/3/0)
  q4: z.enum(["high", "low", "zero"]), // Q4: Reddit Karma (7/3/0)
  q5: z.enum(["consistently", "occasionally", "never"]), // Q5: Review Engagement (10/5/0)
  q6: z.enum(["tier1", "blogs", "none"]), // Q6: Media Coverage (20/10/0)
  q7: z.enum(["user_driven", "brand_only", "none"]), // Q7: LinkedIn/Product Hunt (6/3/0)
  q8: z.enum(["yes", "partial", "none"]), // Q8: Structured Data (5/2/0)
  q9_chatgpt: z.enum(["top5", "mentioned", "not_mentioned"]), // Q9: ChatGPT visibility (7/0)
  q9_gemini: z.enum(["top5", "mentioned", "not_mentioned"]), // Q9: Gemini visibility (7/0)
  q9_perplexity: z.enum(["top5", "mentioned", "not_mentioned"]), // Q9: Perplexity visibility (6/0)
  q10: z.enum(["ten_plus", "few", "none"]), // Q10: Google Page Rankings (5/2/0)
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

  // 1. Knowledge & Authority (0-20 pts)
  // Q1: Wikipedia/Knowledge Graph (10/5/0 pts)
  if (responses.q1 === "both") knowledge += 10;
  else if (responses.q1 === "partial") knowledge += 5;

  // Q8: Structured Data (5/2/0 pts)
  if (responses.q8 === "yes") knowledge += 5;
  else if (responses.q8 === "partial") knowledge += 2;

  // Q10: Google Page Rankings (5/2/0 pts)
  if (responses.q10 === "ten_plus") knowledge += 5;
  else if (responses.q10 === "few") knowledge += 2;

  // 2. Community Signals (0-20 pts)
  // Q3: Reddit Discussions (7/3/0 pts)
  if (responses.q3 === "multiple") community += 7;
  else if (responses.q3 === "few") community += 3;

  // Q4: Reddit Karma (7/3/0 pts)
  if (responses.q4 === "high") community += 7;
  else if (responses.q4 === "low") community += 3;

  // Q7: LinkedIn/Product Hunt (6/3/0 pts)
  if (responses.q7 === "user_driven") community += 6;
  else if (responses.q7 === "brand_only") community += 3;

  // 3. Reviews & Reputation (0-20 pts)
  // Q2: Crunchbase/G2/Capterra (10/5/0 pts)
  if (responses.q2 === "multiple") reviews += 10;
  else if (responses.q2 === "one") reviews += 5;

  // Q5: Review Engagement (10/5/0 pts)
  if (responses.q5 === "consistently") reviews += 10;
  else if (responses.q5 === "occasionally") reviews += 5;

  // 4. Media & Coverage (0-20 pts)
  // Q6: Media Coverage (20/10/0 pts)
  if (responses.q6 === "tier1") media += 20;
  else if (responses.q6 === "blogs") media += 10;

  // 5. Direct LLM Visibility (0-20 pts)
  // ChatGPT (7/0 pts)
  if (responses.q9_chatgpt === "top5") llm += 7;

  // Gemini (7/0 pts)
  if (responses.q9_gemini === "top5") llm += 7;

  // Perplexity (6/0 pts)
  if (responses.q9_perplexity === "top5") llm += 6;

  const totalScore = knowledge + community + reviews + media + llm;

  let level = "";
  let recommendations: string[] = [];

  // Generate personalized recommendations based on specific weaknesses
  if (knowledge < 10) {
    if (responses.q1 === "none") recommendations.push("Create a Wikipedia page or get listed in Google Knowledge Graph");
    if (responses.q8 === "none") recommendations.push("Implement structured data markup on your website");
    if (responses.q10 === "none") recommendations.push("Optimize your content for target keywords to rank on Google Page 1");
  }

  if (community < 10) {
    if (responses.q3 === "none") recommendations.push("Start engaging in Reddit communities related to your industry");
    if (responses.q4 === "zero") recommendations.push("Create valuable content that generates positive Reddit engagement");
    if (responses.q7 === "none") recommendations.push("Build your presence on LinkedIn and Product Hunt");
  }

  if (reviews < 10) {
    if (responses.q2 === "none") recommendations.push("Create profiles on Crunchbase, G2, and Capterra");
    if (responses.q5 === "never") recommendations.push("Start actively responding to customer reviews and feedback");
  }

  if (media < 10) {
    if (responses.q6 === "none") recommendations.push("Develop a PR strategy to get coverage in industry publications");
  }

  if (llm < 10) {
    if (responses.q9_chatgpt === "not_mentioned") recommendations.push("Optimize your content to improve ChatGPT visibility");
    if (responses.q9_gemini === "not_mentioned") recommendations.push("Focus on Google-friendly content for better Gemini mentions");
    if (responses.q9_perplexity === "not_mentioned") recommendations.push("Create authoritative content that Perplexity can reference");
  }

  // Add general recommendations if not enough specific ones
  if (recommendations.length < 3) {
    recommendations.push("Focus on building thought leadership in your industry");
    recommendations.push("Create consistent, high-quality content across all platforms");
    recommendations.push("Monitor your brand mentions across AI platforms regularly");
  }

  // Determine overall level
  if (totalScore <= 40) {
    level = "Not AI-Ready";
  } else if (totalScore <= 70) {
    level = "Getting There";
  } else {
    level = "AI-Ready";
  }

  // Limit to top 5 recommendations
  recommendations = recommendations.slice(0, 5);

  return {
    score: totalScore,
    breakdown: { knowledge, community, reviews, media, llm },
    level,
    recommendations
  };
}