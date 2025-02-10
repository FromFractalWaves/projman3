
// src/store/selectors/projects.ts
import { StoreState } from '../types';
import { Project } from '@/types';

export const selectProjects = (state: StoreState): Project[] => state.projects;
export const selectProjectById = (state: StoreState, id: string): Project | undefined =>
  state.projects.find((p) => p.id === id);
export const selectProjectsLoading = (state: StoreState): boolean => state.projectsLoading;
export const selectProjectsError = (state: StoreState): Error | null => state.projectsError;
