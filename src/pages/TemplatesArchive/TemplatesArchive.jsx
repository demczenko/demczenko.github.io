import { PageContainer } from "..";
import RenderList from "@/components/RenderList";
import TemplateCart from "../Templates/TemplateCart";

const TemplatesArchive = () => {
  return (
    <PageContainer title={"Archived templates"}>
      <RenderList
        component={TemplateCart}
        query={`?isarchived=1`}
        service={"templates"}
      />
    </PageContainer>
  );
};

export default TemplatesArchive;
