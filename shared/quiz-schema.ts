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

  // Generate specific recommendations based on user responses and score patterns
  
  // Knowledge & Authority recommendations
  if (responses.q1 === "none") {
    recommendations.push("Create a structured knowledge asset — start with a Crunchbase or G2 profile, then aim for a Wikipedia page once you have third-party press coverage to cite");
  }
  if (responses.q8 === "none" || responses.q8 === "partial") {
    recommendations.push("Add Organization schema (logo, social links, description) and Product schema to your homepage. Use Google's Rich Results Test until it passes cleanly");
  }
  if (responses.q10 === "none" || responses.q10 === "few") {
    recommendations.push("Pick 2–3 high-intent keywords and publish optimized landing pages/blogs targeting them. Focus on winning a few page-1 spots before scaling");
  }

  // Community Signals recommendations  
  if (responses.q3 === "none") {
    recommendations.push("Seed a Reddit discussion in a relevant subreddit (e.g. SaaS, marketing, or your vertical). Do it authentically, not as a sales pitch");
  }
  if (responses.q3 === "few" || responses.q4 === "low") {
    recommendations.push("Encourage customers or advocates to share experiences on Reddit. Even a handful of upvoted threads boosts visibility");
  }
  if (responses.q7 === "none" || responses.q7 === "brand_only") {
    recommendations.push("Run a Product Hunt launch, or encourage customers/partners to tag your brand on LinkedIn for third-party mentions");
  }

  // Reviews & Reputation recommendations
  if (responses.q2 === "none") {
    recommendations.push("Set up profiles on at least 2 review sites where your buyers search. G2 + Capterra are table stakes for B2B");
  }
  if (responses.q2 === "one") {
    recommendations.push("Expand beyond a single platform. If you're on G2, add Capterra or Trustpilot. More review surfaces = more AI visibility");
  }
  if (responses.q5 === "never" || responses.q5 === "occasionally") {
    recommendations.push("Start replying to every review — even negative ones. LLMs pick up on signals of responsiveness and credibility");
  }

  // Media Coverage recommendations
  if (responses.q6 === "none") {
    recommendations.push("Pitch 1–2 niche trade publications in your industry. Even small media hits create citations LLMs can use");
  }
  if (responses.q6 === "blogs") {
    recommendations.push("Level up from niche blogs — target tier-2 sites using HARO/Featured or PR outreach to build stronger citations");
  }

  // Direct LLM Visibility recommendations
  if (responses.q9_chatgpt === "not_mentioned" && responses.q9_gemini === "not_mentioned" && responses.q9_perplexity === "not_mentioned") {
    recommendations.push("Audit your category positioning. Update your website + review sites with clearer category keywords so AI models can map you to the right niche");
  } else {
    if (responses.q9_chatgpt === "not_mentioned") {
      recommendations.push("Optimize content with clear category language and authoritative sources to improve ChatGPT visibility");
    }
    if (responses.q9_gemini === "not_mentioned") {
      recommendations.push("Focus on Google-friendly content and news coverage since Gemini leans on Google entities and news sources");
    }
    if (responses.q9_perplexity === "not_mentioned") {
      recommendations.push("Create authoritative content on Reddit/Quora since Perplexity pulls heavily from these discussion platforms");
    }
  }

  // Add strategic recommendations if we have fewer than 3 specific ones
  if (recommendations.length < 3) {
    recommendations.push("Strengthen differentiation by ensuring your brand is clearly described as a leader using category language across profiles");
    recommendations.push("Release data studies or thought leadership content that press outlets want to reference");
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