import React from 'react';
import ProjectCard from './ProjectCard';
import type { Project } from '@/types';

interface ProjectListProps {
  projects: Project[];
  layout?: 'grid' | 'list' | 'timeline';
  variant?: 'default' | 'compact';
  onProjectClick?: (project: Project) => void;
}

export default function ProjectList({
  projects,
  layout = 'grid',
  variant = 'default',
  onProjectClick
}: ProjectListProps) {
  const getLayoutClasses = () => {
    switch (layout) {
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
      case 'list':
        return 'space-y-3';
      case 'timeline':
        return 'space-y-4';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
    }
  };

  return (
    <div className={getLayoutClasses()}>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          variant={layout === 'timeline' ? 'timeline' : variant}
          onClick={() => onProjectClick?.(project)}
        />
      ))}
    </div>
  );
}