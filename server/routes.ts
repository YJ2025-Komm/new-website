import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { z } from "zod";
import { googleSheetsService } from "./google-sheets";
import { mailchimpService } from "./mailchimp";
import { registerAdminRoutes } from "./admin-routes";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Google Sheets (add headers if needed)
  try {
    await googleSheetsService.initializeSheet();
    console.log("Google Sheets initialized successfully");
  } catch (error) {
    console.error("Google Sheets initialization failed:", error);
  }

  // Waitlist registration endpoint - Save to both database and Mailchimp
  app.post("/api/waitlist", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertWaitlistEntrySchema.parse(req.body);
      
      // Check if email already exists in database
      const existingEntry = await storage.getWaitlistEntryByEmail(validatedData.email);
      if (existingEntry) {
        return res.status(400).json({ 
          message: "This email is already on the waitlist" 
        });
      }
      
      // Save to database first
      const dbEntry = await storage.createWaitlistEntry(validatedData);
      
      // Then add to Mailchimp (it handles duplicate detection)
      try {
        await mailchimpService.addSubscriber(validatedData);
        console.log(`Successfully saved to both database and Mailchimp: ${validatedData.email}`);
        
        res.status(201).json({ 
          message: "Successfully added to waitlist",
          email: validatedData.email,
          id: dbEntry.id
        });
      } catch (mailchimpError) {
        console.error("Mailchimp error:", mailchimpError);
        
        const errorMessage = mailchimpError instanceof Error ? mailchimpError.message : String(mailchimpError);
        
        // Handle specific Mailchimp errors but still return success since DB save worked
        if (errorMessage.includes('Member Exists')) {
          console.log("Already exists in Mailchimp but successfully saved to database");
        } else if (errorMessage.includes('looks fake or invalid')) {
          return res.status(400).json({ 
            message: "Please enter a valid email address" 
          });
        } else {
          console.log("Failed to add to Mailchimp but successfully saved to database");
        }
        
        // Return success since database save worked
        res.status(201).json({ 
          message: "Successfully added to waitlist",
          email: validatedData.email,
          id: dbEntry.id
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

  // Register admin routes
  registerAdminRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
