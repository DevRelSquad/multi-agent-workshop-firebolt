import { GoogleGenerativeAI } from '@google/generative-ai';
import { GmailClient } from '@/lib/services/gmail';

export class ReportAgent {
  private model: any;
  private gmailClient: GmailClient;

  constructor(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    this.gmailClient = new GmailClient();
  }

  /**
   * ✅ COMPLETE: Generate basic summary
   */
  async generateReport(data: any, reportType: 'summary' | 'detailed' = 'summary'): Promise<string> {
    const prompt = `
    Create a professional ${reportType} report from this data:
    ${JSON.stringify(data, null, 2)}
    
    Format: Executive summary with key insights
    Length: ~200 words
    Style: Professional, data-driven
    `;

    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }

  /**
   * TODO: Add custom report templates
   * 
   * WORKSHOP TASK:
   * Create a financial report template with:
   * 1. Executive Summary
   * 2. Key Metrics (bullet points)
   * 3. Trends Analysis
   * 4. Recommendations
   * 
   * HINT: Use the REPORT_TEMPLATES constant below
   * EXPECTED: Returns a formatted report string using the custom template.
   * TEST: Call from API with mock analytics data.
   */
  async generateFinancialReport(data: any): Promise<string> {
    // TODO: Implement custom template
    throw new Error('Financial report template not yet implemented');
  }

  /**
   * TODO: Implement email delivery
   * Currently in sandbox mode (logs to console)
   * 
   * WORKSHOP TASK:
   * - Uncomment Gmail API call
   * - Add error handling
   * - Format email body properly
   * 
   * TEST: Use /api/report endpoint with recipient.
   */
  async sendEmail(recipient: string, subject: string, body: string): Promise<boolean> {
    console.log(`📧 Email Preview (Sandbox Mode):`);
    console.log(`To: ${recipient}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body:\n${body}`);
    
    // TODO: Uncomment for real email sending
    // return await this.gmailClient.send({ recipient, subject, body });
    
    return true; // Sandbox mode
  }
}

// TODO: Complete these templates
const REPORT_TEMPLATES = {
  executive: `...`,
  technical: `...`,
  // TODO: Add your custom template
};


