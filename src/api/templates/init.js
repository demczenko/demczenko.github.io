import { API } from "../apiProvider/init";
import { TemplateController } from "./Controller";
import { TemplateModel } from "./Model";

export const TemplatesService = new TemplateController(
  new TemplateModel(API, "templates")
);