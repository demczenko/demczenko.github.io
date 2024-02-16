import { TemplatesService } from "@/api/templates/init";
import { useMutation } from "react-query";

export const useTemplateDelete = () => {
  return useMutation((params) => TemplatesService.delete(params));
};
 