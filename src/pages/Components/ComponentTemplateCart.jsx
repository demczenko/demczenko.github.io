import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardActions from "../../components/CardActions";
import { Link } from "react-router-dom";
import { Delete, Loader, TrashIcon } from "lucide-react";
import { useComponentDelete } from "@/hooks/components/useComponentDelete";
import { useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import { useTemplateUpdate } from "@/hooks/templates/useTemplateUpdate";

const ComponentTemplateCart = ({ item, template_id, header_id, footer_id }) => {
  const client = useQueryClient();
  const { toast } = useToast();

  const { mutate: onDelete, isLoading: onDeleteLoading } = useComponentDelete();
  const {
    mutate: updateTemplate,
    isLoading: isTemplateUpdateLoading,
    isError: isTemplateUpdateError,
  } = useTemplateUpdate(template_id);

  const handleComponentDelete = async (id) => {
    onDelete(id, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed",
          description: "Failed to delete component",
        });
      },
      onSettled: () => {
        client.invalidateQueries(`template-${template_id}`);
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Component successfully deleted",
        });
      },
    });
  };

  const removeComponentFromTemplate = async (id) => {
    let new_template;
    if (header_id === id) {
      new_template = {
        header_id: null,
      };
    }

    if (footer_id === id) {
      new_template = {
        footer_id: null,
      };
    }

    updateTemplate(new_template, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to update template",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        client.invalidateQueries(`template-${template_id}`);
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Template successfully updated",
        });
      },
    });
  };

  return (
    <Card className="md:max-w-[320px] w-full bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
      <CardHeader>
        <Link to={`/components/${item.id}`}>
          <CardTitle className="text-white hover:underline leading-snug">
            {item.component_name}
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
        <CardActions
          actions={[
            {
              id: 1,
              onClick: () => handleComponentDelete(item.id),
              icon: (
                <>
                  {onDeleteLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <TrashIcon className="w-4 h-4 mr-2" />
                  )}
                </>
              ),
              name: "Delete",
            },
            {
              id: 2,
              onClick: () => removeComponentFromTemplate(item.id),
              icon: (
                <>
                  {isTemplateUpdateLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <Delete className="w-4 h-4 mr-2" />
                  )}
                </>
              ),
              name: "Remove",
            },
          ]}
        />
      </CardFooter>
    </Card>
  );
};

export default ComponentTemplateCart;
