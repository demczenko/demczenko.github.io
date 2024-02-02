import React, { useState } from "react";
import PageContainer from "../PageContainer";
import { Heading } from "@/components";
import { useParams } from "react-router-dom";
import ColumnsList from "./ColumnsList";
import TableDataList from "./TableDataList";
import { DrawerModal } from "@/components/Drawer";
import RenameTemplate from "../Templates/TemplateModal/RenameTemplate";
import { useProjects } from "@/hooks/useProjects";
import { useTables } from "@/hooks/useTables";
import { useColumns } from "@/hooks/useColumns";
import { useDataTables } from "@/hooks/useDataTables";

const Table = () => {
  const { data: projects, isError, isLoading, update } = useProjects();
  const {
    data: dataTable,
    isError: IsDataTableError,
    isLoading: IsDataTableLoading,
    update: updateDataTable,
  } = useDataTables();
  const {
    data: dataTbs,
    isError: IsTablesError,
    isLoading: isTablesLoading,
    update: updateTable,
  } = useTables();
  const {
    data: dataCls,
    isError: IsColumnsError,
    isLoading: isColumnsLoading,
    update: updateColumn,
  } = useColumns();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const onSubmit = ({ table_name }) => {
    if (table_name.length < 3) return;
    const new_table = {
      ...table,
      table_name: table_name,
    };

    updateTable(new_table);
    setIsModalOpen(false);
  };

  const project = projects.find(
    (project) => project.template_id === table.template_id
  );
  const table = dataTbs.find((table) => table.id === id);
  const columns = dataCls.filter((col) => col.table_id === id);
  const tablesData = dataTable.filter((table) => {
    if (table.table_id === id && table.project_id === project.id) {
      return true;
    }

    return false;
  });

  const handleRename = (column, { header }) => {
    if (header.length < 3) return;
    const new_columns = {
      ...column,
      accessorKey: header,
      header: header,
    };
    updateColumn(new_columns);
    set((prev) => [...prev, new_columns]);
  };

  // TODO: add edit column (after column edit need to be done:
  //  change column name for every imported slug
  //  remind user to change variable in template or try to change it by yourself)

  if (isError) {
    return <ErrorPage title={"Something went wrong while loading projects"} />;
  }

  if (IsTablesError) {
    return <ErrorPage title={"Something went wrong while loading tables"} />;
  }

  if (IsColumnsError) {
    return <ErrorPage title={"Something went wrong while loading columns"} />;
  }

  if (IsDataTableError) {
    return (
      <ErrorPage title={"Something went wrong while loading data table"} />
    );
  }

  return (
    <PageContainer>
      <Heading
        title={table?.table_name}
        actions={[
          {
            id: 1,
            name: "Manage column",
            onClick: () => setIsModalOpen(true),
          },
        ]}
      />
      <div className="space-y-2 mt-6">
        <ColumnsList onRename={handleRename} columns={columns} />
        <TableDataList
          onDeleteTableData={(id) => removeDataTable(id)}
          tablesData={tablesData}
        />
      </div>
      <DrawerModal
        title={"Manage column"}
        description={"Change column name"}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        content={
          <RenameTemplate
            placeholder={table?.table_name}
            label={"table_name"}
            onSubmit={onSubmit}
          />
        }
      />
    </PageContainer>
  );
};

export default Table;
