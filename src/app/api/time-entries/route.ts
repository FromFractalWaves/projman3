// src/app/api/time_entries/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

// GET all time entries
export async function GET() {
  try {
    const timeEntries = await prisma.timeEntry.findMany({
      include: {
        task: true,
      },
    });
    return NextResponse.json(timeEntries, { status: 200 });
  } catch (error) {
    console.error('Error fetching time entries:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// POST create a new time entry
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { taskId, startTime, endTime, description } = data;

    if (!taskId || !startTime) {
      return NextResponse.json({ message: 'Task ID and Start Time are required' }, { status: 400 });
    }

    const duration = endTime ? (new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60) : undefined; // Duration in minutes

    const newTimeEntry = await prisma.timeEntry.create({
      data: {
        task: { connect: { id: taskId } },
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : undefined,
        duration,
        description,
      },
    });

    return NextResponse.json(newTimeEntry, { status: 201 });
  } catch (error) {
    console.error('Error creating time entry:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
