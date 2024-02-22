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

const Layouts = () => {
  const { toast } = useToast();
  const { mutate: createLayout, isLoading, isError } = useLayoutCreate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const client = useQueryClient();

  const handleCreateLayout = (data) => {
    const new_layout = {
      ...data,
      id: uuidv4(),
      layout: []
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
        ]}
        onSubmit={(layout) => handleCreateLayout(layout)}
        title={"Create layout"}
        description={"Enter layout name, select html template."}
      />
    </PageContainer>
  );
};

export default Layouts;
