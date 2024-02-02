import React, { useState } from "react";
import { PageLayout } from "..";
import { ProjectList } from "./ProjectList";
import { DrawerModal } from "@/components/Drawer";
import ProjectFormSelectTemplate from "./ProjectsModal/ProjectFormSelectTemplate";
import { AddProjectDrawer } from "./ProjectsModal/AddProjectDrawer";
import { useProjects } from "@/hooks/useProjects";
import LoadingPage from "@/LoadingPage";
import ErrorPage from "@/ErrorPage";

const Projects = () => {
  const { data, isError, isLoading, update } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = data.filter((project) => project.isArchived !== true);
  
  if (isError) {
    return <ErrorPage />
  }

  return (
    <div className="w-full">
      <PageLayout
        title="Projects"
        actions={[
          {
            id: 1,
            name: "Create Project",
            onClick: () => setIsModalOpen(true),
          },
        ]}
        content={
          <>
            {isLoading ? (
              <LoadingPage title="Loading your projects..." />
            ) : (
              <ProjectList
                onCreate={() => setIsModalOpen(true)}
                projects={projects}
              />
            )}
          </>
        }
      />
      <DrawerModal
        title={"Create project"}
        description={
          "Enter project name, select html template and fulfill tables data."
        }
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        content={
          <AddProjectDrawer
            form={
              <ProjectFormSelectTemplate
                onSubmitForm={() => setIsModalOpen(false)}
              />
            }
          />
        }
      />
    </div>
  );
};

export default Projects;
