import { API } from "../apiProvider/init";
import { TabledataController } from "./Controller";
import { TabledataModel } from "./Model";

export const TabledataService = new TabledataController(
  new TabledataModel(API, "data_tables")
);
