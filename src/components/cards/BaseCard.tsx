import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MoreVertical, 
  Clock, 
  Calendar,
  AlertCircle,
  CheckCircle2,
  CircleDashed
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Type definitions for the card system
type EntityType = 'project' | 'task' | 'objective' | 'todoList';

interface BaseCardProps {
  type: EntityType;
  title: string;
  description?: string;
  status?: string;
  startDate?: string;
  dueDate?: string;
  estimatedHours?: number;
  priority?: 'low' | 'medium' | 'high';
  variant?: 'default' | 'compact' | 'detailed';
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
  className?: string;
}

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'completed':
    case 'done':
      return 'bg-emerald-500/10 text-emerald-400';
    case 'in-progress':
    case 'active':
      return 'bg-blue-500/10 text-blue-400';
    case 'not-started':
    case 'todo':
      return 'bg-zinc-500/10 text-zinc-400';
    default:
      return 'bg-zinc-500/10 text-zinc-400';
  }
};

const getPriorityColor = (priority?: string) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return 'text-red-400';
    case 'medium':
      return 'text-yellow-400';
    case 'low':
      return 'text-blue-400';
    default:
      return 'text-zinc-400';
  }
};

const StatusIcon = ({ status }: { status?: string }) => {
  switch (status?.toLowerCase()) {
    case 'completed':
    case 'done':
      return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
    case 'in-progress':
    case 'active':
      return <CircleDashed className="h-4 w-4 text-blue-400" />;
    default:
      return <AlertCircle className="h-4 w-4 text-zinc-400" />;
  }
};

export function BaseCard({
  type,
  title,
  description,
  status,
  startDate,
  dueDate,
  estimatedHours,
  priority,
  variant = 'default',
  onEdit,
  onDelete,
  onClick,
  className,
}: BaseCardProps) {
  if (variant === 'compact') {
    return (
      <div 
        className={cn(
          "flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800/80 transition-colors cursor-pointer",
          className
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <StatusIcon status={status} />
          <div>
            <h3 className="text-sm font-medium text-zinc-100">{title}</h3>
            {description && (
              <p className="text-xs text-zinc-400 line-clamp-1">{description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status && (
            <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", getStatusColor(status))}>
              {status}
            </span>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card 
      className={cn(
        "bg-zinc-900 border-zinc-800 hover:bg-zinc-800/50 transition-colors cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex items-start gap-2">
          <StatusIcon status={status} />
          <div>
            <CardTitle className="text-base font-medium text-zinc-100">
              {title}
            </CardTitle>
            {description && (
              <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-zinc-400 hover:text-zinc-100"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {estimatedHours && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-zinc-400" />
                <span className="text-zinc-300">
                  Est: {estimatedHours}h
                </span>
              </div>
            )}
            {priority && (
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className={cn("h-4 w-4", getPriorityColor(priority))} />
                <span className={cn("capitalize", getPriorityColor(priority))}>
                  {priority}
                </span>
              </div>
            )}
          </div>

          {(startDate || dueDate) && (
            <div className="flex flex-wrap gap-4 text-sm">
              {startDate && (
                <div className="flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Start: {new Date(startDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              {dueDate && (
                <div className="flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Due: {new Date(dueDate).toLocaleDateString()}
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

// Higher-order components for specific entity types
export function ProjectCard({ project, ...props }) {
  return (
    <BaseCard
      type="project"
      title={project.name}
      description={project.description}
      status={project.status}
      startDate={project.startDate}
      dueDate={project.dueDate}
      estimatedHours={project.estimatedHours}
      {...props}
    />
  );
}

export function TaskCard({ task, ...props }) {
  return (
    <BaseCard
      type="task"
      title={task.content}
      description={task.description}
      status={task.status}
      startDate={task.startDate}
      dueDate={task.dueDate}
      estimatedHours={task.estimatedHours}
      priority={task.priority}
      {...props}
    />
  );
}

export function ObjectiveCard({ objective, ...props }) {
  return (
    <BaseCard
      type="objective"
      title={objective.name}
      description={objective.description}
      status={objective.status}
      startDate={objective.startDate}
      dueDate={objective.dueDate}
      estimatedHours={objective.estimatedHours}
      {...props}
    />
  );
}

export function TodoListCard({ todoList, ...props }) {
  return (
    <BaseCard
      type="todoList"
      title={todoList.name}
      description={`${todoList.tasks?.length || 0} tasks`}
      variant="compact"
      {...props}
    />
  );
}