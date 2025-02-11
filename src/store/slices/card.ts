
// src/store/slices/card.ts
import { type StateCreator } from 'zustand';

export interface CardState {
  view: 'grid' | 'list';
  variant: 'default' | 'compact' | 'detailed';
  filterStatus: string | null;
  filterPriority: string | null;
  sortBy: 'name' | 'date' | 'status' | 'priority' | null;
  sortDirection: 'asc' | 'desc';
}

export interface CardSlice extends CardState {
  setView: (view: CardState['view']) => void;
  setVariant: (variant: CardState['variant']) => void;
  setFilterStatus: (status: CardState['filterStatus']) => void;
  setFilterPriority: (priority: CardState['filterPriority']) => void;
  setSortBy: (sortBy: CardState['sortBy']) => void;
  toggleSortDirection: () => void;
}

const initialState: CardState = {
  view: 'grid',
  variant: 'default',
  filterStatus: null,
  filterPriority: null,
  sortBy: null,
  sortDirection: 'asc'
};

export const createCardSlice: StateCreator<CardSlice> = (set) => ({
  ...initialState,
  setView: (view) => set(() => ({ view })),
  setVariant: (variant) => set(() => ({ variant })),
  setFilterStatus: (filterStatus) => set(() => ({ filterStatus })),
  setFilterPriority: (filterPriority) => set(() => ({ filterPriority })),
  setSortBy: (sortBy) => set(() => ({ sortBy })),
  toggleSortDirection: () => 
    set((state) => ({ 
      sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc' 
    }))
});