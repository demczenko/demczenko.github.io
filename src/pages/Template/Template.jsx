import { TemplatesService } from "@/api/templates/init";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heading } from "@/components";
import { PageContainer } from "..";

const Template = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTemplate() {
      try {
        const response = await TemplatesService.getTemplates();
        if (response.ok) {
          const data = await response.json();
          const template = data.find((template) => template.id === id);
          if (template) {
            setTemplate(template);
            setLoading(false);
          } else {
            throw new Error("Template not found.");
          }
        }
      } catch (error) {
        console.warn(error.message);
        setLoading(false);
      }
    }

    getTemplate();
  }, []);

  return (
    <PageContainer>
      <Heading title={loading ? "Loading" : template.template_name} />
    </PageContainer>
  );
};

export default Template;
