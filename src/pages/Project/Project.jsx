import React, { useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heading } from "@/components";
import { PageContainer } from "..";
import { useTemplates } from "@/hooks/useTemplates";
import { useProjects } from "@/hooks/useProjects";
import { useTables } from "@/hooks/useTables";
import { useDataTables } from "@/hooks/useDataTables";
import { useProjectsStyles } from "@/hooks/useProjectsStyles";
import { useToast } from "@/components/ui/use-toast";
import { DrawerModal } from "@/components/Drawer";
import { useColumns } from "@/hooks/useColumns";
import { TableCartProject } from "../Tables/TableCartProject";
import ProjectTemplatePreview from "./ProjectTemplatePreview";
import RenderList from "@/components/RenderList";
import SlugCart from "./SlugCart";
import TableFulfill from "../Projects/ProjectsModal/TableFulfill";
import NotFound from "@/NotFound";
import ProjectStyleCart from "./ProjectStyleCart";
import { useComponents } from "@/hooks/useComponents";
import ComponentCart from "../Components/ComponentCart";

const Project = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const ref = useRef();

  const {
    data: projects,
    isError: IsProjectsError,
    isLoading: IsProjectsLoading,
    update: updateProject,
  } = useProjects();
  const { data: templates, isError, isLoading, update } = useTemplates();
  const {
    data: dataTables,
    isError: IsTablesError,
    isLoading: isTablesLoading,
    update: updateTables,
  } = useTables();
  const {
    data: tablesData,
    isError: IsDataTableError,
    isLoading: IsDataTableLoading,
    update: updateDataTable,
    set: setDataTable,
    remove,
  } = useDataTables();
  const {
    data: projectsStyles,
    isError: IsProjectsStyles,
    isLoading: IsrojectsStyles,
    update: updateProjectsStyles,
    set: setProjectsStyles,
    remove: removeProjectsStyles,
  } = useProjectsStyles();
  const {
    data: columns,
    isError: IsColumnsError,
    isLoading: isColumnsLoading,
    update: updateColumn,
    set: setColumn,
    remove: removeColumn,
  } = useColumns();
  const {
    data: componentsData,
    set: setComponent,
    remove: removeComponent,
  } = useComponents();

  const project = projects.find((p) => p.id === id);

  const template = templates.find(
    (template) => template.id === project?.template_id
  );
  const tables = dataTables.filter(
    (table) => table.template_id === project?.template_id
  );
  const project_tables = tablesData.filter(
    (table) => table.project_id === project?.id
  );

  const slugs = Array.from(new Set(project_tables.map((item) => item.slug)));
  const projectStyle = projectsStyles.filter(
    (table) => table.project_id === project?.id
  );
  const components = componentsData.filter((component) => {
    if (
      component.id === template?.header_id ||
      component.id === template?.footer_id
    ) {
      return true;
    }
    return false;
  });

  const header = componentsData.find((c) => c.id === template?.header_id);
  const footer = componentsData.find((c) => c.id === template?.footer_id);

  const availableSlugs = useMemo(() => {
    const slugsData = {};
    for (const Slug of slugs) {
      if (Slug in slugsData) {
        slugsData[Slug] += 1;
      } else {
        slugsData[Slug] = 1;
      }
    }

    const slugsDataArr = [];
    for (const key in slugsData) {
      const slugCount = slugsData[key];
      if (slugCount === tables.length) {
        slugsDataArr.push(key);
      }
    }

    return slugsDataArr;
  }, [slugs, tables]);

  if (projects.length === 0) {
    return (
      <NotFound
        action={{ to: "/projects", title: "Go to projects" }}
        title={`Project you are trying to access not found.`}
      />
    );
  }

  const handleImport = async (data) => {
    const candidate = await setDataTable({ ...data, project_id: project.id });
    if (candidate) {
      toast({
        variant: "success",
        title: "Created",
        description: "Table data has been successfully created",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to create data table",
        description: "Something went wrong",
      });
    }
  };

  const handleProjectStyle = async (new_node) => {
    let isExist = false;
    let itemId;

    for (const item of projectStyle) {
      if (item.id === new_node.id) {
        isExist = true;
        itemId = item.id;
      }
    }

    if (isExist) {
      const candidate = await updateProjectsStyles({ ...new_node, id: itemId });
      if (candidate) {
        toast({
          variant: "success",
          title: "Success",
          description: "Project style successfully updated",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to update project style",
          description: "Something went wrong",
        });
      }
    } else {
      const candidate = await setProjectsStyles(new_node);
      if (candidate) {
        toast({
          variant: "success",
          title: "Success",
          description: "Project style successfully created",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to create project style",
          description: "Something went wrong",
        });
      }
    }
  };

  const handleStyleDelete = async (id) => {
    // TODO: Remove id from html template (i cant make it because other projects can have this id)
    const candidate = await removeProjectsStyles(id);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Project style successfully deleted",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to delete project style",
        description: "Something went wrong",
      });
    }
  };

  const handleStylEdit = async (item) => {
    const candidate = await updateProjectsStyles(item);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Project style successfully updated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to update project style",
        description: "Something went wrong",
      });
    }
  };

  const handleUpdateTemplate = async (body_with_data_attribute) => {
    const old_document = new DOMParser().parseFromString(
      template.template_html,
      "text/html"
    );
    old_document.body.innerHTML = body_with_data_attribute;
    const updated_template = {
      ...template,
      template_html: old_document.documentElement.outerHTML,
    };
    // TODO: Why i need to clear template from style.
    const candidate = await update(updated_template);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Template style successfully updated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to update project style",
        description: "Something went wrong",
      });
    }
  };

  const handleChangeProjectName = async (project) => {
    if (name.trim().length > 0) {
      const candidate = await updateProject({ ...project, project_name: name });
      if (candidate) {
        toast({
          variant: "success",
          title: "Success",
          description: "Project name successfully updated",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to update project",
          description: "Something went wrong",
        });
      }
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <PageContainer isError={isError} isLoading={IsProjectsLoading}>
      <div className="flex lg:gap-12 gap-4 xl:flex-row flex-col">
        <ProjectTemplatePreview
          isLoading={isLoading}
          projectStyle={projectStyle}
          handleUpdateTemplate={handleUpdateTemplate}
          setStyle={handleProjectStyle}
          project_id={project?.id}
          header={header?.component_html ?? ""}
          html={template?.template_html ?? ""}
          footer={footer?.component_html ?? ""}
        />
        <div className="flex gap-4 flex-col w-full items-start">
          <Heading
            title={
              isOpen ? (
                <input
                  ref={ref}
                  onBlur={() => handleChangeProjectName(project)}
                  onChange={(ev) => setName(ev.target.value)}
                  value={name}
                  className="text-4xl border-none w-full bg-transparent outline-none focus:border-none p-0"
                />
              ) : (
                <p
                  onClick={() => {
                    setIsOpen(true);
                    setName(project?.project_name);
                  }}
                  className="font-semibold">
                  {project?.project_name}
                </p>
              )
            }
            paragraph={
              <Link to={`/templates/${template?.id}`}>
                {template?.template_name}
              </Link>
            }
          />
          <RenderList
            component={ComponentCart}
            list={components}
            title={"Components"}
          />
          <RenderList
            selectedSlug={selectedSlug}
            onSlugSelect={(slug) => setSelectedSlug(slug)}
            isLoading={IsDataTableLoading}
            component={SlugCart}
            list={slugs}
            title={"Slugs"}
            project_id={project?.id}
          />

          <RenderList
            title={"Project style"}
            component={ProjectStyleCart}
            handleDelete={handleStyleDelete}
            handleEdit={handleStylEdit}
            list={projectStyle}
          />

          <RenderList
            onTableSelect={(table) => {
              setSelectedTable(table);
              setIsModalOpen(true);
            }}
            isLoading={isTablesLoading}
            component={TableCartProject}
            list={tables}
            title={"Tables"}
          />
        </div>
      </div>
      <DrawerModal
        title={`Populate ${selectedTable.table_name} table`}
        description={"Import CSV file or fulfill data manually"}
        open={isModalOpen}
        onOpenChange={() => {
          setIsModalOpen(false);
        }}
        content={
          <TableFulfill
            onUpdate={updateDataTable}
            onSubmit={handleImport}
            setIsModalOpen={setIsModalOpen}
            table_id={selectedTable.id}
            columns={columns.filter(
              (column) => column.table_id === selectedTable.id
            )}
          />
        }
      />
    </PageContainer>
  );
};

export default Project;
