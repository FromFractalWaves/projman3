// src/types/forms/base/formHandlers.ts

import { FormEvent, ChangeEvent, FocusEvent } from 'react';

export interface FormHandlers<T> {
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string) => void;
  setFieldTouched: (field: keyof T, isTouched?: boolean) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  resetForm: () => void;
}
