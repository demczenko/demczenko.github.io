import { ApiLocalStorage } from "./ApiLocalStorage";
import { ApiLocalJson } from "./JsonServer";
import { ApiDB } from "./ApiDB";

const APIS = {
  local_storage: () => new ApiLocalStorage(),
  local_json: () => new ApiLocalJson("http://localhost:3000/"),
  db: () => new ApiDB("https://server-cms-production.up.railway.app/"),
};

export const API = APIS.db();