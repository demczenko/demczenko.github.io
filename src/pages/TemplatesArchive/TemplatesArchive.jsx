import { PageContainer } from "..";
import { useTemplates } from "@/hooks/useTemplates";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "@/components/ui/use-toast";
import RenderList from "@/components/RenderList";
import TemplateCart from "../Templates/TemplateCart";

const TemplatesArchive = () => {
  const { toast } = useToast();
  const { data, isError, isLoading, update, remove } = useTemplates();
  const { data: projects } = useProjects();

  const templates = data.filter((template) => template.isarchived === true);

  const handleArchived = async (template) => {
    const candidate = await update({
      id: template.id,
      isarchived: template.isarchived ? false : true,
    });

    if (candidate) {
      toast({
        variant: "success",
        title: "Archived",
        description: "Template successfully archived",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to archive template",
        description: "Something went wrong",
      });
    }
  };
  const handleDelete = async (id) => {
    const isProjectsExists = projects.filter(
      (project) => project.template_id === id
    );
    if (isProjectsExists.length > 0) {
      toast({
        variant: "destructive",
        title: "Failed to delete template",
        description: "Firstly delete all projects",
      });
    } else {
      const candidate = await remove(id);
      if (candidate) {
        toast({
          variant: "success",
          title: "Deleted",
          description: "Template deleted successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to delete template",
          description: "Something went wrong",
        });
      }
    }
  };

  return (
    <PageContainer
      isLoading={isLoading}
      isError={isError}
      title={"Archived templates"}>
      <RenderList
        component={TemplateCart}
        list={templates}
        isTemplatePage={true}
        isProjectPage={false}
        onDelete={handleDelete}
        onArchive={handleArchived}
      />
    </PageContainer>
  );
};

export default TemplatesArchive;
