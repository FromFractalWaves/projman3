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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form.values);
  };

  return (
    <BaseDialog
      title={title}
      description={description}
      trigger={trigger}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {children}
        <div className="mt-4 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange?.(false)}
            disabled={isSubmitting}
          >
            {cancelLabel}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : submitLabel}
          </Button>
        </div>
      </form>
    </BaseDialog>
  );
}