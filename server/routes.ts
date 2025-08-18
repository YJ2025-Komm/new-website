import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { z } from "zod";
import { googleSheetsService } from "./google-sheets";
import { mailchimpService } from "./mailchimp";
import { registerAdminRoutes } from "./admin-routes";
import { quizSubmissionSchema, calculateQuizScore } from "@shared/quiz-schema";
import { db } from "./db";
import { quizSubmissions } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Google Sheets (add headers if needed)
  try {
    await googleSheetsService.initializeSheet();
    console.log("Google Sheets initialized successfully");
  } catch (error) {
    console.error("Google Sheets initialization failed:", error);
  }

  // Waitlist registration endpoint - Save directly to Mailchimp only
  app.post("/api/waitlist", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertWaitlistEntrySchema.parse(req.body);
      
      // Add directly to Mailchimp (it handles duplicate detection)
      try {
        await mailchimpService.addSubscriber(validatedData, 'GR Homepage');
        
        res.status(201).json({ 
          message: "Successfully added to waitlist",
          email: validatedData.email 
        });
      } catch (mailchimpError) {
        console.error("Mailchimp error:", mailchimpError);
        
        const errorMessage = mailchimpError instanceof Error ? mailchimpError.message : String(mailchimpError);
        
        // Handle specific Mailchimp errors
        if (errorMessage.includes('Member Exists')) {
          return res.status(400).json({ 
            message: "This email is already on the waitlist" 
          });
        }
        
        if (errorMessage.includes('looks fake or invalid')) {
          return res.status(400).json({ 
            message: "Please enter a valid email address" 
          });
        }
        
        // Generic error
        res.status(500).json({ 
          message: "Failed to add to waitlist. Please try again." 
        });
      }
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid data provided",
          errors: error.errors 
        });
      }
      
      console.error("Error adding to waitlist:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Quiz waitlist registration endpoint - from within quiz flow
  app.post("/api/waitlist/quiz", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertWaitlistEntrySchema.parse(req.body);
      
      // Add directly to Mailchimp with quiz-specific tag
      try {
        await mailchimpService.addSubscriber(validatedData, 'GR Quiz Waitlist');
        
        res.status(201).json({ 
          message: "Successfully added to waitlist from quiz",
          email: validatedData.email 
        });
      } catch (mailchimpError) {
        console.error("Mailchimp error (quiz waitlist):", mailchimpError);
        
        const errorMessage = mailchimpError instanceof Error ? mailchimpError.message : String(mailchimpError);
        
        // Handle specific Mailchimp errors
        if (errorMessage.includes('Member Exists')) {
          return res.status(400).json({ 
            message: "This email is already on the waitlist" 
          });
        }
        
        if (errorMessage.includes('looks fake or invalid')) {
          return res.status(400).json({ 
            message: "Please enter a valid email address" 
          });
        }
        
        // Generic error
        res.status(500).json({ 
          message: "Failed to add to waitlist. Please try again." 
        });
      }
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid data provided",
          errors: error.errors 
        });
      }
      
      console.error("Error adding to quiz waitlist:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Get waitlist count from Mailchimp
  app.get("/api/waitlist/count", async (req, res) => {
    try {
      const audienceInfo = await mailchimpService.getAudienceInfo();
      res.json({ count: audienceInfo.stats.member_count });
    } catch (error) {
      console.error("Error getting waitlist count:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Quiz submission endpoint
  app.post("/api/quiz", async (req, res) => {
    try {
      // Validate request body
      const validatedData = quizSubmissionSchema.parse(req.body);
      
      // Calculate quiz score
      const results = calculateQuizScore(validatedData.responses);
      
      // Save to database
      const quizRecord = await db.insert(quizSubmissions).values({
        email: validatedData.email,
        companyName: validatedData.companyName || null,
        responses: validatedData.responses,
        score: results.score.toString(),
        level: results.level,
        breakdown: results.breakdown,
        recommendations: results.recommendations,
      }).returning();
      
      // Add email to Mailchimp with quiz score tag
      try {
        await mailchimpService.addSubscriber({
          fullName: validatedData.companyName || "Quiz Participant",
          email: validatedData.email,
          companyName: validatedData.companyName || "",
          challenge: `Quiz Score: ${results.score}/100 - ${results.level}`
        }, 'GR Quiz Submitted');
      } catch (mailchimpError) {
        console.log("Mailchimp error (quiz):", mailchimpError);
        // Continue even if Mailchimp fails
      }
      
      // Send to Google Sheets
      try {
        const quizData = [
          new Date().toISOString(),
          validatedData.email,
          validatedData.companyName || "",
          results.score.toString(),
          results.level,
          JSON.stringify(validatedData.responses),
          results.breakdown.knowledge.toString(),
          results.breakdown.community.toString(),
          results.breakdown.reviews.toString(),
          results.breakdown.media.toString(),
          results.breakdown.llm.toString()
        ];
        
        await googleSheetsService.appendQuizData(quizData);
      } catch (sheetsError) {
        console.log("Google Sheets error (quiz):", sheetsError);
        // Continue even if Sheets fails
      }
      
      res.status(201).json({
        message: "Quiz submitted successfully",
        ...results
      });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid data provided",
          errors: error.errors 
        });
      }
      
      console.error("Error submitting quiz:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Register admin routes
  registerAdminRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
