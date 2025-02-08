// src/types/dialogs/baseDialogProps.ts
import { ReactNode } from 'react';

export interface BaseDialogProps {
  title: string;
  description?: string;
  trigger: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}