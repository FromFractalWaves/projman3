// src/store/slices/cards.ts
import { StateCreator } from 'zustand';
import { Project, Task, Objective, TodoList } from '@/types';

export interface CardState {
  view: 'grid' | 'list';
  variant: 'default' | 'compact' | 'detailed';
  sortBy?: 'name' | 'date' | 'status' | 'priority';
  sortDirection: 'asc' | 'desc';
}

export interface CardSlice extends CardState {
  setView: (view: 'grid' | 'list') => void;
  setVariant: (variant: 'default' | 'compact' | 'detailed') => void;
  setSortBy: (sortBy?: 'name' | 'date' | 'status' | 'priority') => void;
  toggleSortDirection: () => void;
}

export const createCardSlice: StateCreator<CardSlice> = (set) => ({
  // Initial state
  view: 'grid',
  variant: 'default',
  sortDirection: 'asc',

  // Actions
  setView: (view) => set({ view }),
  setVariant: (variant) => set({ variant }),
  setSortBy: (sortBy) => set({ sortBy }),
  toggleSortDirection: () => set((state) => ({ 
    sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc' 
  })),
});