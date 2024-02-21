import React, { useState } from "react";
import RenderList from "./RenderList";
import { CreateForm } from "./CreateForm";
import TableCart from "@/pages/Tables/TableCart";
import { PlusCircle } from "lucide-react";
import { useTableCreate } from "@/hooks/tables/useTableCreate";
import { TableCartFulFill } from "@/pages/Tables/TableCartFulFill";
import { v4 as uuidv4 } from "uuid";
import { useQueryClient } from "react-query";
import { useToast } from "./ui/use-toast";

const RenderTableList = ({ query, isFulFill, ...props }) => {
  const { toast } = useToast();
  const client = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    mutate: createTable,
    isLoading,
    isError,
  } = useTableCreate();

  const handleCreateTable = async (data) => {
    const new_table = {
      id: uuidv4(),
      [props.table_key_id]: props.table_id,
      table_name: data.table_name,
    };

    createTable(new_table, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to create table",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        setIsModalOpen(false);
        client.invalidateQueries("tables");
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Table created successfully",
        });
      },
    });
  };

  return (
    <>
      <RenderList
        title={"Tables"}
        query={query}
        service={"tables"}
        component={isFulFill ? TableCartFulFill : TableCart}
        {...props}
        action={{
          id: 1,
          name: "Create table",
          icon: <PlusCircle className="h-4 w-4" />,
          onClick: () => setIsModalOpen(true),
        }}
      />
      <CreateForm
        isLoading={isLoading}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onSubmit={handleCreateTable}
        fields={[
          {
            id: 1,
            name: "table_name",
            label: "Table name",
            placeholder: "name",
          },
        ]}
        title={"Create table"}
        description={"Enter table name. Click save when you're done."}
      />
    </>
  );
};

export default RenderTableList;
