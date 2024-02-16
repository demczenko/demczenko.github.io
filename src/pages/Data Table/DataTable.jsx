import { PageContainer } from "..";
import { useParams } from "react-router-dom";
import { useProject } from "@/hooks/projects/useProject";
import { SkeletonCard } from "@/components/SkeletonCard";
import DataTableContentCart from "./DataTableContentCart";
import RenderList from "@/components/RenderList";
import ErrorPage from "@/ErrorPage";

const DataTable = () => {
  const { id } = useParams();
  const {
    data: project,
    isError: IsProjectsError,
    isLoading: IsProjectsLoading,
  } = useProject(id);

  if (IsProjectsLoading) {
    return <SkeletonCard />;
  }

  if (IsProjectsError) {
    return (
      <ErrorPage title={`Something went wrong while projects loading...`} />
    );
  }

  return (
    <PageContainer title={`Data table for ${project.project_name} project`}>
      <RenderList
        service={"data_tables"}
        query={`?project_id=${project.id}`}
        component={DataTableContentCart}
      />
    </PageContainer>
  );
};

export default DataTable;
