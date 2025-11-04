'use client';

import React from 'react';
import { WorkshopSidebar } from '@/components/ui/workshop-sidebar';

interface WorkshopLayoutProps {
  children: React.ReactNode;
}

export function WorkshopLayout({ children }: WorkshopLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <WorkshopSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}