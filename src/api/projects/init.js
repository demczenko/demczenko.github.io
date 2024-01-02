import { ApiFetch } from "../apiProvider/ApiFetch";
import { ProjectController } from "./Controller";
import { ProjectModel } from "./Model";

export const ProjectService = new ProjectController(
  new ProjectModel(new ApiFetch())
);
