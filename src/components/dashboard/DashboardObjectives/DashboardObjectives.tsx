import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CardList } from '@/components/cards';
import { Target, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DashboardObjectivesProps, ObjectiveProgressProps } from '@/types/dashboard/objectives';

function ObjectiveProgress({ completed, total, className }: ObjectiveProgressProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex justify-between text-xs text-zinc-400">
        <span>{completed}/{total} Completed</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <Progress 
        value={percentage} 
        max={100}
        className={cn(
          "h-1 bg-zinc-800",
          percentage === 100 && "bg-emerald-500",
          percentage > 0 && percentage < 100 && "bg-blue-500"
        )}
      />
    </div>
  );
}

function ObjectiveStats({ objectives }: { objectives: DashboardObjectivesProps['objectives'] }) {
  const stats = useMemo(() => {
    const total = objectives.length;
    const completed = objectives.filter(o => o.status === 'completed').length;
    const inProgress = objectives.filter(o => o.status === 'in-progress').length;
    const overdue = objectives.filter(o => 
      o.dueDate && new Date(o.dueDate) < new Date() && o.status !== 'completed'
    ).length;

    return {
      totalObjectives: total,
      completedObjectives: completed,
      inProgressObjectives: inProgress,
      overdue,
      completionRate: total > 0 ? (completed / total) * 100 : 0
    };
  }, [objectives]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-zinc-800/40 border-zinc-700/50 p-4">
        <div className="text-sm text-zinc-400">Total Objectives</div>
        <div className="text-2xl font-bold text-zinc-100">{stats.totalObjectives}</div>
      </Card>
      <Card className="bg-zinc-800/40 border-zinc-700/50 p-4">
        <div className="text-sm text-zinc-400">In Progress</div>
        <div className="text-2xl font-bold text-zinc-100">{stats.inProgressObjectives}</div>
      </Card>
      <Card className="bg-zinc-800/40 border-zinc-700/50 p-4">
        <div className="text-sm text-zinc-400">Completion Rate</div>
        <div className="text-2xl font-bold text-zinc-100">
          {Math.round(stats.completionRate)}%
        </div>
      </Card>
      <Card className="bg-zinc-800/40 border-zinc-700/50 p-4">
        <div className="text-sm text-zinc-400">Overdue</div>
        <div className="text-2xl font-bold text-zinc-100">{stats.overdue}</div>
      </Card>
    </div>
  );
}

export function DashboardObjectives({
  objectives,
  projects,
  onObjectiveClick,
  onAddObjective,
  onEditObjective,
  onDeleteObjective,
  className
}: DashboardObjectivesProps) {
  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project?.name || 'Unknown Project';
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-zinc-400" />
          <h2 className="text-lg font-semibold text-zinc-100">Objectives</h2>
        </div>
        {onAddObjective && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAddObjective}
            className="gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Objective
          </Button>
        )}
      </div>

      {/* Stats */}
      <ObjectiveStats objectives={objectives} />

      {/* Main List */}
      <Card className="bg-zinc-800/40 border-zinc-700/50">
        <div className="p-6 space-y-4">
          <div className="text-sm text-zinc-400">All Objectives</div>
          <CardList
            type="objective"
            items={objectives}
            variant="compact"
            onClick={onObjectiveClick}
          />
        </div>
      </Card>
    </div>
  );
}

export default DashboardObjectives;