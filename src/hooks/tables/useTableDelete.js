import { TableService } from "@/api/tables/init";
import { useMutation } from "react-query";

export const useTableDelete = () => {
  return useMutation((params) => TableService.delete(params));
};
