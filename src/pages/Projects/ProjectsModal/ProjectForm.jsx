import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const ProjectForm = ({ onSubmitForm, template_id }) => {
  const form = useForm({
    defaultValues: {
      project_name: "",
      tables_data: "",
    },
  });

  const validateForm = (formData, cb) => {
    if (formData.project_name.length < 4) {
      form.setError("project_name", {
        message: "Project name must be at least 4 characters",
        type: "required",
      });
      return;
    }

    if (!formData.tables_data) {
      form.setError("tables_data", {
        message: "Tables data is required.",
        type: "required",
      });
      return;
    }

    cb(formData);
  };

  const onSubmit = (data) => {
    const project = {
      project_name: data.project_name,
      id: uuidv4(),
      template_id: template_id,
      tables_data: [],
    };

    onSubmitForm();
    console.log(project);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => validateForm(data, onSubmit))}
        className="space-y-8">
        <FormField
          control={form.control}
          name="project_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="project name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on project card.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tables_data"
          render={({ field }) => (
            <FormItem>
              <FormLabel>todo tables_data</FormLabel>
              <FormControl></FormControl>
              <FormDescription>description todo tables_data</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm">
          Create
        </Button>
      </form>
    </Form>
  );
};

export default ProjectForm;
