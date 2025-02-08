// src/types/timeline/timeline.ts
export interface TimelineEvent {
    id: string;
    title: string;
    date: string;
    description: string;
    status: 'completed' | 'in-progress' | 'upcoming';
  }
  
  export interface TimelineProps {
    events?: TimelineEvent[];
  }
  
  export interface TimelineItemProps {
    event: TimelineEvent;
  }
  
  export interface TimelineIndicatorProps {
    status: TimelineEvent['status'];
  }
  
  export interface TimelineContentProps {
    event: TimelineEvent;
  }