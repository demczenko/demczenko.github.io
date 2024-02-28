import ErrorPage from "@/ErrorPage";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useDataTables } from "@/hooks/dataTables/useDataTables";
import { useProjectsStyles } from "@/hooks/projectStyle/useProjectsStyles";
import { useTemplate } from "@/hooks/templates/useTemplate";
import useHydrate from "@/hooks/useHydrate";

const LayoutRenderItemBody = ({ item, project_id, selectedSlug }) => {
  const {
    data: template,
    isLoading: isTemplateLoading,
    isError: isTemplateError,
  } = useTemplate(item.template_id);

  const {
    data: template_data,
    isError: IsDataTableError,
    isLoading: IsDataTableLoading,
  } = useDataTables(`?project_id=${project_id}&slug=${selectedSlug}`);

  const {
    data: projectStyle,
    isError: IsProjectsStylesError,
    isLoading: IsProjectsStylesLoading,
  } = useProjectsStyles(`?project_id=${project_id}`);

  const { parsed_template, style } = useHydrate({
    template: template?.template_html,
    data_slug: template_data,
  });

  if (isTemplateLoading) {
    return <SkeletonCard />;
  }

  if (isTemplateError) {
    return <ErrorPage title={`Something went wrong while template loading.`} />;
  }

  const renderItems = (items) => {
    return items?.map(({ Component, props }, i) => {
      if (props.children.length > 0) {
        return (
          <Component key={i} {...props}>
            {renderItems(props.children)}
          </Component>
        );
      } else {
        return <Component key={i} {...props} />;
      }
    });
  };

  return <>{renderItems(parsed_template)}</>;
};

export default LayoutRenderItemBody;
