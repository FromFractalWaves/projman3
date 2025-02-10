// src/hooks/useCardView.ts
import { useStore } from '@/store';
import { selectCardState } from '@/store/selectors/cards';

export function useCardView() {
  const { cardView: view, cardVariant: variant } = useStore(selectCardState);

  const getLayoutClasses = () => {
    switch (view) {
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
      case 'list':
        return 'space-y-3';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
    }
  };

  return { view, variant, getLayoutClasses };
}