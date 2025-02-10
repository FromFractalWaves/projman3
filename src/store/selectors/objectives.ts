
// src/store/selectors/objectives.ts
import { StoreState } from '../types';
import { Objective } from '@/types';

export const selectObjectives = (state: StoreState): Objective[] => state.objectives;
export const selectObjectivesLoading = (state: StoreState): boolean => state.objectivesLoading;
export const selectObjectivesError = (state: StoreState): Error | null => state.objectivesError;
