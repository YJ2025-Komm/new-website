import { InsertWaitlistEntry } from "@shared/schema";

export class GoogleSheetsService {
  private apiKey: string;
  private spreadsheetId: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_SHEETS_API_KEY!;
    this.spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

    if (!this.apiKey || !this.spreadsheetId) {
      throw new Error('Google Sheets API key and spreadsheet ID are required');
    }
    
    console.log(`Google Sheets service initialized with spreadsheet ID: ${this.spreadsheetId.substring(0, 10)}...`);
  }

  async addWaitlistEntry(entry: InsertWaitlistEntry): Promise<void> {
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    // Prepare the row data
    const values = [
      [timestamp, entry.fullName, entry.email]
    ];

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/Sheet1:append?valueInputOption=USER_ENTERED&key=${this.apiKey}`;

    try {
      console.log(`Attempting to add entry to Google Sheets: ${entry.email}`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: values
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Google Sheets API error: ${response.status} - ${errorText}`);
        throw new Error(`Google Sheets API error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log(`Successfully added entry to Google Sheets: ${entry.email} at ${timestamp}`);
      console.log('Google Sheets response:', result);
    } catch (error) {
      console.error('Error adding to Google Sheets:', error);
      throw error;
    }
  }

  async initializeSheet(): Promise<void> {
    // Add headers if the sheet is empty
    const headers = ['Timestamp', 'Full Name', 'Email'];
    
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/Sheet1!A1:C1?key=${this.apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // If no data exists, add headers
      if (!data.values || data.values.length === 0) {
        await this.addHeaders(headers);
      }
    } catch (error) {
      console.error('Error checking sheet headers:', error);
      // Continue without failing - headers might already exist
    }
  }

  private async addHeaders(headers: string[]): Promise<void> {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/Sheet1!A1:C1?valueInputOption=RAW&key=${this.apiKey}`;

    try {
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [headers]
        })
      });
    } catch (error) {
      console.error('Error adding headers:', error);
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();