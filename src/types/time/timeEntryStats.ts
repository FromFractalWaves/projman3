// src/types/time/timeEntryStats.ts

export interface TimeEntryStats {
  totalDuration: number;       // in minutes
  averageDuration: number;     // in minutes
  entriesCount: number;
  dailyAverage: number;        // in minutes
}
