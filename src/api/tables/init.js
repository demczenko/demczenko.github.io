import { ApiFetch } from "../apiProvider/ApiFetch";
import { TableController } from "./Controller";
import { TablesModel } from "./Model";

export const TableService = new TableController(
  new TablesModel(new ApiFetch())
);
