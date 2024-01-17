import { ApiFetch } from "./ApiFetch";
import { ApiLocalStorage } from "./ApiLocalStorage";

// export const API = new ApiFetch("http://localhost:5173/src/data/")
export const API = new ApiLocalStorage()