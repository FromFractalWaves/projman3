import { FormState } from "./formState";
import { FormHandlers } from "./formHandlers";

// src/types/forms/useFormReturn.ts
export interface UseFormReturn<T> extends FormState<T>, FormHandlers<T> {
  setValues: (values: T) => void;
  setErrors: (errors: Record<string, string>) => void;
  setTouched: (touched: Record<keyof T, boolean>) => void;
  validateField: (field: keyof T) => Promise<string | undefined>;
  validateForm: () => Promise<Record<string, string>>;
}