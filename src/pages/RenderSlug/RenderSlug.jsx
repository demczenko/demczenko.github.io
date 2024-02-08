import { Heading } from "@/components";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, CopyIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import BreadCrumbs from "@/components/BreadCrumbs";
import { useProjects } from "@/hooks/useProjects";
import { useTemplates } from "@/hooks/useTemplates";
import { useTables } from "@/hooks/useTables";
import { useDataTables } from "@/hooks/useDataTables";
import { useProjectsStyles } from "@/hooks/useProjectsStyles";
import { SkeletonCard } from "@/components/SkeletonCard";

const RenderSlug = () => {
  const navigator = useNavigate();
  const { id, slug } = useParams();

  const { data: projects, isError, isLoading, update } = useProjects();
  const {
    data: templates,
    isError: isTemplatesError,
    isLoading: isTemplatesLoading,
    update: updateTemplate,
  } = useTemplates();
  const {
    data: dataTbs,
    isError: IsTablesError,
    isLoading: isTablesLoading,
    update: updateTables,
  } = useTables();

  const {
    data: tableData,
    isError: IsDataTableError,
    isLoading: IsDataTableLoading,
    update: updateDataTable,
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

  const [hydratedTemplate, setHydratedTemplate] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("");

  const { toast } = useToast();

  const project = projects.find((project) => project.id === id);
  const template = templates.find((t) => t.id === project.template_id);
  const tables = dataTbs.filter((t) => t.template_id === project.template_id);
  const projectStyle = projectsStyles.filter(
    (table) => table.project_id === project.id
  );
  // Get all tables
  // Get table by name
  // Get table id
  // Sort data table by table id
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
      const textKey = node.getAttribute("data-text").toLowerCase();

      for (const data of dataSlug) {
        if (textKey in data) {
          const dataTable = node.getAttribute("data-table");
          const table = tables.find(
            (table) =>
              table.table_name.toLowerCase() === dataTable.toLowerCase()
          );
          if (table) {
            if (table.id === data.table_id) {
              node.textContent = data[textKey];
            }
          }
        }
      }
    }

    // Iterate over DataSrc
    for (const node of dataSrc) {
      const srcKey = node.getAttribute("data-src").toLowerCase();

      for (const data of dataSlug) {
        if (srcKey in data) {
          const dataTable = node.getAttribute("data-table");
          const table = tables.find(
            (table) =>
              table.table_name.toLowerCase() === dataTable.toLowerCase()
          );
          if (table) {
            if (table.id === data.table_id) {
              node.src = data[srcKey];
            }
          }
        }
      }
    }

    // Iterate over DataUrl
    for (const node of dataUrl) {
      const urlKey = node.getAttribute("data-href").toLowerCase();

      for (const data of dataSlug) {
        if (urlKey in data) {
          const dataTable = node.getAttribute("data-table");
          const table = tables.find(
            (table) =>
              table.table_name.toLowerCase() === dataTable.toLowerCase()
          );
          if (table) {
            if (table.id === data.table_id) {
              node.href = data[urlKey];
            }
          }
        }
      }
    }

    // Iterate over dataPlaceholder
    for (const node of dataPlaceholder) {
      const placeholderKey = node
        .getAttribute("data-placeholder")
        .toLowerCase();

      for (const data of dataSlug) {
        if (placeholderKey in data) {
          const dataTable = node.getAttribute("data-table");
          const table = tables.find(
            (table) =>
              table.table_name.toLowerCase() === dataTable.toLowerCase()
          );
          if (table) {
            if (table.id === data.table_id) {
              node.placeholder = data[placeholderKey];
            }
          }
        }
      }
    }

    const nodes_to_update = document.querySelectorAll("[data-style-id]");

    if (nodes_to_update) {
      for (const node of nodes_to_update) {
        for (const item of projectStyle) {
          if (item.id === node.getAttribute("data-style-id")) {
            Object.assign(node.style, item.style);
          }
        }
      }
    }

    setHydratedTemplate(document.documentElement.outerHTML);
  }

  const project_tables = tableData.filter(
    (table) => table.project_id === project.id
  );

  const slugs = project_tables.map((item) => item.slug);

  const tablesData = project_tables.filter(
    (data) => data.slug.toLowerCase() === slug.toLowerCase()
  );

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

  const handleCopy = () => {
    window.navigator.clipboard.writeText(hydratedTemplate);

    toast({
      variant: "success",
      title: "Copy to clipboard",
      description: "Successfully copied to clipboard.",
    });
  };

  useEffect(() => {
    if (template && tablesData && projectStyle) {
      hydrateTemplate(tablesData, template.template_html);
    }
  }, [tablesData, template, projectStyle]);

  useEffect(() => {
    if (selectedSlug) {
      navigator(`/projects/${project?.id}/${selectedSlug}`);
    }
  }, [project, selectedSlug]);

  if (isLoading) {
    return <SkeletonCard style="w-full xl:h-[1000px] md:h-[600px] h-[400px]" />;
  }

  return (
    <div style={{ backgroundColor: "#ececec" }} className="relative h-full">
      <div className="absolute top-4 left-4 z-10 right-8">
        <Heading
          actions={[
            {
              id: 1,
              name: "Copy",
              onClick: () => handleCopy(),
              icon: <CopyIcon className="h-4 w-4 mr-2" />,
            },
          ]}
          title={
            <div className="flex gap-2 items-center hover:bg-white w-fit px-4 py-1 rounded-md">
              <BreadCrumbs
                items={[
                  {
                    name: "Projects",
                    to: `/projects/`,
                  },
                  {
                    name: project?.project_name,
                    to: `/projects/${project?.id}`,
                  },
                ]}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="capitalize text-sm text-slate-900">
                    {slug}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {availableSlugs.map((item, i) => (
                    <DropdownMenuItem
                      className={`${
                        selectedSlug === item
                          ? "capitalize font-semibold text-slate-800 cursor-pointer hover:bg-slate-300 hover:text-slate-900 hover:font-semibold"
                          : "text-neutral-400 capitalize cursor-pointer hover:bg-slate-300 hover:text-slate-900 hover:font-semibold"
                      }`}
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
      </div>
      <div className="absolute inset-0 z-100">
        {hydratedTemplate && (
          <div className="h-full">
            <iframe
              className="w-full h-full rounded-md"
              srcDoc={hydratedTemplate}></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default RenderSlug;
