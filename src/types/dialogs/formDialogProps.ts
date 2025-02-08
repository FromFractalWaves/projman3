// src/types/dialogs/formDialogProps.ts
import { BaseDialogProps } from './baseDialogProps';
import { UseFormReturn } from '../forms';

export interface FormDialogProps<T extends Record<string, any>> extends BaseDialogProps {
  form: UseFormReturn<T>;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  onSubmit: (values: T) => Promise<void>;
}