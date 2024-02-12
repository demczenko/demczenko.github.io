import { useComponents } from "@/hooks/useComponents";
import React from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "..";
import TemplatePreview from "../../components/TemplatePreview";
import { useToast } from "@/components/ui/use-toast";

const Component = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const {
    data: components,
    isError,
    isLoading,
    set: setComponent,
    update: updateComponent,
  } = useComponents("?id=" + id);
  const component = components[0];

  const onChangeTemplateSubmit = async ({ html }) => {
    if (html.length < 10) return;
    const new_component = {
      ...component,
      component_html: html,
    };
    const candidate = await updateComponent(new_component);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Component successfully updated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to update component",
        description: "Something went wrong",
      });
    }
  };

  return (
    <PageContainer
      isError={isError}
      title={"Component " + component?.component_name}>
      <div className="flex lg:gap-12 gap-4 xl:flex-row flex-col">
        <TemplatePreview
          isLoading={isLoading}
          html={component?.component_html}
          onChangeTemplateSubmit={onChangeTemplateSubmit}
        />
        <div className="flex gap-4 flex-col w-full items-start"></div>
      </div>
    </PageContainer>
  );
};

export default Component;
