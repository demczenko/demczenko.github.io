import { DataTableService } from "@/api/tables data/init";
import { useQuery } from "react-query";

export const useDataTables = (params, options) => {
  return useQuery(
    params ? "data-tables-" + params : "data-tables",
    async () => {
      const response = await DataTableService.getAll(params);
      return response;
    },
    options
  );
};
