import type { Express } from "express";
import { storage } from "./storage";
import type { WaitlistEntry } from "@shared/schema";

export function registerAdminRoutes(app: Express) {
  // API endpoint for raw data
  app.get("/api/admin/waitlist", async (req, res) => {
    try {
      const entries = await storage.getAllWaitlistEntries();
      res.json(entries);
    } catch (error) {
      console.error("Error fetching waitlist entries:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin endpoint to view all waitlist entries
  app.get("/api/admin/dashboard", async (req, res) => {
    try {
      // In a real app, you'd add authentication here
      const entries = await storage.getAllWaitlistEntries();
      
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>GeoRankers Waitlist - Admin View</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 1000px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #333; border-bottom: 3px solid #4285f4; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #4285f4; color: white; }
            tr:hover { background-color: #f5f5f5; }
            .stats { display: flex; gap: 20px; margin: 20px 0; }
            .stat { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; flex: 1; }
            .stat-number { font-size: 2em; font-weight: bold; color: #4285f4; }
            .export-btn { background: #4285f4; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin: 10px 5px; }
            .export-btn:hover { background: #3367d6; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>GeoRankers Waitlist Dashboard</h1>
            
            <div class="stats">
              <div class="stat">
                <div class="stat-number">${entries.length}</div>
                <div>Total Signups</div>
              </div>
              <div class="stat">
                <div class="stat-number">${entries.filter((e: WaitlistEntry) => new Date(e.createdAt) > new Date(Date.now() - 24*60*60*1000)).length}</div>
                <div>Last 24 Hours</div>
              </div>
              <div class="stat">
                <div class="stat-number">${entries.filter((e: WaitlistEntry) => new Date(e.createdAt) > new Date(Date.now() - 7*24*60*60*1000)).length}</div>
                <div>Last 7 Days</div>
              </div>
            </div>

            <button class="export-btn" onclick="exportCSV()">Export CSV</button>
            <button class="export-btn" onclick="copyEmails()">Copy All Emails</button>
            
            <table id="waitlistTable">
              <thead>
                <tr>
                  <th>Date Joined</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                ${entries.map((entry: WaitlistEntry) => `
                  <tr>
                    <td>${new Date(entry.createdAt).toLocaleString()}</td>
                    <td>${entry.fullName}</td>
                    <td>${entry.email}</td>
                    <td>${entry.id.substring(0, 8)}...</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <script>
            function exportCSV() {
              const entries = ${JSON.stringify(entries)};
              const csv = 'Date,Full Name,Email,ID\\n' + 
                entries.map(e => \`"\${new Date(e.createdAt).toLocaleString()}","\${e.fullName}","\${e.email}","\${e.id}"\`).join('\\n');
              
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'georankers-waitlist.csv';
              a.click();
            }

            function copyEmails() {
              const entries = ${JSON.stringify(entries)};
              const emails = entries.map(e => e.email).join(', ');
              navigator.clipboard.writeText(emails).then(() => {
                alert('All emails copied to clipboard!');
              });
            }
          </script>
        </body>
        </html>
      `);
    } catch (error) {
      console.error("Error fetching waitlist entries:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


}