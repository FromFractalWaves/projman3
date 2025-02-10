// src/store/types.ts
import { CardSlice } from './slices/card';
import { ProjectSlice } from './slices/project';
import { TaskSlice } from './slices/tasks';
import { ObjectiveSlice } from './slices/objectives';
import { TodoListSlice } from './slices/todoLists';
import { TimeEntrySlice } from './slices/timeEntries';

export type StoreState = 
  & CardSlice 
  & ProjectSlice 
  & TaskSlice 
  & ObjectiveSlice 
  & TodoListSlice 
  & TimeEntrySlice;
