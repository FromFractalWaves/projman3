// src/store/slices/tasks.ts
import { StateCreator } from 'zustand';
import type { Task, TaskFormData } from '@/types';
import { tasksApi } from '@/lib/api/tasks';

export interface TaskSlice {
  tasks: Task[];
  tasksLoading: boolean;
  tasksError: Error | null;
  fetchTasks: () => Promise<void>;
  createTask: (data: TaskFormData) => Promise<void>;
  updateTask: (id: string, data: Partial<TaskFormData>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  markTaskComplete: (id: string) => Promise<void>;
}

export const createTaskSlice: StateCreator<TaskSlice> = (set) => ({
  tasks: [],
  tasksLoading: false,
  tasksError: null,
  fetchTasks: async () => {
    set({ tasksLoading: true });
    try {
      const tasks = await tasksApi.getTasks();
      set({ tasks, tasksError: null });
    } catch (error) {
      set({ tasksError: error as Error });
    } finally {
      set({ tasksLoading: false });
    }
  },
  createTask: async (data) => {
    set({ tasksLoading: true });
    try {
      const newTask = await tasksApi.createTask(data);
      set((state) => ({
        tasks: [...state.tasks, newTask],
        tasksError: null
      }));
    } catch (error) {
      set({ tasksError: error as Error });
    } finally {
      set({ tasksLoading: false });
    }
  },
  updateTask: async (id, data) => {
    set({ tasksLoading: true });
    try {
      const updatedTask = await tasksApi.updateTask(id, data);
      set((state) => ({
        tasks: state.tasks.map((t) => t.id === id ? updatedTask : t),
        tasksError: null
      }));
    } catch (error) {
      set({ tasksError: error as Error });
    } finally {
      set({ tasksLoading: false });
    }
  },
  deleteTask: async (id) => {
    set({ tasksLoading: true });
    try {
      await tasksApi.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        tasksError: null
      }));
    } catch (error) {
      set({ tasksError: error as Error });
    } finally {
      set({ tasksLoading: false });
    }
  },
  markTaskComplete: async (id) => {
    set({ tasksLoading: true });
    try {
      const updatedTask = await tasksApi.markComplete(id);
      set((state) => ({
        tasks: state.tasks.map((t) => t.id === id ? updatedTask : t),
        tasksError: null
      }));
    } catch (error) {
      set({ tasksError: error as Error });
      throw error;
    } finally {
      set({ tasksLoading: false });
    }
  },
});
