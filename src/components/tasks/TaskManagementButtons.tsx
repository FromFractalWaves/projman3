// src/components/tasks/TaskManagementButtons.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTasks } from '@/store/hooks';
import type { TaskFormData } from '@/types';

const TaskManagementButtons: React.FC = () => {
  // Get state and action methods from your store
  const { tasks, fetchTasks, createTask, updateTask, deleteTask, markTaskComplete } = useTasks();

  // Handler to refresh tasks
  const handleFetchTasks = async () => {
    await fetchTasks();
  };

  // Handler to create a new task (using dummy data; adjust as needed)
  const handleCreateTask = async () => {
    const newTaskData: TaskFormData = {
      content: "New Task created at " + new Date().toLocaleTimeString(),
      description: "This is a dummy task created for testing.",
      projectId: "project-1", // Replace with a valid project ID from your data
      objectiveId: "",
      status: "todo",
      priority: "medium",
      startDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 86400000).toISOString()
    };
    await createTask(newTaskData);
  };

  // Handler to update the first task (appends " (updated)" to its description)
  const handleUpdateTask = async () => {
    if (tasks.length === 0) {
      alert("No tasks available to update.");
      return;
    }
    const task = tasks[0];
    await updateTask(task.id, { description: task.description + " (updated)" });
  };

  // Handler to delete the last task
  const handleDeleteTask = async () => {
    if (tasks.length === 0) {
      alert("No tasks available to delete.");
      return;
    }
    const task = tasks[tasks.length - 1];
    await deleteTask(task.id);
  };

  // Handler to mark the first incomplete task as complete
  const handleMarkTaskComplete = async () => {
    const incompleteTask = tasks.find(t => t.status !== 'done');
    if (!incompleteTask) {
      alert("No incomplete task found.");
      return;
    }
    await markTaskComplete(incompleteTask.id);
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleFetchTasks}>Fetch Tasks</Button>
      <Button onClick={handleCreateTask} variant="outline">
        Create New Task
      </Button>
      <Button onClick={handleUpdateTask} variant="ghost">
        Update First Task
      </Button>
      <Button onClick={handleDeleteTask} variant="destructive">
        Delete Last Task
      </Button>
      <Button onClick={handleMarkTaskComplete} variant="secondary">
        Mark First Incomplete Task Complete
      </Button>
    </div>
  );
};

export default TaskManagementButtons;
