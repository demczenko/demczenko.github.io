import React, { useEffect, useMemo, useState } from "react";
import { PageLayout } from "..";
import { TemplateList } from "./TemplateList";
import { TemplatesService } from "@/api/templates/init";
import { DrawerModal } from "@/components/Drawer";
import { AddTemplateDrawer } from "./TemplateModal/AddTemplateDrawer";
import TemplateFilter from "./TemplateFilter";

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("isArchived");

  useEffect(() => {
    async function getTemplateList() {
      try {
        const response = await TemplatesService.getTemplates();
        if (response.ok) {
          const data = await response.json();
          setTemplates(data);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    getTemplateList();
  }, []);

  const filteredTemplate = useMemo(() => {
    if (filter === "isArchived") {
      return templates.filter((table) => table.isArchived === true);
    }

    if (filter === "all") {
      return templates;
    }
  }, [filter]);

  return (
    <div className="w-full">
      <PageLayout
        title="Templates"
        filters={<TemplateFilter onSelect={(filter) => setFilter(filter)} />}
        actions={[
          {
            id: 1,
            name: "Create Template",
            onClick: () => setIsModalOpen(true),
          },
        ]}
        content={<TemplateList templates={filteredTemplate} />}
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
