// src/hooks/useTodoLists.ts
import { useState, useEffect, useCallback } from 'react';
import type { TodoList } from '@/types';
import { todoListsApi } from '@/lib/api/todoLists';

interface UseTodoListsReturn {
  todoLists: TodoList[];
  loading: boolean;
  error: Error | null;
  fetchTodoLists: () => Promise<void>;
  refresh: () => Promise<void>; // Added refresh method
}

export const useTodoLists = (): UseTodoListsReturn => {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTodoLists = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTodoLists = await todoListsApi.getTodoLists();
      setTodoLists(fetchedTodoLists);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add refresh method that calls fetchTodoLists
  const refresh = useCallback(async () => {
    await fetchTodoLists();
  }, [fetchTodoLists]);

  useEffect(() => {
    fetchTodoLists();
  }, [fetchTodoLists]);

  return { todoLists, loading, error, fetchTodoLists, refresh };
};