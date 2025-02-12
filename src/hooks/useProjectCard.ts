import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { Project } from '@/types';
import { useProjects } from '@/hooks/useProjects';

interface ProjectStats {
  totalTasks: number;
  completedTasks: number;
  totalObjectives: number;
  activeObjectives: number;
}

export function useProjectCard(project: Project) {
  const router = useRouter();
  const { deleteProject } = useProjects();

  // Calculate project statistics
  const stats: ProjectStats = useMemo(() => ({
    totalTasks: project.tasks?.length || 0,
    completedTasks: project.tasks?.filter(t => t.status === 'done').length || 0,
    totalObjectives: project.objectives?.length || 0,
    activeObjectives: project.objectives?.filter(o => o.status === 'active').length || 0,
  }), [project]);

  // Calculate time progress
  const timeProgress = useMemo(() => {
    if (!project.startDate || !project.dueDate) return 0;
    const totalDuration = project.dueDate.getTime() - project.startDate.getTime();
    const completedDuration = new Date().getTime() - project.startDate.getTime();
    return Math.min((completedDuration / totalDuration) * 100, 100);
  }, [project]);

  // Action handlers
  const handleViewTimeline = useCallback(() => {
    router.push(`/projects/${project.id}/timeline`);
  }, [router, project.id]);

  const handleViewObjectives = useCallback(() => {
    router.push(`/projects/${project.id}/objectives`);
  }, [router, project.id]);

  const handleViewTasks = useCallback(() => {
    router.push(`/projects/${project.id}/tasks`);
  }, [router, project.id]);

  const handleEdit = useCallback(() => {
    router.push(`/projects/${project.id}/edit`);
  }, [router, project.id]);

  const handleDelete = useCallback(async () => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(project.id);
      router.refresh();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }, [deleteProject, project.id, router]);

  return {
    stats,
    timeProgress,
    handleViewTimeline,
    handleViewObjectives,
    handleViewTasks,
    handleEdit,
    handleDelete,
  };
}