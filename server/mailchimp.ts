import { InsertWaitlistEntry } from "@shared/schema";

export class MailchimpService {
  private apiKey: string;
  private audienceId: string;
  private serverPrefix: string;

  constructor() {
    this.apiKey = process.env.MAILCHIMP_API_KEY || '';
    this.audienceId = process.env.MAILCHIMP_AUDIENCE_ID || '';
    
    // Extract server prefix from API key (e.g., us1, us2, etc.)
    this.serverPrefix = this.apiKey.split('-')[1] || 'us1';
    
    if (!this.apiKey || !this.audienceId) {
      console.log('Mailchimp integration not configured. Set MAILCHIMP_API_KEY and MAILCHIMP_AUDIENCE_ID to enable.');
    } else {
      console.log('Mailchimp service initialized successfully');
    }
  }

  async addSubscriber(entry: InsertWaitlistEntry): Promise<void> {
    if (!this.apiKey || !this.audienceId) {
      console.log('Mailchimp not configured - skipping subscriber addition');
      return;
    }

    const url = `https://${this.serverPrefix}.api.mailchimp.com/3.0/lists/${this.audienceId}/members`;
    
    const subscriberData = {
      email_address: entry.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: entry.fullName.split(' ')[0] || '',
        LNAME: entry.fullName.split(' ').slice(1).join(' ') || '',
        FULLNAME: entry.fullName,
        COMPANY: entry.companyName || '',
        MMERGE7: entry.challenge || '' // Correct merge tag for Comments field
      },
      tags: ['GeoRankers Waitlist']
    };

    try {
      console.log(`Adding subscriber to Mailchimp: ${entry.email}`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriberData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle duplicate email by throwing a specific error
        if (errorData.title === 'Member Exists') {
          console.log(`Subscriber already exists in Mailchimp: ${entry.email}`);
          throw new Error('Member Exists');
        }
        
        console.error('Mailchimp API error:', errorData);
        throw new Error(`Mailchimp API error: ${response.status} - ${errorData.detail || errorData.title}`);
      }

      const result = await response.json();
      console.log(`Successfully added subscriber to Mailchimp: ${entry.email}`);
      console.log('Mailchimp response:', result.email_address);
    } catch (error) {
      console.error('Error adding subscriber to Mailchimp:', error);
      throw error;
    }
  }

  async getAudienceInfo(): Promise<any> {
    if (!this.apiKey || !this.audienceId) {
      throw new Error('Mailchimp not configured');
    }

    const url = `https://${this.serverPrefix}.api.mailchimp.com/3.0/lists/${this.audienceId}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Mailchimp API error: ${response.status} - ${errorData.detail}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching audience info:', error);
      throw error;
    }
  }

  async syncExistingSubscribers(entries: InsertWaitlistEntry[]): Promise<{ success: number; errors: number }> {
    if (!this.apiKey || !this.audienceId) {
      throw new Error('Mailchimp not configured');
    }

    let success = 0;
    let errors = 0;

    console.log(`Starting sync of ${entries.length} existing subscribers to Mailchimp...`);

    for (const entry of entries) {
      try {
        await this.addSubscriber(entry);
        success++;
      } catch (error) {
        console.error(`Failed to sync ${entry.email}:`, error);
        errors++;
      }
      
      // Add small delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`Sync complete: ${success} successful, ${errors} errors`);
    return { success, errors };
  }
}

export const mailchimpService = new MailchimpService();