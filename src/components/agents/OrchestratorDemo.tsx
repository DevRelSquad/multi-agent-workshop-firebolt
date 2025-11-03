"use client";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function OrchestratorDemo() {
  const [query, setQuery] = useState('Show revenue for this year');
  const [loading, setLoading] = useState(false);
  const [intent, setIntent] = useState<any>(null);
  const [route, setRoute] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setLoading(true);
    setError(null);
    setIntent(null);
    setRoute(null);
    try {
      const res = await fetch('/api/orchestrator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to parse intent');
      setIntent(data.intent);
      setRoute(data.route);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orchestrator</CardTitle>
        <CardDescription>Intent parsing and routing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input aria-label="User query" value={query} onChange={(e) => setQuery(e.target.value)} />
          <Button onClick={run} disabled={loading}>{loading ? 'Parsing…' : 'Parse'}</Button>
        </div>
        {error && <p className="text-red-600 mt-3" role="alert">{error}</p>}
        {intent && (
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Intent</Badge>
              <span className="font-mono">{intent.intent}</span>
              <Badge variant="outline">conf: {(intent.confidence * 100).toFixed(0)}%</Badge>
            </div>
            <Separator />
            <pre className="bg-muted p-3 rounded text-sm overflow-auto" aria-live="polite">{JSON.stringify(intent.entities, null, 2)}</pre>
            {route && (
              <div className="mt-3">
                <Badge>Route</Badge>
                <span className="ml-2 font-semibold capitalize">{route}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


