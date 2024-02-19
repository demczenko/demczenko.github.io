import CardActions from "@/components/CardActions";
import { CreateForm } from "@/components/CreateForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useDataTableUpdate } from "@/hooks/dataTables/useDataTableUpdate";
import { Edit, Loader } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "react-query";

const DataTableContentCart = ({ item }) => {
  const { toast } = useToast();
  const client = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    mutate: updateDataTable,
    isLoading: isDataTableUpdateLoading,
    isError: isDataTableUpdateError,
  } = useDataTableUpdate();

  const handleUpdate = async (data) => {
    const updated_slug = {
      ...item,
      data: data,
    };
    updateDataTable(updated_slug, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to update data item",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        setIsModalOpen(false)
        client.invalidateQueries("data-tables");
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Data item successfully updated",
        });
      },
    });
  };

  return (
    <>
      <Card className="max-w-[320px] w-full bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
        <CardHeader>
          <CardTitle className="text-white capitalize">
            {item.data.slug}
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
        <CardFooter>
          <CardActions
            actions={[
              {
                id: 1,
                name: "Edit",
                icon: (
                  <>
                    {isDataTableUpdateLoading ? (
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
      </Card>
      <CreateForm
        isLoading={isDataTableUpdateLoading}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        fields={Object.entries(item.data).map(([key, value], i) => {
          return {
            id: i,
            name: key,
            label: key,
            value: value,
            placeholder: "enter " + key,
          };
        })}
        onSubmit={(data) => handleUpdate(data)}
        description={"Enter values, click done when you are ready."}
        title={item.data.slug + " content"}
      />
    </>
  );
};

export default DataTableContentCart;
