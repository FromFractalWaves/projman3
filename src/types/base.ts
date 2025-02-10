// src/types/base.ts

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Status = 'not-started' | 'active' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';
export type Priority = 'low' | 'medium' | 'high';
// export type TodoListType = 'daily' | 'weekly' | 'monthly'; // Extend as needed
export type EntityType = 'project' | 'task' | 'objective' | 'todoList';

export interface BaseCardProps {
  type: EntityType;
  title: string;
  description?: string;
  status?: string;
  startDate?: string;
  dueDate?: string;
  estimatedHours?: number;
  priority?: 'low' | 'medium' | 'high';
  variant?: 'default' | 'compact' | 'detailed';
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
  className?: string;
}