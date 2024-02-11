import { useMemo } from "react";
import { CardDescription, Options } from "@/components";
import { Link } from "react-router-dom";
import { FolderInput, LinkIcon } from "lucide-react";

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
          id: 3,
          name: "Open",
          onClick: () => navigator("/projects/" + id),
        },
        {
          id: 2,
          name: item?.isarchived ? "Un Archive" : "Archive",
          onClick: () => handleArchived(item),
        },
        {
          id: 4,
          name: "Delete",
          onClick: () => onDelete(item.id),
        },
      ];
    } else {
      return [
        {
          id: 3,
          name: "Open",
          onClick: () => navigator("/projects/" + id),
        },
        {
          id: 2,
          name: item?.isarchived ? "Un Archive" : "Archive",
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

function CartView({ project, isProjectPage, options }) {
  return (
    <div className="hover:bg-neutral-700 rounded-md bg-neutral-900 transition-colors p-4 min-w-80 hover:shadow-md">
      <FolderInput className="w-12 h-12 mb-2 text-white" />
      <div className="flex justify-between items-center">
        <Link to={`/projects/${project.id}`}>
          <h2 className="text-2xl text-white font-semibold">
            {project.project_name}
          </h2>
        </Link>
        <Options options={options} title={"Manage project"} />
      </div>
      <p className="text-xs">
        <span className="text-neutral-300">created at: </span>
        <span className="text-white font-semibold">
          {new Date(project.createdat).toDateString()}
        </span>
      </p>
    </div>
  );
}

function ListView({ project, isProjectPage, options }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="hover:bg-neutral-700 px-2 rounded-md bg-neutral-900 transition-colors flex items-center justify-center gap-2">
      <LinkIcon className="h-4 w-4 text-white" />
      <CardDescription
        isProjectPage={isProjectPage}
        name={project.project_name}
        options={options}
        title={"Manage project"}
        createdat={project.createdat}
      />
    </Link>
  );
}

export default ProjectCart;
