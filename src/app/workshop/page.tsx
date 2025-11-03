import { ProgressTracker } from '@/components/workshop/ProgressTracker';
import { StepNavigation } from '@/components/workshop/StepNavigation';
import { InteractiveExercise } from '@/components/workshop/InteractiveExercise';
import Link from 'next/link';

const workshopSteps = [
  { slug: '01-setup', title: 'Setup' },
  { slug: '02-orchestrator', title: 'Orchestrator' },
  { slug: '03-analytics', title: 'Analytics' },
  { slug: '04-report', title: 'Report' },
  { slug: '05-integration', title: 'Integration' },
];

export default function WorkshopPage() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r">
        <ProgressTracker />
        <StepNavigation steps={workshopSteps} />
      </aside>
      
      <main className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-semibold mb-2">Workshop</h1>
        <p className="text-muted-foreground mb-6">Follow the steps on the left. Start with Setup.</p>
        <Link href="/workshop/01-setup" className="underline text-primary">Go to Step 1 →</Link>
      </main>
      
      <aside className="w-80 border-l p-4 hidden lg:block">
        <InteractiveExercise />
      </aside>
    </div>
  );
}


