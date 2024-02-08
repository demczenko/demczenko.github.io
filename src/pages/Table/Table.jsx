import React, { useEffect, useRef, useState } from "react";
import PageContainer from "../PageContainer";
import { Heading } from "@/components";
import { useParams } from "react-router-dom";
import TableDataList from "./TableDataList";
import { useProjects } from "@/hooks/useProjects";
import { useTables } from "@/hooks/useTables";
import { useColumns } from "@/hooks/useColumns";
import { useDataTables } from "@/hooks/useDataTables";
import { useToast } from "@/components/ui/use-toast";
import { CreateForm } from "@/components/CreateForm";
import { v4 as uuidv4 } from "uuid";
import RenderList from "@/components/RenderList";
import { PlusCircle } from "lucide-react";
import ColumnCart from "./ColumnCart";

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

  const handleRenameColumn = async (column, { header }) => {
    if (header.length < 3) return;
    const new_column = {
      id: column.id,
      header: header,
    };
    const candidate = await updateColumn(new_column);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Column name successfully updated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to update column",
        description: "Something went wrong",
      });
    }
  };

  const handleDeleteColumn = async (id) => {
    const isDataTable = dataTable.filter((data) => data.table_id === table.id);

    if (isDataTable.length > 0) {
      toast({
        variant: "destructive",
        title: "Failed to delete column",
        description: "Firstly delete all data for this table",
      });
    } else {
      const candidate = await removeColumn(id);
      if (candidate) {
        toast({
          variant: "success",
          title: "Success",
          description: "Column successfully deleted",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to delete column",
          description: "Somethnig went wrong",
        });
      }
    }
  };

  const handleCreateColumn = async (column) => {
    const new_column = {
      id: uuidv4(),
      table_id: table.id,
      accessorKey: column.header.toLowerCase(),
      header: column.header.toLowerCase(),
      type: "text",
      createdat: Date.now(),
    };
    const isSlugExist = columns.find((column) => column.type === "slug");
    if (isSlugExist) {
      const candidate = await setColumn(new_column);
      if (candidate) {
        toast({
          variant: "success",
          title: "Success",
          description: "Column successfully created",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to create column",
          description: "Something went wrong",
        });
      }
    } else {
      setColumn({
        id: uuidv4(),
        table_id: table.id,
        accessorKey: "Slug",
        header: "Slug",
        type: "slug",
        createdat: Date.now(),
      });
      const candidate = await setColumn(new_column);
      if (candidate) {
        toast({
          variant: "success",
          title: "Success",
          description: "Column successfully created",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to create column",
          description: "Something went wrong",
        });
      }
    }
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
  return (
    <PageContainer isError={isError} isLoading={isTablesLoading}>
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
        <CreateForm
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

        <RenderList
          component={ColumnCart}
          title={"Columns"}
          action={{
            id: 1,
            name: "Add Column",
            icon: <PlusCircle className="h-4 w-4 mr-2" />,
            onClick: setIsModalOpen,
          }}
          list={columns}
          onDelete={handleDeleteColumn}
          onRename={handleRenameColumn}
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
