import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, View } from "lucide-react";
import ChangeTemplate from "../pages/Templates/TemplateModal/ChangeTemplate";
import { useEffect, useState } from "react";

const TemplatePreview = ({
  isLoading,
  onUpdate,
  template_id,
  html,
  refHTML,
  setIsModalOpen,
  setSelectedNode,
}) => {
  const [tab, setTab] = useState("");

  useEffect(() => {
    if (!refHTML.current) return;

    function handleNodeSelect(ev) {
      ev.preventDefault();
      setIsModalOpen(true);
      setSelectedNode(ev.target);
    }

    function handleNodeHighlight(ev) {
      ev.preventDefault();
      const node = ev.target;
      node.classList.add("hovered_node");
    }

    function handleNodeUnHighlight(ev) {
      ev.preventDefault();
      const node = ev.target;
      node.classList.remove("hovered_node");
    }

    refHTML.current.addEventListener("click", handleNodeSelect);
    refHTML.current.addEventListener("mouseover", handleNodeHighlight);
    refHTML.current.addEventListener("mouseout", handleNodeUnHighlight);

    return () => {
      if (refHTML.current) {
        refHTML.current.removeEventListener("click", handleNodeSelect);
        refHTML.current.removeEventListener("mouseover", handleNodeHighlight);
        refHTML.current.removeEventListener("mouseout", handleNodeUnHighlight);
      }
    };
  }, [isLoading, tab]);

  return (
    <Tabs
      defaultValue="view"
      className="w-full relative"
      onValueChange={(v) => setTab(v)}>
      <TabsList className="absolute top-4 left-2 bg-[#111111]">
        <TabsTrigger value="view">
          <View className="w-4 h-4" />
        </TabsTrigger>
        <TabsTrigger value="code">
          <Code2 className="w-4 h-4" />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="view" className="h-full">
        <div
          ref={refHTML}
          dangerouslySetInnerHTML={{
            __html: html,
          }}
          className="w-full xl:h-[1000px] md:h-[600px] h-[400px] overflow-y-auto rounded-md block p-8 bg-neutral-600"
        />
      </TabsContent>
      <TabsContent value="code" className="h-full">
        <ChangeTemplate
          isLoading={isLoading}
          onUpdate={onUpdate}
          template_id={template_id}
          placeholder={html}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TemplatePreview;
