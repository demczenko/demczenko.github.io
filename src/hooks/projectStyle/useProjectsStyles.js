import { ProjectStyleService } from "@/api/projects_style/init";
import { useQuery } from "react-query";

export const useProjectsStyles = (params) => {
  return useQuery("project-styles", async () => {
    const response = await ProjectStyleService.getAll(params);
    return response
  });
};
