'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/components/utils';

interface WorkshopStep {
  slug: string;
  title: string;
  description?: string;
}

const workshopSteps: WorkshopStep[] = [
  { slug: '01-setup', title: 'Setup', description: 'Environment configuration' },
  { slug: '02-orchestrator', title: 'Orchestrator', description: 'Multi-agent coordination' },
  { slug: '03-analytics', title: 'Analytics', description: 'Data analysis agent' },
  { slug: '04-report', title: 'Report', description: 'Report generation agent' },
  { slug: '05-integration', title: 'Integration', description: 'System integration' },
];

interface WorkshopSidebarProps {
  title?: string;
  subtitle?: string;
}

export function WorkshopSidebar({ title = "Firebolt", subtitle = "Workshop" }: WorkshopSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar text-sidebar-foreground">
      {/* Header */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-8 w-8 items-center justify-center">
          <Image 
            src="/firebolt.png" 
            alt="Firebolt Logo"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm tracking-tight">{title}</span>
          {subtitle && (
            <span className="text-xs text-sidebar-foreground/70">{subtitle}</span>
          )}
        </div>
      </div>

      {/* Workshop Steps */}
      <div className="flex-1 p-4">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-sidebar-foreground mb-2">Workshop Steps</h3>
        </div>
        
        <nav className="space-y-1">
          {workshopSteps.map((step, index) => {
            const stepPath = `/workshop/${step.slug}`;
            const isActive = pathname === stepPath;
            const isCompleted = false; // You can add completion logic here
            
            return (
              <Link
                key={step.slug}
                href={stepPath}
                className={cn(
                  "flex items-start gap-3 rounded-lg px-3 py-3 text-sm transition-colors",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <div className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium mt-0.5",
                  isActive 
                    ? "bg-firebolt text-white" 
                    : isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-sidebar-accent text-sidebar-accent-foreground"
                )}>
                  {isCompleted ? "✓" : index + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{step.title}</div>
                  {step.description && (
                    <div className="text-xs text-sidebar-foreground/70 mt-0.5">
                      {step.description}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 pt-4 border-t border-sidebar-border">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m0 7h18" />
            </svg>
            Back to Overview
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <svg className="h-4 w-4 text-sidebar-foreground/60" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span className="text-xs text-sidebar-foreground/60">Stars on GitHub</span>
          <span className="text-xs text-sidebar-foreground font-medium">52K</span>
        </div>
        <Link 
          href="/"
          className="block w-full rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 px-3 py-2 text-sm text-sidebar-accent-foreground transition-colors text-center"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}