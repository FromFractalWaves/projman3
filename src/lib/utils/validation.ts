// src/lib/utils/validation.ts

export const validateDateRange = (startDate: Date, endDate?: Date): boolean => {
    if (!endDate) return true;
    return new Date(startDate) <= new Date(endDate);
  };
  
  export const validateTimeEntry = (startTime: Date, endTime?: Date): boolean => {
    if (!endTime) return true;
    return new Date(startTime) <= new Date(endTime);
  };