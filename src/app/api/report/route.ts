import { NextRequest, NextResponse } from 'next/server';
import { ReportAgent } from '@/lib/agents/report';

export async function POST(request: NextRequest) {
  try {
    const { data, reportType = 'summary', recipient, subject = 'AI Report' } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing GEMINI_API_KEY' }, { status: 500 });
    }
    const reportAgent = new ReportAgent(apiKey);
    const report = await reportAgent.generateReport(data, reportType);
    let email: boolean | undefined;
    if (recipient) {
      email = await reportAgent.sendEmail(recipient, subject, report);
    }
    return NextResponse.json({ report, emailSent: !!email });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Unknown error' }, { status: 500 });
  }
}


