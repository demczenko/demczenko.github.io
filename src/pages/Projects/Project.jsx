import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { Options } from "@/components";
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
      <div className="flex mt-4">
        <div className="w-full font-medium text-white overflow-hidden truncate">
          <span className="mr-4">{project_name}</span>
        </div>
        <div className="w-1/2 flex gap-2 justify-end items-center">
          <Badge>{template.template_name}</Badge>
          <Options
            options={[
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
            ]}
            title={"Manage project"}
          />
        </div>
      </div>
    </div>
  );
};

export default Project;
