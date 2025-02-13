
// CardHeader.tsx
import React from 'react';
import { CardHeader as UICardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Status, Priority } from '@/types/base';

interface CardHeaderProps {
  title: string;
  status?: Status;
  priority?: Priority;
  variant?: 'default' | 'compact';
}

export function CardHeader({
  title,
  status,
  priority,
  variant = 'default'
}: CardHeaderProps) {
  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'completed':
      case 'done':
        return 'bg-emerald-500/10 text-emerald-400';
      case 'in-progress':
      case 'active':
        return 'bg-blue-500/10 text-blue-400';
      default:
        return 'bg-zinc-500/10 text-zinc-400';
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-400';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-400';
      case 'low':
        return 'bg-blue-500/10 text-blue-400';
      default:
        return 'bg-zinc-500/10 text-zinc-400';
    }
  };

  return (
    <UICardHeader className={cn(
      "flex flex-row items-start justify-between space-y-0",
      variant === 'compact' && "p-2"
    )}>
      <CardTitle className={cn(
        "text-base font-medium text-zinc-100",
        variant === 'compact' && "text-sm"
      )}>
        {title}
      </CardTitle>
      <div className="flex items-center gap-2">
        {status && (
          <Badge
            variant="secondary"
            className={cn("capitalize", getStatusColor(status))}
          >
            {status}
          </Badge>
        )}
        {priority && (
          <Badge
            variant="secondary"
            className={cn("capitalize", getPriorityColor(priority))}
          >
            {priority}
          </Badge>
        )}
      </div>
    </UICardHeader>
  );
}

// CardContent.tsx
import React from 'react';
import { CardContent as UICardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CardContentProps {
  children: React.ReactNode;
  variant?: 'default' | 'compact';
  className?: string;
}

export function CardContent({
  children,
  variant = 'default',
  className
}: CardContentProps) {
  return (
    <UICardContent className={cn(
      variant === 'compact' ? 'p-2' : 'px-6 py-4',
      className
    )}>
      {children}
    </UICardContent>
  );
}
