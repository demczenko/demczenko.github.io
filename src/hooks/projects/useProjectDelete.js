import { ProjectService } from "@/api/projects/init";
import { useMutation } from "react-query";

export const useProjectDelete = () => {
  return useMutation((params) => ProjectService.delete(params));
};
