import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DrawerModal } from "@/components/Drawer";
import { AddTemplateDrawer } from "./TemplateModal/AddTemplateDrawer";
import { useTemplates } from "@/hooks/useTemplates";
import { PageContainer } from "..";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle } from "lucide-react";
import TemplateCart from "./TemplateCart";
import RenderList from "@/components/RenderList";
import { useColumns } from "@/hooks/useColumns";
import { useTables } from "@/hooks/useTables";

const Templates = () => {
  const { toast } = useToast();
  const {
    data: templates,
    isError,
    isLoading,
    update,
    remove,
    set: setTemplate,
  } = useTemplates();

  const {
    data: columns,
    isError: IsColumnsError,
    isLoading: isColumnsLoading,
    update: updateColumn,
    set: setColumn,
    remove: removeColumn,
  } = useColumns();

  const {
    data: tables,
    isError: IsTablesError,
    isLoading: isTablesLoading,
    update: updateTables,
    set: setTable,
  } = useTables();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTemplate = templates.filter(
    (template) => template.isarchived === false
  );

  const handleArchived = async (template) => {
    const candidate = await update({
      id: template.id,
      isarchived: template.isarchived ? false : true,
    });

    if (candidate) {
      toast({
        variant: "success",
        title: "Archived",
        description: "Template successfully archived",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to archive template",
        description: "Something went wrong",
      });
    }
  };

  const handleDuplicate = async (id) => {
    const template = filteredTemplate.find((template) => template.id === id);
    const template_tables = tables.filter((table) => table.template_id === id);
    let template_columns = [];
    template_tables.forEach((table) => {
      template_columns.push(
        ...columns.filter((col) => col.table_id === table.id)
      );
    });

    const template_id = uuidv4();

    let new_columns = [];
    const new_template = {
      ...template,
      id: template_id,
      template_name: template.template_name + " Copy",
      createdat: Date.now(),
    };
    const new_tables = template_tables.map((table) => {
      const table_id = uuidv4();

      const table_columns = template_columns.filter(
        (col) => col.table_id === table.id
      );
      table_columns.forEach((col) => {
        new_columns.push({
          ...col,
          id: uuidv4(),
          table_id: table_id,
          createdat: Date.now(),
        });
      });

      return {
        ...table,
        id: table_id,
        template_id: template_id,
        createdat: Date.now(),
      };
    });

    const candidate = await setTemplate(new_template);
    if (candidate) {
      toast({
        variant: "success",
        title: "Updated",
        description: "Template successfully duplicated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to duplicate template",
        description: "Something went wrong",
      });
    }

    for (const table of new_tables) {
      await setTable(table);
    }
    for (const column of new_columns) {
      await setColumn(column);
    }
  };

  const handleRename = async (template, { template_name }) => {
    const candidate = await update({
      id: template.id,
      template_name: template_name,
    });
    if (candidate) {
      toast({
        variant: "success",
        title: "Updated",
        description: "Template name successfully updated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to update template",
        description: "Something went wrong",
      });
    }
  };

  return (
    <>
      <PageContainer
        action={{
          id: 1,
          name: "Create Template",
          icon: <PlusCircle className="h-4 w-4 mr-2" />,
          onClick: () => setIsModalOpen(true),
        }}
        isError={isError}
        isLoading={isLoading}
        title="Templates">
        <RenderList
          list={filteredTemplate}
          component={TemplateCart}
          onDuplicate={handleDuplicate}
          isTemplatePage={true}
          onRename={handleRename}
          onArchive={handleArchived}
        />
      </PageContainer>
      <DrawerModal
        title={"Create template"}
        description={"Enter template name, html template and create tables."}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        content={
          <AddTemplateDrawer
            setTemplate={setTemplate}
            onSubmitForm={() => setIsModalOpen(false)}
          />
        }
      />
    </>
  );
};

export default Templates;
