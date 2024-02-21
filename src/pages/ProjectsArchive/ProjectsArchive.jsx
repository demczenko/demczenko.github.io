import { PageContainer } from "..";
import RenderProjectList from "@/components/RenderProjectList";

const ProjectsArchive = () => {
  return (
    <PageContainer>
      <RenderProjectList
        title={"Arhived projects"}
        service={"projects"}
        query={`?isarchived=1`}
      />
    </PageContainer>
  );
};

export default ProjectsArchive;
