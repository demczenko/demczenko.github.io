import { TemplatesService } from "@/api/templates/init";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heading } from "@/components";
import { PageContainer } from "..";
import { TableService } from "@/api/tables/init";
import TablesList from "./TablesList";
import { DrawerModal } from "@/components/Drawer";
import TemplateTables from "../Templates/TemplateModal/TemplateTables";
import { Button } from "@/components/ui/button";
import { ColumnService } from "@/api/columns/init";

const Template = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tables, setTables] = useState([]);
  const [columns, setColumns] = useState([]);
  const [new_tables, setNewTables] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const onSubmit = () => {
    if (new_tables.length < 1) {
      console.log("Please create at least one table unique");
      return;
    }

    setIsModalOpen(false);
    setError("");

    new_tables.forEach((table) => TableService.setTables(table));
    columns.forEach((column) => ColumnService.setColumns(column));
    navigator(`/table/${new_tables[0].id}`);
  };
  return (
    <PageContainer>
      <Heading
        title={loading ? "Loading" : error ? error : template.template_name}
        actions={[
          {
            id: 1,
            name: "Create Tables",
            onClick: () => setIsModalOpen(true),
          },
        ]}
      />
      <div className="mt-4">
        <TablesList tables={tables} />
      </div>
      <DrawerModal
        title={"Create table"}
        description={"Enter table name and table columns create tables."}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        content={
          <>
            <TemplateTables
              tables={new_tables}
              setTables={setNewTables}
              setColumns={setColumns}
              columns={columns}
              templateId={template?.id}
            />
            {columns.length >= 2 && (
              <Button onClick={onSubmit} className="w-full">
                Save
              </Button>
            )}
          </>
        }
      />
    </PageContainer>
  );
};

export default Template;
