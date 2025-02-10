
// src/store/selectors/todoLists.ts
import { StoreState } from '../types';
import { TodoList } from '@/types';

export const selectTodoLists = (state: StoreState): TodoList[] => state.todoLists;
export const selectTodoListsLoading = (state: StoreState): boolean => state.todoListsLoading;
export const selectTodoListsError = (state: StoreState): Error | null => state.todoListsError;