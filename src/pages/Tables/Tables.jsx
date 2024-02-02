import ErrorPage from "@/ErrorPage";
import PageContainer from "../PageContainer";
import TablesList from "./TableList";
import { useTables } from "@/hooks/useTables";

const Tables = () => {
  const {
    data: tables,
    isError: IsTablesError,
    isLoading: isTablesLoading,
    update: updateTables,
    set: setTables,
  } = useTables();

  if (IsTablesError) {
    return <ErrorPage title={"Something went wrong while data table loading..."} />;
  }

  return (
    <PageContainer>
      <>
        {isLoading ? (
          <LoadingPage title="Loading your table data..." />
        ) : (
          <TablesList setTables={setTables} isProject={false} tables={tables} />
        )}
      </>
    </PageContainer>
  );
};

export default Tables;
