import React from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardGrid, DashboardGridItem } from './DashboardGrid';
import { DashboardStats } from './DashboardStats';
import { Card } from '@/components/ui/card';
import { CardList } from '@/components/cards';
import { 
  Folder, 
  CheckSquare,
  ListChecks,
} from 'lucide-react';
import type { Project, Objective, Task, TodoList } from '@/types';

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
  onRefresh,
}: DashboardLayoutProps) {
  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    totalTasks: tasks.length,
    completedTasks: taskStats.done,
    totalObjectives: objectives.length,
    achievedObjectives: objectives.filter(o => o.status === 'completed').length,
    overdueTasks: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date()).length,
    projectProgress: Math.round((projects.filter(p => p.status === 'completed').length / projects.length) * 100)
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-6 space-y-8">
      <DashboardHeader
        title="Dashboard"
        description={`Managing ${projects.length} projects with ${objectives.length} objectives and ${tasks.length} tasks`}
        onRefresh={onRefresh}
      />

      <DashboardStats stats={stats} />

      <DashboardGrid>
        <DashboardGridItem colSpan={2}>
          {/* Projects Section */}
          <Card className="bg-zinc-800/40 border-zinc-700/50">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Folder className="h-5 w-5 text-zinc-400" />
                <h2 className="text-lg font-semibold text-zinc-100">Projects</h2>
              </div>
              <CardList
                type="project"
                items={projects}
                variant="compact"
              />
            </div>
          </Card>

          {/* Tasks Section */}
          <Card className="bg-zinc-800/40 border-zinc-700/50 mt-6">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-zinc-400" />
                <h2 className="text-lg font-semibold text-zinc-100">Recent Tasks</h2>
              </div>
              <CardList
                type="task"
                items={tasks.slice(0, 5)}
                variant="compact"
              />
            </div>
          </Card>
        </DashboardGridItem>

        <DashboardGridItem>
          {/* Todo Lists */}
          <Card className="bg-zinc-800/40 border-zinc-700/50">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-zinc-400" />
                <h2 className="text-lg font-semibold text-zinc-100">Todo Lists</h2>
              </div>
              <CardList
                type="todoList"
                items={todoLists}
                variant="compact"
              />
            </div>
          </Card>
        </DashboardGridItem>
      </DashboardGrid>
    </div>
  );
}

export default DashboardLayout;