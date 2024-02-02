import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heading } from "@/components";
import { PageContainer } from "../pages";
import SlugList from "../pages/Project/SlugList";
import TablesList from "../pages/Tables/TableList";
import ProjectTemplatePreview from "../pages/Project/ProjectTemplatePreview";
import { ProjectStyleService } from "@/api/projects_style/init";
import ProjectStyleList from "../pages/Project/ProjectStyleList";
import { useTemplates } from "@/hooks/useTemplates";
import { useProjects } from "@/hooks/useProjects";
import ErrorPage from "@/ErrorPage";
import { useTables } from "@/hooks/useTables";
import LoadingPage from "@/LoadingPage";
import { useDataTables } from "@/hooks/useDataTables";

const Project = () => {
  const { id } = useParams();
  const {
    data,
    isError: IsProjectsError,
    isLoading: IsProjectsLoading,
    update: updateProjects,
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
    remove,
  } = useDataTables();

  const [projectStyle, setStyle] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState("");

  const project = data.find((project) => project.id === id);

  const template = templates.find(
    (template) => template.id === project.template_id
  );

  const tables = dataTables.filter(
    (table) => table.template_id === project.template_id
  );

  const project_tables = tablesData.filter(
    (table) => table.project_id === project.id
  );

  const slugs = project_tables.map((item) => item.slug);

  // Fetch all project styles
  // TODO
  useEffect(() => {
    async function gettyle() {
      try {
        const response = await ProjectStyleService.get();
        if (response.ok) {
          const data = await response.json();
          const filteredTable = data.filter(
            (table) => table.project_id === project.id
          );
          setStyle(filteredTable);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    if (project) {
      gettyle();
    }
  }, [project]);

  const handleProjectStyle = (new_node) => {
    let isExist = false;

    for (const item of projectStyle) {
      if (item.id === new_node.id) {
        isExist = true;
      }
    }

    if (isExist) {
      ProjectStyleService.update(new_node);
      setStyle((prev) =>
        prev.map((item) => {
          if (item.id === new_node.id) {
            return {
              ...item,
              ...new_node,
            };
          }
          return item;
        })
      );
    } else {
      ProjectStyleService.set(new_node);
      setStyle((prev) => [...prev, new_node]);
    }
  };

  const handleStyleDelete = (id) => {
    setStyle((prev) => prev.filter((item) => item.id !== id));
    ProjectStyleService.delete(id);
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

  if (isError) {
    return <ErrorPage title={"Something went wrong while loading templates"} />;
  }

  if (IsProjectsError) {
    return <ErrorPage title={"Something went wrong while loading projects"} />;
  }

  return (
    <PageContainer>
      <Heading
        title={project?.project_name}
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
          <ProjectStyleList
            handleDelete={handleStyleDelete}
            styles={projectStyle}
          />
          <SlugList
            project_id={project?.id}
            slugs={availableSlugs}
            selectedSlug={selectedSlug}
            onSlugSelect={(slug) => setSelectedSlug(slug)}
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
