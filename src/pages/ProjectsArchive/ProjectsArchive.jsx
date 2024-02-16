import { PageContainer } from "..";
import { useProjects } from "@/hooks/projects/useProjects";
import RenderList from "@/components/RenderList";
import ProjectCart from "../Projects/ProjectCart";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";

const ProjectsArchive = () => {
  const { data: projects, isError, isLoading } = useProjects(`?isarchived=1`);

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (isError) {
    return (
      <ErrorPage title={`Something went wrong while projects loading...`} />
    );
  }

  return (
    <PageContainer title={"Arhived projects"}>
      <RenderList list={projects} component={ProjectCart} />
    </PageContainer>
  );
};

export default ProjectsArchive;
