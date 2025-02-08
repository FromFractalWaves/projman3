// src/types/objective/objectiveForm.ts
import { Status } from '../base';

export interface ObjectiveFormData {
  name: string;
  description?: string;
  projectId: string;
  startDate?: string; // ISO string
  dueDate?: string;   // ISO string
  estimatedHours?: string; // Handle as string, convert to number
  status: Status; // Added status
}
