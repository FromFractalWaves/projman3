'use client';

import React from 'react';
import { 
  Project, 
  Objective, 
  Task, 
  TodoList,
  ProjectFormData,
  ObjectiveFormData,
  TaskFormData,
  TimeEntryFormData 
} from '@/types';
import { QuickAddDialogs } from '@/components/dialogs/forms/QuickAddDialogs';
import { DashboardLayout } from '@/components/dashboard';
import { useProjects } from '@/hooks/useProjects';
import { useObjectives } from '@/hooks/useObjectives';
import { useTasks } from '@/hooks/useTasks';
import { useTodoLists } from '@/hooks/useTodoLists';

export default function HomePage() {
  // Fetch data using hooks
  const { 
    projects, 
    createProject, 
    refresh: refreshProjects 
  } = useProjects();

  const { 
    objectives, 
    createObjective, 
    refresh: refreshObjectives 
  } = useObjectives();

  const { 
    tasks, 
    createTask, 
    refresh: refreshTasks 
  } = useTasks();

  const { 
    todoLists, 
    refresh: refreshTodoLists 
  } = useTodoLists();

  // Calculate task statistics
  const taskStats = React.useMemo(() => ({
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length
  }), [tasks]);

  // Handle form submissions
  const handleProjectAdd = async (data: ProjectFormData) => {
    await createProject(data);
    await refreshProjects();
  };

  const handleObjectiveAdd = async (data: ObjectiveFormData) => {
    await createObjective(data);
    await refreshObjectives();
  };

  const handleTaskAdd = async (data: TaskFormData) => {
    await createTask(data);
    await refreshTasks();
  };

  const handleTimeEntryAdd = async (data: TimeEntryFormData) => {
    // Implement time entry creation
    console.log('Time entry added:', data);
  };

  // Handle refresh
  const handleRefresh = async () => {
    await Promise.all([
      refreshProjects(),
      refreshObjectives(),
      refreshTasks(),
      refreshTodoLists()
    ]);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="container mx-auto p-4 space-y-6">
        <QuickAddDialogs
          projects={projects}
          objectives={objectives}
          tasks={tasks}
          onProjectAdd={handleProjectAdd}
          onObjectiveAdd={handleObjectiveAdd}
          onTaskAdd={handleTaskAdd}
          onTimeEntryAdd={handleTimeEntryAdd}
        />

        <DashboardLayout
          projects={projects}
          objectives={objectives}
          tasks={tasks}
          todoLists={todoLists}
          taskStats={taskStats}
          onRefresh={handleRefresh}
        />
      </div>
    </div>
  );
}