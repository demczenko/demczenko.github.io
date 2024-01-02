import { ApiFetch } from "../apiProvider/ApiFetch";
import { TemplateController } from "./Controller";
import { TemplateModel } from "./Model";

export const TemplatesService = new TemplateController(
  new TemplateModel(new ApiFetch())
);