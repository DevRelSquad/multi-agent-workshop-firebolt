import { InteractiveExercise } from '@/components/workshop/InteractiveExercise';
import Link from 'next/link';

export default function WorkshopPage() {
  return (
    <div className="flex h-full">
      <main className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-semibold mb-2">Workshop</h1>
        <p className="text-muted-foreground mb-6">Follow the steps in the sidebar. Start with Setup.</p>
        <Link href="/workshop/01-setup" className="underline text-primary">Go to Step 1 →</Link>
      </main>
      
      <aside className="w-80 border-l p-4 hidden lg:block bg-card">
        <InteractiveExercise />
      </aside>
    </div>
  );
}


