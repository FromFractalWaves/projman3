// src/hooks/cards/useTaskCard.ts
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCard } from './useCard';
import { useTasks } from '@/hooks/useTasks';
import { useTimeEntries } from '@/hooks/useTimeEntries';
import type { Task } from '@/types';
import { formatDuration } from '@/lib/utils/cards/cardFormatters';

interface TaskStats {
  timeSpent: number;
  percentComplete: number;
  isOverdue: boolean;
  currentTimeEntryId: string | null;
}

export function useTaskCard(task: Task) {
  const router = useRouter();
  const { updateTask } = useTasks();
  const { createTimeEntry, updateTimeEntry } = useTimeEntries();
  const { loading, error, handleEdit, handleDelete } = useCard({
    type: 'task',
    id: task.id
  });

  // Local state for time tracking
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTimeEntryId, setCurrentTimeEntryId] = useState<string | null>(null);

  // Calculate task statistics
  const stats: TaskStats = {
    timeSpent: task.timeEntries?.reduce((total, entry) => {
      return total + (entry.duration || 0);
    }, 0) || 0,
    percentComplete: task.estimatedHours && task.actualHours 
      ? Math.min((task.actualHours / task.estimatedHours) * 100, 100)
      : 0,
    isOverdue: task.dueDate ? new Date(task.dueDate) < new Date() : false,
    currentTimeEntryId
  };

  // Check for any ongoing time entry on mount
  useEffect(() => {
    const ongoingEntry = task.timeEntries?.find(entry => !entry.endTime);
    if (ongoingEntry) {
      setIsTimerRunning(true);
      setCurrentTimeEntryId(ongoingEntry.id);
    }
  }, [task]);

  // Handle marking task as complete
  const handleComplete = useCallback(async () => {
    try {
      // Stop any running timer first
      if (isTimerRunning) {
        await handleStopTimer();
      }

      await updateTask(task.id, { 
        status: 'done',
        completedAt: new Date().toISOString()
      });
      router.refresh();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  }, [updateTask, task.id, router, isTimerRunning]);

  // Handle starting the timer
  const handleStartTimer = useCallback(async () => {
    try {
      // Don't start a new timer if one is already running
      if (isTimerRunning) return;

      const entry = await createTimeEntry({
        taskId: task.id,
        startTime: new Date().toISOString(),
        description: `Timer started for: ${task.content}`
      });

      setIsTimerRunning(true);
      setCurrentTimeEntryId(entry.id);

      // Update task status to in-progress if it's not already
      if (task.status === 'todo') {
        await updateTask(task.id, { status: 'in-progress' });
      }

      router.refresh();
    } catch (error) {
      console.error('Error starting timer:', error);
      setIsTimerRunning(false);
      setCurrentTimeEntryId(null);
    }
  }, [createTimeEntry, task, isTimerRunning, updateTask, router]);

  // Handle stopping the timer
  const handleStopTimer = useCallback(async () => {
    if (!currentTimeEntryId || !isTimerRunning) return;

    try {
      const endTime = new Date();
      const entry = await updateTimeEntry(currentTimeEntryId, {
        endTime: endTime.toISOString()
      });

      // Update task's actual hours
      if (entry.duration) {
        const additionalHours = entry.duration / 60; // Convert minutes to hours
        await updateTask(task.id, {
          actualHours: (task.actualHours || 0) + additionalHours
        });
      }

      setIsTimerRunning(false);
      setCurrentTimeEntryId(null);
      router.refresh();
    } catch (error) {
      console.error('Error stopping timer:', error);
    }
  }, [currentTimeEntryId, isTimerRunning, updateTimeEntry, updateTask, task, router]);

  // Handle pausing the timer
  const handlePauseTimer = useCallback(async () => {
    await handleStopTimer();
  }, [handleStopTimer]);

  // Handle resuming the timer
  const handleResumeTimer = useCallback(async () => {
    await handleStartTimer();
  }, [handleStartTimer]);

  // Handle moving to a todo list
  const handleMoveToTodoList = useCallback((todoListId: string) => {
    router.push(`/todo/${todoListId}/tasks/add?taskId=${task.id}`);
  }, [router, task.id]);

  // Handle changing priority
  const handleChangePriority = useCallback(async (priority: 'low' | 'medium' | 'high') => {
    try {
      await updateTask(task.id, { priority });
      router.refresh();
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  }, [updateTask, task.id, router]);

  // Handle duplicating task
  const handleDuplicate = useCallback(async () => {
    try {
      const duplicatedTask = await updateTask('new', {
        ...task,
        id: undefined,
        content: `${task.content} (Copy)`,
        status: 'todo',
        actualHours: 0,
        timeEntries: []
      });
      router.push(`/tasks/${duplicatedTask.id}`);
    } catch (error) {
      console.error('Error duplicating task:', error);
    }
  }, [updateTask, task, router]);

  return {
    stats,
    loading,
    error,
    isTimerRunning,
    handleEdit,
    handleDelete,
    handleComplete,
    handleStartTimer,
    handleStopTimer,
    handlePauseTimer,
    handleResumeTimer,
    handleMoveToTodoList,
    handleChangePriority,
    handleDuplicate
  };
}