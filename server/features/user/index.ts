import { Router } from "express";
import { ETable } from "../../cores/enums/table.enum";
import { UserModel } from "./user.model";
import { UserController } from "./user.controller";
import { UserRoute } from "./user.route";

export class UserFeature {
  constructor(router: Router) {
    // create user model
    const userCollection = new UserModel(ETable.user);
    const userModel = userCollection.model();
    // create user controller
    const userController = new UserController(userModel);
    // create user route
    new UserRoute(userController, router)
  }
}
