// src/types/forms/base/formHandlers.ts
import { FormEvent } from 'react';

export interface FormHandlers<T> {
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string) => void;
  setFieldTouched: (field: keyof T, isTouched?: boolean) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;  // Changed this to be more generic
  resetForm: () => void;
}