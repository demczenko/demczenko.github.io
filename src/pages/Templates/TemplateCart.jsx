import React, { useMemo, useState } from "react";
import { CardDescription, PreviewTemplate } from "@/components";
import { DrawerModal } from "@/components/Drawer";
import { AddProjectDrawer } from "../Projects/ProjectsModal/AddProjectDrawer";
import ProjectForm from "../Projects/ProjectsModal/ProjectForm";
import { CreateForm } from "@/components/CreateForm";

const TemplateCart = ({
  isTemplatePage,
  isProjectPage,
  onRename,
  onArchive,
  onDelete,
  template,
}) => {
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
          onClick: () => onDelete(),
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
        isProjectPage={isProjectPage}
        isTemplatePage={isTemplatePage}
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
      <CreateForm
        title={"Rename template"}
        description={"Enter new template name."}
        isOpen={isRenameModalOpen}
        setIsOpen={setRenameModalOpen}
        fields={[
          {
            id: 1,
            name: "template_name",
            label: "Template Name",
            placeholder: "name",
          },
        ]}
        onSubmit={(name) => {
          onRename(template, name);
          setRenameModalOpen(false);
        }}
      />
    </div>
  );
};

export default TemplateCart;
