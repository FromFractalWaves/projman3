// src/types/dashboard/todolists.ts
import { TodoList, Task } from '@/types';

export interface TodoListStats {
  totalLists: number;
  activeLists: number;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
}

export interface DashboardTodoListsProps {
  todoLists: TodoList[];
  onTodoListClick?: (todoList: TodoList) => void;
  onAddTodoList?: () => void;
  onEditTodoList?: (todoList: TodoList) => void;
  onDeleteTodoList?: (todoList: TodoList) => void;
  onAddTask?: (todoList: TodoList) => void;
  className?: string;
}

export interface TodoListProgressProps {
  tasks: Task[];
  className?: string;
}