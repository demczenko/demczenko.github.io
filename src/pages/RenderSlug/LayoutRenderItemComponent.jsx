import ErrorPage from "@/ErrorPage";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useComponent } from "@/hooks/components/useComponent";
import { useDataTables } from "@/hooks/dataTables/useDataTables";
import { useTables } from "@/hooks/tables/useTables";
import { hydrateTemplate } from "@/hooks/useHydrateNew";

const LayoutRenderItemComponent = ({ item, project_id, selectedSlug }) => {
  const {
    data: component,
    isLoading: isComponentLoading,
    isError: isComponentError,
  } = useComponent(item.component_id);

  const {
    data: component_tables,
    isError: IsTemplateTablesError,
    isLoading: isTemplateTablesLoading,
  } = useTables(`?component_id=${item.component_id}`);

  const {
    data: component_data,
    isError: Iscomponents_data_tablesError,
    isLoading: Iscomponents_data_tablesLoading,
  } = useDataTables(`?component_id=${item.component_id}&slug=${selectedSlug}`);

  if (isComponentLoading) {
    return <SkeletonCard />;
  }

  if (isComponentError) {
    return (
      <ErrorPage title={`Something went wrong while component loading.`} />
    );
  }

  const hydratedComponent = hydrateTemplate({
    template: component?.component_html,
    data_slug: component_data,
    tables: component_tables,
  });
  return <div dangerouslySetInnerHTML={{ __html: hydratedComponent }}></div>;
};

export default LayoutRenderItemComponent;
