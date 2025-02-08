// src/components/dashboard/DashboardLayout/TaskList.tsx
import React from 'react';
import type { Task, Project } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Objective } from '@/types';


// src/components/dashboard/DashboardLayout/TaskList.tsx
interface TaskListProps {
  tasks: Task[];
  projects: Project[];
  objectives: Objective[];
  onRefresh: () => void;
}

export function TaskList({ tasks, projects }: TaskListProps) {
  const getProjectName = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    return project ? project.name : 'Unknown Project';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="p-2 border rounded-md">
                <h3 className="text-lg font-semibold">{task.content}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500">
                  Status: {task.status} | Priority: {task.priority}
                </p>
                <p className="text-sm text-gray-500">
                  Project: {getProjectName(task.projectId)}
                </p>
                <p className="text-sm text-gray-500">
                  Estimated Hours: {task.estimatedHours || 'N/A'} | Actual Hours: {task.actualHours || 'N/A'}
                </p>
                <p className="text-sm text-gray-500">
                  Start Date: {task.startDate ? new Date(task.startDate).toLocaleDateString() : 'N/A'} | Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
