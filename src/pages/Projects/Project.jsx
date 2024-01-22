import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardDescription } from "@/components";
import { Badge } from "@/components/ui/badge";
import { TemplatesService } from "@/api/templates/init";
import { ProjectService } from "@/api/projects/init";

const Project = ({ id, project_name, template_id, template_json }) => {
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
        onClick: () => navigate("/projects/" + id),
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
      <Link
        to={`/projects/${id}`}
        className="group flex rounded-xl overflow-hidden  max-w-[320px] hover:-translate-y-2 hover:shadow-2xl shadow-xl transition-transform cursor-pointer">
        <iframe
          className="max-w-[300px] h-[400px] pointer-events-none"
          srcDoc={template.template_html}></iframe>
      </Link>
      <CardDescription
        name={project_name}
        options={options}
        title={"Manage project"}
      />
      <Badge>{template.template_name}</Badge>
    </div>
  );
};

export default Project;
