import React, { useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heading } from "@/components";
import { PageContainer } from "..";
import SlugList from "./SlugList";
import TablesList from "../Tables/TableList";
import ProjectTemplatePreview from "./ProjectTemplatePreview";
import ProjectStyleList from "./ProjectStyleList";
import { useTemplates } from "@/hooks/useTemplates";
import { useProjects } from "@/hooks/useProjects";
import { useTables } from "@/hooks/useTables";
import LoadingPage from "@/LoadingPage";
import { useDataTables } from "@/hooks/useDataTables";
import { useProjectsStyles } from "@/hooks/useProjectsStyles";
import { useToast } from "@/components/ui/use-toast";

const Project = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const {
    data,
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

  const [selectedSlug, setSelectedSlug] = useState("");

  const project = data.find((project) => project.id === id);
  const template = templates.find(
    (template) => template.id === project?.template_id
  );
  const tables = dataTables.filter(
    (table) => table.template_id === project?.template_id
  );
  const project_tables = tablesData.filter(
    (table) => table.project_id === project?.id
  );
  const slugs = project_tables.map((item) => item.slug);
  const projectStyle = projectsStyles.filter(
    (table) => table.project_id === project?.id
  );

  const handleProjectStyle = (new_node) => {
    let isExist = false;

    for (const item of projectStyle) {
      if (item.id === new_node.id) {
        isExist = true;
      }
    }

    if (isExist) {
      updateProjectsStyles(new_node);
    } else {
      setProjectsStyles(new_node);
    }
  };

  const handleStyleDelete = (id) => {
    removeProjectsStyles(id);
  };

  const handleUpdateTemplate = (body_with_data_attribute) => {
    const old_document = new DOMParser().parseFromString(
      template.template_html,
      "text/html"
    );
    old_document.body.innerHTML = body_with_data_attribute;
    const updated_template = {
      ...template,
      template_html: old_document.documentElement.outerHTML,
    };
    update(updated_template);
  };

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

  const handleChangeProjectName = async (table) => {
    if (name.trim().length > 0) {
      const candidate = await updateProject({ ...table, project_name: name });
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
      <div className="grid xl:gap-8 xl:grid-cols-2 grid-cols-1 xl:h-3/4 h-[90%] xl:mt-6 mt-4">
        <ProjectTemplatePreview
          projectStyle={projectStyle}
          handleUpdateTemplate={handleUpdateTemplate}
          setStyle={handleProjectStyle}
          project_id={project?.id}
          template_html={template?.template_html}
        />
        <div className="grid gap-2 pt-4 lg:pt-0 w-full">
          <SlugList
            project_id={project?.id}
            slugs={availableSlugs}
            selectedSlug={selectedSlug}
            onSlugSelect={(slug) => setSelectedSlug(slug)}
          />

          <ProjectStyleList
            handleDelete={handleStyleDelete}
            styles={projectStyle}
          />

          {isTablesLoading ? (
            <LoadingPage title={"Loading tables..."} />
          ) : (
            <TablesList
              isProject={true}
              project_id={project?.id}
              tables={tables}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Project;
