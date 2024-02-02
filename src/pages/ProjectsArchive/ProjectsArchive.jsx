import React, { useEffect, useState } from "react";
import { PageLayout } from "..";
import { ProjectService } from "@/api/projects/init";
import { ProjectList } from "../Projects/ProjectList";

const ProjectsArchive = () => {
  const [projects, sets] = useState([]);

  useEffect(() => {
    async function getProjectList() {
      try {
        const response = await ProjectService.get();
        if (response.ok) {
          const data = await response.json();
          const filtered = data.filter((project) => project.isArchived === true);
          sets(filtered);
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
