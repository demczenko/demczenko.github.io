import { DataTableService } from "@/api/tables data/init";
import { useMutation } from "react-query";

export const useDataTableUpdate = (id) => {
  return useMutation((params) => DataTableService.update(id ?? params.id, params));
};
