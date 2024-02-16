import { ColumnService } from "@/api/columns/init";
import { useMutation } from "react-query";

export const useColumnUpdate = () => {
  return useMutation((params) => ColumnService.update(params));
};
