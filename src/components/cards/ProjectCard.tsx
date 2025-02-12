import React from 'react';
import { Card } from '@/components/ui/card';
import { Folder, BarChart2, Target, CheckSquare, Calendar, Clock } from 'lucide-react';
import { BaseCard } from '../BaseCard';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import { useProjectCard } from '@/hooks/cards/useProjectCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'compact';
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

// Helper component for project statistics
const ProjectStats: React.FC<{ 
  totalTasks: number;
  completedTasks: number;
  totalObjectives: number;
  activeObjectives: number;
}> = ({ 
  totalTasks, 
  completedTasks, 
  totalObjectives, 
  activeObjectives 
}) => (
  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
    <div className="space-y-2">
      <div className="flex justify-between text-zinc-400">
        <span>Tasks</span>
        <span>{completedTasks}/{totalTasks}</span>
      </div>
      <Progress 
        value={(completedTasks / Math.max(totalTasks, 1)) * 100} 
        className="h-1"
      />
    </div>
    <div className="space-y-2">
      <div className="flex justify-between text-zinc-400">
        <span>Objectives</span>
        <span>{activeObjectives}/{totalObjectives}</span>
      </div>
      <Progress 
        value={(activeObjectives / Math.max(totalObjectives, 1)) * 100} 
        className="h-1"
      />
    </div>
  </div>
);

// Project Timeline component
const ProjectTimeline: React.FC<{
  startDate?: Date;
  dueDate?: Date;
  progress: number;
}> = ({ startDate, dueDate, progress }) => {
  if (!startDate || !dueDate) return null;

  const today = new Date();
  const totalDays = Math.ceil((dueDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const elapsedDays = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const progressPercentage = Math.min((elapsedDays / totalDays) * 100, 100);

  return (
    <div className="mt-4 space-y-2">
      <div className="flex justify-between text-sm text-zinc-400">
        <span>{startDate.toLocaleDateString()}</span>
        <span>{dueDate.toLocaleDateString()}</span>
      </div>
      <div className="relative">
        <Progress value={progressPercentage} className="h-1" />
        <Progress 
          value={progress} 
          className="h-1 absolute top-0 left-0 bg-emerald-500"
        />
      </div>
    </div>
  );
};

export function ProjectCard({
  project,
  variant = 'default',
  className,
  onEdit,
  onDelete,
  onClick,
}: ProjectCardProps) {
  const {
    handleEdit,
    handleDelete,
    handleViewTimeline,
    handleViewObjectives,
    handleViewTasks,
    stats,
    timeProgress,
  } = useProjectCard(project);

  const cardActions = {
    viewTimeline: {
      label: 'Timeline',
      icon: <Calendar className="h-4 w-4" />,
      onClick: handleViewTimeline,
      variant: 'ghost'
    },
    viewObjectives: {
      label: 'Objectives',
      icon: <Target className="h-4 w-4" />,
      onClick: handleViewObjectives,
      variant: 'ghost'
    },
    viewTasks: {
      label: 'Tasks',
      icon: <CheckSquare className="h-4 w-4" />,
      onClick: handleViewTasks,
      variant: 'ghost'
    },
    edit: {
      label: 'Edit',
      icon: <Folder className="h-4 w-4" />,
      onClick: handleEdit || onEdit,
      variant: 'outline'
    },
    delete: {
      label: 'Delete',
      icon: <Folder className="h-4 w-4" />,
      onClick: handleDelete || onDelete,
      variant: 'destructive'
    }
  };

  if (variant === 'compact') {
    return (
      <BaseCard
        type="project"
        title={project.name}
        description={project.description}
        status={project.status}
        startDate={project.startDate?.toISOString()}
        dueDate={project.dueDate?.toISOString()}
        estimatedHours={project.estimatedHours}
        actions={cardActions}
        variant="compact"
        className={className}
        onClick={onClick}
      />
    );
  }

  return (
    <Card 
      className={cn(
        "bg-zinc-900 border-zinc-800 hover:bg-zinc-800/50 transition-colors",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-zinc-100">{project.name}</h3>
            {project.description && (
              <p className="text-sm text-zinc-400">{project.description}</p>
            )}
          </div>
          
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="icon">
                <BarChart2 className="h-4 w-4" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent 
              className="w-80 bg-zinc-800 border-zinc-700"
              align="end"
            >
              <div className="space-y-4">
                <h4 className="text-sm font-semibold">Project Statistics</h4>
                <ProjectStats {...stats} />
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>

        {(project.startDate || project.dueDate) && (
          <ProjectTimeline
            startDate={project.startDate}
            dueDate={project.dueDate}
            progress={timeProgress}
          />
        )}

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {project.estimatedHours && (
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Clock className="h-4 w-4" />
                <span>Est: {project.estimatedHours}h</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {Object.entries(cardActions).map(([key, action]) => (
              <Button
                key={key}
                variant={action.variant || 'default'}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick();
                }}
                className="gap-2"
              >
                {action.icon}
                <span className="hidden sm:inline">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProjectCard;