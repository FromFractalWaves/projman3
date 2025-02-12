// src/hooks/cards/useObjectiveCard.ts
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCard } from './useCard';
import { useObjectives } from '@/hooks/useObjectives';
import type { Objective } from '@/types';
import { getDaysRemaining } from '@/lib/utils/cards/cardFormatters';

interface ObjectiveStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  timeSpent: number;
  estimatedTime: number;
  progress: number;
  daysRemaining: number;
  isOverdue: boolean;
}

export function useObjectiveCard(objective: Objective) {
  const router = useRouter();
  const { updateObjective } = useObjectives();
  const { loading, error, handleEdit, handleDelete } = useCard({
    type: 'objective',
    id: objective.id
  });

  // Calculate objective statistics
  const stats: ObjectiveStats = useMemo(() => {
    const tasks = objective.tasks || [];
    const completedTasks = tasks.filter(t => t.status === 'done');
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
    const timeSpent = tasks.reduce((total, task) => total + (task.actualHours || 0), 0);
    const estimatedTime = tasks.reduce((total, task) => total + (task.estimatedHours || 0), 0);
    const progress = tasks.length > 0 
      ? (completedTasks.length / tasks.length) * 100 
      : 0;

    return {
      totalTasks: tasks.length,
      completedTasks: completedTasks.length,
      inProgressTasks: inProgressTasks.length,
      timeSpent,
      estimatedTime,
      progress,
      daysRemaining: objective.dueDate ? getDaysRemaining(objective.dueDate) : 0,
      isOverdue: objective.dueDate ? new Date(objective.dueDate) < new Date() : false
    };
  }, [objective]);

  // Handle viewing objective tasks
  const handleViewTasks = useCallback(() => {
    router.push(`/objectives/${objective.id}/tasks`);
  }, [router, objective.id]);

  // Handle adding a new task
  const handleAddTask = useCallback(() => {
    router.push(`/tasks/new?objectiveId=${objective.id}`);
  }, [router, objective.id]);

  // Handle marking objective as complete
  const handleMarkComplete = useCallback(async () => {
    try {
      await updateObjective(objective.id, {
        status: 'completed',
        completedAt: new Date().toISOString()
      });
      router.refresh();
    } catch (error) {
      console.error('Error completing objective:', error);
    }
  }, [updateObjective, objective.id, router]);

  // Handle duplicating objective
  const handleDuplicate = useCallback(async () => {
    try {
      const duplicatedObjective = await updateObjective('new', {
        ...objective,
        id: undefined,
        name: `${objective.name} (Copy)`,
        status: 'not-started',
        tasks: [] // Don't copy tasks to the new objective
      });
      router.push(`/objectives/${duplicatedObjective.id}`);
    } catch (error) {
      console.error('Error duplicating objective:', error);
    }
  }, [updateObjective, objective, router]);

  // Handle exporting objective data
  const handleExport = useCallback(() => {
    try {
      const data = {
        name: objective.name,
        description: objective.description,
        status: objective.status,
        startDate: objective.startDate,
        dueDate: objective.dueDate,
        estimatedHours: objective.estimatedHours,
        tasks: objective.tasks?.map(task => ({
          content: task.content,
          description: task.description,
          status: task.status,
          priority: task.priority,
          estimatedHours: task.estimatedHours,
          actualHours: task.actualHours
        })),
        stats
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `objective-${objective.name.toLowerCase().replace(/\s+/g, '-')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting objective:', error);
    }
  }, [objective, stats]);

  return {
    stats,
    loading,
    error,
    handleEdit,
    handleDelete,
    handleViewTasks,
    handleAddTask,
    handleMarkComplete,
    handleDuplicate,
    handleExport
  };
}