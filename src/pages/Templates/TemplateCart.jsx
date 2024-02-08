import React, { useMemo, useState } from "react";
import { CardDescription, PreviewTemplate } from "@/components";
import { DrawerModal } from "@/components/Drawer";
import ProjectForm from "../Projects/ProjectsModal/ProjectForm";
import { CreateForm } from "@/components/CreateForm";

const TemplateCart = ({
  isTemplatePage,
  isProjectPage,
  onRename,
  onArchive,
  onDelete,
  item,
}) => {
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);
  const [isRenameModalOpen, setRenameModalOpen] = useState(false);

  const options = useMemo(() => {
    if (item.isarchived) {
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
          name: item.isarchived ? "Un Archive" : "Archive",
          onClick: () => onArchive(item),
        },
        {
          id: 4,
          name: "Delete",
          onClick: () => onDelete(item.id),
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
          name: item.isarchived ? "Un Archive" : "Archive",
          onClick: () => onArchive(item),
        },
      ];
    }
  }, []);

  return (
    <div>
      <PreviewTemplate
        href={`/templates/${item.id}`}
        template_html={item.template_html}
      />
      <CardDescription
        isProjectPage={isProjectPage}
        isTemplatePage={isTemplatePage}
        name={item.template_name}
        options={options}
        title={"Manage template"}
        createdat={item.createdat}
      />
      <DrawerModal
        title={"Create project"}
        description={"Enter project name and fulfill tables."}
        open={isCreateProjectModalOpen}
        onOpenChange={setIsCreateProjectModalOpen}
        content={
          <ProjectForm
            onSubmitForm={() => setIsCreateProjectModalOpen(false)}
            template_id={item.id}
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
          onRename(item, name);
          setRenameModalOpen(false);
        }}
      />
    </div>
  );
};

export default TemplateCart;
