import React, { useEffect, useRef, useState } from "react";
import PageContainer from "../PageContainer";
import { Heading } from "@/components";
import { useParams } from "react-router-dom";
import { useColumns } from "@/hooks/columns/useColumns";
import { useToast } from "@/components/ui/use-toast";
import { CreateForm } from "@/components/CreateForm";
import { v4 as uuidv4 } from "uuid";
import RenderList from "@/components/RenderList";
import { PlusCircle } from "lucide-react";
import ColumnCart from "./ColumnCart";
import { useTable } from "@/hooks/tables/useTable";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";
import { useColumnCreate } from "@/hooks/columns/useColumnCreate";
import { useQueryClient } from "react-query";
import { useTableUpdate } from "@/hooks/tables/useTableUpdate";
import DataTableContent from "./DataTable";

const Table = () => {
  const { id } = useParams();

  const ref = useRef();
  const { toast } = useToast();
  const client = useQueryClient();
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: table,
    isError: IsTablesError,
    isLoading: isTablesLoading,
  } = useTable(id);

  const { data: isSlugExists, isLoading: isSlugExistsLoading } = useColumns(
    `?table_id=${table?.id}&type=slug`,
    {
      enabled: !!table?.id,
    }
  );

  const {
    mutate,
    isLoading: isColumnUpdateLoading,
    isError: isColumnUpdateError,
  } = useColumnCreate();

  const {
    mutate: updateTable,
    isLoading: isTableUpdateLoading,
    isError: isTableUpdateError,
  } = useTableUpdate(table?.id);

  const createColumn = (new_column) => {
    mutate(new_column, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to create column",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        client.invalidateQueries(`columns-?table_id=${table.id}`);
        setIsModalOpen(false);
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Column successfully created",
        });
      },
    });
  };

  useEffect(() => {
    if (!ref.current) return;

    ref.current.focus();
  }, [isOpen]);

  if (isTablesLoading) {
    return (
      <PageContainer>
        <SkeletonCard />
      </PageContainer>
    );
  }

  if (IsTablesError) {
    return <ErrorPage title={`Something went wrong while tables loading...`} />;
  }

  if (!table) {
    return (
      <NotFound
        title={"Table you are trying to access not found."}
        action={{ to: "/tables", title: "Go to tables" }}
      />
    );
  }
  const handleChangeTableName = async () => {
    if (name.trim().length < 3) {
      toast({
        variant: "destructive",
        title: "Failed to update table",
        description: "Table name should have at least 3 symbols",
      });
    }
    updateTable(
      {
        table_name: name,
      },
      {
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed to update table",
            description: "Something went wrong",
          });
        },
        onSettled: () => {
          setIsOpen(false);
          client.invalidateQueries(`table-${id}`);
        },
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Success",
            description: "Table name successfully updated",
          });
        },
      }
    );
  };

  // component_id
  // TODO: add edit column (after column edit need to be done:
  //  change column name for every imported slug
  //  remind user to change variable in template or try to change it by yourself)
  const handleCreateColumn = async (column) => {
    const new_column = {
      id: uuidv4(),
      table_id: table.id,
      accessorKey: column.header.toLowerCase(),
      header: column.header.toLowerCase(),
      type: "text",
      createdat: Date.now(),
    };
    if (isSlugExists.length > 0) {
      createColumn(new_column);
    } else {
      // create SLUG column
      createColumn({
        id: uuidv4(),
        table_id: table.id,
        accessorKey: "Slug",
        header: "Slug",
        type: "slug",
        createdat: Date.now(),
      });
      createColumn(new_column);
    }
  };

  return (
    <PageContainer>
      <Heading
        title={
          <>
            {isOpen ? (
              <input
                ref={ref}
                onBlur={() => {
                  if (table.table_name.toLowerCase() === name.toLowerCase()) {
                    setIsOpen(false);
                    return;
                  }
                  handleChangeTableName(table);
                }}
                onChange={(ev) => setName(ev.target.value)}
                value={name}
                className="text-2xl border-none bg-transparent outline-none focus:border-none p-0"
              />
            ) : (
              <p
                onClick={() => {
                  setIsOpen(true);
                  setName(table.table_name);
                }}>
                {table?.table_name}
              </p>
            )}
          </>
        }
      />
      <div className="space-y-6 mt-6">
        <RenderList
          restrictHeigh={true}
          component={ColumnCart}
          title={"Columns"}
          service={"columns"}
          query={`?table_id=${table.id}`}
          action={{
            id: 1,
            name: "Create Column",
            icon: <PlusCircle className="h-4 w-4" />,
            onClick: () => {
              if (!isSlugExistsLoading) {
                setIsModalOpen(true);
              }
            },
          }}
        />
        <DataTableContent table_id={table.id} />
      </div>
      <CreateForm
        isLoading={isColumnUpdateLoading}
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
    </PageContainer>
  );
};

export default Table;
