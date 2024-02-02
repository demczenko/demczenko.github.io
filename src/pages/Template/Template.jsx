import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Heading } from "@/components";
import { PageContainer } from "..";
import TablesList from "../Tables/TableList";
import { DrawerModal } from "@/components/Drawer";
import TemplateTables from "../Templates/TemplateModal/TemplateTables";
import { Button } from "@/components/ui/button";
import ChangeTemplate from "../Templates/TemplateModal/ChangeTemplate";
import { useToast } from "@/components/ui/use-toast";
import { useTemplates } from "@/hooks/useTemplates";
import { useTables } from "@/hooks/useTables";
import { useColumns } from "@/hooks/useColumns";

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
  } = useTables();

  const {
    data: columns,
    isError: IsColumnsError,
    isLoading: isColumnsLoading,
    update: updateColumn,
    set: setColumns,
    remove: removeColumn,
  } = useColumns();

  const [error, setError] = useState("");

  const [new_tables, setNewTables] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTempalteModalOpen, setTempalteModalOpen] = useState(false);
  const { toast } = useToast();

  const template = templates.find((template) => template.id === id);
  const tables = dataTables.filter(
    (table) => table.template_id === template.id
  );
  const onChangeTemplateSubmit = (data) => {
    if (data["modify template"].length < 10) return;
    const new_template = {
      ...template,
      template_html: data["modify template"],
    };
    update(new_template);
    setTempalteModalOpen(false);

    toast({
      variant: "success",
      title: "Success",
      description: "Template updated successfully",
    });
  };

  const onSubmit = () => {
    if (new_tables.length < 1) {
      console.log("Please create at least one table unique");
      return;
    }

    setIsModalOpen(false);
    setError("");

    new_tables.forEach((table) => setTable(table));
    columns.forEach((column) => setColumns(column));
  };

  const onDeleteTable = (table_id) => {
    alert("Under development");
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

    setTables(new_table);
    change_columns_id.forEach((column) => setColumn(column));
  };

  if (isError) {
    return (
      <ErrorPage title="Something went wrong while templates loading..." />
    );
  }
  return (
    <PageContainer>
      <Heading
        title={isLoading ? "Loading" : error ? error : template.template_name}
        actions={[
          {
            id: 1,
            name: "Create tables",
            onClick: () => setIsModalOpen(true),
          },
          {
            id: 2,
            name: "Manage template",
            onClick: () => setTempalteModalOpen(true),
          },
        ]}
      />
      <div className="grid xl:gap-8 xl:grid-cols-2 grid-cols-1 xl:h-3/4 h-[90%] xl:mt-6 mt-4">
        <iframe
          className="w-full xl:h-full h-[600px] pointer-events-none rounded-md block"
          srcDoc={template?.template_html}></iframe>
        <div className="pt-4 lg:pt-0 w-full">
          <TablesList
            onDeleteTable={onDeleteTable}
            onDuplicate={onDuplicate}
            setTables={setTables}
            isProject={false}
            tables={tables}
          />
        </div>
      </div>
      <DrawerModal
        title={"Create table"}
        description={"Enter table name and table columns create tables."}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        content={
          <>
            <TemplateTables
              tables={new_tables}
              set={setNewTables}
              setColumns={setColumns}
              columns={columns}
              templateId={template?.id}
            />
            {columns.length >= 2 && (
              <Button onClick={onSubmit} className="w-full">
                Save
              </Button>
            )}
          </>
        }
      />
      <DrawerModal
        title={"Create table"}
        description={"Enter table name and table columns create tables."}
        open={isTempalteModalOpen}
        onOpenChange={setTempalteModalOpen}
        content={
          <ChangeTemplate
            label={"Modify template"}
            onSubmit={onChangeTemplateSubmit}
            placeholder={template?.template_html}
          />
        }
      />
    </PageContainer>
  );
};

export default Template;
