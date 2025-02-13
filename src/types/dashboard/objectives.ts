// src/types/dashboard/objectives.ts
import { Objective, Project } from '@/types';

export interface ObjectiveStats {
  totalObjectives: number;
  completedObjectives: number;
  inProgressObjectives: number;
  overdue: number;
  completionRate: number;
}

export interface DashboardObjectivesProps {
  objectives: Objective[];
  projects: Project[];
  onObjectiveClick?: (objective: Objective) => void;
  onAddObjective?: () => void;
  onEditObjective?: (objective: Objective) => void;
  onDeleteObjective?: (objective: Objective) => void;
  className?: string;
}

export interface ObjectiveProgressProps {
  completed: number;
  total: number;
  className?: string;
}