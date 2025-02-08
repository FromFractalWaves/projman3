// src/types/objective/objective.ts

import { BaseEntity } from '../base';
import { Project } from '../project/project';
import { Task } from '../task/task';
import { Status } from '../base';

export interface Objective extends BaseEntity {
  name: string;
  description?: string;
  startDate?: Date;
  dueDate?: Date;
  status: Status;
  estimatedHours?: number;
  projectId: string;
  project?: Project;
  tasks?: Task[];
}
