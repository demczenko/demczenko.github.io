import { TableService } from "@/api/tables/init";
import { useMutation } from "react-query";

export const useTableUpdate = () => {
  return useMutation((id, params) => TableService.update(id, params));
};
