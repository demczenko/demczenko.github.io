import React, { useState } from "react";
import PageContainer from "../PageContainer";
import { PlusCircle } from "lucide-react";
import { CreateForm } from "@/components/CreateForm";
import { useComponents } from "@/hooks/useComponents";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import RenderList from "@/components/RenderList";
import ComponentCart from "./ComponentCart";

const Components = () => {
  const {
    data: components,
    isError,
    isLoading,
    set: setComponent,
    remove: removeComponent
  } = useComponents();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleComponentCreate = (data) => {
    let html;
    const reader = new FileReader();

    reader.onload = async () => {
      html = reader.result;
      const new_component = {
        id: uuidv4(),
        createdat: Date.now(),
        component_html: html,
        component_name: data.component_name,
      };
      const candidate = await setComponent(new_component);
      if (candidate) {
        toast({
          variant: "success",
          title: "Success",
          description: "Component added successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to create component",
          description: "Something went wrong",
        });
      }
      setIsModalOpen(false);
    };
    reader.readAsText(data.component_html);
  };

  const handleComponentDelete = async (id) => {
    const candidate = await removeComponent(id);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Component successfully deleted",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to delete component",
        description: "Something went wrong",
      });
    }
  }

  return (
    <>
      <PageContainer
        isError={isError}
        isLoading={isLoading}
        title={"Components"}
        action={{
          id: 1,
          name: "Create component",
          icon: <PlusCircle className="w-4 h-4 mr-2" />,
          onClick: () => setIsModalOpen(true),
        }}>
        <RenderList onDelete={handleComponentDelete} list={components} component={ComponentCart} />
      </PageContainer>
      <CreateForm
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        fields={[
          {
            id: 1,
            name: "component_name",
            title: "Name",
            placeholder: "component name",
          },
          {
            id: 2,
            name: "component_html",
            title: "Template",
            type: "file",
            content: (form) => (
              <Input
                type="file"
                placeholder="html"
                onChange={(e) => {
                  form.setValue("component_html", e.target.files[0]);
                  form.clearErrors("component_html");
                }}
              />
            ),
          },
        ]}
        onSubmit={(data) => handleComponentCreate(data)}
        title={"Create component"}
        description={"Enter component name, select html template."}
      />
    </>
  );
};

export default Components;
