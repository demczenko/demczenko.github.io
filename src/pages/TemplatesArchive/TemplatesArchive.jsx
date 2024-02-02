import LoadingPage from "@/LoadingPage";
import { PageLayout } from "..";
import { TemplateList } from "../Templates/TemplateList";
import { useTemplates } from "@/hooks/useTemplates";
import ErrorPage from "@/ErrorPage";

const TemplatesArchive = () => {
  const { data, isError, isLoading, update, remove } = useTemplates();

  const templates = data.filter((template) => template.isArchived === true);

  if (isLoading) {
    return <LoadingPage title="Loading your templates..." />;
  }

  if (isError) {
    return (
      <ErrorPage title="Something went wrong while templates loading..." />
    );
  }

  return (
    <div className="w-full">
      <PageLayout
        title="Templates archive"
        content={<TemplateList templates={templates} />}
      />
    </div>
  );
};

export default TemplatesArchive;
