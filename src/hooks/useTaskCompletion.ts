// src/hooks/useTaskCompletion.ts
import { useCallback } from 'react';
import { useStore } from '@/store';

export function useTaskCompletion() {
  const markTaskComplete = useStore((state) => state.markTaskComplete);
  
  const completeTask = useCallback(async (taskId: string) => {
    try {
      await markTaskComplete(taskId);
      return true;
    } catch (error) {
      console.error('Error completing task:', error);
      return false;
    }
  }, [markTaskComplete]);

  return { completeTask };
}
