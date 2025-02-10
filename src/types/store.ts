// src/types/store.ts
import { CardSlice } from '@/store/slices/cards';
import { ProjectSlice } from '@/store/slices/project';
import { TaskSlice } from '@/store/slices/tasks';
import { ObjectiveSlice } from '@/store/slices/objectives';
import { TodoListSlice } from '@/store/slices/todoLists';
import { TimeEntrySlice } from '@/store/slices/timeEntries';

export type StoreState = ProjectSlice & 
  TaskSlice & 
  ObjectiveSlice & 
  TodoListSlice & 
  TimeEntrySlice & 
  CardSlice;