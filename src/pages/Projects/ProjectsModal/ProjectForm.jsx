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
import TablesToFulFill from "./TablesToFulFill";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectService } from "@/api/projects/init";
import { TabledataService } from "@/api/tables data/init";

const ProjectForm = ({ onSubmitForm, template_id }) => {
  const navigate = useNavigate()
  const [columnsData, setColumnsData] = useState([]);
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

    // if (!formData.tables_data) {
    //   form.setError("tables_data", {
    //     message: "Tables data is required.",
    //     type: "required",
    //   });
    //   return;
    // }

    cb(formData);
  };

  console.log(columnsData);
  const onSubmit = (data) => {
    let project_id = uuidv4()
    const project = {
      project_name: data.project_name,
      id: project_id,
      template_id: template_id,
    };

    ProjectService.setProject(project)
    columnsData.forEach(column => TabledataService.setTabledata({...column, project_id: project_id}))
    
    onSubmitForm();
    navigate("/projects/" + project_id)
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
          <TablesToFulFill
          template_id={template_id}
            columnsData={columnsData}
            setColumnsData={setColumnsData}
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
