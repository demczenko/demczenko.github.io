import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, View } from "lucide-react";
import ChangeTemplate from "../pages/Templates/TemplateModal/ChangeTemplate";

const TemplatePreview = ({ template_id, html }) => {
  return (
    <Tabs defaultValue="view" className="w-full relative">
      <TabsList className="absolute top-4 left-2 bg-[#111111]">
        <TabsTrigger value="view">
          <View className="w-4 h-4" />
        </TabsTrigger>
        <TabsTrigger value="code">
          <Code2 className="w-4 h-4" />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="view" className="h-full">
        <iframe
          className="w-full xl:h-[1000px] md:h-[600px] h-[400px] overflow-y-auto rounded-md block"
          srcDoc={html}
        ></iframe>
      </TabsContent>
      <TabsContent value="code" className="h-full">
        <ChangeTemplate template_id={template_id} placeholder={html} />
      </TabsContent>
    </Tabs>
  );
};

export default TemplatePreview;
