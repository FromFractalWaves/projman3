// src/types/project/projectForm.ts
import { Status } from '../base';

export interface ProjectFormData {
  name: string;
  description?: string;
  startDate?: string; // ISO string for HTML date input
  dueDate?: string;   // ISO string for HTML date input
  status: Status;
  estimatedHours?: string; // Handle as string in form, convert to number
}
