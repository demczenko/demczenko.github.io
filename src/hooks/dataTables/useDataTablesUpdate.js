import { DataTableService } from "@/api/tables data/init";
import { useMutation } from "react-query";

export const useDataTableUpdate = () => {
  return useMutation((params) => DataTableService.update(params));
};
