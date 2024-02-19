import { ComponentsService } from "@/api/components/init";
import { useMutation } from "react-query";

export const useComponentUpdate = () => {
  return useMutation((params) => ComponentsService.update(params));
};
