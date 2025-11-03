"use client";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ReportDemo() {
  const [recipient, setRecipient] = useState('alice@example.com');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setLoading(true);
    setError(null);
    setReport('');
    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: { total_revenue: 1234567.89, top_products: [{ name: 'UltraWidget', count: 542 }] },
          reportType: 'summary',
          recipient,
          subject: 'Weekly Business Summary',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate report');
      setReport(data.report);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report</CardTitle>
        <CardDescription>Generate a Gemini-powered summary and preview sandbox email</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-3">
          <Input aria-label="Recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
          <Button onClick={run} disabled={loading}>{loading ? 'Generating…' : 'Generate & Send'}</Button>
        </div>
        {error && <p className="text-red-600" role="alert">{error}</p>}
        {report && (
          <article className="prose prose-sm max-w-none whitespace-pre-wrap" aria-live="polite">{report}</article>
        )}
      </CardContent>
    </Card>
  );
}


