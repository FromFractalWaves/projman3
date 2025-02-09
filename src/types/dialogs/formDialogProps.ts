// src/types/dialogs/formDialogProps.ts
import type { ReactNode } from 'react';
import type { UseFormReturn } from '@/types/forms/base';
import type { BaseDialogProps } from './baseDialogProps';

export interface FormDialogProps<T extends Record<string, any>> extends Omit<BaseDialogProps, 'children'> {
  children: ReactNode;
  form: UseFormReturn<T>;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  onSubmit?: (values: T) => Promise<void>;
}