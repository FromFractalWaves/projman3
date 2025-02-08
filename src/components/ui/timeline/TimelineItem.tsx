
// src/components/ui/timeline/TimelineItem.tsx
import { TimelineIndicator } from './TimelineIndicator';
import { TimelineContent } from './TimelineContent';
import { TimelineItemProps } from '@/types/timeline';

export const TimelineItem: React.FC<TimelineItemProps> = ({ event }) => {
  return (
    <div className="relative flex items-start mb-8">
      <TimelineIndicator status={event.status} />
      <TimelineContent event={event} />
    </div>
  );
};