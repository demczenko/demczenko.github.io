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

export function TableCartFulFill({ item, id, key_id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="max-w-[320px] w-full bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
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
