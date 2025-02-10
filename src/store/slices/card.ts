
// src/store/slices/card.ts
import { StateCreator } from 'zustand';

export type CardViewType = 'grid' | 'list';
export type CardVariantType = 'default' | 'compact' | 'detailed';
export type CardSortType = 'name' | 'date' | 'status' | 'priority' | null;
export type SortDirectionType = 'asc' | 'desc';

export interface SelectedCard {
  type: 'project' | 'task' | 'objective' | 'todoList';
  id: string;
}

export interface CardState {
  selectedCard: SelectedCard | null;
  cardView: CardViewType;
  cardVariant: CardVariantType;
  filterStatus: string | null;
  filterPriority: string | null;
  sortBy: CardSortType;
  sortDirection: SortDirectionType;
}

export interface CardSlice extends CardState {
  setSelectedCard: (card: SelectedCard | null) => void;
  setCardView: (view: CardViewType) => void;
  setCardVariant: (variant: CardVariantType) => void;
  setFilterStatus: (status: string | null) => void;
  setFilterPriority: (priority: string | null) => void;
  setSortBy: (sortBy: CardSortType) => void;
  toggleSortDirection: () => void;
}

export const createCardSlice: StateCreator<CardSlice> = (set) => ({
  selectedCard: null,
  cardView: 'grid',
  cardVariant: 'default',
  filterStatus: null,
  filterPriority: null,
  sortBy: null,
  sortDirection: 'asc',

  setSelectedCard: (card) => set({ selectedCard: card }),
  setCardView: (view) => set({ cardView: view }),
  setCardVariant: (variant) => set({ cardVariant: variant }),
  setFilterStatus: (status) => set({ filterStatus: status }),
  setFilterPriority: (priority) => set({ filterPriority: priority }),
  setSortBy: (sortBy) => set({ sortBy }),
  toggleSortDirection: () => 
    set((state) => ({ 
      sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc' 
    })),
});
