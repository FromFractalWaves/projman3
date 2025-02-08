// src/types/time/timeTracking.ts

export interface TimeTracking {
  startDate: string; // ISO string
  dueDate?: string;  // ISO string
  estimatedHours?: number;
}
