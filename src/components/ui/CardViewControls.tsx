// src/components/ui/CardViewControls.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Grid, List, LayoutGrid, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardView, CardVariant } from '@/hooks/useCardViewState';

interface CardViewControlsProps {
  view: CardView;
  variant: CardVariant;
  onViewChange: (view: CardView) => void;
  onVariantChange: (variant: CardVariant) => void;
  onSortToggle: () => void;
  className?: string;
}

export function CardViewControls({
  view,
  variant,
  onViewChange,
  onVariantChange,
  onSortToggle,
  className
}: CardViewControlsProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange('grid')}
        className={cn(view === 'grid' ? 'bg-zinc-800' : '')}
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange('list')}
        className={cn(view === 'list' ? 'bg-zinc-800' : '')}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onVariantChange('compact')}
        className={cn(variant === 'compact' ? 'bg-zinc-800' : '')}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onSortToggle}
      >
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    </div>
  );
}