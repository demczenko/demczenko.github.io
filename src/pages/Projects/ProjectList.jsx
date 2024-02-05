import { Button } from "@/components/ui/button";
import ProjectCart from "./ProjectCart";
import { Heading, List } from "@/components";

export const ProjectList = ({
  isProjectPage,
  handleArchived,
  onDelete,
  onCreate,
  actions,
  projects,
  title,
}) => {
  if (!projects.length) {
    return (
      <div className="fixed top-1/2 -translate-y-1/2 w-3/4 text-center z-10">
        <p className="text-6xl text-neutral-100 font-medium tracking-tight">
          Whooops!
        </p>
        <p className="text-sm text-neutral-400 font-medium mt-4">
          Looks like you don't have any project yet.
        </p>
        <p className="text-neutral-200 font-medium mt-12">
          Start{" "}
          <Button onClick={onCreate} size="sm" variant="ghost">
            creating
          </Button>{" "}
          projects right now!
        </p>
      </div>
    );
  }
  return (
    <div>
      <Heading title={title} actions={actions} />
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
    </div>
  );
};
