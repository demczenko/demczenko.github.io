import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardDescription } from "@/components";
import { Badge } from "@/components/ui/badge";
import { TemplatesService } from "@/api/templates/init";

const Project = ({ id, project_name, template_id, template_json }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [template, setTemplate] = useState([]);

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
        onClick: () => alert("Under development"),
      },
    ];
  }, []);

  return (
    <div>
      <Link
        to={id}
        className="group flex rounded-xl overflow-hidden  max-w-[320px] hover:-translate-y-2 hover:shadow-2xl shadow-xl transition-transform cursor-pointer">
        <img
          src="https://placehold.co/300x400"
          className="block w-full h-full"
          alt=""
        />
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
