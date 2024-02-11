import { PageContainer } from "..";
import { useProjectsStyles } from "@/hooks/useProjectsStyles";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "@/components/ui/use-toast";
import RenderList from "@/components/RenderList";
import ProjectCart from "../Projects/ProjectCart";
import { useDataTables } from "@/hooks/useDataTables";

const ProjectsArchive = () => {
  const { toast } = useToast();
  const { data, isError, isLoading, update, remove } = useProjects();
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

  const projects = data.filter((project) => project.isarchived === true);

  const handleArchived = (project) => {
    update({ ...project, isarchived: project.isarchived ? false : true });
  };

  const handleDelete = async (id) => {
    const isTablesExists = tablesData.filter(
      (table) => table.project_id === id
    );
    const projectsStylesFiltered = projectsStyles.filter(
      (table) => table.project_id === id
    );

    console.log(isTablesExists);
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
          description: "Firstly delete all project styles",
        });
      }
    }
  };

  return (
    <PageContainer
      isLoading={isLoading}
      isError={isError}
      title={"Arhived projects"}
    >
      <RenderList
        handleArchived={handleArchived}
        onDelete={handleDelete}
        list={projects}
        component={ProjectCart}
        isProjectPage={true}
      />
    </PageContainer>
  );
};

export default ProjectsArchive;
