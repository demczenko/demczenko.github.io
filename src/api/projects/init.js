import { API } from "../apiProvider/init";
import { ProjectController } from "./Controller";
import { ProjectModel } from "./Model";

export const ProjectService = new ProjectController(
  new ProjectModel(API, "projects")
);
