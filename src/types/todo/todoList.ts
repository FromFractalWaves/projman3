// src/types/todoList/todoList.ts

import { BaseEntity } from '../base';
import { Task } from '../task/task';

export type TodoListStatus = 'active' | 'archived';
export type TodoListType = 'daily' | 'weekly' | 'monthly'; // Extend as needed

export interface TodoList extends BaseEntity {
  name: string;
  type: TodoListType;
  tasks: Task[];
}
