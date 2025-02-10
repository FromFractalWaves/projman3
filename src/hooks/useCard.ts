
// src/hooks/useCard.ts
import { useCallback } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useObjectives } from '@/hooks/useObjectives';
import { useTasks } from '@/hooks/useTasks';
import { useTodoLists } from '@/hooks/useTodoLists';
import type { Project, Task, Objective, TodoList } from '@/types';

export type EntityType = 'project' | 'task' | 'objective' | 'todoList';

interface UseCardOptions {
  type: EntityType;
  id: string;
}

export function useCard({ type, id }: UseCardOptions) {
  const { updateProject, deleteProject } = useProjects();
  const { updateObjective, deleteObjective } = useObjectives();
  const { updateTask, deleteTask } = useTasks();
  const { updateTodoList, deleteTodoList } = useTodoLists();

  const handleEdit = useCallback(async (data: any) => {
    switch (type) {
      case 'project':
        await updateProject(id, data);
        break;
      case 'objective':
        await updateObjective(id, data);
        break;
      case 'task':
        await updateTask(id, data);
        break;
      case 'todoList':
        await updateTodoList(id, data);
        break;
    }
  }, [type, id, updateProject, updateObjective, updateTask, updateTodoList]);

  const handleDelete = useCallback(async () => {
    switch (type) {
      case 'project':
        await deleteProject(id);
        break;
      case 'objective':
        await deleteObjective(id);
        break;
      case 'task':
        await deleteTask(id);
        break;
      case 'todoList':
        await deleteTodoList(id);
        break;
    }
  }, [type, id, deleteProject, deleteObjective, deleteTask, deleteTodoList]);

  return {
    handleEdit,
    handleDelete
  };
}