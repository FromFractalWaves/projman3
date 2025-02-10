// src/store/hooks.ts
import { useCallback } from 'react'
import { useStore } from './index'
import * as selectors from './selectors'
import {
  Project,
  ProjectFormData,
  Objective,
  ObjectiveFormData,
  Task,
  TaskFormData,
  TodoList,
  TodoListFormData,
  TimeEntry,
  TimeEntryFormData
} from '@/types'

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: Error | null;
  createTask: (data: TaskFormData) => Promise<void>;
  updateTask: (id: string, data: Partial<TaskFormData>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  fetchTasks: () => Promise<void>;
  markTaskComplete: (id: string) => Promise<void>;
}

export const useTasks = (): UseTasksReturn => {
  const tasks = useStore(selectors.selectTasks);
  const loading = useStore(selectors.selectTasksLoading);
  const error = useStore(selectors.selectTasksError);
  const createTask = useStore((state) => state.createTask);
  const updateTask = useStore((state) => state.updateTask);
  const deleteTask = useStore((state) => state.deleteTask);
  const fetchTasks = useStore((state) => state.fetchTasks);
  const markTaskComplete = useStore((state) => state.markTaskComplete);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    fetchTasks,
    markTaskComplete,
  };
};


// Project Hook Return Types
interface UseProjectsReturn {
  projects: Project[]
  loading: boolean
  error: Error | null
  createProject: (data: ProjectFormData) => Promise<void>
  updateProject: (id: string, data: Partial<ProjectFormData>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  fetchProjects: () => Promise<void>
}

interface UseProjectReturn {
  project: Project | undefined
  projectWithDetails: ReturnType<typeof selectors.selectProjectWithDetails>
  updateProject: (data: Partial<ProjectFormData>) => Promise<void>
  deleteProject: () => Promise<void>
}

// Objective Hook Return Types
interface UseObjectivesReturn {
  objectives: Objective[]
  loading: boolean
  error: Error | null
  createObjective: (data: ObjectiveFormData) => Promise<void>
  updateObjective: (id: string, data: Partial<ObjectiveFormData>) => Promise<void>
  deleteObjective: (id: string) => Promise<void>
  fetchObjectives: () => Promise<void>
}

interface UseObjectiveReturn {
  objective: Objective | undefined
  objectiveWithDetails: ReturnType<typeof selectors.selectObjectiveWithDetails>
  updateObjective: (data: Partial<ObjectiveFormData>) => Promise<void>
  deleteObjective: () => Promise<void>
}

// Task Hook Return Types
interface UseTasksReturn {
  tasks: Task[]
  loading: boolean
  error: Error | null
  createTask: (data: TaskFormData) => Promise<void>
  updateTask: (id: string, data: Partial<TaskFormData>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  fetchTasks: () => Promise<void>
}

interface UseTaskReturn {
  task: Task | undefined
  updateTask: (data: Partial<TaskFormData>) => Promise<void>
  deleteTask: () => Promise<void>
}

// TodoList Hook Return Types
interface UseTodoListsReturn {
  todoLists: TodoList[]
  loading: boolean
  error: Error | null
  createTodoList: (data: TodoListFormData) => Promise<void>
  updateTodoList: (id: string, data: Partial<TodoListFormData>) => Promise<void>
  deleteTodoList: (id: string) => Promise<void>
  fetchTodoLists: () => Promise<void>
}

interface UseTodoListReturn {
  todoList: TodoList | undefined
  todoListWithTasks: (TodoList & { tasks: Task[] }) | undefined
  updateTodoList: (data: Partial<TodoListFormData>) => Promise<void>
  deleteTodoList: () => Promise<void>
}

// TimeEntry Hook Return Types
interface UseTimeEntriesReturn {
  timeEntries: TimeEntry[]
  loading: boolean
  error: Error | null
  createTimeEntry: (data: TimeEntryFormData) => Promise<void>
  updateTimeEntry: (id: string, data: Partial<TimeEntryFormData>) => Promise<void>
  deleteTimeEntry: (id: string) => Promise<void>
  fetchTimeEntries: () => Promise<void>
}

interface UseTimeEntryReturn {
  timeEntry: TimeEntry | undefined
  updateTimeEntry: (data: Partial<TimeEntryFormData>) => Promise<void>
  deleteTimeEntry: () => Promise<void>
}

// Project Hooks
export const useProjects = (): UseProjectsReturn => {
  const projects = useStore(selectors.selectProjects)
  const loading = useStore(selectors.selectProjectsLoading)
  const error = useStore(selectors.selectProjectsError)
  const createProject = useStore((state) => state.createProject)
  const updateProject = useStore((state) => state.updateProject)
  const deleteProject = useStore((state) => state.deleteProject)
  const fetchProjects = useStore((state) => state.fetchProjects)

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    fetchProjects
  }
}

export const useProject = (id: string): UseProjectReturn => {
  const project = useStore((state) => selectors.selectProjectById(state, id))
  const projectWithDetails = useStore((state) => selectors.selectProjectWithDetails(state, id))
  const updateProject = useStore((state) => state.updateProject)
  const deleteProject = useStore((state) => state.deleteProject)

  return {
    project,
    projectWithDetails,
    updateProject: useCallback(
      (data: Partial<ProjectFormData>) => updateProject(id, data),
      [id, updateProject]
    ),
    deleteProject: useCallback(
      () => deleteProject(id),
      [id, deleteProject]
    )
  }
}

// Objective Hooks
export const useObjectives = (): UseObjectivesReturn => {
  const objectives = useStore(selectors.selectObjectives)
  const loading = useStore(selectors.selectObjectivesLoading)
  const error = useStore(selectors.selectObjectivesError)
  const createObjective = useStore((state) => state.createObjective)
  const updateObjective = useStore((state) => state.updateObjective)
  const deleteObjective = useStore((state) => state.deleteObjective)
  const fetchObjectives = useStore((state) => state.fetchObjectives)

  return {
    objectives,
    loading,
    error,
    createObjective,
    updateObjective,
    deleteObjective,
    fetchObjectives
  }
}

export const useObjective = (id: string): UseObjectiveReturn => {
  const objective = useStore((state) => selectors.selectObjectiveById(state, id))
  const objectiveWithDetails = useStore((state) => selectors.selectObjectiveWithDetails(state, id))
  const updateObjective = useStore((state) => state.updateObjective)
  const deleteObjective = useStore((state) => state.deleteObjective)

  return {
    objective,
    objectiveWithDetails,
    updateObjective: useCallback(
      (data: Partial<ObjectiveFormData>) => updateObjective(id, data),
      [id, updateObjective]
    ),
    deleteObjective: useCallback(
      () => deleteObjective(id),
      [id, deleteObjective]
    )
  }
}

export const useTask = (id: string): UseTaskReturn => {
  const task = useStore((state) => selectors.selectTaskById(state, id))
  const updateTask = useStore((state) => state.updateTask)
  const deleteTask = useStore((state) => state.deleteTask)

  return {
    task,
    updateTask: useCallback(
      (data: Partial<TaskFormData>) => updateTask(id, data),
      [id, updateTask]
    ),
    deleteTask: useCallback(
      () => deleteTask(id),
      [id, deleteTask]
    )
  }
}

// TodoList Hooks
export const useTodoLists = (): UseTodoListsReturn => {
  const todoLists = useStore(selectors.selectTodoLists)
  const loading = useStore(selectors.selectTodoListsLoading)
  const error = useStore(selectors.selectTodoListsError)
  const createTodoList = useStore((state) => state.createTodoList)
  const updateTodoList = useStore((state) => state.updateTodoList)
  const deleteTodoList = useStore((state) => state.deleteTodoList)
  const fetchTodoLists = useStore((state) => state.fetchTodoLists)

  return {
    todoLists,
    loading,
    error,
    createTodoList,
    updateTodoList,
    deleteTodoList,
    fetchTodoLists
  }
}

export const useTodoList = (id: string): UseTodoListReturn => {
  const todoList = useStore((state) => selectors.selectTodoListById(state, id))
  const todoListWithTasks = useStore((state) => 
    selectors.selectTodoListsWithTasks(state).find((list) => list.id === id)
  )
  const updateTodoList = useStore((state) => state.updateTodoList)
  const deleteTodoList = useStore((state) => state.deleteTodoList)

  return {
    todoList,
    todoListWithTasks,
    updateTodoList: useCallback(
      (data: Partial<TodoListFormData>) => updateTodoList(id, data),
      [id, updateTodoList]
    ),
    deleteTodoList: useCallback(
      () => deleteTodoList(id),
      [id, deleteTodoList]
    )
  }
}

// TimeEntry Hooks
export const useTimeEntries = (): UseTimeEntriesReturn => {
  const timeEntries = useStore(selectors.selectTimeEntries)
  const loading = useStore(selectors.selectTimeEntriesLoading)
  const error = useStore(selectors.selectTimeEntriesError)
  const createTimeEntry = useStore((state) => state.createTimeEntry)
  const updateTimeEntry = useStore((state) => state.updateTimeEntry)
  const deleteTimeEntry = useStore((state) => state.deleteTimeEntry)
  const fetchTimeEntries = useStore((state) => state.fetchTimeEntries)

  return {
    timeEntries,
    loading,
    error,
    createTimeEntry,
    updateTimeEntry,
    deleteTimeEntry,
    fetchTimeEntries
  }
}

export const useTimeEntry = (id: string): UseTimeEntryReturn => {
  const timeEntry = useStore((state) => selectors.selectTimeEntryById(state, id))
  const updateTimeEntry = useStore((state) => state.updateTimeEntry)
  const deleteTimeEntry = useStore((state) => state.deleteTimeEntry)

  return {
    timeEntry,
    updateTimeEntry: useCallback(
      (data: Partial<TimeEntryFormData>) => updateTimeEntry(id, data),
      [id, updateTimeEntry]
    ),
    deleteTimeEntry: useCallback(
      () => deleteTimeEntry(id),
      [id, deleteTimeEntry]
    )
  }
}

// Global Hooks
interface UseStoreStatusReturn {
  isLoading: boolean
  hasError: boolean
  clearErrors: () => void
  refreshAll: () => Promise<void>
}

export const useStoreStatus = (): UseStoreStatusReturn => {
  const anyLoading = useStore(selectors.selectAnyLoading)
  const anyError = useStore(selectors.selectAnyError)
  const clearErrors = useStore((state) => state.clearErrors)
  const refreshAll = useStore((state) => state.refreshAll)

  return {
    isLoading: anyLoading,
    hasError: !!anyError,
    clearErrors,
    refreshAll
  }
}