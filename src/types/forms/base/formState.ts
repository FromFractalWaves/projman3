// src/types/forms/formState.ts
export interface FormState<T> {
    values: T;
    errors: Record<string, string>;
    isSubmitting: boolean;
    touched: Record<keyof T, boolean>;
    isDirty: boolean;
  }