
// src/components/cards/CardList.tsx
import React from 'react';
import { TaskCard } from './TaskCard';
import { useCardViewState } from '@/hooks/useCardViewState';
import { useCardFilterState } from '@/hooks/useCardFilterState';
import type { Task } from '@/types/task';
import { cn } from '@/lib/utils';

interface CardListProps {
  type: 'task';
  items: Task[];
  onItemClick?: (item: Task) => void;
  className?: string;
  variant?: 'default' | 'compact';
}

export function CardList({
  type,
  items,
  onItemClick,
  className,
  variant: propVariant
}: CardListProps) {
  const {
    view,
    variant: stateVariant,
    setView,
    setVariant,
    getLayoutClasses,
  } = useCardViewState();

  const variant = propVariant || stateVariant;

  const {
    filteredItems,
    sortDirection,
    toggleSortDirection,
  } = useCardFilterState(items);

  const getCardComponent = (item: Task) => {
    return (
      <TaskCard
        key={item.id}
        task={item}
        variant={variant}
        onClick={() => onItemClick?.(item)}
      />
    );
  };

  if (!filteredItems?.length) {
    return (
      <div className="p-4 text-center text-zinc-500 bg-zinc-900/50 border border-zinc-800 rounded-lg">
        No items to display
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className={getLayoutClasses()}>
        {filteredItems.map((item) => (
          <React.Fragment key={item.id}>
            {getCardComponent(item)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}