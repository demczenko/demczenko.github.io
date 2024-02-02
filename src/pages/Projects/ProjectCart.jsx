import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardDescription, PreviewTemplate } from "@/components";
import { TemplatesService } from "@/api/templates/init";
import { ProjectService } from "@/api/projects/init";

const ProjectCart = ({
  id,
  project_name,
  createdAt,
  template_id,
  template_json,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigator = useNavigate();
  const [template, setTemplate] = useState([]);

  const handleArchived = (id) => {
    ProjectService.update({
      id,
      project_name,
      template_id,
      isArchived: template.isArchived ? false : true,
    });
    navigator("/projects/archive/");
  };

  const handleDelete = (id) => {
    alert("under development");

    // add delete action for every api
    // TemplatesService.update({...template, isArchived: template.isArchived ? false : true})
  };

  useEffect(() => {
    async function getTemplateList() {
      try {
        const response = await TemplatesService.get();
        if (response.ok) {
          const data = await response.json();
          const template = data.find((template) => template.id === template_id);
          if (template) {
            setTemplate(template);
          } else {
            throw new Error("Template not found.");
          }
        }
      } catch (error) {
        console.warn(error.message);
      }
    }
    getTemplateList();
  }, []);

  const options = useMemo(() => {
    if (template.isArchived) {
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
          name: template.isArchived ? "Un Archive" : "Archive",
          onClick: () => handleArchived(template.id),
        },
        {
          id: 4,
          name: "Delete",
          onClick: () => handleDelete(template.id),
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
          name: template.isArchived ? "Un Archive" : "Archive",
          onClick: () => handleArchived(template.id),
        },
      ];
    }
  }, []);

  return (
    <div>
      <PreviewTemplate
        href={`/projects/${id}`}
        template_html={template.template_html}
      />
      <CardDescription
        id={template.id}
        template_name={template.template_name}
        name={project_name}
        options={options}
        title={"Manage project"}
        createdAt={createdAt}
      />
    </div>
  );
};

export default ProjectCart;
