import { Button } from "@/components/ui/button";
import ProjectCart from "./ProjectCart";
import { Heading, List } from "@/components";

export const ProjectList = ({
  isProjectPage,
  handleArchived,
  onDelete,
  projects,
}) => {
  return (
    <List>
      {projects.map((project) => (
        <ProjectCart
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
