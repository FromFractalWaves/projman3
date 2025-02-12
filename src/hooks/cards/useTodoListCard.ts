// src/hooks/cards/useTodoListCard.ts
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCard } from './useCard';
import { useTodoLists } from '@/hooks/useTodoLists';
import type { TodoList } from '@/types';
import { formatDuration } from '@/lib/utils/cards/cardFormatters';

interface TodoListStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  progress: number;
  estimatedTime: number;
  actualTime: number;
  highPriorityTasks: number;
  overdueTasks: number;
}

export function useTodoListCard(todoList: TodoList) {
  const router = useRouter();
  const { updateTodoList } = useTodoLists();
  const { loading, error, handleEdit, handleDelete } = useCard({
    type: 'todoList',
    id: todoList.id
  });

  // Calculate todo list statistics
  const stats: TodoListStats = useMemo(() => {
    const tasks = todoList.tasks || [];
    const completedTasks = tasks.filter(t => t.status === 'done');
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
    const highPriorityTasks = tasks.filter(t => t.priority === 'high');
    const overdueTasks = tasks.filter(t => {
      return t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done';
    });

    const estimatedTime = tasks.reduce((total, task) => total + (task.estimatedHours || 0), 0);
    const actualTime = tasks.reduce((total, task) => total + (task.actualHours || 0), 0);
    const progress = tasks.length > 0 
      ? (completedTasks.length / tasks.length) * 100 
      : 0;

    return {
      totalTasks: tasks.length,
      completedTasks: completedTasks.length,
      inProgressTasks: inProgressTasks.length,
      progress,
      estimatedTime,
      actualTime,
      highPriorityTasks: highPriorityTasks.length,
      overdueTasks: overdueTasks.length
    };
  }, [todoList]);

  // Handle archiving todo list
  const handleArchive = useCallback(async () => {
    try {
      await updateTodoList(todoList.id, { type: 'archived' });
      router.refresh();
    } catch (error) {
      console.error('Error archiving todo list:', error);
    }
  }, [updateTodoList, todoList.id, router]);

  // Handle adding a new task
  const handleAddTask = useCallback(() => {
    router.push(`/todo/${todoList.id}/tasks/new`);
  }, [router, todoList.id]);

  // Handle duplicating todo list
  const handleDuplicate = useCallback(async () => {
    try {
      const duplicatedList = await updateTodoList('new', {
        ...todoList,
        id: undefined,
        name: `${todoList.name} (Copy)`,
        tasks: todoList.tasks?.map(task => ({
          ...task,
          id: undefined,
          status: 'todo',
          actualHours: 0
        }))
      });
      router.push(`/todo/${duplicatedList.id}`);
    } catch (error) {
      console.error('Error duplicating todo list:', error);
    }
  }, [updateTodoList, todoList, router]);

  // Handle exporting todo list
  const handleExport = useCallback(() => {
    try {
      const data = {
        name: todoList.name,
        type: todoList.type,
        tasks: todoList.tasks?.map(task => ({
          content: task.content,
          description: task.description,
          status: task.status,
          priority: task.priority,
          startDate: task.startDate,
          dueDate: task.dueDate,
          estimatedHours: task.estimatedHours,
          actualHours: task.actualHours
        })),
        stats
      };

      // Export as JSON file
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `todo-list-${todoList.name.toLowerCase().replace(/\s+/g, '-')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting todo list:', error);
    }
  }, [todoList, stats]);

  // Handle sorting tasks
  const handleSort = useCallback(async (sortBy: 'priority' | 'dueDate' | 'status') => {
    try {
      const sortedTasks = [...(todoList.tasks || [])].sort((a, b) => {
        switch (sortBy) {
          case 'priority': {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          }
          case 'dueDate': {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          }
          case 'status': {
            const statusOrder = { 'in-progress': 0, 'todo': 1, 'done': 2 };
            return statusOrder[a.status] - statusOrder[b.status];
          }
          default:
            return 0;
        }
      });

      await updateTodoList(todoList.id, {
        tasks: sortedTasks
      });
      router.refresh();
    } catch (error) {
      console.error('Error sorting tasks:', error);
    }
  }, [updateTodoList, todoList, router]);

  // Handle filtering tasks
  const handleFilter = useCallback(async (filter: 'all' | 'active' | 'completed' | 'high-priority' | 'overdue') => {
    try {
      const filteredTasks = (todoList.tasks || []).filter(task => {
        switch (filter) {
          case 'active':
            return task.status !== 'done';
          case 'completed':
            return task.status === 'done';
          case 'high-priority':
            return task.priority === 'high';
          case 'overdue':
            return task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';
          default:
            return true;
        }
      });

      await updateTodoList(todoList.id, {
        tasks: filteredTasks
      });
      router.refresh();
    } catch (error) {
      console.error('Error filtering tasks:', error);
    }
  }, [updateTodoList, todoList, router]);

  return {
    stats,
    loading,
    error,
    handleEdit,
    handleDelete,
    handleArchive,
    handleAddTask,
    handleDuplicate,
    handleExport,
    handleSort,
    handleFilter
  };
}