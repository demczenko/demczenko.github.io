import { Heading } from "@/components";
import { PageContainer } from "..";
import Project from "./Project";

export const ProjectList = ({ projects }) => {
  if (!projects.length) {
    return (
      <PageContainer>
        <Heading title={"Projects not found."} />
      </PageContainer>
    );
  }
  return (
    <>
      {projects.map((project) => (
        <Project key={project.id} {...project} />
      ))}
    </>
  );
};
