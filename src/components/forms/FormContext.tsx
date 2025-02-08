// src/components/forms/FormContext.tsx
import React from 'react';

interface FormContextValue {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setFieldValue: (name: string, value: any) => void;
  setFieldError: (name: string, error: string) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
}

const FormContext = React.createContext<FormContextValue | undefined>(undefined);

// Example usage with ProjectForm
// src/app/page.tsx 

// function Home() {
//   const projectConfig: FormConfig = {
//     title: "Add Project",
//     submitLabel: "Create Project",
//     onSuccess: () => {
//       refreshProjects();
//     }
//   };

//   const projectFields: FormField[] = [
//     {
//       name: "name",
//       label: "Project Name",
//       type: "text",
//       required: true
//     },
//     {
//       name: "description", 
//       label: "Description",
//       type: "textarea"
//     },
//     {
//       name: "status",
//       label: "Status",
//       type: "select",
//       options: [
//         { label: "Not Started", value: "not-started" },
//         { label: "In Progress", value: "in-progress" },
//         { label: "Completed", value: "completed" }
//       ]
//     },
//     {
//       name: "startDate",
//       label: "Start Date", 
//       type: "date"
//     },
//     {
//       name: "dueDate",
//       label: "Due Date",
//       type: "date" 
//     }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//       <Form
//         config={projectConfig}
//         fields={projectFields}
//         onSubmit={handleProjectSubmit}
//         icon={<Folder size={20} />}
//       />

//       <Form
//         config={{
//           title: "Add Task",
//           submitLabel: "Create Task"
//         }}
//         fields={taskFields}
//         onSubmit={handleTaskSubmit}
//         icon={<CheckSquare size={20} />}
//       />

//       {/* Similar pattern for Objective and TimeEntry forms */}
//     </div>
//   );
// }

// src/types/forms.ts
export interface FormConfig {
  title: string;
  submitLabel?: string;
  showCancel?: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'number';
  required?: boolean;
  options?: Array<{label: string, value: string}>;
  placeholder?: string;
  defaultValue?: any;
  validate?: (value: any) => string | undefined;
}