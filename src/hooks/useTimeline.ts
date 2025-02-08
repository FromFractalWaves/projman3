// src/hooks/useTimeline.ts
import { useMemo } from 'react';
import { Project, Objective, Task } from '@/types';
import { TimelineEvent } from '@/types/timeline';

interface UseTimelineOptions {
  projects: Project[];
  objectives: Objective[];
  tasks: Task[];
}

export function useTimeline({ projects, objectives, tasks }: UseTimelineOptions) {
  const events = useMemo(() => {
    const timelineEvents: TimelineEvent[] = [];

    // Add project events
    projects.forEach(project => {
      timelineEvents.push({
        id: `project-${project.id}`,
        title: project.name,
        date: project.startDate?.toISOString() || project.createdAt.toISOString(),
        description: project.description || 'No description provided',
        status: getStatusFromProject(project),
        type: 'project',
        entityId: project.id
      });
    });

    // Add objective events
    objectives.forEach(objective => {
      timelineEvents.push({
        id: `objective-${objective.id}`,
        title: objective.name,
        date: objective.startDate?.toISOString() || objective.createdAt.toISOString(),
        description: objective.description || 'No description provided',
        status: getStatusFromObjective(objective),
        type: 'objective',
        entityId: objective.id
      });
    });

    // Add task events
    tasks.forEach(task => {
      timelineEvents.push({
        id: `task-${task.id}`,
        title: task.content,
        date: task.startDate?.toISOString() || task.createdAt.toISOString(),
        description: task.description || 'No description provided',
        status: getStatusFromTask(task),
        type: 'task',
        entityId: task.id
      });
    });

    return timelineEvents;
  }, [projects, objectives, tasks]);

  return { events };
}

// Helper functions to determine status
function getStatusFromProject(project: Project): TimelineEvent['status'] {
  switch (project.status) {
    case 'completed':
      return 'completed';
    case 'active':
    case 'in-progress':
      return 'in-progress';
    default:
      return 'upcoming';
  }
}

function getStatusFromObjective(objective: Objective): TimelineEvent['status'] {
  switch (objective.status) {
    case 'completed':
      return 'completed';
    case 'active':
    case 'in-progress':
      return 'in-progress';
    default:
      return 'upcoming';
  }
}

function getStatusFromTask(task: Task): TimelineEvent['status'] {
  switch (task.status) {
    case 'done':
      return 'completed';
    case 'in-progress':
      return 'in-progress';
    default:
      return 'upcoming';
  }
}