// src/types/task/task.ts

import { BaseEntity, Priority, Status } from '../base';
import { Project } from '../project/project';
import { Objective } from '../objective/objective';
import { TodoList } from '../todo/todoList';
import { TimeEntry } from '../time/timeEntry';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task extends BaseEntity {
  content: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  startDate?: Date;
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  projectId: string;
  project?: Project;
  objectiveId?: string;
  objective?: Objective | null;
  todoLists?: TodoList[];
  timeEntries?: TimeEntry[];
}
