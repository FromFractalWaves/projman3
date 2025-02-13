// src/types/cards/cardActions.ts
import { ReactNode } from 'react';
import { Project, Task, Objective, TodoList } from '@/types';

// Base action type that all card actions extend
export interface BaseCardAction {
  label: string;
  icon?: ReactNode;
  onClick: () => Promise<void> | void;
  variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline';
  disabled?: boolean;
  tooltip?: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

// Generic card entity type
export type CardEntity = Project | Task | Objective | TodoList;

// Common actions shared across different card types
export interface CommonCardActions {
  edit?: BaseCardAction;
  delete?: BaseCardAction;
  view?: BaseCardAction;
}

// Project-specific card actions
export interface ProjectCardActions extends CommonCardActions {
  viewTimeline?: BaseCardAction;
  viewObjectives?: BaseCardAction;
  viewTasks?: BaseCardAction;
  archive?: BaseCardAction;
  duplicate?: BaseCardAction;
}

// Objective-specific card actions
export interface ObjectiveCardActions extends CommonCardActions {
  viewProgress?: BaseCardAction;
  viewTasks?: BaseCardAction;
  markComplete?: BaseCardAction;
  addTask?: BaseCardAction;
}

// Task-specific card actions
export interface TaskCardActions extends CommonCardActions {
  markComplete?: BaseCardAction;
  startTimer?: BaseCardAction;
  stopTimer?: BaseCardAction;
  addToTodoList?: BaseCardAction;
  moveToProject?: BaseCardAction;
  duplicate?: BaseCardAction;
}

// TodoList-specific card actions
export interface TodoListCardActions extends CommonCardActions {
  archive?: BaseCardAction;
  addTask?: BaseCardAction;
  duplicate?: BaseCardAction;
  export?: BaseCardAction;
}

// Type guard to check if an action is a base card action
export function isBaseCardAction(action: unknown): action is BaseCardAction {
  return (
    typeof action === 'object' &&
    action !== null &&
    'label' in action &&
    'onClick' in action &&
    typeof (action as BaseCardAction).label === 'string' &&
    typeof (action as BaseCardAction).onClick === 'function'
  );
}

// Helper type to get actions type based on entity type
export type CardActionsForEntity<T extends CardEntity> = T extends Project
  ? ProjectCardActions
  : T extends Objective
  ? ObjectiveCardActions
  : T extends Task
  ? TaskCardActions
  : T extends TodoList
  ? TodoListCardActions
  : never;

// Helper type for action groups (used in layout)
export interface CardActionGroup {
  primary?: BaseCardAction[];
  secondary?: BaseCardAction[];
  menu?: BaseCardAction[];
}

// Configuration for action button appearances
export interface CardActionConfig {
  showLabels?: boolean;
  showIcons?: boolean;
  grouping?: 'none' | 'primary' | 'menu';
  layout?: 'row' | 'column';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}
