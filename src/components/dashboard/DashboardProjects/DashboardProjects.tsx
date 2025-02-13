// src/types/dashboard/projects.ts
import { Project, Task, Objective } from '@/types';

export interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  overdueProjects: number;
  projectProgress: number;
  totalTasks: number;
  completedTasks: number;
}

export interface ProjectProgressProps {
  completed: number;
  total: number;
  overdue: number;
  className?: string;
}

export interface DashboardProjectsProps {
  projects: Project[];
  tasks: Task[];
  objectives: Objective[];
  onProjectClick?: (project: Project) => void;
  onAddProject?: () => void;
  onEditProject?: (project: Project) => void;
  onDeleteProject?: (project: Project) => void;
  className?: string;
}