import ErrorPage from "@/ErrorPage";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useToast } from "@/components/ui/use-toast";
import { useComponent } from "@/hooks/components/useComponent";
import { useDataTables } from "@/hooks/dataTables/useDataTables";
import { useProjectsStyles } from "@/hooks/projectStyle/useProjectsStyles";
import { useTables } from "@/hooks/tables/useTables";
import { useTemplate } from "@/hooks/templates/useTemplate";
import { useHydrate } from "@/hooks/useHydrate";
import { useEffect, useState } from "react";

const HydratedTemplateView = ({ project, selectedSlug }) => {
  const { toast } = useToast();
  const [hydratedTemplate, setHydratedTemplate] = useState();

  const {
    data: template,
    isError: isTemplateError,
    isLoading: isTemplateLoading,
  } = useTemplate(project.template_id);

  //   GET FOOTER AND HEADER COMPONENTS
  const {
    data: header,
    isLoading: isHeaderLoading,
    isError: isHeaderError,
  } = useComponent(template?.header_id, {
    enabled: !!template?.id && !!template?.header,
  });
  const {
    data: footer,
    isLoading: isFooterLoading,
    isError: isFooterError,
  } = useComponent(template?.footer_id, {
    enabled: !!template?.id && !!template?.footer_id,
  });

  //   GET FOOTER AND HEADER TABLES
  const {
    data: templateTables,
    isError: IsTemplateTablesError,
    isLoading: isTemplateTablesLoading,
  } = useTables(`?template_id=${project.template_id}`);
  const {
    data: headerTables,
    isError: IsHeaderTablesError,
    isLoading: isHeaderTablesLoading,
  } = useTables(`?component_id=${header?.id}`, { enabled: !!header?.id });

  //   GET DATA TABLE CONTENT
  const {
    data: project_data_tables,
    isError: IsDataTableError,
    isLoading: IsDataTableLoading,
  } = useDataTables(`?project_id=${project.id}`);

  const {
    data: components_data_tables,
    isError: Iscomponents_data_tablesError,
    isLoading: Iscomponents_data_tablesLoading,
  } = useDataTables(`?project_id=${project.id}`);

  const {
    data: footerTables,
    isError: IsFooterTablesError,
    isLoading: isFooterTablesLoading,
  } = useTables(`?component_id=${footer?.id}`, { enabled: !!footer?.id });

  //   GET PROJECT STYLES
  const {
    data: projectStyle,
    isError: IsProjectsStylesError,
    isLoading: IsProjectsStylesLoading,
  } = useProjectsStyles(`?project_id=${project.id}`);

  //   FILTER ITEMS WITH SELECTED SLUG
  let project_data_tables_by_selected_slug = project_data_tables?.filter(
    (data) => data.data.slug.toLowerCase() === selectedSlug.toLowerCase()
  );

  let components_data_tables_by_selected_slug = components_data_tables?.filter(
    (data) => data.data.slug.toLowerCase() === selectedSlug.toLowerCase()
  );

  //   COLLECT ALL TABLES INTO 1 ARRAY DATA

  const tables = [];
  if (templateTables) {
    tables.push(...templateTables);
  }
  if (headerTables) {
    tables.push(...headerTables);
  }
  if (footerTables) {
    tables.push(...footerTables);
  }
  const tablesData = [].concat(
    project_data_tables_by_selected_slug,
    components_data_tables_by_selected_slug
  );

  //   RENDER TEMPLATE
  useEffect(() => {
    if (template && tablesData && tables) {
      const hydrated = useHydrate(
        tablesData,
        (header?.component_html ?? "") +
          template.template_html +
          (footer?.component_html ?? ""),
        tables,
        projectStyle
      );
      setHydratedTemplate(hydrated);
    }
  }, [tablesData, tables, template, projectStyle]);

  const handleCopy = () => {
    window.navigator.clipboard.writeText(hydratedTemplate);

    toast({
      variant: "success",
      title: "Copy to clipboard",
      description: "Successfully copied to clipboard.",
    });
  };

  useEffect(() => {
    const handleCopy = (e) => {
      console.log(e.ctrlKey);
    };

    document.addEventListener("keypress", handleCopy);

    return document.removeEventListener("keypress", handleCopy);
  }, []);

  if (
    isTemplateLoading ||
    Iscomponents_data_tablesLoading ||
    isFooterTablesLoading ||
    IsDataTableLoading ||
    isHeaderTablesLoading ||
    isTemplateTablesLoading ||
    isFooterLoading ||
    isHeaderLoading ||
    IsProjectsStylesLoading
  ) {
    return <SkeletonCard isContainer={true} />;
  }

  if (isTemplateError) {
    return (
      <ErrorPage
        title={`Something went wrong while fetching data. Try reload page.`}
      />
    );
  }

  return (
    <div className="absolute inset-0 z-100">
      {hydratedTemplate && (
        <div className="h-full">
          <iframe
            className="w-full h-full rounded-md"
            srcDoc={hydratedTemplate}></iframe>
        </div>
      )}
    </div>
  );
};

export default HydratedTemplateView;
