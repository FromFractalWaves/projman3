// src/components/ui/timeline/TimelineIndicator.tsx
import { Circle } from 'lucide-react';
import { TimelineIndicatorProps } from '@/types/timeline';

export const TimelineIndicator: React.FC<TimelineIndicatorProps> = ({ status }) => {
  const getStatusColor = (status: TimelineIndicatorProps['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'upcoming':
        return 'bg-gray-300';
    }
  };

  return (
    <div className={`absolute left-8 -ml-3 w-6 h-6 rounded-full ${getStatusColor(status)} flex items-center justify-center`}>
      <Circle className="w-4 h-4 text-white" />
    </div>
  );
};
