import React, { useState } from "react";
import PageContainer from "../PageContainer";
import { PlusCircle } from "lucide-react";
import { CreateForm } from "@/components/CreateForm";
import { useComponents } from "@/hooks/components/useComponents";
import { Input } from "@/components/ui/input";
import RenderList from "@/components/RenderList";
import ComponentCart from "./ComponentCart";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";
import { v4 as uuidv4 } from "uuid";
import { useComponentCreate } from "@/hooks/components/useComponentCreate";
import { useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";

const Components = () => {
  const { toast } = useToast();
  const client = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: onCreate, isLoading: onCreateLoading } = useComponentCreate();

  const {
    isLoading: componentsIsLoading,
    data: components,
    error: componentsIsError,
  } = useComponents();

  if (componentsIsLoading) {
    return <SkeletonCard />;
  }

  if (componentsIsError) {
    return (
      <ErrorPage title={`Something went wrong while components loading...`} />
    );
  }

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
      onCreate(new_component, {
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed",
            description: "Failed to create component",
          });
        },
        onSettled: () => {
          setIsModalOpen(false);
          client.invalidateQueries("components");
        },
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Success",
            description: "Component successfully created",
          });
        },
      });
    };
    reader.readAsText(data.component_html);
  };

  return (
    <>
      <PageContainer
        title={"Components"}
        action={{
          id: 1,
          name: "Create component",
          icon: <PlusCircle className="w-4 h-4 mr-2" />,
          onClick: () => setIsModalOpen(true),
        }}>
        <RenderList list={components || []} component={ComponentCart} />
      </PageContainer>
      <CreateForm
        isLoading={onCreateLoading}
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
                accept=".html"
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
