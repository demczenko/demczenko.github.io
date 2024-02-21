import { ComponentsService } from "@/api/components/init";
import { useMutation } from "react-query";

export const useComponentUpdate = (id) => {
  return useMutation((params) => ComponentsService.update(id, params));
};
