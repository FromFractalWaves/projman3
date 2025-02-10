
// src/store/index.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { StoreState } from './types';
import { createProjectSlice } from './slices/project';
import { createTaskSlice } from './slices/tasks';
import { createObjectiveSlice } from './slices/objectives';
import { createTodoListSlice } from './slices/todoLists';
import { createTimeEntrySlice } from './slices/timeEntries';

const createGlobalSlice: StateCreator<StoreState> = (set, get) => ({
  refreshAll: async () => {
    await Promise.all([
      get().fetchProjects(),
      get().fetchObjectives(),
      get().fetchTasks(),
      get().fetchTodoLists(),
      get().fetchTimeEntries()
    ]);
  },
  clearErrors: () => {
    set({
      projectsError: null,
      objectivesError: null,
      tasksError: null,
      todoListsError: null,
      timeEntriesError: null
    });
  }
});

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createProjectSlice(...a),
        ...createTaskSlice(...a),
        ...createObjectiveSlice(...a),
        ...createTodoListSlice(...a),
        ...createTimeEntrySlice(...a),
        ...createGlobalSlice(...a)
      }),
      {
        name: 'project-management-store',
        partialize: (state) => ({
          projects: state.projects,
          objectives: state.objectives,
          tasks: state.tasks,
          todoLists: state.todoLists,
          timeEntries: state.timeEntries
        })
      }
    )
  )
);