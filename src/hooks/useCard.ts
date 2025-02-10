// src/hooks/useCard.ts
import { useCallback, useState } from 'react';
import { projectsApi } from '@/lib/api/projects';
import { objectivesApi } from '@/lib/api/objectives';
import { tasksApi } from '@/lib/api/tasks';
import { todoListsApi } from '@/lib/api/todoLists';
import type { EntityType } from '@/components/cards/BaseCard';
import type { 
  Project, 
  Task, 
  Objective, 
  TodoList,
  ProjectFormData,
  TaskFormData,
  ObjectiveFormData,
  TodoListFormData
} from '@/types';

interface UseCardOptions {
  type: EntityType;
  id: string;
}

interface UseCardReturn {
  loading: boolean;
  error: Error | null;
  handleEdit: () => void;
  handleDelete: () => Promise<void>;
}

// Helper to convert date objects to ISO strings.
const convertDatesToStrings = <T extends { startDate?: Date; dueDate?: Date }>(
  data: T
): Omit<T, 'startDate' | 'dueDate'> & { startDate?: string; dueDate?: string } => {
  const { startDate, dueDate, ...rest } = data;
  return {
    ...rest,
    ...(startDate && { startDate: startDate.toISOString() }),
    ...(dueDate && { dueDate: dueDate.toISOString() }),
  };
};

export function useCard({ type, id }: UseCardOptions): UseCardReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleEdit = useCallback(() => {
    // For demonstration, simply log the edit action.
    console.log(`Edit ${type} with id ${id}`);
  }, [type, id]);

  const handleDelete = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      switch (type) {
        case 'project':
          await projectsApi.deleteProject(id);
          break;
        case 'objective':
          await objectivesApi.deleteObjective(id);
          break;
        case 'task':
          await tasksApi.deleteTask(id);
          break;
        case 'todoList':
          await todoListsApi.deleteTodoList(id);
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [type, id]);

  return {
    loading,
    error,
    handleEdit,
    handleDelete,
  };
}
