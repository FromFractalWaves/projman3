// src/types/task/taskForm.ts
import { TaskStatus } from "./task";
import { Priority } from "../base";

export interface TaskFormData {
  content: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  projectId: string;
  objectiveId?: string;
  startDate: string; // ISO string
  dueDate: string;   // ISO string
  estimatedHours?: string; // Handle as string, convert to number
  actualHours?: string;    // Handle as string, convert to number
}
