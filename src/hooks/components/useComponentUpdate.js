import { ComponentsService } from "@/api/components/init";
import { useQuery } from "react-query";

export const useComponentUpdate = (params) => {
  return useQuery("component-update", async () => {
    const response = await ComponentsService.update(params);
    return response[0];
  });
};
