// src/store/selectors/cards.ts
import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from '../types';
import type { Filterable } from '@/types';

// Instead of returning an object directly (which would be a new reference every time),
// we first extract the relevant state values into an array.
const selectCardStateBase = (state: StoreState) => [
  state.selectedCard,
  state.cardView,
  state.cardVariant,
  state.filterStatus,
  state.filterPriority,
  state.sortBy,
  state.sortDirection,
];

// Memoized selector: if none of the values in the array change, the resulting object remains the same.
export const selectCardState = createSelector(
  [selectCardStateBase],
  ([
    selectedCard,
    cardView,
    cardVariant,
    filterStatus,
    filterPriority,
    sortBy,
    sortDirection,
  ]) => ({
    selectedCard,
    cardView,
    cardVariant,
    filterStatus,
    filterPriority,
    sortBy,
    sortDirection,
  })
);

// Utility: Filter cards based on status and priority.
export const filterCards = <T extends Filterable>(
  items: T[],
  filterStatus: string | null,
  filterPriority: string | null
): T[] => {
  return items.filter(item => {
    const statusMatch = !filterStatus || item.status === filterStatus;
    const priorityMatch = !filterPriority || (item as any).priority === filterPriority;
    return statusMatch && priorityMatch;
  });
};

// Utility: Sort cards by a given property and direction.
export const sortCards = <T extends Filterable>(
  items: T[],
  sortBy: 'name' | 'date' | 'status' | 'priority' | null,
  sortDirection: 'asc' | 'desc' = 'asc'
): T[] => {
  if (!sortBy) return items;

  const sorted = [...items].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return (a.name || '').localeCompare(b.name || '');
      case 'date':
        return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      case 'status':
        return (a.status || '').localeCompare(b.status || '');
      case 'priority':
        return ((a as any).priority || '').localeCompare((b as any).priority || '');
      default:
        return 0;
    }
  });

  return sortDirection === 'asc' ? sorted : sorted.reverse();
};

// Utility: Combine filtering and sorting.
export const selectFilteredAndSortedCards = <T extends Filterable>(
  items: T[],
  state: StoreState
): T[] => {
  const filtered = filterCards(items, state.filterStatus, state.filterPriority);
  return sortCards(filtered, state.sortBy, state.sortDirection);
};
