import { TemplatesService } from "@/api/templates/init";
import { useMutation } from "react-query";

export const useTemplateUpdate = () => {
  return useMutation((id, params) => TemplatesService.update(id, params));
};
 