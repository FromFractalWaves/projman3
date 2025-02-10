// src/store/hooks.ts
import { useCallback } from 'react'
import { useStore } from './index'
import * as selectors from './selectors'

// Project Hooks
export const useProjects = () => {
  const projects = useStore(selectors.selectProjects)
  const loading = useStore(selectors.selectProjectsLoading)
  const error = useStore(selectors.selectProjectsError)
  const createProject = useStore(state => state.createProject)
  const updateProject = useStore(state => state.updateProject)
  const deleteProject = useStore(state => state.deleteProject)
  const fetchProjects = useStore(state => state.fetchProjects)

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

export const useProject = (id: string) => {
  const project = useStore(state => selectors.selectProjectById(state, id))
  const projectWithDetails = useStore(state => selectors.selectProjectWithDetails(state, id))
  const updateProject = useStore(state => state.updateProject)
  const deleteProject = useStore(state => state.deleteProject)

  return {
    project,
    projectWithDetails,
    updateProject: useCallback(
      (data: any) => updateProject(id, data),
      [id, updateProject]
    ),
    deleteProject: useCallback(
      () => deleteProject(id),
      [id, deleteProject]
    )
  }
}

// Objective Hooks
export const useObjectives = () => {
  const objectives = useStore(selectors.selectObjectives)
  const loading = useStore(selectors.selectObjectivesLoading)
  const error = useStore(selectors.selectObjectivesError)
  const createObjective = useStore(state => state.createObjective)
  const updateObjective = useStore(state => state.updateObjective)
  const deleteObjective = useStore(state => state.deleteObjective)
  const fetchObjectives = useStore(state => state.fetchObjectives)

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

export const useObjective = (id: string) => {
  const objective = useStore(state => selectors.selectObjectiveById(state, id))
  const objectiveWithDetails = useStore(state => selectors.selectObjectiveWithDetails(state, id))
  const updateObjective = useStore(state => state.updateObjective)
  const deleteObjective = useStore(state => state.deleteObjective)

  return {
    objective,
    objectiveWithDetails,
    updateObjective: useCallback(
      (data: any) => updateObjective(id, data),
      [id, updateObjective]
    ),
    deleteObjective: useCallback(
      () => deleteObjective(id),
      [id, deleteObjective]
    )
  }
}

// Task Hooks
export const useTasks = () => {
  const tasks = useStore(selectors.selectTasks)
  const loading = useStore(selectors.selectTasksLoading)
  const error = useStore(selectors.selectTasksError)
  const createTask = useStore(state => state.createTask)
  const updateTask = useStore(state => state.updateTask)
  const deleteTask = useStore(state => state.deleteTask)
  const fetchTasks = useStore(state => state.fetchTasks)

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    fetchTasks
  }
}

export const useTask = (id: string) => {
  const task = useStore(state => selectors.selectTaskById(state, id))
  const updateTask = useStore(state => state.updateTask)
  const deleteTask = useStore(state => state.deleteTask)

  return {
    task,
    updateTask: useCallback(
      (data: any) => updateTask(id, data),
      [id, updateTask]
    ),
    deleteTask: useCallback(
      () => deleteTask(id),
      [id, deleteTask]
    )
  }
}

// TodoList Hooks
export const useTodoLists = () => {
  const todoLists = useStore(selectors.selectTodoLists)
  const loading = useStore(selectors.selectTodoListsLoading)
  const error = useStore(selectors.selectTodoListsError)
  const createTodoList = useStore(state => state.createTodoList)
  const updateTodoList = useStore(state => state.updateTodoList)
  const deleteTodoList = useStore(state => state.deleteTodoList)
  const fetchTodoLists = useStore(state => state.fetchTodoLists)

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

export const useTodoList = (id: string) => {
  const todoList = useStore(state => selectors.selectTodoListById(state, id))
  const todoListWithTasks = useStore(state => 
    selectors.selectTodoListsWithTasks(state).find(list => list.id === id)
  )
  const updateTodoList = useStore(state => state.updateTodoList)
  const deleteTodoList = useStore(state => state.deleteTodoList)

  return {
    todoList,
    todoListWithTasks,
    updateTodoList: useCallback(
      (data: any) => updateTodoList(id, data),
      [id, updateTodoList]
    ),
    deleteTodoList: useCallback(
      () => deleteTodoList(id),
      [id, deleteTodoList]
    )
  }
}

// TimeEntry Hooks
export const useTimeEntries = () => {
  const timeEntries = useStore(selectors.selectTimeEntries)
  const loading = useStore(selectors.selectTimeEntriesLoading)
  const error = useStore(selectors.selectTimeEntriesError)
  const createTimeEntry = useStore(state => state.createTimeEntry)
  const updateTimeEntry = useStore(state => state.updateTimeEntry)
  const deleteTimeEntry = useStore(state => state.deleteTimeEntry)
  const fetchTimeEntries = useStore(state => state.fetchTimeEntries)

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

export const useTimeEntry = (id: string) => {
  const timeEntry = useStore(state => selectors.selectTimeEntryById(state, id))
  const updateTimeEntry = useStore(state => state.updateTimeEntry)
  const deleteTimeEntry = useStore(state => state.deleteTimeEntry)

  return {
    timeEntry,
    updateTimeEntry: useCallback(
      (data: any) => updateTimeEntry(id, data),
      [id, updateTimeEntry]
    ),
    deleteTimeEntry: useCallback(
      () => deleteTimeEntry(id),
      [id, deleteTimeEntry]
    )
  }
}

// Global Hooks
export const useStoreStatus = () => {
  const anyLoading = useStore(selectors.selectAnyLoading)
  const anyError = useStore(selectors.selectAnyError)
  const clearErrors = useStore(state => state.clearErrors)
  const refreshAll = useStore(state => state.refreshAll)

  return {
    isLoading: anyLoading,
    hasError: anyError,
    clearErrors,
    refreshAll
  }
}