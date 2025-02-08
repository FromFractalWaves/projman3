// src/lib/api/todoLists.ts
import type { TodoList, TodoListFormData } from '@/types';

export const todoListsApi = {
  getTodoLists: async (): Promise<TodoList[]> => {
    const response = await fetch('/api/todo_lists', {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch todo lists');
    }

    return response.json();
  },

  createTodoList: async (data: TodoListFormData): Promise<TodoList> => {
    const response = await fetch('/api/todo_lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create todo list');
    }

    return response.json();
  },

  getTodoListById: async (id: string): Promise<TodoList> => {
    const response = await fetch(`/api/todo_lists/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch todo list');
    }

    return response.json();
  },

  updateTodoList: async (id: string, data: Partial<TodoListFormData>): Promise<TodoList> => {
    const response = await fetch(`/api/todo_lists/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update todo list');
    }

    return response.json();
  },

  deleteTodoList: async (id: string): Promise<void> => {
    const response = await fetch(`/api/todo_lists/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete todo list');
    }
  },
};
