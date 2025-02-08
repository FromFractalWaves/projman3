// src/lib/api/timeEntries.ts
import type { TimeEntry, TimeEntryFormData } from '@/types';

export const timeEntriesApi = {
  getTimeEntries: async (): Promise<TimeEntry[]> => {
    const response = await fetch('/api/time_entries', {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch time entries');
    }

    return response.json();
  },

  createTimeEntry: async (data: TimeEntryFormData): Promise<TimeEntry> => {
    const response = await fetch('/api/time_entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create time entry');
    }

    return response.json();
  },

  getTimeEntryById: async (id: string): Promise<TimeEntry> => {
    const response = await fetch(`/api/time_entries/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch time entry');
    }

    return response.json();
  },

  updateTimeEntry: async (id: string, data: Partial<TimeEntryFormData>): Promise<TimeEntry> => {
    const response = await fetch(`/api/time_entries/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update time entry');
    }

    return response.json();
  },

  deleteTimeEntry: async (id: string): Promise<void> => {
    const response = await fetch(`/api/time_entries/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete time entry');
    }
  },
};
