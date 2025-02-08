// src/hooks/useTimeEntries.ts
import { useState, useEffect, useCallback } from 'react';
import type { TimeEntry } from '@/types';
import { timeEntriesApi } from '@/lib/api/timeEntries';

interface TimeEntryStats {
  totalHours: number;
  entriesCount: number;
  averageEntryDuration: number;
}

interface UseTimeEntriesReturn {
  timeEntries: TimeEntry[];
  stats: TimeEntryStats;
  loading: boolean;
  error: Error | null;
  fetchTimeEntries: () => Promise<void>; // Added fetchTimeEntries
}

export const useTimeEntries = (): UseTimeEntriesReturn => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [stats, setStats] = useState<TimeEntryStats>({
    totalHours: 0,
    entriesCount: 0,
    averageEntryDuration: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTimeEntries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTimeEntries = await timeEntriesApi.getTimeEntries();
      setTimeEntries(fetchedTimeEntries);

      // Calculate stats
      const totalDuration = fetchedTimeEntries.reduce((acc, entry) => acc + (entry.duration || 0), 0);
      const entriesCount = fetchedTimeEntries.length;
      const averageEntryDuration = entriesCount > 0 ? totalDuration / entriesCount : 0;

      setStats({
        totalHours: totalDuration / 60, // Convert minutes to hours
        entriesCount,
        averageEntryDuration: averageEntryDuration / 60, // Convert minutes to hours
      });
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTimeEntries();
  }, [fetchTimeEntries]);

  return { timeEntries, stats, loading, error, fetchTimeEntries };
};
