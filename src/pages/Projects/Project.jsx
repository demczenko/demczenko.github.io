import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardDescription, PreviewTemplate } from "@/components";
import { Badge } from "@/components/ui/badge";
import { TemplatesService } from "@/api/templates/init";
import { ProjectService } from "@/api/projects/init";
import { LinkIcon } from "lucide-react";

const Project = ({
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
    ProjectService.updateProject({
      id,
      project_name,
      template_id,
      isArchived: template.isArchived ? false : true,
    });
    navigator("/projects/archive/");
  };

  useEffect(() => {
    async function getTemplateList() {
      try {
        const response = await TemplatesService.getTemplates();
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
        name: "Archive",
        onClick: () => handleArchived(id),
      },
    ];
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

export default Project;
