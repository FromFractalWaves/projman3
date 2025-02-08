// src/lib/utils/date.ts

// src/utils/date.ts
export const isValidDateString = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

export const parseFormDate = (dateString: string | undefined): Date | undefined => {
  if (!dateString) return undefined;
  if (!isValidDateString(dateString)) {
    throw new Error('Invalid date string provided');
  }
  return new Date(dateString);
};

export const formatDate = (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };
  
  export const calculateDaysRemaining = (dueDate: Date | string): number => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  export const isOverdue = (dueDate: Date | string): boolean => {
    return calculateDaysRemaining(dueDate) < 0;
  };