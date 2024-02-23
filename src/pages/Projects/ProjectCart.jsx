import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Archive, LinkIcon, Loader, Trash2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardActions from "@/components/CardActions";
import { useProjectUpdate } from "@/hooks/projects/useProjectUpdate";
import { useProjectDelete } from "@/hooks/projects/useProjectDelete";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "react-query";

const ProjectCart = ({ item, view = "cart" }) => {
  const { toast } = useToast();
  const client = useQueryClient();

  const {
    mutate: updateProject,
    isError: isErrorgProjectUpdate,
    isLoading: isLoadingProjectUpdate,
  } = useProjectUpdate(item?.id);
  const {
    mutate: deleteProject,
    isError: isErrorProjectDelete,
    isLoading: isLoadingProjectDelete,
  } = useProjectDelete();

  const handleArchive = async () => {
    updateProject(
      {
        isarchived: item.isarchived ? false : true,
      },
      {
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed to update project",
            description: "Something went wrong",
          });
        },
        onSettled: () => {
          client.invalidateQueries("projects-?isarchived=0");
        client.invalidateQueries("projects-?isarchived=1");
        },
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Success",
            description: "Project updated successfully",
          });
        },
      }
    );
  };

  const handleDelete = () => {
    deleteProject(item.id, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed",
          description: "Failed to delete project",
        });
      },
      onSettled: () => {
        client.invalidateQueries("projects-?isarchived=0");
        client.invalidateQueries("projects-?isarchived=1");
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Project successfully deleted",
        });
      },
    });
  };

  const options = useMemo(() => {
    if (item.isarchived) {
      return [
        {
          id: 1,
          name: item.isarchived ? "Un Archive" : "Archive",
          icon: (
            <>
              {isLoadingProjectUpdate ? (
                <Loader className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Archive className="h-4 w-4 mr-2" />
              )}
            </>
          ),
          onClick: handleArchive,
        },
        {
          id: 2,
          name: "Delete",
          icon: (
            <>
              {isLoadingProjectDelete ? (
                <Loader className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Trash2Icon className="h-4 w-4 mr-2" />
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
          name: item.isarchived ? "Un Archive" : "Archive",
          icon: (
            <>
              {isLoadingProjectUpdate ? (
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
  }, []);

  if (view === "cart") {
    return <CartView project={item} options={options} />;
  }

  if (view === "list") {
    return <ListView project={item} options={options} />;
  }
};

function CartView({ project, options }) {
  return (
    <Card className="md:max-w-[320px] w-full w-full bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
      <CardHeader>
        <Link to={`/projects/${project.id}`}>
          <CardTitle className="text-white hover:underline">
            {project.project_name}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-xs">
          <span className="text-neutral-300">created at: </span>
          <span className="text-white font-semibold">
            {new Date(project.createdat).toDateString()}
          </span>
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <CardActions actions={options} />
      </CardFooter>
    </Card>
  );
}

function ListView({ project, options }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="hover:bg-neutral-700 p-4 py-3 rounded-md bg-neutral-900 transition-colors flex items-center justify-center gap-2">
      <LinkIcon className="h-4 w-4 text-white" />
      <CardTitle className="text-white hover:underline">
        {project.project_name}
      </CardTitle>
    </Link>
  );
}

export default ProjectCart;
