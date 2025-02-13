import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardGridProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  gap?: 'sm' | 'md' | 'lg';
  columns?: 1 | 2 | 3 | 4;
}

export function DashboardGrid({
  children,
  className,
  fullWidth = false,
  gap = 'md',
  columns = 3
}: DashboardGridProps) {
  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-6',
    lg: 'gap-8'
  };

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={cn(
      'grid',
      columnClasses[columns],
      gapClasses[gap],
      fullWidth ? 'w-full' : 'max-w-screen-2xl mx-auto',
      className
    )}>
      {children}
    </div>
  );
}

// Item wrapper component for grid items
interface DashboardGridItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
}

export function DashboardGridItem({
  children,
  className,
  colSpan = 1
}: DashboardGridItemProps) {
  const spanClasses = {
    1: '',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3'
  };

  return (
    <div className={cn(spanClasses[colSpan], className)}>
      {children}
    </div>
  );
}

export default DashboardGrid;