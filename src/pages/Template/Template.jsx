import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Heading } from "@/components";
import { PageContainer } from "..";
import TablesList from "../Tables/TableList";
import { useToast } from "@/components/ui/use-toast";
import { useTemplates } from "@/hooks/useTemplates";
import { useTables } from "@/hooks/useTables";
import { useColumns } from "@/hooks/useColumns";
import LoadingPage from "@/LoadingPage";
import TemplatePreview from "./TemplatePreview";
import { v4 as uuidv4 } from "uuid";
import { AddTable } from "./AddTable";

const Template = () => {
  const { id } = useParams();
  const {
    data: templates,
    isError,
    isLoading,
    update,
    set: setTemplate,
    remove,
  } = useTemplates();

  const {
    data: dataTables,
    isError: IsTablesError,
    isLoading: isTablesLoading,
    update: updateTables,
    set: setTable,
    remove: removeTable,
  } = useTables();

  const {
    data: columns,
    isError: IsColumnsError,
    isLoading: isColumnsLoading,
    update: updateColumn,
    set: setColumn,
    remove: removeColumn,
  } = useColumns();

  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const template = templates.find((template) => template.id === id);
  const tables = dataTables.filter(
    (table) => table.template_id === template?.id
  );
  const onChangeTemplateSubmit = ({ template_html }) => {
    if (template_html.length < 10) return;
    const new_template = {
      ...template,
      template_html: template_html,
    };
    update(new_template);

    toast({
      variant: "success",
      title: "Success",
      description: "Template updated successfully",
    });
  };

  const onSubmit = (data) => {
    setIsModalOpen(false);
    setError("");

    const new_table = {
      id: uuidv4(),
      table_name: data.table_name,
      template_id: template.id,
      createdAt: Date.now(),
    };

    setTable(new_table);
    toast({
      variant: "success",
      title: "Success",
      description: "Table created successfully",
    });
  };

  const onDeleteTable = (table_id) => {
    const isColumns = columns.filter((column) => column.table_id === table_id);
    if (isColumns.length > 0) {
      toast({
        variant: "destructive",
        title: "Failed to delete table",
        description: "Firstly delete all columns",
      });
    } else {
      removeTable(table_id);
      toast({
        variant: "success",
        title: "Success",
        description: "Table successfully deleted",
      });
    }
  };

  const onDuplicate = (table_id) => {
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

    setTable(new_table);
    change_columns_id.forEach((column) => setColumn(column));
  };

  if (isLoading) {
    return <LoadingPage title="Loading your template..." />;
  }

  if (isError) {
    return <ErrorPage title="Something went wrong while template loading..." />;
  }

  return (
    <PageContainer>
      <Heading
        title={isLoading ? "Loading" : error ? error : template?.template_name}
      />
      <div className="grid xl:gap-8 xl:grid-cols-2 grid-cols-1 xl:h-3/4 h-[90%] xl:mt-6 mt-4">
        <TemplatePreview
          template_html={template?.template_html}
          onChangeTemplateSubmit={onChangeTemplateSubmit}
        />
        <div className="pt-4 lg:pt-0 w-full">
          <TablesList
            actions={[
              {
                id: 1,
                name: "Add table",
                onClick: () => setIsModalOpen(true),
              },
            ]}
            onDeleteTable={onDeleteTable}
            onDuplicate={onDuplicate}
            isProject={false}
            tables={tables}
          />
        </div>
      </div>
      <AddTable
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onSubmit={onSubmit}
      />
    </PageContainer>
  );
};

export default Template;
