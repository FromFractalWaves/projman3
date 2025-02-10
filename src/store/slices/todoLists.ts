// src/store/slices/todoLists.ts
import { StateCreator } from 'zustand';
import { TodoList, TodoListFormData } from '@/types';
import { todoListsApi } from '@/lib/api/todoLists';

export interface TodoListSlice {
  todoLists: TodoList[];
  todoListsLoading: boolean;
  todoListsError: Error | null;
  fetchTodoLists: () => Promise<void>;
  createTodoList: (data: TodoListFormData) => Promise<void>;
  updateTodoList: (id: string, data: Partial<TodoListFormData>) => Promise<void>;
  deleteTodoList: (id: string) => Promise<void>;
}

export const createTodoListSlice: StateCreator<TodoListSlice> = (set) => ({
  todoLists: [],
  todoListsLoading: false,
  todoListsError: null,
  fetchTodoLists: async () => {
    set({ todoListsLoading: true });
    try {
      const todoLists = await todoListsApi.getTodoLists();
      set({ todoLists, todoListsError: null });
    } catch (error) {
      set({ todoListsError: error as Error });
    } finally {
      set({ todoListsLoading: false });
    }
  },
  createTodoList: async (data) => {
    set({ todoListsLoading: true });
    try {
      const newTodoList = await todoListsApi.createTodoList(data);
      set((state) => ({
        todoLists: [...state.todoLists, newTodoList],
        todoListsError: null
      }));
    } catch (error) {
      set({ todoListsError: error as Error });
    } finally {
      set({ todoListsLoading: false });
    }
  },
  updateTodoList: async (id, data) => {
    set({ todoListsLoading: true });
    try {
      const updatedTodoList = await todoListsApi.updateTodoList(id, data);
      set((state) => ({
        todoLists: state.todoLists.map((t) => t.id === id ? updatedTodoList : t),
        todoListsError: null
      }));
    } catch (error) {
      set({ todoListsError: error as Error });
    } finally {
      set({ todoListsLoading: false });
    }
  },
  deleteTodoList: async (id) => {
    set({ todoListsLoading: true });
    try {
      await todoListsApi.deleteTodoList(id);
      set((state) => ({
        todoLists: state.todoLists.filter((t) => t.id !== id),
        todoListsError: null
      }));
    } catch (error) {
      set({ todoListsError: error as Error });
    } finally {
      set({ todoListsLoading: false });
    }
  },
});