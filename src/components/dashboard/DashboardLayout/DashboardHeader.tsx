import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RefreshCw, Bell } from 'lucide-react';

import type { DashboardHeaderProps } from '@/types/dashboard';

export function DashboardHeader({
  title,
  description,
  stats,
  onRefresh,
  className,
  actions
}: DashboardHeaderProps) {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    if (!onRefresh || isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-zinc-100">{title}</h1>
          {description && (
            <p className="text-sm text-zinc-400">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {actions}
          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={cn(
                'gap-2',
                isRefreshing && 'opacity-50'
              )}
            >
              <RefreshCw className={cn(
                'h-4 w-4',
                isRefreshing && 'animate-spin'
              )} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            className="relative"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              3
            </span>
          </Button>
        </div>
      </div>

      {stats && stats.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
            >
              <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-zinc-100">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardHeader;