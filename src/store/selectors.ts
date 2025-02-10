// src/store/selectors.ts
import { type StoreState } from './index'

// Project Selectors
export const selectProjects = (state: StoreState) => state.projects
export const selectProjectById = (state: StoreState, id: string) => 
  state.projects.find(p => p.id === id)
export const selectActiveProjects = (state: StoreState) =>
  state.projects.filter(p => p.status === 'active')
export const selectProjectsLoading = (state: StoreState) => state.projectsLoading
export const selectProjectsError = (state: StoreState) => state.projectsError

// Objective Selectors
export const selectObjectives = (state: StoreState) => state.objectives
export const selectObjectiveById = (state: StoreState, id: string) =>
  state.objectives.find(o => o.id === id)
export const selectObjectivesByProject = (state: StoreState, projectId: string) =>
  state.objectives.filter(o => o.projectId === projectId)
export const selectActiveObjectives = (state: StoreState) =>
  state.objectives.filter(o => o.status === 'active')
export const selectObjectivesLoading = (state: StoreState) => state.objectivesLoading
export const selectObjectivesError = (state: StoreState) => state.objectivesError

// Task Selectors
export const selectTasks = (state: StoreState) => state.tasks
export const selectTaskById = (state: StoreState, id: string) =>
  state.tasks.find(t => t.id === id)
export const selectTasksByProject = (state: StoreState, projectId: string) =>
  state.tasks.filter(t => t.projectId === projectId)
export const selectTasksByObjective = (state: StoreState, objectiveId: string) =>
  state.tasks.filter(t => t.objectiveId === objectiveId)
export const selectTasksByStatus = (state: StoreState, status: string) =>
  state.tasks.filter(t => t.status === status)
export const selectTasksByPriority = (state: StoreState, priority: string) =>
  state.tasks.filter(t => t.priority === priority)
export const selectIncompleteTasks = (state: StoreState) =>
  state.tasks.filter(t => t.status !== 'done')
export const selectTasksLoading = (state: StoreState) => state.tasksLoading
export const selectTasksError = (state: StoreState) => state.tasksError

// TodoList Selectors
export const selectTodoLists = (state: StoreState) => state.todoLists
export const selectTodoListById = (state: StoreState, id: string) =>
  state.todoLists.find(t => t.id === id)
export const selectTodoListsByType = (state: StoreState, type: string) =>
  state.todoLists.filter(t => t.type === type)
export const selectTodoListsWithTasks = (state: StoreState) =>
  state.todoLists.map(list => ({
    ...list,
    tasks: state.tasks.filter(task => 
      list.tasks?.some(t => t.id === task.id)
    )
  }))
export const selectTodoListsLoading = (state: StoreState) => state.todoListsLoading
export const selectTodoListsError = (state: StoreState) => state.todoListsError

// TimeEntry Selectors
export const selectTimeEntries = (state: StoreState) => state.timeEntries
export const selectTimeEntryById = (state: StoreState, id: string) =>
  state.timeEntries.find(t => t.id === id)
export const selectTimeEntriesByTask = (state: StoreState, taskId: string) =>
  state.timeEntries.filter(t => t.taskId === taskId)
export const selectTimeEntriesByDate = (state: StoreState, date: Date) =>
  state.timeEntries.filter(t => {
    const entryDate = new Date(t.startTime)
    return (
      entryDate.getFullYear() === date.getFullYear() &&
      entryDate.getMonth() === date.getMonth() &&
      entryDate.getDate() === date.getDate()
    )
  })
export const selectTimeEntriesByDateRange = (state: StoreState, startDate: Date, endDate: Date) =>
  state.timeEntries.filter(t => {
    const entryDate = new Date(t.startTime)
    return entryDate >= startDate && entryDate <= endDate
  })
export const selectTotalTimeSpent = (state: StoreState) =>
  state.timeEntries.reduce((total, entry) => {
    if (!entry.duration) return total
    return total + entry.duration
  }, 0)
export const selectTimeEntriesLoading = (state: StoreState) => state.timeEntriesLoading
export const selectTimeEntriesError = (state: StoreState) => state.timeEntriesError

// Combined Selectors
export const selectProjectWithDetails = (state: StoreState, projectId: string) => {
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
    ).reduce((total, entry) => total + (entry.duration || 0), 0)
  }
}

export const selectObjectiveWithDetails = (state: StoreState, objectiveId: string) => {
  const objective = selectObjectiveById(state, objectiveId)
  if (!objective) return null

  const tasks = selectTasksByObjective(state, objectiveId)
  return {
    ...objective,
    tasks,
    progress: {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'done').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length
    }
  }
}

// Loading States
export const selectAnyLoading = (state: StoreState) =>
  state.projectsLoading ||
  state.objectivesLoading ||
  state.tasksLoading ||
  state.todoListsLoading ||
  state.timeEntriesLoading

// Error States
export const selectAnyError = (state: StoreState) =>
  state.projectsError ||
  state.objectivesError ||
  state.tasksError ||
  state.todoListsError ||
  state.timeEntriesError