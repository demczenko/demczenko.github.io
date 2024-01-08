import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemplateForm from "./TemplateForm";
import TemplateTables from "./TemplateTables";
import { v4 as uuidv4 } from "uuid";

export const AddTemplateDrawer = ({ onSubmitForm }) => {

  const templateId = uuidv4()


  return (
    <div className="mt-4">
      <Tabs defaultValue="Campaign">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Campaign">Campaign</TabsTrigger>
          <TabsTrigger value="Tables">Tables</TabsTrigger>
        </TabsList>
        <TabsContent value="Campaign">
          <TemplateForm templateId={templateId} onSubmitForm={onSubmitForm} />
        </TabsContent>
        <TabsContent value="Tables">
          <TemplateTables templateId={templateId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
