import ProjectCart from "./ProjectCart";
import { List } from "@/components";

export const ProjectList = ({
  isProjectPage,
  handleArchived,
  onDelete,
  projects,
  view,
}) => {
  return (
    <List>
      {projects.map((project) => (
        <ProjectCart
          view={view}
          isProjectPage={isProjectPage}
          key={project.id}
          onDelete={() => onDelete(project.id)}
          handleArchived={handleArchived}
          project={project}
        />
      ))}
    </List>
  );
};
