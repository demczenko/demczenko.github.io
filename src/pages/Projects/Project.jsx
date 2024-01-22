import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardDescription } from "@/components";
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
      <div className="flex justify-between">
        <Link to={`/templates/${template.id}`}>
          <Badge variant={"secondary"}>
            <LinkIcon className="h-4 w-4 pr-2" />
            {template.template_name}
          </Badge>
        </Link>
        <div>
          <p className="text-xs font-semibold text-neutral-300">
            created at: {new Date(createdAt).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Project;
