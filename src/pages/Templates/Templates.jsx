import { useState } from "react";
import { DrawerModal } from "@/components/Drawer";
import { AddTemplateDrawer } from "./TemplateModal/AddTemplateDrawer";
import { useTemplates } from "@/hooks/useTemplates";
import { PageContainer } from "..";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle } from "lucide-react";
import TemplateCart from "./TemplateCart";
import RenderList from "@/components/RenderList";

const Templates = () => {
  const { toast } = useToast();
  const {
    data: templates,
    isError,
    isLoading,
    update,
    remove,
    set: setTemplate,
  } = useTemplates();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTemplate = templates.filter(
    (template) => template.isarchived === false
  );

  const handleArchived = (template) => {
    update({
      ...template,
      isarchived: template.isarchived ? false : true,
    });
    toast({
      variant: "success",
      title: "Archived",
      description: "Template successfully archived",
    });
  };

  const handleRename = (template, { template_name }) => {
    update({ ...template, template_name: template_name });
    toast({
      variant: "success",
      title: "Updated",
      description: "Template name successfully updated",
    });
  };

  return (
    <div className="w-full">
      <PageContainer
        action={{
          id: 1,
          name: "Create Template",
          icon: <PlusCircle className="h-4 w-4 mr-2" />,
          onClick: () => setIsModalOpen(true),
        }}
        isError={isError}
        isLoading={isLoading}
        title="Templates">
        <RenderList
          list={filteredTemplate}
          component={TemplateCart}
          isTemplatePage={true}
          onRename={handleRename}
          onArchive={handleArchived}
        />
      </PageContainer>
      <DrawerModal
        title={"Create template"}
        description={"Enter template name, html template and create tables."}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        content={
          <AddTemplateDrawer
            setTemplate={setTemplate}
            onSubmitForm={() => setIsModalOpen(false)}
          />
        }
      />
    </div>
  );
};

export default Templates;
