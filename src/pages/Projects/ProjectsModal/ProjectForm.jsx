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
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "@/components/ui/use-toast";

const ProjectForm = ({ onSubmitForm, template_id }) => {
  const { toast } = useToast();
  const { data, isError, isLoading, update, set: setProject } = useProjects();

  const form = useForm({
    defaultValues: {
      project_name: "",
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

    cb(formData);
  };

  const onSubmit = async (data) => {
    const new_project = {
      project_name: data.project_name,
      id: uuidv4(),
      template_id: template_id,
      isArchived: false,
      createdAt: Date.now(),
    };

    const candidate = await setProject(new_project);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Project added successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to create project",
        description: "Somethnig went wrong",
      });
    }
    onSubmitForm();
  };

  return (
    <>
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
          <Button type="submit" size="sm">
            Create
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProjectForm;
