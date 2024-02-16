import { TableService } from "@/api/tables/init";
import { useMutation } from "react-query";

export const useTableCreate = () => {
  return useMutation((params) => TableService.set(params));
};
