// src/app/timeline/page.tsx
'use client';

import React from 'react';
import { Timeline } from '@/components/ui/timeline/Timeline';
import { useProjects } from '@/hooks/useProjects';
import { useObjectives } from '@/hooks/useObjectives';
import { useTasks } from '@/hooks/useTasks';
import { useTimeline } from '@/hooks/useTimeline';
import { useRouter } from 'next/navigation';
import { TimelineEvent } from '@/types/timeline';

export default function TimelinePage() {
  const router = useRouter();
  const { projects, loading: projectsLoading } = useProjects();
  const { objectives, loading: objectivesLoading } = useObjectives();
  const { tasks, loading: tasksLoading } = useTasks();

  const { events } = useTimeline({ projects, objectives, tasks });

  const handleEventClick = (event: TimelineEvent) => {
    // Navigate to the respective page based on event type
    switch (event.type) {
      case 'project':
        router.push(`/projects/${event.entityId}`);
        break;
      case 'objective':
        router.push(`/objectives/${event.entityId}`);
        break;
      case 'task':
        router.push(`/tasks/${event.entityId}`);
        break;
    }
  };

  if (projectsLoading || objectivesLoading || tasksLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-900">
        <div className="text-xl text-neutral-100">Loading timeline...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 p-8">
      <Timeline events={events} onEventClick={handleEventClick} />
    </div>
  );
}