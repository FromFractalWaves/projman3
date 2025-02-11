// src/store/selectors/cards.ts
import { StoreState } from '../types';
import { createSelector } from 'reselect';

// Create stable selector functions for individual state values
export const selectCardView = (state: StoreState) => state.view;
export const selectCardVariant = (state: StoreState) => state.variant;
export const selectFilterStatus = (state: StoreState) => state.filterStatus;
export const selectFilterPriority = (state: StoreState) => state.filterPriority;
export const selectSortBy = (state: StoreState) => state.sortBy;
export const selectSortDirection = (state: StoreState) => state.sortDirection;

// Create a stable selector for all card-related state
export const selectCardState = createSelector(
  [
    selectCardView,
    selectCardVariant,
    selectFilterStatus,
    selectFilterPriority,
    selectSortBy,
    selectSortDirection
  ],
  (view, variant, filterStatus, filterPriority, sortBy, sortDirection) => ({
    view,
    variant,
    filterStatus,
    filterPriority,
    sortBy,
    sortDirection
  })
);

// Create stable selectors for individual actions
export const selectSetView = (state: StoreState) => state.setView;
export const selectSetVariant = (state: StoreState) => state.setVariant;
export const selectSetFilterStatus = (state: StoreState) => state.setFilterStatus;
export const selectSetFilterPriority = (state: StoreState) => state.setFilterPriority;
export const selectSetSortBy = (state: StoreState) => state.setSortBy;
export const selectToggleSortDirection = (state: StoreState) => state.toggleSortDirection;
