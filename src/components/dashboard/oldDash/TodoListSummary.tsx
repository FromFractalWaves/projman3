// src/components/dashboard/DashboardLayout/TodoListSummary.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import type { TodoList } from '@/types';

interface TodoListSummaryProps {
  todoLists: TodoList[];
}

export function TodoListSummary({ todoLists }: TodoListSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo Lists</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {todoLists.map(list => (
            <div
              key={list.id}
              className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
            >
              <span>{list.name}</span>
              <span className="text-sm text-gray-400">
                {list.tasks?.length || 0} tasks
              </span>
            </div>
          ))}
          {todoLists.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No todo lists available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}