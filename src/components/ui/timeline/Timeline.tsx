// src/components/ui/timeline/Timeline.tsx
import type { TimelineProps } from '@/types/timeline';

export const Timeline = ({ events, onEventClick }: TimelineProps) => {
  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="p-6 bg-neutral-900 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Timeline</h2>
      <div className="space-y-2">
        {sortedEvents.map((event) => (
          <TimelineItem 
            key={event.id} 
            event={event} 
            onClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
};