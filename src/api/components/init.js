import { API } from "../apiProvider/init";
import { ComponentsController } from "./Controller";
import { ComponentsModel } from "./Model";

export const TableService = new ComponentsController(
  new ComponentsModel(API, "components")
);
