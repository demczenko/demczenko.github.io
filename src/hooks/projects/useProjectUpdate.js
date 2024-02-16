import { ProjectService } from "@/api/projects/init";
import { useMutation } from "react-query";

export const useProjectUpdate = () => {
  return useMutation((params) => ProjectService.update(params));
};
