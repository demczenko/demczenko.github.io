import React, { useEffect, useRef, useState } from "react";
import PageContainer from "../PageContainer";
import { Heading } from "@/components";
import { useParams } from "react-router-dom";
import ColumnsList from "./ColumnsList";
import TableDataList from "./TableDataList";
import { useProjects } from "@/hooks/useProjects";
import { useTables } from "@/hooks/useTables";
import { useColumns } from "@/hooks/useColumns";
import { useDataTables } from "@/hooks/useDataTables";
import { useToast } from "@/components/ui/use-toast";
import { AddNewItem } from "@/components/AddNewItem";
import { v4 as uuidv4 } from "uuid";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Table = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isColumnModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");

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
    remove: removeColumn,
    set: setColumn,
  } = useColumns();

  const table = dataTbs.find((table) => table.id === id);
  const project = projects.find(
    (project) => project.template_id === table?.template_id
  );
  const columns = dataCls.filter((col) => col.table_id === id);
  const tablesData = dataTable.filter((table) => {
    if (table.table_id === id && table.project_id === project?.id) {
      return true;
    }

    return false;
  });

  const handleChangeTableName = (table) => {
    if (name.trim().length > 0) {
      updateTable({ ...table, table_name: name });

      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!ref.current) return;

    ref.current.focus();
  }, [isOpen]);

  const handleRenameColumn = (column, { header }) => {
    if (header.length < 3) return;
    const new_column = {
      ...column,
      accessorKey: header,
      header: header,
    };
    updateColumn(new_column);
    toast({
      variant: "success",
      title: "Success",
      description: "Column name successfully updated",
    });
  };

  const handleDeleteColumn = (id) => {
    const isDataTable = dataTable.filter((data) => data.table_id === table.id);

    if (isDataTable.length > 0) {
      toast({
        variant: "destructive",
        title: "Failed to delete column",
        description: "Firstly delete all data for this table",
      });
    } else {
      removeColumn(id);
      toast({
        variant: "success",
        title: "Success",
        description: "Column successfully deleted",
      });
    }
  };

  const handleCreateColumn = (column) => {
    const new_column = {
      id: uuidv4(),
      table_id: table.id,
      accessorKey: column.header.toLowerCase(),
      header: column.header.toLowerCase(),
      type: "text",
      createdAt: Date.now(),
    };
    const isSlugExist = columns.find((column) => column.type === "slug");
    console.log(isSlugExist);
    if (isSlugExist) {
      setColumn(new_column);
    } else {
      setColumn({
        id: uuidv4(),
        table_id: table.id,
        accessorKey: "Slug",
        header: "Slug",
        type: "slug",
        createdAt: Date.now(),
      });
      setColumn(new_column);
    }

    toast({
      variant: "success",
      title: "Success",
      description: "Column successfully created",
    });
  };

  const handleUpdate = (data) => {
    updateDataTable(data);
    toast({
      variant: "success",
      title: "Success",
      description: "Data item successfully updated",
    });
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
        title={
          <>
            {isOpen ? (
              <input
                ref={ref}
                onBlur={() => handleChangeTableName(table)}
                onChange={(ev) => setName(ev.target.value)}
                value={name}
                className="text-2xl border-none bg-transparent outline-none focus:border-none p-0"
              />
            ) : (
              <p
                onClick={() => {
                  setIsOpen(true);
                  setName(table.table_name);
                }}
                className="font-semibold">
                {table?.table_name}
              </p>
            )}
          </>
        }
      />
      <div className="space-y-2 mt-6">
        <AddNewItem
          onSubmit={handleCreateColumn}
          isOpen={isColumnModalOpen}
          setIsOpen={setIsModalOpen}
          title={"Create column"}
          description={"Create new column. Click create when you are ready."}
          fields={[
            {
              id: 1,
              name: "header",
              label: "Column name",
              placeholder: "name",
            },
          ]}
        />
        <ColumnsList
          actions={[
            {
              id: 1,
              name: "Add Column",
              onClick: setIsModalOpen,
            },
          ]}
          onDelete={handleDeleteColumn}
          onRename={handleRenameColumn}
          columns={columns}
        />
        {tablesData.length > 0 && (
          <TableDataList
            onUpdate={handleUpdate}
            onDeleteTableData={(id) => removeDataTable(id)}
            tablesData={tablesData}
          />
        )}
      </div>
    </PageContainer>
  );
};

export default Table;
