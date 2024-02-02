import React, { useMemo, useState } from "react";
import { PageLayout } from "..";
import { TemplateList } from "./TemplateList";
import { DrawerModal } from "@/components/Drawer";
import { AddTemplateDrawer } from "./TemplateModal/AddTemplateDrawer";
import TemplateFilter from "./TemplateFilter";
import { useTemplates } from "@/hooks/useTemplates";
import LoadingPage from "@/LoadingPage";

const Templates = () => {
  const { data: templates, isError, isLoading, update } = useTemplates();
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
    return <ErrorPage />
  }

  return (
    <div className="w-full">
      <PageLayout
        title="Templates"
        filters={
          <>
            {templates.length > 0 && (
              <TemplateFilter
                filter={filter}
                onSelect={(filter) => setFilter(filter)}
              />
            )}
          </>
        }
        actions={[
          {
            id: 1,
            name: "Create Template",
            onClick: () => setIsModalOpen(true),
          },
        ]}
        content={
          <>
            {isLoading ? (
              <LoadingPage title="Loading your templates..." />
            ) : (
              <TemplateList
                onCreate={() => setIsModalOpen(true)}
                templates={filteredTemplate}
              />
            )}
          </>
        }
      />
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
