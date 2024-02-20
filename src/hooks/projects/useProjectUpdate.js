import { ProjectService } from "@/api/projects/init";
import { useMutation } from "react-query";

export const useProjectUpdate = (id) => {
  return useMutation((params) => ProjectService.update(id, params));
};
