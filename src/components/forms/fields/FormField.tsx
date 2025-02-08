// src/components/forms/fields/FormField.tsx
import React from 'react';
import type { FieldConfig, FormFieldProps } from '@/types/forms/fields';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Separate the wrapper into its own component file
export const FormFieldLabel: React.FC<{
  label: string;
  required?: boolean;
  htmlFor?: string;
}> = ({ label, required, htmlFor }) => (
  <label 
    htmlFor={htmlFor}
    className="text-sm font-medium text-gray-200"
  >
    {label}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

// Field wrapper with error handling
export const FormFieldWrapper: React.FC<{
  children: React.ReactNode;
  label: string;
  required?: boolean;
  error?: string;
  htmlFor?: string;
}> = ({ children, label, required, error, htmlFor }) => (
  <div className="space-y-2">
    <FormFieldLabel label={label} required={required} htmlFor={htmlFor} />
    {children}
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

// Main FormField component
export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(({
  field,
  value,
  onChange,
  onBlur,
  error,
  touched
}, ref) => {
  if (!field) {
    return null;
  }

  const handleChange = (newValue: string) => {
    onChange?.(field.name, newValue);
  };

  const handleBlur = () => {
    onBlur?.(field.name);
  };

  const commonProps = {
    id: field.name,
    name: field.name,
    value: value ?? '',
    onChange: (e: React.ChangeEvent<any>) => handleChange(e.target.value),
    onBlur: handleBlur,
    required: field.required,
    disabled: field.disabled,
    placeholder: field.placeholder,
    className: field.className,
  };

  const renderInput = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            {...commonProps}
            rows={field.rows}
          />
        );

      case 'select':
        return (
          <Select
            value={value ?? ''}
            onValueChange={handleChange}
            disabled={field.disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'number':
        return (
          <Input
            {...commonProps}
            type="number"
            min={field.min}
            max={field.max}
            step={field.step}
          />
        );

      case 'date':
      case 'datetime-local':
        return (
          <Input
            {...commonProps}
            type={field.type}
            min={field.min}
            max={field.max}
          />
        );

      default:
        return (
          <Input
            {...commonProps}
            type="text"
          />
        );
    }
  };

  return (
    <FormFieldWrapper
      label={field.label}
      required={field.required}
      error={error}
      htmlFor={field.name}
    >
      {renderInput()}
    </FormFieldWrapper>
  );
});

FormField.displayName = 'FormField';