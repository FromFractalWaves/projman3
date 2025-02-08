'use client';

import React from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useObjectives } from '@/hooks/useObjectives';
import { useTasks } from '@/hooks/useTasks';
import { useTodoLists } from '@/hooks/useTodoLists';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui';
import { Folder, Target, CheckSquare, Clock } from 'lucide-react';
import { PROJECT_STATUS, TASK_STATUS } from '@/constants';

export default function Home() {
  const { 
    projects, 
    loading: projectsLoading, 
    error: projectsError,
    refresh: refreshProjects 
  } = useProjects();
  
  const { 
    objectives, 
    loading: objectivesLoading, 
    error: objectivesError,
    refresh: refreshObjectives 
  } = useObjectives();
  
  const { 
    tasks, 
    loading: tasksLoading, 
    error: tasksError,
    refresh: refreshTasks 
  } = useTasks();
  
  const {
    todoLists,
    loading: todoListsLoading,
    error: todoListsError,
    refresh: refreshTodoLists
  } = useTodoLists();

  const isLoading = projectsLoading || objectivesLoading || tasksLoading || todoListsLoading;
  const hasError = projectsError || objectivesError || tasksError || todoListsError;

  // Handle loading and error states
  if (isLoading || hasError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-900">
        <div className="text-xl text-neutral-100">
          {isLoading ? (
            'Loading dashboard...'
          ) : (
            <span className="text-red-500">
              Error loading dashboard data. Please try again later.
            </span>
          )}
        </div>
      </div>
    );
  }

  // Refresh all data
  const handleRefresh = async () => {
    await Promise.all([
      refreshProjects(),
      refreshObjectives(),
      refreshTasks(),
      refreshTodoLists()
    ]);
  };

  // Filter active projects
  const activeProjects = projects.filter(
    project => project.status !== PROJECT_STATUS.COMPLETED
  );

  // Calculate task statistics
  const taskStats = {
    todo: tasks.filter(task => task.status === TASK_STATUS.TODO).length,
    inProgress: tasks.filter(task => task.status === TASK_STATUS.IN_PROGRESS).length,
    done: tasks.filter(task => task.status === TASK_STATUS.DONE).length,
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Dashboard Section */}
      <div className="p-4">
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
