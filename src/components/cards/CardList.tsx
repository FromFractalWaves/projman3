import React from 'react';
import { ProjectCard, TaskCard, ObjectiveCard, TodoListCard } from './BaseCard';
import { useCard } from '@/hooks/useCard';
import type { Project, Task, Objective, TodoList } from '@/types';

interface CardListProps {
  type: 'project' | 'task' | 'objective' | 'todoList';
  items: Array<Project | Task | Objective | TodoList>;
  layout?: 'grid' | 'list';
  variant?: 'default' | 'compact';
  onItemClick?: (item: any) => void;
}

export function CardList({
  type,
  items,
  layout = 'grid',
  variant = 'default',
  onItemClick
}: CardListProps) {
  const getCardComponent = (item: any) => {
    switch (type) {
      case 'project':
        return (
          <ProjectCard
            key={item.id}
            project={item}
            variant={variant}
            onClick={() => onItemClick?.(item)}
          />
        );
      case 'task':
        return (
          <TaskCard
            key={item.id}
            task={item}
            variant={variant}
            onClick={() => onItemClick?.(item)}
          />
        );
      case 'objective':
        return (
          <ObjectiveCard
            key={item.id}
            objective={item}
            variant={variant}
            onClick={() => onItemClick?.(item)}
          />
        );
      case 'todoList':
        return (
          <TodoListCard
            key={item.id}
            todoList={item}
            variant={variant}
            onClick={() => onItemClick?.(item)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={
        layout === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
          : 'space-y-3'
      }
    >
      {items.map((item) => getCardComponent(item))}
    </div>
  );
}