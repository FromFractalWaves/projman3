// src/constants/forms/validation.ts
export const VALIDATION_MESSAGES = {
    required: (field: string) => `${field} is required`,
    invalidDate: 'Invalid date format',
    dateRange: 'End date must be after start date',
    // Add other common validation messages
  } as const;