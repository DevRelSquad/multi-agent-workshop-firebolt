import { GoogleGenerativeAI } from '@google/generative-ai';
import { GmailClient } from '@/lib/services/gmail';
import { generateReportHTML } from '@/lib/utils/email-templates';
import {
  buildSummaryPrompt,
  buildFinancialPrompt,
  buildEcommerceInsightsPrompt,
} from './reportPrompts';

export class ReportAgent {
  private model: any;
  private gmailClient: GmailClient;

  constructor(apiKey: string) {
    if (!apiKey || apiKey === 'your_api_key_here') {
      throw new Error('Valid GEMINI_API_KEY is required for ReportAgent');
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    this.gmailClient = new GmailClient();
  }

  /**
   * TASK 1: Generate basic summary
   */
  async generateReport(data: any, reportType: 'summary' | 'detailed' = 'summary'): Promise<string> {
   const prompt = buildSummaryPrompt(data, reportType);

   throw new Error('TODO: Implement generateReport method');
  }

  /**
   * ✅ COMPLETE: Custom financial report template
   * 
   * Creates a financial report template with:
   * 1. Executive Summary
   * 2. Key Metrics (bullet points)
   * 3. Trends Analysis
   * 4. Recommendations
   */
  async generateFinancialReport(data: any): Promise<string> {
   const prompt = buildFinancialPrompt(data);

   const result = await this.model.generateContent(prompt);
   return result.response.text();
  }

  /**
   * ✅ COMPLETE: Email delivery with error handling
   * 
   * Sends email via Gmail API with HTML formatting
   * - Includes sandbox mode for development
   * - Proper error handling
   * - Professional HTML email template with branding
   * 
   * @param recipient - Email recipient address
   * @param subject - Email subject line
   * @param body - Report content (plain text/markdown)
   * @param reportType - Type of report for proper HTML template selection
   */
  async sendEmail(
    recipient: string, 
    subject: string, 
    body: string, 
    reportType: 'summary' | 'detailed' | 'financial' = 'summary'
  ): Promise<boolean> {
    try {
      // Convert the report to HTML format
      const htmlBody = generateReportHTML(body, reportType, 'Firebolt Analytics Database');
      
      // Send via Gmail client (it handles sandbox vs real mode internally)
      const result = await this.gmailClient.send({ 
        recipient, 
        subject, 
        body: htmlBody
      });
      
      if (result) {
        console.log('✅ Email sent successfully (HTML format)');
      } else {
        console.log('⚠️ Email send returned false (check logs for details)');
      }
      
      return result;
    } catch (error) {
      console.error('❌ Email send failed:', error);
      return false;
    }
  }

  /**
   * Generate ecommerce-specific insights report
   * Analyzes product, category, and customer behavior patterns
   */
  async generateEcommerceInsights(data: any): Promise<string> {
   const prompt = buildEcommerceInsightsPrompt(data);

   const result = await this.model.generateContent(prompt);
   return result.response.text();
  }
}

// Report Templates for different types of reports
const REPORT_TEMPLATES = {
  executive: `
# Executive Report

## Overview
{overview}

## Key Findings
{findings}

## Strategic Recommendations
{recommendations}
`,
  technical: `
# Technical Analysis Report

## Data Summary
{summary}

## Detailed Metrics
{metrics}

## Technical Insights
{insights}

## Next Steps
{next_steps}
`,
  financial: `
# Financial Report

## Executive Summary
{executive_summary}

## Key Metrics
{key_metrics}

## Trends Analysis
{trends}

## Recommendations
{recommendations}
`
};


