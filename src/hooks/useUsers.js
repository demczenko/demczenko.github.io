import { UserService } from "@/api/users/init";
import { useQuery } from "react-query";

export const useUsers = (id, options) => {
  return useQuery(
    `users`,
    async () => {
      const response = await UserService.getAll(id);
      return response;
    },
    options
  );
};
