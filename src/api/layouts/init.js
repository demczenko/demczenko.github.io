import { API } from "../apiProvider/init";
import { LayoutController } from "./Controller";
import { LayoutModel } from "./Model";

export const LayoutService = new LayoutController(
  new LayoutModel(API, "layouts")
);