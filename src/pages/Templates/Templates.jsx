import React, { useEffect, useState } from "react";
import { PageLayout } from "..";
import { TemplateList } from "./TemplateList";
import { TemplatesService } from "@/api/templates/init";
import { DrawerModal } from "@/components/Drawer";
import { AddTemplateDrawer } from "./TemplateModal/AddTemplateDrawer";

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getTemplateList() {
      try {
        const response = await TemplatesService.getTemplates();
        if (response.ok) {
          const data = await response.json();
          const filtered = data.filter(
            (table) => table.isArchived !== true
          );
          setTemplates(filtered);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    getTemplateList();
  }, []);

  return (
    <div className="w-full">
      <PageLayout
        title="Templates"
        actions={[
          {
            id: 1,
            name: "Create Template",
            onClick: () => setIsModalOpen(true),
          },
        ]}
        content={<TemplateList templates={templates} />}
      />
      <DrawerModal
        title={"Create template"}
        description={"Enter template name, html template and create tables."}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        content={<AddTemplateDrawer onSubmitForm={() => setIsModalOpen(false)} />}
      />
    </div>
  );
};

export default Templates;
