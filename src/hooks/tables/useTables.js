import { TableService } from "@/api/tables/init";
import { useQuery } from "react-query";

export const useTables = (params) => {
  return useQuery("tables", async () => {
    const response = await TableService.getAll(params);
    return response
  });
};
