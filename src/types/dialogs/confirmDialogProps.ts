// src/types/dialogs/confirmDialogProps.ts
import { BaseDialogProps } from './baseDialogProps';

export interface ConfirmDialogProps extends BaseDialogProps {
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => Promise<void>;
  variant?: 'default' | 'destructive';
}
