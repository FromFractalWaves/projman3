// src/components/dialogs/forms/QuickAddFields.tsx
import React from 'react';
import { FormField } from '@/components/forms/fields';
import type { FieldConfig } from '@/types/forms/fields';

export const ProjectFields: FieldConfig[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Project Name',
    required: true,
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Description',
    rows: 3,
  },
  {
    name: 'status',
    type: 'select',
    label: 'Status',
    options: [
      { value: 'not-started', label: 'Not Started' },
      { value: 'active', label: 'Active' },
      { value: 'completed', label: 'Completed' },
    ],
    required: true,
  },
  {
    name: 'startDate',
    type: 'date',
    label: 'Start Date',
  },
  {
    name: 'dueDate',
    type: 'date',
    label: 'Due Date',
  },
  {
    name: 'estimatedHours',
    type: 'number',
    label: 'Estimated Hours',
    min: 0,
    step: 0.5,
  },
];

export const ObjectiveFields = (projects: any[]): FieldConfig[] => [
  {
    name: 'projectId',
    type: 'select',
    label: 'Project',
    options: projects.map(p => ({ value: p.id, label: p.name })),
    required: true,
  },
  {
    name: 'name',
    type: 'text',
    label: 'Objective Name',
    required: true,
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Description',
    rows: 3,
  },
  {
    name: 'status',
    type: 'select',
    label: 'Status',
    options: [
      { value: 'not-started', label: 'Not Started' },
      { value: 'active', label: 'Active' },
      { value: 'completed', label: 'Completed' },
    ],
    required: true,
  },
  {
    name: 'startDate',
    type: 'date',
    label: 'Start Date',
  },
  {
    name: 'dueDate',
    type: 'date',
    label: 'Due Date',
  },
  {
    name: 'estimatedHours',
    type: 'number',
    label: 'Estimated Hours',
    min: 0,
    step: 0.5,
  },
];

export const TaskFields = (projects: any[], objectives: any[]): FieldConfig[] => [
  {
    name: 'content',
    type: 'text',
    label: 'Task Content',
    required: true,
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Description',
    rows: 3,
  },
  {
    name: 'projectId',
    type: 'select',
    label: 'Project',
    options: projects.map(p => ({ value: p.id, label: p.name })),
    required: true,
  },
  {
    name: 'objectiveId',
    type: 'select',
    label: 'Objective',
    options: objectives.map(o => ({ value: o.id, label: o.name })),
  },
  {
    name: 'status',
    type: 'select',
    label: 'Status',
    options: [
      { value: 'todo', label: 'Todo' },
      { value: 'in-progress', label: 'In Progress' },
      { value: 'done', label: 'Done' },
    ],
    required: true,
  },
  {
    name: 'priority',
    type: 'select',
    label: 'Priority',
    options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
    ],
    required: true,
  },
  {
    name: 'startDate',
    type: 'date',
    label: 'Start Date',
  },
  {
    name: 'dueDate',
    type: 'date',
    label: 'Due Date',
  },
  {
    name: 'estimatedHours',
    type: 'number',
    label: 'Estimated Hours',
    min: 0,
    step: 0.5,
  },
  {
    name: 'actualHours',
    type: 'number',
    label: 'Actual Hours',
    min: 0,
    step: 0.5,
  },
];

export const TimeEntryFields = (tasks: any[]): FieldConfig[] => [
  {
    name: 'taskId',
    type: 'select',
    label: 'Task',
    options: tasks.map(t => ({ value: t.id, label: t.content })),
    required: true,
  },
  {
    name: 'startTime',
    type: 'datetime-local',
    label: 'Start Time',
    required: true,
  },
  {
    name: 'endTime',
    type: 'datetime-local',
    label: 'End Time',
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Description',
    rows: 3,
  },
];