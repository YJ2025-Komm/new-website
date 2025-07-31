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
  }

  async addWaitlistEntry(entry: InsertWaitlistEntry): Promise<void> {
    const timestamp = new Date().toISOString();
    
    // Prepare the row data
    const values = [
      [timestamp, entry.fullName, entry.email]
    ];

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/Sheet1:append?valueInputOption=RAW&key=${this.apiKey}`;

    try {
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
        throw new Error(`Google Sheets API error: ${response.status} - ${errorText}`);
      }

      console.log('Successfully added entry to Google Sheets');
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