// src/components/ui/timeline/Timeline.tsx
import { TimelineProps } from '@/types/timeline';
import { TimelineItem } from './TimelineItem';

export const Timeline: React.FC<TimelineProps> = ({ events = [] }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="relative">
        <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200" />
        {events.map((event) => (
          <TimelineItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};