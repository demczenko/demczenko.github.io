import { API } from "../apiProvider/init";
import { ColumnController } from "./Controller";
import { ColumnModel } from "./Model";

export const ColumnService = new ColumnController(
  new ColumnModel(API, "columns")
);
