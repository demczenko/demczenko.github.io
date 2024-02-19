import { ProjectStyleService } from "@/api/projects_style/init";
import { useMutation } from "react-query";

export const useProjectStyleDelete = () => {
  return useMutation((params) => ProjectStyleService.delete(params));
};
