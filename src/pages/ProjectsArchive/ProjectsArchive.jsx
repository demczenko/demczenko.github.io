import { useProjects } from "@/hooks/useProjects";
import { PageLayout } from "..";
import { ProjectList } from "../Projects/ProjectList";
import LoadingPage from "@/LoadingPage";
import ErrorPage from "@/ErrorPage";

const ProjectsArchive = () => {
  const { data, isError, isLoading, update } = useProjects();

  const projects = data.filter((project) => project.isArchived === true);

  if (isLoading) {
    return <LoadingPage title="Loading your projects..." />;
  }

  if (isError) {
    return <ErrorPage title="Something went wrong while projects loading..." />;
  }

  const handleArchived = (project) => {
    update({ ...project, isArchived: project.isArchived ? false : true });
  };

  return (
    <PageLayout
      title="Projects archive"
      content={
        <ProjectList handleArchived={handleArchived} projects={projects} />
      }
    />
  );
};

export default ProjectsArchive;
