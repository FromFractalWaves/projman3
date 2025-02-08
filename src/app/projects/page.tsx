// src/app/projects/page.tsx
'use client';

import React from 'react';
import { useProjects } from '@/hooks/useProjects';
import { ProjectForm } from '@/components/forms';

export default function ProjectsPage() {
  const { projects, loading } = useProjects();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <ProjectForm onSubmit={() => {}} />
      <div className="mt-6 space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold">{project.name}</h3>
            <p className="text-gray-400">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}