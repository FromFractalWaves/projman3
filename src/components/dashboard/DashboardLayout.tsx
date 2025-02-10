// src/components/dashboard/DashboardLayout.tsx
import React, { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { BarChart2, CheckSquare, Folder, ListChecks, Calendar, Clock } from 'lucide-react';
import type { Project, Objective, Task, TodoList } from '@/types';
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
  // Calculate statistics for the stats card.
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
            <div className="space-y-4">
              {projects.map(project => (
                <div key={project.id} className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-100">{project.name}</h3>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/10 text-blue-400">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{project.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock size={16} />
                      Est: {project.estimatedHours}h
                    </div>
                    {project.startDate && project.dueDate && (
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Tasks, Task Management, and Todo Lists */}
        <div className="space-y-6">
          {/* Recent Tasks Section */}
          <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <CheckSquare size={20} />
              <h2 className="text-lg font-semibold">Recent Tasks</h2>
            </div>
            <div className="space-y-4">
              {tasks.slice(0, 5).map(task => (
                <div key={task.id} className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-100">{task.content}</h3>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-red-500/10 text-red-400">
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{task.description}</p>
                </div>
              ))}
            </div>
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
            <div className="space-y-3">
              {todoLists.map(list => (
                <div key={list.id} className="flex justify-between items-center p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/70 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-100">{list.name}</span>
                    <span className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-400">
                      {list.type}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {list.tasks?.length || 0} tasks
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
