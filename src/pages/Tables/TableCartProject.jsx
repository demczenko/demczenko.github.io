import CardActions from "@/components/CardActions";
import { DrawerModal } from "@/components/Drawer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Import } from "lucide-react";
import { Link } from "react-router-dom";
import TableFulfill from "../Projects/ProjectsModal/TableFulfill";
import { useQueryClient } from "react-query";
import { useState } from "react";
import { useDataTableCreate } from "@/hooks/dataTables/useDataTableCreate";
import { useToast } from "@/components/ui/use-toast";

export function TableCartProject({ item, project_id }) {
  const { toast } = useToast();
  const client = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    mutate: createDataTable,
    isLoading: isDataTableLoading,
    isError: isDataTableError,
  } = useDataTableCreate();

  const handleImport = async (data) => {
    const new_data_table = {
      ...data,
      project_id: project_id,
    };
    createDataTable(new_data_table, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to create data table",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        setIsModalOpen(false);
        client.invalidateQueries(`data-table-${item.id}`);
        client.invalidateQueries(`data-tables`);
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Created",
          description: "Table data has been successfully created",
        });
      },
    });
  };

  return (
    <>
      <Card className="min-w-[300px] bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
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
                name: "Populate",
                icon: <Import className="w-4 h-4 mr-2" />,
                onClick: () => setIsModalOpen(true),
              },
            ]}
          />
        </CardFooter>
      </Card>
      <DrawerModal
        title={`Populate ${item.table_name} table`}
        description={"Import CSV file or fulfill data manually"}
        open={isModalOpen}
        onOpenChange={() => {
          setIsModalOpen(false);
        }}
        content={
          <TableFulfill
            isLoading={isDataTableLoading}
            onSubmit={handleImport}
            setIsModalOpen={setIsModalOpen}
            table_id={item.id}
          />
        }
      />
    </>
  );
}
