import { v4 as uuidv4 } from "uuid";
import { useQueryClient } from "react-query";
import { useToast } from "./ui/use-toast";
import React, { useState } from "react";
import RenderList from "./RenderList";
import { CreateForm } from "./CreateForm";
import ColumnCart from "@/pages/Table/ColumnCart";
import { useColumnCreate } from "@/hooks/columns/useColumnCreate";
import { PlusCircle } from "lucide-react";
import { useColumns } from "@/hooks/columns/useColumns";

const RenderColumnList = ({ query, table_id, ...props }) => {
  const { toast } = useToast();
  const client = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    mutate,
    isLoading: isColumnUpdateLoading,
    isError: isColumnUpdateError,
  } = useColumnCreate();

  const { data: isSlugExists, isLoading: isSlugExistsLoading } = useColumns(
    `?table_id=${table_id}&type=slug`
  );

  // component_id
  // TODO: add edit column (after column edit need to be done:
  //  change column name for every imported slug
  //  remind user to change variable in template or try to change it by yourself)
  const handleCreateColumn = async (column) => {
    const new_column = {
      id: uuidv4(),
      table_id: table_id,
      header: column.header.toLowerCase(),
      type: "text",
    };
    if (isSlugExists === null) {
      // create SLUG column
      createColumn({
        id: uuidv4(),
        table_id: table_id,
        header: "Slug",
        type: "slug",
      });
      createColumn(new_column);
    } else {
      createColumn(new_column);
    }
  };

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
        client.invalidateQueries(query ? "columns-" + query : "columns");
        client.invalidateQueries(`columns-?table_id=${table_id}&type=slug`);
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

  return (
    <>
      <RenderList
        {...props}
        component={ColumnCart}
        title={"Columns"}
        service={"columns"}
        query={query}
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
    </>
  );
};

export default RenderColumnList;
