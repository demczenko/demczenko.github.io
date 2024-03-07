import { useTableCreate, useTableDelete } from "@/hooks/tables";

const useDelete = ({ toast, invalidate }) => {
  const { mutate, isLoading, isError } = useTableDelete();

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
    onDeleteTable: onDelete,
    isDeleteTableLoading: isLoading,
    isDeleteTableError: isError,
  };
};

const useCreate = ({ toast, invalidate }) => {
  const { mutate, isLoading, isError } = useTableCreate();

  const onCreate = (item) => {
    mutate(item, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to duplicate table",
          description: "Something went wrong",
        });
      },
      onSettled: () => invalidate(),
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Table successfully duplicated",
        });
      },
    });
  };

  return {
    onCreateTable: onCreate,
    isCreateTableLoading: isLoading,
    isCreateTableError: isError,
  };
};

export const TableModel = {
  useTableDelete: useDelete,
  useTableCreate: useCreate,
};
