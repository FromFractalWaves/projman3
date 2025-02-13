// src/types/dashboard/tasks.ts
import { Task, Project, Objective } from '@/types';

export interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  todoTasks: number;
  overdueTasks: number;
  highPriorityTasks: number;
}

export interface DashboardTasksProps {
  tasks: Task[];
  projects: Project[];
  objectives: Objective[];
  onTaskClick?: (task: Task) => void;
  onAddTask?: () => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (task: Task) => void;
  onStatusChange?: (task: Task, status: string) => Promise<void>;
  onPriorityChange?: (task: Task, priority: string) => Promise<void>;
  className?: string;
}

export interface TaskFilterState {
  status?: string;
  priority?: string;
  projectId?: string;
  objectiveId?: string;
  search?: string;
}

export interface TaskFilterProps {
  projects: Project[];
  objectives: Objective[];
  filters: TaskFilterState;
  onFilterChange: (filters: TaskFilterState) => void;
}