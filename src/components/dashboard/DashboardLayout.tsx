// src/components/dashboard/DashboardLayout.tsx
import React, { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { BarChart2, CheckSquare, Folder, ListChecks } from 'lucide-react';
import type { Project, Objective, Task, TodoList } from '@/types';
import { CardList } from '@/components/cards';
import TaskManagementButtons from '@/components/tasks/TaskManagementButtons';

export interface DashboardLayoutProps {
  projects: Project[];
  objectives: Objective[];
  tasks: Task[];
  todoLists: TodoList[];
  taskStats: {
    todo: number;
    inProgress: number;
    done: number;
  };
  onRefresh: () => Promise<void>;
}

export function DashboardLayout({
  projects,
  objectives,
  tasks,
  todoLists,
  taskStats,
  onRefresh
}: DashboardLayoutProps) {
  // Calculate statistics for the stats card
  const stats = useMemo(() => [
    { value: projects.length, label: 'Total Projects' },
    { value: objectives.length, label: 'Total Objectives' },
    { value: tasks.length, label: 'Total Tasks' },
    { value: taskStats.done, label: 'Completed Tasks' },
    { value: taskStats.inProgress, label: 'Tasks In Progress' },
    { value: tasks.filter(t => t.priority === 'high').length, label: 'High Priority Tasks' }
  ], [projects.length, objectives.length, tasks, taskStats]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Project Dashboard</h1>
        <p className="text-gray-400">
          Managing {projects.length} projects with {objectives.length} objectives and {tasks.length} tasks
        </p>
      </header>

      {/* Stats Section */}
      <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 size={20} />
          <h2 className="text-lg font-semibold">Statistics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <h4 className="text-2xl font-bold text-gray-100">{stat.value}</h4>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects Column */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Folder size={20} />
                <h2 className="text-lg font-semibold">Projects</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={onRefresh}>
                Refresh
              </Button>
            </div>
            <CardList
              type="project"
              items={projects}
              layout="grid"
              variant="default"
            />
          </div>
        </div>

        {/* Right Column - Tasks and Todo Lists */}
        <div className="space-y-6">
          {/* Recent Tasks Section */}
          <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <CheckSquare size={20} />
              <h2 className="text-lg font-semibold">Recent Tasks</h2>
            </div>
            <CardList
              type="task"
              items={tasks.slice(0, 5)}
              layout="list"
              variant="compact"
            />
          </div>

          {/* Task Management Section */}
          <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Task Management</h2>
            <TaskManagementButtons />
          </div>

          {/* Todo Lists Section */}
          <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <ListChecks size={20} />
              <h2 className="text-lg font-semibold">Todo Lists</h2>
            </div>
            <CardList
              type="todoList"
              items={todoLists}
              layout="list"
              variant="compact"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;