import { PageContainer } from "..";
import { ProjectList } from "../Projects/ProjectList";
import { useProjectsStyles } from "@/hooks/useProjectsStyles";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "@/components/ui/use-toast";

const ProjectsArchive = () => {
  const { toast } = useToast();
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

  const handleArchived = (project) => {
    update({ ...project, isArchived: project.isArchived ? false : true });
  };

  const handleDelete = async (id) => {
    const isTablesExists = tablesData.filter(
      (table) => table.project_id === id
    );
    const projectsStylesFiltered = projectsStyles.filter(
      (table) => table.project_id === id
    );
    if (isTablesExists.length > 0) {
      toast({
        variant: "destructive",
        title: "Failed to delete project",
        description: "Firstly delete all data tables",
      });
    } else if (projectsStylesFiltered.length > 0) {
      toast({
        variant: "destructive",
        title: "Failed to delete project",
        description: "Firstly delete all project styles",
      });
    } else {
      const candidate = await remove(id);
      if (candidate) {
        toast({
          variant: "success",
          title: "Deleted",
          description: "Project deleted successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to delete project",
          description: "Something went wrong",
        });
      }
    }
  };

  return (
    <PageContainer
      isLoading={isLoading}
      isError={isError}
      title={"Arhived projects"}>
      <ProjectList
        title={"Archived projects"}
        isProjectPage={true}
        onDelete={handleDelete}
        handleArchived={handleArchived}
        projects={projects}
      />
    </PageContainer>
  );
};

export default ProjectsArchive;
