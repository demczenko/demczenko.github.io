import { useProjects } from "@/hooks/useProjects";
import { PageContainer } from "..";
import { ProjectList } from "../Projects/ProjectList";
import LoadingPage from "@/LoadingPage";
import ErrorPage from "@/ErrorPage";
import { useProjectsStyles } from "@/hooks/useProjectsStyles";
import { useToast } from "@/components/ui/use-toast";

const ProjectsArchive = () => {
  const { toast } = useToast()
  const { data, isError, isLoading, update } = useProjects();
  const {
    data: tablesData,
    isError: IsDataTableError,
    isLoading: IsDataTableLoading,
    update: updateDataTable,
    set,
  } = useDataTables();

  const {
    data: projectsStyles,
    isError: IsProjectsStyles,
    isLoading: IsrojectsStyles,
    update: updateProjectsStyles,
    set: setProjectsStyles,
    remove: removeProjectsStyles,
  } = useProjectsStyles();

  const projects = data.filter((project) => project.isArchived === true);

  if (isLoading) {
    return <LoadingPage title="Loading your projects..." />;
  }

  if (isError) {
    return <ErrorPage title="Something went wrong while projects loading..." />;
  }

  const handleArchived = (project) => {
    update({ ...project, isArchived: project.isArchived ? false : true });
  };

  const handleDelete = (id) => {
    const isTablesExists = tablesData.filter(
      (table) => table.project_id === id
    );
    const projectsStyles = projectsStyles.filter(
      (table) => table.project_id === id
    );
    if (isTablesExists.length > 0) {
      toast({
        variant: "destructive",
        title: "Failed to delete project",
        description: "Firstly delete all data tables",
      });
    } else if (projectsStyles.length > 0) {
      toast({
        variant: "destructive",
        title: "Failed to delete project",
        description: "Firstly delete all project styles",
      });
    } else {
      remove(id);
      toast({
        variant: "success",
        title: "Deleted",
        description: "Project deleted successfully",
      });
    }
  };

  return (
    <PageContainer>
      {isLoading ? (
        <LoadingPage title="Loading your projects..." />
      ) : (
        <ProjectList
          title={"Archived projects"}
          isProjectPage={true}
          onDelete={handleDelete}
          handleArchived={handleArchived}
          projects={projects}
        />
      )}
    </PageContainer>
  );
};

export default ProjectsArchive;
