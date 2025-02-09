// src/types/forms/base/formState.ts
export interface FormState<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  submitCount: number;
}