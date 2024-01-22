import React, { useEffect, useState } from "react";
import { PageLayout } from "..";
import { ProjectService } from "@/api/projects/init";
import { ProjectList } from "../Projects/ProjectList";

const ProjectsArchive = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function getProjectList() {
      try {
        const response = await ProjectService.getProjects();
        if (response.ok) {
          const data = await response.json();
          const filtered = data.filter((project) => project.isArchived === true);
          setProjects(filtered);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    getProjectList();
  }, []);
  return (
    <PageLayout
      title="Projects archive"
      content={<ProjectList projects={projects} />}
    />
  );
};

export default ProjectsArchive;
