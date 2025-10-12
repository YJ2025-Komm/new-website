import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const waitlistEntries = pgTable("waitlist_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  companyName: text("company_name").notNull(),
  challenge: text("challenge"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const quizSubmissions = pgTable("quiz_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  companyName: text("company_name"),
  responses: json("responses").notNull(),
  score: text("score").notNull(),
  level: text("level").notNull(),
  breakdown: json("breakdown").notNull(),
  recommendations: json("recommendations").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertWaitlistEntrySchema = createInsertSchema(waitlistEntries).pick({
  fullName: true,
  email: true,
  companyName: true,
  challenge: true,
});

export const insertQuizSubmissionSchema = createInsertSchema(quizSubmissions).pick({
  email: true,
  companyName: true,
  responses: true,
  score: true,
  level: true,
  breakdown: true,
  recommendations: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertWaitlistEntry = z.infer<typeof insertWaitlistEntrySchema>;
export type WaitlistEntry = typeof waitlistEntries.$inferSelect;
export type InsertQuizSubmission = z.infer<typeof insertQuizSubmissionSchema>;
export type QuizSubmission = typeof quizSubmissions.$inferSelect;

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
});

export type WebsiteAnalysisRequest = z.infer<typeof websiteAnalysisRequestSchema>;
export type WebsiteAnalysisResponse = z.infer<typeof websiteAnalysisResponseSchema>;
