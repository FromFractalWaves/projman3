
// src/app/todo/page.tsx
'use client';

import React from 'react';
import { useTodoLists } from '@/hooks/useTodoLists';
import { TodoListForm } from '@/components/forms';

export default function TodoPage() {
  const { todoLists, loading } = useTodoLists();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Todo Lists</h1>
      <TodoListForm onSubmit={() => {}} />
      <div className="mt-6 space-y-4">
        {todoLists.map((list) => (
          <div key={list.id} className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold">{list.name}</h3>
            <p className="text-gray-400">Type: {list.type}</p>
            <p className="text-gray-400">Tasks: {list.tasks?.length || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
}