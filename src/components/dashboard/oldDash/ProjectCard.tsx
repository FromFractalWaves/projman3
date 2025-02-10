import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { 
  Folder, 
  MoreVertical, 
  Clock, 
  Calendar,
  CheckSquare,
  Target
} from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'compact' | 'timeline';
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

export default function ProjectCard({
  project,
  variant = 'default',
  className = '',
  onEdit,
  onDelete,
  onClick
}: ProjectCardProps) {
  // Determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/10 text-emerald-400';
      case 'completed':
        return 'bg-blue-500/10 text-blue-400';
      case 'in-progress':
        return 'bg-amber-500/10 text-amber-400';
      default:
        return 'bg-zinc-500/10 text-zinc-400';
    }
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800/80 transition-colors">
        <div className="flex items-center gap-3">
          <Folder className="h-4 w-4 text-zinc-400" />
          <div>
            <h3 className="text-sm font-medium text-zinc-100">{project.name}</h3>
            <p className="text-xs text-zinc-400">
              {project.tasks?.length || 0} tasks · {project.objectives?.length || 0} objectives
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  if (variant === 'timeline') {
    return (
      <div className="flex gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
        <div className="flex-shrink-0">
          <Folder className="h-5 w-5 text-zinc-400" />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-zinc-100">{project.name}</h3>
              <p className="text-xs text-zinc-400 mt-1">{project.description}</p>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>
          <div className="mt-2 flex gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-1">
              <CheckSquare className="h-3 w-3" />
              {project.tasks?.length || 0} tasks
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              {project.objectives?.length || 0} objectives
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default full card view
  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800/50 transition-colors">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex items-start gap-2">
          <Folder className="h-5 w-5 text-zinc-400 mt-1" />
          <div>
            <CardTitle className="text-base font-medium text-zinc-100">
              {project.name}
            </CardTitle>
            {project.description && (
              <p className="text-sm text-zinc-400 mt-1">
                {project.description}
              </p>
            )}
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-zinc-400 hover:text-zinc-100"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-zinc-400" />
              <span className="text-zinc-300">
                Est: {project.estimatedHours || 0}h
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckSquare className="h-4 w-4 text-zinc-400" />
              <span className="text-zinc-300">
                {project.tasks?.length || 0} tasks
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-zinc-400" />
              <span className="text-zinc-300">
                {project.objectives?.length || 0} objectives
              </span>
            </div>
          </div>

          {(project.startDate || project.dueDate) && (
            <div className="flex flex-wrap gap-4 text-sm">
              {project.startDate && (
                <div className="flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Start: {new Date(project.startDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              {project.dueDate && (
                <div className="flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Due: {new Date(project.dueDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}