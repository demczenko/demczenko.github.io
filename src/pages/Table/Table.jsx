import React, { useEffect, useRef, useState } from "react";
import PageContainer from "../PageContainer";
import { Heading } from "@/components";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useTable } from "@/hooks/tables/useTable";
import ErrorPage from "@/ErrorPage";
import { useQueryClient } from "react-query";
import { useTableUpdate } from "@/hooks/tables/useTableUpdate";
import DataTableContent from "./DataTable";
import RenderColumnList from "@/components/RenderColumnList";
import TableSkeleton from "./TableSkeleton";

const Table = () => {
  const { id } = useParams();

  const ref = useRef();
  const { toast } = useToast();
  const client = useQueryClient();
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: table,
    isError: IsTablesError,
    isLoading: isTablesLoading,
  } = useTable(id);

  const {
    mutate: updateTable,
    isLoading: isTableUpdateLoading,
    isError: isTableUpdateError,
  } = useTableUpdate(table?.id);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.focus();
  }, [isOpen]);

  if (isTablesLoading) {
    return <TableSkeleton />;
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
        <RenderColumnList
          key_name={
            table.component_id === null ? "template_id" : "component_id"
          }
          key_value={
            table.component_id === null ? table.template_id : table.component_id
          }
          table_id={table.id}
          query={`?table_id=${table.id}`}
          restrictHeigh={true}
        />
        <DataTableContent table_id={table.id} />
      </div>
    </PageContainer>
  );
};

export default Table;
