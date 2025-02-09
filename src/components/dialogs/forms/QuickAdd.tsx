import React from 'react';
import { useForm } from '@/hooks/forms/useForm';
import { FormField } from '@/components/forms/fields';
import { FormDialog } from '@/components/dialogs/base/FormDialog';
import { Button } from '@/components/ui/button';
import type { FieldConfig } from '@/types/forms/fields';

interface QuickAddButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const QuickAddButton = ({ onClick, icon, label }: QuickAddButtonProps) => (
  <Button
    variant="outline"
    className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-zinc-900/50 hover:bg-zinc-900 border-zinc-800"
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Button>
);

interface QuickAddProps<T> {
  title: string;
  description: string;
  icon: React.ReactNode;
  label: string;
  fields: FieldConfig[];
  initialValues: T;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: T) => Promise<void>;
}

export function QuickAdd<T extends Record<string, any>>({
  title,
  description,
  icon,
  label,
  fields,
  initialValues,
  isOpen,
  onOpenChange,
  onSubmit,
}: QuickAddProps<T>) {
  const form = useForm<T>({
    initialValues,
    onSubmit: async (values) => {
      await onSubmit(values);
      onOpenChange(false);
    },
  });

  return (
    <FormDialog
      title={title}
      description={description}
      trigger={
        <QuickAddButton 
          onClick={() => onOpenChange(true)}
          icon={icon}
          label={label}
        />
      }
      form={form}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSubmit={form.handleSubmit}
      submitLabel={`Create ${label.split(' ')[1]}`} // "Add Project" -> "Create Project"
    >
      <div className="space-y-4 py-4">
        {fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={form.values[field.name]}
            onChange={form.setFieldValue}
            onBlur={form.handleBlur}
            error={form.errors[field.name]}
            touched={form.touched[field.name]}
          />
        ))}
      </div>
    </FormDialog>
  );
}