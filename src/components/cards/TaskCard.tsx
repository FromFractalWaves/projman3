// src/components/cards/TaskCard.tsx
import React from 'react';
import { BaseCard } from './BaseCard';
import type { Task } from '@/types/task';
import type { TaskCardProps } from '@/types/cards/cardProps';
import { useTaskCard } from '@/hooks/cards/useTaskCards';
import { Play, Pause, Square, Check, Clock, AlertTriangle } from 'lucide-react';

export function TaskCard({
  task,
  variant = 'default',
  className,
  onClick,
  ...props
}: TaskCardProps) {
  const {
    stats,
    isTimerRunning,
    handleComplete,
    handleStartTimer,
    handleStopTimer,
    handleEdit,
    handleDelete
  } = useTaskCard(task);

  const actions = {
    complete: {
      label: 'Complete',
      icon: <Check className="h-4 w-4" />,
      onClick: handleComplete,
      variant: 'primary',
      disabled: task.status === 'done'
    },
    timer: isTimerRunning ? {
      label: 'Stop Timer',
      icon: <Square className="h-4 w-4" />,
      onClick: handleStopTimer,
      variant: 'secondary'
    } : {
      label: 'Start Timer',
      icon: <Play className="h-4 w-4" />,
      onClick: handleStartTimer,
      variant: 'secondary'
    },
    edit: {
      label: 'Edit',
      onClick: handleEdit,
      variant: 'secondary'
    },
    delete: {
      label: 'Delete',
      onClick: handleDelete,
      variant: 'destructive'
    }
  };

  return (
    <BaseCard
      type="task"
      title={task.content}
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
      {stats.isOverdue && (
        <div className="flex items-center gap-2 text-sm text-red-400">
          <AlertTriangle className="h-4 w-4" />
          <span>Overdue</span>
        </div>
      )}
      {task.estimatedHours && (
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Clock className="h-4 w-4" />
          <span>
            {stats.timeSpent} / {task.estimatedHours}h ({Math.round(stats.percentComplete)}%)
          </span>
        </div>
      )}
    </BaseCard>
  );
}