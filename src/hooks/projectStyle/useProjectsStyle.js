import { ProjectStyleService } from "@/api/projects_style/init";
import { useQuery } from "react-query";

export const useProjectsStyle = (id, options) => {
  return useQuery(
    `project-style-${id}`,
    async () => {
      const response = await ProjectStyleService.get(id);
      return response;
    },
    options
  );
};
