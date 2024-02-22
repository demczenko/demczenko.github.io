import { LayoutService } from "@/api/layouts/init";
import { useQuery } from "react-query";

export const useLayout = (id, options) => {
  return useQuery(
    `layout-${id}`,
    async () => {
      const response = await LayoutService.get(id);
      return response;
    },
    options
  );
};
