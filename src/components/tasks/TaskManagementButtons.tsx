// src/components/tasks/TaskManagementButtons.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  PlayCircle, 
  PauseCircle, 
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { useTaskCompletion } from '@/hooks/useTaskCompletion';
import { Task } from '@/types';

interface TaskManagementButtonsProps {
  task?: Task;
  onStatusChange?: (status: string) => Promise<void>;
  onTimeStart?: () => Promise<void>;
  onTimePause?: () => Promise<void>;
  className?: string;
}

const TaskManagementButtons: React.FC<TaskManagementButtonsProps> = ({
  task,
  onStatusChange,
  onTimeStart,
  onTimePause,
  className
}) => {
  const { completeTask } = useTaskCompletion();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleStatusChange = async (status: string) => {
    if (!task || !onStatusChange) return;
    
    setIsLoading(true);
    try {
      await onStatusChange(status);
    } catch (error) {
      console.error('Failed to update task status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeAction = async (action: 'start' | 'pause') => {
    if (!task) return;
    
    setIsLoading(true);
    try {
      if (action === 'start' && onTimeStart) {
        await onTimeStart();
      } else if (action === 'pause' && onTimePause) {
        await onTimePause();
      }
    } catch (error) {
      console.error('Failed to update time tracking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!task) return;
    
    setIsLoading(true);
    try {
      await completeTask(task.id);
    } catch (error) {
      console.error('Failed to complete task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => handleTimeAction('start')}
        disabled={isLoading || task?.status === 'done'}
      >
        <PlayCircle className="h-4 w-4 text-green-500" />
        Start Timer
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => handleTimeAction('pause')}
        disabled={isLoading || task?.status === 'done'}
      >
        <PauseCircle className="h-4 w-4 text-yellow-500" />
        Pause Timer
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => handleStatusChange('in-progress')}
        disabled={isLoading || task?.status === 'done'}
      >
        <Clock className="h-4 w-4 text-blue-500" />
        In Progress
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={handleComplete}
        disabled={isLoading || task?.status === 'done'}
      >
        <CheckCircle className="h-4 w-4 text-green-500" />
        Complete
      </Button>

      {task?.status === 'done' && (
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          disabled={true}
        >
          <AlertCircle className="h-4 w-4 text-gray-500" />
          Task Completed
        </Button>
      )}
    </div>
  );
};

export default TaskManagementButtons;