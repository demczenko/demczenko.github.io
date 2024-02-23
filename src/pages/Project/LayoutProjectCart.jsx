import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SlugList from "./SlugList";
import { Link } from "react-router-dom";

const LayoutProjectCart = ({ item, project_id }) => {
  return (
    <Card className="md:max-w-[320px] w-full bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
      <CardHeader>
        <Link to={`/layouts/${item.id}`}>
        <CardTitle className="text-white hover:underline">
          {item.layout_name}
        </CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <SlugList layout_id={item.id} project_id={project_id} />
      </CardContent>
    </Card>
  );
};

export default LayoutProjectCart;
