// src/hooks/useCardFilterState.ts
import { useState, useCallback, useMemo } from 'react';
import type { BaseEntity } from '@/types';

interface UseCardFilterStateReturn<T extends BaseEntity> {
  filteredItems: T[];
  filterStatus: string | null;
  filterPriority: string | null;
  sortBy: string | null;
  sortDirection: 'asc' | 'desc';
  setFilterStatus: (status: string | null) => void;
  setFilterPriority: (priority: string | null) => void;
  setSortBy: (field: string | null) => void;
  toggleSortDirection: () => void;
}

export function useCardFilterState<T extends BaseEntity>(items: T[]): UseCardFilterStateReturn<T> {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const toggleSortDirection = useCallback(() => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  }, []);

  const filteredItems = useMemo(() => {
    let result = [...items];

    // Apply filters
    if (filterStatus) {
      result = result.filter(item => (item as any).status === filterStatus);
    }
    if (filterPriority) {
      result = result.filter(item => (item as any).priority === filterPriority);
    }

    // Apply sorting
    if (sortBy) {
      result.sort((a, b) => {
        const aValue = (a as any)[sortBy];
        const bValue = (b as any)[sortBy];
        const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [items, filterStatus, filterPriority, sortBy, sortDirection]);

  return {
    filteredItems,
    filterStatus,
    filterPriority,
    sortBy,
    sortDirection,
    setFilterStatus,
    setFilterPriority,
    setSortBy,
    toggleSortDirection,
  };
}