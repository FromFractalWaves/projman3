// src/app/api/todo_tasks/[todoListId]/[taskId]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// DELETE a task from a todo list
export async function DELETE(request: Request, { params }: { params: { todoListId: string; taskId: string } }) {
  try {
    await prisma.todoList.update({
      where: { id: params.todoListId },
      data: {
        tasks: {
          disconnect: { id: params.taskId },
        },
      },
    });
    return NextResponse.json({ message: 'Task removed from Todo List successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error removing task from todo list:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// POST associate a task with a todo list
export async function POST(request: NextRequest, { params }: { params: { todoListId: string; taskId: string } }) {
  try {
    const { todoListId, taskId } = params;

    await prisma.todoList.update({
      where: { id: todoListId },
      data: {
        tasks: {
          connect: { id: taskId },
        },
      },
    });

    return NextResponse.json({ message: 'Task added to Todo List successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error adding task to todo list:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
