import { ColumnService } from "@/api/columns/init";
import { useMutation } from "react-query";

export const useColumnDelete = () => {
  return useMutation((params) => ColumnService.delete(params));
};
