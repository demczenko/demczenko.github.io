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
import { useTableCreate } from "@/hooks/tables/useTableCreate";
import { useColumnCreate } from "@/hooks/columns/useColumnCreate";
import { useTemplateCreate } from "@/hooks/templates/useTemplateCreate";
import { useTables } from "@/hooks/tables/useTables";
import { useColumns } from "@/hooks/columns/useColumns";

const TemplateCart = ({ item }) => {
  const { toast } = useToast();
  const client = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: createProject, isLoading: isProjectLoading } =
    useProjectCreate();
  const {
    mutate: updateTemplate,
    status: TemplateUpdateStatus,
    isLoading: isTemplateLoadingUpdate,
  } = useTemplateUpdate(item?.id);
  const {
    mutate: deleteTemplate,
    status: TemplateDeleteStatus,
    isLoading: isTemplateLoadingDelete,
  } = useTemplateDelete();

  const { mutate: createTemplate, isLoading: isTemplateCreateLoading } =
    useTemplateCreate();

  const {
    mutate: createTable,
    isLoading: tableCreateLoading,
    isError: tableCreateError,
  } = useTableCreate();
  const {
    mutate: createColumn,
    isLoading: columnCreateLoading,
    isError: columnCreateError,
  } = useColumnCreate();

  const { data: tables } = useTables(`?template_id=${item.id}`);
  const { data: columns } = useColumns(`?table_id=${item.id}`);

  const handleArchive = () => {
    updateTemplate(
      { isarchived: !item.isarchived },
      {
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed",
            description: "Failed to archive template",
          });
        },
        onSettled: () => {
          client.invalidateQueries("templates-?isarchived=0");
          client.invalidateQueries("templates-?isarchived=1");
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
        client.invalidateQueries("templates-?isarchived=0");
        client.invalidateQueries("templates-?isarchived=1");
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

  const handleDuplicate = () => {
    return alert("Under development");
    const template_tables = tables.filter(
      (table) => table.template_id === item.id
    );
    let template_columns = [];
    template_tables.forEach((table) => {
      template_columns.push(
        ...columns.filter((col) => col.table_id === table.id)
      );
    });

    const template_id = uuidv4();

    let new_columns = [];
    const new_template = {
      ...item,
      id: template_id,
      template_name: item.template_name + " Copy",
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

    createTemplate(new_template, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to duplicate template",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        client.invalidateQueries("templates");
        for (const table of new_tables) {
          createTable(table, {
            onError: () => {
              toast({
                variant: "destructive",
                title: "Failed to duplicate table",
                description: "Something went wrong",
              });
            },
            onSettled: () => {
              client.invalidateQueries("tables");
              for (const column of new_columns) {
                createColumn(column, {
                  onError: () => {
                    toast({
                      variant: "destructive",
                      title: "Failed to duplicate column",
                      description: "Something went wrong",
                    });
                  },
                  onSettled: () => {
                    setIsModalOpen(false);
                    client.invalidateQueries("columns");
                  },
                  onSuccess: () => {
                    toast({
                      variant: "success",
                      title: "Success",
                      description: "Column successfully duplicated",
                    });
                  },
                });
              }
            },
            onSuccess: () => {
              toast({
                variant: "success",
                title: "Success",
                description: "Table successfully duplicated",
              });
            },
          });
        }
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Updated",
          description: "Template successfully duplicated",
        });
      },
    });
  };

  const onCreateProject = (data) => {
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
          onClick: handleArchive,
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
          onClick: handleDelete,
        },
      ];
    } else {
      return [
        {
          id: 1,
          name: "Duplicate",
          icon: (
            <>
              {isTemplateCreateLoading &&
              tableCreateLoading &&
              columnCreateLoading ? (
                <Loader className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
            </>
          ),
          onClick: handleDuplicate,
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
          onClick: handleArchive,
        },
      ];
    }
  };

  return (
    <>
      <Card className="max-w-[320px] w-full bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
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
        <CardFooter className="flex justify-between items-center">
          <CardActions actions={actions()} />
          {TemplateUpdateStatus === "loading" && (
            <Loader className="animate-spin w-4 h-4 text-blue-400" />
          )}
          {TemplateDeleteStatus === "loading" && (
            <Loader className="animate-spin w-4 h-4 text-blue-400" />
          )}
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
