import ErrorPage from "@/ErrorPage";
import RenderList from "@/components/RenderList";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useDataTables } from "@/hooks/dataTables/useDataTables";
import React from "react";
import DataTableCart from "./DataTableCart";
import { PageContainer } from "..";
import RenderProjectList from "@/components/RenderProjectList";

const DataTableContent = ({ table_id }) => {
  const {
    data: dataTables,
    isError: IsDataTableError,
    isLoading: isDataTableLoading,
  } = useDataTables(`?table_id=${table_id}`);

  if (isDataTableLoading) {
    return (
      <PageContainer>
        <SkeletonCard />
      </PageContainer>
    );
  }

  if (IsDataTableError) {
    return (
      <ErrorPage title={`Something went wrong while data table loading...`} />
    );
  }

  const projects = Array.from(
    new Set(dataTables.map((item) => item.project_id))
  );

  const components = Array.from(
    new Set(dataTables.map((item) => item.component_id))
  );

  return (
    <div className="space-y-6">
      {projects?.map((id, i) => {
        return (
          <RenderProjectList
            key={i}
            id={id}
            restrictHeigh={true}
            table_id={table_id}
            isDataCart={true}
            query={`?id=${id}`}
          />
        );
      })}
      {components?.map((id, i) => {
        return (
          <RenderList
            key={i}
            restrictHeigh={true}
            id={id}
            table_id={table_id}
            component={DataTableCart}
            title={"Components data tables"}
            service={"components"}
            query={`?id=${id}`}
          />
        );
      })}
    </div>
  );
};

export default DataTableContent;
