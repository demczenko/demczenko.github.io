import React, { useState } from "react";
import PageContainer from "../PageContainer";
import { PlusCircle } from "lucide-react";
import RenderList from "@/components/RenderList";
import LayoutCart from "./LayoutCart";
import { useLayoutCreate } from "@/hooks/layouts/useLayoutCreate";
import { CreateForm } from "@/components/CreateForm";
import { useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";
import { SelectTemplate } from "../Projects/ProjectsModal/SelectTemplate";

const Layouts = () => {
  const { toast } = useToast();
  const { mutate: createLayout, isLoading, isError } = useLayoutCreate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const client = useQueryClient();

  const handleCreateLayout = (data) => {
    const new_section = {
      id: uuidv4(),
      section_name: "Body",
      template_id: data.template_id,
      type: "template",
      createdat: Date.now(),
    };

    const new_layout = {
      ...data,
      id: uuidv4(),
      layout: [new_section],
    };

    createLayout(new_layout, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to create Layout",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        setIsModalOpen(false);
        client.invalidateQueries("layouts");
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Layout successfully created",
        });
      },
    });
  };

  return (
    <PageContainer
      title="Layouts"
      action={{
        id: 1,
        name: "Create layout",
        icon: <PlusCircle className="h-4 w-4" />,
        onClick: () => setIsModalOpen(true),
      }}
    >
      <RenderList service={"layouts"} component={LayoutCart} />
      <CreateForm
        isLoading={isLoading}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        fields={[
          {
            id: 1,
            name: "layout_name",
            label: "Layout Name",
            placeholder: "layout name",
          },
          {
            id: 2,
            name: "template_id",
            label: "Template",
            content: (form) => (
              <SelectTemplate
                onSelect={(template) => form.setValue("template_id", template)}
                value={form.getValues("template_id")}
              />
            ),
          },
        ]}
        onSubmit={(layout) => handleCreateLayout(layout)}
        title={"Create layout"}
        description={"Enter layout name, select html template."}
      />
    </PageContainer>
  );
};

export default Layouts;
