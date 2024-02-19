import { ProjectService } from "@/api/projects/init";
import { useQuery } from "react-query";

export const useProject = (id, options) => {
  return useQuery(`project-${id}`, async () => {
    const response = await ProjectService.get(id);
    return response;
  }, options);
};
