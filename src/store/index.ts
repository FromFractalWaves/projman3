// src/store/index.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { StoreState } from './types';
import { createProjectSlice } from './slices/project';
import { createTaskSlice } from './slices/tasks';
import { createObjectiveSlice } from './slices/objectives';
import { createTodoListSlice } from './slices/todoLists';
import { createTimeEntrySlice } from './slices/timeEntries';
import { createCardSlice } from './slices/cards';

const createStore = () => 
  create<StoreState>()(
    devtools(
      persist(
        (...a) => ({
          ...createProjectSlice(...a),
          ...createTaskSlice(...a),
          ...createObjectiveSlice(...a),
          ...createTodoListSlice(...a),
          ...createTimeEntrySlice(...a),
          ...createCardSlice(...a),
        }),
        {
          name: 'project-management-store',
          partialize: (state) => ({
            projects: state.projects,
            objectives: state.objectives,
            tasks: state.tasks,
            todoLists: state.todoLists,
            timeEntries: state.timeEntries,
            cardView: state.cardView,
            cardVariant: state.cardVariant,
          })
        }
      )
    )
  );

export const useStore = createStore();