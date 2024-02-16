import { ColumnService } from "@/api/columns/init";
import { useMutation } from "react-query";

export const useColumnCreate = () => {
  return useMutation((params) => ColumnService.set(params));
};
