'use client';

import { useState, useCallback, FormEvent } from 'react';
import type { FormState, FormHandlers, UseFormReturn, FormConfig } from '@/types/forms';

export function useForm<T extends Record<string, any>>(config: FormConfig<T>): UseFormReturn<T> {
  const [formState, setFormState] = useState<FormState<T>>({
    values: config.initialValues,
    errors: {},
    touched: {} as Record<keyof T, boolean>,
    isSubmitting: false,
    isDirty: false,
    isValid: true,
    submitCount: 0
  });

  const handleChange = useCallback((name: string, value: any) => {
    setFormState(prev => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value
      },
      isDirty: true
    }));
  }, []);

  const handleBlur = useCallback((name: string) => {
    setFormState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        [name]: true
      }
    }));
  }, []);

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setFormState(prev => ({
      ...prev,
      values: {
        ...prev.values,
        [field]: value
      },
      isDirty: true
    }));
  }, []);

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setFormState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [field]: error
      }
    }));
  }, []);

  const setFieldTouched = useCallback((field: keyof T, isTouched: boolean = true) => {
    setFormState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        [field]: isTouched
      }
    }));
  }, []);

  const validateField = useCallback(async (field: keyof T) => {
    if (config.validate) {
      const errors = await config.validate(formState.values);
      return errors[field as string];
    }
    return undefined;
  }, [config, formState.values]);

  const validateForm = useCallback(async () => {
    if (config.validate) {
      const errors = await config.validate(formState.values);
      setFormState(prev => ({
        ...prev,
        errors,
        isValid: Object.keys(errors).length === 0
      }));
      return errors;
    }
    return {};
  }, [config, formState.values]);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState(prev => ({ 
      ...prev, 
      isSubmitting: true,
      submitCount: prev.submitCount + 1 
    }));

    try {
      const errors = await validateForm();
      if (Object.keys(errors).length === 0) {
        await config.onSubmit(formState.values);
      }
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          submit: error instanceof Error ? error.message : 'Submission failed'
        }
      }));
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [config, formState.values, validateForm]);

  const resetForm = useCallback(() => {
    setFormState({
      values: config.initialValues,
      errors: {},
      touched: {} as Record<keyof T, boolean>,
      isSubmitting: false,
      isDirty: false,
      isValid: true,
      submitCount: 0
    });
  }, [config.initialValues]);

  return {
    ...formState,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    handleSubmit,
    resetForm,
    validateField,
    validateForm,
    setValues: (values: T) => setFormState(prev => ({ ...prev, values })),
    setErrors: (errors: Record<string, string>) => 
      setFormState(prev => ({ ...prev, errors })),
    setTouched: (touched: Record<keyof T, boolean>) => 
      setFormState(prev => ({ ...prev, touched }))
  };
}