
// src/components/cards/TaskCard.tsx
import React from 'react';
import { BaseCard } from './BaseCard';
import type { TaskCardProps } from '@/types/cards/cardProps';
import { Play, Square, Check, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TaskCard({
  task,
  variant = 'default',
  className,
  onClick,
  ...props
}: TaskCardProps) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
  const progress = task.estimatedHours && task.actualHours
    ? Math.min((task.actualHours / task.estimatedHours) * 100, 100)
    : 0;

  const actions = {
    complete: {
      label: 'Complete',
      icon: <Check className="h-4 w-4" />,
      onClick: () => {},
      variant: 'primary' as const,
      disabled: task.status === 'done'
    },
    timer: {
      label: 'Start Timer',
      icon: <Play className="h-4 w-4" />,
      onClick: () => {},
      variant: 'secondary' as const
    },
    edit: {
      label: 'Edit',
      onClick: () => {},
      variant: 'secondary' as const
    },
    delete: {
      label: 'Delete',
      onClick: () => {},
      variant: 'destructive' as const
    }
  };

  return (
    <BaseCard
      content={task.content}
      description={task.description}
      status={task.status}
      priority={task.priority}
      startDate={task.startDate?.toISOString()}
      dueDate={task.dueDate?.toISOString()}
      estimatedHours={task.estimatedHours}
      actions={actions}
      variant={variant}
      className={className}
      onClick={onClick}
      {...props}
    >
      {isOverdue && task.status !== 'done' && (
        <div className="flex items-center gap-2 text-sm text-red-400">
          <AlertTriangle className="h-4 w-4" />
          <span>Overdue</span>
        </div>
      )}
      {task.estimatedHours && (
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Clock className="h-4 w-4" />
          <span>
            {task.actualHours || 0} / {task.estimatedHours}h ({Math.round(progress)}%)
          </span>
        </div>
      )}
    </BaseCard>
  );
}