import { Heading } from "@/components";
import Project from "./Project";

export const ProjectList = ({ projects }) => {
  if (!projects.length) {
    return <Heading title={"Projects not found."} />;
  }
  return (
    <>
      {projects.map((project) => (
        <Project key={project.id} {...project} />
      ))}
    </>
  );
};
