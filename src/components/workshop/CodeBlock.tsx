"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export function CodeBlock({ code, language = 'tsx', onTry }: { code: string; language?: string; onTry?: () => void }) {
  const [copied, setCopied] = useState(false);
  async function onCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <div className="rounded-md border overflow-hidden">
      <div className="flex items-center justify-end gap-2 p-2 bg-muted">
        <Button size="sm" variant="outline" onClick={onCopy}>{copied ? 'Copied' : 'Copy'}</Button>
        {onTry && (
          <Button size="sm" onClick={onTry}>Try it</Button>
        )}
      </div>
      <SyntaxHighlighter language={language} style={oneDark} customStyle={{ margin: 0 }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}


