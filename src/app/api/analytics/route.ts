import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsAgent } from '@/lib/agents/analytics';

export async function POST(request: NextRequest) {
  try {
    const { queryType } = await request.json();
    const analytics = new AnalyticsAgent();
    
    const result = await analytics.executeQuery(queryType);
    
    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Unknown error' }, { status: 500 });
  }
}


