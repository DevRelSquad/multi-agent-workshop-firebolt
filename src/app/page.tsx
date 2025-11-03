import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrchestratorDemo } from '@/components/agents/OrchestratorDemo';
import { AnalyticsDemo } from '@/components/agents/AnalyticsDemo';
import { ReportDemo } from '@/components/agents/ReportDemo';
import { Separator } from '@/components/ui/separator';
import { AppLayout } from '@/components/layout/AppLayout';

export default function Home() {
  return (
    <AppLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Multi-Agent AI Demo</h1>
          <p className="text-muted-foreground mb-8">Gemini + Firebolt MCP + Gmail (sandbox) • Next.js 14</p>
          
          <Tabs defaultValue="demo">
            <TabsList>
              <TabsTrigger value="demo">Live Demo</TabsTrigger>
              <TabsTrigger value="workshop">Workshop Guide</TabsTrigger>
            </TabsList>
            
            <TabsContent value="demo">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-6">
                  <OrchestratorDemo />
                  <AnalyticsDemo />
                </div>
                <div className="space-y-6">
                  <ReportDemo />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="workshop">
              <div className="mt-6">
                <p className="mb-4">Head to the interactive workshop to complete the TODOs and extend the system.</p>
                <Link href="/workshop" className="underline text-primary">Go to Workshop →</Link>
                <Separator className="my-6" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}


