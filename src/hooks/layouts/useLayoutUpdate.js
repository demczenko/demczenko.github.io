import { LayoutService } from "@/api/layouts/init";
import { useMutation } from "react-query";

export const useLayoutUpdate = (id) => {
  return useMutation((params) => LayoutService.update(id, params));
};
