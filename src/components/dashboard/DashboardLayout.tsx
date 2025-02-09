import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Timeline } from '@/components/ui/timeline';
import { useTimeline } from '@/hooks/useTimeline';
import type { Project, Objective, Task, TodoList } from '@/types';
import { 
  LayoutGrid,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface DashboardLayoutProps {
  projects: Project[];
  objectives: Objective[];
  tasks: Task[];
  todoLists: TodoList[];
  taskStats: {
    todo: number;
    inProgress: number;
    done: number;
  };
  onRefresh: () => Promise<void>;
}

// Stats Card Component - Keeping it inline as in your code
const StatsCard = ({ label, value, icon, color }: { 
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex items-center gap-4">
    <div className={`p-2 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="text-2xl font-semibold text-white">{value}</p>
    </div>
  </div>
);

// Project Card Component - Keeping it inline as in your code
const ProjectCard = ({ project }: { project: Project }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:bg-zinc-800/80 transition-colors">
    <h3 className="font-semibold text-lg text-white">{project.name}</h3>
    {project.description && (
      <p className="text-sm text-zinc-300 mt-1">{project.description}</p>
    )}
    <div className="mt-4 flex gap-4">
      <div>
        <p className="text-xs text-zinc-400">Status</p>
        <p className="text-sm text-white">{project.status}</p>
      </div>
      <div>
        <p className="text-xs text-zinc-400">Tasks</p>
        <p className="text-sm text-white">
          {project.tasks?.length || 0}
        </p>
      </div>
    </div>
  </div>
);

// Task List Component - Keeping it inline as in your code
const TaskList = ({ tasks }: { tasks: Task[] }) => (
  <div className="space-y-2">
    {tasks.map(task => (
      <div 
        key={task.id}
        className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 hover:bg-zinc-800/80 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            task.priority === 'high' ? 'bg-red-400' :
            task.priority === 'medium' ? 'bg-amber-400' :
            'bg-emerald-400'
          }`} />
          <p className="text-white">{task.content}</p>
        </div>
        {task.description && (
          <p className="text-sm text-zinc-300 mt-1 ml-4">{task.description}</p>
        )}
      </div>
    ))}
  </div>
);

export function DashboardLayout({
  projects,
  objectives,
  tasks,
  todoLists,
  taskStats,
  onRefresh
}: DashboardLayoutProps) {
  const router = useRouter();
  
  // Get timeline events using the hook
  const { events } = useTimeline({ projects, objectives, tasks });
  const recentEvents = events
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const stats = useMemo(() => [
    {
      label: 'Total Tasks',
      value: tasks.length,
      icon: <LayoutGrid className="h-5 w-5 text-emerald-400" />,
      color: 'bg-emerald-400/10'
    },
    {
      label: 'Completed',
      value: taskStats.done,
      icon: <CheckCircle2 className="h-5 w-5 text-blue-400" />,
      color: 'bg-blue-400/10'
    },
    {
      label: 'In Progress',
      value: taskStats.inProgress,
      icon: <Clock className="h-5 w-5 text-amber-400" />,
      color: 'bg-amber-400/10'
    },
    {
      label: 'High Priority',
      value: tasks.filter(t => t.priority === 'high').length,
      icon: <AlertCircle className="h-5 w-5 text-red-400" />,
      color: 'bg-red-400/10'
    }
  ], [tasks, taskStats]);

  const recentTasks = tasks
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const handleTimelineEventClick = (event) => {
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

  return (
    <div className="space-y-6 p-6 bg-black min-h-screen">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects Section */}
        <Card className="lg:col-span-2 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.slice(0, 3).map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </CardContent>
        </Card>

        {/* Recent Tasks Section */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskList tasks={recentTasks} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Todo Lists Section */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Todo Lists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {todoLists.map(list => (
                <div 
                  key={list.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:bg-zinc-800/80 transition-colors"
                >
                  <h3 className="font-semibold text-white">{list.name}</h3>
                  <p className="text-sm text-zinc-300 mt-1">
                    {list.tasks?.length || 0} tasks
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline Section */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Timeline 
              events={recentEvents} 
              onEventClick={handleTimelineEventClick}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardLayout;