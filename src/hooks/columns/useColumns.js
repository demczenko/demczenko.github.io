import { ColumnService } from "@/api/columns/init";
import { useQuery } from "react-query";

export const useColumns = (params, options) => {
  return useQuery(
    params ? "columns-" + params : "columns",
    async () => {
      const response = await ColumnService.getAll(params);
      return response;
    },
    options
  );
};
