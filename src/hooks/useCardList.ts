// src/hooks/useCard.ts
import { useCallback } from 'react';
import { useStore } from '@/store';
import { EntityType } from '@/types';
import { selectCardState } from '@/store/selectors/cards';

interface UseCardProps {
  type: EntityType;
  id: string;
}

interface UseCardReturn {
  isSelected: boolean;
  handleSelect: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

export const useCard = ({ type, id }: UseCardProps): UseCardReturn => {
  const cardState = useStore(selectCardState);
  const setSelectedCard = useStore((state) => state.setSelectedCard);

  const isSelected = cardState.selectedCard?.id === id && 
                    cardState.selectedCard?.type === type;

  const handleSelect = useCallback(() => {
    setSelectedCard(type, id);
  }, [type, id, setSelectedCard]);

  const handleEdit = useCallback(() => {
    // Implement edit logic based on entity type
    console.log(`Edit ${type} with id ${id}`);
  }, [type, id]);

  const handleDelete = useCallback(() => {
    // Implement delete logic based on entity type
    console.log(`Delete ${type} with id ${id}`);
  }, [type, id]);

  return {
    isSelected,
    handleSelect,
    handleEdit,
    handleDelete,
  };
};