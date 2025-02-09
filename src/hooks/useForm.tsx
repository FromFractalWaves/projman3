'use client';

import { useState, useCallback, FormEvent, ChangeEvent, FocusEvent } from 'react';
import type { FormState, FormHandlers, UseFormReturn, FormConfig } from '@/types/forms';

export function useForm<T extends Record<string, any>>(config: FormConfig<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(config.initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(() => {
    const initial = {} as Record<keyof T, boolean>;
    Object.keys(config.initialValues).forEach((key) => {
      initial[key as keyof T] = false;
    });
    return initial;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFieldValue(name as keyof T, value);
  }, []);

  const handleBlur = useCallback((e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setFieldTouched(name as keyof T, true);
  }, []);

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear field error when value changes
    if (errors[field as string]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[field as string];
        return updated;
      });
    }
  }, [errors]);

  const setFieldTouched = useCallback((field: keyof T, isTouched: boolean = true) => {
    setTouched(prev => ({
      ...prev,
      [field]: isTouched
    }));
  }, []);

  const validateField = useCallback(async (field: keyof T): Promise<string | undefined> => {
    if (config.validate) {
      const fieldErrors = await config.validate(values);
      return fieldErrors[field as string];
    }
    return undefined;
  }, [config, values]);

  const validateForm = useCallback(async () => {
    if (config.validate) {
      return await config.validate(values);
    }
    return {};
  }, [config, values]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitCount(c => c + 1);

    try {
      const validationErrors = await validateForm();
      const hasErrors = Object.keys(validationErrors).length > 0;

      if (hasErrors) {
        setErrors(validationErrors);
        // Mark all fields as touched on validation error
        const allTouched = {} as Record<keyof T, boolean>;
        Object.keys(values).forEach((key) => {
          allTouched[key as keyof T] = true;
        });
        setTouched(allTouched);
        return;
      }

      await config.onSubmit(values);
      resetForm();
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Submission failed'
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [config, values, validateForm]);

  const resetForm = useCallback(() => {
    setValues(config.initialValues);
    setErrors({});
    setTouched(() => {
      const reset = {} as Record<keyof T, boolean>;
      Object.keys(config.initialValues).forEach((key) => {
        reset[key as keyof T] = false;
      });
      return reset;
    });
    setIsSubmitting(false);
  }, [config.initialValues]);

  const isValid = Object.keys(errors).length === 0;
  const isDirty = JSON.stringify(values) !== JSON.stringify(config.initialValues);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    submitCount,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    setFieldError: (field: keyof T, error: string) => 
      setErrors(prev => ({ ...prev, [field]: error })),
    setValues,
    setErrors,
    setTouched,
    validateField,
    validateForm,
    resetForm
  };
}