// src/components/cards/CardList.tsx
import React from 'react';
import { ProjectCard, TaskCard, ObjectiveCard, TodoListCard } from './BaseCard';
import { CardViewControls } from '@/components/ui/CardViewControls';
import { useCardList } from '@/hooks/useCardList';
import { useCardView } from '@/hooks/useCardView';
import type { Project, Task, Objective, TodoList, EntityType } from '@/types';
import { cn } from '@/lib/utils';

interface CardListProps {
  type: EntityType;
  items: Array<Project | Task | Objective | TodoList>;
  onItemClick?: (item: Project | Task | Objective | TodoList) => void;
  className?: string;
}

export function CardList({
  type,
  items,
  onItemClick,
  className
}: CardListProps) {
  const {
    view,
    variant,
    items: sortedItems,
    handleViewChange,
    handleVariantChange,
    handleSortDirectionToggle
  } = useCardList({
    type,
    items,
    onItemClick
  });

  const { getLayoutClasses } = useCardView();

  const getCardComponent = (item: Project | Task | Objective | TodoList) => {
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

  if (!sortedItems?.length) {
    return (
      <div className="p-4 text-center text-zinc-500 bg-zinc-900/50 border border-zinc-800 rounded-lg">
        No items to display
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <CardViewControls
          view={view}
          onViewChange={handleViewChange}
          onVariantChange={handleVariantChange}
          onSortToggle={handleSortDirectionToggle}
        />
      </div>

      <div className={cn(getLayoutClasses(), className)}>
        {sortedItems.map((item) => (
          <React.Fragment key={item.id}>
            {getCardComponent(item)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}