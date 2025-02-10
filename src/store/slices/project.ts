// src/store/slices/projects.ts
import { StateCreator } from 'zustand';
import { Project, ProjectFormData } from '@/types';
import { projectsApi } from '@/lib/api/projects';

export interface ProjectSlice {
  projects: Project[];
  projectsLoading: boolean;
  projectsError: Error | null;
  fetchProjects: () => Promise<void>;
  createProject: (data: ProjectFormData) => Promise<void>;
  updateProject: (id: string, data: Partial<ProjectFormData>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export const createProjectSlice: StateCreator<ProjectSlice> = (set) => ({
  projects: [],
  projectsLoading: false,
  projectsError: null,
  fetchProjects: async () => {
    set({ projectsLoading: true });
    try {
      const projects = await projectsApi.getProjects();
      set({ projects, projectsError: null });
    } catch (error) {
      set({ projectsError: error as Error });
    } finally {
      set({ projectsLoading: false });
    }
  },
  createProject: async (data) => {
    set({ projectsLoading: true });
    try {
      const newProject = await projectsApi.createProject(data);
      set((state) => ({
        projects: [...state.projects, newProject],
        projectsError: null
      }));
    } catch (error) {
      set({ projectsError: error as Error });
    } finally {
      set({ projectsLoading: false });
    }
  },
  updateProject: async (id, data) => {
    set({ projectsLoading: true });
    try {
      const updatedProject = await projectsApi.updateProject(id, data);
      set((state) => ({
        projects: state.projects.map((p) => p.id === id ? updatedProject : p),
        projectsError: null
      }));
    } catch (error) {
      set({ projectsError: error as Error });
    } finally {
      set({ projectsLoading: false });
    }
  },
  deleteProject: async (id) => {
    set({ projectsLoading: true });
    try {
      await projectsApi.deleteProject(id);
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
        projectsError: null
      }));
    } catch (error) {
      set({ projectsError: error as Error });
    } finally {
      set({ projectsLoading: false });
    }
  },
});
