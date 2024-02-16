import { ComponentsService } from "@/api/components/init";
import { useQuery } from "react-query";

export const useComponent = (id, options) => {
  return useQuery(`component-${id}`, async () => {
    const response = await ComponentsService.get(`?id=${id}`);
    return response[0];
  }, options);
};
