import { ApiLocalStorage } from "./ApiLocalStorage";
import { ApiLocalJson } from "./JsonServer";

// export const API = new ApiFetch("http://localhost:5173/src/data/")
// export const API = new ApiLocalStorage()
export const API = new ApiLocalJson("http://localhost:3000/")
