// src/app/api/tasks/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// DELETE a task by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.task.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT update a task by ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const updatedTask = await prisma.task.update({
      where: { id: params.id },
      data: {
        content,
        description,
        status,
        priority,
        project: { connect: { id: projectId } },
        objective: objectiveId ? { connect: { id: objectiveId } } : { disconnect: true },
        startDate: startDate ? new Date(startDate) : undefined,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        estimatedHours: estimatedHours ? parseFloat(estimatedHours) : undefined,
        actualHours: actualHours ? parseFloat(actualHours) : undefined,
      },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
