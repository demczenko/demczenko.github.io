import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CardDescription } from "@/components";
import { DrawerModal } from "@/components/Drawer";
import { AddProjectDrawer } from "../Projects/ProjectsModal/AddProjectDrawer";
import ProjectForm from "../Projects/ProjectsModal/ProjectForm";

const Template = ({ id, template_name, template_json }) => {
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);
  const [isRenameModalOpen, setRenameModalOpen] = useState(false);

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
        name: "Archive",
        onClick: () => alert("Under development"),
      },
    ];
  }, []);

  return (
    <div>
      <Link
        to={id}
        className="flex rounded-xl overflow-hidden  max-w-[320px] hover:-translate-y-2 hover:shadow-2xl shadow-xl transition-transform cursor-pointer">
        <img
          src="https://placehold.co/300x400"
          className="block w-full h-full"
          alt=""
        />
      </Link>
      <CardDescription
        name={template_name}
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
                template_id={id}
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
      />
    </div>
  );
};

export default Template;
