import { ApiFetch } from "../apiProvider/ApiFetch";
import { TabledataController } from "./Controller";
import { TabledataModel } from "./Model";

export const TabledataService = new TabledataController(
  new TabledataModel(new ApiFetch())
);
