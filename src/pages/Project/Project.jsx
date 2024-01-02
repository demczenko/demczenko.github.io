import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heading } from "@/components";
import { PageContainer } from "..";
import { ProjectService } from "@/api/projects/init";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProject() {
      try {
        setError("");
        const response = await ProjectService.getProjects();
        if (response.ok) {
          const data = await response.json();
          const project = data.find((project) => project.id === id);
          if (project) {
            setProject(project);
            setLoading(false);
          } else {
            throw new Error("Project not found.");
          }
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    getProject();
  }, []);

  return (
    <PageContainer>
      <Heading title={loading ? "Loading" : error ? error : project.project_name} />
    </PageContainer>
  );
};

export default Project;
