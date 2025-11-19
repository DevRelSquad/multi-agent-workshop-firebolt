import { NextRequest, NextResponse } from 'next/server';
import { OrchestratorAgent } from '@/lib/agents/orchestrator';

export async function POST(request: NextRequest) {
  try {
    // TODO: Exercise 4 - Implement Orchestrator API POST endpoint
    //
    // INSTRUCTIONS:
    // 1. Extract query and action (default: 'parse') from request.json()
    // 2. Validate that query is provided (return 400 error if not)
    // 3. Validate GEMINI_API_KEY is configured (return 500 error if not)
    // 4. Create OrchestratorAgent instance with apiKey
    // 5. If action === 'execute' or 'multi_step':
    //    - Call orchestrator.handleMultiStepQuery(query)
    //    - Return JSON with: action: 'multi_step_execution', and spread result
    // 6. Otherwise (default parse action):
    //    - Call orchestrator.parseIntent(query)
    //    - Call orchestrator.routeTask(intent)
    //    - Return JSON with: success: true, action: 'intent_parsing', query, intent, route
    // 7. Wrap in try-catch, return 500 error on exceptions
    //
    // HINT: See Step 6 Exercise 4 in the tutorial for full implementation
    
    throw new Error('TODO: Implement POST endpoint');
  } catch (error: any) {
    console.error('Orchestrator API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error?.message ?? 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      }, 
      { status: 500 }
    );
  }
}

// Add GET endpoint for capabilities
export async function GET() {
  return NextResponse.json({
    capabilities: {
      actions: ['parse', 'execute', 'multi_step'],
      supportedIntents: ['analytics', 'report', 'email', 'multi_step'],
      features: [
        'Natural language query parsing',
        'Multi-agent orchestration',
        'Email delivery with reports',
        'Complex workflow execution'
      ]
    },
    examples: [
      {
        query: 'Show me revenue for the last 30 days',
        action: 'parse',
        description: 'Parse intent and determine routing'
      },
      {
        query: 'Generate a revenue report and email it to user@example.com',
        action: 'execute',
        description: 'Execute multi-step workflow'
      }
    ]
  });
}


