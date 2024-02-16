import { ColumnService } from "@/api/columns/init";
import { useQuery } from "react-query";

export const useColumn = (id, options) => {
  return useQuery(
    `column-${id}`,
    async () => {
      const response = await ColumnService.get(`?id=${id}`);
      return response[0];
    },
    options
  );
};
