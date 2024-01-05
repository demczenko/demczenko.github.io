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
import { SelectTemplate } from "./SelectTemplate";
import { useEffect, useState } from "react";
import { TemplatesService } from "@/api/templates/init";

const ProjectFormSelectTemplate = ({ onSubmitForm }) => {
  const [templates, setTemplates] = useState([]);
  const form = useForm({
    defaultValues: {
      project_name: "",
      template_id: "",
    },
  });

  const validateFormInput = (formData, cb) => {
    const { project_name, template_id } = formData;
    if (project_name.length < 4) {
      form.setError("project_name", {
        type: "required",
        message: "Project name must be at least 4 characters"
      })
      return
    }

    if (template_id.length < 4) {
      form.setError("template_id", {
        type: "required",
        message: "Select template id"
      })
      return
    }

    cb(formData)
  }

  const onSubmit = (data) => {
    const project = {
      project_name: data.project_name,
      id: uuidv4(),
      template_id: data.template_id,
      tables_data: [],
    };

    onSubmitForm();
    console.log(project);
  };

  useEffect(() => {
    async function getTemplateList() {
      try {
        const response = await TemplatesService.getTemplates();
        if (response.ok) {
          const data = await response.json();
          setTemplates(data);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    getTemplateList();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((formData) =>validateFormInput(formData, onSubmit))} className="space-y-8">
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
          name="template_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HTML Template</FormLabel>
              <FormControl>
                <SelectTemplate
                  templates={templates}
                  value={form.getValues("template_id")}
                  onSelect={(id) => form.setValue("template_id", id)}
                />
              </FormControl>
              <FormDescription>
                Select HTML template for new project
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
  );
};

export default ProjectFormSelectTemplate;
