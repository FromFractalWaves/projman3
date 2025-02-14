// src/types/base.ts

export interface Filterable {
  status?: string;
  priority?: string;
  createdAt?: Date;
  name?: string;
}

export interface BaseEntity extends Filterable {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Status = 'not-started' | 'active' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';
export type Priority = 'low' | 'medium' | 'high';
export type EntityType = 'project' | 'task' | 'objective' | 'todoList';

// export interface BaseCardProps {
//   type: EntityType;
//   title: string;
//   description?: string;
//   status?: string;
//   startDate?: string;
//   dueDate?: string;
//   estimatedHours?: number;
//   priority?: Priority;
//   variant?: 'default' | 'compact' | 'detailed';
//   onEdit?: () => void;
//   onDelete?: () => void;
//   onClick?: () => void;
//   className?: string;
// }
