// src/hooks/useProjects.ts
import { useState, useEffect, useCallback } from 'react';
import type { Project, ProjectFormData } from '@/types';
import { projectsApi } from '@/lib/api/projects';

interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: Error | null;
  fetchProjects: () => Promise<void>;
  createProject: (data: ProjectFormData) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await projectsApi.getProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (data: ProjectFormData) => {
    setLoading(true);
    try {
      const newProject = await projectsApi.createProject(data);
      setProjects(prev => [...prev, newProject]);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, fetchProjects, createProject, refresh };
}