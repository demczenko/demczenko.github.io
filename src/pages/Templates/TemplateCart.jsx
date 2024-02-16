import { useState } from "react";
import { Archive, Copy, HandIcon, Loader, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import CardActions from "@/components/CardActions";
import { CreateForm } from "@/components/CreateForm";
import { useProjectCreate } from "@/hooks/projects/useProjectCreate";
import { useTemplateUpdate } from "@/hooks/templates/useTemplateUpdate";
import { useTemplateDelete } from "@/hooks/templates/useTemplateDelete";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "react-query";

const TemplateCart = ({ item }) => {
  const { toast } = useToast();
  const client = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    mutate: createProject,
    isLoading: isProjectLoading,
    isError,
  } = useProjectCreate();
  const { mutate: updateTemplate, isLoading: isTemplateLoadingUpdate } =
    useTemplateUpdate();
  const { mutate: deleteTemplate, isLoading: isTemplateLoadingDelete } =
    useTemplateDelete();

  const handleArchive = async () => {
    updateTemplate(
      { id: item.id, isarchived: !item.isarchived },
      {
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed",
            description: "Failed to archive template",
          });
        },
        onSettled: () => {
          client.invalidateQueries("templates");
        },
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Success",
            description: "Template successfully archived",
          });
        },
      }
    );
  };

  const handleDelete = () => {
    deleteTemplate(item.id, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed",
          description: "Failed to delete template",
        });
      },
      onSettled: () => {
        client.invalidateQueries("templates");
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Template successfully deleted",
        });
      },
    });
  };

  const handleDuplicate = async (id) => {
    const template = templates.find((template) => template.id === id);
    const template_tables = tables.filter((table) => table.template_id === id);
    let template_columns = [];
    template_tables.forEach((table) => {
      template_columns.push(
        ...columns.filter((col) => col.table_id === table.id)
      );
    });

    const template_id = uuidv4();

    let new_columns = [];
    const new_template = {
      ...template,
      id: template_id,
      template_name: template.template_name + " Copy",
      createdat: Date.now(),
    };
    const new_tables = template_tables.map((table) => {
      const table_id = uuidv4();

      const table_columns = template_columns.filter(
        (col) => col.table_id === table.id
      );
      table_columns.forEach((col) => {
        new_columns.push({
          ...col,
          id: uuidv4(),
          table_id: table_id,
          createdat: Date.now(),
        });
      });

      return {
        ...table,
        id: table_id,
        template_id: template_id,
        createdat: Date.now(),
      };
    });

    const candidate = await setTemplate(new_template);
    if (candidate) {
      toast({
        variant: "success",
        title: "Updated",
        description: "Template successfully duplicated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to duplicate template",
        description: "Something went wrong",
      });
    }

    for (const table of new_tables) {
      await setTable(table);
    }
    for (const column of new_columns) {
      await setColumn(column);
    }
  };

  const onCreateProject = async (data) => {
    const new_project = {
      project_name: data.project_name,
      id: uuidv4(),
      template_id: item.id,
      isarchived: false,
      createdat: Date.now(),
    };

    createProject(new_project, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed",
          description: "Failed to create project",
        });
      },
      onSettled: () => {
        setIsModalOpen(false);
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Project successfully created",
        });
      },
    });
  };

  const actions = () => {
    if (item.isarchived) {
      return [
        {
          id: 2,
          name: item.isarchived ? "Un Archive" : "Archive",
          icon: (
            <>
              {isTemplateLoadingUpdate ? (
                <Loader className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Archive className="h-4 w-4 mr-2" />
              )}
            </>
          ),
          onClick: () => handleArchive(),
        },
        {
          id: 4,
          name: "Delete",
          icon: (
            <>
              {isTemplateLoadingDelete ? (
                <Loader className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Trash className="h-4 w-4 mr-2" />
              )}
            </>
          ),
          onClick: () => handleDelete(),
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
          icon: (
            <>
              {isTemplateLoadingUpdate ? (
                <Loader className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Archive className="h-4 w-4 mr-2" />
              )}
            </>
          ),
          onClick: () => handleArchive(),
        },
      ];
    }
  };

  return (
    <>
      <Card className="min-w-[300px] bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
        <CardHeader>
          <Link to={`/templates/${item.id}`}>
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
          <CardActions actions={actions()} />
        </CardFooter>
      </Card>
      <CreateForm
        isLoading={isProjectLoading}
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
        onSubmit={onCreateProject}
        title={"Create project"}
        description={"Enter project name."}
      />
    </>
  );
};

export default TemplateCart;
