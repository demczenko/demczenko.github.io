import React, { useMemo, useState } from "react";
import { Archive, Copy, HandIcon, Trash2Icon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import CardActions from "@/components/CardActions";
import { useProjects } from "@/hooks/useProjects";
import { CreateForm } from "@/components/CreateForm";
import { useToast } from "@/components/ui/use-toast";

const TemplateCart = ({ onArchive, onDelete, onDuplicate, item }) => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isError, isLoading, update, set: setProject } = useProjects();

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
          onClick: () => setIsModalOpen(true),
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

  const onSubmit = async (data) => {
    const new_project = {
      project_name: data.project_name,
      id: uuidv4(),
      template_id: item.id,
      isarchived: false,
      createdat: Date.now(),
    };

    const candidate = await setProject(new_project);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Project added successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to create project",
        description: "Something went wrong",
      });
    }
  };

  return (
    <div>
      <Card className="min-w-[300px] bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
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
      <CreateForm
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        fields={[
          {
            id: 1,
            name: "project_name",
            title: "Project Name",
            placeholder: "project name",
          },
        ]}
        onSubmit={onSubmit}
        title={"Create project"}
        description={"Enter project name."}
      />
    </div>
  );
};

export default TemplateCart;
