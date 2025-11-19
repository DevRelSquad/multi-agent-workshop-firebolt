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
  private apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey || apiKey === 'your_api_key_here') {
      throw new Error('Valid GEMINI_API_KEY is required for OrchestratorAgent');
    }
    
    this.apiKey = apiKey;
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  /**
   * TODO: Exercise 1 - Implement parseIntent with Gemini
   * 
   * TASK: Use Gemini to analyze user queries and extract intent + entities
   * 
   * INSTRUCTIONS:
   * 1. Create a prompt that explains the system capabilities (analytics, reports, email)
   * 2. Ask Gemini to return JSON with: intent, entities, confidence
   * 3. Support 4 intent types: analytics, report, email, multi_step
   * 4. Support 5 query types: revenue, top_products, user_behavior, category_performance, brand_analysis
   * 5. Extract time ranges and email addresses from the query
   * 6. Use this.model.generateContent(prompt) to call Gemini
   * 7. Parse the JSON response (handle markdown code blocks with regex /\{[\s\S]*\}/)
   * 8. Return the IntentResult object
   * 
   * HINT: See Step 6 Exercise 1 in the tutorial for the full prompt structure
   */
  async parseIntent(userQuery: string): Promise<IntentResult> {
    // TODO: Implement intent parsing with Gemini
    // Step 1: Create a comprehensive prompt explaining system capabilities
    // Step 2: Call this.model.generateContent(prompt)
    // Step 3: Extract JSON from response using regex
    // Step 4: Parse and return IntentResult
    throw new Error('TODO: Implement parseIntent method');
  }

  /**
   * TODO: Exercise 3 - Implement handleMultiStepQuery
   * 
   * TASK: Orchestrate complex workflows that coordinate multiple agents
   * 
   * INSTRUCTIONS:
   * 1. Create a steps array to track each operation
   * 2. Use regex to detect query types:
   *    - hasRevenue: /revenue|sales|income|earnings|money/
   *    - hasTopProducts: /top\s+products|best\s+sellers?|popular\s+items|trending/
   *    - hasUserBehavior: /user\s+behavior|customer\s+behavior|user\s+activity|engagement/
   *    - hasCategoryAnalysis: /categor(y|ies)|product\s+categories|category\s+performance/
   *    - hasBrandAnalysis: /brand(s)?|brand\s+performance|brand\s+analysis/
   *    - hasReport: /report|summary|generate|create\s+report/
   *    - recipient: Extract email with /[\w.-]+@[\w.-]+\.[a-z]{2,}/
   * 3. Execute analytics query based on detected intent
   * 4. If hasReport or recipient, generate report (financial for revenue/category/brand, summary for others)
   * 5. If recipient is present, send email with appropriate subject
   * 6. Track each step with: step, action, output, status
   * 7. Wrap in try-catch, return {success, totalSteps, steps}
   * 
   * HINT: See Step 6 Exercise 3 in the tutorial for complete implementation
   */
  async handleMultiStepQuery(userQuery: string) {
    // TODO: Implement multi-step orchestration
    // Step 1: Create steps array and extract intent signals with regex
    // Step 2: Execute analytics query based on detected query type
    // Step 3: Generate report if needed (check hasReport or recipient)
    // Step 4: Send email if recipient is specified
    // Step 5: Track each step and return result
    throw new Error('TODO: Implement handleMultiStepQuery method');
  }

  /**
   * TODO: Exercise 2 - Implement routeTask
   * 
   * TASK: Map intent results to appropriate agent types
   * 
   * INSTRUCTIONS:
   * 1. Take IntentResult as input parameter
   * 2. Check intent.intent property
   * 3. Return 'analytics' for analytics intent
   * 4. Return 'report' for report intent
   * 5. Return 'email' for email intent
   * 6. Return 'unknown' for anything else
   * 
   * HINT: This is a simple if/else or switch statement
   */
  routeTask(intent: IntentResult): AgentType {
    // TODO: Implement task routing
    // Map intent to agent type: analytics, report, email, or unknown
    throw new Error('TODO: Implement routeTask method');
  }
}


