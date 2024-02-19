import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const DataTableCart = ({ item }) => {
  return (
    <Card className="max-w-[320px] w-full bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
      <CardHeader>
        <Link to={`/data_tables/${item.id}`}>
          <CardTitle className="text-white hover:underline">
            {item.project_name}
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
    </Card>
  );
};

export default DataTableCart;