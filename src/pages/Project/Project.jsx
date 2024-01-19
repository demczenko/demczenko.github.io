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
  const [tablesData, setTablesData] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState("de");
  const [tables, setTables] = useState([]);
  const [template, setTemplate] = useState({});
  const [hydratedTemplate, setHydratedTemplate] = useState("");


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
          console.log(project_tables);
          setSlugs(project_tables.map((item) => item.Slug));
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

  function hydrateTemplate(dataSlug, htmlTemplate, slug) {
    const document = new DOMParser().parseFromString(htmlTemplate, "text/html");
    const dataText = Array.from(document.querySelectorAll("[data-text]"));
    const dataSrc = Array.from(document.querySelectorAll("[data-src]"));
    const dataUrl = Array.from(document.querySelectorAll("[data-url]"));
    const dataPlaceholder = Array.from(
      document.querySelectorAll("[data-placeholder]")
    );

    dataSlug = dataSlug.filter(data => data.Slug.toLowerCase() === slug)

    // Iterate over DataText
    for (const node of dataText) {
      const textKey = node.getAttribute("data-text");

      for (const data of dataSlug) {
        if (textKey in data) {
          node.textContent = data[textKey];
        }
      }
    }

    // Iterate over DataSrc
    for (const node of dataSrc) {
      const srcKey = node.getAttribute("data-src");

      for (const data of dataSlug) {
        if (srcKey in data) {
          node.src = data[srcKey];
        }
      }
    }

    // Iterate over DataUrl
    for (const node of dataUrl) {
      const urlKey = node.getAttribute("data-url");

      for (const data of dataSlug) {
        if (urlKey in data) {
          node.href = data[urlKey];
        }
      }
    }

    // Iterate over dataPlaceholder
    for (const node of dataPlaceholder) {
      const placeholderKey = node.getAttribute("data-placeholder");

      for (const data of dataSlug) {
        if (placeholderKey in data) {
          node.placeholder = data[placeholderKey];
        }
      }
    }

    setHydratedTemplate(document.documentElement.innerHTML);
  }

  useEffect(() => {
    if (selectedSlug && template) {
      hydrateTemplate(tablesData, template.template_html, selectedSlug);
    }
  }, [selectedSlug, template]);

  return (
    <PageContainer>
      <Heading
        actions={[
          {
            id: 1,
            name: "Copy",
            onClick: () => alert("Under development"),
          },
          {
            id: 2,
            name: "Export",
            onClick: () => alert("Under development"),
          },
        ]}
        title={loading ? "Loading" : error ? error : project.project_name}
      />
      <div className="mt-6 space-y-4 md:w-1/2 w-full">
        <SlugList
          slugs={availableSlugs}
          selectedSlug={selectedSlug}
          onSlugSelect={(slug) => setSelectedSlug(slug)}
        />
        {selectedSlug && hydratedTemplate && (
          <div className="h-[1000px]">
            <iframe
              className="h-full w-full rounded-md"
              srcDoc={hydratedTemplate}
              frameBorder="0"></iframe>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default Project;