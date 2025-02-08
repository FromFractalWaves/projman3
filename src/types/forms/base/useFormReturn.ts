import { FormState } from "./formState";
import { FormHandlers } from "./formHandlers";

// src/types/forms/useFormReturn.ts
export interface UseFormReturn<T> extends FormState<T>, FormHandlers<T> {
    // Additional utility properties
    isValid: boolean;
    submitCount: number;
    
    // Additional utility methods
    validateForm: () => Promise<Record<string, string>>;
    validateField: (field: keyof T) => Promise<string | undefined>;
    setValues: (values: T) => void;
    setErrors: (errors: Record<string, string>) => void;
    setTouched: (touched: Record<keyof T, boolean>) => void;
  }
  