// src/types/base.ts

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Status = 'not-started' | 'active' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';
export type Priority = 'low' | 'medium' | 'high';
// export type TodoListType = 'daily' | 'weekly' | 'monthly'; // Extend as needed
