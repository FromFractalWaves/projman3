// src/types/forms/fields/fieldProps.ts
import { FieldConfig } from "./fieldConfig";

export interface FormFieldProps {
    field: FieldConfig;
    value: any;
    onChange: (name: string, value: any) => void;
    onBlur?: (name: string) => void;
    error?: string;
    touched?: boolean;
  }
  
  // Form field wrapper component props
  export interface FormFieldWrapperProps {
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
    className?: string;
  }
  
