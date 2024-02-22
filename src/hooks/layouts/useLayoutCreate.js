import { LayoutService } from "@/api/layouts/init";
import { useMutation } from "react-query";

export const useLayoutCreate = () => {
  return useMutation((params) => LayoutService.set(params));
};
