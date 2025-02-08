// src/components/dashboard/DashboardLayout/ProjectList.tsx
import React from 'react';
import type { Project, Objective, Task } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';


// src/components/dashboard/DashboardLayout/ProjectList.tsx
interface ProjectListProps {
  projects: Project[];
  objectives: Objective[];
  tasks: Task[];
  onRefresh: () => void;
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardContent>
        {projects.length === 0 ? (
          <p>No projects available.</p>
        ) : (
          <ul className="space-y-2">
            {projects.map((project) => (
              <li key={project.id} className="p-2 border rounded-md">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
                <p className="text-sm text-gray-500">
                  Status: {project.status} | Estimated Hours: {project.estimatedHours || 'N/A'}
                </p>
                <p className="text-sm text-gray-500">
                  Start Date: {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'} | Due Date: {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'N/A'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
