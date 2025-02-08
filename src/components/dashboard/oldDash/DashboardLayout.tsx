// src/components/dashboard/DashboardLayout/DashboardLayout.tsx
import React, { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { ProjectStats } from './ProjectStats';
import { TaskList } from './TaskList';
import { ProjectList } from './ProjectList';
import { TodoListSummary } from './TodoListSummary';
import type { Project, Objective, Task, TodoList } from '@/types';

// src/components/dashboard/DashboardLayout/DashboardLayout.tsx
export interface DashboardLayoutProps {
  projects: Project[];
  objectives: Objective[];
  tasks: Task[];
  todoLists: TodoList[];
  onRefresh: () => void;
}

export function DashboardLayout({ 
  projects, 
  objectives, 
  tasks, 
  todoLists,
  onRefresh 
}: DashboardLayoutProps) {
  // Calculate statistics for ProjectStats component
  const stats = useMemo(() => ({
    projectCount: projects.length,
    objectiveCount: objectives.length,
    taskCount: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'done').length,
    inProgressTasks: tasks.filter(t => t.status === 'in-progress').length,
    highPriorityTasks: tasks.filter(t => t.priority === 'high').length
  }), [projects, objectives, tasks]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Project Dashboard</h1>
        <p className="text-gray-400">
          Managing {projects.length} projects with {objectives.length} objectives and {tasks.length} tasks
        </p>
      </header>

      {/* Project Statistics */}
      <ProjectStats {...stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Project List - Takes up 2 columns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Projects Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectList
                projects={projects}
                objectives={objectives}
                tasks={tasks}
                onRefresh={onRefresh}
              />
            </CardContent>
          </Card>
        </div>

        {/* Side Column - Tasks and Todo Lists */}
        <div className="space-y-6">
          <TaskList
            tasks={tasks}
            projects={projects}
            objectives={objectives}
            onRefresh={onRefresh}
          />
          <TodoListSummary todoLists={todoLists} />
        </div>
      </div>
    </div>
  );
}