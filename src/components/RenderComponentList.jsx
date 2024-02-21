import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import RenderList from "./RenderList";
import { CreateForm } from "./CreateForm";
import { SelectComponent } from "@/pages/Projects/ProjectsModal/SelectComponent";
import { useQueryClient } from "react-query";
import { useToast } from "./ui/use-toast";
import ComponentTemplateCart from "@/pages/Components/ComponentTemplateCart";
import ComponentCart from "@/pages/Components/ComponentCart";
import { v4 as uuidv4 } from "uuid";
import { useComponentCreate } from "@/hooks/components/useComponentCreate";
import { useTemplateUpdate } from "@/hooks/templates/useTemplateUpdate";
import DataTableCart from "@/pages/Table/DataTableCart";

const RenderComponentList = ({
  isDataTableCart,
  isTemplateCart,
  query,
  template_id,
  ...props
}) => {
  const { toast } = useToast();
  const client = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: onCreate, isLoading: onCreateLoading } = useComponentCreate();

  const {
    mutate: updateTemplate,
    isLoading: isTemplateUpdateLoading,
    isError: isTemplateUpdateError,
  } = useTemplateUpdate(template_id);

  const handleComponentCreate = (data) => {
    let html;
    const reader = new FileReader();

    reader.onload = async () => {
      html = reader.result;
      const new_component = {
        id: uuidv4(),
        ...data,
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

  const handleSelectComponent = (data) => {
    updateTemplate(data, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to update template",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        client.invalidateQueries(`template-${template_id}`);
        client.invalidateQueries(`component-${data?.id}`);
        client.invalidateQueries(`component-${footer?.id}`);
        setIsModalOpen(false);
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Template successfully updated",
        });
      },
    });
  };

  return (
    <>
      <RenderList
        {...props}
        action={{
          id: 1,
          name: "Add component",
          icon: <PlusCircle className="h-4 w-4" />,
          onClick: () => setIsModalOpen(true),
        }}
        query={query}
        component={
          isTemplateCart
            ? ComponentTemplateCart
            : isDataTableCart
            ? DataTableCart
            : ComponentCart
        }
        title={"Components"}
        service={"components"}
      />
      {isTemplateCart ? (
        <CreateForm
          isOpen={isModalOpen}
          isLoading={isTemplateUpdateLoading}
          setIsOpen={setIsModalOpen}
          fields={[
            {
              id: 2,
              name: "header_id",
              label: "Header",
              content: (form) => (
                <SelectComponent
                  onSelect={(template) => form.setValue("header_id", template)}
                  value={form.getValues("header_id")}
                />
              ),
            },
            {
              id: 3,
              name: "footer_id",
              label: "Footer",
              content: (form) => (
                <SelectComponent
                  onSelect={(template) => form.setValue("footer_id", template)}
                  value={form.getValues("footer_id")}
                />
              ),
            },
          ]}
          onSubmit={(component) => handleSelectComponent(component)}
          title={"Select components"}
          description={"Select header and footer html templates."}
        />
      ) : (
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
      )}
    </>
  );
};

export default RenderComponentList;
