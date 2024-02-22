import ErrorPage from "@/ErrorPage";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useComponent } from "@/hooks/components/useComponent";

const LayoutComponent = ({ item }) => {
  const {
    data: component,
    isError: IsComponentError,
    isLoading: IsComponentLoading,
  } = useComponent(item.component_id);

  if (IsComponentLoading) {
    return <SkeletonCard />;
  }

  if (IsComponentError) {
    return (
      <ErrorPage title={`Something went wrong while component loading...`} />
    );
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: component.component_html,
      }}
    ></div>
  );
};

export default LayoutComponent;
