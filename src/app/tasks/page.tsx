
// src/app/tasks/page.tsx
'use client';

import React from 'react';
import { useTasks } from '@/hooks/useTasks';
import { TaskForm } from '@/components/forms';
import { useProjects } from '@/hooks/useProjects';
import { useObjectives } from '@/hooks/useObjectives';

export default function TasksPage() {
  const { tasks, loading } = useTasks();
  const { projects } = useProjects();
  const { objectives } = useObjectives();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>
      <TaskForm onSubmit={() => {}} projects={projects} objectives={objectives} />
      <div className="mt-6 space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold">{task.content}</h3>
            <p className="text-gray-400">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}