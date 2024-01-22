import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardDescription } from "@/components";
import { DrawerModal } from "@/components/Drawer";
import { AddProjectDrawer } from "../Projects/ProjectsModal/AddProjectDrawer";
import ProjectForm from "../Projects/ProjectsModal/ProjectForm";
import RenameTemplate from "./TemplateModal/RenameTemplate";
import { TemplatesService } from "@/api/templates/init";

const Template = ({ template }) => {
  const navigator = useNavigate();
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);
  const [isRenameModalOpen, setRenameModalOpen] = useState(false);

  const handleArchived = () => {
    TemplatesService.updateTemplate({
      ...template,
      isArchived: template.isArchived ? false : true,
    });
    navigator(template.isArchived ? "/templates/" : "/templates/archived");
  };

  const handleDelete = (id) => {
    alert("under development");

    // add delete action for every api
    // TemplatesService.updateTemplate({...template, isArchived: template.isArchived ? false : true})
  };

  const options = useMemo(() => {
    if (template.isArchived) {
      return [
        {
          id: 1,
          name: "Rename",
          onClick: () => setRenameModalOpen(true),
        },
        {
          id: 3,
          name: "Select",
          onClick: () => setIsCreateProjectModalOpen(true),
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
          id: 1,
          name: "Rename",
          onClick: () => setRenameModalOpen(true),
        },
        {
          id: 3,
          name: "Select",
          onClick: () => setIsCreateProjectModalOpen(true),
        },
        {
          id: 2,
          name: template.isArchived ? "Un Archive" : "Archive",
          onClick: () => handleArchived(template.id),
        },
      ];
    }
  }, []);

  const onSubmit = (name) => {
    if (name.length < 4) return;
    TemplatesService.updateTemplate({ ...template, template_name: name });
    navigator("/templates/" + template.id);
  };

  return (
    <div>
      <Link
        to={`/templates/${template.id}`}
        className="flex rounded-xl overflow-hidden max-w-[320px] hover:-translate-y-2 hover:shadow-2xl shadow-xl transition-transform cursor-pointer">
        <iframe
          className="max-w-[300px] h-[400px] pointer-events-none"
          srcDoc={template.template_html}></iframe>
      </Link>
      <CardDescription
        name={template.template_name}
        options={options}
        title={"Manage template"}
      />
      <div>
        <p className="text-xs font-semibold text-neutral-300">
          created at: {new Date(template.createdAt).toDateString()}
        </p>
      </div>
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
        content={
          <RenameTemplate placeholder={template?.name} onSubmit={onSubmit} />
        }
      />
    </div>
  );
};

export default Template;
