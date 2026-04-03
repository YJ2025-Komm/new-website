import { z } from "zod";

export const websiteAnalysisRequestSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
});

export const websiteAnalysisResponseSchema = z.object({
  url: z.string(),
  overallScore: z.number().min(0).max(100),
  scores: z.object({
    schemaMarkup: z.number().min(0).max(100),
    contentQuality: z.number().min(0).max(100),
    brandSignals: z.number().min(0).max(100),
    aiReadability: z.number().min(0).max(100),
  }),
  recommendations: z.array(z.object({
    category: z.string(),
    issue: z.string(),
    solution: z.string(),
    priority: z.enum(["high", "medium", "low"]),
  })),
  summary: z.string(),
  pagesAnalyzed: z.number().optional(),
  pagesList: z.array(z.string()).optional(),
});

export type WebsiteAnalysisRequest = z.infer<typeof websiteAnalysisRequestSchema>;
export type WebsiteAnalysisResponse = z.infer<typeof websiteAnalysisResponseSchema>;
