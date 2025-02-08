// src/types/forms/fields/fieldConfig.ts

// Base field types supported by the form components
export type FieldType = 'text' | 'textarea' | 'select' | 'number' | 'date' | 'datetime-local';

// Option type for select fields
export interface SelectOption {
  value: string;
  label: string;
}

// Base properties shared by all field types
export interface BaseFieldConfig {
  name: string;
  label: string;  // Making label required for all field types
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  validate?: (value: any) => string | undefined;
}

// Text field specific configuration
export interface TextFieldConfig extends BaseFieldConfig {
  type: 'text';
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

// Textarea field specific configuration
export interface TextAreaFieldConfig extends BaseFieldConfig {
  type: 'textarea';
  rows?: number;
  minLength?: number;
  maxLength?: number;
}

// Select field specific configuration
export interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select';
  options: SelectOption[];
  multiple?: boolean;
}

// Number field specific configuration
export interface NumberFieldConfig extends BaseFieldConfig {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
}

// Date field specific configuration
export interface DateFieldConfig extends BaseFieldConfig {
  type: 'date' | 'datetime-local';
  min?: string; // ISO date string
  max?: string; // ISO date string;
}

// Union type of all possible field configurations
export type FieldConfig = 
  | TextFieldConfig 
  | TextAreaFieldConfig 
  | SelectFieldConfig 
  | NumberFieldConfig 
  | DateFieldConfig;

// Field value type based on field type
export type FieldValue<T extends FieldConfig> = 
  T extends TextFieldConfig | TextAreaFieldConfig ? string :
  T extends SelectFieldConfig ? (T['multiple'] extends true ? string[] : string) :
  T extends NumberFieldConfig ? number :
  T extends DateFieldConfig ? string :
  never;

