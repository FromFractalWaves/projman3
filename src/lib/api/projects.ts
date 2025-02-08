// src/lib/api/projects.ts
import type { Project, ProjectFormData } from '@/types';

export const projectsApi = {
  getProjects: async (): Promise<Project[]> => {
    const response = await fetch('/api/projects', {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch projects');
    }

    return response.json();
  },

  createProject: async (data: ProjectFormData): Promise<Project> => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create project');
    }

    return response.json();
  },

  getProjectById: async (id: string): Promise<Project> => {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch project');
    }

    return response.json();
  },

  updateProject: async (id: string, data: Partial<ProjectFormData>): Promise<Project> => {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update project');
    }

    return response.json();
  },

  deleteProject: async (id: string): Promise<void> => {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete project');
    }
  },
};
