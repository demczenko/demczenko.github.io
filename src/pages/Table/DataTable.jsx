import ErrorPage from "@/ErrorPage";
import RenderList from "@/components/RenderList";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useDataTables } from "@/hooks/dataTables/useDataTables";
import React from "react";
import DataTableCart from "./DataTableCart";
import ComponentCart from "../Components/ComponentCart";

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

  console.log(dataTables);
  return (
    <div>
      {/* {isComponentId && (
        <RenderList
          restrictHeigh={true}
          component={ComponentCart}
          title={"Components"}
          service={"components"}
          query={`?id=${component_id}`}
        />
      )}
      {isProjectId && (
        <RenderList
          restrictHeigh={true}
          component={DataTableCart}
          title={"Projects data"}
          service={"projects"}
          query={`?id=${project_id}`}
          view={"list"}
        />
      )} */}
    </div>
  );
};

export default DataTableContent;
