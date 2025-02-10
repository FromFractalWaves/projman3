
// src/store/index.ts - Update store creation
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { StoreState } from './types';
import { createProjectSlice } from './slices/project';
import { createTaskSlice } from './slices/tasks';
import { createObjectiveSlice } from './slices/objectives';
import { createTodoListSlice } from './slices/todoLists';
import { createTimeEntrySlice } from './slices/timeEntries';
import { createCardSlice } from './slices/card';

const createStore = () => 
  create<StoreState>()(
    devtools(
      persist(
        (...a) => ({
          ...createCardSlice(...a),
          ...createProjectSlice(...a),
          ...createTaskSlice(...a),
          ...createObjectiveSlice(...a),
          ...createTodoListSlice(...a),
          ...createTimeEntrySlice(...a),
        }),
        {
          name: 'project-management-store',
          partialize: (state) => ({
            cardView: state.cardView,
            cardVariant: state.cardVariant,
            projects: state.projects,
            objectives: state.objectives,
            tasks: state.tasks,
            todoLists: state.todoLists,
            timeEntries: state.timeEntries,
          })
        }
      )
    )
  );

export const useStore = createStore();