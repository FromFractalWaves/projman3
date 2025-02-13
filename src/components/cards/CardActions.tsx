
// CardActions.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardActionsForEntity, BaseCardAction } from '@/types/cards/cardActions';

interface CardActionsProps {
  actions: CardActionsForEntity<any>;
  variant?: 'default' | 'compact';
}

export function CardActions({
  actions,
  variant = 'default'
}: CardActionsProps) {
  // Split actions into primary and secondary groups
  const primaryActions = Object.entries(actions).filter(
    ([_, action]) => !action.variant || action.variant === 'primary'
  );
  const secondaryActions = Object.entries(actions).filter(
    ([_, action]) => action.variant === 'secondary' || action.variant === 'destructive'
  );

  const renderAction = ([key, action]: [string, BaseCardAction]) => (
    <Button
      key={key}
      variant={action.variant || 'default'}
      size={variant === 'compact' ? 'sm' : 'default'}
      onClick={action.onClick}
      disabled={action.disabled}
      className={cn("gap-2", action.className)}
    >
      {action.icon}
      {variant !== 'compact' && action.label}
    </Button>
  );

  return (
    <div className={cn(
      "flex items-center justify-between",
      variant === 'compact' ? 'px-2 pb-2' : 'px-6 pb-4'
    )}>
      <div className="flex gap-2">
        {primaryActions.map(renderAction)}
      </div>

      {secondaryActions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size={variant === 'compact' ? 'sm' : 'default'}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-zinc-800 border-zinc-700"
          >
            {secondaryActions.map(([key, action]) => (
              <DropdownMenuItem
                key={key}
                onClick={action.onClick}
                disabled={action.disabled}
                className={cn(
                  "text-zinc-200 focus:text-zinc-200 focus:bg-zinc-700",
                  action.variant === 'destructive' && "text-red-400 focus:text-red-400",
                  action.className
                )}
              >
                {action.icon}
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}