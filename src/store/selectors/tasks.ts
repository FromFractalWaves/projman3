
// src/store/selectors/tasks.ts
import { StoreState } from '../types';
import { Task } from '@/types';

export const selectTasks = (state: StoreState): Task[] => state.tasks;
export const selectTaskById = (state: StoreState, id: string): Task | undefined =>
  state.tasks.find((t) => t.id === id);
export const selectTasksLoading = (state: StoreState): boolean => state.tasksLoading;
export const selectTasksError = (state: StoreState): Error | null => state.tasksError;
export const selectTaskComplete = (state: StoreState, id: string): boolean =>
  selectTaskById(state, id)?.status === 'done';