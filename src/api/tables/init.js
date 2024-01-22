import { API } from "../apiProvider/init";
import { TableController } from "./Controller";
import { TablesModel } from "./Model";

export const TableService = new TableController(
  new TablesModel(API, "tables")
);
