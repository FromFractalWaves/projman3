// BaseCard.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';
import { CardActions } from './CardActions';
import { cn } from '@/lib/utils';
import type { BaseCardProps } from '@/types/cards/cardProps';
import type { CardActionsForEntity } from '@/types/cards/cardActions';

export function BaseCard<T extends BaseCardProps>({
  type,
  title,
  description,
  status,
  priority,
  startDate,
  dueDate,
  estimatedHours,
  actions,
  variant = 'default',
  className,
  children,
  onClick,
  ...props
}: T) {
  return (
    <Card
      className={cn(
        "bg-zinc-900 border-zinc-800 hover:bg-zinc-800/50 transition-colors",
        variant === 'compact' && "p-3",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <CardHeader
        title={title}
        status={status}
        priority={priority}
        variant={variant}
      />
      
      <CardContent variant={variant}>
        {description && (
          <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
            {description}
          </p>
        )}
        {children}
      </CardContent>

      {(startDate || dueDate || estimatedHours) && (
        <CardFooter
          startDate={startDate}
          dueDate={dueDate}
          estimatedHours={estimatedHours}
          variant={variant}
        />
      )}

      {actions && Object.keys(actions).length > 0 && (
        <CardActions
          actions={actions as CardActionsForEntity<any>}
          variant={variant}
        />
      )}
    </Card>
  );
}