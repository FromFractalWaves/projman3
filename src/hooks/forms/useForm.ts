// src/hooks/forms/useForm.ts
import { useState, useCallback } from 'react';
import type { FieldValue, FieldConfig } from '@/types/forms/fields';

interface FormState<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isDirty: boolean;
}

interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  validate?: (values: T) => Record<string, string>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

interface UseFormReturn<T> {
  // Form state
  values: T;
  errors: Record<string, string>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;

  // Event handlers
  handleChange: (name: string, value: any) => void;
  handleBlur: (name: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;

  // Field helpers
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string) => void;
  setFieldTouched: (field: keyof T, isTouched?: boolean) => void;

  // Form helpers
  resetForm: () => void;
  validateForm: () => Promise<Record<string, string>>;
  validateField: (field: keyof T) => Promise<string | undefined>;
  setValues: (values: T) => void;
  setErrors: (errors: Record<string, string>) => void;
  setTouched: (touched: Record<keyof T, boolean>) => void;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
  validateOnChange = false,
  validateOnBlur = true,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {} as Record<keyof T, boolean>,
    isSubmitting: false,
    isDirty: false,
  });

  const setValues = useCallback((values: T) => {
    setFormState(prev => ({
      ...prev,
      values,
      isDirty: true,
    }));
  }, []);

  const setErrors = useCallback((errors: Record<string, string>) => {
    setFormState(prev => ({
      ...prev,
      errors,
    }));
  }, []);

  const setTouched = useCallback((touched: Record<keyof T, boolean>) => {
    setFormState(prev => ({
      ...prev,
      touched,
    }));
  }, []);

  const validateField = useCallback(async (field: keyof T): Promise<string | undefined> => {
    if (!validate) return;
    
    const errors = await validate(formState.values);
    return errors[field as string];
  }, [validate, formState.values]);

  const validateForm = useCallback(async (): Promise<Record<string, string>> => {
    if (!validate) return {};
    
    const errors = await validate(formState.values);
    setErrors(errors);
    return errors;
  }, [validate, formState.values, setErrors]);

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      isDirty: true,
    }));

    if (validateOnChange) {
      validateField(field);
    }
  }, [validateOnChange, validateField]);

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setFormState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: error },
    }));
  }, []);

  const setFieldTouched = useCallback((field: keyof T, isTouched = true) => {
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, [field]: isTouched },
    }));
  }, []);

  const handleChange = useCallback((name: string, value: any) => {
    setFieldValue(name as keyof T, value);
  }, [setFieldValue]);

  const handleBlur = useCallback((name: string) => {
    setFieldTouched(name as keyof T, true);
    
    if (validateOnBlur) {
      validateField(name as keyof T);
    }
  }, [validateOnBlur, validateField, setFieldTouched]);

  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {} as Record<keyof T, boolean>,
      isSubmitting: false,
      isDirty: false,
    });
  }, [initialValues]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      // Validate all fields
      const errors = await validateForm();
      
      if (Object.keys(errors).length === 0) {
        await onSubmit(formState.values);
        resetForm();
      }
    } catch (error) {
      setFieldError('submit' as keyof T, error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [formState.values, onSubmit, validateForm, resetForm, setFieldError]);

  const isValid = Object.keys(formState.errors).length === 0;

  return {
    // Form state
    ...formState,
    isValid,

    // Event handlers
    handleChange,
    handleBlur,
    handleSubmit,

    // Field helpers
    setFieldValue,
    setFieldError,
    setFieldTouched,

    // Form helpers
    resetForm,
    validateForm,
    validateField,
    setValues,
    setErrors,
    setTouched,
  };
}