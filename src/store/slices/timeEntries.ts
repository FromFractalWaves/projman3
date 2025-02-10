
// src/store/slices/timeEntries.ts
import { StateCreator } from 'zustand';
import { TimeEntry, TimeEntryFormData } from '@/types';
import { timeEntriesApi } from '@/lib/api/timeEntries';

export interface TimeEntrySlice {
  timeEntries: TimeEntry[];
  timeEntriesLoading: boolean;
  timeEntriesError: Error | null;
  fetchTimeEntries: () => Promise<void>;
  createTimeEntry: (data: TimeEntryFormData) => Promise<void>;
  updateTimeEntry: (id: string, data: Partial<TimeEntryFormData>) => Promise<void>;
  deleteTimeEntry: (id: string) => Promise<void>;
}

export const createTimeEntrySlice: StateCreator<TimeEntrySlice> = (set) => ({
  timeEntries: [],
  timeEntriesLoading: false,
  timeEntriesError: null,
  fetchTimeEntries: async () => {
    set({ timeEntriesLoading: true });
    try {
      const timeEntries = await timeEntriesApi.getTimeEntries();
      set({ timeEntries, timeEntriesError: null });
    } catch (error) {
      set({ timeEntriesError: error as Error });
    } finally {
      set({ timeEntriesLoading: false });
    }
  },
  createTimeEntry: async (data) => {
    set({ timeEntriesLoading: true });
    try {
      const newTimeEntry = await timeEntriesApi.createTimeEntry(data);
      set((state) => ({
        timeEntries: [...state.timeEntries, newTimeEntry],
        timeEntriesError: null
      }));
    } catch (error) {
      set({ timeEntriesError: error as Error });
    } finally {
      set({ timeEntriesLoading: false });
    }
  },
  updateTimeEntry: async (id, data) => {
    set({ timeEntriesLoading: true });
    try {
      const updatedTimeEntry = await timeEntriesApi.updateTimeEntry(id, data);
      set((state) => ({
        timeEntries: state.timeEntries.map((t) => t.id === id ? updatedTimeEntry : t),
        timeEntriesError: null
      }));
    } catch (error) {
      set({ timeEntriesError: error as Error });
    } finally {
      set({ timeEntriesLoading: false });
    }
  },
  deleteTimeEntry: async (id) => {
    set({ timeEntriesLoading: true });
    try {
      await timeEntriesApi.deleteTimeEntry(id);
      set((state) => ({
        timeEntries: state.timeEntries.filter((t) => t.id !== id),
        timeEntriesError: null
      }));
    } catch (error) {
      set({ timeEntriesError: error as Error });
    } finally {
      set({ timeEntriesLoading: false });
    }
  },
});