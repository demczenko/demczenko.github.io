import React, { useEffect, useState } from "react";
import { PageLayout } from "..";
import { ProjectService } from "@/api/projects/init";
import { ProjectList } from "./ProjectList";
import { DrawerModal } from "@/components/Drawer";
import ProjectFormSelectTemplate from "./ProjectsModal/ProjectFormSelectTemplate";
import { AddProjectDrawer } from "./ProjectsModal/AddProjectDrawer";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getProjectList() {
      try {
        const response = await ProjectService.getProjects();
        if (response.ok) {
          const data = await response.json();
          const filtered = data.filter(
            (project) => project.isArchived !== true
          );
          setProjects(filtered);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    getProjectList();
  }, []);

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
        content={<ProjectList projects={projects} />}
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
