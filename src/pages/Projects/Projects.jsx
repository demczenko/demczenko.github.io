import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PageContainer } from "..";
import { useProjects } from "@/hooks/projects/useProjects";
import { PlusCircle } from "lucide-react";
import { CreateForm } from "@/components/CreateForm";
import { SelectTemplate } from "./ProjectsModal/SelectTemplate";
import { useToast } from "@/components/ui/use-toast";
import RenderList from "@/components/RenderList";
import ProjectCart from "./ProjectCart";
import { useProjectCreate } from "@/hooks/projects/useProjectCreate";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";

const Projects = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: projects, isError, isLoading } = useProjects(`?isarchived=0`);
  const {
    mutate: onProjectCreate,
    isError: projectUpdateIsError,
    isLoading: projectUpdateIsLoading,
  } = useProjectCreate();

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (isError) {
    return (
      <ErrorPage title={`Something went wrong while projects loading...`} />
    );
  }

  const handleCreateProject = async (project) => {
    const new_project = {
      ...project,
      id: uuidv4(),
      isarchived: false,
      createdat: Date.now(),
    };

    onProjectCreate(new_project, {
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
      <PageContainer
        action={{
          id: 1,
          name: "Create Project",
          icon: <PlusCircle className="h-4 w-4 mr-2" />,
          onClick: () => setIsModalOpen(true),
        }}
        title="Projects">
        <RenderList list={projects || []} component={ProjectCart} />
      </PageContainer>
      <CreateForm
        isLoading={isLoading}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        fields={[
          {
            id: 1,
            name: "project_name",
            label: "Project Name",
            placeholder: "project name",
          },
          {
            id: 2,
            name: "template_id",
            label: "Template",
            content: (form) => (
              <SelectTemplate
                onSelect={(template) => form.setValue("template_id", template)}
                value={form.getValues("template_id")}
              />
            ),
          },
        ]}
        onSubmit={(project) => handleCreateProject(project)}
        title={"Create project"}
        description={"Enter project name, select html template."}
      />
    </>
  );
};

export default Projects;
