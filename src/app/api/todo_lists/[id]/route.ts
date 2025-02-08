// src/app/api/todo_lists/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// DELETE a todo list by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.todoList.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Todo List deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting todo list:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT update a todo list by ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const { name, type } = data;

    const updatedTodoList = await prisma.todoList.update({
      where: { id: params.id },
      data: {
        name,
        type,
      },
    });

    return NextResponse.json(updatedTodoList, { status: 200 });
  } catch (error) {
    console.error('Error updating todo list:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
