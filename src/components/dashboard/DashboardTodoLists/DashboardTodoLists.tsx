import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CardList } from '@/components/cards';
import { ListChecks, PlusCircle, Archive, ListTodo } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DashboardTodoListsProps, TodoListProgressProps, TodoListStats } from '@/types/dashboard/todolists';

function TodoListProgress({ tasks, className }: TodoListProgressProps) {
  const stats = useMemo(() => {
    const completed = tasks.filter(t => t.status === 'done').length;
    const total = tasks.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    return { completed, total, percentage };
  }, [tasks]);
  
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex justify-between text-xs text-zinc-400">
        <span>{stats.completed}/{stats.total} Tasks</span>
        <span>{Math.round(stats.percentage)}%</span>
      </div>
      <Progress 
        value={stats.percentage} 
        max={100}
        className={cn(
          "h-1 bg-zinc-800",
          stats.percentage === 100 && "bg-emerald-500",
          stats.percentage > 0 && stats.percentage < 100 && "bg-blue-500"
        )}
      />
    </div>
  );
}

function TodoListStatsOverview({ todoLists }: { todoLists: DashboardTodoListsProps['todoLists'] }) {
  const stats: TodoListStats = useMemo(() => {
    const activeLists = todoLists.filter(list => list.type === 'daily').length;
    const totalTasks = todoLists.reduce((acc, list) => acc + (list.tasks?.length || 0), 0);
    const completedTasks = todoLists.reduce((acc, list) => 
      acc + (list.tasks?.filter(t => t.status === 'done').length || 0), 0
    );
    const overdueTasks = todoLists.reduce((acc, list) => 
      acc + (list.tasks?.filter(t => 
        t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done'
      ).length || 0), 0
    );

    return {
      totalLists: todoLists.length,
      activeLists,
      totalTasks,
      completedTasks,
      overdueTasks
    };
  }, [todoLists]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-zinc-800/40 border-zinc-700/50 p-4">
        <div className="text-sm text-zinc-400">Total Lists</div>
        <div className="text-2xl font-bold text-zinc-100">{stats.totalLists}</div>
      </Card>
      <Card className="bg-zinc-800/40 border-zinc-700/50 p-4">
        <div className="text-sm text-zinc-400">Active Lists</div>
        <div className="text-2xl font-bold text-zinc-100">{stats.activeLists}</div>
      </Card>
      <Card className="bg-zinc-800/40 border-zinc-700/50 p-4">
        <div className="text-sm text-zinc-400">Task Completion</div>
        <div className="text-2xl font-bold text-zinc-100">
          {Math.round((stats.completedTasks / stats.totalTasks) * 100)}%
        </div>
      </Card>
      <Card className="bg-zinc-800/40 border-zinc-700/50 p-4">
        <div className="text-sm text-zinc-400">Overdue Tasks</div>
        <div className="text-2xl font-bold text-zinc-100">{stats.overdueTasks}</div>
      </Card>
    </div>
  );
}

function TodoListsByType({ 
  todoLists, 
  type,
  onTodoListClick,
  onAddTask
}: { 
  todoLists: DashboardTodoListsProps['todoLists']; 
  type: 'daily' | 'weekly' | 'monthly';
  onTodoListClick?: (todoList: TodoList) => void;
  onAddTask?: (todoList: TodoList) => void;
}) {
  const filteredLists = todoLists.filter(list => list.type === type);
  
  if (filteredLists.length === 0) return null;

  return (
    <Card className="bg-zinc-800/40 border-zinc-700/50">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListTodo className="h-4 w-4 text-zinc-400" />
            <h3 className="text-sm font-medium text-zinc-100">
              {type.charAt(0).toUpperCase() + type.slice(1)} Lists
            </h3>
          </div>
        </div>
        <CardList
          type="todoList"
          items={filteredLists}
          variant="compact"
          onClick={onTodoListClick}
        />
      </div>
    </Card>
  );
}

export function DashboardTodoLists({
  todoLists,
  onTodoListClick,
  onAddTodoList,
  onEditTodoList,
  onDeleteTodoList,
  onAddTask,
  className
}: DashboardTodoListsProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-zinc-400" />
          <h2 className="text-lg font-semibold text-zinc-100">Todo Lists</h2>
        </div>
        <div className="flex items-center gap-2">
          {onAddTodoList && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onAddTodoList}
              className="gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              New List
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <TodoListStatsOverview todoLists={todoLists} />

      {/* Lists by Type */}
      <div className="space-y-4">
        <TodoListsByType 
          todoLists={todoLists} 
          type="daily" 
          onTodoListClick={onTodoListClick}
          onAddTask={onAddTask}
        />
        <TodoListsByType 
          todoLists={todoLists} 
          type="weekly" 
          onTodoListClick={onTodoListClick}
          onAddTask={onAddTask}
        />
        <TodoListsByType 
          todoLists={todoLists} 
          type="monthly" 
          onTodoListClick={onTodoListClick}
          onAddTask={onAddTask}
        />
      </div>
    </div>
  );
}

export default DashboardTodoLists;