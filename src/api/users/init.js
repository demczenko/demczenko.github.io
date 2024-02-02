import { API } from "../apiProvider/init";
import { UserController } from "./Controller";
import { UserModel } from "./Model";

export const UserService = new UserController(new UserModel(API, "users"));
