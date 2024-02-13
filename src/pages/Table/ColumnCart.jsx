import { Copy, Edit, Trash } from "lucide-react";
import CardActions from "../../components/CardActions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ColumnCart = ({ item, onSelect, onDuplicate, onDelete }) => {
  return (
    <Card className="min-w-[300px] bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
      <CardHeader>
        <CardTitle className="text-white capitalize">
          {item.header}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs">
          <span className="text-neutral-300">created at: </span>
          <span className="text-white font-semibold">
            {new Date(item.createdat).toDateString()}
          </span>
        </p>
      </CardContent>
      {onDelete && onDuplicate && onSelect && (
        <CardFooter className="flex justify-between">
          <CardActions
            actions={[
              {
                id: 1,
                name: "Duplicate",
                icon: <Copy className="w-4 h-4 mr-2" />,
                onClick: () => onDuplicate(item.id),
              },
              {
                id: 2,
                name: "Delete",
                icon: <Trash className="w-4 h-4 mr-2" />,
                onClick: () => onDelete(item.id),
              },
              {
                id: 3,
                name: "Edit",
                icon: <Edit className="w-4 h-4 mr-2" />,
                onClick: () => onSelect(item),
              },
            ]}
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default ColumnCart;
