import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import { CodeBlock } from '@/components/workshop/CodeBlock';
import { Hint } from '@/components/workshop/Hint';
import { Exercise } from '@/components/workshop/Exercise';
import { Checkpoint } from '@/components/workshop/Checkpoint';
import { TestButton } from '@/components/workshop/TestButton';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, BookOpen } from 'lucide-react';

function getStepFile(slug: string) {
  const file = path.join(process.cwd(), 'src', 'content', 'workshop-steps', `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const fileContent = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(fileContent);
  return { frontmatter: data, content };
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
  const stepData = getStepFile(params.step);
  const idx = steps.findIndex((s) => s.slug === params.step);
  const next = idx >= 0 && idx < steps.length - 1 ? steps[idx + 1] : null;
  const prev = idx > 0 ? steps[idx - 1] : null;
  
  return (
    <div className="flex h-full">
      <main className="flex-1 overflow-auto p-8 prose prose-zinc max-w-3xl mx-auto">
        {!stepData ? (
          <p>Step not found. Go back to the workshop overview.</p>
        ) : (
          <>
            {/* Frontmatter Header */}
            <div className="not-prose mb-8 border-b border-border pb-6">
              <div className="mb-4">
                <h1 className="text-3xl font-bold mb-2">{stepData.frontmatter.title}</h1>
                <p className="text-lg text-muted-foreground">{stepData.frontmatter.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{stepData.frontmatter.duration}</span>
                </div>
                <Badge variant={stepData.frontmatter.difficulty === 'beginner' ? 'default' : stepData.frontmatter.difficulty === 'intermediate' ? 'secondary' : 'warning'}>
                  {stepData.frontmatter.difficulty}
                </Badge>
              </div>
              
              {stepData.frontmatter.objectives && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold">Learning Objectives:</span>
                  </div>
                  <ul className="text-sm space-y-1 ml-6">
                    {stepData.frontmatter.objectives.map((objective: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-muted-foreground">•</span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* MDX Content */}
            {/* @ts-expect-error Server Component */}
            <MDXRemote source={stepData.content} components={components} />
          </>
        )}
        <div className="mt-8 flex items-center justify-between not-prose">
          <div>
            {prev && (
              <Link className="underline text-primary" href={`/workshop/${prev.slug}`} aria-label={`Previous: ${prev.title}`}>
                ← {prev.title}
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link className="underline text-primary" href={`/workshop/${next.slug}`} aria-label={`Next: ${next.title}`}>
                Next: {next.title} →
              </Link>
            )}
          </div>
        </div>
      </main>
      
      <aside className="w-80 border-l p-4 hidden xl:block bg-card">
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


