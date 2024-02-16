import { useState } from "react";
import { DrawerModal } from "@/components/Drawer";
import { AddTemplateDrawer } from "./TemplateModal/AddTemplateDrawer";
import { useTemplates } from "@/hooks/templates/useTemplates";
import { PageContainer } from "..";
import { PlusCircle } from "lucide-react";
import TemplateCart from "./TemplateCart";
import RenderList from "@/components/RenderList";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";

const Templates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: templates, isError, isLoading } = useTemplates(`?isarchived=0`);

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (isError) {
    return (
      <ErrorPage title={`Something went wrong while templates loading...`} />
    );
  }

  return (
    <>
      <PageContainer
        action={{
          id: 1,
          name: "Create Template",
          icon: <PlusCircle className="h-4 w-4 mr-2" />,
          onClick: () => setIsModalOpen(true),
        }}
        title="Templates">
        <RenderList list={templates || []} component={TemplateCart} />
      </PageContainer>
      <DrawerModal
        title={"Create template"}
        description={"Enter template name, html template and create tables."}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        content={
          <AddTemplateDrawer onSubmitForm={() => setIsModalOpen(false)} />
        }
      />
    </>
  );
};

export default Templates;
