import React, { useMemo, useState } from "react";
import { CardDescription, PreviewTemplate } from "@/components";
import { DrawerModal } from "@/components/Drawer";
import ProjectForm from "../Projects/ProjectsModal/ProjectForm";
import { Archive, Copy, HandIcon, Trash2Icon } from "lucide-react";

const TemplateCart = ({
  isTemplatePage,
  isProjectPage,
  onArchive,
  onDelete,
  onDuplicate,
  item,
}) => {
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);

  const options = useMemo(() => {
    if (item.isarchived) {
      return [
        {
          id: 2,
          name: item.isarchived ? "Un Archive" : "Archive",
          icon: <Archive className="h-4 w-4 mr-2" />,
          onClick: () => onArchive(item),
        },
        {
          id: 4,
          name: "Delete",
          icon: <Trash2Icon className="h-4 w-4 mr-2" />,
          onClick: () => onDelete(item.id),
        },
      ];
    } else {
      return [
        {
          id: 1,
          name: "Duplicate",
          icon: <Copy className="w-4 h-4 mr-2" />,
          onClick: () => onDuplicate(item.id),
        },
        {
          id: 3,
          name: "Select",
          icon: <HandIcon className="w-4 h-4 mr-2" />,
          onClick: () => setIsCreateProjectModalOpen(true),
        },
        {
          id: 2,
          name: item.isarchived ? "Un Archive" : "Archive",
          icon: <Archive className="h-4 w-4 mr-2" />,
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
