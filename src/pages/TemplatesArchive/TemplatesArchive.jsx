import LoadingPage from "@/LoadingPage";
import { PageContainer } from "..";
import { TemplateList } from "../Templates/TemplateList";
import { useTemplates } from "@/hooks/useTemplates";
import ErrorPage from "@/ErrorPage";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "@/components/ui/use-toast";

const TemplatesArchive = () => {
  const { toast } = useToast();
  const { data, isError, isLoading, update, remove } = useTemplates();
  const { data: projects } = useProjects();

  const templates = data.filter((template) => template.isArchived === true);

  if (isLoading) {
    return <LoadingPage title="Loading your templates..." />;
  }

  if (isError) {
    return (
      <ErrorPage title="Something went wrong while templates loading..." />
    );
  }

  const handleArchived = (template) => {
    update({
      ...template,
      isArchived: template.isArchived ? false : true,
    });
  };
  const handleDelete = (id) => {
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
      remove(id);
      toast({
        variant: "success",
        title: "Deleted",
        description: "Template deleted successfully",
      });
    }
  };

  return (
    <PageContainer>
      {isLoading ? (
        <LoadingPage title="Loading your projects..." />
      ) : (
        <TemplateList
          isTemplatePage={true}
          isProjectPage={false}
          onDelete={handleDelete}
          onArchive={handleArchived}
          title={"Archived templates"}
          templates={templates}
        />
      )}
    </PageContainer>
  );
};

export default TemplatesArchive;
