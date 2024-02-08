import ErrorPage from "@/ErrorPage";
import PageContainer from "../PageContainer";
import { useTables } from "@/hooks/useTables";
import RenderList from "@/components/RenderList";
import TableCart from "./TableCart";

const Tables = () => {
  const {
    data: tables,
    isError: IsTablesError,
    isLoading: isTablesLoading,
    update: updateTables,
    set: setTables,
  } = useTables();

  if (isTablesLoading) {
    return <LoadingPage title="Loading your tables..." />;
  }

  if (IsTablesError) {
    return (
      <ErrorPage title={"Something went wrong while data table loading..."} />
    );
  }

  return (
    <PageContainer isLoading={isTablesLoading} isError={IsTablesError}>
      <RenderList list={tables} component={TableCart} setTables={setTables} isProject={false} />
    </PageContainer>
  );
};

export default Tables;
