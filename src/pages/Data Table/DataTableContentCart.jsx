import CardActions from "@/components/CardActions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";

const DataTableContentCart = ({ item, handleUpdate }) => {
  return (
    <Card className="min-w-[300px] bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
      <CardHeader>
        <CardTitle className="text-white capitalize">
          {item.data.slug}
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
      <CardFooter>
        <CardActions actions={[
          {
            id: 1,
            name: "Edit",
            icon: <Edit className="h-4 w-4 mr-2" />,
            onClick: () => handleUpdate(item),
          }
        ]} />
      </CardFooter>
    </Card>
  );
};

export default DataTableContentCart;
