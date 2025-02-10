// src/components/dashboard/DashboardTasks.tsx
import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useTasks } from '@/store/hooks';

const DashboardTasks: React.FC = () => {
  const { tasks, loading, error, fetchTasks, markTaskComplete } = useTasks();

  useEffect(() => {
    // Fetch tasks when the component mounts
    fetchTasks();
  }, [fetchTasks]);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error loading tasks: {error.message}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{task.content}</h3>
                  <p className="text-sm text-gray-400">{task.description}</p>
                </div>
                {task.status !== 'done' && (
                  <button
                    className="px-2 py-1 bg-green-600 text-white rounded"
                    onClick={() => markTaskComplete(task.id)}
                  >
                    Complete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DashboardTasks;
