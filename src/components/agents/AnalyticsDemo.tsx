"use client";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const QUERY_TYPES = ['revenue', 'top_products'] as const;

export function AnalyticsDemo() {
  const [queryType, setQueryType] = useState<(typeof QUERY_TYPES)[number]>('revenue');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queryType }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to run query');
      setResult(data.result);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>Firebolt MCP-backed queries (mocked in sandbox)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-2 mb-3" role="tablist" aria-label="Query types">
          {QUERY_TYPES.map((qt) => (
            <Button key={qt} variant={queryType === qt ? 'default' : 'outline'} onClick={() => setQueryType(qt)} aria-pressed={queryType === qt}>
              {qt}
            </Button>
          ))}
          <Button onClick={run} disabled={loading}>{loading ? 'Running…' : 'Run'}</Button>
        </div>
        {error && <p className="text-red-600" role="alert">{error}</p>}
        {result && (
          <div>
            <Badge variant="secondary">Result</Badge>
            <pre className="bg-muted p-3 rounded mt-2 text-sm overflow-auto" aria-live="polite">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


