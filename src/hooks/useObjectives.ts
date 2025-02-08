// src/hooks/useObjectives.ts
import { useState, useEffect, useCallback } from 'react';
import type { Objective, ObjectiveFormData } from '@/types';
import { objectivesApi } from '@/lib/api/objectives';

interface UseObjectivesReturn {
  objectives: Objective[];
  loading: boolean;
  error: Error | null;
  fetchObjectives: () => Promise<void>;
  createObjective: (data: ObjectiveFormData) => Promise<void>;
  refresh: () => Promise<void>;
}

export const useObjectives = (): UseObjectivesReturn => {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchObjectives = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedObjectives = await objectivesApi.getObjectives();
      setObjectives(fetchedObjectives);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createObjective = useCallback(async (data: ObjectiveFormData) => {
    setLoading(true);
    try {
      const newObjective = await objectivesApi.createObjective(data);
      setObjectives(prev => [...prev, newObjective]);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchObjectives();
  }, [fetchObjectives]);

  useEffect(() => {
    fetchObjectives();
  }, [fetchObjectives]);

  return { objectives, loading, error, fetchObjectives, createObjective, refresh };
};