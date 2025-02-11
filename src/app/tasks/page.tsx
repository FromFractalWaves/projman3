// src/app/tasks/page.tsx
'use client';

import React from 'react';
import { CardList } from '@/components/cards';
import { useTasks } from '@/hooks/useTasks';

export default function TasksPage() {
  const { tasks, loading, error } = useTasks();

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error loading tasks: {error.message}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-zinc-100">Tasks</h1>
        <p className="text-zinc-400">Manage and track your tasks</p>
      </header>

      <CardList
        type="task"
        items={tasks}
        onItemClick={(task) => {
          // Handle task click if needed
          console.log('Task clicked:', task);
        }}
      />
    </div>
  );
}