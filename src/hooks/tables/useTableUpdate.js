import { TableService } from "@/api/tables/init";
import { useMutation } from "react-query";

export const useTableUpdate = (id) => {
  return useMutation((params) => TableService.update(id, params));
};
