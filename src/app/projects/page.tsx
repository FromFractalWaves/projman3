import React from 'react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/dashboard/oldDash/DashboardLayout';
import Link from 'next/link';
import { Menu, FileEdit, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header with Navigation */}
      <div className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/projects">Projects</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/objectives">Objectives</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/tasks">Tasks</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/time">Time</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/todo">Todo</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/timeline">Timeline</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="flex items-center gap-2">
              <Link href="/notepad">
                <span className="flex items-center gap-2">
                  <FileEdit className="h-4 w-4" />
                  Notes
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Dashboard Layout */}
        <DashboardLayout />
      </div>
    </div>
  );
}