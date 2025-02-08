
// src/types/forms/formConfig.ts
export interface FormConfig<T> {
    initialValues: T;
    onSubmit: (values: T) => Promise<void>;
    validate?: (values: T) => Record<string, string>;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
  }