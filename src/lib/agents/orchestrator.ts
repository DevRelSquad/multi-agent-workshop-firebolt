import { GoogleGenerativeAI } from '@google/generative-ai';
import { AnalyticsAgent } from './analytics';
import { ReportAgent } from './report';

export type AgentType = 'analytics' | 'report' | 'email' | 'unknown';

export type IntentResult = {
  intent: 'analytics' | 'report' | 'email' | 'multi_step';
  entities: {
    query_type?: string;
    time_range?: string;
    recipient?: string;
  };
  confidence: number;
};

export class OrchestratorAgent {
  private model: any;

  constructor(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  /**
   * ✅ COMPLETE: Basic intent parsing
   * Parses user query to determine intent
   */
  async parseIntent(userQuery: string): Promise<IntentResult> {
    const prompt = `
    Analyze this user query and classify the intent:
    Query: "${userQuery}"
    
    Respond in JSON format:
    {
      "intent": "analytics" | "report" | "email" | "multi_step",
      "entities": {
        "query_type": string,
        "time_range": string,
        "recipient": string
      },
      "confidence": number
    }
    `;
    
    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }

  /**
   * TODO: Add support for multi-step queries
   * Currently handles single-step queries only
   * 
   * WORKSHOP TASK:
   * - Handle queries like "Show revenue AND send report"
   * - Break down complex queries into sub-tasks
   * - Coordinate multiple agents in sequence
   * 
   * HINT: Look at the multi_step intent type above
   * EXPECTED: Returns an ordered array of executed steps with outputs.
   * TEST: Use input "show revenue and send a summary to alice@example.com".
   */
  async handleMultiStepQuery(userQuery: string) {
    // TODO: Implement this
    throw new Error('Multi-step queries not yet implemented');
  }

  /**
   * ✅ COMPLETE: Route to appropriate agent
   */
  routeTask(intent: IntentResult): AgentType {
    if (intent.intent === 'analytics') return 'analytics';
    if (intent.intent === 'report') return 'report';
    if (intent.intent === 'email') return 'email';
    return 'unknown';
  }
}


