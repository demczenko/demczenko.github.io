import { TemplatesService } from "@/api/templates/init";
import { useMutation } from "react-query";

export const useTemplateUpdate = (id) => {
  return useMutation((params) => TemplatesService.update(id, params));
};
 