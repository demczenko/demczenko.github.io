import { ApiFetch } from "../apiProvider/ApiFetch";
import { ColumnController } from "./Controller";
import { ColumnModel } from "./Model";

export const ColumnService = new ColumnController(
  new ColumnModel(new ApiFetch())
);
