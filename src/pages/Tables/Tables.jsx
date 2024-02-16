import TableCart from "./TableCart";
import PageContainer from "../PageContainer";
import RenderList from "@/components/RenderList";
import { useTables } from "@/hooks/tables/useTables";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";

const Tables = () => {
  const {
    data: tables,
    isError: IsTablesError,
    isLoading: isTablesLoading,
  } = useTables();

  if (isTablesLoading) {
    return <SkeletonCard />;
  }

  if (IsTablesError) {
    return <ErrorPage title={`Something went wrong while tables loading...`} />;
  }

  return (
    <PageContainer title={"Tables"}>
      <RenderList list={tables || []} component={TableCart} />
    </PageContainer>
  );
};

export default Tables;
