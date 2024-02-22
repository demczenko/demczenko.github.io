import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useLayoutDelete } from "@/hooks/layouts/useLayoutDelete";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import CardActions from "@/components/CardActions";
import { Loader, Trash2Icon } from "lucide-react";

const LayoutCart = ({ item }) => {
  const { toast } = useToast();
  const client = useQueryClient();

  const {
    mutate: deleteLayout,
    status: LayoutDeleteStatus,
    isLoading: isLayoutLoadingDelete,
  } = useLayoutDelete();

  const handleDelete = () => {
    deleteLayout(item.id, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed",
          description: "Failed to delete template",
        });
      },
      onSettled: () => {
        client.invalidateQueries("layouts");
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

  return (
    <>
      <Card className="max-w-[320px] w-full bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
        <CardHeader>
          <Link to={`/layouts/${item.id}`}>
            <CardTitle className="text-white hover:underline">
              {item.layout_name}
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
          <CardActions
            actions={[
              {
                id: 1,
                name: "Delete",
                icon: (
                  <>
                    {isLayoutLoadingDelete ? (
                      <Loader className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Trash2Icon className="h-4 w-4 mr-2" />
                    )}
                  </>
                ),
                onClick: handleDelete,
              },
            ]}
          />
          {isLayoutLoadingDelete === "loading" && (
            <Loader className="animate-spin w-4 h-4 text-blue-400" />
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default LayoutCart;
