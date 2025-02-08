// src/lib/utils/calculations.ts

export const calculateProgress = (completed: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };
  
  export const calculateTimeSpent = (timeEntries: { startTime: Date; endTime?: Date }[]): number => {
    return timeEntries.reduce((total, entry) => {
      if (!entry.endTime) return total;
      const duration = new Date(entry.endTime).getTime() - new Date(entry.startTime).getTime();
      return total + duration / (1000 * 60); // Convert to minutes
    }, 0);
  };
  