import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Heading } from "@/components";
import { PageContainer } from "..";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import TemplatePreview from "../../components/TemplatePreview";
import { v4 as uuidv4 } from "uuid";
import RenderList from "@/components/RenderList";
import ProjectCart from "../Projects/ProjectCart";
import TableCart from "../Tables/TableCart";
import { CreateForm } from "@/components/CreateForm";
import { SelectComponent } from "../Projects/ProjectsModal/SelectComponent";
import ComponentCart from "../Components/ComponentCart";
import ErrorPage from "@/ErrorPage";
import { useTemplate } from "@/hooks/templates/useTemplate";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useComponent } from "@/hooks/components/useComponent";
import { useTemplateUpdate } from "@/hooks/templates/useTemplateUpdate";
import { useQueryClient } from "react-query";
import { useProjectCreate } from "@/hooks/projects/useProjectCreate";
import { useTableCreate } from "@/hooks/tables/useTableCreate";
import NotFound from "@/NotFound";

const Template = () => {
  const ref = useRef();
  const { id } = useParams();
  const { toast } = useToast();

  const client = useQueryClient();

  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  } = useComponent(template?.header_id, { enabled: !!template?.id && !!template?.header });
  const {
    data: footer,
    isLoading: isFooterLoading,
    isError: isFooterError,
  } = useComponent(template?.footer_id, { enabled: !!template?.id && !!template?.footer_id });

  const {
    mutate: updateTemplate,
    isLoading: isTemplateUpdateLoading,
    isError: isTemplateUpdateError,
  } = useTemplateUpdate();

  const {
    mutate: createProject,
    isLoading: isProjectCreateLoading,
    isError: isProjectCreateError,
  } = useProjectCreate();

  const {
    mutate: createTable,
    isLoading: isTableCreateLoading,
    isError: isTableCreateError,
  } = useTableCreate();

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
          description: "Template name successfully updated",
        });
      },
    });
  };

  const handleCreateProject = async (data) => {
    const new_project = {
      project_name: data.project_name,
      id: uuidv4(),
      template_id: template.id,
      isarchived: false,
      createdat: Date.now(),
    };

    createProject(new_project, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to create project",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        setIsModalOpenCreateProject(false);
        client.invalidateQueries("projects");
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Project added successfully",
        });
      },
    });
  };

  const handleCreateTable = async (data) => {
    const new_table = {
      id: uuidv4(),
      table_name: data.table_name,
      template_id: template.id,
      createdat: Date.now(),
    };

    createTable(new_table, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to create table",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        setIsModalOpen(false);
        client.invalidateQueries("tables");
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Table created successfully",
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
    const new_template = {
      id: template.id,
      template_name: name,
    };
    updateTemplate(new_template, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to update template",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        client.invalidateQueries("templates");
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Template name successfully updated",
        });
      },
    });
  };

  const handleSelectComponent = async (data) => {
    const new_template = {
      id: template.id,
      ...data,
    };
    mutateTemplate(new_template);
  };

  const removeComponentFromTemplate = async (id) => {
    const isHeader = template.header_id === id;
    const isFooter = template.footer_id === id;

    let new_template;
    if (isHeader) {
      new_template = {
        id: template.id,
        header_id: null,
      };
    }

    if (isFooter) {
      new_template = {
        id: template.id,
        footer_id: null,
      };
    }

    mutateTemplate(new_template);
  };

  let list = header ? [header] : [];
  list = footer ? [...list, footer] : [...list];

  if (templateIsLoading || isFooterLoading || isHeaderLoading) {
    return <SkeletonCard />;
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
        title={"Project you are trying to access not found."}
        action={{ to: "/projects", title: "Go to projects" }}
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
                    )
                      return;
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
                  }}
                >
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
              icon: <PlusCircle className="h-4 w-4 mr-2" />,
              onClick: () => setIsModalOpenComponent(true),
            }}
            list={list || []}
            component={ComponentCart}
            isLoadingDeleteFromTemplate={isTemplateUpdateLoading}
            onDeleteFromTemplate={removeComponentFromTemplate}
            title={"Components"}
          />
          <RenderList
            action={{
              id: 1,
              name: "Create project",
              icon: <PlusCircle className="h-4 w-4 mr-2" />,
              onClick: () => setIsModalOpenCreateProject(true),
            }}
            title={"Projects"}
            view={"list"}
            query={`?template_id=${template.id}&isarchived=0`}
            service={"projects"}
            component={ProjectCart}
            isProjectPage={false}
          />
          <RenderList
            title={"Tables"}
            query={`?template_id=${template.id}`}
            service={"tables"}
            component={TableCart}
            action={{
              id: 1,
              name: "Create table",
              icon: <PlusCircle className="h-4 w-4 mr-2" />,
              onClick: () => setIsModalOpen(true),
            }}
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

      <CreateForm
        isLoading={isProjectCreateLoading}
        isOpen={isModalOpenCreateProject}
        setIsOpen={setIsModalOpenCreateProject}
        fields={[
          {
            id: 1,
            name: "project_name",
            label: "Project Name",
            placeholder: "name",
          },
        ]}
        onSubmit={handleCreateProject}
        title={"Create project"}
        description={"Enter project name."}
      />

      <CreateForm
        isLoading={isTableCreateLoading}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onSubmit={handleCreateTable}
        fields={[
          {
            id: 1,
            name: "table_name",
            label: "Table name",
            placeholder: "name",
          },
        ]}
        title={"Create table"}
        description={"Enter table name. Click save when you're done."}
      />
    </PageContainer>
  );
};

export default Template;
