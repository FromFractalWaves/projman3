// src/components/dialogs/base/FormDialog.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import type { FormDialogProps } from '@/types/dialogs';
import { BaseDialog } from './BaseDialog';

export function FormDialog<T extends Record<string, any>>({
  title,
  description,
  trigger,
  form,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  isSubmitting,
  onSubmit,
  isOpen,
  onOpenChange,
  children,
}: FormDialogProps<T>) {
  return (
    <BaseDialog
      title={title}
      description={description}
      trigger={trigger}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <form onSubmit={form.handleSubmit} className="space-y-4">
        {children}
        <div className="mt-4 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange?.(false)}
            disabled={form.isSubmitting}
          >
            {cancelLabel}
          </Button>
          <Button
            type="submit"
            disabled={form.isSubmitting}
          >
            {form.isSubmitting ? 'Saving...' : submitLabel}
          </Button>
        </div>
      </form>
    </BaseDialog>
  );
}