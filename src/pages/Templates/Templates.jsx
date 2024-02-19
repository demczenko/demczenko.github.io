import { useState } from "react";
import { DrawerModal } from "@/components/Drawer";
import { AddTemplateDrawer } from "./TemplateModal/AddTemplateDrawer";
import { PageContainer } from "..";
import { PlusCircle } from "lucide-react";
import TemplateCart from "./TemplateCart";
import RenderList from "@/components/RenderList";
import { useTemplateCreate } from "@/hooks/templates/useTemplateCreate";
import { useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";

const Templates = () => {
  const { toast } = useToast();
  const client = useQueryClient();
  const { mutate: createTemplate, isLoading, isError } = useTemplateCreate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTemplate = (new_template) => {
    createTemplate(new_template, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to create template",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        setIsModalOpen(false);
        client.invalidateQueries("templates");
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Template successfully created",
        });
      },
    });
  };

  return (
    <>
      <PageContainer
        action={{
          id: 1,
          name: "Create Template",
          icon: <PlusCircle className="h-4 w-4" />,
          onClick: () => setIsModalOpen(true),
        }}
        title="Templates"
      >
        <RenderList
          query={`?isarchived=0`}
          service={"templates"}
          component={TemplateCart}
        />
      </PageContainer>
      <DrawerModal
        title={"Create template"}
        description={"Enter template name, html template and create tables."}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        content={
          <AddTemplateDrawer
            isLoading={isLoading}
            onSubmit={(template) => handleCreateTemplate(template)}
          />
        }
      />
    </>
  );
};

export default Templates;
