import { TemplatesService } from "@/api/templates/init";
import { useQuery } from "react-query";

export const useTemplates = (params) => {
  return useQuery(params ? "templates-" + params : "templates", async () => {
    const response = await TemplatesService.getAll(params);
    return response;
  });
};
