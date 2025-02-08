// src/components/forms/BaseForm.tsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import type { FieldConfig } from '@/types/forms/fields';
import { FormField } from './fields';

interface BaseFormProps<T> {
  title: string;
  description?: string;
  triggerButton: {
    label: string;
    icon?: React.ReactNode;
  };
  fields: FieldConfig[];
  onSubmit: (data: T) => Promise<void>;
  defaultValues?: Partial<T>;
  submitLabel?: string;
}

export function BaseForm<T extends Record<string, any>>({
  title,
  description,
  triggerButton,
  fields,
  onSubmit,
  defaultValues = {},
  submitLabel = 'Save'
}: BaseFormProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<Partial<T>>(defaultValues);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData as T);
      setOpen(false);
      setFormData(defaultValues);
      setErrors({});
    } catch (error: any) {
      setErrors(prev => ({
        ...prev,
        submit: error.message
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          {triggerButton.icon || <PlusCircle className="h-4 w-4" />}
          {triggerButton.label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={formData[field.name]}
              onChange={handleFieldChange}
              error={errors[field.name]}
            />
          ))}
          
          {errors.submit && (
            <div className="bg-red-500/10 border border-red-500 rounded-md p-3">
              <p className="text-sm text-red-500">{errors.submit}</p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : submitLabel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}