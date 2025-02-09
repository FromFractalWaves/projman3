import React from 'react';
import { useProjects } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { FormDialog } from '@/components/dialogs/base/FormDialog';
import { ProjectFields } from '@/components/dialogs/forms/QuickAddFields';
import { PROJECT_STATUS } from '@/constants';
import { Folder, PlusCircle } from 'lucide-react';

export default function ProjectsPage() {
  const { projects, createProject } = useProjects();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const initialValues = {
    name: '',
    description: '',
    status: PROJECT_STATUS.NOT_STARTED,
    startDate: '',
    dueDate: '',
    estimatedHours: ''
  };

  const handleCreateProject = async (data) => {
    try {
      await createProject(data);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className="p-8 bg-zinc-950 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <FormDialog
          title="Add New Project"
          description="Create a new project to organize your work."
          trigger={
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Project
            </Button>
          }
          submitLabel="Create Project"
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleCreateProject}
          form={{
            initialValues,
            onSubmit: handleCreateProject
          }}
        >
          <div className="space-y-4 py-4">
            {ProjectFields.map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={form.values[field.name]}
                onChange={form.setFieldValue}
                onBlur={form.handleBlur}
                error={form.errors[field.name]}
                touched={form.touched[field.name]}
              />
            ))}
          </div>
        </FormDialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="flex items-center gap-2">
                <Folder className="h-4 w-4 text-zinc-400" />
                <CardTitle className="text-base font-medium text-white">
                  {project.name}
                </CardTitle>
              </div>
              <div className="text-xs font-medium text-zinc-500">
                {project.status}
              </div>
            </CardHeader>
            <CardContent>
              {project.description && (
                <p className="text-sm text-zinc-400 mb-4">{project.description}</p>
              )}
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <p className="text-zinc-500">Tasks</p>
                  <p className="text-white font-medium">{project.tasks?.length || 0}</p>
                </div>
                <div>
                  <p className="text-zinc-500">Objectives</p>
                  <p className="text-white font-medium">{project.objectives?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}