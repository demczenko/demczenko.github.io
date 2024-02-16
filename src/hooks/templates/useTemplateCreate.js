import { TemplatesService } from "@/api/templates/init";
import { useMutation } from "react-query";

export const useTemplateCreate = () => {
  return useMutation((params) => TemplatesService.set(params));
};
