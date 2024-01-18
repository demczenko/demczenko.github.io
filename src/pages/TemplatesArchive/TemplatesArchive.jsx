import React, { useEffect, useState } from "react";
import { PageLayout } from "..";
import { TemplatesService } from "@/api/templates/init";
import { TemplateList } from "../Templates/TemplateList";

const TemplatesArchive = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    async function getTemplateList() {
      try {
        const response = await TemplatesService.getTemplates();
        if (response.ok) {
          const data = await response.json();
          const filtered = data.filter((table) => table.isArchived !== false);
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
        title="Templates archive"
        content={<TemplateList templates={templates} />}
      />
    </div>
  );
};

export default TemplatesArchive;
