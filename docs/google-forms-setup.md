# Google Forms Integration Setup

## Easy Setup (Recommended)

### Step 1: Create a Google Form
1. Go to https://forms.google.com
2. Click "Create" → "Blank form"
3. Title: "GeoRankers Waitlist"

### Step 2: Add Form Fields
1. **Question 1**: "Full Name" (Short answer, Required)
2. **Question 2**: "Email Address" (Short answer, Required)

### Step 3: Get the Form URL
1. Click "Send" button
2. Copy the form URL (looks like: https://forms.gle/XXXXXXXX)

### Step 4: Link to Your Spreadsheet
1. In the form, click "Responses" tab
2. Click the green Sheets icon
3. Choose "Create a new spreadsheet" or "Select existing spreadsheet"
4. Choose your existing spreadsheet: https://docs.google.com/spreadsheets/d/1FEoSj7I87LGWzTPA4qqPnxWDFwAv-DWsLxz3XHXNX-s/edit

### Step 5: Update Your Website
Replace the current form with a redirect to your Google Form, or embed it directly.

## Alternative: Google Apps Script Web App

If you prefer to keep the custom form on your website:

### Step 1: Create Google Apps Script
1. Go to https://script.google.com
2. Create new project
3. Paste this code:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById('1FEoSj7I87LGWzTPA4qqPnxWDFwAv-DWsLxz3XHXNX-s').getSheetByName('Sheet1');
    
    const timestamp = new Date();
    sheet.appendRow([timestamp, data.fullName, data.email]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 2: Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Type: "Web app"
3. Execute as: "Me"
4. Who has access: "Anyone"
5. Click "Deploy"
6. Copy the Web App URL

### Step 3: Add to Replit Secrets
Add the Web App URL as `GOOGLE_APPS_SCRIPT_URL` in your Replit secrets.

## Recommendation
**Use Google Forms** - it's the simplest solution and automatically handles all the authentication and data saving for you!