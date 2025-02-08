// src/lib/api/todoTasks.ts
export const todoTasksApi = {
    addTaskToTodoList: async (todoListId: string, taskId: string): Promise<void> => {
      const response = await fetch(`/api/todo_tasks/${todoListId}/${taskId}`, {
        method: 'POST',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add task to todo list');
      }
    },
  
    removeTaskFromTodoList: async (todoListId: string, taskId: string): Promise<void> => {
      const response = await fetch(`/api/todo_tasks/${todoListId}/${taskId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove task from todo list');
      }
    },
  };
  