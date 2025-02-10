// src/hooks/useCardList.ts
import { useMemo } from 'react';
import { useStore } from '@/store';
import { selectCardState } from '@/store/selectors/cards';
// Use shallow to ensure a stable reference
import { shallow } from 'zustand/shallow';
import type { EntityType, Filterable } from '@/types';
import type { StoreState } from '@/store/types';

interface UseCardListProps<T extends Filterable> {
  type: EntityType;
  items: T[];
  onItemClick?: (item: T) => void;
}

interface UseCardListReturn<T extends Filterable> {
  view: 'grid' | 'list';
  variant: 'default' | 'compact' | 'detailed';
  filteredItems: T[];
  handleViewChange: (view: 'grid' | 'list') => void;
  handleVariantChange: (variant: 'default' | 'compact' | 'detailed') => void;
  handleFilterStatus: (status: string | undefined) => void;
  handleFilterPriority: (priority: string | undefined) => void;
  handleSortChange: (sortBy: 'name' | 'date' | 'status' | 'priority' | undefined) => void;
  handleSortDirectionToggle: () => void;
}

export function useCardList<T extends Filterable>({
  type,
  items,
  onItemClick,
}: UseCardListProps<T>): UseCardListReturn<T> {
  // Use the memoized selector with shallow equality to get a stable reference
  const {
    cardView: view,
    cardVariant: variant,
    filterStatus,
    filterPriority,
    sortBy,
    sortDirection,
  } = useStore(selectCardState, shallow);

  // Get store actions with explicit typing for the state parameter
  const {
    setCardView,
    setCardVariant,
    setFilterStatus,
    setFilterPriority,
    setSortBy,
    toggleSortDirection,
  } = useStore((state: StoreState) => ({
    setCardView: state.setCardView,
    setCardVariant: state.setCardVariant,
    setFilterStatus: state.setFilterStatus,
    setFilterPriority: state.setFilterPriority,
    setSortBy: state.setSortBy,
    toggleSortDirection: state.toggleSortDirection,
  }));

  // Memoize the filtered and sorted items so that recalculation only happens when dependencies change.
  const filteredItems = useMemo(() => {
    let result = items;

    if (filterStatus) {
      result = result.filter(item => item.status === filterStatus);
    }

    if (filterPriority) {
      result = result.filter(item => 'priority' in item && item.priority === filterPriority);
    }

    if (sortBy) {
      result = [...result].sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return (
              (a.name || '').localeCompare(b.name || '') *
              (sortDirection === 'asc' ? 1 : -1)
            );
          case 'date':
            // Use nullish coalescing to ensure createdAt is never undefined.
            return (
              (new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime()) *
              (sortDirection === 'asc' ? 1 : -1)
            );
          case 'status':
            return (
              (a.status || '').localeCompare(b.status || '') *
              (sortDirection === 'asc' ? 1 : -1)
            );
          case 'priority':
            if ('priority' in a && 'priority' in b) {
              return (
                (a.priority || '').localeCompare(b.priority || '') *
                (sortDirection === 'asc' ? 1 : -1)
              );
            }
            return 0;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [items, filterStatus, filterPriority, sortBy, sortDirection]);

  return {
    view,
    variant,
    filteredItems,
    handleViewChange: setCardView,
    handleVariantChange: setCardVariant,
    handleFilterStatus: (status) => setFilterStatus(status || null),
    handleFilterPriority: (priority) => setFilterPriority(priority || null),
    handleSortChange: (sortBy) => setSortBy(sortBy || null),
    handleSortDirectionToggle: toggleSortDirection,
  };
}
