// src/store/slices/cards.ts
import { StateCreator } from 'zustand';
import { 
  Project, 
  Task, 
  Objective, 
  TodoList,
  EntityType,
  BaseCardProps
} from '@/types';

// Card state interfaces
export interface CardState {
  selectedCard: {
    type: EntityType;
    id: string;
  } | null;
  cardView: 'grid' | 'list';
  cardVariant: 'default' | 'compact' | 'detailed';
  filterStatus?: string;
  filterPriority?: string;
  sortBy?: 'name' | 'date' | 'status' | 'priority';
  sortDirection: 'asc' | 'desc';
}

export interface CardActions {
  setSelectedCard: (type: EntityType, id: string) => void;
  clearSelectedCard: () => void;
  setCardView: (view: 'grid' | 'list') => void;
  setCardVariant: (variant: 'default' | 'compact' | 'detailed') => void;
  setFilterStatus: (status?: string) => void;
  setFilterPriority: (priority?: string) => void;
  setSortBy: (sortBy?: 'name' | 'date' | 'status' | 'priority') => void;
  toggleSortDirection: () => void;
}

export interface CardSlice extends CardState, CardActions {}

// Helper functions for card filtering and sorting
const filterCards = <T extends { status?: string; priority?: string }>(
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

const sortCards = <T extends { name?: string; status?: string; priority?: string; createdAt?: Date }>(
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

// Create the card slice
export const createCardSlice: StateCreator<CardSlice> = (set) => ({
  // Initial state
  selectedCard: null,
  cardView: 'grid',
  cardVariant: 'default',
  sortDirection: 'asc',

  // Actions
  setSelectedCard: (type, id) => 
    set({ selectedCard: { type, id } }),

  clearSelectedCard: () => 
    set({ selectedCard: null }),

  setCardView: (view) => 
    set({ cardView: view }),

  setCardVariant: (variant) => 
    set({ cardVariant: variant }),

  setFilterStatus: (status) => 
    set({ filterStatus: status }),

  setFilterPriority: (priority) => 
    set({ filterPriority: priority }),

  setSortBy: (sortBy) => 
    set({ sortBy }),

  toggleSortDirection: () => 
    set((state) => ({ 
      sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc' 
    })),
});

// src/store/selectors/cards.ts
import { StoreState } from '../types';

export const selectCardState = (state: StoreState): CardState => ({
  selectedCard: state.selectedCard,
  cardView: state.cardView,
  cardVariant: state.cardVariant,
  filterStatus: state.filterStatus,
  filterPriority: state.filterPriority,
  sortBy: state.sortBy,
  sortDirection: state.sortDirection,
});

export const selectFilteredAndSortedCards = <T extends Project | Task | Objective | TodoList>(
  items: T[],
  state: StoreState
): T[] => {
  const filtered = filterCards(items, state.filterStatus, state.filterPriority);
  return sortCards(filtered, state.sortBy, state.sortDirection);
};

