// src/types/forms/fields/buttonConfig.ts

// Button style variants
export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';
export type ButtonColor = 'blue' | 'green' | 'yellow' | 'purple' | 'indigo';

// Base button configuration
export interface BaseButtonConfig {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

// Form buttons configuration
export interface FormButtonsConfig {
  submit: BaseButtonConfig;
  cancel?: BaseButtonConfig;
  reset?: BaseButtonConfig;
}

// Form buttons props (for the component)
export interface FormButtonsProps {
  config?: FormButtonsConfig;
  onCancel?: () => void;
  onReset?: () => void;
  isSubmitting?: boolean;
  submitText?: string;
  cancelText?: string;
  color?: ButtonColor;
  disabled?: boolean;
  className?: string;
}

// Form buttons state
export interface FormButtonsState {
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
}