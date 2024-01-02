import React, { useEffect, useState } from "react";
import { PageLayout } from "..";
import { TemplateList } from "./TemplateList";
import { TemplateController } from "@/api/templates/Controller";
import { TemplateModel } from "@/api/templates/Model";
import { ApiFetch } from "@/api/apiProvider/ApiFetch";

const TemplatesService = new TemplateController(
  new TemplateModel(new ApiFetch())
);

const Templates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    async function getTemplateList() {
      try {
        const response = await TemplatesService.getTemplates();
        if (response.ok) {
          const data = await response.json();
          setTemplates(data)
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    getTemplateList()
  }, []);
  console.log(templates);

  return (
    <div className="w-full">
      <PageLayout
        title="Templates"
        content={<TemplateList templates={templates} />}
      />
    </div>
  );
};

export default Templates;
