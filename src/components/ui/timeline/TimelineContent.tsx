// src/components/ui/timeline/TimelineContent.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import type { TimelineEvent } from '@/types/timeline';

interface TimelineContentProps {
  event: TimelineEvent;
}

export const TimelineContent = ({ event }: TimelineContentProps) => {
  return (
    <div className="flex-1 pb-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-white">{event.title}</h3>
        <span className="text-sm text-neutral-400">
          {new Date(event.date).toLocaleDateString()}
        </span>
      </div>
      <p className="text-neutral-400">{event.description}</p>
      <div className="mt-2">
        <span className={cn(
          "inline-block px-2 py-1 text-xs rounded-full",
          event.type === 'project' && "bg-purple-500/20 text-purple-400",
          event.type === 'objective' && "bg-blue-500/20 text-blue-400",
          event.type === 'task' && "bg-green-500/20 text-green-400"
        )}>
          {event.type}
        </span>
      </div>
    </div>
  );
};
