// src/types/forms/base/formConfig.ts
export interface FormConfig<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  validate?: (values: T) => Promise<Record<string, string>> | Record<string, string>;
}