import { LayoutService } from "@/api/layouts/init";
import { useMutation } from "react-query";

export const useLayoutDelete = () => {
  return useMutation((params) => LayoutService.delete(params));
};
