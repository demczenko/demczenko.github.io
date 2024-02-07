import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PageContainer } from "..";
import { ProjectList } from "./ProjectList";
import { useProjects } from "@/hooks/useProjects";
import { PlusCircle } from "lucide-react";
import { CreateForm } from "@/components/CreateForm";
import { SelectTemplate } from "./ProjectsModal/SelectTemplate";
import { useTemplates } from "@/hooks/useTemplates";
import { useToast } from "@/components/ui/use-toast";

const Projects = () => {
  const { toast } = useToast();
  const { data, isError, isLoading, update, set: setProject } = useProjects();
  const { data: templates } = useTemplates();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = data.filter((project) => project.isArchived !== true);

  const handleArchived = async (project) => {
    await update({ ...project, isArchived: project.isArchived ? false : true });
  };

  const handleCreateProject = async (project) => {
    const new_project = {
      ...project,
      id: uuidv4(),
      isArchived: false,
      createdAt: Date.now(),
    };

    const candidate = await setProject(new_project);
    console.log(candidate);
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
        <ProjectList
          isProjectPage={true}
          handleArchived={handleArchived}
          projects={projects}
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
