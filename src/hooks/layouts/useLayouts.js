import { LayoutService } from "@/api/layouts/init";
import { useQuery } from "react-query";

export const useLayouts = (params, options) => {
  return useQuery(
    params ? "layout-" + params : "layout",
    async () => {
      const response = await LayoutService.getAll(params);
      return response;
    },
    options
  );
};
