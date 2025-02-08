// src/constants/status.ts

export const PROJECT_STATUS = {
    NOT_STARTED: 'not-started',
    ACTIVE: 'active',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
    ON_HOLD: 'on-hold',
    CANCELLED: 'cancelled'
  } as const;
  
  export const TASK_STATUS = {
    TODO: 'todo',
    IN_PROGRESS: 'in-progress',
    DONE: 'done',
  } as const;
  
  export const TODOLIST_STATUS = {
    ACTIVE: 'active',
    ARCHIVED: 'archived',
  } as const;
  