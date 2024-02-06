import { ApiLocalStorage } from "./ApiLocalStorage";
import { ApiLocalJson } from "./JsonServer";
import { ApiDB } from "./ApiDB";

const APIS = {
  local_storage: () => new ApiLocalStorage(),
  local_json: () => new ApiLocalJson("http://localhost:3000/"),
  db: () => new ApiDB("http://localhost:7777/"),
};

export const API = APIS.local_json();