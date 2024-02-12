import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import CardActions from "../../components/CardActions";
import { TrashIcon } from "lucide-react";

const ComponentCart = ({ item, onDelete }) => {
  return (
    <Card className="min-w-[300px] bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
      <CardHeader>
        <Link to={item.id}>
          <CardTitle className="text-white hover:underline">{item.component_name}</CardTitle>
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
              onClick: () => onDelete(item.id),
              icon: <TrashIcon className="w-4 h-4 mr-2" />,
              name: "Delete",
            },
          ]}
        />
      </CardFooter>
    </Card>
  );
};

export default ComponentCart;
