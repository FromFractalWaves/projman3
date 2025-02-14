// src/types/cards/cardProps.ts
import { ReactNode } from 'react';
import { CardVariant } from './variants';
import { Task } from '../task/task';
import { CardActionsForEntity } from './cardActions';

export interface BaseCardProps {
  content: string;
  description?: string;
  status?: string;
  priority?: string;
  startDate?: string;
  dueDate?: string;
  estimatedHours?: number;
  actions?: CardActionsForEntity<any>;
  variant?: CardVariant;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export interface TaskCardProps {
  task: Task;
  variant?: CardVariant;
  className?: string;
  onClick?: () => void;
}