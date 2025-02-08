// src/types/objective/objectiveProgress.ts

export interface ObjectiveProgress {
  totalTasks: number;
  completedTasks: number;
  progressPercentage: number;
  onTrackTasks: number;
  delayedTasks: number;
}
