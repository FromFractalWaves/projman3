// src/store/types.ts
import type { CardSlice } from './slices/card';
import type { ProjectSlice } from './slices/project';
import type { TaskSlice } from './slices/tasks';
import type { ObjectiveSlice } from './slices/objectives';
import type { TodoListSlice } from './slices/todoLists';
import type { TimeEntrySlice } from './slices/timeEntries';

// Card view state and actions
export interface CardState {
  view: 'grid' | 'list';
  variant: 'default' | 'compact' | 'detailed';
  filterStatus: string | null;
  filterPriority: string | null;
  sortBy: 'name' | 'date' | 'status' | 'priority' | null;
  sortDirection: 'asc' | 'desc';
}

export interface CardActions {
  setView: (view: 'grid' | 'list') => void;
  setVariant: (variant: 'default' | 'compact' | 'detailed') => void;
  setFilterStatus: (status: string | null) => void;
  setFilterPriority: (priority: string | null) => void;
  setSortBy: (sortBy: 'name' | 'date' | 'status' | 'priority' | null) => void;  
  toggleSortDirection: () => void;
}

// Combined store state
export type StoreState = CardState & 
  CardActions &
  CardSlice & 
  ProjectSlice & 
  TaskSlice & 
  ObjectiveSlice & 
  TodoListSlice & 
  TimeEntrySlice;