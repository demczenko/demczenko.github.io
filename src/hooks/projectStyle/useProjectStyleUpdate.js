import { ProjectStyleService } from "@/api/projects_style/init";
import { useMutation } from "react-query";

export const useProjectsStyleUpdate = () => {
  return useMutation((params) => ProjectStyleService.update(params));
};
