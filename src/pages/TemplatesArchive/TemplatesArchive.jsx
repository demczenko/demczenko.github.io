import { PageContainer } from "..";
import { TemplateList } from "../Templates/TemplateList";
import { useTemplates } from "@/hooks/useTemplates";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "@/components/ui/use-toast";

const TemplatesArchive = () => {
  const { toast } = useToast();
  const { data, isError, isLoading, update, remove } = useTemplates();
  const { data: projects } = useProjects();

  const templates = data.filter((template) => template.isArchived === true);

  const handleArchived = (template) => {
    update({
      ...template,
      isArchived: template.isArchived ? false : true,
    });
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
      <TemplateList
        isTemplatePage={true}
        isProjectPage={false}
        onDelete={handleDelete}
        onArchive={handleArchived}
        title={"Archived templates"}
        templates={templates}
      />
    </PageContainer>
  );
};

export default TemplatesArchive;
