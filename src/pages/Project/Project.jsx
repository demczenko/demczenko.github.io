import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Heading } from "@/components";
import { PageContainer } from "..";
import { ProjectService } from "@/api/projects/init";
import SlugList from "./SlugList";
import { TabledataService } from "@/api/tables data/init";
import { TableService } from "@/api/tables/init";
import { TemplatesService } from "@/api/templates/init";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [slugs, setSlugs] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState("de");
  const [tables, setTables] = useState([]);
  const [template, setTemplate] = useState([]);

  console.log(slugs);

  // Fetch all projects
  useEffect(() => {
    async function getProject() {
      try {
        setError("");
        const response = await ProjectService.getProjects();
        if (response.ok) {
          const data = await response.json();
          const project = data.find((project) => project.id === id);
          if (project) {
            setProject(project);
            setLoading(false);
          } else {
            throw new Error("Project not found.");
          }
        }
      } catch (error) {
        setError(error.message);
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
          setSlugs(project_tables.map((item) => item.Slug));
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

  console.log(template);

  return (
    <PageContainer>
      <Heading
        title={loading ? "Loading" : error ? error : project.project_name}
      />
      <div className="mt-6 space-y-4">
        <SlugList
          slugs={availableSlugs}
          selectedSlug={selectedSlug}
          onSlugSelect={(slug) => setSelectedSlug(slug)}
        />
        <div>
          <iframe src="" frameBorder="0"></iframe>
        </div>
      </div>
    </PageContainer>
  );
};

export default Project;
