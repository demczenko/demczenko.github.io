import React, { useEffect, useRef, useState } from "react";
import PageContainer from "../PageContainer";
import { Heading } from "@/components";
import { useParams } from "react-router-dom";
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
import ProjectCart from "../Projects/ProjectCart";
import DataTableCart from "./DataTableCart";

const Table = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState({});
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

  const [name, setName] = useState("");

  const { data: projectsData, isError, isLoading, update } = useProjects();
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
  const projects = projectsData.filter(
    (project) => project.template_id === table?.template_id
  );
  const columns = dataCls.filter((col) => col.table_id === id);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.focus();
  }, [isOpen]);

  const handleChangeTableName = async (table) => {
    if (name.trim().length > 0) {
      const candidate = await updateTable({ id: table.id, table_name: name });
      if (candidate) {
        toast({
          variant: "success",
          title: "Success",
          description: "Table name successfully updated",
        });
        setSelectedColumn({});
        setIsColumnModalOpen(false);
      } else {
        toast({
          variant: "destructive",
          title: "Failed to update table",
          description: "Something went wrong",
        });
        setIsColumnModalOpen(false);
      }

      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  const handleRenameColumn = async ({ header }) => {
    if (header.length < 3) return;
    const new_column = {
      id: selectedColumn.id,
      header: header,
    };
    const candidate = await updateColumn(new_column);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Column name successfully updated",
      });
      setSelectedColumn({});
      setIsColumnModalOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "Failed to update column",
        description: "Something went wrong",
      });
      setIsColumnModalOpen(false);
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
          description: "Something went wrong",
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

  const handleDuplicate = async (id) => {
    const column = columns.find((column) => column.id === id);
    let name = column.header;
    const number = name.match(/\d+/g);
    let getHeaderCount;
    let new_name;
    if (number) {
      getHeaderCount = Number(number[0].trim());
      name = name.replace(` ${getHeaderCount}`, "");
      getHeaderCount = getHeaderCount + 1;
      new_name = name + " " + getHeaderCount;
    }

    const new_column = {
      ...column,
      header: new_name ?? name + " Copy",
      accessorKey: new_name ?? name + " Copy",
      id: uuidv4(),
      table_id: table.id,
      type: "text",
      createdat: Date.now(),
    };

    const candidate = await setColumn(new_column);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Column successfully duplicated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to duplicated column",
        description: "Something went wrong",
      });
    }
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
      <div className="space-y-6 mt-6">
        <CreateForm
          isLoading={isColumnsLoading}
          onSubmit={handleCreateColumn}
          isOpen={isModalOpen}
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
        <CreateForm
          isLoading={isColumnsLoading}
          isOpen={isColumnModalOpen}
          setIsOpen={setIsColumnModalOpen}
          fields={[
            {
              id: 1,
              name: "header",
              label: "Column name",
              value: selectedColumn['header'],
              placeholder: "name",
            },
          ]}
          onSubmit={handleRenameColumn}
          title={"Manage column"}
          description={"Change column name"}
        />

        <RenderList
          isLoading={isColumnsLoading}
          restrictHeigh={true}
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
          onSelect={(item) => {
            setSelectedColumn(item);
            setIsColumnModalOpen(true);
          }}
          onDuplicate={handleDuplicate}
        />

        <RenderList
          isLoading={isLoading}
          restrictHeigh={true}
          component={DataTableCart}
          title={"Projects data"}
          list={projects}
          view={"list"}
        />
      </div>
    </PageContainer>
  );
};

export default Table;
