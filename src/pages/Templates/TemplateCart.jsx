import React, { useMemo, useState } from "react";
import { CardDescription, PreviewTemplate } from "@/components";
import { DrawerModal } from "@/components/Drawer";
import { AddProjectDrawer } from "../Projects/ProjectsModal/AddProjectDrawer";
import ProjectForm from "../Projects/ProjectsModal/ProjectForm";
import RenameTemplate from "./TemplateModal/RenameTemplate";

const TemplateCart = ({ onRename, onArchive, onDelete, template }) => {
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);
  const [isRenameModalOpen, setRenameModalOpen] = useState(false);

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
          onClick: () => onArchive(template),
        },
        {
          id: 4,
          name: "Delete",
          onClick: () => onDelete(template.id),
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
          onClick: () => onArchive(template),
        },
      ];
    }
  }, []);

  return (
    <div>
      <PreviewTemplate
        href={`/templates/${template.id}`}
        template_html={template.template_html}
      />
      <CardDescription
        name={template.template_name}
        options={options}
        title={"Manage template"}
        createdAt={template.createdAt}
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
        content={
          <RenameTemplate
            placeholder={template?.name}
            onSubmit={(name) => onRename(template, name)}
          />
        }
      />
    </div>
  );
};

export default TemplateCart;
