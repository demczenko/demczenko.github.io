import ErrorPage from "@/ErrorPage";
import PageContainer from "../PageContainer";
import { useTables } from "@/hooks/useTables";
import RenderList from "@/components/RenderList";
import TableCart from "./TableCart";
import { useToast } from "@/components/ui/use-toast";

const Tables = () => {
  const {
    data: tables,
    isError: IsTablesError,
    isLoading: isTablesLoading,
    update: updateTables,
    set: setTables,
    remove: removeTable
  } = useTables();
  const { toast } = useToast();

  if (IsTablesError) {
    return (
      <ErrorPage title={"Something went wrong while data table loading..."} />
    );
  }

  const onDeleteTable = async (table_id) => {
    const candidate = await removeTable(table_id);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Table successfully deleted",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to delete table",
        description: "Something went wrong",
      });
    }
  };

  return (
    <PageContainer isLoading={isTablesLoading} isError={IsTablesError}>
      <RenderList
        list={tables}
        onDeleteTable={onDeleteTable}
        component={TableCart}
        setTables={setTables}
        isProject={false}
      />
    </PageContainer>
  );
};

export default Tables;
