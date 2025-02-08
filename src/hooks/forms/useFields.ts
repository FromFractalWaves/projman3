// src/hooks/forms/useField.ts
import { useCallback } from 'react';
import type { FieldConfig, FieldValue } from '@/types/forms/fields';

interface UseFieldProps<T extends FieldConfig> {
  field: T;
  value: FieldValue<T>;
  onChange: (name: string, value: any) => void;
  onBlur?: (name: string) => void;
  validate?: (value: any) => string | undefined;
}

interface UseFieldReturn<T extends FieldConfig> {
  inputProps: {
    name: string;
    value: FieldValue<T>;
    onChange: (event: React.ChangeEvent<any>) => void;
    onBlur: (event: React.FocusEvent<any>) => void;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
  };
  handleChange: (value: FieldValue<T>) => void;
  handleBlur: () => void;
}

export function useField<T extends FieldConfig>({
  field,
  value,
  onChange,
  onBlur,
  validate,
}: UseFieldProps<T>): UseFieldReturn<T> {
  const handleChange = useCallback((newValue: FieldValue<T>) => {
    onChange(field.name, newValue);
  }, [field.name, onChange]);

  const handleChangeEvent = useCallback((event: React.ChangeEvent<any>) => {
    const value = event.target.value;
    handleChange(value as FieldValue<T>);
  }, [handleChange]);

  const handleBlur = useCallback(() => {
    if (onBlur) {
      onBlur(field.name);
    }
  }, [field.name, onBlur]);

  return {
    inputProps: {
      name: field.name,
      value: value ?? '',
      onChange: handleChangeEvent,
      onBlur: handleBlur,
      required: field.required,
      disabled: field.disabled,
      placeholder: field.placeholder,
      className: field.className,
    },
    handleChange,
    handleBlur,
  };
}
