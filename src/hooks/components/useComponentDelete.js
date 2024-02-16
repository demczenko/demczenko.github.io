import { ComponentsService } from "@/api/components/init";
import { useMutation } from "react-query";

export const useComponentDelete = () => {
  return useMutation((params) => ComponentsService.delete(params));
};
