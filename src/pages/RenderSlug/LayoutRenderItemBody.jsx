import ErrorPage from "@/ErrorPage";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useDataTables } from "@/hooks/dataTables/useDataTables";
import { useProjectsStyles } from "@/hooks/projectStyle/useProjectsStyles";
import { useTables } from "@/hooks/tables/useTables";
import { useTemplate } from "@/hooks/templates/useTemplate";
import { hydrateTemplate } from "@/hooks/useHydrateNew";
import React, { useEffect } from "react";

const LayoutRenderItemBody = ({ item, project_id, selectedSlug }) => {
  const {
    data: template,
    isLoading: isComponentLoading,
    isError: isComponentError,
  } = useTemplate(item.template_id);

  const {
    data: template_tables,
    isError: IsTemplateTablesError,
    isLoading: isTemplateTablesLoading,
  } = useTables(`?template_id=${item.template_id}`);

  const {
    data: template_data,
    isError: IsDataTableError,
    isLoading: IsDataTableLoading,
  } = useDataTables(`?project_id=${project_id}`);

  const {
    data: projectStyle,
    isError: IsProjectsStylesError,
    isLoading: IsProjectsStylesLoading,
  } = useProjectsStyles(`?project_id=${project_id}`);

  const hydratedTemplate = hydrateTemplate({
    template: template?.template_html,
    data_slug: template_data?.filter((item) => item.data.slug === selectedSlug),
    tables: template_tables,
    projectStyle: projectStyle,
  });

  if (isComponentLoading) {
    return <SkeletonCard />;
  }

  if (isComponentError) {
    return <ErrorPage title={`Something went wrong while template loading.`} />;
  }

  return <div dangerouslySetInnerHTML={{ __html: hydratedTemplate }}></div>;
};

export default LayoutRenderItemBody;
