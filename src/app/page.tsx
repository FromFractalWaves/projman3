'use client';

import React from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useObjectives } from '@/hooks/useObjectives';
import { useTasks } from '@/hooks/useTasks';
import { useTodoLists } from '@/hooks/useTodoLists';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { QuickAddDialogs } from '@/components/dialogs';
import { PROJECT_STATUS, TASK_STATUS } from '@/constants';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, FileEdit, Clock } from 'lucide-react';

export default function Home() {
  const { 
    projects, 
    loading: projectsLoading, 
    error: projectsError,
    createProject,
    refresh: refreshProjects 
  } = useProjects();
  
  const { 
    objectives, 
    loading: objectivesLoading, 
    error: objectivesError,
    createObjective,
    refresh: refreshObjectives 
  } = useObjectives();
  
  const { 
    tasks, 
    loading: tasksLoading, 
    error: tasksError,
    createTask,
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

  const handleTimeEntryAdd = async (data) => {
    console.log('Time entry to be implemented', data);
    await handleRefresh();
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header with Navigation */}
      <div className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/projects">Projects</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/objectives">Objectives</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/tasks">Tasks</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/time">Time</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/todo">Todo</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/timeline">Timeline</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="flex items-center gap-2">
              <Link href="/notepad">
                <span className="flex items-center gap-2">
                  <FileEdit className="h-4 w-4" />
                  Notes
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Quick Add Section */}
        <QuickAddDialogs
          projects={projects}
          objectives={objectives}
          tasks={tasks.filter(t => t.status !== 'done')}
          onProjectAdd={createProject}
          onObjectiveAdd={createObjective}
          onTaskAdd={createTask}
          onTimeEntryAdd={handleTimeEntryAdd}
        />

        {/* Dashboard Layout */}
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