import { TemplatesService } from "@/api/templates/init";
import { useQuery } from "react-query";

export const useTemplate = (id) => {
  return useQuery(`template-${id}`, async () => {
    const response = await TemplatesService.get(id);
    return response;
  });
};
