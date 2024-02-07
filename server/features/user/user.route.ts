import { Router } from "express";
import { UserController } from "./user.controller";
import { EUserPath } from "../../cores/enums/userPath.enum";

export class UserRoute {
  constructor(userController: UserController, router: Router) {
    try {
        router.post(EUserPath.register, userController.register.bind(userController))
        router.post(EUserPath.login, userController.login.bind(userController))
        router.get(EUserPath.getUserMany, userController.getUserMany.bind(userController))
        router.get(EUserPath.getUserOne, userController.getUserOne.bind(userController))
    } catch (error) {
      console.log("user route error => ", error);
    }
  }
}
