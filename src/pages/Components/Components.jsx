import PageContainer from "../PageContainer";
import RenderComponentList from "@/components/RenderComponentList";

const Components = () => {
  return (
    <>
      <PageContainer>
        <RenderComponentList isCreate={true} />
      </PageContainer>
    </>
  );
};

export default Components;
