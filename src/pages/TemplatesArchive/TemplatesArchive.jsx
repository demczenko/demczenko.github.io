import { PageContainer } from "..";
import { useTemplates } from "@/hooks/templates/useTemplates";
import RenderList from "@/components/RenderList";
import TemplateCart from "../Templates/TemplateCart";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";

const TemplatesArchive = () => {
  const { data: templates, isError, isLoading } = useTemplates(`?isarchived=1`);

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (isError) {
    return (
      <ErrorPage title={`Something went wrong while components loading...`} />
    );
  }

  return (
    <PageContainer title={"Archived templates"}>
      <RenderList component={TemplateCart} list={templates} />
    </PageContainer>
  );
};

export default TemplatesArchive;
