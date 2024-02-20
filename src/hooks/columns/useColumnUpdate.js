import { ColumnService } from "@/api/columns/init";
import { useMutation } from "react-query";

export const useColumnUpdate = () => {
  return useMutation((id, params) => ColumnService.update(id, params));
};
