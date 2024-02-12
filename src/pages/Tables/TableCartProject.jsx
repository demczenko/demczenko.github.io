import CardActions from "@/components/CardActions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Import } from "lucide-react";
import { Link } from "react-router-dom";

export function TableCartProject({ item, onTableSelect }) {
  return (
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
              onClick: () => onTableSelect(item),
            },
          ]}
        />
      </CardFooter>
    </Card>
  );
}
