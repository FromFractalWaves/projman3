
// src/types/cards/cardCommon.ts
import { Status, Priority } from '@/types/base';

export interface CardStats {
  completedTasks: number;
  totalTasks: number;
  timeSpent: number;
  estimatedTime: number;
  progress: number;
  daysRemaining: number;
  isOverdue: boolean;
}

export interface CardMeta {
  status?: Status;
  priority?: Priority;
  startDate?: string;
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
}

export interface CardContent {
  title: string;
  description?: string;
  meta?: CardMeta;
  stats?: CardStats;
}