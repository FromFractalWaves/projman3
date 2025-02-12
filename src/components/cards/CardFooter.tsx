
// CardFooter.tsx
import React from 'react';
import { CardFooter as UICardFooter } from '@/components/ui/card';
import { Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CardFooterProps {
  startDate?: string;
  dueDate?: string;
  estimatedHours?: number;
  variant?: 'default' | 'compact';
}

export function CardFooter({
  startDate,
  dueDate,
  estimatedHours,
  variant = 'default'
}: CardFooterProps) {
  return (
    <UICardFooter className={cn(
      "flex flex-wrap gap-4 text-sm text-zinc-400",
      variant === 'compact' ? 'p-2' : 'px-6 py-4'
    )}>
      {(startDate || dueDate) && (
        <div className="flex flex-wrap gap-4">
          {startDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Start: {new Date(startDate).toLocaleDateString()}</span>
            </div>
          )}
          {dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Due: {new Date(dueDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      )}
      {estimatedHours && (
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>Est: {estimatedHours}h</span>
        </div>
      )}
    </UICardFooter>
  );
}