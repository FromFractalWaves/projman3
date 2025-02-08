// src/components/forms/fields/FormButtons.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { FormButtonsProps, ButtonColor } from '@/types/forms/fields';

const colorVariants: Record<ButtonColor, string> = {
  blue: 'bg-blue-600 hover:bg-blue-700',
  green: 'bg-green-600 hover:bg-green-700',
  yellow: 'bg-yellow-600 hover:bg-yellow-700',
  purple: 'bg-purple-600 hover:bg-purple-700',
  indigo: 'bg-indigo-600 hover:bg-indigo-700',
};

export function FormButtons({
  config,
  onCancel,
  onReset,
  isSubmitting = false,
  submitText = 'Save',
  cancelText = 'Cancel',
  color = 'blue',
  disabled = false,
  className
}: FormButtonsProps) {
  const submitConfig = config?.submit || {
    label: submitText,
    color: color,
    disabled: disabled || isSubmitting,
  };

  const cancelConfig = config?.cancel || (onCancel ? {
    label: cancelText,
    variant: 'outline' as const,
    disabled: disabled || isSubmitting,
  } : undefined);

  return (
    <div className={cn('flex justify-end gap-3 pt-4', className)}>
      {cancelConfig && onCancel && (
        <Button
          type="button"
          variant={cancelConfig.variant || 'outline'}
          size={cancelConfig.size}
          onClick={onCancel}
          disabled={cancelConfig.disabled}
          className={cancelConfig.className}
        >
          {cancelConfig.icon}
          {cancelConfig.label}
        </Button>
      )}
      
      <Button
        type="submit"
        variant={submitConfig.variant || 'default'}
        size={submitConfig.size}
        disabled={submitConfig.disabled}
        className={cn(
          colorVariants[submitConfig.color || color],
          submitConfig.className
        )}
      >
        {submitConfig.icon}
        {isSubmitting ? 'Saving...' : submitConfig.label}
      </Button>

      {config?.reset && onReset && (
        <Button
          type="button"
          variant={config.reset.variant || 'ghost'}
          size={config.reset.size}
          onClick={onReset}
          disabled={config.reset.disabled}
          className={config.reset.className}
        >
          {config.reset.icon}
          {config.reset.label}
        </Button>
      )}
    </div>
  );
}