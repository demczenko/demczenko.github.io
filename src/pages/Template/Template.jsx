import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Heading } from "@/components";
import { PageContainer } from "..";
import { useToast } from "@/components/ui/use-toast";
import TemplatePreview from "../../components/TemplatePreview";
import ErrorPage from "@/ErrorPage";
import { useTemplate } from "@/hooks/templates/useTemplate";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useComponent } from "@/hooks/components/useComponent";
import { useTemplateUpdate } from "@/hooks/templates/useTemplateUpdate";
import { useQueryClient } from "react-query";
import NotFound from "@/NotFound";
import RenderTableList from "@/components/RenderTableList";
import RenderProjectList from "@/components/RenderProjectList";
import RenderComponentList from "@/components/RenderComponentList";

const Template = () => {
  const ref = useRef();
  const { id } = useParams();
  const { toast } = useToast();

  const client = useQueryClient();

  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const {
    isLoading: templateIsLoading,
    data: template,
    isError: templateError,
  } = useTemplate(id);

  const {
    mutate: updateTemplate,
    isLoading: isTemplateUpdateLoading,
    isError: isTemplateUpdateError,
  } = useTemplateUpdate(template?.id);

  const {
    data: header,
    isLoading: isHeaderLoading,
    isError: isHeaderError,
  } = useComponent(template?.header_id, {
    enabled: !!template?.id && !!template?.header,
  });
  const {
    data: footer,
    isLoading: isFooterLoading,
    isError: isFooterError,
  } = useComponent(template?.footer_id, {
    enabled: !!template?.id && !!template?.footer_id,
  });

  const mutateTemplate = (new_template) => {
    updateTemplate(new_template, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to update template",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        client.invalidateQueries(`template-${template.id}`);
        client.invalidateQueries(`component-${header?.id}`);
        client.invalidateQueries(`component-${footer?.id}`);
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

  const handleChangeTemplateName = async (template) => {
    if (name.trim().length < 3) {
      toast({
        variant: "destructive",
        title: "Failed to update template",
        description: "Template name should have at least 3 symbols",
      });
    }
    mutateTemplate({
      template_name: name,
    });
  };

  if (templateIsLoading) {
    return <SkeletonCard isContainer={true} />;
  }

  if (templateError) {
    return (
      <ErrorPage
        title={`Something went wrong while template, header, footer loading...`}
      />
    );
  }

  if (!template) {
    return (
      <NotFound
        title={"Template you are trying to access not found."}
        action={{ to: "/templates", title: "Go to templates" }}
      />
    );
  }

  return (
    <PageContainer>
      <div className="flex lg:gap-12 gap-4 xl:flex-row flex-col">
        <TemplatePreview
          template_id={template.id}
          header={header?.component_html ?? ""}
          html={template.template_html ?? ""}
          footer={footer?.component_html ?? ""}
        />
        <div className="flex gap-4 flex-col w-full items-start">
          <Heading
            title={
              isOpen ? (
                <input
                  ref={ref}
                  onBlur={() => {
                    if (
                      template.template_name.toLowerCase() ===
                      name.toLowerCase()
                    ) {
                      setIsOpen(false);
                      return;
                    }
                    handleChangeTemplateName(template);
                  }}
                  onChange={(ev) => setName(ev.target.value)}
                  value={name}
                  className="text-4xl border-none w-full bg-transparent outline-none focus:border-none p-0"
                />
              ) : (
                <p
                  onClick={() => {
                    setIsOpen(true);
                    setName(template?.template_name);
                  }}>
                  {template?.template_name}
                </p>
              )
            }
            paragraph={
              template?.createdat && (
                <>created at: {new Date(template.createdat).toDateString()}</>
              )
            }
          />
          <RenderComponentList
            header_id={template.header_id}
            footer_id={template.footer_id}
            isCreate={true}
            template_id={template.id}
            isTemplateCart={true}
            query={`?id=${template.header_id}`}
          />
          <RenderComponentList
            header_id={template.header_id}
            footer_id={template.footer_id}
            template_id={template.id}
            isTemplateCart={true}
            query={`?id=${template.footer_id}`}
          />
          <RenderProjectList
            template_id={template.id}
            view={"list"}
            query={`?template_id=${template.id}&isarchived=0`}
          />
          <RenderTableList
            isCreate={true}
            table_key_id={"template_id"}
            table_id={template.id}
            query={`?template_id=${template.id}`}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default Template;
