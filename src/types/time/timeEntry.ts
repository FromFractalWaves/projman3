// src/types/time/timeEntry.ts

import { BaseEntity } from '../base';
import { Task } from '../task/task';

export interface TimeEntry extends BaseEntity {
  taskId: string;
  task: Task;
  startTime: Date;
  endTime?: Date;
  duration?: number; // Duration in minutes
  description?: string;
}
