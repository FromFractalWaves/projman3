// src/components/dialogs/base/ConfirmDialog.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import type { ConfirmDialogProps } from '@/types/dialogs';
import { BaseDialog } from './BaseDialog';

export function ConfirmDialog({
  title,
  description,
  trigger,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  variant = 'default',
  isOpen,
  onOpenChange,
}: ConfirmDialogProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm();
      onOpenChange?.(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseDialog
      title={title}
      description={description}
      trigger={trigger}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className="mt-4 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => onOpenChange?.(false)}
          disabled={isSubmitting}
        >
          {cancelLabel}
        </Button>
        <Button
          variant={variant}
          onClick={handleConfirm}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : confirmLabel}
        </Button>
      </div>
    </BaseDialog>
  );
}