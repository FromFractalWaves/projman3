// src/hooks/cards/useCard.ts
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { BaseEntity, EntityType } from '@/types/base';
import { 
  projectsApi, 
  objectivesApi, 
  tasksApi, 
  todoListsApi 
} from '@/lib/api';

interface UseCardOptions {
  type: EntityType;
  id: string;
}

interface UseCardReturn {
  loading: boolean;
  error: Error | null;
  handleEdit: () => void;
  handleDelete: () => Promise<void>;
  handleRefresh: () => Promise<void>;
}

/**
 * Base hook for common card functionality
 */
export function useCard({ type, id }: UseCardOptions): UseCardReturn {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Get the appropriate API based on entity type
  const getApi = useCallback(() => {
    switch (type) {
      case 'project':
        return projectsApi;
      case 'objective':
        return objectivesApi;
      case 'task':
        return tasksApi;
      case 'todoList':
        return todoListsApi;
      default:
        throw new Error(`Unknown entity type: ${type}`);
    }
  }, [type]);

  // Handle card editing
  const handleEdit = useCallback(() => {
    router.push(`/${type}s/${id}/edit`);
  }, [type, id, router]);

  // Handle card deletion
  const handleDelete = useCallback(async () => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const api = getApi();
      await api.delete(id);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [type, id, getApi, router]);

  // Handle card refresh
  const handleRefresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const api = getApi();
      await api.refresh();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getApi, router]);

  return {
    loading,
    error,
    handleEdit,
    handleDelete,
    handleRefresh
  };
}