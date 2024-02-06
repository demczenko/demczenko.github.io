import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, View } from "lucide-react";
import ChangeTemplate from "../Templates/TemplateModal/ChangeTemplate";

const TemplatePreview = ({ template_html, onChangeTemplateSubmit }) => {
  return (
    <Tabs defaultValue="view">
      <TabsList className="">
        <TabsTrigger value="view">
          <View className="w-4 h-4" />
        </TabsTrigger>
        <TabsTrigger value="code">
          <Code2 className="w-4 h-4" />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="view" className="h-full">
        <iframe
          className="w-full xl:h-[1000px] md:h-[600px] h-[400px] overflow-y-auto rounded-md block p-8 bg-neutral-600"
          srcDoc={template_html}></iframe>
      </TabsContent>
      <TabsContent value="code" className="h-full">
        <ChangeTemplate
          onSubmit={onChangeTemplateSubmit}
          placeholder={template_html}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TemplatePreview;
