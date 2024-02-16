import { ProjectService } from "@/api/projects/init";
import { useQuery } from "react-query";

export const useProjects = (params) => {
  return useQuery("projects", async () => {
    const response = await ProjectService.getAll(params);
    return response;
  });
};
