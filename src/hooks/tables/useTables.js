import { TableService } from "@/api/tables/init";
import { useQuery } from "react-query";

export const useTables = (params, options) => {
  return useQuery(
    params ? "tables-" + params : "tables",
    async () => {
      const response = await TableService.getAll(params);
      return response;
    },
    options
  );
};
