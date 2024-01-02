import React, { useEffect, useState } from "react";
import { PageLayout } from "..";
import { ProjectService } from "@/api/projects/init";
import { ProjectList } from "./ProjectList";
import { DrawerModal } from "@/components/Drawer";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getProjectList() {
      try {
        const response = await ProjectService.getProjects();
        if (response.ok) {
          const data = await response.json();
          setProjects(data)
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    getProjectList()
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
      <DrawerModal title={"Create project"} description={"Enter project name and select html template."} open={isModalOpen} onOpenChange={setIsModalOpen}  />
    </div>
  );
};

export default Projects;
