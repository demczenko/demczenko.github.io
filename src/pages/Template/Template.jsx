import { TemplatesService } from "@/api/templates/init";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heading } from "@/components";
import { PageContainer } from "..";
import { TableService } from "@/api/tables/init";
import TemplateTables from "./TemplateTables";

const Template = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tables, setTables] = useState([]);

  // Fetch all tables
  // TODO
  useEffect(() => {
    async function getTableList() {
      try {
        const response = await TableService.getTables();
        if (response.ok) {
          const data = await response.json();
          const filteredTable = data.filter(
            (table) => table.template_id === template.id
          );
          setTables(filteredTable);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }
    if (template) {
      getTableList();
    }
  }, [template]);

  useEffect(() => {
    async function getTemplate() {
      try {
        setError("");
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
        setError(error.message);
        setLoading(false);
      }
    }

    getTemplate();
  }, []);

  return (
    <PageContainer>
      <Heading
        title={loading ? "Loading" : error ? error : template.template_name}
      />
      <div className="mt-4">
        <TemplateTables tables={tables}/>
      </div>
    </PageContainer>
  );
};

export default Template;
