import React, { useMemo, useState } from "react";
import { DrawerModal } from "@/components/Drawer";
import ProjectForm from "../Projects/ProjectsModal/ProjectForm";
import { Archive, Copy, HandIcon, Trash2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import CardActions from "@/components/CardActions";

const TemplateCart = ({
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
      <Card className="w-[350px] bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
        <CardHeader>
          <Link to={item.id}>
            <CardTitle className="text-white hover:underline">
              {item.template_name}
            </CardTitle>
          </Link>
        </CardHeader>
        <CardContent>
          <p className="text-xs">
            <span className="text-neutral-300">created at: </span>
            <span className="text-white font-semibold">
              {new Date(item.createdat).toDateString()}
            </span>
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <CardActions actions={options} />
        </CardFooter>
      </Card>
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
