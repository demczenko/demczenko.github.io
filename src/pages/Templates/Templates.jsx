import React, { useMemo, useState } from "react";
import { TemplateList } from "./TemplateList";
import { DrawerModal } from "@/components/Drawer";
import { AddTemplateDrawer } from "./TemplateModal/AddTemplateDrawer";
import { useTemplates } from "@/hooks/useTemplates";
import LoadingPage from "@/LoadingPage";
import ErrorPage from "@/ErrorPage";
import { PageContainer } from "..";
import { useToast } from "@/components/ui/use-toast";

const Templates = () => {
  const { toast } = useToast();
  const {
    data: templates,
    isError,
    isLoading,
    update,
    remove,
  } = useTemplates();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("isNotArchived");

  const filteredTemplate = useMemo(() => {
    if (filter === "isArchived") {
      return templates.filter((table) => table.isArchived === true);
    }

    if (filter === "isNotArchived") {
      return templates.filter((table) => table.isArchived !== true);
    }

    if (filter === "all") {
      return templates;
    }
  }, [filter, templates]);

  if (isError) {
    return (
      <ErrorPage title="Something went wrong while templates loading..." />
    );
  }

  const handleArchived = (template) => {
    update({
      ...template,
      isArchived: template.isArchived ? false : true,
    });
    toast({
      variant: "success",
      title: "Archived",
      description: "Template successfully archived",
    });
  };

  const handleRename = (template, { template_name }) => {
    update({ ...template, template_name: template_name });
    toast({
      variant: "success",
      title: "Updated",
      description: "Template name successfully updated",
    });
  };

  return (
    <div className="w-full">
      <PageContainer>
        {isLoading ? (
          <LoadingPage title="Loading your templates..." />
        ) : (
          <TemplateList
            title="Templates"
            actions={[
              {
                id: 1,
                name: "Create Template",
                onClick: () => setIsModalOpen(true),
              },
            ]}
            isTemplatePage={true}
            onRename={handleRename}
            onArchive={handleArchived}
            onCreate={() => setIsModalOpen(true)}
            templates={filteredTemplate}
          />
        )}
      </PageContainer>
      <DrawerModal
        title={"Create template"}
        description={"Enter template name, html template and create tables."}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        content={
          <AddTemplateDrawer onSubmitForm={() => setIsModalOpen(false)} />
        }
      />
    </div>
  );
};

export default Templates;
