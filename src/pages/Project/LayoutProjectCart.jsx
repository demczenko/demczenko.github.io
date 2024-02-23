import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SlugList from "./SlugList";

const LayoutProjectCart = ({ item, project_id }) => {
  return (
    <Card className="md:max-w-[320px] w-full w-full bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
      <CardHeader>
        <CardTitle className="text-white hover:underline">
          {item.layout_name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SlugList layout_id={item.id} project_id={project_id} />
      </CardContent>
    </Card>
  );
};

export default LayoutProjectCart;
