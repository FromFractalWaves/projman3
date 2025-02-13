// src/hooks/useCardViewState.ts
import { useState, useCallback } from 'react';

export type CardView = 'grid' | 'list';
export type CardVariant = 'default' | 'compact' | 'detailed';

interface UseCardViewStateReturn {
  view: CardView;
  variant: CardVariant;
  setView: (view: CardView) => void;
  setVariant: (variant: CardVariant) => void;
  getLayoutClasses: () => string;
}

export function useCardViewState(initialView: CardView = 'grid', initialVariant: CardVariant = 'default'): UseCardViewStateReturn {
  const [view, setView] = useState<CardView>(initialView);
  const [variant, setVariant] = useState<CardVariant>(initialVariant);

  const getLayoutClasses = useCallback(() => {
    switch (view) {
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
      case 'list':
        return 'space-y-3';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
    }
  }, [view]);

  return {
    view,
    variant,
    setView,
    setVariant,
    getLayoutClasses,
  };
}