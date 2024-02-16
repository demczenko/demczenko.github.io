import { ProjectService } from "@/api/projects/init";
import { useMutation } from "react-query";

export const useProjectCreate = () => {
  return useMutation((params) => ProjectService.set(params));
};
