// src/app/page.tsx
'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardLayout/DashboardHeader';
import { DashboardGrid, DashboardGridItem } from '@/components/dashboard/DashboardLayout/DashboardGrid';
import { DashboardProjects } from '@/components/dashboard/DashboardProjects';
import { DashboardTasks } from '@/components/dashboard/DashboardTasks';
import { DashboardObjectives } from '@/components/dashboard/DashboardObjectives';
import { DashboardTodoLists } from '@/components/dashboard/DashboardTodoLists';
import { DashboardStats } from '@/components/dashboard/DashboardLayout/DashboardStats';
import { useProjects } from '@/hooks/useProjects';
import { useObjectives } from '@/hooks/useObjectives';
import { useTasks } from '@/hooks/useTasks';
import { useTodoLists } from '@/hooks/useTodoLists';

export default function DashboardPage() {
  // Fetch all required data
  const { projects, loading: projectsLoading } = useProjects();
  const { objectives, loading: objectivesLoading } = useObjectives();
  const { tasks, loading: tasksLoading } = useTasks();
  const { todoLists, loading: todoListsLoading } = useTodoLists();

  // Handle refresh
  const handleRefresh = async () => {
    await Promise.all([
      projects.refresh(),
      objectives.refresh(),
      tasks.refresh(),
      todoLists.refresh()
    ]);
  };

  // Calculate dashboard stats
  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'done').length,
    totalObjectives: objectives.length,
    achievedObjectives: objectives.filter(o => o.status === 'completed').length,
    overdueTasks: tasks.filter(t => 
      t.dueDate && new Date(t.dueDate) < new Date()
    ).length,
    projectProgress: Math.round(
      (projects.filter(p => p.status === 'completed').length / projects.length) * 100
    )
  };

  if (projectsLoading || objectivesLoading || tasksLoading || todoListsLoading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-900 p-6 space-y-8">
      {/* Header */}
      <DashboardHeader
        title="Dashboard"
        description={`Managing ${projects.length} projects with ${objectives.length} objectives and ${tasks.length} tasks`}
        onRefresh={handleRefresh}
      />

      {/* Stats Overview */}
      <DashboardStats stats={stats} />

      {/* Main Content Grid */}
      <DashboardGrid>
        {/* Projects Section */}
        <DashboardGridItem colSpan={2}>
          <DashboardProjects
            projects={projects}
            tasks={tasks}
            objectives={objectives}
            onProjectClick={(project) => {/* Handle project click */}}
            onAddProject={() => {/* Handle add project */}}
          />
        </DashboardGridItem>

        {/* Right Column */}
        <DashboardGridItem>
          {/* Tasks Section */}
          <div className="space-y-6">
            <DashboardTasks
              tasks={tasks}
              projects={projects}
              objectives={objectives}
              onTaskClick={(task) => {/* Handle task click */}}
              onAddTask={() => {/* Handle add task */}}
            />

            {/* Todo Lists */}
            <DashboardTodoLists
              todoLists={todoLists}
              onTodoListClick={(todoList) => {/* Handle todo list click */}}
              onAddTodoList={() => {/* Handle add todo list */}}
            />
          </div>
        </DashboardGridItem>
      </DashboardGrid>
    </div>
  );
}
