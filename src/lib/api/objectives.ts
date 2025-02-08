// src/lib/api/objectives.ts
import type { Objective, ObjectiveFormData } from '@/types';

export const objectivesApi = {
  getObjectives: async (): Promise<Objective[]> => {
    const response = await fetch('/api/objectives', {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch objectives');
    }

    return response.json();
  },

  createObjective: async (data: ObjectiveFormData): Promise<Objective> => {
    const response = await fetch('/api/objectives', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create objective');
    }

    return response.json();
  },

  getObjectiveById: async (id: string): Promise<Objective> => {
    const response = await fetch(`/api/objectives/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch objective');
    }

    return response.json();
  },

  updateObjective: async (id: string, data: Partial<ObjectiveFormData>): Promise<Objective> => {
    const response = await fetch(`/api/objectives/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update objective');
    }

    return response.json();
  },

  deleteObjective: async (id: string): Promise<void> => {
    const response = await fetch(`/api/objectives/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete objective');
    }
  },
};
