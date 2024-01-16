import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemplateForm from "./TemplateForm";
import TemplateTables from "./TemplateTables";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const AddTemplateDrawer = ({ onSubmitForm }) => {
  const [templateId, setTemplateId] = useState(() => uuidv4());
  const [fileName, setFileName] = useState("");
  const [html, setHtml] = useState("");
  const form = useForm({
    defaultValues: {
      template_name: "",
      template_html: "",
    },
  });
  const [columns, setColumns] = useState([]);
  const [tables, setTables] = useState([]);


  console.log(columns)
  return (
    <div className="mt-4">
      <Tabs defaultValue="Campaign">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Campaign">Campaign</TabsTrigger>
          <TabsTrigger value="Tables">Tables</TabsTrigger>
        </TabsList>
        <TabsContent value="Campaign">
          <TemplateForm
            fileName={fileName}
            setFileName={setFileName}
            setHtml={setHtml}
            html={html}
            form={form}
            tables={tables}
            columns={columns}
            templateId={templateId}
            onSubmitForm={onSubmitForm}
          />
        </TabsContent>
        <TabsContent value="Tables">
          <TemplateTables
            tables={tables}
            setTables={setTables}
            setColumns={setColumns}
            columns={columns}
            templateId={templateId}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
