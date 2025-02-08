// src/types/project/project.ts

import { BaseEntity } from '../base';
import { Objective } from '../objective/objective';
import { Task } from '../task/task';
import { Status } from '../base';

export interface Project extends BaseEntity {
  name: string;
  description?: string;
  startDate?: Date;
  dueDate?: Date;
  status: Status;
  estimatedHours?: number;
  objectives?: Objective[];
  tasks?: Task[];
}
