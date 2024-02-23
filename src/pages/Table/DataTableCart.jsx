import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const DataTableCart = ({ item, table_id, id }) => {
  let name = "project_name" in item ? item.project_name : item.component_name;
  return (
    <Card className="md:max-w-[320px] w-full w-full bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
      <CardHeader>
        <Link to={`/data_tables/${table_id}/${id}`}>
          <CardTitle className="text-white hover:underline">{name}</CardTitle>
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
