// src/store/types.ts
import { ProjectSlice } from './slices/project';
import { TaskSlice } from './slices/tasks';
import { ObjectiveSlice } from './slices/objectives';
import { TodoListSlice } from './slices/todoLists';
import { TimeEntrySlice } from './slices/timeEntries';

export interface GlobalSlice {
  refreshAll: () => Promise<void>;
  clearErrors: () => void;
}

export type StoreState = ProjectSlice & 
  TaskSlice & 
  ObjectiveSlice & 
  TodoListSlice & 
  TimeEntrySlice & 
  GlobalSlice;