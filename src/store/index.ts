// src/store/index.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { 
  Project, 
  Objective, 
  Task, 
  TodoList, 
  TimeEntry,
  ProjectFormData,
  ObjectiveFormData,
  TaskFormData,
  TodoListFormData,
  TimeEntryFormData 
} from '@/types'

// Import individual APIs instead of using barrel imports
import { projectsApi } from '@/lib/api/projects'
import { objectivesApi } from '@/lib/api/objectives'
import { tasksApi } from '@/lib/api/tasks'
import { todoListsApi } from '@/lib/api/todoLists'
import { timeEntriesApi } from '@/lib/api/timeEntries'

// Project State
interface ProjectState {
  projects: Project[]
  projectsLoading: boolean
  projectsError: Error | null
  fetchProjects: () => Promise<void>
  createProject: (data: ProjectFormData) => Promise<void>
  updateProject: (id: string, data: Partial<ProjectFormData>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
}

// Objective State
interface ObjectiveState {
  objectives: Objective[]
  objectivesLoading: boolean
  objectivesError: Error | null
  fetchObjectives: () => Promise<void>
  createObjective: (data: ObjectiveFormData) => Promise<void>
  updateObjective: (id: string, data: Partial<ObjectiveFormData>) => Promise<void>
  deleteObjective: (id: string) => Promise<void>
}

// Task State
interface TaskState {
  tasks: Task[]
  tasksLoading: boolean
  tasksError: Error | null
  fetchTasks: () => Promise<void>
  createTask: (data: TaskFormData) => Promise<void>
  updateTask: (id: string, data: Partial<TaskFormData>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}

// TodoList State
interface TodoListState {
  todoLists: TodoList[]
  todoListsLoading: boolean
  todoListsError: Error | null
  fetchTodoLists: () => Promise<void>
  createTodoList: (data: TodoListFormData) => Promise<void>
  updateTodoList: (id: string, data: Partial<TodoListFormData>) => Promise<void>
  deleteTodoList: (id: string) => Promise<void>
}

// TimeEntry State
interface TimeEntryState {
  timeEntries: TimeEntry[]
  timeEntriesLoading: boolean
  timeEntriesError: Error | null
  fetchTimeEntries: () => Promise<void>
  createTimeEntry: (data: TimeEntryFormData) => Promise<void>
  updateTimeEntry: (id: string, data: Partial<TimeEntryFormData>) => Promise<void>
  deleteTimeEntry: (id: string) => Promise<void>
}

// Global Actions
interface GlobalActions {
  refreshAll: () => Promise<void>
  clearErrors: () => void
}

// Combined Store State
export interface StoreState extends 
  ProjectState, 
  ObjectiveState, 
  TaskState, 
  TodoListState, 
  TimeEntryState,
  GlobalActions {}

// Middleware Options Types
interface PersistOptions {
  name: string
  partialize: (state: StoreState) => Partial<StoreState>
}

// Create the store
export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        // Project State Implementation
        projects: [],
        projectsLoading: false,
        projectsError: null,
        fetchProjects: async () => {
          set({ projectsLoading: true })
          try {
            const projects = await projectsApi.getProjects()
            set({ projects, projectsError: null })
          } catch (error) {
            set({ projectsError: error as Error })
          } finally {
            set({ projectsLoading: false })
          }
        },
        createProject: async (data: ProjectFormData) => {
          set({ projectsLoading: true })
          try {
            const newProject = await projectsApi.createProject(data)
            set((state) => ({ 
              projects: [...state.projects, newProject],
              projectsError: null 
            }))
          } catch (error) {
            set({ projectsError: error as Error })
          } finally {
            set({ projectsLoading: false })
          }
        },
        updateProject: async (id: string, data: Partial<ProjectFormData>) => {
          set({ projectsLoading: true })
          try {
            const updatedProject = await projectsApi.updateProject(id, data)
            set((state) => ({
              projects: state.projects.map((p) => 
                p.id === id ? updatedProject : p
              ),
              projectsError: null
            }))
          } catch (error) {
            set({ projectsError: error as Error })
          } finally {
            set({ projectsLoading: false })
          }
        },
        deleteProject: async (id: string) => {
          set({ projectsLoading: true })
          try {
            await projectsApi.deleteProject(id)
            set((state) => ({
              projects: state.projects.filter((p) => p.id !== id),
              projectsError: null
            }))
          } catch (error) {
            set({ projectsError: error as Error })
          } finally {
            set({ projectsLoading: false })
          }
        },

        // Objective State Implementation
        objectives: [],
        objectivesLoading: false,
        objectivesError: null,
        fetchObjectives: async () => {
          set({ objectivesLoading: true })
          try {
            const objectives = await objectivesApi.getObjectives()
            set({ objectives, objectivesError: null })
          } catch (error) {
            set({ objectivesError: error as Error })
          } finally {
            set({ objectivesLoading: false })
          }
        },
        createObjective: async (data: ObjectiveFormData) => {
          set({ objectivesLoading: true })
          try {
            const newObjective = await objectivesApi.createObjective(data)
            set((state) => ({
              objectives: [...state.objectives, newObjective],
              objectivesError: null
            }))
          } catch (error) {
            set({ objectivesError: error as Error })
          } finally {
            set({ objectivesLoading: false })
          }
        },
        updateObjective: async (id: string, data: Partial<ObjectiveFormData>) => {
          set({ objectivesLoading: true })
          try {
            const updatedObjective = await objectivesApi.updateObjective(id, data)
            set((state) => ({
              objectives: state.objectives.map((o) =>
                o.id === id ? updatedObjective : o
              ),
              objectivesError: null
            }))
          } catch (error) {
            set({ objectivesError: error as Error })
          } finally {
            set({ objectivesLoading: false })
          }
        },
        deleteObjective: async (id: string) => {
          set({ objectivesLoading: true })
          try {
            await objectivesApi.deleteObjective(id)
            set((state) => ({
              objectives: state.objectives.filter((o) => o.id !== id),
              objectivesError: null
            }))
          } catch (error) {
            set({ objectivesError: error as Error })
          } finally {
            set({ objectivesLoading: false })
          }
        },

        // Task State Implementation
        tasks: [],
        tasksLoading: false,
        tasksError: null,
        fetchTasks: async () => {
          set({ tasksLoading: true })
          try {
            const tasks = await tasksApi.getTasks()
            set({ tasks, tasksError: null })
          } catch (error) {
            set({ tasksError: error as Error })
          } finally {
            set({ tasksLoading: false })
          }
        },
        createTask: async (data: TaskFormData) => {
          set({ tasksLoading: true })
          try {
            const newTask = await tasksApi.createTask(data)
            set((state) => ({
              tasks: [...state.tasks, newTask],
              tasksError: null
            }))
          } catch (error) {
            set({ tasksError: error as Error })
          } finally {
            set({ tasksLoading: false })
          }
        },
        updateTask: async (id: string, data: Partial<TaskFormData>) => {
          set({ tasksLoading: true })
          try {
            const updatedTask = await tasksApi.updateTask(id, data)
            set((state) => ({
              tasks: state.tasks.map((t) =>
                t.id === id ? updatedTask : t
              ),
              tasksError: null
            }))
          } catch (error) {
            set({ tasksError: error as Error })
          } finally {
            set({ tasksLoading: false })
          }
        },
        deleteTask: async (id: string) => {
          set({ tasksLoading: true })
          try {
            await tasksApi.deleteTask(id)
            set((state) => ({
              tasks: state.tasks.filter((t) => t.id !== id),
              tasksError: null
            }))
          } catch (error) {
            set({ tasksError: error as Error })
          } finally {
            set({ tasksLoading: false })
          }
        },

        // TodoList State Implementation
        todoLists: [],
        todoListsLoading: false,
        todoListsError: null,
        fetchTodoLists: async () => {
          set({ todoListsLoading: true })
          try {
            const todoLists = await todoListsApi.getTodoLists()
            set({ todoLists, todoListsError: null })
          } catch (error) {
            set({ todoListsError: error as Error })
          } finally {
            set({ todoListsLoading: false })
          }
        },
        createTodoList: async (data: TodoListFormData) => {
          set({ todoListsLoading: true })
          try {
            const newTodoList = await todoListsApi.createTodoList(data)
            set((state) => ({
              todoLists: [...state.todoLists, newTodoList],
              todoListsError: null
            }))
          } catch (error) {
            set({ todoListsError: error as Error })
          } finally {
            set({ todoListsLoading: false })
          }
        },
        updateTodoList: async (id: string, data: Partial<TodoListFormData>) => {
          set({ todoListsLoading: true })
          try {
            const updatedTodoList = await todoListsApi.updateTodoList(id, data)
            set((state) => ({
              todoLists: state.todoLists.map((t) =>
                t.id === id ? updatedTodoList : t
              ),
              todoListsError: null
            }))
          } catch (error) {
            set({ todoListsError: error as Error })
          } finally {
            set({ todoListsLoading: false })
          }
        },
        deleteTodoList: async (id: string) => {
          set({ todoListsLoading: true })
          try {
            await todoListsApi.deleteTodoList(id)
            set((state) => ({
              todoLists: state.todoLists.filter((t) => t.id !== id),
              todoListsError: null
            }))
          } catch (error) {
            set({ todoListsError: error as Error })
          } finally {
            set({ todoListsLoading: false })
          }
        },

        // TimeEntry State Implementation
        timeEntries: [],
        timeEntriesLoading: false,
        timeEntriesError: null,
        fetchTimeEntries: async () => {
          set({ timeEntriesLoading: true })
          try {
            const timeEntries = await timeEntriesApi.getTimeEntries()
            set({ timeEntries, timeEntriesError: null })
          } catch (error) {
            set({ timeEntriesError: error as Error })
          } finally {
            set({ timeEntriesLoading: false })
          }
        },
        createTimeEntry: async (data: TimeEntryFormData) => {
          set({ timeEntriesLoading: true })
          try {
            const newTimeEntry = await timeEntriesApi.createTimeEntry(data)
            set((state) => ({
              timeEntries: [...state.timeEntries, newTimeEntry],
              timeEntriesError: null
            }))
          } catch (error) {
            set({ timeEntriesError: error as Error })
          } finally {
            set({ timeEntriesLoading: false })
          }
        },
        updateTimeEntry: async (id: string, data: Partial<TimeEntryFormData>) => {
          set({ timeEntriesLoading: true })
          try {
            const updatedTimeEntry = await timeEntriesApi.updateTimeEntry(id, data)
            set((state) => ({
              timeEntries: state.timeEntries.map((t) =>
                t.id === id ? updatedTimeEntry : t
              ),
              timeEntriesError: null
            }))
          } catch (error) {
            set({ timeEntriesError: error as Error })
          } finally {
            set({ timeEntriesLoading: false })
          }
        },
        deleteTimeEntry: async (id: string) => {
          set({ timeEntriesLoading: true })
          try {
            await timeEntriesApi.deleteTimeEntry(id)
            set((state) => ({
              timeEntries: state.timeEntries.filter((t) => t.id !== id),
              timeEntriesError: null
            }))
          } catch (error) {
            set({ timeEntriesError: error as Error })
          } finally {
            set({ timeEntriesLoading: false })
          }
        },

        // Global Actions Implementation
        refreshAll: async () => {
          await Promise.all([
            get().fetchProjects(),
            get().fetchObjectives(),
            get().fetchTasks(),
            get().fetchTodoLists(),
            get().fetchTimeEntries()
          ])
        },
        clearErrors: () => {
          set({
            projectsError: null,
            objectivesError: null,
            tasksError: null,
            todoListsError: null,
            timeEntriesError: null
          })
        }
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
      } as PersistOptions
    )
  )
)