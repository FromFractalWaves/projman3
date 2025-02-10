// src/components/cards/CardList.tsx
import React from 'react';
import { ProjectCard, TaskCard, ObjectiveCard, TodoListCard } from './BaseCard';
import type { Project, Task, Objective, TodoList } from '@/types';
import type { EntityType } from './BaseCard';
import { cn } from '@/lib/utils';

interface CardListProps {
  type: EntityType;
  items: Array<Project | Task | Objective | TodoList>;
  layout?: 'grid' | 'list';
  variant?: 'default' | 'compact';
  onItemClick?: (item: Project | Task | Objective | TodoList) => void;
  className?: string;
}

export function CardList({
  type,
  items,
  layout = 'grid',
  variant = 'default',
  onItemClick,
  className
}: CardListProps) {
  const getCardComponent = (item: any) => {
    switch (type) {
      case 'project':
        return (
          <ProjectCard
            key={item.id}
            project={item as Project}
            variant={variant}
            onClick={() => onItemClick?.(item)}
          />
        );
      case 'task':
        return (
          <TaskCard
            key={item.id}
            task={item as Task}
            variant={variant}
            onClick={() => onItemClick?.(item)}
          />
        );
      case 'objective':
        return (
          <ObjectiveCard
            key={item.id}
            objective={item as Objective}
            variant={variant}
            onClick={() => onItemClick?.(item)}
          />
        );
      case 'todoList':
        return (
          <TodoListCard
            key={item.id}
            todoList={item as TodoList}
            variant={variant}
            onClick={() => onItemClick?.(item)}
          />
        );
      default:
        return null;
    }
  };

  if (!items?.length) {
    return (
      <div className="p-4 text-center text-zinc-500 bg-zinc-900/50 border border-zinc-800 rounded-lg">
        No items to display
      </div>
    );
  }

  return (
    <div
      className={cn(
        layout === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
          : 'space-y-3',
        className
      )}
    >
      {items.map((item) => 
        <React.Fragment key={item.id}>
          {getCardComponent(item)}
        </React.Fragment>
      )}
    </div>
  );
}