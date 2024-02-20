import { PageContainer } from "..";
import { useParams } from "react-router-dom";
import { useProject } from "@/hooks/projects/useProject";
import { SkeletonCard } from "@/components/SkeletonCard";
import DataTableContentCart from "./DataTableContentCart";
import RenderList from "@/components/RenderList";
import ErrorPage from "@/ErrorPage";
import { useComponent } from "@/hooks/components/useComponent";

const DataTable = () => {
  // table id, id of the project or component
  const { table_id, id } = useParams();
  const {
    data: project,
    isError: IsProjectError,
    isLoading: IsProjectLoading,
  } = useProject(id);

  const {
    data: component,
    isError: IsComponentError,
    isLoading: IsComponentLoading,
  } = useComponent(id);

  if (IsProjectLoading || IsComponentLoading) {
    return <SkeletonCard />;
  }

  if (IsProjectError || IsComponentError) {
    return (
      <ErrorPage
        title={`Something went wrong while project or component loading...`}
      />
    );
  }

  let name = project
    ? project.project_name + " project"
    : component.component_name + " component";

  return (
    <PageContainer title={`Data table for ${name}`}>
      {project && (
        <RenderList
          service={"data_tables"}
          query={`?project_id=${project.id}&table_id=${table_id}`}
          invalidateQuery={`?project_id=${project.id}&table_id=${table_id}`}
          component={DataTableContentCart}
        />
      )}
      {component && (
        <RenderList
          service={"data_tables"}
          query={`?component_id=${component.id}&table_id=${table_id}`}
          invalidateQuery={`?component_id=${component.id}&table_id=${table_id}`}
          component={DataTableContentCart}
        />
      )}
    </PageContainer>
  );
};

export default DataTable;
