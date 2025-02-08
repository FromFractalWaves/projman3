// src/app/api/objectives/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// DELETE an objective by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.objective.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Objective deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting objective:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT update an objective by ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const { name, description, startDate, dueDate, status, estimatedHours } = data;

    const updatedObjective = await prisma.objective.update({
      where: { id: params.id },
      data: {
        name,
        description,
        startDate: startDate ? new Date(startDate) : undefined,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        status,
        estimatedHours: estimatedHours ? parseFloat(estimatedHours) : undefined,
      },
    });

    return NextResponse.json(updatedObjective, { status: 200 });
  } catch (error) {
    console.error('Error updating objective:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
