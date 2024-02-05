import React, { useMemo, useState } from "react";
import { CardDescription, PreviewTemplate } from "@/components";
import { useTemplates } from "@/hooks/useTemplates";
import LoadingPage from "@/LoadingPage";
import ErrorPage from "@/ErrorPage";

const ProjectCart = ({ onDelete, isProjectPage, handleArchived, project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: templates,
    isError,
    isLoading,
    update,
    remove,
  } = useTemplates();

  const template = templates.find(
    (template) => template.id === project.template_id
  );
  const options = useMemo(() => {
    if (project?.isArchived) {
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
          name: project?.isArchived ? "Un Archive" : "Archive",
          onClick: () => handleArchived(project),
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
          name: project?.isArchived ? "Un Archive" : "Archive",
          onClick: () => handleArchived(project),
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

  return (
    <div>
      <PreviewTemplate
        href={`/projects/${project.id}`}
        template_html={template?.template_html}
      />
      <CardDescription
        isProjectPage={isProjectPage}
        id={template?.id}
        template_name={template?.template_name}
        name={project.project_name}
        options={options}
        title={"Manage project"}
        createdAt={project.createdAt}
      />
    </div>
  );
};

export default ProjectCart;
