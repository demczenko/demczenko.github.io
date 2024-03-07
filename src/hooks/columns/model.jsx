import { useColumnCreate, useColumnDelete } from "@/hooks/columns";

const useDelete = ({ toast, invalidate }) => {
  const { mutate, isLoading, isError } = useColumnDelete();

  const onDelete = (item) => {
    mutate(item.id, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to delete table",
          description: "Something went wrong",
        });
      },
      onSettled: () => invalidate(),
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Table successfully deleted",
        });
      },
    });
  };

  return {
    onDeleteColumn: onDelete,
    isDeleteColumnLoading: isLoading,
    isDeleteColumnError: isError,
  };
};

const useCreate = ({ toast, invalidate = () => {} }) => {
  const { mutate, isLoading, isError } = useColumnCreate();

  const onCreate = (item) => {
    mutate(item, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to create column",
          description: "Something went wrong",
        });
      },
      onSettled: () => invalidate(),
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Column successfully created",
        });
      },
    });
  };

  return {
    onCreateColumn: onCreate,
    isCreateColumnLoading: isLoading,
    isCreateColumnError: isError,
  };
};

export const ColumnModel = {
  useColumnDelete: useDelete,
  useColumnCreate: useCreate,
};
