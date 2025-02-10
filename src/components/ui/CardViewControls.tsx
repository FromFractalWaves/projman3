// src/components/ui/CardViewControls.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Grid, 
  List, 
  LayoutGrid, 
  ArrowUpDown, 
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CardViewControlsProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
  onVariantChange: (variant: 'default' | 'compact' | 'detailed') => void;
  onSortToggle: () => void;
  className?: string;
}

export function CardViewControls({
  view,
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