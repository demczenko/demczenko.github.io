import { PageContainer } from "..";
import RenderList from "@/components/RenderList";
import ProjectCart from "../Projects/ProjectCart";

const ProjectsArchive = () => {
  return (
    <PageContainer title={"Arhived projects"}>
      <RenderList
        service={"projects"}
        query={`?isarchived=1`}
        component={ProjectCart}
      />
    </PageContainer>
  );
};

export default ProjectsArchive;
