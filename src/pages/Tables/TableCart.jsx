import { Copy, Loader, Trash2Icon } from "lucide-react";
import CardActions from "../../components/CardActions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useTableDelete } from "@/hooks/tables/useTableDelete";
import { useQueryClient } from "react-query";
import { useTableCreate } from "@/hooks/tables/useTableCreate";
import { useColumnCreate } from "@/hooks/columns/useColumnCreate";
import { useColumns } from "@/hooks/columns/useColumns";



const TableCart = ({ item }) => {
  const { toast } = useToast();
  const client = useQueryClient();

  const {
    mutate: deleteTable,
    isLoading: tableDeleteLoading,
    isError: tableDeleteError,
  } = useTableDelete();
  const {
    mutate: createTable,
    isLoading: tableCreateLoading,
    isError: tableCreateError,
  } = useTableCreate();
  const {
    mutate: createColumn,
    isLoading: columnCreateLoading,
    isError: columnCreateError,
  } = useColumnCreate();

  const {
    data: columns,
    isLoading: isColumnsLoading,
    isError: isColumnsError,
  } = useColumns(`?table_id=${item.id}`);

  const onDuplicate = async (table_id) => {
    const new_template_id = uuidv4();
    const new_table = {
      ...item,
      id: new_template_id,
      table_name: item.table_name + " Copy",
    };

    // Get columns for selected id
    const new_columns = columns.filter(
      (column) => column.table_id === table_id
    );
    // Change columns id
    const change_columns_id = new_columns.map((col) => ({
      ...col,
      id: uuidv4(),
      table_id: new_template_id,
    }));

    createTable(new_table, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to duplicate table",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        client.invalidateQueries("tables");
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Table successfully duplicated",
        });
      },
    });

    for (const column of change_columns_id) {
      createColumn(column, {
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed to duplicate column",
            description: "Something went wrong",
          });
        },
        onSettled: () => {
          client.invalidateQueries("columns");
        },
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Success",
            description: "Column successfully duplicated",
          });
        },
      });
    }
  };

  const onDeleteTable = async () => {
    deleteTable(item.id, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to delete table",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        client.invalidateQueries("tables");
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Table successfully deleted",
        });
      },
    });
  };

  return (
    <Card className="md:max-w-[320px] w-full w-full bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
      <CardHeader>
        <Link to={`/tables/${item.id}`}>
          <CardTitle className="text-white hover:underline">
            {item.table_name}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-xs">
          <span className="text-neutral-300">created at: </span>
          <span className="text-white font-semibold">
            {new Date(item.createdat).toDateString()}
          </span>
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <CardActions
          actions={[
            {
              id: 1,
              name: "Duplicate",
              icon: (
                <>
                  {tableCreateLoading &&
                  columnCreateLoading &&
                  isColumnsLoading ? (
                    <Loader className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Copy className="w-4 h-4 mr-2" />
                  )}
                </>
              ),
              onClick: () => onDuplicate(item.id),
            },
            {
              id: 2,
              name: "Delete",
              icon: (
                <>
                  {tableDeleteLoading ? (
                    <Loader className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Trash2Icon className="h-4 w-4 mr-2" />
                  )}
                </>
              ),
              onClick: () => onDeleteTable(),
            },
          ]}
        />
      </CardFooter>
    </Card>
  );
};

export default TableCart;
