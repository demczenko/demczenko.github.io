import TableCart from "./TableCart";
import PageContainer from "../PageContainer";
import RenderList from "@/components/RenderList";
import { useTables } from "@/hooks/useTables";
import { useToast } from "@/components/ui/use-toast";
import { useDataTables } from "@/hooks/useDataTables";

const Tables = () => {
  const {
    data: tables,
    isError: IsTablesError,
    isLoading: isTablesLoading,
    update: updateTables,
    set: setTables,
    remove: removeTable,
  } = useTables();

  const {
    data: tablesData,
    isError: IsDataTableError,
    isLoading: IsDataTableLoading,
    update: updateDataTable,
    set,
  } = useDataTables();

  const { toast } = useToast();

  const onDeleteTable = async (id) => {
    const isTablesExists = tablesData.filter((table) => table.table_id === id);

    if (isTablesExists.length > 0) {
      toast({
        variant: "destructive",
        title: "Failed to delete table",
        description: "Firstly delete all data tables",
      });
      return;
    }

    const candidate = await removeTable(id);
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
    <PageContainer title={"Tables"} isLoading={isTablesLoading} isError={IsTablesError}>
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
