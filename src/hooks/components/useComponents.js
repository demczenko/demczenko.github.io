import { ComponentsService } from "@/api/components/init";
import { useQuery } from "react-query";

export const useComponents = (params, options) => {
  return useQuery(
    params ? "components-" + params : "components",
    async () => {
      const response = await ComponentsService.getAll(params);
      return response;
    },
    options
  );
};
