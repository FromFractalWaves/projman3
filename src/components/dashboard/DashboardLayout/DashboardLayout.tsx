import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart2, 
  CheckSquare, 
  Folder, 
  ListChecks,
  Target,
  Clock,
  Plus
} from 'lucide-react';
import { CardList } from '@/components/cards';
import type { Project, Objective, Task, TodoList } from '@/types';

// Stats Card Component
const StatsCard = ({ 
  title, 
  value, 
  icon: Icon,
  className 
}: { 
  title: string;
  value: number;
  icon: React.ElementType;
  className?: string;
}) => (
  <div className={`rounded-lg bg-zinc-800/50 border border-zinc-700/50 p-4 ${className}`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-zinc-400" />
        <h3 className="text-sm font-medium text-zinc-300">{title}</h3>
      </div>
      <p className="text-2xl font-semibold text-zinc-100">{value}</p>
    </div>
  </div>
);

// Dashboard Grid Component
const DashboardGrid = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${className}`}>
    {children}
  </div>
);

interface DashboardHeaderProps {
  projectCount: number;
  objectiveCount: number;
  taskCount: number;
  completedTaskCount: number;
  onRefresh: () => void;
}

// Dashboard Header Component
const DashboardHeader = ({
  projectCount,
  objectiveCount,
  taskCount,
  completedTaskCount,
  onRefresh
}: DashboardHeaderProps) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Dashboard</h1>
        <p className="text-sm text-zinc-400">
          Managing {projectCount} projects with {objectiveCount} objectives and {taskCount} tasks
        </p>
      </div>
      <Button variant="outline" size="sm" onClick={onRefresh}>
        Refresh
      </Button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard 
        title="Total Projects" 
        value={projectCount} 
        icon={Folder} 
      />
      <StatsCard 
        title="Total Objectives" 
        value={objectiveCount} 
        icon={Target} 
      />
      <StatsCard 
        title="Active Tasks" 
        value={taskCount - completedTaskCount} 
        icon={CheckSquare} 
      />
      <StatsCard 
        title="Completed Tasks" 
        value={completedTaskCount} 
        icon={Clock} 
      />
    </div>
  </div>
);

// Quick Actions Component
const QuickActions = ({
  onAddProject,
  onAddObjective,
  onAddTask,
  onAddTodoList
}: {
  onAddProject: () => void;
  onAddObjective: () => void;
  onAddTask: () => void;
  onAddTodoList: () => void;
}) => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-zinc-100">Quick Actions</h2>
    <div className="grid grid-cols-2 gap-4">
      <Button 
        variant="outline" 
        className="justify-start gap-2" 
        onClick={onAddProject}
      >
        <Plus className="h-4 w-4" />
        New Project
      </Button>
      <Button 
        variant="outline" 
        className="justify-start gap-2" 
        onClick={onAddObjective}
      >
        <Plus className="h-4 w-4" />
        New Objective
      </Button>
      <Button 
        variant="outline" 
        className="justify-start gap-2" 
        onClick={onAddTask}
      >
        <Plus className="h-4 w-4" />
        New Task
      </Button>
      <Button 
        variant="outline" 
        className="justify-start gap-2" 
        onClick={onAddTodoList}
      >
        <Plus className="h-4 w-4" />
        New Todo List
      </Button>
    </div>
  </div>
);

interface DashboardLayoutProps {
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
  onAddProject?: () => void;
  onAddObjective?: () => void;
  onAddTask?: () => void;
  onAddTodoList?: () => void;
}

export function DashboardLayout({
  projects,
  objectives,
  tasks,
  todoLists,
  taskStats,
  onRefresh,
  onAddProject,
  onAddObjective,
  onAddTask,
  onAddTodoList
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-900 p-6 space-y-8">
      {/* Header with Stats */}
      <DashboardHeader
        projectCount={projects.length}
        objectiveCount={objectives.length}
        taskCount={tasks.length}
        completedTaskCount={taskStats.done}
        onRefresh={onRefresh}
      />

      {/* Main Content */}
      <DashboardGrid>
        {/* Left Column - Projects and Tasks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Projects Section */}
          <Card className="bg-zinc-800/40 border-zinc-700/50">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Folder className="h-5 w-5 text-zinc-400" />
                  <h2 className="text-lg font-semibold text-zinc-100">Projects</h2>
                </div>
              </div>
              <CardList
                type="project"
                items={projects}
                variant="compact"
              />
            </div>
          </Card>

          {/* Tasks Section */}
          <Card className="bg-zinc-800/40 border-zinc-700/50">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-zinc-400" />
                  <h2 className="text-lg font-semibold text-zinc-100">Recent Tasks</h2>
                </div>
              </div>
              <CardList
                type="task"
                items={tasks.slice(0, 5)}
                variant="compact"
              />
            </div>
          </Card>
        </div>

        {/* Right Column - Quick Actions and Todo Lists */}
        <div className="space-y-6">
          {/* Quick Actions */}
          {(onAddProject || onAddObjective || onAddTask || onAddTodoList) && (
            <Card className="bg-zinc-800/40 border-zinc-700/50">
              <div className="p-6">
                <QuickActions
                  onAddProject={onAddProject || (() => {})}
                  onAddObjective={onAddObjective || (() => {})}
                  onAddTask={onAddTask || (() => {})}
                  onAddTodoList={onAddTodoList || (() => {})}
                />
              </div>
            </Card>
          )}

          {/* Todo Lists */}
          <Card className="bg-zinc-800/40 border-zinc-700/50">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-zinc-400" />
                  <h2 className="text-lg font-semibold text-zinc-100">Todo Lists</h2>
                </div>
              </div>
              <CardList
                type="todoList"
                items={todoLists}
                variant="compact"
              />
            </div>
          </Card>
        </div>
      </DashboardGrid>
    </div>
  );
}

export default DashboardLayout;