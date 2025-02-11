// src/components/cards/CardList.tsx
import React from 'react';
import { ProjectCard, TaskCard, ObjectiveCard, TodoListCard } from './BaseCard';
import { CardViewControls } from '@/components/ui/CardViewControls';
import { useCardViewState } from '@/hooks/useCardViewState';
import { useCardFilterState } from '@/hooks/useCardFilterState';
import type { Project, Task, Objective, TodoList, EntityType, BaseEntity } from '@/types';
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
  // Separate view state management
  const {
    view,
    variant,
    setView,
    setVariant,
    getLayoutClasses,
  } = useCardViewState();

  // Separate filtering and sorting state management
  const {
    filteredItems,
    sortDirection,
    toggleSortDirection,
  } = useCardFilterState(items);

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

  if (!filteredItems?.length) {
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
          variant={variant}
          onViewChange={setView}
          onVariantChange={setVariant}
          onSortToggle={toggleSortDirection}
        />
      </div>

      <div className={cn(getLayoutClasses(), className)}>
        {filteredItems.map((item) => (
          <React.Fragment key={item.id}>
            {getCardComponent(item)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}