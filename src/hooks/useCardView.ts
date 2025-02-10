// src/hooks/useCardView.ts
import { useStore } from '@/store';
import { selectCardState } from '@/store/selectors/cards';
// Import shallow from Zustand to prevent unnecessary re-renders.
import { shallow } from 'zustand/shallow';

export function useCardView() {
  // Using shallow equality here ensures that if the individual properties haven't changed,
  // useStore will return the same object reference.
  const { cardView: view, cardVariant: variant } = useStore(selectCardState, shallow);

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
