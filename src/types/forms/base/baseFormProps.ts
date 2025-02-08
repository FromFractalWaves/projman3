import { FieldConfig } from "../fields";

export interface BaseFormProps {
    title: string;
    description?: string;
    triggerButton: {
      label: string;
      icon?: React.ReactNode;
    };
    fields: FieldConfig[];
    onSubmit: (data: Record<string, any>) => Promise<void>;
    defaultValues?: Record<string, any>;
    submitLabel?: string;
  }