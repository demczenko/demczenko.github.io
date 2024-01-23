import { Heading } from "@/components";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageContainer from "../PageContainer";
import { TabledataService } from "@/api/tables data/init";
import { TemplatesService } from "@/api/templates/init";
import { ProjectService } from "@/api/projects/init";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { TableService } from "@/api/tables/init";

const RenderSlug = () => {
  const navigator = useNavigate();
  const { id, slug } = useParams();
  const [hydratedTemplate, setHydratedTemplate] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedSlug, setSelectedSlug] = useState("");
  const [slugs, setSlugs] = useState([]);

  const [project, setProject] = useState(null);
  const [template, setTemplate] = useState({});
  const [tablesData, setTablesData] = useState([]);
  const [tables, setTables] = useState([]);

  function hydrateTemplate(dataSlug, htmlTemplate) {
    const document = new DOMParser().parseFromString(htmlTemplate, "text/html");
    const dataText = Array.from(document.querySelectorAll("[data-text]"));
    const dataSrc = Array.from(document.querySelectorAll("[data-src]"));
    const dataUrl = Array.from(document.querySelectorAll("[data-href]"));
    const dataPlaceholder = Array.from(
      document.querySelectorAll("[data-placeholder]")
    );

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
      const urlKey = node.getAttribute("data-href");
      
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

  // Fetch all projects
  // TODO
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
          } else {
            throw new Error("Project not found.");
          }
        }
      } catch (error) {
        setLoading(false);
      }
    }

    getProject();
  }, []);

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
  }, [project, selectedSlug]);

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
          setTablesData(
            project_tables.filter(
              (data) => data.Slug.toLowerCase() === slug.toLowerCase()
            )
          );
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    if (project) {
      getTableData();
    }
  }, [project, selectedSlug, slug]);

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
  }, [project, selectedSlug]);

  useEffect(() => {
    if (template && tablesData) {
      hydrateTemplate(tablesData, template.template_html);
    }
  }, [tablesData, template]);

  useEffect(() => {
    if (selectedSlug) {
      navigator(`/projects/${project?.id}/${selectedSlug}`);
    }
  }, [project, selectedSlug]);

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
        title={
          <div className="flex gap-2 items-center">
            <Link to={`/projects/`}>Projects</Link>
            {" / "}
            <Link to={`/projects/${project?.id}`}>{project?.project_name}</Link>
            {" / "}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="secondary">
                  {slug}
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {availableSlugs.map((item, i) => (
                  <DropdownMenuItem
                    onClick={() => setSelectedSlug(item)}
                    key={i}>
                    {item}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      />
      <div className="mt-6 space-y-4 w-full">
        {hydratedTemplate && (
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

export default RenderSlug;
