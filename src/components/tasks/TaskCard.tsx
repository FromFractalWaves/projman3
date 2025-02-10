// src/components/tasks/TaskCard.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Task } from '@/types';
import { useTasks } from '@/store/hooks';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  // Get update and complete actions from your store
  const { updateTask, markTaskComplete } = useTasks();

  // Local state for inline editing
  const [isEditing, setIsEditing] = useState(false);
  const [localContent, setLocalContent] = useState(task.content);
  const [localDescription, setLocalDescription] = useState(task.description);

  const handleSave = async () => {
    await updateTask(task.id, { content: localContent, description: localDescription });
    setIsEditing(false);
  };

  const handleComplete = async () => {
    await markTaskComplete(task.id);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>
          {isEditing ? (
            <input
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              className="rounded border p-1"
            />
          ) : (
            task.content
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <textarea
            value={localDescription}
            onChange={(e) => setLocalDescription(e.target.value)}
            className="w-full rounded border p-1"
          />
        ) : (
          <p>{task.description}</p>
        )}
      </CardContent>
      <div className="flex gap-2 p-2">
        {isEditing ? (
          <>
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            {task.status !== 'done' && (
              <Button variant="secondary" onClick={handleComplete}>
                Mark Complete
              </Button>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
