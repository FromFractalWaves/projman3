// src/store/selectors.ts
import { StoreState } from './index'
import {
  Project,
  Objective,
  Task,
  TodoList,
  TimeEntry,
  Status,
  Priority
} from '@/types'

// Project Selectors
export const selectProjects = (state: StoreState): Project[] => state.projects

export const selectProjectById = (state: StoreState, id: string): Project | undefined => 
  state.projects.find((p: Project) => p.id === id)

export const selectActiveProjects = (state: StoreState): Project[] =>
  state.projects.filter((p: Project) => p.status === 'active')

export const selectProjectsLoading = (state: StoreState): boolean => state.projectsLoading

export const selectProjectsError = (state: StoreState): Error | null => state.projectsError

// Objective Selectors
export const selectObjectives = (state: StoreState): Objective[] => state.objectives

export const selectObjectiveById = (state: StoreState, id: string): Objective | undefined =>
  state.objectives.find((o: Objective) => o.id === id)

export const selectObjectivesByProject = (state: StoreState, projectId: string): Objective[] =>
  state.objectives.filter((o: Objective) => o.projectId === projectId)

export const selectActiveObjectives = (state: StoreState): Objective[] =>
  state.objectives.filter((o: Objective) => o.status === 'active')

export const selectObjectivesLoading = (state: StoreState): boolean => state.objectivesLoading

export const selectObjectivesError = (state: StoreState): Error | null => state.objectivesError

// Task Selectors
export const selectTasks = (state: StoreState): Task[] => state.tasks

export const selectTaskById = (state: StoreState, id: string): Task | undefined =>
  state.tasks.find((t: Task) => t.id === id)

export const selectTasksByProject = (state: StoreState, projectId: string): Task[] =>
  state.tasks.filter((t: Task) => t.projectId === projectId)

export const selectTasksByObjective = (state: StoreState, objectiveId: string): Task[] =>
  state.tasks.filter((t: Task) => t.objectiveId === objectiveId)

export const selectTasksByStatus = (state: StoreState, status: Status): Task[] =>
  state.tasks.filter((t: Task) => t.status === status)

export const selectTasksByPriority = (state: StoreState, priority: Priority): Task[] =>
  state.tasks.filter((t: Task) => t.priority === priority)

export const selectIncompleteTasks = (state: StoreState): Task[] =>
  state.tasks.filter((t: Task) => t.status !== 'done')

export const selectTasksLoading = (state: StoreState): boolean => state.tasksLoading

export const selectTasksError = (state: StoreState): Error | null => state.tasksError

// TodoList Selectors
export const selectTodoLists = (state: StoreState): TodoList[] => state.todoLists

export const selectTodoListById = (state: StoreState, id: string): TodoList | undefined =>
  state.todoLists.find((t: TodoList) => t.id === id)

export interface TodoListWithTasks extends TodoList {
  tasks: Task[]
}

export const selectTodoListsByType = (state: StoreState, type: string): TodoList[] =>
  state.todoLists.filter((t: TodoList) => t.type === type)

export const selectTodoListsWithTasks = (state: StoreState): TodoListWithTasks[] =>
  state.todoLists.map((list: TodoList) => ({
    ...list,
    tasks: state.tasks.filter((task: Task) => 
      list.tasks?.some((t: Task) => t.id === task.id)
    )
  }))

export const selectTodoListsLoading = (state: StoreState): boolean => state.todoListsLoading

export const selectTodoListsError = (state: StoreState): Error | null => state.todoListsError

// TimeEntry Selectors
export const selectTimeEntries = (state: StoreState): TimeEntry[] => state.timeEntries

export const selectTimeEntryById = (state: StoreState, id: string): TimeEntry | undefined =>
  state.timeEntries.find((t: TimeEntry) => t.id === id)

export const selectTimeEntriesByTask = (state: StoreState, taskId: string): TimeEntry[] =>
  state.timeEntries.filter((t: TimeEntry) => t.taskId === taskId)

export const selectTimeEntriesByDate = (state: StoreState, date: Date): TimeEntry[] =>
  state.timeEntries.filter((t: TimeEntry) => {
    const entryDate = new Date(t.startTime)
    return (
      entryDate.getFullYear() === date.getFullYear() &&
      entryDate.getMonth() === date.getMonth() &&
      entryDate.getDate() === date.getDate()
    )
  })

export const selectTimeEntriesByDateRange = (
  state: StoreState, 
  startDate: Date, 
  endDate: Date
): TimeEntry[] =>
  state.timeEntries.filter((t: TimeEntry) => {
    const entryDate = new Date(t.startTime)
    return entryDate >= startDate && entryDate <= endDate
  })

export const selectTotalTimeSpent = (state: StoreState): number =>
  state.timeEntries.reduce((total: number, entry: TimeEntry) => {
    if (!entry.duration) return total
    return total + entry.duration
  }, 0)

export const selectTimeEntriesLoading = (state: StoreState): boolean => 
  state.timeEntriesLoading

export const selectTimeEntriesError = (state: StoreState): Error | null => 
  state.timeEntriesError

// Combined Selectors
interface ProjectWithDetails extends Project {
  objectives: Objective[]
  tasks: Task[]
  timeSpent: number
}

interface ObjectiveWithProgress extends Objective {
  tasks: Task[]
  progress: {
    total: number
    completed: number
    inProgress: number
  }
}

export const selectProjectWithDetails = (
  state: StoreState, 
  projectId: string
): ProjectWithDetails | null => {
  const project = selectProjectById(state, projectId)
  if (!project) return null

  return {
    ...project,
    objectives: selectObjectivesByProject(state, projectId),
    tasks: selectTasksByProject(state, projectId),
    timeSpent: selectTimeEntriesByDateRange(
      state,
      project.startDate || new Date(0),
      project.dueDate || new Date()
    ).reduce((total: number, entry: TimeEntry) => total + (entry.duration || 0), 0)
  }
}

export const selectObjectiveWithDetails = (
  state: StoreState, 
  objectiveId: string
): ObjectiveWithProgress | null => {
  const objective = selectObjectiveById(state, objectiveId)
  if (!objective) return null

  const tasks = selectTasksByObjective(state, objectiveId)
  return {
    ...objective,
    tasks,
    progress: {
      total: tasks.length,
      completed: tasks.filter((t: Task) => t.status === 'done').length,
      inProgress: tasks.filter((t: Task) => t.status === 'in-progress').length
    }
  }
}

// Loading States
export const selectAnyLoading = (state: StoreState): boolean =>
  state.projectsLoading ||
  state.objectivesLoading ||
  state.tasksLoading ||
  state.todoListsLoading ||
  state.timeEntriesLoading

// Error States
export const selectAnyError = (state: StoreState): Error | null =>
  state.projectsError ||
  state.objectivesError ||
  state.tasksError ||
  state.todoListsError ||
  state.timeEntriesError