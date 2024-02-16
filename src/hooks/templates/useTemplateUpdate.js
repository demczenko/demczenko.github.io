import { TemplatesService } from "@/api/templates/init";
import { useMutation } from "react-query";

export const useTemplateUpdate = () => {
  return useMutation((params) => TemplatesService.update(params));
};
 