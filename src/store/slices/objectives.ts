
// src/store/slices/objectives.ts
import { StateCreator } from 'zustand';
import { Objective, ObjectiveFormData } from '@/types';
import { objectivesApi } from '@/lib/api/objectives';

export interface ObjectiveSlice {
  objectives: Objective[];
  objectivesLoading: boolean;
  objectivesError: Error | null;
  fetchObjectives: () => Promise<void>;
  createObjective: (data: ObjectiveFormData) => Promise<void>;
  updateObjective: (id: string, data: Partial<ObjectiveFormData>) => Promise<void>;
  deleteObjective: (id: string) => Promise<void>;
}

export const createObjectiveSlice: StateCreator<ObjectiveSlice> = (set) => ({
  objectives: [],
  objectivesLoading: false,
  objectivesError: null,
  fetchObjectives: async () => {
    set({ objectivesLoading: true });
    try {
      const objectives = await objectivesApi.getObjectives();
      set({ objectives, objectivesError: null });
    } catch (error) {
      set({ objectivesError: error as Error });
    } finally {
      set({ objectivesLoading: false });
    }
  },
  createObjective: async (data) => {
    set({ objectivesLoading: true });
    try {
      const newObjective = await objectivesApi.createObjective(data);
      set((state) => ({
        objectives: [...state.objectives, newObjective],
        objectivesError: null
      }));
    } catch (error) {
      set({ objectivesError: error as Error });
    } finally {
      set({ objectivesLoading: false });
    }
  },
  updateObjective: async (id, data) => {
    set({ objectivesLoading: true });
    try {
      const updatedObjective = await objectivesApi.updateObjective(id, data);
      set((state) => ({
        objectives: state.objectives.map((o) => o.id === id ? updatedObjective : o),
        objectivesError: null
      }));
    } catch (error) {
      set({ objectivesError: error as Error });
    } finally {
      set({ objectivesLoading: false });
    }
  },
  deleteObjective: async (id) => {
    set({ objectivesLoading: true });
    try {
      await objectivesApi.deleteObjective(id);
      set((state) => ({
        objectives: state.objectives.filter((o) => o.id !== id),
        objectivesError: null
      }));
    } catch (error) {
      set({ objectivesError: error as Error });
    } finally {
      set({ objectivesLoading: false });
    }
  },
});