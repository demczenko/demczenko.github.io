import { ComponentsService } from "@/api/components/init";
import { useMutation } from "react-query";

export const useComponentUpdate = () => {
  return useMutation((id, params) => ComponentsService.update(id, params));
};
