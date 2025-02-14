'use client';

import React from 'react';
import { DashboardGrid } from '@/components/dashboard/DashboardLayout/DashboardGrid';
import { DashboardHeader } from '@/components/dashboard/DashboardLayout/DashboardHeader';
import { DashboardStats } from '@/components/dashboard/DashboardLayout/DashboardStats';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CardList } from '@/components/cards';
import { useTasks } from '@/hooks/useTasks';
import { useCardViewState } from '@/hooks/useCardViewState';
import { useCardFilterState } from '@/hooks/useCardFilterState';
import { Plus, Filter, LayoutGrid, LayoutList } from 'lucide-react';
import type { Task } from '@/types/task';

export default function HomePage() {
  const {
    tasks,
    tasksLoading,
    tasksError,
    createTask,
    updateTask,
    deleteTask,
    markTaskComplete
  } = useTasks();

  const { view, variant, setView, setVariant, getLayoutClasses } = useCardViewState();
  const { filteredItems, sortDirection, toggleSortDirection } = useCardFilterState(tasks || []);

  // Quick add task form state
  const [newTaskInput, setNewTaskInput] = React.useState('');
  const [priority, setPriority] = React.useState<'low' | 'medium' | 'high'>('medium');

  const handleCreateTask = async () => {
    if (!newTaskInput.trim()) return;

    try {
      await createTask({
        content: newTaskInput,
        description: '',
        status: 'todo',
        priority,
        projectId: 'test-project',
        startDate: new Date().toISOString(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });
      setNewTaskInput('');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleTaskClick = (task: Task) => {
    console.log('Task clicked:', task);
  };

  const stats = {
    totalProjects: 1, // This will be dynamic once projects are implemented
    activeProjects: 1,
    totalTasks: Math.max(tasks?.length || 0, 1),
    completedTasks: tasks?.filter(t => t.status === 'done').length || 0,
    totalObjectives: 1,
    achievedObjectives: 0,
    overdueTasks: tasks?.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done').length || 0,
    projectProgress: 100 // Default to 100% for now until project system is implemented
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="p-6 space-y-6">
        <DashboardHeader
          title="Task Management"
          description="Manage your tasks and track progress"
        />

        <DashboardStats stats={stats} />

        <DashboardGrid gap="lg">
          {/* Quick Add Task */}
          <Card className="bg-zinc-800/40 border-zinc-700/50">
            <div className="p-4 space-y-4">
              <h3 className="text-lg font-semibold text-zinc-100">Quick Add Task</h3>
              <div className="flex gap-4">
                <Input
                  placeholder="Enter task description..."
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateTask();
                    }
                  }}
                />
                <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleCreateTask}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>
          </Card>

          {/* Task List */}
          <Card className="bg-zinc-800/40 border-zinc-700/50">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-100">Tasks</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
                  >
                    {view === 'grid' ? (
                      <><LayoutList className="h-4 w-4 mr-2" /> List View</>
                    ) : (
                      <><LayoutGrid className="h-4 w-4 mr-2" /> Grid View</>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVariant(variant === 'default' ? 'compact' : 'default')}
                  >
                    {variant === 'default' ? 'Compact' : 'Default'} View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSortDirection}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Sort
                  </Button>
                </div>
              </div>

              {tasksError ? (
                <div className="text-red-400 p-4">Error loading tasks: {tasksError.message}</div>
              ) : tasksLoading ? (
                <div className="text-zinc-400 p-4">Loading tasks...</div>
              ) : filteredItems.length === 0 ? (
                <div className="text-zinc-400 p-4">No tasks found</div>
              ) : (
                <div className={getLayoutClasses()}>
                  <CardList
                    type="task"
                    items={filteredItems}
                    variant={variant}
                    onItemClick={handleTaskClick}
                  />
                </div>
              )}
            </div>
          </Card>
        </DashboardGrid>
      </div>
    </div>
  );
}