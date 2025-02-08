
// src/components/ui/timeline/TimelineIndicator.tsx
import { Check, Clock, AlertCircle } from 'lucide-react';
import type { TimelineIndicatorProps } from '@/types/timeline';

export const TimelineIndicator = ({ status }: TimelineIndicatorProps) => {
  const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center";
  
  switch (status) {
    case 'completed':
      return (
        <div className={cn(baseClasses, "bg-green-500/20 text-green-500")}>
          <Check className="w-4 h-4" />
        </div>
      );
    case 'in-progress':
      return (
        <div className={cn(baseClasses, "bg-blue-500/20 text-blue-500")}>
          <Clock className="w-4 h-4" />
        </div>
      );
    case 'upcoming':
      return (
        <div className={cn(baseClasses, "bg-neutral-500/20 text-neutral-500")}>
          <AlertCircle className="w-4 h-4" />
        </div>
      );
  }
};