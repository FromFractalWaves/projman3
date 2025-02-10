
// src/store/selectors/cards.ts
import type { StoreState } from '../types';

export const selectCardState = (state: StoreState): CardState => ({
  selectedCard: state.selectedCard,
  cardView: state.cardView,
  cardVariant: state.cardVariant,
  filterStatus: state.filterStatus,
  filterPriority: state.filterPriority,
  sortBy: state.sortBy,
  sortDirection: state.sortDirection,
});

interface Filterable {
  status?: string;
  priority?: string;
  createdAt?: Date;
  name?: string;
}

export const filterCards = <T extends Filterable>(
  items: T[],
  filterStatus?: string,
  filterPriority?: string
): T[] => {
  return items.filter(item => {
    const statusMatch = !filterStatus || item.status === filterStatus;
    const priorityMatch = !filterPriority || (item as any).priority === filterPriority;
    return statusMatch && priorityMatch;
  });
};

export const sortCards = <T extends Filterable>(
  items: T[],
  sortBy?: 'name' | 'date' | 'status' | 'priority',
  sortDirection: 'asc' | 'desc' = 'asc'
): T[] => {
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