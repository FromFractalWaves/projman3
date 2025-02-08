
// src/app/time/page.tsx
'use client';

import React from 'react';
import { useTimeEntries } from '@/hooks/useTimeEntries';
import { TimeEntryForm } from '@/components/forms';
import { useTasks } from '@/hooks/useTasks';

export default function TimePage() {
  const { timeEntries, loading } = useTimeEntries();
  const { tasks } = useTasks();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Time Tracking</h1>
      <TimeEntryForm onSubmit={() => {}} tasks={tasks} />
      <div className="mt-6 space-y-4">
        {timeEntries.map((entry) => (
          <div key={entry.id} className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold">
              {entry.task?.content || 'Unknown Task'}
            </h3>
            <p className="text-gray-400">{entry.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
