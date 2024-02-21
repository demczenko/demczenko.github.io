import { ProjectStyleService } from "@/api/projects_style/init";
import { useMutation } from "react-query";

export const useProjectsStyleUpdate = (id) => {
  return useMutation((params) => ProjectStyleService.update(id, params));
};
