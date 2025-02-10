
// src/store/selectors/cards.ts
import { StoreState } from '../types';
import type { Filterable } from '@/types';

export const selectCardState = (state: StoreState) => ({
  selectedCard: state.selectedCard,
  cardView: state.cardView,
  cardVariant: state.cardVariant,
  filterStatus: state.filterStatus,
  filterPriority: state.filterPriority,
  sortBy: state.sortBy,
  sortDirection: state.sortDirection,
});

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

export const selectFilteredAndSortedCards = <T extends Filterable>(
  items: T[],
  state: StoreState
): T[] => {
  const filtered = filterCards(items, state.filterStatus, state.filterPriority);
  return sortCards(filtered, state.sortBy, state.sortDirection);
};