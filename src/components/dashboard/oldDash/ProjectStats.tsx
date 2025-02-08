// src/components/dashboard/DashboardLayout/ProjectStats.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

interface ProjectStatsProps {
  projectCount: number;
  objectiveCount: number;
  taskCount: number;
  completedTasks: number;
  inProgressTasks: number;
  highPriorityTasks: number;
  onRefresh: () => void;
}

export function ProjectStats({
  projectCount,
  objectiveCount,
  taskCount,
  completedTasks,
  inProgressTasks,
  highPriorityTasks,
}: ProjectStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-100 rounded-md">
            <h4 className="text-xl font-bold">{projectCount}</h4>
            <p className="text-sm text-gray-600">Total Projects</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md">
            <h4 className="text-xl font-bold">{objectiveCount}</h4>
            <p className="text-sm text-gray-600">Total Objectives</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md">
            <h4 className="text-xl font-bold">{taskCount}</h4>
            <p className="text-sm text-gray-600">Total Tasks</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md">
            <h4 className="text-xl font-bold">{completedTasks}</h4>
            <p className="text-sm text-gray-600">Completed Tasks</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md">
            <h4 className="text-xl font-bold">{inProgressTasks}</h4>
            <p className="text-sm text-gray-600">Tasks In Progress</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md">
            <h4 className="text-xl font-bold">{highPriorityTasks}</h4>
            <p className="text-sm text-gray-600">High Priority Tasks</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
