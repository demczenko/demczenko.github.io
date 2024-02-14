import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Archive, LinkIcon, Trash2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardActions from "@/components/CardActions";

const ProjectCart = ({
  onDelete,
  isProjectPage,
  handleArchived,
  item,
  view,
}) => {
  view = view ? view : "cart";

  const options = useMemo(() => {
    if (item?.isarchived) {
      return [
        {
          id: 2,
          name: item?.isarchived ? "Un Archive" : "Archive",
          icon: <Archive className="h-4 w-4 mr-2" />,

          onClick: () => handleArchived(item),
        },
        {
          id: 4,
          name: "Delete",
          icon: <Trash2Icon className="h-4 w-4 mr-2" />,
          onClick: () => onDelete(item.id),
        },
      ];
    } else {
      return [
        {
          id: 2,
          name: item?.isarchived ? "Un Archive" : "Archive",
          icon: <Archive className="h-4 w-4 mr-2" />,

          onClick: () => handleArchived(item),
        },
      ];
    }
  }, []);

  if (view === "cart") {
    return (
      <CartView
        project={item}
        isProjectPage={isProjectPage}
        options={options}
      />
    );
  }

  if (view === "list") {
    return (
      <ListView
        project={item}
        isProjectPage={isProjectPage}
        options={options}
      />
    );
  }
};

function CartView({ project, options }) {
  return (
    <Card className="min-w-[300px] bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
      <CardHeader>
        <Link to={`/projects/${project.id}`}>
          <CardTitle className="text-white hover:underline">
            {project.project_name}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-xs">
          <span className="text-neutral-300">created at: </span>
          <span className="text-white font-semibold">
            {new Date(project.createdat).toDateString()}
          </span>
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <CardActions actions={options} />
      </CardFooter>
    </Card>
  );
}

function ListView({ project, options }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="hover:bg-neutral-700 p-4 py-3 rounded-md bg-neutral-900 transition-colors flex items-center justify-center gap-2">
      <LinkIcon className="h-4 w-4 text-white" />
      <CardTitle className="text-white hover:underline">
        {project.project_name}
      </CardTitle>
    </Link>
  );
}

export default ProjectCart;
