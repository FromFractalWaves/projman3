
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
