import { InsertWaitlistEntry } from "@shared/schema";
import { QuizSubmission } from "@shared/quiz-schema";

export class GoogleSheetsService {
  private webAppUrl: string;
  private spreadsheetId: string;

  constructor() {
    // Use Google Apps Script Web App URL for writing data
    this.webAppUrl = process.env.GOOGLE_APPS_SCRIPT_URL || '';
    this.spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || '1FEoSj7I87LGWzTPA4qqPnxWDFwAv-DWsLxz3XHXNX-s';
    
    if (!this.webAppUrl) {
      console.log('Google Apps Script Web App URL not configured. Quiz data will only save to database and Mailchimp.');
      console.log('To enable Google Sheets integration, create a Google Apps Script web app with this spreadsheet ID:', this.spreadsheetId);
    } else {
      console.log('Google Sheets service initialized with Web App URL');
    }
  }

  async initializeSheet(): Promise<void> {
    if (!this.webAppUrl) {
      console.log('Google Sheets integration not configured - skipping initialization');
      return;
    }

    console.log('Google Sheets service ready for use with spreadsheet:', this.spreadsheetId);
  }

  async appendQuizData(quizSubmission: QuizSubmission, score: number, breakdown: any, level: string): Promise<void> {
    if (!this.webAppUrl) {
      console.log('Google Sheets integration not configured - skipping quiz data');
      return;
    }

    try {
      console.log(`Attempting to add quiz data to Google Sheets: ${quizSubmission.email}`);
      
      const timestamp = new Date().toISOString();
      
      // Prepare complete quiz data for Google Apps Script
      const quizData = {
        type: 'quiz',
        timestamp,
        email: quizSubmission.email,
        companyName: quizSubmission.companyName || '',
        score,
        level,
        breakdown,
        responses: quizSubmission.responses
      };
      
      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Google Apps Script error: ${response.status} - ${errorText}`);
        console.log('Note: To enable Google Sheets integration, create a Google Apps Script web app connected to spreadsheet:', this.spreadsheetId);
        return; // Don't throw - we don't want to break the quiz flow
      }

      const result = await response.text();
      console.log(`Successfully added quiz data to Google Sheets: ${quizSubmission.email}`, result);
    } catch (error) {
      console.error('Error adding quiz data to Google Sheets:', error);
      console.log('Google Sheets integration requires setting up a Google Apps Script web app.');
      // Don't throw error - we don't want to break the quiz flow if Google Sheets fails
    }
  }

  async addWaitlistEntry(entry: InsertWaitlistEntry): Promise<void> {
    if (!this.webAppUrl) {
      console.log('Google Sheets integration not configured - skipping waitlist entry');
      return;
    }

    try {
      console.log(`Attempting to add waitlist entry to Google Sheets: ${entry.email}`);
      
      const timestamp = new Date().toISOString();
      
      const waitlistData = {
        type: 'waitlist',
        timestamp,
        fullName: entry.fullName,
        email: entry.email,
        companyName: entry.companyName || '',
        challenge: entry.challenge || ''
      };
      
      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(waitlistData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log(`Google Apps Script error for waitlist: ${response.status} - ${errorText}`);
        return; // Don't throw - we don't want to break waitlist flow
      }

      const result = await response.text();
      console.log(`Successfully added waitlist entry to Google Sheets: ${entry.email}`, result);
    } catch (error) {
      console.error('Error adding waitlist entry to Google Sheets:', error);
      // Don't throw error - we don't want to break the waitlist flow if Google Sheets fails
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();