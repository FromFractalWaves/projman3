
// src/store/selectors/timeEntries.ts
import { StoreState } from '../types';
import { TimeEntry } from '@/types';

export const selectTimeEntries = (state: StoreState): TimeEntry[] => state.timeEntries;
export const selectTimeEntriesLoading = (state: StoreState): boolean => state.timeEntriesLoading;
export const selectTimeEntriesError = (state: StoreState): Error | null => state.timeEntriesError;
