import { NextRequest, NextResponse } from 'next/server';
import { OrchestratorAgent } from '@/lib/agents/orchestrator';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing GEMINI_API_KEY' }, { status: 500 });
    }
    const orchestrator = new OrchestratorAgent(apiKey);
    
    const intent = await orchestrator.parseIntent(query);
    const route = orchestrator.routeTask(intent);
    
    return NextResponse.json({ intent, route });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Unknown error' }, { status: 500 });
  }
}


