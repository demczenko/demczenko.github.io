import { DataTableService } from "@/api/tables data/init";
import { useQuery } from "react-query";

export const useDataTable = (id, options) => {
  return useQuery(`data-table-${id}`, async () => {
    const response = await DataTableService.get(`?id=${id}`);
    return response[0];
  }, options);
};
