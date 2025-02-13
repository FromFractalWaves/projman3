
// src/types/cards/cardProps.ts
import { HTMLAttributes } from 'react';
import { CardVariant } from './variants';
import { CardContent } from './cardCommon';
import { CardActionsForEntity, CardEntity } from './cardActions';

// Base props for all card components
export interface BaseCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  content: CardContent;
  actions?: CardActionsForEntity<CardEntity>;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

// Project card specific props
export interface ProjectCardProps extends Omit<BaseCardProps, 'content'> {
  project: Project;
}

// Objective card specific props
export interface ObjectiveCardProps extends Omit<BaseCardProps, 'content'> {
  objective: Objective;
}

// Task card specific props
export interface TaskCardProps extends Omit<BaseCardProps, 'content'> {
  task: Task;
}

// TodoList card specific props
export interface TodoListCardProps extends Omit<BaseCardProps, 'content'> {
  todoList: TodoList;
}
