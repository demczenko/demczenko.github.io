import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardDescription } from "@/components";
import { DrawerModal } from "@/components/Drawer";
import { AddProjectDrawer } from "../Projects/ProjectsModal/AddProjectDrawer";
import ProjectForm from "../Projects/ProjectsModal/ProjectForm";
import RenameTemplate from "./TemplateModal/RenameTemplate";
import { TemplatesService } from "@/api/templates/init";

const Template = ({ template }) => {
  const navigator = useNavigate()
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);
  const [isRenameModalOpen, setRenameModalOpen] = useState(false);

  const handleArchived = (id) => {
    TemplatesService.updateTemplate({...template, isArchived: template.isArchived ? false : true})
    navigator("/templates/" + id)
  }

  const options = useMemo(() => {
    return [
      {
        id: 3,
        name: "Select",
        onClick: () => setIsCreateProjectModalOpen(true),
      },
      {
        id: 1,
        name: "Rename",
        onClick: () => setRenameModalOpen(true),
      },
      {
        id: 2,
        name: template.isArchived ? "Un Archive" : "Archive",
        onClick: () => handleArchived(template.id),
      },
    ];
  }, []);

  const onSubmit = (name) => {
    if (name.length < 4) return;
    TemplatesService.updateTemplate({ ...template, template_name: name });
    navigator("/templates/" + template.id)
  };

  return (
    <div>
      <Link
        to={template.id}
        className="flex rounded-xl overflow-hidden  max-w-[320px] hover:-translate-y-2 hover:shadow-2xl shadow-xl transition-transform cursor-pointer">
        <img
          src="https://placehold.co/300x400"
          className="block w-full h-full"
          alt=""
        />
      </Link>
      <CardDescription
        name={template.template_name}
        options={options}
        title={"Manage template"}
      />
      <DrawerModal
        title={"Create project"}
        description={"Enter project name and fulfill tables."}
        open={isCreateProjectModalOpen}
        onOpenChange={setIsCreateProjectModalOpen}
        content={
          <AddProjectDrawer
            form={
              <ProjectForm
                onSubmitForm={() => setIsCreateProjectModalOpen(false)}
                template_id={template.id}
              />
            }
          />
        }
      />
      <DrawerModal
        title={"Rename template"}
        description={"Enter new template name."}
        open={isRenameModalOpen}
        onOpenChange={setRenameModalOpen}
        content={<RenameTemplate placeholder={template?.name} onSubmit={onSubmit}/>}
      />
    </div>
  );
};

export default Template;
