
// src/components/ui/timeline/TimelineItem.tsx
import type { TimelineItemProps } from '@/types/timeline';

export const TimelineItem = ({ event, onClick }: TimelineItemProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <TimelineIndicator status={event.status} />
        <div className="w-0.5 h-full bg-neutral-800" />
      </div>
      <div 
        className="flex-1 cursor-pointer hover:opacity-75 transition-opacity"
        onClick={() => onClick?.(event)}
      >
        <TimelineContent event={event} />
      </div>
    </div>
  );
};