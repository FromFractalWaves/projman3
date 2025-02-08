// src/app/api/tasks/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// GET all tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: true,
        objective: true,
        todoLists: true,
        timeEntries: true,
      },
    });
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// POST create a new task
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      content,
      description,
      status,
      priority,
      projectId,
      objectiveId,
      startDate,
      dueDate,
      estimatedHours,
      actualHours,
    } = data;

    if (!content || !projectId) {
      return NextResponse.json({ message: 'Content and Project ID are required' }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: {
        content,
        description,
        status,
        priority,
        project: { connect: { id: projectId } },
        objective: objectiveId ? { connect: { id: objectiveId } } : undefined,
        startDate: startDate ? new Date(startDate) : undefined,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        estimatedHours: estimatedHours ? parseFloat(estimatedHours) : undefined,
        actualHours: actualHours ? parseFloat(actualHours) : undefined,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
