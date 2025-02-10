// src/hooks/useCardList.ts
import { useStore } from '@/store';
import { selectCardState, selectFilteredAndSortedCards } from '@/store/selectors/cards';
import type { Project, Task, Objective, TodoList, EntityType, Filterable } from '@/types';

interface UseCardListProps<T extends Filterable> {
  type: EntityType;
  items: T[];
  onItemClick?: (item: T) => void;
}

interface UseCardListReturn<T extends Filterable> {
  view: 'grid' | 'list';
  variant: 'default' | 'compact' | 'detailed';
  filteredItems: T[];
  handleViewChange: (view: 'grid' | 'list') => void;
  handleVariantChange: (variant: 'default' | 'compact' | 'detailed') => void;
  handleFilterStatus: (status: string | undefined) => void;
  handleFilterPriority: (priority: string | undefined) => void;
  handleSortChange: (sortBy: 'name' | 'date' | 'status' | 'priority' | undefined) => void;
  handleSortDirectionToggle: () => void;
}

export function useCardList<T extends Filterable>({
  type,
  items,
  onItemClick
}: UseCardListProps<T>): UseCardListReturn<T> {
  const cardState = useStore(selectCardState);
  const setCardView = useStore((state) => state.setCardView);
  const setCardVariant = useStore((state) => state.setCardVariant);
  const setFilterStatus = useStore((state) => state.setFilterStatus);
  const setFilterPriority = useStore((state) => state.setFilterPriority);
  const setSortBy = useStore((state) => state.setSortBy);
  const toggleSortDirection = useStore((state) => state.toggleSortDirection);

  // Filter and sort items
  const filteredItems = selectFilteredAndSortedCards(items, useStore.getState());

  return {
    view: cardState.cardView,
    variant: cardState.cardVariant,
    filteredItems,
    handleViewChange: setCardView,
    handleVariantChange: setCardVariant,
    handleFilterStatus: (status) => setFilterStatus(status || null),
    handleFilterPriority: (priority) => setFilterPriority(priority || null),
    handleSortChange: (sortBy) => setSortBy(sortBy || null),
    handleSortDirectionToggle: toggleSortDirection,
  };
}