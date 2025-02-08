// src/app/api/todo_lists/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// GET all todo lists
export async function GET() {
  try {
    const todoLists = await prisma.todoList.findMany({
      include: {
        tasks: true,
      },
    });
    return NextResponse.json(todoLists, { status: 200 });
  } catch (error) {
    console.error('Error fetching todo lists:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// POST create a new todo list
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, type } = data;

    if (!name) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }

    const newTodoList = await prisma.todoList.create({
      data: {
        name,
        type: type || 'daily',
      },
    });

    return NextResponse.json(newTodoList, { status: 201 });
  } catch (error) {
    console.error('Error creating todo list:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
