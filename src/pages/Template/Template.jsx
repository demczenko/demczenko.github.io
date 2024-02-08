import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Heading } from "@/components";
import { PageContainer } from "..";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTemplates } from "@/hooks/useTemplates";
import { useTables } from "@/hooks/useTables";
import { useColumns } from "@/hooks/useColumns";
import TemplatePreview from "./TemplatePreview";
import { v4 as uuidv4 } from "uuid";
import { AddTable } from "./AddTable";
import { useProjects } from "@/hooks/useProjects";
import RenderList from "@/components/RenderList";
import ProjectCart from "../Projects/ProjectCart";
import TableCart from "../Tables/TableCart";

const Template = () => {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const { id } = useParams();
  const {
    data: templates,
    isError,
    isLoading,
    update: updateTemplate,
    set: setTemplate,
    remove,
  } = useTemplates();

  if (!templates) return;

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

  const {
    data: projects,
    isError: isErrorProjects,
    isLoading: isLoadingProjects,
  } = useProjects();

  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const template = templates.find((template) => template.id === id);
  const tables = dataTables.filter(
    (table) => table.template_id === template?.id
  );
  const projectsTamplate = projects.filter(
    (project) => project.template_id === template?.id
  );
  const onChangeTemplateSubmit = async ({ template_html }) => {
    if (template_html.length < 10) return;
    const new_template = {
      ...template,
      template_html: template_html,
    };
    const candidate = await update(new_template);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Template successfully updated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to update template",
        description: "Somethnig went wrong",
      });
    }
  };

  const onSubmit = (data) => {
    setIsModalOpen(false);
    setError("");

    const new_table = {
      id: uuidv4(),
      table_name: data.table_name,
      template_id: template.id,
      createdat: Date.now(),
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

  const handleChangeTemplateName = async (template) => {
    if (name.trim().length > 0) {
      const candidate = await updateTemplate({
        ...template,
        template_name: name,
      });
      if (candidate) {
        toast({
          variant: "success",
          title: "Success",
          description: "Template name successfully updated",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to update template",
          description: "Something went wrong",
        });
      }
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <PageContainer isError={isError} isLoading={isLoading}>
      <div className="flex lg:gap-12 gap-4 xl:flex-row flex-col">
        <TemplatePreview
          template_html={template?.template_html}
          onChangeTemplateSubmit={onChangeTemplateSubmit}
        />
        <div className="flex gap-4 flex-col w-full items-start">
          <Heading
            title={
              isOpen ? (
                <input
                  ref={ref}
                  onBlur={() => handleChangeTemplateName(template)}
                  onChange={(ev) => setName(ev.target.value)}
                  value={name}
                  className="text-4xl border-none w-full bg-transparent outline-none focus:border-none p-0"
                />
              ) : (
                <p
                  onClick={() => {
                    setIsOpen(true);
                    setName(template?.template_name);
                  }}
                  className="font-semibold">
                  {template?.template_name}
                </p>
              )
            }
            paragraph={
              template?.createdat && new Date(template.createdat).toDateString()
            }
          />
          <RenderList
            list={projectsTamplate}
            title={"Projects"}
            view={"list"}
            component={ProjectCart}
            isProjectPage={false}
          />
          <RenderList
            list={tables}
            title={"Tables"}
            component={TableCart}
            onDeleteTable={onDeleteTable}
            onDuplicate={onDuplicate}
            isProject={false}
            action={{
              id: 1,
              name: "Add table",
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
    </PageContainer>
  );
};

export default Template;
