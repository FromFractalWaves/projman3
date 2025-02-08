// src/types/forms/formHandlers.ts
export interface FormHandlers<T> {
    handleChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => void;
    
    handleBlur: (
      e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => void;
    
    setFieldValue: (field: keyof T, value: any) => void;
    
    setFieldError: (field: keyof T, error: string) => void;
    
    setFieldTouched: (field: keyof T, isTouched?: boolean) => void;
    
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    
    resetForm: () => void;
  }