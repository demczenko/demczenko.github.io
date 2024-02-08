import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PageContainer } from "..";
import { useProjects } from "@/hooks/useProjects";
import { PlusCircle } from "lucide-react";
import { CreateForm } from "@/components/CreateForm";
import { SelectTemplate } from "./ProjectsModal/SelectTemplate";
import { useTemplates } from "@/hooks/useTemplates";
import { useToast } from "@/components/ui/use-toast";
import RenderList from "@/components/RenderList";
import ProjectCart from "./ProjectCart";

const Projects = () => {
  const { toast } = useToast();
  const { data, isError, isLoading, update, set: setProject } = useProjects();
  const { data: templates } = useTemplates();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = data.filter((project) => project.isarchived !== true);

  const handleArchived = async (project) => {
    await update({ ...project, isarchived: project.isarchived ? false : true });
  };

  const handleCreateProject = async (project) => {
    const new_project = {
      ...project,
      id: uuidv4(),
      isarchived: false,
      createdat: Date.now(),
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
  };

  return (
    <div className="w-full">
      <PageContainer
        action={{
          id: 1,
          name: "Create Project",
          icon: <PlusCircle className="h-4 w-4 mr-2" />,
          onClick: () => setIsModalOpen(true),
        }}
        title="Projects"
        isError={isError}
        isLoading={isLoading}>
        <RenderList
          list={projects}
          handleArchived={handleArchived}
          component={ProjectCart}
          isProjectPage={true}
        />
      </PageContainer>
      <CreateForm
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        fields={[
          {
            id: 1,
            name: "project_name",
            title: "Project Name",
            placeholder: "project name",
          },
          {
            id: 2,
            name: "template_id",
            title: "Template",
            content: (form) => (
              <SelectTemplate
                onSelect={(template) => form.setValue("template_id", template)}
                templates={templates}
                value={form.getValues("template_id")}
              />
            ),
          },
        ]}
        onSubmit={(project) => handleCreateProject(project)}
        title={"Create project"}
        description={"Enter project name, select html template."}
      />
    </div>
  );
};

export default Projects;
