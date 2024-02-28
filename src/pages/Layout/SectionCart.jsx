import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardActions from "@/components/CardActions";
import { useLayoutUpdate } from "@/hooks/layouts/useLayoutUpdate";
import { Edit, GripVertical, Loader, Trash2Icon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "react-query";
import { useState } from "react";
import { CreateForm } from "@/components/CreateForm";
import { useSortable } from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import { CSS } from "@dnd-kit/utilities";

const SectionCart = ({ item, layout, isDisabled }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
      transition: {
        duration: 150, // milliseconds
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { toast } = useToast();
  const client = useQueryClient();
  const {
    mutate: updateLayout,
    status: LayoutDeleteStatus,
    isLoading,
  } = useLayoutUpdate(layout.id);

  const handleDeleteSection = (ev) => {
    ev.stopPropagation();
    const new_layout = layout.layout.filter(
      (component) => component.id !== item.id
    );
    updateLayout(
      {
        layout: [...new_layout],
      },
      {
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed",
            description: "Failed to delete template",
          });
        },
        onSettled: () => {
          client.invalidateQueries(`layout-${layout.id}`);
        },
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Success",
            description: "Template successfully deleted",
          });
        },
      }
    );
  };

  const handleEditSection = (data) => {
    ev.stopPropagation();

    const new_layout = layout.layout.map((section) => {
      if (section.id === item.id) {
        return {
          ...section,
          ...data,
        };
      }
      return section;
    });
    updateLayout(
      {
        layout: [...new_layout],
      },
      {
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed",
            description: "Failed to delete template",
          });
        },
        onSettled: () => {
          setIsModalOpen(false);
          client.invalidateQueries(`layout-${layout.id}`);
        },
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Success",
            description: "Template successfully deleted",
          });
        },
      }
    );
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="relative w-full pl-4">
      <div
        className="absolute top-1/2 -translate-y-1/2 -left-3"
        ref={setNodeRef}
        {...attributes}
        {...listeners}>
        <GripVertical className="text-[#111111]" />
      </div>
      <Card
        style={style}
        className={cn(
          "md:max-w-[320px] w-full bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none",
          {
            "opacity-30": isDisabled,
          }
        )}>
        <CardHeader>
          <CardTitle className="text-white">
            {item.section_name}
          </CardTitle>
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
                    {isLoading ? (
                      <Loader className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Trash2Icon className="h-4 w-4 mr-2" />
                    )}
                  </>
                ),
                onClick: handleDeleteSection,
              },
              {
                id: 2,
                name: "Edit",
                icon: (
                  <>
                    {isLoading ? (
                      <Loader className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Edit className="h-4 w-4 mr-2" />
                    )}
                  </>
                ),
                onClick: () => setIsModalOpen(true),
              },
            ]}
          />
        </CardFooter>
        <CreateForm
          isLoading={isLoading}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          fields={[
            {
              id: 1,
              name: "section_name",
              label: "Section name",
              value: item.section_name,
              placeholder: "name",
            },
          ]}
          onSubmit={handleEditSection}
          title={"Manage section"}
          description={"Change section name"}
        />
      </Card>
    </div>
  );
};

export default SectionCart;
