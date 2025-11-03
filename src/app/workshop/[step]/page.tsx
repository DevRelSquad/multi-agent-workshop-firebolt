import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { CodeBlock } from '@/components/workshop/CodeBlock';
import { Hint } from '@/components/workshop/Hint';
import { Exercise } from '@/components/workshop/Exercise';
import { Checkpoint } from '@/components/workshop/Checkpoint';
import { TestButton } from '@/components/workshop/TestButton';
import Link from 'next/link';

function getStepFile(slug: string) {
  const file = path.join(process.cwd(), 'src', 'content', 'workshop-steps', `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, 'utf8');
}

const components = {
  CodeBlock,
  Hint,
  Exercise,
  Checkpoint,
  TestButton,
};

const steps = [
  { slug: '01-setup', title: 'Setup' },
  { slug: '02-orchestrator', title: 'Orchestrator' },
  { slug: '03-analytics', title: 'Analytics' },
  { slug: '04-report', title: 'Report' },
  { slug: '05-integration', title: 'Integration' },
];

export default async function StepPage({ params }: { params: { step: string } }) {
  const source = getStepFile(params.step);
  const idx = steps.findIndex((s) => s.slug === params.step);
  const next = idx >= 0 && idx < steps.length - 1 ? steps[idx + 1] : null;
  const prev = idx > 0 ? steps[idx - 1] : null;
  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-auto p-8 prose prose-zinc max-w-3xl">
        {!source ? (
          <p>Step not found. Go back to the workshop overview.</p>
        ) : (
          <MDXRemote source={source} components={components} />
        )}
        <div className="mt-8 flex items-center justify-between">
          <div>
            {prev && (
              <Link className="underline" href={`/workshop/${prev.slug}`} aria-label={`Previous: ${prev.title}`}>
                ← {prev.title}
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link className="underline" href={`/workshop/${next.slug}`} aria-label={`Next: ${next.title}`}>
                Next: {next.title} →
              </Link>
            )}
          </div>
        </div>
      </main>
      <aside className="w-80 border-l p-4 hidden xl:block">
        <div className="space-y-2">
          <h3 className="font-semibold">Checkpoints</h3>
          <ul className="list-disc pl-5 text-sm">
            <li>Run demo queries</li>
            <li>Complete TODOs</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}


