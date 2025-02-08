// src/components/dialogs/forms/QuickAddDialogs.tsx
import React from 'react';
import { QuickAdd } from './QuickAdd';
import { ProjectFields, ObjectiveFields, TaskFields, TimeEntryFields } from './QuickAddFields';
import { Folder, Target, CheckSquare, Clock } from 'lucide-react';
import type { 
  ProjectFormData, 
  ObjectiveFormData, 
  TaskFormData, 
  TimeEntryFormData 
} from '@/types';
import { PROJECT_STATUS, TASK_STATUS } from '@/constants';

interface QuickAddDialogsProps {
  projects: any[];
  objectives: any[];
  tasks: any[];
  onProjectAdd: (data: ProjectFormData) => Promise<void>;
  onObjectiveAdd: (data: ObjectiveFormData) => Promise<void>;
  onTaskAdd: (data: TaskFormData) => Promise<void>;
  onTimeEntryAdd: (data: TimeEntryFormData) => Promise<void>;
}

export function QuickAddDialogs({
  projects,
  objectives,
  tasks,
  onProjectAdd,
  onObjectiveAdd,
  onTaskAdd,
  onTimeEntryAdd
}: QuickAddDialogsProps) {
  const [activeDialog, setActiveDialog] = React.useState<string | null>(null);

  // Initial values for forms
  const initialValues = {
    project: {
      name: '',
      description: '',
      status: PROJECT_STATUS.NOT_STARTED,
      startDate: '',
      dueDate: '',
      estimatedHours: ''
    },
    objective: {
      name: '',
      description: '',
      projectId: '',
      status: PROJECT_STATUS.NOT_STARTED,
      startDate: '',
      dueDate: '',
      estimatedHours: ''
    },
    task: {
      content: '',
      description: '',
      status: TASK_STATUS.TODO,
      priority: 'medium',
      projectId: '',
      objectiveId: '',
      startDate: '',
      dueDate: '',
      estimatedHours: '',
      actualHours: ''
    },
    timeEntry: {
      taskId: '',
      startTime: '',
      endTime: '',
      description: ''
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <QuickAdd
        title="Add New Project"
        description="Create a new project to organize your work."
        icon={<Folder className="h-6 w-6" />}
        label="Add Project"
        fields={ProjectFields}
        initialValues={initialValues.project}
        isOpen={activeDialog === 'project'}
        onOpenChange={(open) => setActiveDialog(open ? 'project' : null)}
        onSubmit={onProjectAdd}
      />

      <QuickAdd
        title="Add New Objective"
        description="Create a new objective for your project."
        icon={<Target className="h-6 w-6" />}
        label="Add Objective"
        fields={ObjectiveFields(projects)}
        initialValues={initialValues.objective}
        isOpen={activeDialog === 'objective'}
        onOpenChange={(open) => setActiveDialog(open ? 'objective' : null)}
        onSubmit={onObjectiveAdd}
      />

      <QuickAdd
        title="Add New Task"
        description="Create a new task for your project or objective."
        icon={<CheckSquare className="h-6 w-6" />}
        label="Add Task"
        fields={TaskFields(projects, objectives)}
        initialValues={initialValues.task}
        isOpen={activeDialog === 'task'}
        onOpenChange={(open) => setActiveDialog(open ? 'task' : null)}
        onSubmit={onTaskAdd}
      />

      <QuickAdd
        title="Add Time Entry"
        description="Track time spent on a task."
        icon={<Clock className="h-6 w-6" />}
        label="Add Time"
        fields={TimeEntryFields(tasks)}
        initialValues={initialValues.timeEntry}
        isOpen={activeDialog === 'time'}
        onOpenChange={(open) => setActiveDialog(open ? 'time' : null)}
        onSubmit={onTimeEntryAdd}
      />
    </div>
  );
}