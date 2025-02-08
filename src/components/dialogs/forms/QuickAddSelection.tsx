import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FolderPlus, Target, ListTodo, Clock } from 'lucide-react';

const QuickAddButton = ({ 
  label, 
  icon: Icon, 
  onClick 
}: { 
  label: string;
  icon: React.ElementType;
  onClick: () => void;
}) => (
  <Button
    variant="outline"
    className="h-24 flex flex-col items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white"
    onClick={onClick}
  >
    <Icon className="h-6 w-6 text-zinc-300" />
    <span className="text-sm">{label}</span>
  </Button>
);

const QuickAddDialog = ({
  isOpen,
  onClose,
  title,
  children
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="bg-zinc-900 border-zinc-800">
      <DialogHeader>
        <DialogTitle className="text-white">{title}</DialogTitle>
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
);

export function QuickAddSection() {
  const [activeDialog, setActiveDialog] = React.useState<string | null>(null);

  const closeDialog = () => setActiveDialog(null);

  return (
    <div className="p-4 bg-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickAddButton
          label="Add Project"
          icon={FolderPlus}
          onClick={() => setActiveDialog('project')}
        />
        <QuickAddButton
          label="Add Objective"
          icon={Target}
          onClick={() => setActiveDialog('objective')}
        />
        <QuickAddButton
          label="Add Task"
          icon={ListTodo}
          onClick={() => setActiveDialog('task')}
        />
        <QuickAddButton
          label="Add Time Entry"
          icon={Clock}
          onClick={() => setActiveDialog('time')}
        />
      </div>

      {/* Project Dialog */}
      <QuickAddDialog
        isOpen={activeDialog === 'project'}
        onClose={closeDialog}
        title="Add New Project"
      >
        <form className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              Project Name
            </label>
            <Input 
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              placeholder="Enter project name"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              Description
            </label>
            <Textarea 
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              placeholder="Enter project description"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              Status
            </label>
            <Select>
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="not-started" className="text-white">Not Started</SelectItem>
                <SelectItem value="in-progress" className="text-white">In Progress</SelectItem>
                <SelectItem value="completed" className="text-white">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={closeDialog}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Create Project
            </Button>
          </div>
        </form>
      </QuickAddDialog>

      {/* Similar dialogs for Objective, Task, and Time Entry would follow */}
    </div>
  );
}

export default QuickAddSection;