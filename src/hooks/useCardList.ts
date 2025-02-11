
// src/hooks/useCardList.ts
import { useStore } from '@/store';
import { useMemo } from 'react';
import { BaseEntity } from '@/types';
import * as selectors from '@/store/selectors/cards';

interface UseCardListProps<T extends BaseEntity> {
  items: T[];
  onItemClick?: (item: T) => void;
}

export function useCardList<T extends BaseEntity>({
  items,
  onItemClick,
}: UseCardListProps<T>) {
  // Use individual selectors for state values
  const view = useStore(selectors.selectCardView);
  const variant = useStore(selectors.selectCardVariant);
  const filterStatus = useStore(selectors.selectFilterStatus);
  const filterPriority = useStore(selectors.selectFilterPriority);
  const sortBy = useStore(selectors.selectSortBy);
  const sortDirection = useStore(selectors.selectSortDirection);

  // Use individual selectors for actions
  const setView = useStore(selectors.selectSetView);
  const setVariant = useStore(selectors.selectSetVariant);
  const setFilterStatus = useStore(selectors.selectSetFilterStatus);
  const setFilterPriority = useStore(selectors.selectSetFilterPriority);
  const setSortBy = useStore(selectors.selectSetSortBy);
  const toggleSortDirection = useStore(selectors.selectToggleSortDirection);

  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // Apply filters
    if (filterStatus) {
      result = result.filter((item) => (item as any).status === filterStatus);
    }
    if (filterPriority) {
      result = result.filter((item) => (item as any).priority === filterPriority);
    }

    // Apply sorting
    if (sortBy) {
      result.sort((a, b) => {
        let comparison = 0;
        switch (sortBy) {
          case 'name':
            comparison = (a.name || '').localeCompare(b.name || '');
            break;
          case 'date':
            comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            break;
          case 'status':
            comparison = ((a as any).status || '').localeCompare((b as any).status || '');
            break;
          case 'priority':
            comparison = ((a as any).priority || '').localeCompare((b as any).priority || '');
            break;
        }
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [items, filterStatus, filterPriority, sortBy, sortDirection]);

  return {
    // State
    view,
    variant,
    items: filteredAndSortedItems,
    
    // Actions
    handleViewChange: setView,
    handleVariantChange: setVariant,
    handleFilterStatus: setFilterStatus,
    handleFilterPriority: setFilterPriority,
    handleSortChange: setSortBy,
    handleSortDirectionToggle: toggleSortDirection,
  };
}