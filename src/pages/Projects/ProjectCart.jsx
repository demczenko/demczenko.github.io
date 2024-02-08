import React, { useMemo, useState } from "react";
import { CardDescription, PreviewTemplate } from "@/components";
import { useTemplates } from "@/hooks/useTemplates";
import LoadingPage from "@/LoadingPage";
import ErrorPage from "@/ErrorPage";
import { Link } from "react-router-dom";
import { LinkIcon } from "lucide-react";

const ProjectCart = ({
  onDelete,
  isProjectPage,
  handleArchived,
  item,
  view,
}) => {
  view = view ? view : "cart";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: templates,
    isError,
    isLoading,
    update,
    remove,
  } = useTemplates();

  const template = templates.find(
    (template) => template.id === item?.template_id
  );
  const options = useMemo(() => {
    if (item?.isarchived) {
      return [
        {
          id: 3,
          name: "Open",
          onClick: () => navigator("/projects/" + id),
        },
        {
          id: 1,
          name: "Rename",
          onClick: () => setIsModalOpen(true),
        },
        {
          id: 2,
          name: item?.isarchived ? "Un Archive" : "Archive",
          onClick: () => handleArchived(item),
        },
        {
          id: 4,
          name: "Delete",
          onClick: () => onDelete(),
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
          id: 1,
          name: "Rename",
          onClick: () => setIsModalOpen(true),
        },
        {
          id: 2,
          name: item?.isarchived ? "Un Archive" : "Archive",
          onClick: () => handleArchived(item),
        },
      ];
    }
  }, []);

  if (isLoading) {
    return <LoadingPage title="Loading your template..." />;
  }

  if (isError) {
    return (
      <ErrorPage title="Something went wrong while templates loading..." />
    );
  }

  if (view === "cart") {
    return (
      <CartView
        project={item}
        isProjectPage={isProjectPage}
        template={template}
        options={options}
      />
    );
  }

  if (view === "list") {
    return (
      <ListView
        project={item}
        isProjectPage={isProjectPage}
        template={template}
        options={options}
      />
    );
  }
};

function CartView({ project, isProjectPage, template, options }) {
  return (
    <div>
      <PreviewTemplate
        href={`/projects/${project?.id}`}
        template_html={template?.template_html}
      />
      <CardDescription
        isProjectPage={isProjectPage}
        id={template?.id}
        template_name={template?.template_name}
        name={project?.project_name}
        options={options}
        title={"Manage project"}
        createdat={project?.createdat}
      />
    </div>
  );
}

function ListView({ project, isProjectPage, template, options }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="hover:bg-neutral-700 px-2 rounded-md bg-neutral-900 transition-colors flex items-center justify-center gap-2">
        <LinkIcon className="h-4 w-4 text-white" />
      <CardDescription
        isProjectPage={isProjectPage}
        id={template?.id}
        template_name={template?.template_name}
        name={project.project_name}
        options={options}
        title={"Manage project"}
        createdat={project.createdat}
      />
    </Link>
  );
}

export default ProjectCart;
