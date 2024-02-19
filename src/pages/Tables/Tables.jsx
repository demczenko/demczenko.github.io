import TableCart from "./TableCart";
import PageContainer from "../PageContainer";
import RenderList from "@/components/RenderList";

const Tables = () => {
  return (
    <PageContainer title={"Tables"}>
      <RenderList service={"tables"} component={TableCart} />
    </PageContainer>
  );
};

export default Tables;
