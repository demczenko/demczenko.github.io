import ErrorPage from "@/ErrorPage";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useDataTables } from "@/hooks/dataTables/useDataTables";
import RenderProjectList from "@/components/RenderProjectList";
import RenderComponentList from "@/components/RenderComponentList";

const DataTableContent = ({ table_id }) => {
  const {
    data: dataTables,
    isError: IsDataTableError,
    isLoading: isDataTableLoading,
  } = useDataTables(`?table_id=${table_id}`);

  if (isDataTableLoading) {
    return <SkeletonCard />;
  }

  if (IsDataTableError) {
    return (
      <ErrorPage title={`Something went wrong while data table loading...`} />
    );
  }

  const projects = Array.from(
    new Set(dataTables?.map((item) => item.project_id).filter(Boolean))
  );

  const components = Array.from(
    new Set(dataTables?.map((item) => item.component_id).filter(Boolean))
  );

  return (
    <div className="space-y-6">
      {projects?.map((id, i) => {
        return (
          <RenderProjectList
            isCreate={false}
            key={i}
            id={id}
            restrictHeigh={true}
            table_id={table_id}
            isDataCart={true}
            title={"Projects data tables"}
            query={`?id=${id}`}
          />
        );
      })}
      {components?.map((id, i) => {
        return (
          <RenderComponentList
          isCreate={false}
            isDataTableCart={true}
            key={i}
            restrictHeigh={true}
            id={id}
            table_id={table_id}
            title={"Components data tables"}
            query={`?id=${id}`}
          />
        );
      })}
    </div>
  );
};

export default DataTableContent;
