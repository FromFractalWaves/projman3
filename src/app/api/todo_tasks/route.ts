// app/api/todo_tasks/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const json = await request.json()
  const task = await prisma.task.update({
    where: { id: json.taskId },
    data: {
      todoLists: {
        connect: { id: json.todoListId },
      },
    },
  })
  return NextResponse.json(task)
}