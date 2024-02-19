import { TableService } from "@/api/tables/init";
import { useQuery } from "react-query";

export const useTable = (id) => {
  return useQuery(`table-${id}`, async () => {
    const response = await TableService.get(id);
    return response
  });
};
