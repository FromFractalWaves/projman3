// src/components/forms/Form.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Button } from '@/components/ui';
import type { FormConfig, FormField } from '@/types/forms';

interface FormProps {
  config: FormConfig;
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => Promise<void>;
  icon?: React.ReactNode;
}

export function Form({ config, fields, onSubmit, icon }: FormProps) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(values);
      config.onSuccess?.();
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-100">
          {icon}
          {config.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormContext.Provider value={{ values, errors, setFieldValue }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <FormField key={field.name} field={field} />
            ))}
            <div className="flex justify-end gap-3">
              {config.showCancel && (
                <Button variant="outline" onClick={config.onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : config.submitLabel || "Submit"}
              </Button>
            </div>
          </form>
        </FormContext.Provider>
      </CardContent>
    </Card>
  );
}