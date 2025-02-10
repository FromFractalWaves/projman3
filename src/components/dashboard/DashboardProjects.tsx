import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { 
  BarChart2, 
  CheckSquare, 
  Folder, 
  ListChecks,
  PlusCircle
} from 'lucide-react';
import { ProjectList } from './oldDash';
import type { Project, Task, TodoList } from '@/types';

interface DashboardProjectsProps {
  projects: Project[];
  tasks: Task[];
  todoLists: TodoList[];
  onAddProject?: () => void;
  onProjectClick?: (project: Project) => void;
}

export default function DashboardProjects({
  projects,
  tasks,
  todoLists,
  onAddProject,
  onProjectClick
}: DashboardProjectsProps) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Folder className="h-5 w-5 text-zinc-400" />
          <h2 className="text-lg font-semibold text-zinc-100">Projects</h2>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onAddProject}
          className="gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      <ProjectList 
        projects={projects} 
        layout="list" 
        variant="compact"
        onProjectClick={onProjectClick}
      />
    </div>
  );
}