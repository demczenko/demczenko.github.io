import { ComponentsService } from "@/api/components/init";
import { useMutation } from "react-query";

export const useComponentCreate = () => {
  return useMutation((component) => ComponentsService.set(component));
};
