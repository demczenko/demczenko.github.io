import ErrorPage from "@/ErrorPage";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useTemplate } from "@/hooks/templates/useTemplate";

const LayoutBody = ({ item }) => {
  const {
    data: template,
    isError: IstemplateError,
    isLoading: IstemplateLoading,
  } = useTemplate(item.template_id);

  if (IstemplateLoading) {
    return <SkeletonCard />;
  }

  if (IstemplateError) {
    return (
      <ErrorPage title={`Something went wrong while template loading...`} />
    );
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: template.template_html,
      }}
    ></div>
  );
};

export default LayoutBody;
