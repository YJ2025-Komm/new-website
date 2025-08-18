# Google Sheets Integration Setup

To enable Google Sheets integration for quiz responses, you need to create a Google Apps Script web app.

## Step 1: Create Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the code below
4. Save the project with a name like "GeoRankers Quiz Data"

## Step 2: Google Apps Script Code

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const spreadsheetId = '1FEoSj7I87LGWzTPA4qqPnxWDFwAv-DWsLxz3XHXNX-s';
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    
    if (data.type === 'quiz') {
      // Handle quiz data
      let sheet = spreadsheet.getSheetByName('Quiz Responses');
      if (!sheet) {
        sheet = spreadsheet.insertSheet('Quiz Responses');
        // Add headers
        sheet.getRange(1, 1, 1, 22).setValues([[
          'Timestamp', 'Email', 'Company', 'Score', 'Level', 
          'Knowledge Score', 'Community Score', 'Reviews Score', 'Media Score', 'LLM Score',
          'Q1 (Wikipedia)', 'Q2 (Reviews)', 'Q3 (Reddit Discussions)', 'Q4 (Reddit Karma)', 
          'Q5 (Review Engagement)', 'Q6 (Media Coverage)', 'Q7 (LinkedIn/PH)', 'Q8 (Structured Data)',
          'Q9 ChatGPT', 'Q9 Gemini', 'Q9 Perplexity', 'Q10 (Google Rankings)'
        ]]);
      }
      
      // Add quiz data row
      sheet.appendRow([
        data.timestamp,
        data.email,
        data.companyName,
        data.score,
        data.level,
        data.breakdown.knowledge,
        data.breakdown.community,
        data.breakdown.reviews,
        data.breakdown.media,
        data.breakdown.llm,
        data.responses.q1,
        data.responses.q2,
        data.responses.q3,
        data.responses.q4,
        data.responses.q5,
        data.responses.q6,
        data.responses.q7,
        data.responses.q8,
        data.responses.q9_chatgpt,
        data.responses.q9_gemini,
        data.responses.q9_perplexity,
        data.responses.q10
      ]);
      
      return ContentService.createTextOutput('Quiz data added successfully');
      
    } else if (data.type === 'waitlist') {
      // Handle waitlist data
      let sheet = spreadsheet.getSheetByName('Waitlist');
      if (!sheet) {
        sheet = spreadsheet.insertSheet('Waitlist');
        // Add headers
        sheet.getRange(1, 1, 1, 6).setValues([[
          'Timestamp', 'Full Name', 'Email', 'Company', 'Challenge', 'Source'
        ]]);
      }
      
      // Add waitlist data row
      sheet.appendRow([
        data.timestamp,
        data.fullName,
        data.email,
        data.companyName,
        data.challenge,
        'Website Form'
      ]);
      
      return ContentService.createTextOutput('Waitlist data added successfully');
    }
    
    return ContentService.createTextOutput('Unknown data type');
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput('Error: ' + error.toString());
  }
}
```

## Step 3: Deploy as Web App

1. Click "Deploy" > "New deployment"
2. Choose type: "Web app"
3. Execute as: "Me"
4. Who has access: "Anyone" (or "Anyone with Google account" for more security)
5. Click "Deploy"
6. Copy the Web App URL (it looks like: https://script.google.com/macros/s/XXXXXX/exec)

## Step 4: Configure Environment Variable

Add the Web App URL to your Replit secrets:
- Key: `GOOGLE_APPS_SCRIPT_URL`
- Value: The Web App URL you copied

## Step 5: Test the Integration

Once configured, quiz submissions and waitlist entries will automatically be saved to your Google Sheet with separate tabs for:
- "Quiz Responses" - Complete quiz data with scores and all responses
- "Waitlist" - Waitlist signups from the website

The integration is designed to be fault-tolerant - if Google Sheets fails, the quiz and waitlist will still work normally with Mailchimp and database storage.