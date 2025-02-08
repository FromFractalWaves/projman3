
// src/components/ui/timeline/TimelineContent.tsx
import { TimelineContentProps } from '@/types/timeline';

export const TimelineContent: React.FC<TimelineContentProps> = ({ event }) => {
  return (
    <div className="ml-20">
      <div className="flex items-center">
        <span className="text-sm text-gray-500">{event.date}</span>
        <span className={`ml-4 px-2 py-1 text-xs rounded-full ${
          event.status === 'completed' ? 'bg-green-100 text-green-800' :
          event.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
        </span>
      </div>
      <h3 className="mt-2 text-lg font-semibold">{event.title}</h3>
      <p className="mt-1 text-gray-600">{event.description}</p>
    </div>
  );
};