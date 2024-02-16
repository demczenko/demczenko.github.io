import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Heading } from "@/components";
import { PageContainer } from "..";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import TemplatePreview from "../../components/TemplatePreview";
import { v4 as uuidv4 } from "uuid";
import { AddTable } from "./AddTable";
import { useProjects } from "@/hooks/projects/useProjects";
import RenderList from "@/components/RenderList";
import ProjectCart from "../Projects/ProjectCart";
import TableCart from "../Tables/TableCart";
import NotFound from "@/NotFound";
import { CreateForm } from "@/components/CreateForm";
import { useComponents } from "@/hooks/components/useComponents";
import { SelectComponent } from "../Projects/ProjectsModal/SelectComponent";
import ComponentCart from "../Components/ComponentCart";
import ErrorPage from "@/ErrorPage";
import { useTemplate } from "@/hooks/templates/useTemplate";
import { useTable } from "@/hooks/tables/useTable";
import { ComponentsService } from "@/api/components/init";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useComponent } from "@/hooks/components/useComponent";

const Template = () => {
  const ref = useRef();
  const { id } = useParams();
  const { toast } = useToast();

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
  } = useComponent(template?.header_id, { enabled: !!template?.id });
  const {
    data: footer,
    isLoading: isFooterLoading,
    isError: isFooterError,
  } = useComponent(template?.footer_id, { enabled: !!template?.id });

  // const {
  //   data: columns,
  //   isError: IsColumnsError,
  //   isLoading: isColumnsLoading,
  //   update: updateColumn,
  //   set: setColumn,
  //   remove: removeColumn,
  // } = useColumns();

  // const {
  //   data: projects,
  //   isError: isErrorProjects,
  //   isLoading: isLoadingProjects,
  //   get: getProjects,
  //   set: setProject,
  // } = useProjects(`?template_id=${id}&isarchived=0`);

  // const {
  //   data: componentsData,
  //   set: setComponent,
  //   remove: removeComponent,
  // } = useComponents();

  // const projectsTamplate = projects.filter(
  //   (project) => project.template_id === template?.id
  // );
  // const components = componentsData.filter((component) => {
  //   if (
  //     component.id === template?.header_id ||
  //     component.id === template?.footer_id
  //   ) {
  //     return true;
  //   }
  //   return false;
  // });

  const onChangeTemplateSubmit = async ({ html }) => {
    if (html.length < 10) return;
    const new_template = {
      id: template.id,
      template_html: html,
    };
    const candidate = await updateTemplate(new_template);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Template successfully updated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to update template",
        description: "Something went wrong",
      });
    }
  };

  const createProject = async (data) => {
    const new_project = {
      project_name: data.project_name,
      id: uuidv4(),
      template_id: template.id,
      isarchived: false,
      createdat: Date.now(),
    };

    const candidate = await setProject(new_project);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Project added successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to create project",
        description: "Something went wrong",
      });
    }
  };

  const onSubmit = async (data) => {
    setIsModalOpen(false);

    const new_table = {
      id: uuidv4(),
      table_name: data.table_name,
      template_id: template.id,
      createdat: Date.now(),
    };

    const candidate = await setTable(new_table);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Table created successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to create table",
        description: "Something went wrong",
      });
    }
    toast({
      variant: "success",
      title: "Success",
      description: "Table created successfully",
    });
  };

  const handleChangeTemplateName = async (template) => {
    if (name.trim().length > 0) {
      const candidate = await updateTemplate({
        id: template.id,
        template_name: name,
      });
      if (candidate) {
        toast({
          variant: "success",
          title: "Success",
          description: "Template name successfully updated",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to update template",
          description: "Something went wrong",
        });
      }
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  const handleSelectComponent = async (data) => {
    const candidate = await updateTemplate({
      id: template.id,
      ...data,
    });
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Html template successfully updated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to update template",
        description: "Something went wrong",
      });
    }
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

    const candidate = await updateTemplate(new_template);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "HTML template name successfully updated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to update template",
        description: "Something went wrong",
      });
    }
  };

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

  return (
    <PageContainer>
      <div className="flex lg:gap-12 gap-4 xl:flex-row flex-col">
        <TemplatePreview
          header={header?.component_html ?? ""}
          html={template.template_html ?? ""}
          footer={footer?.component_html ?? ""}
          onChangeTemplateSubmit={onChangeTemplateSubmit}
        />
        <div className="flex gap-4 flex-col w-full items-start">
          <Heading
            title={
              isOpen ? (
                <input
                  ref={ref}
                  onBlur={() => handleChangeTemplateName(template)}
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
                  className="font-semibold">
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
            list={[header, footer]}
            component={ComponentCart}
            onDelete={removeComponentFromTemplate}
            title={"Components"}
          />
          {/* <RenderList
            action={{
              id: 1,
              name: "Create project",
              icon: <PlusCircle className="h-4 w-4 mr-2" />,
              onClick: () => setIsModalOpenCreateProject(true),
            }}
            list={projectsTamplate}
            title={"Projects"}
            view={"list"}
            component={ProjectCart}
            isProjectPage={false}
          />
          <RenderList
            list={tables}
            title={"Tables"}
            component={TableCart}
            onDeleteTable={onDeleteTable}
            onDuplicate={onDuplicate}
            isProject={false}
            action={{
              id: 1,
              name: "Create table",
              icon: <PlusCircle className="h-4 w-4 mr-2" />,
              onClick: () => setIsModalOpen(true),
            }}
          /> */}
        </div>
      </div>

      {/* <CreateForm
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
                title={"Header"}
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
                title={"Footer"}
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
        isLoading={isLoadingProjects}
        isOpen={isModalOpenCreateProject}
        setIsOpen={setIsModalOpenCreateProject}
        fields={[
          {
            id: 1,
            name: "project_name",
            label: "Project Name",
            placeholder: "project name",
          },
        ]}
        onSubmit={createProject}
        title={"Create project"}
        description={"Enter project name."}
      />

      <AddTable
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onSubmit={onSubmit}
      /> */}
    </PageContainer>
  );
};

export default Template;
