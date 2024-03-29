import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Heading } from "@/components";
import { PageContainer } from "..";
import { useToast } from "@/components/ui/use-toast";
import ProjectTemplatePreview from "./ProjectTemplatePreview";
import RenderList from "@/components/RenderList";
import ProjectStyleCart from "./ProjectStyleCart";
import ErrorPage from "@/ErrorPage";
import { useProject } from "@/hooks/projects/useProject";
import NotFound from "@/NotFound";
import { useProjectUpdate } from "@/hooks/projects/useProjectUpdate";
import { useQueryClient } from "react-query";
import RenderTableList from "@/components/RenderTableList";
import LayoutProjectCart from "./LayoutProjectCart";
import ProjectCardLoading from "./ProjectCardLoading";

const Project = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const client = useQueryClient();

  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const {
    data: project,
    isError: IsProjectError,
    isLoading: IsProjectLoading,
  } = useProject(id);

  const {
    mutate: updateProject,
    isLoading: isProjectUpdateLoading,
    isError: isProjectUpdateError,
  } = useProjectUpdate(project?.id);

  if (IsProjectLoading) {
    return <ProjectCardLoading />;
  }

  if (IsProjectError) {
    return (
      <ErrorPage title={`Something went wrong while projects loading...`} />
    );
  }

  if (!project) {
    return (
      <NotFound
        title={"Project you are trying to access not found."}
        action={{ to: "/projects", title: "Go to projects" }}
      />
    );
  }

  const handleChangeProjectName = async () => {
    if (name.trim().length < 3) {
      toast({
        variant: "destructive",
        title: "Failed to update project",
        description: "Project name should have at least 3 symbols",
      });
    }
    updateProject(
      {
        project_name: name,
      },
      {
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed to update project",
            description: "Something went wrong",
          });
        },
        onSettled: () => {
          client.invalidateQueries("projects");
        },
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Success",
            description: "Project name successfully updated",
          });
        },
      }
    );
  };

  return (
    <PageContainer>
      <div className="flex lg:gap-12 gap-4 xl:flex-row flex-col">
        <ProjectTemplatePreview
          project_id={project.id}
          template_id={project.template_id}
        />
        <div className="flex gap-4 flex-col w-full items-start">
          <Heading
            title={
              isOpen ? (
                <input
                  ref={ref}
                  onBlur={() => {
                    if (
                      project.project_name.toLowerCase() === name.toLowerCase()
                    ) {
                      setIsOpen(false);
                      return;
                    }
                    handleChangeProjectName(project);
                  }}
                  onChange={(ev) => setName(ev.target.value)}
                  value={name}
                  className="text-4xl border-none w-full bg-transparent outline-none focus:border-none p-0"
                />
              ) : (
                <p
                  onClick={() => {
                    setIsOpen(true);
                    setName(project.project_name);
                  }}>
                  {project?.project_name}
                </p>
              )
            }
          />
          <RenderList
            title={"Layouts"}
            service={"layouts"}
            component={LayoutProjectCart}
            project_id={project.id}
            query={`?template_id=${project.template_id}`}
          />

          <RenderList
            query={`?project_id=${project.id}`}
            service={"project_styles"}
            title={"Project style"}
            project_id={project.id}
            component={ProjectStyleCart}
          />
          <RenderTableList
            id={project.id}
            table_key_id={"template_id"}
            table_id={project.template_id}
            key_id={"project_id"}
            isFulFill={true}
            query={`?template_id=${project.template_id}`}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default Project;
