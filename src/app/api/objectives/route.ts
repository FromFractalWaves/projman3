// src/app/api/objectives/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// GET all objectives
export async function GET() {
  try {
    const objectives = await prisma.objective.findMany({
      include: {
        project: true,
        tasks: true,
      },
    });
    return NextResponse.json(objectives, { status: 200 });
  } catch (error) {
    console.error('Error fetching objectives:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// POST create a new objective
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, description, projectId, startDate, dueDate, status, estimatedHours } = data;

    if (!name || !projectId) {
      return NextResponse.json({ message: 'Name and Project ID are required' }, { status: 400 });
    }

    const newObjective = await prisma.objective.create({
      data: {
        name,
        description,
        project: { connect: { id: projectId } },
        startDate: startDate ? new Date(startDate) : undefined,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        status,
        estimatedHours: estimatedHours ? parseFloat(estimatedHours) : undefined,
      },
    });

    return NextResponse.json(newObjective, { status: 201 });
  } catch (error) {
    console.error('Error creating objective:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
