// src/types/time/timeEntryForm.ts

export interface TimeEntryFormData {
  taskId: string;
  startTime: string; // ISO string
  endTime?: string;  // ISO string
  description?: string;
}
