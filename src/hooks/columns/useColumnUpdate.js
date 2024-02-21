import { ColumnService } from "@/api/columns/init";
import { useMutation } from "react-query";

export const useColumnUpdate = (id) => {
  return useMutation((params) => ColumnService.update(id, params));
};
