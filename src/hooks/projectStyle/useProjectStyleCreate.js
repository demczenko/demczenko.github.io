import { ProjectStyleService } from "@/api/projects_style/init";
import { useMutation } from "react-query";

export const useProjectStyleCreate = () => {
  return useMutation((params) => ProjectStyleService.set(params));
};
