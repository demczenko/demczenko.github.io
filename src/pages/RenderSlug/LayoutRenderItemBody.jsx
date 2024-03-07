import ErrorPage from "@/ErrorPage";
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

  if (isTemplateError) {
    return <ErrorPage title={`Something went wrong while template loading.`} />;
  }

  return (
    <>
      <style>{style}</style>
      {parsed_template && parsed_template[0].props.children}
    </>
  );
};

export default LayoutRenderItemBody;
