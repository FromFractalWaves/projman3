import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  BarChart2, 
  TrendingUp, 
  TrendingDown,
  Clock,
  Target,
  CheckSquare,
  AlertTriangle
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  progress?: {
    value: number;
    max: number;
  };
  className?: string;
}

function StatCard({
  title,
  value,
  icon,
  trend,
  progress,
  className
}: StatCardProps) {
  return (
    <Card className={cn(
      "bg-zinc-900/50 border-zinc-800/50", 
      className
    )}>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            {icon}
            <span>{title}</span>
          </div>
          <div className="text-2xl font-semibold text-zinc-100">
            {value}
          </div>
        </div>

        {trend && (
          <div className="flex items-center gap-2 text-sm">
            {trend.direction === 'up' ? (
              <>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-emerald-500">{trend.value}%</span>
              </>
            ) : trend.direction === 'down' ? (
              <>
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span className="text-red-500">{trend.value}%</span>
              </>
            ) : null}
            <span className="text-zinc-400">{trend.label}</span>
          </div>
        )}

        {progress && (
          <div className="space-y-2">
            <Progress 
              value={progress.value} 
              max={progress.max}
              className="h-1 bg-zinc-800" 
            />
            <div className="flex justify-between text-xs text-zinc-400">
              <span>{progress.value}/{progress.max}</span>
              <span>{Math.round((progress.value / progress.max) * 100)}%</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

interface DashboardStatsProps {
  stats: {
    totalProjects: number;
    activeProjects: number;
    totalTasks: number;
    completedTasks: number;
    totalObjectives: number;
    achievedObjectives: number;
    overdueTasks: number;
    projectProgress: number;
  };
  className?: string;
}

export function DashboardStats({
  stats,
  className
}: DashboardStatsProps) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-4", className)}>
      <StatCard
        title="Total Projects"
        value={stats.totalProjects}
        icon={<BarChart2 className="h-4 w-4" />}
        progress={{
          value: stats.activeProjects,
          max: stats.totalProjects
        }}
      />
      
      <StatCard
        title="Task Completion"
        value={`${stats.completedTasks}/${stats.totalTasks}`}
        icon={<CheckSquare className="h-4 w-4" />}
        trend={{
          value: Math.round((stats.completedTasks / stats.totalTasks) * 100),
          label: "completion rate",
          direction: "up"
        }}
      />
      
      <StatCard
        title="Objectives Progress"
        value={`${stats.achievedObjectives}/${stats.totalObjectives}`}
        icon={<Target className="h-4 w-4" />}
        progress={{
          value: stats.achievedObjectives,
          max: stats.totalObjectives
        }}
      />
      
      <StatCard
        title="Project Progress"
        value={`${stats.projectProgress}%`}
        icon={<Clock className="h-4 w-4" />}
        trend={{
          value: stats.overdueTasks,
          label: "tasks overdue",
          direction: "down"
        }}
      />
    </div>
  );
}

export default DashboardStats;