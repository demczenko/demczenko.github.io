import { useProjectCreate } from "@/hooks/projects/useProjectCreate";
import ProjectCart from "@/pages/Projects/ProjectCart";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { CreateForm } from "./CreateForm";
import RenderList from "./RenderList";
import { v4 as uuidv4 } from "uuid";
import DataTableCart from "@/pages/Table/DataTableCart";
import { useToast } from "./ui/use-toast";

const RenderProjectList = ({
  action,
  isDataCart,
  query,
  view,
  template_id,
  title,
  ...props
}) => {
  const { toast } = useToast();
  const client = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: createProject, isLoading, isError } = useProjectCreate();

  const handleCreateProject = async (data) => {
    const new_project = {
      ...data,
      id: uuidv4(),
      template_id: template_id,
    };

    createProject(new_project, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to create project",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        setIsModalOpen(false);
        client.invalidateQueries("projects");
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Project added successfully",
        });
      },
    });
  };

  return (
    <>
      <RenderList
        action={
          action
            ? action
            : {
                id: 1,
                name: "Create project",
                icon: <PlusCircle className="h-4 w-4" />,
                onClick: () => setIsModalOpen(true),
              }
        }
        title={title ? title : "Projects"}
        {...props}
        view={view}
        query={query}
        service={"projects"}
        component={isDataCart ? DataTableCart : ProjectCart}
      />
      <CreateForm
        isLoading={isLoading}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        fields={[
          {
            id: 1,
            name: "project_name",
            label: "Project Name",
            placeholder: "name",
          },
        ]}
        onSubmit={handleCreateProject}
        title={"Create project"}
        description={"Enter project name."}
      />
    </>
  );
};

export default RenderProjectList;
