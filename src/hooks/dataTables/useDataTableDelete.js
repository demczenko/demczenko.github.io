import { DataTableService } from "@/api/tables data/init";
import { useMutation } from "react-query";

export const useDataTableDelete = () => {
  return useMutation((params) => DataTableService.delete(params));
};
