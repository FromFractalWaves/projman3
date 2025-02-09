import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import { Project, Objective, Task } from '@/types';
import { useTimeline } from '@/hooks/useTimeline';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface DashboardTimelineProps {
  projects: Project[];
  objectives: Objective[];
  tasks: Task[];
  onEventClick?: (eventType: string, id: string) => void;
}

export const DashboardTimeline = ({ 
  projects, 
  objectives, 
  tasks,
  onEventClick 
}: DashboardTimelineProps) => {
  const { events } = useTimeline({ projects, objectives, tasks });
  
  // Get the 5 most recent events
  const recentEvents = events
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const handleEventClick = (event) => {
    onEventClick?.(event.type, event.entityId);
  };

  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Timeline events={recentEvents} onEventClick={handleEventClick} />
      </CardContent>
    </Card>
  );
};