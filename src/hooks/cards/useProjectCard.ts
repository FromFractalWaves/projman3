// src/hooks/cards/useProjectCard.ts
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCard } from './useCard';
import { useProjects } from '@/hooks/useProjects';
import type { Project } from '@/types';
import { isOverdue, getDaysRemaining } from '@/lib/utils/cards/cardFormatters';

interface ProjectStats {
  totalTasks: number;
  completedTasks: number;
  totalObjectives: number;
  completedObjectives: number;
  timeSpent: number;
  daysRemaining: number;
  isOverdue: boolean;
}

export function useProjectCard(project: Project) {
  const router = useRouter();
  const { updateProject } = useProjects();
  const { loading, error, handleEdit, handleDelete, handleRefresh } = useCard({
    type: 'project',
    id: project.id
  });

  // Calculate project statistics
  const stats: ProjectStats = useMemo(() => ({
    totalTasks: project.tasks?.length || 0,
    completedTasks: project.tasks?.filter(t => t.status === 'done').length || 0,
    totalObjectives: project.objectives?.length || 0,
    completedObjectives: project.objectives?.filter(o => o.status === 'completed').length || 0,
    timeSpent: project.tasks?.reduce((total, task) => {
      return total + (task.actualHours || 0);
    }, 0) || 0,
    daysRemaining: project.dueDate ? getDaysRemaining(project.dueDate) : 0,
    isOverdue: project.dueDate ? isOverdue(project.dueDate) : false
  }), [project]);

  // Handle viewing timeline
  const handleViewTimeline = useCallback(() => {
    router.push(`/projects/${project.id}/timeline`);
  }, [router, project.id]);

  // Handle viewing objectives
  const handleViewObjectives = useCallback(() => {
    router.push(`/projects/${project.id}/objectives`);
  }, [router, project.id]);

  // Handle viewing tasks
  const handleViewTasks = useCallback(() => {
    router.push(`/projects/${project.id}/tasks`);
  }, [router, project.id]);

  // Handle archiving project
  const handleArchive = useCallback(async () => {
    try {
      await updateProject(project.id, { status: 'archived' });
      router.refresh();
    } catch (error) {
      console.error('Error archiving project:', error);
    }
  }, [updateProject, project.id, router]);

  return {
    stats,
    loading,
    error,
    handleEdit,
    handleDelete,
    handleRefresh,
    handleViewTimeline,
    handleViewObjectives,
    handleViewTasks,
    handleArchive
  };
}