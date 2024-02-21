import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Heading } from "@/components";
import { PageContainer } from "..";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import TemplatePreview from "../../components/TemplatePreview";
import RenderList from "@/components/RenderList";
import { CreateForm } from "@/components/CreateForm";
import { SelectComponent } from "../Projects/ProjectsModal/SelectComponent";
import ComponentCart from "../Components/ComponentCart";
import ErrorPage from "@/ErrorPage";
import { useTemplate } from "@/hooks/templates/useTemplate";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useComponent } from "@/hooks/components/useComponent";
import { useTemplateUpdate } from "@/hooks/templates/useTemplateUpdate";
import { useQueryClient } from "react-query";
import NotFound from "@/NotFound";
import RenderTableList from "@/components/RenderTableList";
import RenderProjectList from "@/components/RenderProjectList";

const Template = () => {
  const ref = useRef();
  const { id } = useParams();
  const { toast } = useToast();

  const client = useQueryClient();

  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpenComponent, setIsModalOpenComponent] = useState(false);
  const [isModalOpenCreateProject, setIsModalOpenCreateProject] =
    useState(false);

  const {
    isLoading: templateIsLoading,
    data: template,
    isError: templateError,
  } = useTemplate(id);

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

  const {
    mutate: updateTemplate,
    isLoading: isTemplateUpdateLoading,
    isError: isTemplateUpdateError,
  } = useTemplateUpdate(template?.id);

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
        setIsModalOpenComponent(false);
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

  const handleSelectComponent = async (data) => {
    mutateTemplate({
      ...data,
    });
  };

  const removeComponentFromTemplate = async (id) => {
    const isHeader = template.header_id === id;
    const isFooter = template.footer_id === id;

    let new_template;
    if (isHeader) {
      new_template = {
        header_id: null,
      };
    }

    if (isFooter) {
      new_template = {
        footer_id: null,
      };
    }

    mutateTemplate(new_template);
  };

  let list = header ? [header] : [];
  list = footer ? [...list, footer] : [...list];

  if (templateIsLoading || isFooterLoading || isHeaderLoading) {
    return (
      <PageContainer>
        <SkeletonCard />
      </PageContainer>
    );
  }

  if (templateError || isFooterError || isHeaderError) {
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
          <RenderList
            action={{
              id: 1,
              name: "Add component",
              icon: <PlusCircle className="h-4 w-4" />,
              onClick: () => setIsModalOpenComponent(true),
            }}
            list={list || []}
            component={ComponentCart}
            isLoadingDeleteFromTemplate={isTemplateUpdateLoading}
            onDeleteFromTemplate={removeComponentFromTemplate}
            title={"Components"}
          />
          <RenderProjectList
            template_id={template.id}
            view={"list"}
            query={`?template_id=${template.id}&isarchived=0`}
          />
          <RenderTableList
            id={template.id}
            key_id={"template_id"}
            query={`?template_id=${template.id}`}
          />
        </div>
      </div>

      <CreateForm
        isOpen={isModalOpenComponent}
        isLoading={templateIsLoading}
        setIsOpen={setIsModalOpenComponent}
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
    </PageContainer>
  );
};

export default Template;
