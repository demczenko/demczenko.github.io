import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heading } from "@/components";
import { PageContainer } from "..";
import { ProjectService } from "@/api/projects/init";
import SlugList from "./SlugList";
import { TabledataService } from "@/api/tables data/init";
import { TableService } from "@/api/tables/init";
import TablesList from "../Tables/TableList";
import { TemplatesService } from "@/api/templates/init";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [slugs, setSlugs] = useState([]);
  const [tablesData, setTablesData] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [tables, setTables] = useState([]);
  const [template, setTemplate] = useState({});

  // Fetch all templates
  // TODO
  useEffect(() => {
    async function getTemplateList() {
      try {
        const response = await TemplatesService.getTemplates();
        if (response.ok) {
          const data = await response.json();
          const template = data.find(
            (template) => template.id === project.template_id
          );
          if (template) {
            setTemplate(template);
          } else {
            throw new Error("Template not found.");
          }
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    if (project) {
      getTemplateList();
    }
  }, [project]);

  // Fetch all projects
  useEffect(() => {
    async function getProject() {
      try {
        const response = await ProjectService.getProjects();
        if (response.ok) {
          const data = await response.json();
          const project = data.find((project) => project.id === id);
          if (project) {
            setProject(project);
            setLoading(false);
          }
        }
      } catch (error) {
        setLoading(false);
      }
    }

    getProject();
  }, []);

  // Fetch all tables data
  // TODO
  useEffect(() => {
    async function getTableData() {
      try {
        const response = await TabledataService.getTabledata();
        if (response.ok) {
          const data = await response.json();
          const project_tables = data.filter(
            (table) => table.project_id === project.id
          );
          setSlugs(project_tables.map((item) => item.slug));
          setTablesData(project_tables);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    if (project) {
      getTableData();
    }
  }, [project]);

  // Fetch all tables
  // TODO
  useEffect(() => {
    async function getTableList() {
      try {
        const response = await TableService.getTables();
        if (response.ok) {
          const data = await response.json();
          const filteredTable = data.filter(
            (table) => table.template_id === project.template_id
          );
          setTables(filteredTable);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    if (project) {
      getTableList();
    }
  }, [project]);

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

  return (
    <PageContainer>
      <Heading
        title={loading ? "Loading" : error ? error : project.project_name}
        paragraph={
          <Link to={`/templates/${template?.id}`}>{template?.template_name}</Link>
        }
      />
      <div className="grid xl:gap-8 xl:grid-cols-2 grid-cols-1 xl:h-3/4 h-[90%] xl:mt-6 mt-4">
        <iframe
          className="w-full xl:h-full h-[600px] pointer-events-none rounded-md block"
          srcDoc={template?.template_html}></iframe>
        <div className="grid gap-2 pt-4 lg:pt-0 w-full">
          <SlugList
            project_id={project?.id}
            slugs={availableSlugs}
            selectedSlug={selectedSlug}
            onSlugSelect={(slug) => setSelectedSlug(slug)}
          />
          {tables && (
            <TablesList
              isProject={true}
              project_id={project?.id}
              tables={tables}
              setTables={setTables}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Project;
