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
import { useState } from "react";
import { useColumns } from "@/hooks/columns/useColumns";
import { useToast } from "@/components/ui/use-toast";

export function TableCartFulFill({ item, id, key_id }) {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: columns,
    isLoading,
    isError,
  } = useColumns(`?table_id=${item.id}`);

  return (
    <>
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
                name: "Populate",
                icon: <Import className="w-4 h-4 mr-2" />,
                onClick: () => {
                  if (columns?.length) {
                    setIsModalOpen(true);
                  } else {
                    toast({
                      variant: "destructive",
                      title: "Failed to populate table",
                      description: "Please add columns to the table",
                    });
                  }
                },
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
            setIsModalOpen={setIsModalOpen}
            table_id={item.id}
            id={id}
            key_id={key_id}
          />
        }
      />
    </>
  );
}
