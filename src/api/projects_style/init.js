import { API } from "../apiProvider/init";
import { ProjectStyleController } from "./Controller";
import { ProjectStyleModel } from "./Model";

export const ProjectStyleService = new ProjectStyleController(
  new ProjectStyleModel(API, "projects_style")
);
