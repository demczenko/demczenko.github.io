import Project from "./Project";

export const ProjectList = ({ projects }) => {
  return (
    <>
      {projects.map((project) => (
        <Project key={project.id} {...project} />
      ))}
    </>
  );
};
