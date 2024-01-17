import { ApiFetch } from "../apiProvider/ApiFetch";
import { API } from "../apiProvider/init";
import { TabledataController } from "./Controller";
import { TabledataModel } from "./Model";

export const TabledataService = new TabledataController(
  new TabledataModel(API)
);
