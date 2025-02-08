
// src/app/objectives/page.tsx
'use client';

import React from 'react';
import { useObjectives } from '@/hooks/useObjectives';
import { ObjectiveForm } from '@/components/forms';
import { useProjects } from '@/hooks/useProjects';

export default function ObjectivesPage() {
  const { objectives, loading } = useObjectives();
  const { projects } = useProjects();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Objectives</h1>
      <ObjectiveForm onSubmit={() => {}} projects={projects} />
      <div className="mt-6 space-y-4">
        {objectives.map((objective) => (
          <div key={objective.id} className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold">{objective.name}</h3>
            <p className="text-gray-400">{objective.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
