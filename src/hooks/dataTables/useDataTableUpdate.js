import { DataTableService } from "@/api/tables data/init";
import { useMutation } from "react-query";

export const useDataTableUpdate = () => {
  return useMutation((id, params) => DataTableService.update(id, params));
};
