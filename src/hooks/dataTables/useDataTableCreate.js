import { DataTableService } from "@/api/tables data/init";
import { useMutation } from "react-query";

export const useDataTableCreate = () => {
  return useMutation((params) => DataTableService.set(params));
};
