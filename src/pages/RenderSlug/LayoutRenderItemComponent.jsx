import ErrorPage from "@/ErrorPage";
import { useComponent } from "@/hooks/components/useComponent";
import { useDataTables } from "@/hooks/dataTables/useDataTables";
import useHydrate from "@/hooks/useHydrate";

const LayoutRenderItemComponent = ({ item, project_id, selectedSlug }) => {
  const {
    data: component,
    isLoading: isComponentLoading,
    isError: isComponentError,
  } = useComponent(item.component_id);

  const {
    data: component_data,
    isError: Iscomponents_data_tablesError,
    isLoading: Iscomponents_data_tablesLoading,
  } = useDataTables(`?component_id=${item.component_id}&slug=${selectedSlug}`);

  const { parsed_template, style } = useHydrate({
    template: component?.component_html,
    data_slug: component_data,
  });

  if (isComponentError) {
    return (
      <ErrorPage title={`Something went wrong while component loading.`} />
    );
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

  return (
    <>
      <style>{style}</style>
      {(renderItems(parsed_template) ?? [""])[0]?.props?.children}
    </>
  );
};

export default LayoutRenderItemComponent;
