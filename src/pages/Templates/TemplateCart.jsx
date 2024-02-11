import React, { useMemo, useState } from "react";
import { CardDescription, PreviewTemplate } from "@/components";
import { DrawerModal } from "@/components/Drawer";
import ProjectForm from "../Projects/ProjectsModal/ProjectForm";

const TemplateCart = ({
  isTemplatePage,
  isProjectPage,
  onArchive,
  onDelete,
  item,
}) => {
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);

  const options = useMemo(() => {
    if (item.isarchived) {
      return [
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
    </div>
  );
};

export default TemplateCart;
