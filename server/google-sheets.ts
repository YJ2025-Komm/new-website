import { InsertWaitlistEntry } from "@shared/schema";

export class GoogleSheetsService {
  private webAppUrl: string;

  constructor() {
    // We'll use a Google Apps Script Web App URL instead of direct API
    // This is because Google Sheets API requires OAuth2/Service Account auth for writing
    this.webAppUrl = process.env.GOOGLE_APPS_SCRIPT_URL || '';
    
    if (!this.webAppUrl) {
      console.log('Google Apps Script URL not configured. Form data will only save to database.');
      console.log('To enable Google Sheets integration, set up a Google Apps Script web app.');
    } else {
      console.log('Google Sheets service initialized with Apps Script web app integration');
    }
  }

  async addWaitlistEntry(entry: InsertWaitlistEntry): Promise<void> {
    if (!this.webAppUrl) {
      console.log('Google Sheets integration not configured - skipping');
      return;
    }

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    try {
      console.log(`Attempting to add entry to Google Sheets: ${entry.email}`);
      
      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp,
          fullName: entry.fullName,
          email: entry.email
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Google Apps Script error: ${response.status} - ${errorText}`);
        throw new Error(`Google Apps Script error: ${response.status} - ${errorText}`);
      }

      console.log(`Successfully added entry to Google Sheets: ${entry.email} at ${timestamp}`);
    } catch (error) {
      console.error('Error adding to Google Sheets:', error);
      throw error;
    }
  }

  async appendQuizData(quizData: string[]): Promise<void> {
    if (!this.webAppUrl) {
      console.log('Google Sheets integration not configured - skipping quiz data');
      return;
    }

    try {
      console.log(`Attempting to add quiz data to Google Sheets: ${quizData[1]}`);
      
      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'quiz',
          data: quizData
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Google Apps Script error (quiz): ${response.status} - ${errorText}`);
        throw new Error(`Google Apps Script error (quiz): ${response.status} - ${errorText}`);
      }

      console.log(`Successfully added quiz data to Google Sheets: ${quizData[1]}`);
    } catch (error) {
      console.error('Error adding quiz data to Google Sheets:', error);
      throw error;
    }
  }

  async initializeSheet(): Promise<void> {
    if (!this.webAppUrl) {
      console.log('Google Sheets integration not configured - skipping initialization');
      return;
    }
    
    console.log('Google Sheets service ready for use');
  }
}

export const googleSheetsService = new GoogleSheetsService();