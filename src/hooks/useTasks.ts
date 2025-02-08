// src/hooks/useTasks.ts
import { useState, useEffect, useCallback } from 'react';
import type { Task, TaskFormData } from '@/types';
import { tasksApi } from '@/lib/api/tasks';

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: Error | null;
  fetchTasks: () => Promise<void>;
  createTask: (data: TaskFormData) => Promise<void>;
  refresh: () => Promise<void>;
}

export const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTasks = await tasksApi.getTasks();
      setTasks(fetchedTasks);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (data: TaskFormData) => {
    setLoading(true);
    try {
      const newTask = await tasksApi.createTask(data);
      setTasks(prev => [...prev, newTask]);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, error, fetchTasks, createTask, refresh };
};