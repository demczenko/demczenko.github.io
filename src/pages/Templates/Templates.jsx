import React, { useEffect, useState } from "react";
import { PageLayout } from "..";
import { TemplateList } from "./TemplateList";
import { TemplatesService } from "@/api/templates/init";

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    </div>
  );
};

export default Templates;
