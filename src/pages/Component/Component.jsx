import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "..";
import TemplatePreview from "../../components/TemplatePreview";
import { useToast } from "@/components/ui/use-toast";
import RenderList from "@/components/RenderList";
import { PlusCircle } from "lucide-react";
import { AddTable } from "../Template/AddTable";
import TableCart from "../Tables/TableCart";
import { v4 as uuidv4 } from "uuid";
import { DrawerModal } from "@/components/Drawer";
import TableFulfill from "../Projects/ProjectsModal/TableFulfill";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";
import { useComponent } from "@/hooks/components/useComponent";
import { useQueryClient } from "react-query";

const Component = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const client = useQueryClient();
  const [selectedTable, setSelectedTable] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPopulate, setIsModalOpenPopulate] = useState(false);

  const { data: component, error, isError, isLoading } = useComponent(id);

  const {
    mutate: createDataTable,
    isLoading: isDataTableLoading,
    isError: isDataTableError,
  } = useDataTable();

  const onChangeTemplateSubmit = async ({ html }) => {
    if (html.length < 10) return;
    const new_component = {
      id: component.id,
      component_html: html,
    };
    const candidate = await updateComponent(new_component);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Component successfully updated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to update component",
        description: "Something went wrong",
      });
    }
  };

  const onSubmit = async (data) => {
    setIsModalOpen(false);

    const new_table = {
      id: uuidv4(),
      table_name: data.table_name,
      component_id: component.id,
      createdat: Date.now(),
    };

    const candidate = await setTable(new_table);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Table created successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to create table",
        description: "Something went wrong",
      });
    }
  };

  const onDeleteTable = async (table_id) => {
    const isColumns = columns.filter((column) => column.table_id === table_id);
    if (isColumns.length > 0) {
      toast({
        variant: "destructive",
        title: "Failed to delete table",
        description: "Firstly delete all columns",
      });
    } else {
      const candidate = await removeTable(table_id);
      if (candidate) {
        toast({
          variant: "success",
          title: "Success",
          description: "Table successfully deleted",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to delete table",
          description: "Something went wrong",
        });
      }
    }
  };

  const onDuplicate = async (table_id) => {
    const duplicateTable = tables.find((table) => table.id == table_id);
    const new_template_id = uuidv4();
    const new_table = {
      ...duplicateTable,
      id: new_template_id,
      table_name: duplicateTable.table_name + " Copy",
    };

    // Get columns for selected id
    const new_columns = columns.filter(
      (column) => column.table_id === table_id
    );
    // Change columns id
    const change_columns_id = new_columns.map((col) => ({
      ...col,
      id: uuidv4(),
      table_id: new_template_id,
    }));

    const candidate = await setTable(new_table);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Table successfully duplicated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to duplicate table",
        description: "Something went wrong",
      });
    }
    change_columns_id.forEach((column) => setColumn(column));
  };

  const handleImport = async (data) => {
    const new_data_table = {
      ...data,
      component_id: component.id,
    };
    createDataTable(new_data_table, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to create data table",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        setIsModalOpen(false);
        client.invalidateQueries("components");
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Created",
          description: "Table data has been successfully created",
        });
      },
    });
  };

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (isError) {
    return (
      <ErrorPage title={`Something went wrong while component loading...`} />
    );
  }

  return (
    <PageContainer title={"Component " + component.component_name}>
      <div className="flex lg:gap-12 gap-4 xl:flex-row flex-col">
        <TemplatePreview
          isLoading={isLoading}
          html={component?.component_html}
          onChangeTemplateSubmit={onChangeTemplateSubmit}
        />
        <div className="flex gap-4 flex-col w-full items-start">
          <RenderList
            service={"tables"}
            query={`?component_id=${component.id}`}
            title={"Tables"}
            component={TableCart}
            onTableSelect={(table) => {
              setSelectedTable(table);
              setIsModalOpenPopulate(true);
            }}
            onDeleteTable={onDeleteTable}
            onDuplicate={onDuplicate}
            isProject={false}
            action={{
              id: 1,
              name: "Create table",
              icon: <PlusCircle className="h-4 w-4 mr-2" />,
              onClick: () => setIsModalOpen(true),
            }}
          />
        </div>
      </div>
      <AddTable
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onSubmit={onSubmit}
      />
      <DrawerModal
        title={`Populate ${selectedTable.table_name} table`}
        description={"Import CSV file or fulfill data manually"}
        open={isModalOpenPopulate}
        onOpenChange={() => {
          setIsModalOpenPopulate(false);
        }}
        content={
          <TableFulfill
            isLoading={isDataTableLoading}
            onSubmit={handleImport}
            setIsModalOpen={setIsModalOpenPopulate}
            table_id={selectedTable.id}
          />
        }
      />
    </PageContainer>
  );
};

export default Component;
